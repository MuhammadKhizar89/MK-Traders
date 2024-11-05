import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Footer';
import ProductReviews from './ProductReviews';
import UserFeedback from './UserFeedback';
import { useApi } from '../../contextAPI/ApiProvider';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import '../../App.css';
import img1 from '../../assets/MKpics/phenyl.png';
import img2 from '../../assets/MKpics/acid.jpg';
import img3 from '../../assets/MKpics/hardbroom.jpg';
import img4 from '../../assets/MKpics/softbroom.jpg';
import img5 from '../../assets/MKpics/Towel.jpg';
import img6 from '../../assets/MKpics/Surf Bonus.jpg';
import img7 from '../../assets/MKpics/TrashBag.jpg';
import img8 from '../../assets/MKpics/DustCarrier.jpg';
import img9 from '../../assets/MKpics/washroobrush.jpg';
import img10 from '../../assets/MKpics/LongDustCarrier.jpg';
import img11 from '../../assets/MKpics/Wipers.jpg';
import img12 from '../../assets/MKpics/airFreshners.jpg';
import img13 from '../../assets/MKpics/Insect Killer(Cobra large)500ml.jpg';
import img14 from '../../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';
import img15 from '../../assets/MKpics/handwashliquid.jpg';
import img16 from '../../assets/MKpics/ScotchBrite.jpg';
import img17 from '../../assets/MKpics/handtowels.jpg';
import img18 from '../../assets/MKpics/GlassCleaner.jpg';
import img19 from '../../assets/MKpics/dusters.jpg';
import img20 from '../../assets/MKpics/Harpic.jpg';
import img21 from '../../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';


const ProductDetail = () => {
  const images = [img1, img2, img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21];

  const navigate = useNavigate();
  const { productid } = useParams();
  const { getSpecificProduct, buyNow, addToCart,fetchUserInfo } = useApi();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token', 'email', 'username']);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
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
        const d = await fetchUserInfo();
        setUserinfo(d);
      } catch (error) {
        console.error('Error buying item:', error);
        setShowAlert(true);
        setAlertMessage('Failed to buy item');
      } finally {
      }
    }
  };
  const handleconfirm=async()=>{
try{
    setAddToCartLoading(true); // Set add to cart loading to true when starting addToCart action
    await buyNow(productid, quantity, product.Price, cookies); 
    setShowAlert(true);
    setAlertMessage('Item bought successfully!');
  }
 catch (error) {
  console.error('Error buying item:', error);
  setShowAlert(true);
  setAlertMessage('Failed to buy item');
} finally {
  setBuyNowLoading(false); // Set buy now loading back to false after buyNow action is done
  setAddToCartLoading(false); // Set buy now loading back to false after buyNow action is done
}

  }  
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
                <img className="rounded-md shadow-lg" src={images[product.Image]} alt="Shop image" />
              </div>
            </div>
          )}
        </article>
      </div>
      {product && <ProductReviews rating={product.Rating}/>}
      <UserFeedback />
      <Footer />
      {(addToCartLoading) && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader"></div>
  </div>
)}
{(buyNowLoading) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <p className="mb-2">Product Name: <span className="font-semibold">{product?.Name}</span></p>
            <p className="mb-2">Product Price: <span className="font-semibold">Rs {product?.Price}</span></p>
            <p className="mb-2">Quantity: <span className="font-semibold">{quantity}</span></p>
            <p className="mb-4">Total Bill: <span className="font-semibold">Rs {product?.Price * quantity}</span></p>
            <h3 className="text-lg font-bold mb-2">User Information</h3>
            <p className="mb-2">Username: <span className="font-semibold">{userinfo?.Username}</span></p>
            <p className="mb-2">Phone Number: <span className="font-semibold">{userinfo?.PhoneNumber}</span></p>
            <p className="mb-2">Email: <span className="font-semibold">{userinfo?.Email}</span></p>
            <p className="mb-4">Address: <span className="font-semibold">{userinfo?.Address}</span></p>
            <button onClick={()=>{setBuyNowLoading(false)}} className="bg-red-500 mr-2 text-white px-4 py-2 rounded hover:bg-red-700" >Cancel</button>
            <button onClick={handleconfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Confirm Buy</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
