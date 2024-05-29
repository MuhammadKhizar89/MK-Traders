import React, { useState } from 'react';

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
      </div>
    </>
  );
}

export default OrderDetails;
