import swc from "unplugin-swc"
import tsConfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: "./"
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: "es6" }
    })
  ]
})
