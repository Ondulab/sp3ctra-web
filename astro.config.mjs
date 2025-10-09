// @ts-check

import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sp3ctra.io/",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
