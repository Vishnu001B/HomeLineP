import React from 'react';
 

const SalesAdOffer = ({img , title,des,offer,price}) => {
  return (
    <div className='flex  items-center content-center justify-center'>
      <div className="flex flex-col items-center content-center justify-center bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden my-4">
      <img 
        src={img}
        alt="Sales Offer" 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{des}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-red-500">{offer}</span>
          <span className="text-sm text-gray-500 line-through">{price}</span>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Shop Now
        </button>
      </div>
    </div>
    </div>
  );
}

export default SalesAdOffer;
