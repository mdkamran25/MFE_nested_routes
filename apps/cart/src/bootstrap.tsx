import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './routing/routing-factory';
import { RoutingStrategy } from './routing/types';
import { createRoot } from 'react-dom/client';

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
  return () => queueMicrotask(() => root.unmount());

};

export { mount };