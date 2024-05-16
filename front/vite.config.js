import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base : "/get-on-your-apprenticeship/",
  plugins: [react()],
})
