import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "jeldjcfi",
  dataset: "production",
  apiVersion: "2023-08-28",
  useCdn: true,
  token: process.env.SANITY_AUTH_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  if (source) {
    return builder.image(source);
  }
};
