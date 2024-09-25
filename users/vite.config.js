import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Consolidate configuration into a single export
export default defineConfig({
  server: {
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
    proxy: {
      // Proxying API requests to avoid CORS issues
      '/api': {
        target: 'http://localhost:5001', // Replace with your backend API base URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Adjust if needed
      },
    },
  },
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1600, // Adjust the chunk size warning limit
  },
});
