import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "jn-drawing-common",
      fileName: "jn-drawing-common.js",
    },
  },
  plugins: [dtsPlugin()],
});
