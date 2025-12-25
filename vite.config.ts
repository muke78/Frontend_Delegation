import path from 'path';
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "oxc",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react'
            }
            if (id.includes('react-router-dom')) {
              return 'router'
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui') || id.includes('next-themes')) {
              return 'ui'
            }
            if (id.includes('sonner')) {
              return 'toast'
            }
          }
        }
      }
    }
  }

})
