import { createBrowserRouter, RouterProvider } from 'react-router';
import {
  LoginHomePage,
  SearchId,
  SignUpFormFirstStep,
  SignUpFormSecondStep,
  SignUpFormThirdStep,
  SignUpPage,
  SignUpFormFourthStep,
} from '../index';
import { Layout } from './Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{
      path: '/search',
      element: <SearchId />
    }]
  },
  {
    path: '/login',
    element: <LoginHomePage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    children: [
      {
        path: 'step1',
        element: <SignUpFormFirstStep />,
      },
      {
        path: 'step2',
        element: <SignUpFormSecondStep />,
      },
      {
        path: 'step3',
        element: <SignUpFormThirdStep />,
      },
      {
        path: 'step4',
        element: <SignUpFormFourthStep />,
      },
    ],
  },
  {
    path: '/search',
    element: <SearchId />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
