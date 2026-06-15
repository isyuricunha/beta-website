import path from "node:path";

import {
  createEnglishEntry,
  humanizeSlug,
} from "./lib/content-tooling";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: pnpm content:new:snippet <slug>");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = humanizeSlug(slug);
const template = `---
title: "${title}"
description: "Describe the practical problem this note solves."
publishedDate: ${today}
locale: en
tags: []
category: "tooling"
stack: []
level: beginner
draft: true
featured: false
---

## What it is

Explain the tool, command, configuration, or pattern.

## When to use it

Describe the situations where this is useful.

## Where to use it

State the environment and prerequisites.

## How to use it

Provide the steps and code or commands.

## Notes and gotchas

Document risks, edge cases, and operational caveats.
`;

const filePath = await createEnglishEntry(
  path.resolve("src/content"),
  "snippets",
  slug,
  template,
);

console.log(`Created ${path.relative(process.cwd(), filePath)}`);
