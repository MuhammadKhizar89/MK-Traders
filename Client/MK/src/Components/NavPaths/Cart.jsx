import React, { useState, useEffect } from 'react';
import { useApi } from '../../Components/Context/ApiProvider';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Cart = () => {
  
  const { getAllCartItems, removeFromCart } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'email', 'username']);

  const handleBuyAll = async () => {
    try {
      const orders = await buyAllFromCart(cartItems);
      console.log('All cart items purchased:', orders);
      setCartItems([]);
      // Optionally, you can clear the cartItems state or perform any other actions
    } catch (error) {
      console.error('Error buying all items from cart:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      // Update cart items after removing the item
      const updatedCartItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  useEffect(() => {
    if(!cookies.token){
      navigate('/login');
    }
    const fetchCartItems = async () => {
      try {
        const items = await getAllCartItems();
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [getAllCartItems]);

  return (
    <>
      <div className='bg-gradient-to-b p-2 from-[#f8b72c] to-black '>
        <div className='flex flex-col md:p-5'>
          <div className={`bg-gray-300 border-2 border-black w-full ${!(cartItems.length === 0) ? 'rounded-t-md' : 'rounded-md'} shadow-md md:p-4`}>
            <p className='text-3xl font-bold text-center my-4'>Shopping Cart</p>
            {loading && (
              <div className='flex justify-center mt-4'>
                <div className='loader'></div>
              </div>
            )}
            {cartItems.length === 0 && !loading && (<p className='text-md font-bold text-center text-red-500 '>No items in cart</p>)}
            {cartItems && cartItems.map(item => (
              <div key={item._id} className='flex  items-center justify-between p-1 border-b border-gray-200'>
                <div className='flex items-center mb-2'>
                  <div className='w-20 h-20 md:w-28 md:h-28'>
                    <img src={item.productId.Image} alt="Product" className='w-full h-full object-cover rounded-md' />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p>Name: <span className='font-bold inline'>{item.productId.Name}</span></p>
                    <p>Quantity: <span className='font-bold inline'>{item.quantity}</span></p>
                    <p>Status: <span className='font-bold inline'>{item.productId.Quantity > item.quantity ? "In Stock" : "Out of Stock"}</span></p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-lg font-semibold'>Rs: {item.productId.Price}</p>
                  <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700' onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          {!(cartItems.length === 0) && <div className='flex flex-col rounded-b-lg bg-gray-300 p-5 border-2 border-black'>
            <div className='flex justify-between'>
              <div className='font-bold text-2xl'>SubTotal</div>
              {/* Calculate subtotal */}
              <div className='font-bold'>
                {cartItems && cartItems.reduce((acc, curr) => {
                  // Only include the price in the subtotal if the item is in stock
                  if (curr.productId.Quantity > curr.quantity) {
                    return acc + curr.productId.Price * curr.quantity;
                  } else {
                    return acc;
                  }
                }, 0)}pkr
              </div>
            </div>
            <button className='bg-blue-600 hover:bg-blue-800 rounded-md text-white p-4 my-2' onClick={handleBuyAll}>Buy All</button>

            <div className='flex justify-center'>
              or
              <Link to='/' className=' text-center hover:underline text-blue-600 ml-1'>Continue Shopping</Link>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Cart;
