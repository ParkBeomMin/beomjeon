import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  globalName: "BjUtils",
  platform: "browser",
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
