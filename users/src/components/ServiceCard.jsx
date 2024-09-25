import React from 'react';
import interior1 from '../assets/image/chandelier_thumbnails_1.webp'; // Ensure correct import path
import interior2 from '../assets/image/Pendant_light_thumbnails.webp'; 
import interior3 from '../assets/image/wall_lightCategory_thumbnails.webp'; 
import interior4 from '../assets/image/table_lamp_Category_thumbnails.webp'; 
import interior5 from '../assets/image/floor_lamp_Category_thumbnails.webp'; 
import interior6 from '../assets/image/home-decor-Category-thumbnails.webp'; 
import interior7 from '../assets/image/ceiling-light-Category-thumbnails.webp';  
import interior8 from '../assets/image/outdoor_light_Category_thumbnails.webp'; 
import interior9 from '../assets/image/ceiling_fan_Category_thumbnails.webp'; 
import { useNavigate } from 'react-router-dom';



const services = [
  {
    title: 'Full Home Interior',
    image: interior9, // Using actual imported image path
  },
  {
    title: 'Wardrobe',
    image: interior8, // Using actual imported image path
  },
  {
    title: 'Kitchen',
    image: interior3, // Using actual imported image path
  },
  {
    title: 'Full Home Interior',
    image: interior1, // Using actual imported image path
  },
  {
    title: 'Wardrobe',
    image: interior4, // Using actual imported image path
  },
  {
    title: 'Kitchen',
    image: interior5, // Using actual imported image path
  },
];

const ServiceCard = ({ title, image }) => {
  const navagite = useNavigate()
  return (
    <div className="relative w-full h-32 md:h-48 lg:h-56 xl:h-72 bg-cover bg-center m-2 " style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black opacity-50 rounded-md shadow-md shadow-black"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold font-serif">{title}</h2>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded font-serif" onClick={()=>navagite(`/verticalGarden/${title}`)}>Read more</button>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <div className=" px-[5%] py-4 bg-[#EEEEEE]">
      <h1 className="lg:text-4xl font-bold text-2xl  tracking-wide font-serif">Interior Design</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} image={service.image} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
