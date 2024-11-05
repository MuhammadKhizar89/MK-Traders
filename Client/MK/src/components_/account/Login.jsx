import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../Components/Context/ApiProvider';
import "../../App.css";
const Login = ({ setLoginState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApi();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    // Basic form validation
    if (!Email || !Password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      const response = await login({ Email, Password });
      setLoading(false);
      if (response.message === 'Login successful') {
        if (setLoginState) {
          setLoginState(false);
        }
        document.body.style.overflow = '';
        navigate('/');
      }
      else if(response.message === 'Admin Login successful'){
        navigate('/admin');
      }
      else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoading(false);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className='z-30 absolute top-0 right-0 left-0 bottom-0 bg-black opacity-70 h-screen'></div>
      <div className='z-50 top-0 absolute w-full h-screen'>
        <div className='flex justify-end m-5'>
          <div
            onClick={() => {
              if (setLoginState) {
                setLoginState(false);
              }
              document.body.style.overflow = '';
              if (location.pathname === '/login') {
                navigate('/');
              }
            }}
            className='bg-black absolute top-0 right-0 mr-4 md:mr-0 mt-3 md:mt-0 md:relative hover:bg-gray-600 ml-2 w-10 h-10 flex justify-center items-center rounded-full'
          >
            <i className='fa-solid self text-white fa-2x fa-xmark'></i>
          </div>
        </div>
        <div className="flex px-2 mt-16 md:mt-0 items-center justify-center">
          <div className="flex justify-center items-center">
            <div className="grid">
              <div id="back-div" className="rounded-[26px]">
                <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2">
                  <h1 className="py-2 font-bold text-2xl text-center cursor-default">
                    Log in
                  </h1>
                  <form onSubmit={handleLogin} className="space-y-4 p-5">
                    <div>
                      <label htmlFor="email" className="mb-2 text-lg">Email</label>
                      <input
                        id="email"
                        className="border p-3 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="email"
                        placeholder="Email"
                        required
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="mb-2 text-lg">Password</label>
                      <input
                        id="password"
                        className="border p-3 shadow-md dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="password"
                        placeholder="Password"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button
                      className="bg-[#f8b72c] shadow-lg mt-6 hover:border-2 hover:border-black p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                      type="submit"
                    >
                      LOG IN
                    </button>
                  </form>
                  <div className="flex flex-col mt-4 items-center justify-center text-sm">
                    <h3>
                      Don't have an account?
                      <span
                        className="group text-blue-400 transition-all duration-100 ease-in-out underline"
                      >
                        <Link to='/SignUp'>
                          Sign Up
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
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Login;
