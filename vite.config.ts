import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@mui/material/styles',
      '@emotion/react',
      '@emotion/styled',
      'recharts',
      'framer-motion',
      'react-redux',
      '@reduxjs/toolkit',
      'react-router-dom',
      'notistack',
    ],
  },

  build: {
    minify: 'oxc',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('@mui/icons-material')) return 'vendor-mui-icons';
          if (id.includes('@mui/material') || id.includes('@emotion/react') || id.includes('@emotion/styled')) return 'vendor-mui';
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-')) return 'vendor-recharts';
          if (id.includes('framer-motion')) return 'vendor-framer';
          if (id.includes('react-redux') || id.includes('@reduxjs/toolkit') || id.includes('immer') || id.includes('redux')) return 'vendor-redux';
          if (id.includes('react-router-dom') || id.includes('react-router')) return 'vendor-router';
          if (id.includes('react-dom')) return 'vendor-react';
          if (id.includes('/react/') || id.includes('/react\\')) return 'vendor-react';
          if (id.includes('notistack') || id.includes('snackbar')) return 'vendor-notistack';
          if (id.includes('node_modules')) return 'vendor-misc';
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  resolve: {
    alias: {},
  },
})
