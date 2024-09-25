import React from 'react';

const PremiumCategory = ({ category, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 md:mx-0 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-extrabold mb-4 text-center text-gray-900">{category?.category} Details</h2>
                <div className="flex justify-center mb-4">
                    <img src={category.img} alt={category.name} className="w-3/4 h-auto rounded-xl object-cover shadow-md" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{category.name}</h3>
                <p className="mb-2 text-gray-700">
                    Original Price: <span className="line-through text-gray-500">{category.price}</span>
                </p>
                <p className="mb-2 text-gray-700">Discounted Price: <span className="text-green-600 font-bold">{category.discountedPrice}</span></p>
                <p className="mb-2 text-gray-700">Discount Percentage: <span className="text-blue-600">{category.discountpersentage}%</span></p>
                <p className="mb-2 text-gray-700">Delivery: {category.delivery}</p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-full w-full transition-transform transform hover:scale-105"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default PremiumCategory;
