import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useApi } from '../../Components/Context/ApiProvider';
import '../../App.css';
import Alert from '../Layout/Alert'; // Import the Alert component
import img1 from '../../assets/MKpics/phenyl.png';
import img2 from '../../assets/MKpics/acid.jpg';
import img3 from '../../assets/MKpics/hardbroom.jpg';
import img4 from '../../assets/MKpics/softbroom.jpg';
import img5 from '../../assets/MKpics/Towel.jpg';
import img6 from '../../assets/MKpics/Surf Bonus.jpg';
import img7 from '../../assets/MKpics/TrashBag.jpg';
import img8 from '../../assets/MKpics/DustCarrier.jpg';
import img9 from '../../assets/MKpics/washroobrush.jpg';
import img10 from '../../assets/MKpics/LongDustCarrier.jpg';
import img11 from '../../assets/MKpics/Wipers.jpg';
import img12 from '../../assets/MKpics/airFreshners.jpg';
import img13 from '../../assets/MKpics/Insect Killer(Cobra large)500ml.jpg';
import img14 from '../../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';
import img15 from '../../assets/MKpics/handwashliquid.jpg';
import img16 from '../../assets/MKpics/ScotchBrite.jpg';
import img17 from '../../assets/MKpics/handtowels.jpg';
import img18 from '../../assets/MKpics/GlassCleaner.jpg';
import img19 from '../../assets/MKpics/dusters.jpg';
import img20 from '../../assets/MKpics/Harpic.jpg';
import img21 from '../../assets/MKpics/MosquitoKiller(Spray)500ml.jpg';



const OrderDetails = () => {
  const images = [img1, img2, img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21];

  const [selectedOption, setSelectedOption] = useState("pending");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cookies] = useCookies(['token', 'email', 'username']);
  const { fetchOrders, orders, handleRatingSubmit, cancelOrder } = useApi();
  const navigate = useNavigate();
  const [cancelAlert, setCancelAlert] = useState(false);
  const [submitAlert, setSubmitAlert] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    } else {
      const FetchOrders = async () => {
        await fetchOrders();
        setLoading(false);
      }
      FetchOrders();
    }
  }, [cookies, navigate, fetchOrders]);

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filteredOrders = sortedOrders.filter(order => order.status === selectedOption);
  const noOrdersMessage = `No orders in ${selectedOption}`;

  const handleSubmitRating = async (orderId, productId) => {
    setSubmitting(true);
    await handleRatingSubmit(orderId, productId, rating, feedback);
    setFeedback("");
    setRating(5);
    setSubmitting(false);
    setSubmitAlert(true); // Show submit alert after successful submission
  };

  const handleCancelOrder = async (orderId) => {
    setCancelling(true);
    await cancelOrder(orderId);
    setCancelling(false);
    fetchOrders();
    setCancelAlert(true); // Show cancel alert after successful cancellation
  };

  return (
    <div className='bg-gradient-to-b p-2 from-[#f8b72c] to-black'>
       {cancelAlert && <Alert message="Order cancelled successfully!" />}
      {submitAlert && <Alert message="Rating submitted successfully!" />}
      <p className='text-3xl font-bold text-center mb-4'>Order Details</p>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center">
          <button
            className={`py-2 px-4 rounded-l-lg ${selectedOption === "pending" ? "bg-yellow-500 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedOption("pending")}
          >
            Pending
          </button>
          <button
            className={`py-2 px-4 ${selectedOption === "approved" ? "bg-green-500 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedOption("approved")}
          >
            Approved
          </button>
          <button
            className={`py-2 px-4 rounded-r-lg md:rounded-none ${selectedOption === "completed" ? "bg-green-800 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedOption("completed")}
          >
            Completed
          </button>
          <button
            className={`py-2 px-4 mt-2 md:mt-0 rounded-l-lg md:rounded-none ${selectedOption === "cancelled" ? "bg-red-500 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedOption("cancelled")}
          >
            Cancelled
          </button>
          <button
            className={`py-2 px-4 mt-2 md:mt-0 rounded-r-lg ${selectedOption === "rejected" ? "bg-red-800 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedOption("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {(selectedOption === "cancelled" || selectedOption === "rejected") && 
        <p className='mt-2 text-center text-white'>
          <div className='capitalize inline'>{selectedOption} </div> Data will automatically deleted After 30 days
        </p>
      }

      <div className='flex flex-col md:mx-[29%] flex-wrap justify-center text-white m-2'>
      {loading && (
              <div className='flex justify-center mt-4'>
                <div className='loader'></div>
              </div>
            )}
            {!loading&&
            filteredOrders.length === 0 ? (
          <div className='text-center bg-white text-black p-4 rounded-lg mt-4'>{noOrdersMessage}</div>
        ): null
      }
        {filteredOrders.map(order => (
          <div key={order._id} className='flex flex-col md:flex-row h-30 my-2 border-gray-100 bg-white rounded-lg'>
            <div className="rounded-lg m-2 border-2 flex justify-center shadow-lg">
              <img className="md:h-52 w-64 m-3" src={images[order.productId.Image]} alt="product image" />
            </div>
            <div className="mt-4 px-5 flex flex-col">
              <h5 className="text-xl md:text-2xl font-bold mt-2 tracking-tight text-slate-900">{order.productId.Name}</h5>
              <h5 className="text-xl mt-1 font-bold text-slate-900">Quantity: {order.quantity}</h5>
              <h5 className="text-xl mt-1 font-bold text-slate-900">Total: Rs {order.price*order.quantity}</h5>
              {selectedOption !== "completed" && <h5 className="text-xl mt-1 font-bold text-slate-900">Order Date: {new Date(order.date).toLocaleDateString()}</h5>}
              {selectedOption === "pending" && <p className='text-sm text-black'>Waiting for approval by the owner</p>}
              {selectedOption === "approved" && <p className='text-sm mb-2 text-black'>Your Order will be delivered soon</p>}
              {order.review==="" && selectedOption === "completed" && <p className='text-sm text-black'>Give Rating</p>}
              {order.review==="1" && selectedOption === "completed" && <p className='text-sm text-black'>Review Submitted</p>}
              {selectedOption === "cancelled" && <p className='mb-2'></p>}
              {selectedOption === "rejected" && <p className='mb-2 text-sm text-black'>Your Order has been rejected by the owner</p>}
              
              {selectedOption === "pending" && (
                <button
                  className='bg-red-500 hover:bg-red-800 self-end rounded-md p-3 mt-2 md:mt-12 mb-2'
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
              
              {order.review==="" && selectedOption === "completed" && (
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
              {order.review==="" && selectedOption === "completed" && (
                <button
                  className='bg-green-500 hover:bg-green-800 self-end rounded-md p-3 mt-2 md:mt-12 mb-2'
                  onClick={() => handleSubmitRating(order._id, order.productId._id)}
                >
                  Submit Rating
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {(submitting || cancelling) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
