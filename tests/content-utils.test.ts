import assert from "node:assert/strict";
import test from "node:test";

import {
  estimateReadingMinutes,
  parseContentId,
} from "../src/lib/content-utils";

test("parses grouped content IDs", () => {
  assert.deepEqual(parseContentId("why-this-site-is-smaller/en"), {
    slug: "why-this-site-is-smaller",
    locale: "en",
  });
  assert.deepEqual(parseContentId("post/pt-br.mdx"), {
    slug: "post",
    locale: "pt-br",
  });
});

test("rejects malformed content IDs and unsupported locales", () => {
  assert.throws(() => parseContentId("en"), /Expected "slug\/locale"/);
  assert.throws(() => parseContentId("post/es"), /Invalid locale/);
  assert.throws(() => parseContentId("nested/post/en"), /Expected "slug\/locale"/);
});

test("estimates reading time for word-based and CJK content", () => {
  assert.equal(estimateReadingMinutes("word ".repeat(220), "en"), 1);
  assert.equal(estimateReadingMinutes("word ".repeat(221), "en"), 2);
  assert.equal(estimateReadingMinutes("文".repeat(401), "ja"), 2);
  assert.equal(estimateReadingMinutes("", "en"), 1);
});
