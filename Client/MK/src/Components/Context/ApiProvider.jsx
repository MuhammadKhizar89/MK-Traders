import React, { createContext, useContext, useState } from "react";
import { useCookies } from 'react-cookie';
const ApiContext = createContext();
export const useApi = () => useContext(ApiContext);
const host = import.meta.env.VITE_SERVER_URL;
// ||"https://mk-traders-backend.vercel.app"
// const host = "http://localhost:3000"
const ApiProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${host}/userauthentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.token) {
        setCookie('token', data.token, { path: '/' });
        setCookie('email', data.Email, { path: '/' });
        setCookie('username', data.Username, { path: '/' });
      }
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Error logging in");
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${host}/userauthentication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw new Error("Error signing up");
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('email', { path: '/' });
    removeCookie('username', { path: '/' });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${host}/userauthentication/getallproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setProducts(data.products);
      return data.products; // Return the products data
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Error fetching products");
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`${host}/userauthentication/getproductreview/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        return (data.reviews);
      } else {
        console.error('Error fetching product reviews:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  const getSpecificProduct = async (productId) => {
    try {
      const response = await fetch(`${host}/userauthentication/getspecificproduct/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error('Error fetching specific product:', data.message);
      }
    } catch (error) {
      console.error('Error fetching specific product:', error);
    }
  };

  const buyNow = async (productId, quantity, price, cookies) => {
    try {
      const response = await fetch(`${host}/userauthentication/buynow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
        body: JSON.stringify({ productId, quantity, price }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Error purchasing:", data.message);
      }
    } catch (error) {
      console.error("Error purchasing:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${host}/userauthentication/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Error adding to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getAllCartItems = async () => {
    try {
      const response = await fetch(`${host}/userauthentication/getallCart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token, // Pass the authentication token from cookies
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Cart items fetched successfully:", data.cartItems);
        return data.cartItems;
      } else {
        console.error("Error fetching cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const buyAllFromCart = async (cartItems) => {
    try {
      const response = await fetch(`${host}/userauthentication/buyallfromcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token, // Pass the authentication token from cookies
        },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("All cart items purchased successfully:", data.orders);
        return data.orders;
      } else {
        console.error("Error purchasing items from cart:", data.message);
      }
    } catch (error) {
      console.error("Error purchasing items from cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`${host}/userauthentication/removefromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Item removed from cart successfully:", data.message);
        return data;
      } else {
        console.error("Error removing item from cart:", data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${host}/userauthentication/getorders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        const errorData = await response.json();
        console.error("Error fetching orders:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  const handleRatingSubmit = async (orderId,productId, rating, feedback) => {
    if (!feedback) {
      alert("Please provide feedback.");
      return;
    }

    try {
      const response = await fetch(`${host}/userauthentication/givereview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
        body: JSON.stringify({
          orderId,
          productId,
          rating,
          description: feedback,
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      alert("An error occurred while submitting your review. Please try again later.");
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${host}/userauthentication/cancelorder/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Order cancelled successfully:", data.message);
        return data;
      } else {
        console.error("Error cancelling order:", data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${host}/userauthentication/getuserinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.token,
        },
      });
      if (response.ok) {
        const data = await response.json();
      console.log(data.user);
      return data.user;
      } else {
        const errorData = await response.json();
        console.error("Error fetching User Info:", errorData.message);
      }
    } catch (error) {
      console.error("Error fetching User Info:", error);
    }
  };
  
  return (
    <ApiContext.Provider
      value={{
        login,
        signup,
        logout,
        products,
        fetchProducts,
        fetchReviews,
        getSpecificProduct,
        buyNow,
        addToCart,
        getAllCartItems,
        buyAllFromCart,
        removeFromCart,
        fetchOrders,
        orders,
        handleRatingSubmit,
        cancelOrder, 
        fetchUserInfo,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;