
//vitest.config.ts

import { defineConfig } from "vitest/config"

export default defineConfig({
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
