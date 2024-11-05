import React, { useState, useEffect } from 'react';
import Alert from '../components_/Alert';
import { useApi } from '../contextAPI/ApiProvider';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CheckoutModal from '../components_/CheckoutModal'; // Import the new component
import img1 from '../assets/MKpics/phenyl.png';
import img2 from '../assets/MKpics/acid.jpg';
import img3 from '../assets/MKpics/hardbroom.jpg';
import img4 from '../assets/MKpics/softbroom.jpg';
import img5 from '../assets/MKpics/Towel.jpg';
import img6 from '../assets/MKpics/Surf Bonus.jpg';
import img7 from '../assets/MKpics/TrashBag.jpg';
import img8 from '../assets/MKpics/DustCarrier.jpg';
import img9 from '../assets/MKpics/washroobrush.jpg';
import img10 from '../assets/MKpics/LongDustCarrier.jpg';
import img11 from '../assets/MKpics/Wipers.jpg';
import img12 from '../assets/MKpics/airFreshners.jpg';
import img13 from '../assets/MKpics/Insect Killer(Cobra large)500ml.jpg';
import img14 from '../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';
import img15 from '../assets/MKpics/handwashliquid.jpg';
import img16 from '../assets/MKpics/ScotchBrite.jpg';
import img17 from '../assets/MKpics/handtowels.jpg';
import img18 from '../assets/MKpics/GlassCleaner.jpg';
import img19 from '../assets/MKpics/dusters.jpg';
import img20 from '../assets/MKpics/Harpic.jpg';
import img21 from '../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';



const Cart = () => {
  const images = [img1, img2, img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21];


  const { buyAllFromCart, getAllCartItems, removeFromCart, fetchUserInfo } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'email', 'username']);
  const [removeItemLoading, setRemoveItemLoading] = useState(false);
  const [buyAllLoading, setBuyAllLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userinfo, setUserinfo] = useState(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const handleBuyAll = async () => {
    if (!cookies.token) {
      navigate('/login');
    } else {
      try {
        setBuyAllLoading(true);
        const d = await fetchUserInfo();
        setUserinfo(d);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setShowAlert(true);
        setAlertMessage('Failed to fetch user info');
      }
    }
  };

  const handleConfirmBuyAll = async () => {
    try {
    setAddToCartLoading(true); // Set add to cart loading to true when starting addToCart action

      await buyAllFromCart(cartItems);
      setCartItems([]);
      setShowAlert(true);
      setAlertMessage('All items bought successfully!');
    } catch (error) {
      console.error('Error buying all items from cart:', error);
      setShowAlert(true);
      setAlertMessage('Failed to buy all items');
    } finally {
      setAddToCartLoading(false);

      setBuyAllLoading(false);

    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
   
      setRemoveItemLoading(true);
      await removeFromCart(itemId);
      const updatedCartItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCartItems);
      setShowAlert(true);
      setAlertMessage('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setShowAlert(true);
      setAlertMessage('Failed to remove item');
    } finally {
      setRemoveItemLoading(false);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
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
      {showAlert && <Alert message={alertMessage} />}
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
                    <img src={images[item.productId.Image]} alt="Product" className='w-full h-full object-cover rounded-md' />
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
          {!(cartItems.length === 0) && (
            <div className='flex flex-col rounded-b-lg bg-gray-300 p-5 border-2 border-black'>
              <div className='flex justify-between'>
                <div className='font-bold text-2xl'>SubTotal</div>
                <div className='font-bold'>
                  {cartItems.reduce((acc, curr) => {
                    if (curr.productId.Quantity > curr.quantity) {
                      return acc + curr.productId.Price * curr.quantity;
                    } else {
                      return acc;
                    }
                  }, 0)} pkr
                </div>
              </div>
              <button className='bg-blue-600 hover:bg-blue-800 rounded-md text-white p-4 my-2' onClick={handleBuyAll}>Buy All</button>
              <div className='flex justify-center'>
                or
                <Link to='/' className=' text-center hover:underline text-blue-600 ml-1'>Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {(removeItemLoading||addToCartLoading) && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader"></div>
  </div>
)}
      {((buyAllLoading && cartItems.length > 0 && userinfo)) && (
        <CheckoutModal
        products={cartItems.map(item => ({
          ...item.productId,
          quantity: item.quantity // Add quantity information to each product
        }))}
          userinfo={userinfo}
          total={cartItems.reduce((acc, curr) => acc + curr.productId.Price * curr.quantity, 0)} // Total price
          onCancel={() => setBuyAllLoading(false)}
          onConfirm={handleConfirmBuyAll}
        />
      )}
    </>
  );
};

export default Cart;
