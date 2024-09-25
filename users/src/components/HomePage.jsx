import React from "react";

import BannerSlider from "./BannerSlider";
import CardHome from "./CardHome";
import DealsHeader from "./DealsHeader";
// import SalesAdOfferHomepage from "./SalesAdOfferHomepage";
import ServiceCard from "./ServiceCard";

import Testimonials from "./Testimonials";
import OfferSales from "./OfferSales";
import ProductDescription from "./ProductDescription";
import { Cateroy } from "./category/Cateroy";
import CustomizedCurtains from "./CustomizedCurtains";
import Blinds from "./Blinds";
import WallPaper from "./WallPaper";
import Video from "./Video";
import { Api } from "../Api";

const HomePage = () => (
  <div className="w-full">
    <BannerSlider />
    <Video/>
      <CardHome />
      <ProductDescription />
      <Cateroy />
      <ServiceCard />
      <CustomizedCurtains />
      <Blinds/>
      <WallPaper />
      {/* <DealsHeader /> */}
      <OfferSales />
      {/* <SalesAdOfferHomepage /> */}
      <Testimonials />
      <Api/>

      
    </div>
  );



export default HomePage;
