import React, { useEffect, useState } from 'react';
import { useApi } from '../Context/ApiProvider';
import { Link } from 'react-router-dom';
import '../../App.css';
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const host = import.meta.env.VITE_SERVER_URL||"http://localhost:3000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${host}/userauthentication/getallorderstoAdmin`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }finally{
        setLoading(false);

      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
        setLoading(true);

      const response = await fetch(`${host}/userauthentication/updateOrderStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen  bg-[#f8b72c]">
          {loading  && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader"></div>
  </div>
)}
      <button className=' bg-green-500  text-white font-semibold p-3 rounded-md m-5'><Link to='/admin'>Back</Link></button>  
      <h2 className="text-2xl font-bold p-4 mb-4">Order Management</h2>
      {!loading&&orders.length === 0 && (
        <p className='bg-white text-black w-full h-20 text-center text-5xl font-bold mt-[50%] p-4' >No orders</p>
      )}
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-2">{order.productId.Name}</h3>
          <p><strong>Price:</strong> ${order.price}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">User Info</h4>
            <p><strong>Username:</strong> {order.userId.Username}</p>
            <p><strong>Email:</strong> {order.userId.Email}</p>
            <p><strong>Phone Number:</strong> {order.userId.PhoneNumber}</p>
            <p><strong>Address:</strong> {order.userId.Address}</p>
          </div>
          <div className="mt-4">
            {order.status === 'pending' && (
              <>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => updateOrderStatus(order._id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => updateOrderStatus(order._id, 'rejected')}
                >
                  Reject
                </button>
              </>
            )}
            {order.status === 'approved' && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => updateOrderStatus(order._id, 'completed')}
                >
                  Complete
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => updateOrderStatus(order._id, 'rejected')}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;
