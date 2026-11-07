import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';
import { NotFoundPage } from '../pages/system/NotFoundPage';
import { ServerErrorPage } from '../pages/system/ServerErrorPage';

const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '/maintenance',
    element: <ServerErrorPage />,
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const AppRouter: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};
