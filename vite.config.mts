import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true
  },
  server: {
    open: true // Opens browser when running npm start
  },
  resolve: {
    alias: {
      app: "/src/app"
    }
  }
})
