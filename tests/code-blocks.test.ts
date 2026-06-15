import assert from "node:assert/strict";
import test from "node:test";

import { getCodeLanguageLabel } from "../src/lib/code-blocks";

test("normalizes code language labels and common aliases", () => {
  assert.equal(getCodeLanguageLabel(" Bash "), "bash");
  assert.equal(getCodeLanguageLabel("sh"), "shell");
  assert.equal(getCodeLanguageLabel("zsh"), "shell");
  assert.equal(getCodeLanguageLabel("yml"), "yaml");
  assert.equal(getCodeLanguageLabel("Dockerfile"), "docker");
});

test("keeps unknown languages and falls back for missing metadata", () => {
  assert.equal(getCodeLanguageLabel("toml"), "toml");
  assert.equal(getCodeLanguageLabel(""), "text");
  assert.equal(getCodeLanguageLabel(undefined), "text");
});
