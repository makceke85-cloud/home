import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Prayar-App/',
  server: {
    watch: {
      usePolling: true, // السطر ده بيخلي Vite يراقب التغييرات لحظة بلحظة
    },
  },
})
 