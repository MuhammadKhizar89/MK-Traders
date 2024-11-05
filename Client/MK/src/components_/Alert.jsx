import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);
  return (
    <div className={`fixed bottom-3 right-3 p-4 bg-green-500 text-white rounded-md shadow-lg ${isVisible ? '' : 'hidden'}`}>
      {message}
    </div>
  );
}

export default Alert;
