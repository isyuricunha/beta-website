import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  contentCollections,
  createEnglishEntry,
  humanizeSlug,
  isValidSlug,
  validateContentRoot,
} from "../scripts/lib/content-tooling";

async function createContentRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "website-content-"));
  await Promise.all(
    contentCollections.map((collection) =>
      mkdir(path.join(root, collection), { recursive: true }),
    ),
  );
  return root;
}

async function writeEntry(
  root: string,
  locale: string,
  overrides = "",
): Promise<void> {
  const entryRoot = path.join(root, "blog", "example");
  await mkdir(entryRoot, { recursive: true });
  await writeFile(
    path.join(entryRoot, `${locale}.mdx`),
    `---
title: "Example"
description: "Example description"
publishedDate: 2026-01-01
locale: ${locale}
draft: false
${overrides}---

Body.
`,
  );
}

test("validates and humanizes content slugs", () => {
  assert.equal(isValidSlug("docker-cleanup"), true);
  assert.equal(isValidSlug("Docker Cleanup"), false);
  assert.equal(humanizeSlug("docker-cleanup"), "Docker Cleanup");
});

test("creates an English source once and refuses to overwrite it", async () => {
  const root = await createContentRoot();
  try {
    const firstPath = await createEnglishEntry(
      root,
      "blog",
      "new-entry",
      "first",
    );
    assert.equal(path.basename(firstPath), "en.mdx");
    await assert.rejects(
      createEnglishEntry(root, "blog", "new-entry", "second"),
      /already exists/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports missing translations without failing non-strict validation", async () => {
  const root = await createContentRoot();
  try {
    await writeEntry(root, "en");
    const report = await validateContentRoot(root, false);
    assert.equal(report.errors.length, 0);
    assert.equal(report.warnings.length, 5);
    assert.equal(report.missingTranslations.length, 5);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("promotes missing translations to errors in strict mode", async () => {
  const root = await createContentRoot();
  try {
    await writeEntry(root, "en");
    const report = await validateContentRoot(root, true);
    assert.equal(report.warnings.length, 0);
    assert.equal(report.errors.length, 5);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a locale that does not match its filename", async () => {
  const root = await createContentRoot();
  try {
    await writeEntry(root, "pt-br", "canonicalSourceLocale: pt-br\n");
    const report = await validateContentRoot(root, false);
    assert.match(report.errors.join("\n"), /without an English source/);

    const filePath = path.join(root, "blog", "example", "pt-br.mdx");
    await writeFile(
      filePath,
      `---
title: "Example"
description: "Example description"
publishedDate: 2026-01-01
locale: en
draft: false
---
`,
    );
    const mismatchReport = await validateContentRoot(root, false);
    assert.match(
      mismatchReport.errors.join("\n"),
      /frontmatter locale must match filename/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
