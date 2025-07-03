import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbitePlugin from "flowbite/plugin";

// https://vite.dev/config/
export default defineConfig({
  darkMode: "media",
  plugins: [react(), tailwindcss(), flowbitePlugin],
  base: "/QuranApp/",
});
