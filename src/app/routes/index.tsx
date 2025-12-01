import { HomePage } from '@features/home';
import { NotFoundPage } from '@features/notFound';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		element: <ProtectedRoute />,
		children: [],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export const router = createBrowserRouter(routes);
