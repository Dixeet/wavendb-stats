import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "wavendb-stats.js",
      },
    },
  },
  esbuild: {
    banner: `// ==UserScript==
// @name         WavenDB-Stat
// @version      0.1
// @description
// @author       Dixeet
// @match        https://wavendb.com/builds/meta*
// @grant        none
// @run-at document-idle
// ==/UserScript==
`,
  },
});
