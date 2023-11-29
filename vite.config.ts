import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import path from "path";

export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
        name: "Panto",
        formats: ["es"],
        fileName: (format) => `panto.${format}.js`,
      },
      rollupOptions: {
        output: {
          globals: {
            Panto: "Panto",
          },
        },
      },
    },
  };
});
