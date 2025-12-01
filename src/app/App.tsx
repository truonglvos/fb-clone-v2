import { RootProvider } from './providers';
import { Router } from './routes/Router';

export default function App() {
	return (
		<RootProvider>
			<Router />
		</RootProvider>
	);
}
