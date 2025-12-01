import { HomePage } from '@features/home';
import { NotFoundPage } from '@features/notFound';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export const router = createBrowserRouter(routes);
