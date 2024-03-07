import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'

import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/

const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      // 使用Unocss
      presets: [presetUno(), presetAttributify()],
    }),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  server: {
    // port: 3000,
    open: true, //服务启动时自动在浏览器中打开应用
    // http://localhost:3030/api/user的请求都会变成 http://localhost:8080/user
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
