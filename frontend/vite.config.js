import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Semua permintaan yang dimulai dengan /api akan diarahkan ke target server backend Anda
      "/api": {
        target: "http://192.168.77.1", // Alamat server backend tanpa endpoint spesifik
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Hapus /api pada path saat melakukan proxy
      },
    },
  },
});
