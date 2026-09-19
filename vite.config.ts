import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { emailRelayPlugin } from './vite.emailRelay.ts'

export default defineConfig({
  plugins: [react(), emailRelayPlugin()],
  server: {
    port: 3001,
    strictPort: true,
  },
})
