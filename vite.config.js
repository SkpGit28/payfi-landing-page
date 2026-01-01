import { defineConfig } from 'vite'
// Force HMR invalidation
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
