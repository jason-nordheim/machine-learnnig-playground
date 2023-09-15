import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  build: {
    manifest: true,
    sourcemap: true,
    lib: {
      entry: "./src/index.ts",
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      input: "./src/index.ts",
      plugins: [
        resolve(),
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          tsconfig: "./tsconfig.json",
          sourceMap: true,
          declaration: true,
          noEmit: true,
          outDir: "dist",
        }),
      ],
    },
  },

  plugins: [dtsPlugin()],
});
