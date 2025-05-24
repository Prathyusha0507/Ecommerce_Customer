import React from "react";
import ProductSlideShow from "../components/Dashboard/Products/ProdSlideShow";
import ProductContainer from "../components/Dashboard/Products/ProductContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { products } from "../redux/item/itemSlice";
import { getProdListAsync } from "../redux/item/itemSlice";

const Front = () => {
  const list = useSelector(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProdListAsync(``));
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <ProductSlideShow />
      <h2>Our Products</h2>
      <ProductContainer list={list} />
    </div>
  );
};

export default Front;
