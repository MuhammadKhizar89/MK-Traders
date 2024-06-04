import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProductDetail from './Components/Product/ProductDetail.jsx'
import Cart from './Components/NavPaths/Cart.jsx'
import Products from './Components/Product/Products.jsx'
import AboutUs from './Components/NavPaths/AboutUs.jsx'
import OrderDetails from './Components/NavPaths/OrderDetails.jsx'
import SignUp from './Components/Accountomponents/SignUp.jsx'
import Login from './Components/Accountomponents/Login.jsx'
import ApiProvider from './/Components/Context/ApiProvider.jsx'; // Import the ApiProvider

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/',
        element: <Products />,
        children: []
      },
      {
        path: '/orderDetails',
        element: <OrderDetails />
      },
      {
        path: '/aboutus',
        element: <AboutUs />
      }
    ]
  },
  {
    path: '/product/:productid',
    element: <ProductDetail />
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/Login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider> {/* Wrap the RouterProvider with ApiProvider */}
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>
)
