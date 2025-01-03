// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/"),
  },
  // modules: ["@nuxtjs/tailwindcss", "@nuxt/test-utils/module"],
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  provide: {
    Buffer: ["buffer", "Buffer"],
  },
});
