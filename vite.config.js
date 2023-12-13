import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), legacy()],
	server: {
		port: 3000,
		host: '0.0.0.0'
	},
	preview: {
		port: 3000,
		host: '0.0.0.0'
	},
	build: {
		sourcemap: true
	}
});
