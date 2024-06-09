import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../Components/Context/ApiProvider';
import '../../App.css';
import img from './hehe.jpeg'
const Products = () => {
  const { fetchProducts, products } = useApi();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }finally{
        setLoading(false);
      }
    };
    getProducts();
  }, [fetchProducts]);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg key={i} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }

    // Render half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd"></path>
        </svg>
      );
    }

    // Render remaining gray stars
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={i + filledStars} aria-hidden="true" className="h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
    {loading && (
      <div className=' flex justify-center mt-4'>
        <div className='loader'></div>
      </div>
    )}
    <div className='bg-gradient-to-b from-[#f8b72c] to-black'>
  
      <div className='flex flex-col md:flex-row md:flex-wrap md:mx-32'>
      
        {products.map((product) => (
          <div key={product._id} className="relative m-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Link to={`/product/${product._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
              <img className="object-cover" src={img} alt={product.Name} />
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link to={`/product/${product._id}`}>
                <h5 className="text-xl tracking-tight text-slate-900">{product.Name}</h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">${product.Price}</span>
                </p>
                <div className="flex items-center">
                  {renderStars(product.Rating)}
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.Rating}</span>
                </div>
              </div>
              <Link to={`/product/${product._id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
