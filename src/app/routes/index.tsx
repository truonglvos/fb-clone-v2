import { Login } from '@features/auth/pages/Login';
import { HomePage } from '@features/home';
import { NotFoundPage } from '@features/notFound';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const routes: RouteObject[] = [
	{
		path: '/login',
		element: <Login />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: 'home',
				element: <HomePage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export const router = createBrowserRouter(routes);
