import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import PrivateRoute from "../Routes/PrivateRoute";
import AvailableProducts from "../pages/AvailableProducts";
import Login from "../pages/Login";
import NewDrop from "../pages/NewDrop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "availableProducts",
        element: (
          <PrivateRoute>
            <AvailableProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "newDrop",
        element: (
          <PrivateRoute>
            <NewDrop />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
