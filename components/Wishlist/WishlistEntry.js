import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/wishlistSlice";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../utils/RoutePaths";
import AddToCartButton from "../ProductPage/AddToCartButton";

export default function WishlistEntry({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const remove = () => {
    dispatch(removeItem(item.name));
  };

  const productURL = RoutePaths.Product.replace(":name", item.name);

  return (
    <div className="wishlist-entry-wrapper">
      <div className="entry">
        <div
          className="img-wrapper"
          onClick={() => navigate(productURL, { state: { item } })}
        >
          <img src={item.images[0]} alt={item.name} />
          <p>{item.name}</p>
        </div>

        <div className="wishlist-button-price-wrapper">
          <div className="price">
            <h4>Price : ${item.price}</h4>
          </div>
          <div className="wishlist-entry-buttons-wrapper">
            <AddToCartButton id="add-cart" productDetails={item} quantity={1} />
            <button className="wishlist-button" onClick={remove}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
