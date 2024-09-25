import React, { useEffect, useState } from 'react';
import vg from '../../assets/image/vg2.jpg';
import CollectionOfImage from './CollectionOfImage';
import VerticalDescription from './VerticalDescription';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../../data';

const VerticalGarden = () => {
    const { name } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { pathname } = useLocation();


    useEffect(() => {
        const selectname = name;

        // Filter products based on the category or name from URL params
        const filtered = products.filter(
            (product) => product.category.toLowerCase() === selectname.toLowerCase()
        );

        setFilteredProducts(filtered);
    }, [name]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    return (
        <>
            <div className="relative w-screen h-[70vh]">
                <img src={filteredProducts[0]?.img ||vg} alt="vg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded transition duration-300 hover:bg-white hover:bg-opacity-90 hover:text-black hover:scale-110">
                        {name || "Vertical Garden"}
                    </h1>
                </div>
            </div>
            <div>
                <div className='w-1/2'>
                    <div></div>
                    <div></div>
                </div>
                <div className='w-1/2'>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='mt-20'>
                {/* Pass the filteredProducts to CollectionOfImage component as a prop */}
                <CollectionOfImage products={filteredProducts} />
            </div>
            <div className='mt-20'>
                <VerticalDescription name ={name } />
            </div>
        </>
    );
};

export default VerticalGarden;
