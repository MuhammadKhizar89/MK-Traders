import React from 'react';
import { Link } from 'react-router-dom';
import img3 from '../../assets/hehe.jpeg'; // Adjust the path accordingly

const Cart = () => {
  const products = [
    { id: 1, name: 'Phynyl', quantity: 10, price: 500, status: 'Available' },
    { id: 2, name: 'Detergent', quantity: 5, price: 300, status: 'Available' },
    { id: 3, name: 'Bleach', quantity: 8, price: 150, status: 'Out of Stock' },
    { id: 4, name: 'Soap', quantity: 15, price: 100, status: 'Available' },
    { id: 5, name: 'Sanitizer', quantity: 20, price: 250, status: 'Available' },
    { id: 6, name: 'Mop', quantity: 7, price: 700, status: 'Available' },
    { id: 7, name: 'Gloves', quantity: 25, price: 50, status: 'Available' },
    { id: 8, name: 'Brush', quantity: 12, price: 80, status: 'Available' },
    { id: 9, name: 'Bucket', quantity: 3, price: 200, status: 'Out of Stock' },
    { id: 10, name: 'Sponge', quantity: 30, price: 30, status: 'Available' },
  ];

  return (
    <>
      <div className='bg-gradient-to-b p-2 from-[#f8b72c] to-black '>
        <div className='flex flex-col  md:p-5'>
          <div className='bg-[#f8b72c] border-2 border-black w-full rounded-t-md shadow-md md:p-4'>
            <p className='text-3xl font-bold text-center my-4'>Shopping Cart</p>
            {products.map(product => (
              <div key={product.id} className='flex  items-center justify-between p-1 border-b border-gray-200'>
                <div className='flex items-center mb-2'>
                  <div className='w-20 h-20  md:w-28 md:h-28'>
                    <img src={img3} alt="Product" className='w-full h-full object-cover rounded-md' />
                  </div>
                  <div className='flex flex-col ml-4'>
                    <p>Name: <div className='font-bold inline'> {product.name}</div></p>
                    <p>Quantity: <div className='font-bold inline'>{product.quantity}</div></p>
                    <p>Status: <div className='font-bold inline'>{product.status}</div></p>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-lg font-semibold'>Rs: {product.price}</p>
                  <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col rounded-b-lg bg-[#f8b72c] p-5 border-2 border-black'>
 <div className='flex justify-between'>
<div className='font-bold text-2xl'>SubTotal</div>
<div className='font-bold '>90pkr</div>
 </div>
 <button className='bg-blue-600 hover:bg-blue-800 rounded-md text-white p-4 my-2' >Buy All</button>
<div className='flex justify-center'>
or
 <Link to='/' className=' text-center hover:underline text-blue-600 ml-1'>  Continue Shopping</Link>

</div>

</div>
        </div>

    

      </div>

    </>
  );
}

export default Cart;
