import React from "react";
import axios from "axios";
import { ProdListContainer } from "../Styles/ProdListContainer.styled";
import { useState, useEffect } from "react";
import ProductCard from "../Dashboard/Products/ProductCard";
import { APIPaths } from "../../utils/APIPaths";
import Carousel from "react-multi-carousel";
import responsiveConfigs from "./CarouselConfigs";

export default function RelatedItems({ item }) {
  const [relatedItems, setRelatedItems] = useState([]);

  const getRelatedItems = async () => {
    const relItems = await axios.get(`${APIPaths.Product}/${item.category}`);
    setRelatedItems(relItems.data);
  };

  useEffect(() => {
    getRelatedItems();
  }, [item]);

  return (
    <Carousel // https://www.npmjs.com/package/react-multi-carousel
      swipeable={false}
      draggable={false}
      arrows={true}
      responsive={responsiveConfigs}
      infinite={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      slidesToSlide={2}
      autoPlay={true}
      autoPlaySpeed={5000}
    >
      {relatedItems.map((relatedItem) => {
        if (item._id !== relatedItem._id) {
          return <ProductCard key={relatedItem._id} item={relatedItem} />;
        }
      })}
    </Carousel>
  );
}
