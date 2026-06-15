import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://yuricunha.com",
  output: "static",
  trailingSlash: "always",
  i18n: {
    locales: ["en", "pt-br", "ja", "zh-cn", "de", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "pt-br": "pt-BR",
          ja: "ja",
          "zh-cn": "zh-CN",
          de: "de",
          fr: "fr",
        },
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: ["100 800"],
      styles: ["normal"],
      fallbacks: ["monospace"],
    },
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
