// @ts-check
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sp3ctra.io/",
  adapter: netlify(),
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: "auto",
  },
});
