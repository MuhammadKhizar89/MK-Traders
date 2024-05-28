import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* White line above the footer */}
      <hr className="border-t border-gray-600" />

      {/* Footer */}
      <div className='bg-black font-bold py-5 text-white  text-center'>
        All rights reserved by MK Traders
      </div>
    </div>
  );
};

export default Footer;
