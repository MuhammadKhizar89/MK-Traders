import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../../Components/Context/ApiProvider'; // Import the useApi hook
import '../../App.css';
const UserFeedback = () => {
  const { fetchReviews} = useApi(); 
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [reviews, setReviews] = useState([]);

  const { productid } = useParams();
  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const data=await fetchReviews(productid); // Call the fetchReviews function with the productId
        setReviews(data);
      } catch (error) {
        console.error('Error fetching product reviews:', error);
      } finally {
        setLoading(false); // After fetching data, set loading to false
      }
    };
    getProductReviews();
  }, [fetchReviews, productid]);
  
  useEffect(() => {
    window.scrollTo(0, 0);       
  }, []);

  return (
    <div className='bg-gray-200 p-5 w-full'>
      {!loading && reviews.map((item, index) => ( // Render reviews only if loading is false
        <div key={index} className='border-b border-gray-300 py-4'>
          <div className='flex items-center mb-2'>
            <i className="fa-solid fa-user mr-2"></i>
            <p className='font-bold'>{item.userId.Username}</p>
          </div>
          <div className='flex mb-2'>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-6 w-6 cursor-pointer ${i < item.Rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <div className='text-gray-700'>{item.Description}</div>
        </div>
      ))}
       {loading && (
        <div className='flex justify-center mt-4'>
          <div className='loader'></div>
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
