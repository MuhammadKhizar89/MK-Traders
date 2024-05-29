import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const OrderDetails = () => {
  const [selectedOption, setSelectedOption] = useState("pending");
  return (
    <>
    <div className='bg-gradient-to-b p-2 from-[#f8b72c] to-black '>
    <p className='text-3xl font-bold text-center mb-4'>Order Details</p>
      <div className="flex justify-center ">
        <div className="flex flex-wrap justify-center">
          <button
            className={`py-2 px-4 rounded-l-lg ${
              selectedOption === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedOption("pending")}
          >
            Pending
          </button>
          <button
            className={`py-2 px-4 ${
              selectedOption === "approved"
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedOption("approved")}
          >
            Approved
          </button>
          <button
            className={`py-2 px-4 rounded-r-lg md:rounded-none ${
              selectedOption === "completed"
                ? "bg-green-800 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedOption("completed")}
          >
            Completed
          </button>
          <button
            className={`py-2 px-4 mt-2 md:mt-0 rounded-l-lg md:rounded-none ${
              selectedOption === "cancelled"
                ? "bg-red-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedOption("cancelled")}
          >
            Cancelled
          </button>
          <button
            className={`py-2 px-4 mt-2 md:mt-0  rounded-r-lg ${
              selectedOption === "rejected"
                ? "bg-red-800 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setSelectedOption("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>
   
   <div className='flex flex-wrap  justify-center text-white m-2'>
      <div className='flex flex-col md:flex-row h-30 my-2 border-gray-100 bg-white rounded-lg' >
         <div className="rounded-lg m-2 border-2  flex justify-center  shadow-lg">
            <img className=" md:h-52 w-64 m-3 " src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
        </div>
        <div className="mt-4 px-5 flex flex-col">
            <h5 className="text-xl md:text-2xl font-bold mt-2 tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
            <h5 className="text-xl mt-1 font-bold text-slate-900">Quatity:</h5>
            <h5 className="text-xl  mt-1 font-bold text-slate-900">Total:</h5>
            <h5 className="text-xl  mt-1 font-bold text-slate-900">Order Date:</h5>
            <button className='bg-red-500 hover:bg-red-800 self-end rounded-md p-2 w-1/2 mt-2 md:mt-12 mb-2'>Cancel Order</button> 
        </div>
        </div>        
     </div>
    </div>   
    </>
  );
}
export default OrderDetails;
