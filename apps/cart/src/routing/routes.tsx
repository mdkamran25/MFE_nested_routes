import React from 'react';
import { Outlet } from 'react-router-dom';
import CartOrder from '../components/cartOrder';
import CartValue from '../components/cartValue';
import { NavigationManager } from '../components/NavugationManager/navigationManager';

export const routes = [
  {
    path: '/',
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <CartValue />,
      },
      {
        path: 'cartorder',
        element: <CartOrder />,
      },
    ],
  },
];
