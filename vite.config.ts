import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({rollupTypes: true})],
  build: {
    lib: {
      entry: 'lib/main.ts',
      name: 'verlet-ts',
      fileName: 'verlet-ts',
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
})
