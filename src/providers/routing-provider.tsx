import { AppLayout } from '@/components';
import { Home } from '@/views';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  )
);

export function RoutingProvider() {
  return <RouterProvider router={router} />;
}
