import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import fs from "fs";
import path from "path";

export default ({ mode }) => {
  // import.meta.env 대신 loadEnv 사용
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());
  const isDevelop = env.VITE_DEVELOP === "true";

  return defineConfig({
    plugins: [react(), tailwindcss()],
    base: "/",
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      https: isDevelop
        ? {
            key: fs.readFileSync("localhost-key.pem"),
            cert: fs.readFileSync("localhost.pem"),
          }
        : undefined,
    },
  });
};
