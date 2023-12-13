import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		host: '0.0.0.0'
	},
	preview: {
		port: 3000,
		host: '0.0.0.0'
	},
    test: {
        setupFiles: ['./setupTest.js'],
        global: true,
        environment: 'jsdom',
        threads: true
    
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: new URL('./src/index.ts', import.meta.url).pathname,
            name: 'ReactLayout',
            // the proper extensions will be added
            fileName: 'react-box-layout',
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              react: 'React',
            },
          },
        }
    }
});
