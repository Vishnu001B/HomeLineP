import React from 'react'
import SalesAdOffer from './SalesAdOffer'
import interior3 from '../assets/image/interior3.jpeg'; 
import interior2 from '../assets/image/interior2.jpeg'; 


const SalesAdOfferHomepage = () => {
  return (
    <div className="flex flex-wrap justify-center items-center content-center my-4 gap-10 ">
      <SalesAdOffer
        img={interior3}
        title="Big Sale on All Items!"
        des="Get up to 50% off on selected items. Limited time offer, so hurry up!"
        offer="30% OFF"
        price="$150" />
      <SalesAdOffer
        img={interior2}
        title="Big Sale on All Items!"
        des="Get up to 50% off on selected items. Limited time offer, so hurry up!"
        offer="80% OFF"
        price="$1000" />
      <SalesAdOffer
        img={interior3}
        title="Big Sale on All Items!"
        des="Get up to 50% off on selected items. Limited time offer, so hurry up!"
        offer="60% OFF"
        price="$700" />

    </div>
  )
}

export default SalesAdOfferHomepage
