import React, { lazy, FC } from 'react';

import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import User from '../pages/user';
import WrapperRouteComponent from './config';
import { useRoutes, RouteObject } from 'react-router-dom';
import Role from '@/pages/role';

const NotFound = lazy(() => import('@/pages/404'));
const Book = lazy(() => import('../pages/bookType'));
const BookInfo = lazy(() => import('../pages/bookInfo'));
const Borrow = lazy(() => import('../pages/borrow'));
const BookList = lazy(() => import('../pages/BookList'));
const MyBookList = lazy(() => import('../pages/MyBookList'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/user',
        element: (
          <WrapperRouteComponent>
            <User />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/role',
        element: (
          <WrapperRouteComponent>
            <Role />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/bookType',
        element: (
          <WrapperRouteComponent>
            <Book />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/BookInfo',
        element: (
          <WrapperRouteComponent>
            <BookInfo />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/borrowManager',
        element: (
          <WrapperRouteComponent>
            <Borrow />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/bookList',
        element: (
          <WrapperRouteComponent>
            <BookList />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/myBookList',
        element: (
          <WrapperRouteComponent>
            <MyBookList />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
