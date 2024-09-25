import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CollectionOfImage = ({ products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Fallback images if products data is empty
  const fallbackImages = [
    {
      img: 'https://media.gettyimages.com/id/1310297075/photo/green-living-room-with-vertical-garden-house-plants-beige-color-sofa-and-parquet-floor.jpg?s=1024x1024&w=gi&k=20&c=gkY1a_LmqC8bRzUmXd8F6P2BQQlyg5NWIi7ZEfPaUK8=',
      name: 'image 1',
    },
    {
      img: 'https://media.gettyimages.com/id/1278321240/photo/living-wall-vertical-garden-on-a-building-exterior.jpg?s=1024x1024&w=gi&k=20&c=7YAWnzfMlw9FnSZ-SFdxlfOK4vNW_KMoGCI5dzHWWec=',
      name: 'image 2',
    },
    {
      img: 'https://media.gettyimages.com/id/1487147198/photo/green-living-room-with-turquoise-color-sofa-vertical-garden-and-tiled-floor.jpg?s=1024x1024&w=gi&k=20&c=AipCvt5pUpDwMvAp5dJLL0rEnLnIOfOVdcSZJrAe3JA=',
      name: 'image 3',
    },
    {
      img: 'https://media.gettyimages.com/id/1263893484/photo/green-building.jpg?s=1024x1024&w=gi&k=20&c=ZfguzzAY21pQV2M18Kb_SJnRKU3Gs3tRlBOvU6tOzNQ=',
      name: 'image 4',
    },
  ];

  // Use the products data if available, otherwise use fallback images
  const imagesToDisplay = products && products.length > 0 ? products : fallbackImages;

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      keyBoardControl={true}
      customTransition="transform 0.7s ease-in-out"
      transitionDuration={700}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {imagesToDisplay.map((product, index) => (
        <div key={index} className="px-4">
          <img
            src={product.img}
            alt={product.name}
            className="h-[400px] w-full object-cover rounded-xl border-4 border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CollectionOfImage;
