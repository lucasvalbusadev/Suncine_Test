import { config } from "dotenv"
import swc from "unplugin-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"
config()

// biome-ignore lint/style/noDefaultExport: vitest configuration
export default defineConfig({
  resolve: {
    // biome-ignore lint/style/useNamingConvention: vitest configuration
    preserveSymlinks: true
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: "es6" }
    })
  ],
  test: {
    globals: true,
    exclude: ["node_modules"],
    include: ["src/**/*.spec.ts", "src/**/*.int-spec.ts"],
    coverage: {
      reporter: ["html"],
      include: ["src/core/**/domain/**", "src/core/**/application/**"],
      exclude: [
        "src/core/customer/application/cryptography",
        "src/core/**/application/use-cases/factories",
        "src/core/shared/application",
        "src/core/shared/domain/repository",
        "src/**/__tests__"
      ]
    }
  }
})
