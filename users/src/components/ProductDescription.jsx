import React from 'react'
import home from '../assets/image/lighting.webp'
import { Helmet } from 'react-helmet'

const ProductDescription = () => {
    return (
        <div className='lg:flex md:flex flex-row-reverse justify-center items-center gap-10 py-5 px-[5%] bg-[#293241] text-white rounded-2xl'>
           
           <Helmet>
                <title>Decorative Lighting | Elevate Your Home Decor</title>
                <meta name="description" content="Discover our high-end decorative lighting that blends design and creativity. Perfect for complementing any home style." />
                <meta name="keywords" content="decorative lighting, home lighting, design lighting, modern lighting, home decor" />
                <meta name="author" content="YourCompanyName" />
            </Helmet>
            <div className='lg:w-1/2 md:w-1/2'>
                <img src={home} alt="Decorative Lighting" className='rounded-sm object-cover w-full h-auto' />
            </div>

            <div className='lg:w-1/2 md:w-1/2 my-4'>
                <h1 className='text-center my-4 text-5xl font-md'> <span className='text-[#06d6a0] text-center my-4 text-6xl font-bold'>D</span>ecorative <span className='text-[#ee6c4d] text-center my-4 text-6xl font-bold'>L</span>ighting</h1>
                <div className='flex justify-center items-center my-4'>
                    <p className='lg:w-9/12 text-center text-gray-700 text-white'>
                        Experience the harmony of high-end designs that tie your home together and materials that complement your style. Embrace the thrill of a creative process that’s experimental in a lighting range that’s the star of your story.
                    </p>
                </div>
                <div className='flex justify-center items-center my-4 '>
                    <button className='border-2  border-black text-black px-8 py-2  rounded-sm shadow-md hover:bg-[black] hover:text-white bg-white'>
                        Discover
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
