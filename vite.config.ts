import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@config': path.resolve(__dirname, './src/config'),
			'@features': path.resolve(__dirname, './src/features'),
			'@services': path.resolve(__dirname, './src/services'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@styles': path.resolve(__dirname, './src/styles'),
		},
	},
});
