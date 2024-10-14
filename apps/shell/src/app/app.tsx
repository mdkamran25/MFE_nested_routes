import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const Shop = React.lazy(() => import('shop/Module'));

const Cart = React.lazy(() => import('../components/cart/cart'))

export function App() {
  return (
    <React.Suspense fallback={null}>
      
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/cart/*" element={<Cart />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
