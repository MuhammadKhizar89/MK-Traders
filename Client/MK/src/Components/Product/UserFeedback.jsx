import React, { useState, useEffect } from 'react';
import '../../App.css';

const UserFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [displayedFeedbackCount, setDisplayedFeedbackCount] = useState(3);
  const [loading, setLoading] = useState(false);

  // Initial feedback data
  const initialFeedback = Array.from({ length: 15 }, (_, i) => ({
    userName: `User ${i + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    feedback: `This is the feedback from User ${i + 1}`
  }));

  useEffect(() => {
    setFeedback(initialFeedback);
  }, []);

  const loadMoreFeedback = () => {
    if (displayedFeedbackCount < feedback.length) {
      setLoading(true);
      setTimeout(() => {
        setDisplayedFeedbackCount(displayedFeedbackCount + 3);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadMoreFeedback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedFeedbackCount, feedback.length]);

  return (
    <div className='bg-gray-200 p-5 w-full'>
      {feedback.slice(0, displayedFeedbackCount).map((item, index) => (
        <div key={index} className='border-b border-gray-300 py-4'>
          <div className='flex items-center mb-2'>
            <i className="fa-solid fa-user mr-2"></i>
            <p className='font-bold'>{item.userName}</p>
          </div>
          <div className='flex mb-2'>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-6 w-6 cursor-pointer ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <div className='text-gray-700'>{item.feedback}</div>
        </div>
      ))}
      {loading && displayedFeedbackCount < feedback.length && (
        <div className='flex justify-center mt-4'>
          <div className='loader'></div>
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
