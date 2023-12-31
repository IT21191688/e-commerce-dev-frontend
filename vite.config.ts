import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "/e-commerce-dev-backend/",
  build: {
    outDir: "build", // Change the output directory to 'build'
  },
});
