import React from 'react';

const CheckoutModal = ({ products, userinfo, total, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        {products.map((product, index) => (
          <div key={index}>
            <p className="mb-2">Product Name: <span className="font-semibold">{product.Name}</span></p>
            <p className="mb-2">Product Price: <span className="font-semibold">Rs {product.Price*product.quantity}</span></p>
            {/* Add more details about each product as needed */}
          </div>
        ))}
        <p className="mb-4 underline font-bold ">Total Bill: <span className="font-bold text-xl">Rs{total}</span></p>
        <h3 className="text-lg font-bold mb-2">User Information</h3>
        <p className="mb-2">Username: <span className="font-semibold">{userinfo?.Username}</span></p>
        <p className="mb-2">Phone Number: <span className="font-semibold">{userinfo?.PhoneNumber}</span></p>
        <p className="mb-2">Email: <span className="font-semibold">{userinfo?.Email}</span></p>
        <p className="mb-4">Address: <span className="font-semibold">{userinfo?.Address}</span></p>
        <button onClick={onCancel} className="bg-red-500 mr-2 text-white px-4 py-2 rounded hover:bg-red-700">Cancel</button>
        <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Confirm Buy</button>
      </div>
    </div>
  );
};

export default CheckoutModal;

