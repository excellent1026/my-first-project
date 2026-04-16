import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8081', // 后端地址和端口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/student'), // 关键：重写路径
      },
    },
  },
});
