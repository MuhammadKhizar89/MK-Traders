import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the alert
    setIsVisible(true);

    // Hide the alert after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      // Clear the timer when the component unmounts or message changes
      clearTimeout(timer);
    };
  }, [message]); // Re-run effect whenever the message changes

  return (
    <div className={`fixed bottom-3 right-3 p-4 bg-green-500 text-white rounded-md shadow-lg ${isVisible ? '' : 'hidden'}`}>
      {message}
    </div>
  );
}

export default Alert;
