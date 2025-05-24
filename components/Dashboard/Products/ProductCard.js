import { ProdCard } from "../../Styles/ProdCard.styled";
import { ProdTextContainer } from "../../Styles/ProdTextContainer.styled";
import Rating from "../../Product/Rating";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../redux/cart/cartSlice";
import { deleteItemAsync } from "../../../redux/item/itemSlice";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../../../utils/RoutePaths";
import { auth } from "../../../firebase/firebaseConfig";
import { AiFillPropertySafety } from "react-icons/ai";

export default function ProductCard(props) {
  // https://stackoverflow.com/a/71247418
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isUserLoggedIn = user?._id === null;
  const goToProduct = (item) => {
    const productURL = RoutePaths.Product.replace(":name", item.name);
    navigate(productURL, { state: { item } });
  };
  const productDetails = {
    id: props.item._id,
    name: props.item.name,
    description: props.item.description,
    price: props.item.price,
    rating: props.item.rating,
    category: props.item.category,
    images: props.item.images,
    quantity: props.item.quantity,
    reviews: props.item.reviews,
  };
  const quantity = 1;
  const item = props.item;
  return (
    <>
      <ProdCard key={props.item.name} onClick={() => goToProduct(props.item)}>
        <div style={{ backgroundColor: "white" }}>
          <img
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
              padding: "1.5rem",
            }}
            src={props.item.images[0]}
            alt="Product"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <ProdTextContainer>
            {!isUserLoggedIn ? (
              <svg
                className="navbar_shopping-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                style={{ float: "right" }}
                onClick={(e) => {
                  dispatch(addProductToCart({ productDetails, quantity }));
                  e.stopPropagation();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            ) : null}
            <div>
              <span style={{ fontWeight: "bold" }}> {props.item.name} </span>
            </div>
            <div
              style={{
                fontSize: "13px",
                margin: "10px 0px",
                justifyContent: "center",
              }}
            >
              {props.item.description}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Category</span>:&nbsp;
              {props.item.category}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Price</span>: $
              {props.item.price}
            </div>
            <div>
              <Rating ratings={props.item.rating} />
            </div>
            {user?.firstname === "Admin" && (
              <>
                <svg
                  className="delete_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  onClick={(e) => {
                    dispatch(deleteItemAsync(props.item._id));
                    toast.success("Deleted Product!", {
                      position: "bottom-right",
                      theme: "colored",
                      autoClose: 2000,
                    });
                    e.stopPropagation();
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

                <svg
                  className="delete_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  onClick={(e) => {
                    navigate(
                      RoutePaths.EditProduct.replace(":id", props.item._id),
                      { state: { item } }
                    );
                    e.stopPropagation();
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </>
            )}
          </ProdTextContainer>
        </div>
      </ProdCard>
      <ToastContainer />
    </>
  );
}
