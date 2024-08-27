import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Inspect from 'vite-plugin-inspect'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'


const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),

    Inspect(),
  ],
  base: '/IFGBlog/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@comp': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@view': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@source': fileURLToPath(new URL('./src/source', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/global.scss";`
      }
    }
  },
})
