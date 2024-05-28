import React, { useState, useEffect } from 'react';
import img1 from '../../assets/Land1.jpg'; // Adjust the path accordingly
import img2 from '../../assets/Land2.jpg'; // Adjust the path accordingly
import img3 from '../../assets/Land3.jpg'; // Adjust the path accordingly
import '../../App.css';
import { Link } from 'react-router-dom';
const Home = () => {
  const data = [img1, img2, img3];
  const messages = [
    'This is the website of suppliers of janitorial items.',
    'We provide a wide range of cleaning products.',
    'Quality and service you can trust.'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data.length]);

  return (
    <>
      <div className='bg-[#f8b72c]'>
        <div className='flex-col text-center md:flex md:flex-row justify-between p-4'>
          <div className='font-bold text-5xl'>
          <h2 className=" text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                <Link to='/' >MK Traders</Link>
              </h2>
          </div>
          <div>
            <input className='p-2 mt-2 md:mt-0 md:w-[80vh] text-black rounded-l-md' type="text" placeholder='Search Any Product' />
            <button className='bg-green-500 font-medium rounded-r-md p-2 hover:bg-green-700'>Search</button>
          </div>
        </div>
      </div>
      <div className=' w-full text-white abc ' style={{ backgroundImage: `url(${data[currentIndex]})` }}>
        <div className='overlay'>
          <div className='message'>
            <h1>{messages[currentIndex]}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
