import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';
import ProductReviews from './ProductReviews';
import UserFeedback from './UserFeedback';
import { useApi } from '../../Components/Context/ApiProvider';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Alert from '../Layout/Alert';
import '../../App.css';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productid } = useParams();
  const { getSpecificProduct, buyNow, addToCart } = useApi();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token', 'email', 'username']);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const decrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleBuyNow = async () => {
    if (!cookies.token) {
      navigate('/login');
    } else {
      try {
        setBuyNowLoading(true); // Set buy now loading to true when starting buyNow action
        await buyNow(productid, quantity, product.Price, cookies); 
        setShowAlert(true);
        setAlertMessage('Item bought successfully!');
      } catch (error) {
        console.error('Error buying item:', error);
        setShowAlert(true);
        setAlertMessage('Failed to buy item');
      } finally {
        setBuyNowLoading(false); // Set buy now loading back to false after buyNow action is done
      }
    }
  };
  
  const handleAddToCart = async () => {
    if (!cookies.token) {
      navigate('/login');
    } else {
      try {
        setAddToCartLoading(true); // Set add to cart loading to true when starting addToCart action
        await addToCart(productid, quantity);
        setShowAlert(true);
        setAlertMessage('Item added to cart successfully!');
      } catch (error) {
        console.error('Error adding item to cart:', error);
        setShowAlert(true);
        setAlertMessage('Failed to add item to cart');
      } finally {
        setAddToCartLoading(false); // Set add to cart loading back to false after addToCart action is done
      }
    }
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSpecificProduct(productid);
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching specific product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [getSpecificProduct, productid]);

  // Reset showAlert after a delay
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <div className=' bg-[#f8b72c] w-full md:h-[150vh] lg:h-[120vh] p-1'>
        <button className=' bg-green-500  text-white font-semibold p-3 rounded-md m-5'><Link to='/'>Back</Link></button>
        <article className="mx-2 mb-3 bg-white max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto ">
          {loading && (
            <div className='flex justify-center mt-4'>
              <div className='loader'></div>
            </div>
          )}
          {product && (
            <div className="flex flex-col md:flex-row">
              <div className="p-5 md:w-4/6 md:p-8">
                <span className="rounded-md bg-red-500 px-2 py-1 text-xs uppercase text-white">Sale</span>
                <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl">{product.Name}</p>
                <p className="mt-3 text-gray-600">Product Description: {product.Description}</p>
                <div>
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={decrement}
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='flex md:mt-72 ' >
                  <button className="mt-4 mr-2 w-40 h-16 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-sky-500" onClick={handleBuyNow} >Buy Now</button>
                  <button className="mt-4 mr-2 w-40 h-16 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-sky-500" onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </div>
              <div className="mx-auto mb-8 md:mb-1 items-center px-5 md:flex md:p-8">
                <img className="rounded-md shadow-lg" src={product.Image} alt="Shop image" />
              </div>
            </div>
          )}
        </article>
      </div>
      {product && <ProductReviews rating={product.Rating}/>}
      <UserFeedback />
      <Footer />
      {(buyNowLoading||addToCartLoading) && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader"></div>
  </div>
)}

    </>
  );
}

export default ProductDetail;
