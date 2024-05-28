import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import img3 from '../../assets/hehe.jpeg'; // Adjust the path accordingly
import Footer from '../Layout/Footer';
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <>

  <div className=' bg-[#f8b72c] w-full h-[120vh] '>
<button className='bg-green-500  text-white font-semibold p-3 rounded-md m-5'><Link to='/'>Back</Link></button>
    <article class="mx-2 mb-3 bg-white max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto">
  <div class="flex flex-col md:flex-row">
    <div class="p-5 md:w-4/6 md:p-8">
      <span class="rounded-md bg-red-500 px-2 py-1 text-xs uppercase text-white">Sale</span>
      <p class="mt-2 text-xl font-black md:mt-6 md:text-4xl">Product Name</p>
      <p class="mt-3 text-gray-600">Product Description</p>
      <div>
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center space-x-4 mt-4">
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" 
                    onClick={decrement}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" 
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
      <div className='flex md:mt-72 ' >
      <button class="mt-4 mr-2 w-40 h-16 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-sky-500">Buy Now</button>
      <button class="mt-4 mr-2 w-40 h-16 flex items-center justify-center rounded-md bg-sky-400 px-8 py-2 text-center text-white duration-150 md:mb-4 hover:translate-y-1 hover:bg-sky-500">Add to Cart</button>
      </div>
    </div>
    <div class="mx-auto mb-8 md:mb-1 items-center px-5 md:flex md:p-8">
      <img class="rounded-md shadow-lg" src={img3} alt="Shop image" />
    </div>
  </div>
</article>
</div>
<Footer/>
</>
  )
}

export default ProductDetail