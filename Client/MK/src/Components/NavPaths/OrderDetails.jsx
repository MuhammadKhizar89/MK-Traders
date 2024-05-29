import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  const [selectedOption, setSelectedOption] = useState("completed");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  return (
    <>
      <div className='bg-gradient-to-b p-2 from-[#f8b72c] to-black'>
        <p className='text-3xl font-bold text-center mb-4'>Order Details</p>
        <div className="flex justify-center">
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
              className={`py-2 px-4 mt-2 md:mt-0 rounded-r-lg ${
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
   {(selectedOption === "cancelled" ||selectedOption === "rejected" )&& <p className='mt-2  text-center text-white'>
    <div className='capitalize inline'>{selectedOption } </div>
      Data will automatically deleted After 30 days</p>
       }    <div className='flex flex-wrap justify-center text-white m-2'>
          <div className='flex flex-col md:flex-row h-30 my-2 border-gray-100 bg-white rounded-lg'>
            <div className="rounded-lg m-2 border-2 flex justify-center shadow-lg">
              <img className="md:h-52 w-64 m-3" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
            </div>
            <div className="mt-4 px-5 flex flex-col">
              <h5 className="text-xl md:text-2xl font-bold mt-2 tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
              <h5 className="text-xl mt-1 font-bold text-slate-900">Quantity: 1</h5>
              <h5 className="text-xl mt-1 font-bold text-slate-900">Total: $449</h5>
              {selectedOption!="completed"&&<h5 className="text-xl mt-1 font-bold text-slate-900">Order Date: 2024-05-29</h5>}
              {selectedOption=="pending"&&<p className='text-sm text-black'>Waiting for approval by the onwer</p>}
              {selectedOption=="approved"&&<p className='text-sm mb-2 text-black'>Your Order will be delivered soon</p>}
              {selectedOption=="completed"&&<p className='text-sm text-black'>Give Rating</p>}
              {selectedOption=="cancelled"&&<p className='mb-2'></p>}
              {selectedOption=="rejected"&&<p className='mb-2 text-sm text-black'>Your Order has been rejected by the onwer</p>}
              {selectedOption !== "rejected"&&selectedOption !== "cancelled"&&selectedOption !== "approved" && selectedOption !== "completed" && (
                <button className='bg-red-500 hover:bg-red-800 self-end rounded-md p-2 w-1/2 mt-2 md:mt-12 mb-2'>Cancel Order</button>
              )}

              {selectedOption === "completed" && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded-md text-black"
                    placeholder="Write your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={() => setRating(star)}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>        
                      </svg>
                    ))}
                  </div>
                  <p className='text-black'>Rating: {rating}</p>
                </div>
              )}
              {selectedOption == "completed" && (
                <button className='bg-green-500 hover:bg-green-800 self-end rounded-md p-2 w-1/2 mt-2 md:mt-12 mb-2'>Submit Rating</button>
              )}
            </div>
          </div>
        </div>
      </div>   
    </>
  );
}

export default OrderDetails;
