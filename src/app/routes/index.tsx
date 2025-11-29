import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { HomePage } from '@features/home'
import { NotFoundPage } from '@features/notFound'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter(routes)
