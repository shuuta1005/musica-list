import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/musica-list/", // This ensures assets are loaded from the correct path
  plugins: [react()],
});
