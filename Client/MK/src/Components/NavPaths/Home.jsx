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
          <h1 class=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"><Link to='/'>MK</Link><span class="text-blue-600 dark:text-blue-500"> <Link to='/'>Traders</Link></span></h1>
          </div>
          <div className='flex justify-end h-10'>
            <input className='pl-2 mt-2 md:mt-0 md:w-[80vh]  text-black rounded-l-md' type="text" placeholder='Search Any Product' />
            <button className='bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-950 font-medium rounded-r-md px-2 mt-2 md:mt-0'>Search
</button>
<div className='bg-white hover:bg-gray-600 ml-2 w-10 h-10 flex justify-center items-center rounded-full'>
<i className='fa-solid  fa-user'></i>
</div>
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
