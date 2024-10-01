import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
// @ts-ignore  
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/{views,components,stores}/**/*.{js,ts,vue}'],
        exclude: [
          'src/**/*.spec.ts', // test files
          'src/components/__tests__', // test files
          'src/components/ui/', // shadcn files
          'node_modules/', // modules
          'src/main.ts', // main entry point
          'src/types/firestoreTypes.ts', // ts types
          'src/lib/utils.ts', // tailwind-merge
          'src/locales/index.ts', // agregation of locales should not be tested, only its usage
          'src/vue-router.d.ts', // types
          '/src/firebase.ts', // firebase
        ],
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      globals: true,
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['src/components/__tests__/vitest.setup.ts']
    }
  })
)
