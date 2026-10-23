import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const projectDir = fileURLToPath(new URL('.', import.meta.url))
const publishDir = resolve(projectDir, '../dist')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'prepare-github-pages',
      closeBundle() {
        copyFileSync(resolve(publishDir, 'index.html'), resolve(publishDir, '404.html'))
        writeFileSync(resolve(publishDir, '.nojekyll'), '')
      },
    },
  ],
  build: {
    outDir: publishDir,
    emptyOutDir: true,
  },
})
