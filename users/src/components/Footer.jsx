import React from 'react';
import footer from "../assets/image/logo-footer.png";

const Footer = () => {
  return (
    <>
    <div className="bg-[#f9dcc4]  py-10 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Some Useful Links</h1>
          {/* <h2 className="text-xl">Connect with us on:</h2> */}
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="mb-6 md:mb-0 md:w-1/4">
            <div className="flex items-center mb-4">
              <img src={footer} alt="Logo" className="w-28 h-28 mr-2" />
              
            </div>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h1 className="text-2xl font-semibold mb-2">Our Company</h1>
            <ul className='text-gray-600'>
              <li className="mb-1"><a href="/AboutUs" className="hover:underline">About us</a></li>
              <li className="mb-1"><a href="/Testimonials" className="hover:underline">Testimonials</a></li>
              <li className="mb-1"><a href="#gallery" className="hover:underline">Gallery</a></li>
              <li className="mb-1"><a href="#privacy" className="hover:underline">Privacy policy</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h1 className="text-2xl font-semibold mb-2">Customer Service</h1>
            <ul className='text-gray-600'>
              <li className="mb-1"><a href="#services" className="hover:underline">Services</a></li>
              <li className="mb-1"><a href="/ContactUs" className="hover:underline">Contact us</a></li>
              <li className="mb-1"><a href="#faqs" className="hover:underline">Faqs</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4 ">
            <h1 className="text-2xl font-semibold mb-2 text-black">Products</h1>
            <ul className="text-sm space-y-1 text-gray-600 ">
              <li>Interior Design | Full Home Interior</li>
              <li>Wardrobe | Kitchen | Living Room</li>
              <li>False Ceiling | Interior Lighting</li>
              <li>Curtains | Readymade Curtains</li>
              <li>Customized Curtains | Blinds</li>
              <li>Roman Blinds | Roller Blinds</li>
              <li>Wooden Blinds | PVC Blinds</li>
              <li>Zebra Blinds | Mattress</li>
              <li>Peps Mattress | Wallpapers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-[#f9dcc4] flex items-center justify-between py-5 px-4  font-sm'>
    <div>
        <p>social</p>
    </div>
    <div className='flex gap-4'>
      <p>Privacy Policy</p>
      <p>Terms & Condition</p>
    </div>
    <div>
        <p>HomelineTeam 2024</p>
    </div>
  </div>
  </>
  );
};

export default Footer;
