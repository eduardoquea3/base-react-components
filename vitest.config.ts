import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@shadcn': resolve(__dirname, './src/components/ui'),
      '@utils': resolve(__dirname, './src/lib'),
      '@lib': resolve(__dirname, './src/shared/lib'),
      '@components': resolve(__dirname, './src/shared/components'),
      '@hooks': resolve(__dirname, './src/shared/hooks'),
      '@types': resolve(__dirname, './src/shared/types'),
      '@controls': resolve(__dirname, './src/app/controls'),
    },
  },
})