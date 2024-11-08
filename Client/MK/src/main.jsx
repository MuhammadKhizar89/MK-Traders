import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import ProductDetail from "./components_/product/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Products from "./pages/Products.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ApiProvider from "./contextAPI/ApiProvider.jsx"; // Import the ApiProvider
import Admin from "./pages/Admin.jsx";
import OrderMangement from "./pages/OrderMangement.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/",
                element: <Products />,
                children: [],
            },
            {
                path: "/orderDetails",
                element: <OrderDetails />,
            },
            {
                path: "/aboutus",
                element: <AboutUs />,
            },
        ],
    },
    {
        path: "/product/:productid",
        element: <ProductDetail />,
    },
    {
        path: "/SignUp",
        element: <SignUp />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/ordermanagement",
        element: <OrderMangement />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApiProvider>
            <RouterProvider router={router} />
        </ApiProvider>
    </React.StrictMode>
);
