import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <>
    <div className='md:bg-[#f8b72c] px-5 pb-5' >
    <button className=' bg-green-500  text-white font-semibold p-3 rounded-md m-5'><Link to='/'>Back</Link></button>
    <body class="flex  md:bg-[#f8b72c]  items-center justify-center">
  <div class="flex justify-center items-center">
    <div class="grid">
      <div id="back-div" class="rounded-[26px]">
        <div class="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2">
          <h1 class="py-2 font-bold text-2xl text-center cursor-default">Sign Up</h1>
          <form action="#" method="post" class="space-y-4 p-5">
            <div>
              <label for="full-name" class="mb-2 text-lg">Full Name</label>
              <input
                id="full-name"
                class="border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label for="email" class="mb-2 text-lg">Email</label>
              <input
                id="email"
                class="border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label for="address" class="mb-2 text-lg">Address</label>
              <input
                id="address"
                class="border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="Home / Shop Address"
                required
              />
            </div>
            <div>
              <label for="contact-no" class="mb-2 text-lg">Contact Number</label>
              <input
                id="contact-no"
                class="border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="tel"
                placeholder="Contact Number"
                required
              />
            </div>
            <div>
              <label for="password" class="mb-2 text-lg">Password</label>
              <input
                id="password"
                class="border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <label for="confirm-password" class="mb-2 text-lg">Confirm Password</label>
              <input
                id="confirm-password"
                class="border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button
              class="bg-[#f8b72c] shadow-lg mt-6 hover:border-2 hover:border-black p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN UP
            </button>
          </form>
          <div class="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 class="">
              Already have an account?
              <a
                class="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              >
                <span
                  class="bg-left-bottom underline bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                    <Link to='/Login'>
                    Log In
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

export default SignUp