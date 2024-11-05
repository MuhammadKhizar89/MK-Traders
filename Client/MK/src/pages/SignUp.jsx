import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../contextAPI/ApiProvider';
import { useCookies } from 'react-cookie';

const SignUp = () => {
  const { signup } = useApi(); // Use the signup function from the ApiProvider
  const [setCookie] = useCookies(['token', 'email']);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      setAddToCartLoading(true);
      const response = await signup({
        Username: username,
        PhoneNumber: phoneNumber,
        Email: email,
        Address: address,
        Password: password
      });
      if (response.message === 'Registered successful') {
        setCookie('token', response.token);
        setCookie('email', response.Email );
        setCookie('username', response.Username);
        navigate('/'); 
      } else {
        setErrors({ email: response.message });
        if(response.message=="User with this phone number already exists")
        setErrors({ phoneNumber: response.message });

        console.error('Signup failed:', response.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }finally{
      setAddToCartLoading(false);

    }
  };

  return (
    <>
     {(addToCartLoading) && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="loader"></div>
  </div>
)}
      <div className='md:bg-[#f8b72c] px-5 pb-5'>
        <button className='bg-green-500 text-white font-semibold p-3 rounded-md m-5'>
          <Link to='/'>Back</Link>
        </button>
        <div className="flex items-center justify-center md:bg-[#f8b72c]">
          <div className="flex justify-center items-center">
            <div className="grid">
              <div id="back-div" className="rounded-[26px]">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2">
                  <h1 className="py-2 font-bold text-2xl text-center cursor-default">Sign Up</h1>
                  <form onSubmit={handleSignUp} className="space-y-4 p-5">
                    <div>
                      <label htmlFor="full-name" className="mb-2 text-lg">Full Name</label>
                      <input
                        id="full-name"
                        className={`border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.username && 'border-red-500'}`}
                        type="text"
                        placeholder="Full Name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 text-lg">Email</label>
                      <input
                        id="email"
                        className={`border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.email && 'border-red-500'}`}
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="address" className="mb-2 text-lg">Address</label>
                      <input
                        id="address"
                        className={`border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.address && 'border-red-500'}`}
                        type="text"
                        placeholder="Home / Shop Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && <p className="text-red-500">{errors.address}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-no" className="mb-2 text-lg">Contact Number</label>
                      <input
                        id="contact-no"
                        className={`border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.phoneNumber && 'border-red-500'}`}
                        type="number"
                        placeholder="Contact Number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                      <label htmlFor="password" className="mb-2 text-lg">Password</label>
                      <input
                        id="password"
                        className={`border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.password && 'border-red-500'}`}
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="mb-2 text-lg">Confirm Password</label>
                      <input
                        id="confirm-password"
                        className={`border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full ${errors.confirmPassword && 'border-red-500'}`}
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    <button
                      className="bg-[#f8b72c] shadow-lg mt-6 hover:border-2 hover:border-black p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                      type="submit"
                    >
                      SIGN UP
                    </button>
                  </form>
                  <div className="flex flex-col mt-4 items-center justify-center text-sm">
                    <h3>
                      Already have an account?
                      <span
                        className="group text-blue-400 transition-all duration-100 ease-in-out underline"
                      >
                        <Link to='/Login'>
                          Log In
                        </Link>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
