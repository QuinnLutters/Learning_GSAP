import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";

// Every folder in lessons/ (plus the home page and sandbox) is its own page.
// `npm run dev` doesn't need this — it's only so `npm run build` includes every lesson.
const lessonPages = Object.fromEntries(
  readdirSync(resolve(__dirname, "lessons"), { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(resolve(__dirname, "lessons", d.name, "index.html")))
    .map((d) => [d.name, resolve(__dirname, "lessons", d.name, "index.html")])
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sandbox: resolve(__dirname, "sandbox/index.html"),
        ...lessonPages,
      },
    },
  },
});
