import { spawn } from "node:child_process";
import path from "node:path";

import matter from "gray-matter";

import {
  loadContentRecords,
  findMissingTranslations,
  validateContentRoot,
  writeTranslationAtomically,
} from "./lib/content-tooling";

type TranslationPayload = {
  collection: string;
  slug: string;
  sourceLocale: "en";
  targetLocale: string;
  sourcePath: string;
  sourceContent: string;
};

function parseAdapterArgs(): string[] {
  const rawArgs = process.env.CONTENT_TRANSLATION_ARGS ?? "[]";
  const parsed = JSON.parse(rawArgs) as unknown;

  if (!Array.isArray(parsed) || !parsed.every((value) => typeof value === "string")) {
    throw new Error("CONTENT_TRANSLATION_ARGS must be a JSON array of strings.");
  }

  return parsed;
}

async function runTranslationAdapter(
  command: string,
  args: string[],
  payload: TranslationPayload,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      shell: false,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `Translation adapter exited with code ${code ?? "unknown"}: ${stderr.trim()}`,
          ),
        );
        return;
      }

      if (!stdout.trim()) {
        reject(new Error("Translation adapter returned empty output."));
        return;
      }

      resolve(stdout);
    });

    child.stdin.end(JSON.stringify(payload));
  });
}

const contentRoot = path.resolve("src/content");
const records = await loadContentRecords(contentRoot);
const missingTranslations = findMissingTranslations(records, contentRoot);
const command = process.env.CONTENT_TRANSLATION_COMMAND?.trim();

if (missingTranslations.length === 0) {
  console.log("All published English content has every locale variant.");
  process.exit(0);
}

if (!command) {
  console.log("Missing translations:");
  for (const missing of missingTranslations) {
    console.log(
      `- ${missing.collection}/${missing.slug}/${missing.targetLocale}.mdx`,
    );
  }
  console.log(
    "\nNo adapter configured. Set CONTENT_TRANSLATION_COMMAND and optional CONTENT_TRANSLATION_ARGS to generate files.",
  );
  process.exit(0);
}

const args = parseAdapterArgs();

for (const missing of missingTranslations) {
  const sourceContent = await import("node:fs/promises").then(({ readFile }) =>
    readFile(missing.source.filePath, "utf8"),
  );
  const output = await runTranslationAdapter(command, args, {
    collection: missing.collection,
    slug: missing.slug,
    sourceLocale: "en",
    targetLocale: missing.targetLocale,
    sourcePath: missing.source.filePath,
    sourceContent,
  });
  const parsed = matter(output);

  if (parsed.data.locale !== missing.targetLocale) {
    throw new Error(
      `${missing.collection}/${missing.slug}: adapter output locale must be "${missing.targetLocale}".`,
    );
  }

  await writeTranslationAtomically(missing.targetPath, output);
  console.log(
    `Created ${path.relative(process.cwd(), missing.targetPath)}`,
  );
}

const validationReport = await validateContentRoot(contentRoot, true);
if (validationReport.errors.length > 0) {
  throw new Error(
    `Generated translations failed validation:\n${validationReport.errors.join("\n")}`,
  );
}
