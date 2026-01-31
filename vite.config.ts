import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/chakra-design-system-demo/' // <--- tämä on tärkeä GitHub Pagesiin
});
