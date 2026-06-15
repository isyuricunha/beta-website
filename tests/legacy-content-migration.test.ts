import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  convertLegacyCallouts,
  extractOriginalFrontmatterScalar,
  inferSnippetTaxonomy,
  normalizeMarkdownHardBreaks,
  normalizeLegacySlug,
  removeLegacyMoreMarkers,
  runLegacyContentMigration,
} from "../scripts/lib/legacy-content-migration";

test("preserves the original calendar date and timezone text", () => {
  const source = `---
title: Example
date: '2024-12-13T22:00:00-03:00'
modifiedTime: 2024-12-13
---
`;

  assert.equal(
    extractOriginalFrontmatterScalar(source, "date"),
    "2024-12-13T22:00:00-03:00",
  );
  assert.equal(
    extractOriginalFrontmatterScalar(source, "modifiedTime"),
    "2024-12-13",
  );
});

test("converts legacy callouts and removes legacy more markers", () => {
  const callout = convertLegacyCallouts(`
<Callout type='warning'>
  Keep a backup before continuing.
</Callout>
`);
  const marker = removeLegacyMoreMarkers(`Before

{/* more */}

After
`);

  assert.equal(callout.count, 1);
  assert.equal(callout.hasUnsupportedCallout, false);
  assert.match(callout.body, /<blockquote data-callout="warning">/);
  assert.doesNotMatch(callout.body, /Callout/);
  assert.equal(marker.count, 1);
  assert.doesNotMatch(marker.body, /more/);
});

test("normalizes Markdown hard breaks outside fenced code", () => {
  const hardBreak = "  ";
  const result = normalizeMarkdownHardBreaks(
    [
      `First line${hardBreak}`,
      "Second line",
      "",
      "```text",
      `keep spaces${hardBreak}`,
      "```",
      "",
    ].join("\n"),
  );

  assert.equal(result.count, 1);
  assert.ok(result.body.includes("First line<br />"));
  assert.ok(result.body.includes(`keep spaces${hardBreak}\n`));
});

test("normalizes known legacy slugs and assigns explicit taxonomy", () => {
  assert.equal(normalizeLegacySlug("blog", "en", "dAppling"), "dappling");
  assert.equal(
    normalizeLegacySlug(
      "snippet",
      "pt",
      "linux-cpu-governor-schedutil",
    ),
    "set-linux-cpu-governor-to-schedutil",
  );

  assert.deepEqual(
    inferSnippetTaxonomy(
      "discord-ollama-bot",
      "Discord Ollama bot",
      ["python", "sqlite"],
    ),
    {
      slug: "discord-ollama-bot",
      category: "automation",
      stack: ["Discord", "Ollama", "SQLite", "Python"],
    },
  );
});

