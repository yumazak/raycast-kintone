import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/tests/**/*.ts"],
  },
  resolve: {
    alias: {
      "@raycast/api": new URL(
        "./__mocks__/@raycast/api.ts",
        import.meta.url,
      ).pathname,
    },
  },
});
