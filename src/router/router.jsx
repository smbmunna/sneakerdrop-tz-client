import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
//import Products from "../pages/Products";
import AvailableProducts from "../pages/AvailableProducts";
import Login from "../pages/Login";
import NewDrop from "../pages/NewDrop";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            index: true,            
            Component: Home
        },
        {
            path: 'availableProducts',             
            Component: AvailableProducts
        },
        {
            path: 'login',             
            Component: Login
        },
        {
            path: 'newDrop',             
            Component: NewDrop
        },
    ]
  },
]);
