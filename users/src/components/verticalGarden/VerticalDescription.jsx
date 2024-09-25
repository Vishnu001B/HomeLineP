import React, { useEffect, useState } from 'react';




const VerticalDescription = ({name}) => {
  
    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-md px-[10%]">
            <h1 className="lg:text-4xl text-3xl font-serif font-bold text-center mb-8 text-gray-800">{name }</h1>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:space-x-12">
                {/* Text Section */}
                <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left  p-6  ">
                    <p className="text-lg font-thin  leading-relaxed text-gray-700">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore commodi fugiat odit cum, expedita temporibus hic dolorem aliquam repellendus. Porro qui maxime dolorum reprehenderit ab nemo alias aperiam sint quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio animi, ut exercitationem expedita quibusdam dolorem. Voluptas, est perferendis vel molestiae id optio temporibus odio deserunt minus ipsam. Sed, maxime! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis obcaecati laboriosam aut autem praesentium voluptatum labore enim, exercitationem ex quis facilis consequatur minima officia iste reiciendis quisquam accusantium modi voluptas magnam recusandae fugiat quasi sunt earum! Pariatur unde ipsa repellat nulla laudantium quibusdam laboriosam et voluptatem distinctio voluptatibus? Culpa, eveniet fuga? Adipisci eius deleniti, ullam illo cumque pariatur delectus, rem nam reiciendis neque doloremque, recusandae ab commodi magnam ea laudantium cum maiores 
                    </p>
                </div>
                {/* Form Section */}
                <div className="lg:w-1/4 bg-white rounded-md shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-center h-10 pt-2 bg-[#161515] text-white rounded-t-md ">Get Your Free Consultation</h2>
                    <form className="space-y-4 p-6 ">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Name..."
                            />
                        </div>
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email..."
                            />
                        </div>
                        {/* Mobile Field */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Mobile</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Mobile..."
                            />
                        </div>
                        {/* Address and Comment Fields */}
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label className="block text-sm font-medium mb-1 text-gray-700 w-full">Address</label>
                                <textarea
                                    className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Address..."
                                    rows="3"
                                ></textarea>
                            </div>
                            {/* <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Comment</label>
                                <textarea
                                    className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Comment..."
                                    rows="3"
                                ></textarea>
                            </div> */}
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-[#67373E] text-white rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerticalDescription;
