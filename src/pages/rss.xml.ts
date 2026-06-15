import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { getPublishableEntries } from "@/lib/content";
import { parseContentId } from "@/lib/content-utils";

export const GET: APIRoute = async (context) => {
  const posts = (await getPublishableEntries("blog"))
    .filter((entry) => {
      const { locale } = parseContentId(entry.id);
      return (
        locale === "en" &&
        entry.data.includeInRss &&
        entry.data.publishedDate.getTime() <= Date.now()
      );
    })
    .sort(
      (left, right) =>
        right.data.publishedDate.getTime() -
        left.data.publishedDate.getTime(),
    );

  return rss({
    title: "Yuri Cunha",
    description:
      "Software, self-hosting, privacy, automation, and small useful things.",
    site: context.site ?? "https://yuricunha.com",
    customData: "<language>en</language>",
    items: posts.map((entry) => {
      const { slug } = parseContentId(entry.id);
      return {
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.publishedDate,
        link: `/blog/${slug}/`,
        categories: entry.data.tags,
      };
    }),
  });
};
