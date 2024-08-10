import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default ({ mode }) => { 
  // Load environment variables
  const env = loadEnv(mode, process.cwd());
  
  return defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(env.VITE_PORT) || 3000, // Vite's port
    proxy: {
      '/api': {
        target: `http://localhost:${parseInt(env.VITE_API_PORT) || 3001}/api`, // Port where Express is running
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
})};