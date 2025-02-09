import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './Layout.tsx';
import {LoginHomePage, SearchId} from '../../widgets/Login';
import {SignUpPage, SignUpFormFirstStep, SignUpFormSecondStep, SignUpFormThirdStep, SignUpFormFourthStep} from '../../widgets/SignUp';
import { Home } from '../../pages';
import { MainCenter } from '../../widgets/MainCenter';
import { RemainCenter } from '../../widgets/remainCenter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            index:true,
            element: <MainCenter />,
      },
          { path: ':category', element: <RemainCenter /> }
        ],
      },
      {
        path: 'search', // 상대 경로로 변경 (앞의 '/' 제거)
        element: <SearchId />,
      },
    ],
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

export function AppRouter() {
  return <RouterProvider router={router} />;
}
