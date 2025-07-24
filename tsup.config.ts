import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.mjs"],
  format: ["esm", "cjs",],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  outDir: "dist",
})
