import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { LoginHomePage } from "../index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginHomePage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
