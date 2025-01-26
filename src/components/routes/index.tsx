import {createBrowserRouter, RouterProvider} from "react-router";
import App from "../../App";
import {
  LoginHomePage,
  SearchId,
  SignUpFormFirstStep,
  SignUpFormSecondStep,
  SignUpFormThirdStep,
  SignUpPage,
  SignUpFormFourth
} from "../index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginHomePage/>,
  },
  {
    path: "/signup",
    element: <SignUpPage/>,
    children: [{
      path: "step1", element: <SignUpFormFirstStep />
    },
      {
      path: "step2", element: <SignUpFormSecondStep />
    },
      {
        path: "step3", element: <SignUpFormThirdStep />
      }, {
      path: '/step4' , element: <SignUpFormFourth />
      }
      ]
  },
  {
    path: "/search",
    element: <SearchId/>,
  },
]);

export default function Router() {
  return <RouterProvider router={router}/>;
}
