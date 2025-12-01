import { RouterProvider } from 'react-router-dom';
import { router } from './index';

export function Router() {
	return <RouterProvider router={router} />;
}
