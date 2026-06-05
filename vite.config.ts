import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { midenVitePlugin } from "@miden-sdk/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    midenVitePlugin({ crossOriginIsolation: true }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});