test("keeps dry-run read-only and refuses to overwrite existing content", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "legacy-migration-"));
  const sourceRepoRoot = path.join(root, "website");
  const destinationRepoRoot = path.join(root, "beta");
  const legacyBlogRoot = path.join(
    sourceRepoRoot,
    "apps/web/src/content/blog",
  );
  const legacySnippetRoot = path.join(
    sourceRepoRoot,
    "apps/web/src/content/snippet",
  );

  try {
    for (const locale of ["en", "es"]) {
      await mkdir(path.join(legacyBlogRoot, locale), { recursive: true });
      await mkdir(path.join(legacySnippetRoot, locale), { recursive: true });
    }
    await mkdir(path.join(destinationRepoRoot, "src/content/blog/example"), {
      recursive: true,
    });
    await mkdir(path.join(destinationRepoRoot, "src/content/snippets"), {
      recursive: true,
    });
    await writeFile(
      path.join(legacyBlogRoot, "en/example.mdx"),
      `---
title: "Legacy"
date: '2024-12-13T22:00:00-03:00'
modifiedTime: '2024-12-13T22:00:00-03:00'
summary: "Legacy summary"
---

Legacy body.
`,
    );
    await writeFile(
      path.join(legacyBlogRoot, "es/example.mdx"),
      `---
title: "Legacy ES"
date: 2024-12-13
modifiedTime: 2024-12-13
summary: "Legacy summary"
---

Legacy body.
`,
    );
    await writeFile(
      path.join(destinationRepoRoot, "src/content/blog/example/en.mdx"),
      "existing",
    );

    const reportPath = path.join(destinationRepoRoot, "migration-report.json");
    const report = await runLegacyContentMigration({
      sourceRepoRoot,
      destinationRepoRoot,
      apply: false,
      reportPath,
    });

    assert.equal(report.totals.found, 2);
    assert.equal(report.totals.skippedSpanish, 1);
    assert.equal(report.totals.skippedExisting, 1);
    await assert.rejects(readFile(reportPath, "utf8"), /ENOENT/);
    assert.equal(
      await readFile(
        path.join(destinationRepoRoot, "src/content/blog/example/en.mdx"),
        "utf8",
      ),
      "existing",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("applies migration atomically without changing the legacy source", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "legacy-apply-"));
  const sourceRepoRoot = path.join(root, "website");
  const destinationRepoRoot = path.join(root, "beta");
  const legacyBlogRoot = path.join(
    sourceRepoRoot,
    "apps/web/src/content/blog/en",
  );
  const legacySnippetRoot = path.join(
    sourceRepoRoot,
    "apps/web/src/content/snippet/en",
  );
  const emptyDirectory = path.join(
    destinationRepoRoot,
    "src/content/blog/old-empty",
  );
  const reportPath = path.join(destinationRepoRoot, "migration-report.json");
  const blogSource = `---
title: "Legacy post"
date: '2024-12-13T22:00:00-03:00'
modifiedTime: '2024-12-13T22:00:00-03:00'
summary: "Legacy summary"
---

Legacy body.
`;
  const snippetSource = `---
title: "mkcd helper"
date: 2025-01-03
author: "Yuri Cunha"
description: "Create and enter a directory."
tags:
  - bash
  - linux
---

{/* more */}

Use the command.
`;

  try {
    await mkdir(legacyBlogRoot, { recursive: true });
    await mkdir(legacySnippetRoot, { recursive: true });
    await mkdir(emptyDirectory, { recursive: true });
    await mkdir(path.join(destinationRepoRoot, "src/content/snippets"), {
      recursive: true,
    });
    await writeFile(path.join(legacyBlogRoot, "example.mdx"), blogSource);
    await writeFile(
      path.join(legacySnippetRoot, "mkcd-bash-function.mdx"),
      snippetSource,
    );

    const report = await runLegacyContentMigration({
      sourceRepoRoot,
      destinationRepoRoot,
      apply: true,
      reportPath,
    });
    const migratedBlog = await readFile(
      path.join(destinationRepoRoot, "src/content/blog/example/en.mdx"),
      "utf8",
    );
    const migratedSnippet = await readFile(
      path.join(
        destinationRepoRoot,
        "src/content/snippets/mkcd-bash-function/en.mdx",
      ),
      "utf8",
    );

    assert.equal(report.totals.migrated, 2);
    assert.match(
      migratedBlog,
      /publishedDate: ['"]?2024-12-13T22:00:00-03:00['"]?/,
    );
    assert.doesNotMatch(migratedBlog, /updatedDate/);
    assert.match(migratedSnippet, /category: linux/);
    assert.match(migratedSnippet, /- Bash/);
    assert.doesNotMatch(migratedSnippet, /\{\/\* more \*\/\}/);
    const writtenReport = JSON.parse(await readFile(reportPath, "utf8"));
    assert.equal(writtenReport.totals.migrated, 2);
    assert.deepEqual(await readdir(path.dirname(emptyDirectory)), ["example"]);
    assert.equal(
      await readFile(path.join(legacyBlogRoot, "example.mdx"), "utf8"),
      blogSource,
    );
    assert.equal(
      await readFile(
        path.join(legacySnippetRoot, "mkcd-bash-function.mdx"),
        "utf8",
      ),
      snippetSource,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
