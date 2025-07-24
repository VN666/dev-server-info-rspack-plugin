import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  dts: false, // 如果你用 TypeScript，生成类型声明
  splitting: false,
  sourcemap: false,
  clean: true,
})
