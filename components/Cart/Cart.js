import Item from "./Item.js";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeAllInCart } from "../../redux/cart/cartSlice.js";
import { RoutePaths } from "../../utils/RoutePaths.js";
import { useEffect, useState } from "react";

function Cart() {
  const itemList = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();
  const calcTotalPrice = () => {
    let totalPrice = 0;
    for (const item of itemList) {
      let priceForQuantity = parseFloat(
        item.productDetails.price * item.quantity
      );
      totalPrice += priceForQuantity;
    }
    return totalPrice.toFixed(2);
  };
  const [totalPrice, setTotalPrice] = useState(calcTotalPrice());
  useEffect(() => {
    setTotalPrice(calcTotalPrice());
  }, [totalPrice, itemList]);
  return (
    <>
      {itemList.length > 0 ? (
        <div className="container-shoppingCart">
          <div className="card-shoppingCart">
            <h1 className="cart-header">
              Shopping Cart
              <button
                className="removeAll-button"
                onClick={() => {
                  dispatch(removeAllInCart());
                }}
              >
                Remove All
              </button>
            </h1>
            <hr className="cart-hr" />
            <h4 id="item-price-header">Price</h4>
            {itemList.map((currItem, index) => {
              return (
                <Item
                  key={index}
                  itemInfo={currItem}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  calcTotalPrice={calcTotalPrice}
                />
              );
            })}
            <hr className="cart-hr" />
            <h4 className="price-header">
              Total Price
              <br />
              <br />${totalPrice}
            </h4>
            <button className="checkout-button">
              <Link id="checkout-link" to={RoutePaths.Checkout}>
                Proceed to Checkout
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="no-items-wrapper">
          <h3 className="cart-message">
            Add items to your Shopping Cart to see them here!
          </h3>
          <Link to={RoutePaths.Home}>
            <button className="wishlist-button" id="browse">
              Browse Products
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
