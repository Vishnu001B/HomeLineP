import React from 'react'

const Chandeliers = ({name}) => {
  return (
    <div className='my-4 flex justify-center content-center items-center flex-col font-serif'>
      <h1 className='text-center text-xl'>{name}</h1>
      <div className='flex justify-center content-center items-center gap-5 flex-wrap font-serif my-4'>
        <button className='border border-black rounded-full w-60 px-10 py-2 flex justify-center content-center items-center gap-2 flex-wrap'>
        <img src="https://www.whiteteak.com/media/customimages/best+seller(1).jpg" alt="" className='w-8 h-8' />
        <p>Best Sellers</p> 
            </button>
        <button className='border border-black rounded-full px-10 py-2 flex justify-center content-center items-center gap-2 flex-wrap' >
        <img src="https://www.whiteteak.com/media/customimages/new+arrival(1).jpg" alt="" className='w-8 h-8' />
        <p>New Arrivals</p></button>
        <button className='border border-black rounded-full px-10 py-2 flex justify-center content-center items-center gap-2 flex-wrap' >
        <img src="https://www.whiteteak.com/media/customimages/deal(1).jpg" alt="" className='w-8 h-8' />
        <p>Deals</p></button>
      </div>
    </div>
  )
}

export default Chandeliers
