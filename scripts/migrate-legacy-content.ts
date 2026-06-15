import path from "node:path";

import {
  formatMigrationSummary,
  runLegacyContentMigration,
} from "./lib/legacy-content-migration";

const apply = process.argv.includes("--apply");
const destinationRepoRoot = process.cwd();
const sourceRepoRoot = path.resolve(destinationRepoRoot, "../website");

const report = await runLegacyContentMigration({
  sourceRepoRoot,
  destinationRepoRoot,
  apply,
});

console.log(formatMigrationSummary(report));

for (const warning of report.warnings) {
  console.warn(`warning: ${warning}`);
}

for (const error of report.errors) {
  console.error(`error: ${error}`);
}

if (report.errors.length > 0) {
  process.exit(1);
}
