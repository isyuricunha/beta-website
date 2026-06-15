import assert from "node:assert/strict";
import test from "node:test";

import {
  getLocaleFromPathname,
  getLocalizedPath,
  stripLocalePrefix,
} from "../src/lib/routes";

test("detects supported locale prefixes and defaults to English", () => {
  assert.equal(getLocaleFromPathname("/pt-br/blog/"), "pt-br");
  assert.equal(getLocaleFromPathname("/ja/"), "ja");
  assert.equal(getLocaleFromPathname("/blog/"), "en");
  assert.equal(getLocaleFromPathname("/unknown/blog/"), "en");
});

test("strips locale prefixes while preserving a normalized trailing slash", () => {
  assert.equal(stripLocalePrefix("/fr/blog/post/"), "/blog/post/");
  assert.equal(stripLocalePrefix("/blog/post"), "/blog/post/");
  assert.equal(stripLocalePrefix("/zh-cn/"), "/");
});

test("generates localized paths without prefixing English", () => {
  assert.equal(getLocalizedPath("/de/blog/post/", "en"), "/blog/post/");
  assert.equal(
    getLocalizedPath("/blog/post/?from=home#notes", "pt-br"),
    "/pt-br/blog/post/?from=home#notes",
  );
  assert.equal(getLocalizedPath("/", "ja"), "/ja/");
});
