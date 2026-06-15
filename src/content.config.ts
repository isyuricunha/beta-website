import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { locales } from "@/i18n/config";
import { projectStatuses } from "@/i18n/types";

const localeSchema = z.enum(locales);

const translationSchema = z
  .object({
    sourceLocale: localeSchema.default("en"),
    generatedAt: z.coerce.date().optional(),
    generator: z.string().min(1).optional(),
  })
  .optional();

const commonContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  locale: localeSchema,
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  canonicalSourceLocale: localeSchema.optional(),
  translation: translationSchema,
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: commonContentSchema.extend({
    includeInRss: z.boolean().default(true),
    showTableOfContents: z.boolean().default(false),
  }),
});

const snippets = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/snippets",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: commonContentSchema.extend({
    category: z.string().min(1),
    stack: z.array(z.string().min(1)).default([]),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    locale: localeSchema,
    status: z.enum(projectStatuses),
    category: z.string().min(1),
    tags: z.array(z.string().min(1)).default([]),
    stack: z.array(z.string().min(1)).default([]),
    homepageUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
    externalUrl: z.url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    canonicalSourceLocale: localeSchema.optional(),
    translation: translationSchema,
  }),
});

export const collections = { blog, snippets, projects };
