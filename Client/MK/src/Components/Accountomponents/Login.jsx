import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Login = ({SetloginState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(!SetloginState)
            {
                
            }
        console.log(location.pathname);
    })
  return (
  <>
  <div className='z-30 absolute top-0 right-0 left-0 bottom-0 bg-black opacity-70 h-screen'></div>
   <div className='z-50 top-0 absolute w-full h-screen'>
        <div className='flex justify-end m-5'>
        <div onClick={() => {if(SetloginState){SetloginState(false);} document.body.style.overflow = '';  if(location.pathname=='/Login'){ navigate('/')}} } className='bg-black  absolute top-0 right-0 mr-4 md:mr-0 mt-3 md:mt-0 md:relative hover:bg-gray-600 ml-2 w-10 h-10 flex justify-center items-center rounded-full'>
           <i className=' fa-solid self text-white fa-2x fa-xmark'></i>
        </div>
        </div>
        <body class=" flex px-2 mt-16 md:mt-0 items-center justify-center">
    <div class="  flex justify-center items-center ">
    <div class="grid ">
      <div
        id="back-div"
        class=" rounded-[26px]  "
      >
        <div
          class="border-[20px]  border-transparent rounded-[20px]  bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 "
        >
          <h1 class="py-2 font-bold  text-2xl text-center cursor-default">
            Log in
          </h1>
          <form action="#" method="post" class="space-y-4 p-5">
            <div>
              <label for="email" class="mb-2   text-lg">Email</label>
              <input
                id="email"
                class="border p-3   dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label for="password" class="mb-2  text-lg">Password</label>
              <input
                id="password"
                class="border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <a
              class="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
             
            </a>
            <button
              class="bg-[#f8b72c] shadow-lg mt-6 hover:border-2 hover:border-black p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
          <div class="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 class="">
              Don't have an account?
              <a
                class="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span
                  class="bg-left-bottom underline bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                    <Link to='/SignUp'>
                  Sign Up
                  </Link>
                </span>
              </a>
            </h3>
          </div> 
        </div>
      </div>
      </div>
    </div>
  </body>

  </div>

    </>
  )
}

export default Login