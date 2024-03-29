import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins:[
      dts({
        insertTypesEntry: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": env,
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "_1Point6",
        formats: ["es"],
        fileName: (format) => `1point6.${format}.js`,
      },
      rollupOptions: {
        output: {
          globals: {
            _1Point6: "_1Point6",
          },
        },
      },
    },
  };
});
