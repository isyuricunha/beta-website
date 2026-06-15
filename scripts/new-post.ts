import path from "node:path";

import {
  createEnglishEntry,
  humanizeSlug,
} from "./lib/content-tooling";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: pnpm content:new:post <slug>");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = humanizeSlug(slug);
const template = `---
title: "${title}"
description: "Describe the post in one clear sentence."
publishedDate: ${today}
locale: en
tags: []
draft: true
featured: false
includeInRss: true
showTableOfContents: false
---

Start writing here.
`;

const filePath = await createEnglishEntry(
  path.resolve("src/content"),
  "blog",
  slug,
  template,
);

console.log(`Created ${path.relative(process.cwd(), filePath)}`);
