import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginFoo } from "./src/plugins/pluginFoo.js";

export default defineConfig({
  plugins: [pluginReact(), pluginFoo({ message: "Dev server started!" })],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  source: {
    alias: {
      "@": "./src",
    },
  },
});
