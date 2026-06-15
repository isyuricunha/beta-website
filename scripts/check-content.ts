import path from "node:path";

import { validateContentRoot } from "./lib/content-tooling";

const strictI18n = process.env.STRICT_I18N === "true";
const report = await validateContentRoot(
  path.resolve("src/content"),
  strictI18n,
);

for (const warning of report.warnings) {
  console.warn(`warning: ${warning}`);
}

for (const error of report.errors) {
  console.error(`error: ${error}`);
}

console.log(
  `Checked ${report.records.length} content files; ${report.missingTranslations.length} translations missing.`,
);

if (report.errors.length > 0) {
  process.exit(1);
}
