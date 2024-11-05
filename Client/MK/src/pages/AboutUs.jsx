import React from 'react';
import img3 from '../assets/abc.jpg'; // Adjust the path accordingly

const AboutUs = () => {
  return (
    <div id="about" className="relative bg-[#f8b72c] overflow-hidden md:flex md:justify-between">
      <div className="max-w-7xl mx-auto md:flex md:w-full">
        <div className="relative z-10 pb-8 bg-[#f8b72c] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-1/2 lg:pb-28 xl:pb-32">
          <div className="pt-1"></div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                About Us
              </h2>
              <p>
                Welcome to MK Traders, your trusted supplier of top-quality janitorial products. We offer a comprehensive range of cleaning supplies, including high-quality phynyl, acid, and bleach, all manufactured to ensure effective cleaning and hygiene.
              </p>
              <p>
                Our products not only clean but also protect and enhance your environment. Whether for residential or commercial use, our solutions keep your spaces spotless and safe. Our phynyl provides excellent disinfectant properties, our acid tackles tough stains, and our bleach whitens and sanitizes effectively.
              </p>
              <p>
                Join our satisfied customers who trust MK Traders for their janitorial needs. We are committed to innovation and excellence, continuously improving our products to meet the highest standards. Thank you for choosing MK Traders – where quality meets reliability.
              </p>
            </div>
          </main>
        </div>
        <div className="lg:w-1/2 md:flex md:justify-end md:items-center mx-4 ">
          <img
            className="md:w-[80%] md:h-[85%] mb-2 border-2 border-black"
            src={img3}
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
