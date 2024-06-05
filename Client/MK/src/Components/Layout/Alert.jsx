import React, { useState, useEffect } from 'react';

const Alert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-0 right-0 p-4 bg-green-500 text-white rounded-md shadow-lg ${visible ? '' : 'hidden'}`}>
      {message}
    </div>
  );
}

export default Alert;
