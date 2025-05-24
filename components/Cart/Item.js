import "../Cart/Item.css";
import { useNavigate, useLocation, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "../ProductPage/QuantityButton";
import {
  removeProductFromCart,
  updateItemQuantityFromCart,
} from "../../redux/cart/cartSlice";
import { useEffect, useState } from "react";
import { RoutePaths } from "../../utils/RoutePaths";

function Item({ itemInfo, setTotalPrice, calcTotalPrice }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(itemInfo.quantity);
  useEffect(() => {
    let updatedItem = {
      productDetails: {
        id: itemInfo.productDetails.id,
        name: itemInfo.productDetails.name,
        description: itemInfo.productDetails.description,
        price: itemInfo.productDetails.price,
        rating: itemInfo.productDetails.rating,
        category: itemInfo.productDetails.category,
        images: itemInfo.productDetails.images,
        quantity: itemInfo.productDetails.quantity,
        reviews: itemInfo.productDetails.reviews,
      },
      quantity: quantity,
    };

    dispatch(updateItemQuantityFromCart(updatedItem));

    if (setTotalPrice !== undefined || calcTotalPrice !== undefined) {
      setTotalPrice(calcTotalPrice());
    }
  }, [quantity]);

  const item = itemInfo.productDetails;

  const productURL = RoutePaths.Product.replace(":name", item.name);

  return (
    <div id="item-container">
      <div
        className="image-container"
        onClick={() => {
          navigate(productURL, { state: { item } });
        }}
      >
        <img
          className="item-image"
          src={itemInfo.productDetails.images[0]}
          alt="Broken link"
        />
      </div>
      <div className="name-quantity-container">
        <h3
          onClick={() => {
            navigate(productURL, { state: { item } });
          }}
        >
          {itemInfo.productDetails.name}
        </h3>
        {!location.pathname.includes(RoutePaths.Checkout) ? (
          <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        ) : (
          <>
            <h3>Quantity: {itemInfo.quantity}</h3>
          </>
        )}
      </div>
      <div className="price-container">
        <h1>${(itemInfo.productDetails.price * quantity).toFixed(2)}</h1>
        <button
          className="remove-button"
          onClick={() => {
            dispatch(removeProductFromCart(itemInfo));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
export default Item;
