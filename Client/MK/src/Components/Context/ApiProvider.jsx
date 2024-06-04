import React, { createContext, useContext, useState } from "react";
import { useCookies } from 'react-cookie';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

const host = "http://localhost:3000";

const ApiProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

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
        setReviews(data.reviews);
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
  return (
    <ApiContext.Provider value={{ login, signup , logout, products, fetchProducts, reviews, fetchReviews,getSpecificProduct }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
