import glsl from 'vite-plugin-glsl'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
  server: {
    port: 3000
  },
  plugins: [glsl()],
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src/core'),
      '@render': resolve(__dirname, './src/core/render'),
      '@scene': resolve(__dirname, './src/core/scene'),
      '@objects': resolve(__dirname, './src/core/scene/objects'),
      '@util': resolve(__dirname, './src/core/util'),
    }
  },
  base: '/shell-texturing'
}