import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    babel({
      include: [/\.(t|j)sx?$/],
      plugins: ["@lingui/babel-plugin-lingui-macro"],
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
    exclude: ["**/node_modules/**", "**/__e2e__/**"],
    resolveSnapshotPath: (testPath, snapshotExtension) => {
      // Place __snapshots__ as sibling of __test__, not nested inside it
      const dir = path.dirname(testPath);
      const filename = path.basename(testPath);
      const parentDir = path.dirname(dir);
      return path.join(parentDir, "__snapshots__", filename + snapshotExtension);
    },
  },
});
