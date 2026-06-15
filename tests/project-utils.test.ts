import assert from "node:assert/strict";
import test from "node:test";

import { getProjectTaxonomy } from "../src/lib/project-utils";

test("merges project taxonomy in editorial order", () => {
  assert.deepEqual(
    getProjectTaxonomy(
      "web",
      ["Astro", "TypeScript", "MDX"],
      ["personal-web", "privacy"],
    ),
    ["web", "Astro", "TypeScript", "MDX", "personal-web", "privacy"],
  );
});

test("removes duplicate and empty project taxonomy labels", () => {
  assert.deepEqual(
    getProjectTaxonomy(
      " Web ",
      ["Astro", "web", "  "],
      ["astro", "Privacy", " privacy "],
    ),
    ["Web", "Astro", "Privacy"],
  );
});
