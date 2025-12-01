import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pas ALLEEN "base" aan als je een submap gebruikt.
// Voor een user-site: base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/'
})
