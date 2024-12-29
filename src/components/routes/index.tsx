import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../../App";
import { LoginHomePage, SignUpPage } from "../index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginHomePage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
