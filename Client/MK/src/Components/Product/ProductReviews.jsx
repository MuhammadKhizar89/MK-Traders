import React from 'react'

const ProductReviews = () => {
  return (
    <>
    <div className='bg-[white] ml-2 '>
<div className='flex justify-evenly px-10 py-2'>
<div className='flex flex-col '>
   <div className='text-2xl'> 4.5</div>
   <div className='flex'>
   {[...Array(5)].map(() => (       
   <svg  className={`h-6 w-6 cursor-pointer text-yellow-400 `}
   fill="currentColor"
   viewBox="0 0 20 20">
   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>        
   </svg>
   ))}

</div>
   <div>117 Ratings</div>
</div>
  <div className='flex flex-col '>
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {[...Array(5)].map((_, starIndex) => (
            <svg key={starIndex} className={`h-6 w-6 cursor-pointer ${rowIndex<5-starIndex ? 'text-yellow-400' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>        
            </svg>
          ))}
          <div >{rowIndex}</div>
        </div>
      ))}
    </div>
</div>
    </div>
    </>
  )
}

export default ProductReviews