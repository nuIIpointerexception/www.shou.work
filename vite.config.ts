import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  css: {
    transformer: 'lightningcss'
  },
  build: {
    cssMinify: 'lightningcss',
    rolldownOptions: {
      input: ['index.html', '404.html']
    }
  }
});
