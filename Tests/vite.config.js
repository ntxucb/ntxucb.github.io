import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({
    include: ['src/**/*.js', 'src/**/*.jsx'],
    exclude: ['node/modules', 'dist'],
    emitWarning: true,
    failOnError: false,
  })],
})
