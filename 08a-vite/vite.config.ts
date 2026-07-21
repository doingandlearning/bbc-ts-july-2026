import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  root: "src",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
