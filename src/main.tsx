import { RootProvider } from '@app/providers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/globals.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<RootProvider>
				<App />
			</RootProvider>
		</StrictMode>,
	);
} else {
	throw new Error('Not exist root element in index.html');
}
