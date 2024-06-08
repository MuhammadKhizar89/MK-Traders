import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useApi } from '../../Components/Context/ApiProvider';
import '../../App.css';
import { Link } from 'react-router-dom';
const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useApi();
  const [cookies, , removeCookie] = useCookies(['token', 'email', 'username']);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#f8b72c] min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          Admin Dashboard
        </h1>
        <button
          className="bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-950 font-medium rounded-md px-4 py-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex-grow p-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {cookies.username}</h2>
          <p className="text-gray-600">Email: {cookies.email}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Manage Products</h3>
            <p className="text-gray-600">Add, edit, or remove products from the catalog.</p>
            <button  className="bg-gray-200 hover:bg-gray-200 text-white rounded-md px-4 py-2 mt-4" disabled>Go</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Manage Orders</h3>
            <p className="text-gray-600">View and process customer orders.</p>
            <button className="bg-blue-600 hover:bg-blue-800 text-white rounded-md px-4 py-2 mt-4"><Link to='/ordermanagement'> Go</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
