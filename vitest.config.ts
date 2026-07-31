
//vitest.config.ts

import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config.mts"

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.ts",
      watch: false,
      typecheck: {
        tsconfig: "./tsconfig.vitest.json",
      },
    },
  })
)
