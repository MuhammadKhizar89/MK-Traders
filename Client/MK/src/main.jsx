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
const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/cart',
      element:<Cart/>
     },
     {
      path:'/',
      element:<Products/>,
      children:[{
        
      }]
     } ,
     {
      path:'/orderDetails',
      element:<OrderDetails/>
     },
     {
      path:'/aboutus',
      element:<AboutUs/>
     } 
    ]
 },
 {
  path:'/ProductDetail',
  element:<ProductDetail/>
 }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
