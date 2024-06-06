import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Set visible to true whenever message changes
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]); // Add message as a dependency

  return (
    <div className={`fixed bottom-3 right-3 p-4 bg-green-500 text-white rounded-md shadow-lg ${visible ? '' : 'hidden'}`}>
      {message}
    </div>
  );
}

export default Alert;
