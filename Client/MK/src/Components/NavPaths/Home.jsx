import React, { useState, useEffect, useRef } from 'react';
import img1 from '../../assets/Land1.jpg';
import img2 from '../../assets/Land2.jpg';
import img3 from '../../assets/Land3.jpg';
import '../../App.css';
import { Link } from 'react-router-dom';
import Login from '../Accountomponents/Login';
import { useCookies } from 'react-cookie';
import { useApi } from '../../Components/Context/ApiProvider';
const Home = () => {
  const data = [img1, img2, img3];
  const messages = [
    'This is the website of suppliers of janitorial items.',
    'We provide a wide range of cleaning products.',
    'Quality and service you can trust.'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const dropdownRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const { logout } = useApi();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'email', 'username']);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setDropdownStatus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownStatus(false);
  };

  return (
    <>
      <div className='bg-[#f8b72c]'>
        <div className='flex-col text-center md:flex md:flex-row justify-between p-4'>
          <div className='font-bold text-5xl'>
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
              <Link to='/'>MK</Link>
              <span className="text-blue-600 dark:text-blue-500"> <Link to='/'>Traders</Link></span>
            </h1>
          </div>
          <div className='flex justify-center md:justify-end h-10'>
            <input className='pl-2 mt-2 md:mt-0 md:w-[80vh] text-black rounded-l-md' type="text" placeholder='Search Any Product' />
            <button className='bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-950 font-medium rounded-r-md px-2 mt-2 md:mt-0'>Search</button>
            <div
              ref={toggleButtonRef}
              className='bg-white absolute top-0 right-0 mr-4 md:mr-0 mt-3 md:mt-0 md:relative hover:bg-gray-600 ml-2 w-10 h-10 flex justify-center items-center rounded-full'
              onClick={() => setDropdownStatus(!dropdownStatus)}
            >
           {cookies.token ?   <i className='fa-solid fa-user'></i>: <i className='fa-solid fa-right-to-bracket'></i>}
            </div>
            
            {dropdownStatus && (
              <div ref={dropdownRef} id='dropdownInformationButton' className="z-10 absolute top-15 right-2 md:top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                {cookies.email && cookies.username ? (
                  <>
                    <div className="px-4 py-3 text-sm text-black bg-text-white">
                      <div>Hello {cookies.username}</div>
                      <div className="font-medium truncate">{cookies.email}</div>
                    </div>
                    <div className="py-2">
                      <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={handleLogout}>Logout</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-2">
                      <Link to="/SignUp" className="block px-4 py-2 text-sm hover:bg-gray-200" >Create An Account</Link>
                    </div>
                    <div className="py-2">
                      <Link className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={() => { setLoginState(true); document.body.style.overflow = 'hidden'; setDropdownStatus(false); }}>Login</Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='w-full text-white abc' style={{ backgroundImage: `url(${data[currentIndex]})` }}>
        <div className='overlay'>
          <div className='message'>
            <h1>{messages[currentIndex]}</h1>
          </div>
        </div>
      </div>
      {loginState &&
        <Login setLoginState={setLoginState} />
      }
    </>
  );
};

export default Home;
