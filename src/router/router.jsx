import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";



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
            path: 'products',             
            Component: Products
        },
        
    ]
  },
]);
