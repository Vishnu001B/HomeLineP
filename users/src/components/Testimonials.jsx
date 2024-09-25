import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const URI = import.meta.env.VITE_API_URL;

  // Fetch testimonials from the API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${URI}api/quotes/new-quotes`);
        // Assuming the API returns an array of testimonials
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };

    fetchTestimonials();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show three cards per page on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 2, // Show two cards per page on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For small screens (phones)
        settings: {
          slidesToShow: 1, // Show one card per page on small screens
          slidesToScroll: 1, // Ensure it scrolls one card at a time
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 w-full max-w-full my-8 ">
      <h2 className="text-4xl font-bold mb-8 text-center">Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="px-4">
            <TestimonialCard
              photo={`${URI}${testimonial.authorImage}`}
              name={testimonial.author}
              date={new Date(testimonial.date).toLocaleDateString()}
              rating={testimonial.rating}
              description={testimonial.quote}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
