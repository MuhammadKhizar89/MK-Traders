import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../Components/Context/ApiProvider'; 
import '../../App.css';

const ProductReviews = (props) => {
  const { productid } = useParams();
  const { fetchReviews } = useApi(); 
  const [ratingCounts, setRatingCounts] = useState({});
  const [count, setcount] = useState(0);
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const data=await fetchReviews(productid);
        setReviews(data);
        setcount(data.length);
      } catch (error) {
        console.error('Error fetching product reviews:', error);
      } finally{
        setLoading(false); // After fetching data, set loading to false

      }
    };
    getProductReviews();
  }, [fetchReviews, productid]);

  useEffect(() => {
    // Calculate rating counts
    const counts = reviews.reduce((acc, review) => {
      const rating = review.Rating.toString(); // Convert to string to use as key
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
    setRatingCounts(counts);
  }, [reviews]);

  return (
    <>
      <div className='bg-[white] ml-2 '>
      {loading && (
        <div className='flex justify-center mt-4'>
          <div className='loader'></div>
        </div>
      )}
        {!loading && <div className='flex justify-evenly px-10 py-2'>
          <div className='flex flex-col '>
            <div className='text-2xl'>{props.rating}</div>
            <div className='flex'>
              {[...Array(5)].map(() => (       
                <svg key={props.rating} className={`h-6 w-6 cursor-pointer text-yellow-400 `}
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>        
                </svg>
              ))}
            </div>
            <div>{count} Reviews</div>
          </div>
          <div className='flex flex-col '>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className='flex'>
                {[...Array(5)].map((_, starIndex) => (
                  <svg key={starIndex} className={`h-6 w-6 cursor-pointer ${rowIndex<5-starIndex ? 'text-yellow-400' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>        
                  </svg>
                ))}
                {/* <div >{5 - rowIndex}</div> */}
                <div>{ratingCounts[`${5 - rowIndex}`] || 0} </div>
              </div>
            ))}
          </div>
        </div>}
      </div>
    </>
  );
};

export default ProductReviews;
