import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../../App";
import { LoginHomePage, SearchId, SignUpPage } from "../index";

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
  {
    path: "/search",
    element: <SearchId />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
