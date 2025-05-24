import "./ProductPage.css";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/cart/cartSlice";

function AddToCartButton({ productDetails, quantity }) {
  const dispatch = useDispatch();
  const productDetailsForCart = {
    productDetails,
    quantity,
  };
  return (
    <>
      <button
        className="purchase-button"
        id="add-cart"
        onClick={() => {
          dispatch(addProductToCart(productDetailsForCart));
        }}
      >
        Add To Cart
      </button>
    </>
  );
}

export default AddToCartButton;
