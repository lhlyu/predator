import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            imports: ['vue', 'vue-router', 'vue-i18n', 'pinia', '@vueuse/core'],
            dirs: ['./src/composables/**', './src/stores/**'],
            dts: 'src/auto-imports.d.ts',
        }),
        Components({
            dirs: ['src/components'],
            dts: 'src/components.d.ts',
            directoryAsNamespace: true,
        }),
    ],
})
