import React, { useEffect, useMemo } from "react";
import "./ProductPage.css";
import ImageGallery from "react-image-gallery";
import Rating from "../Product/Rating";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../redux/wishlistSlice";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedItems from "./RelatedItems";
import Reviews from "./Reviews";
import QuantityButton from "./QuantityButton";
/* Reference  Product Share feature from https://www.npmjs.com/package/react-share?activeTab=readme and  https://github.com/nygardk/react-share/blob/454860844d11d11d23112db1982feaf0ef4f1f09/demo/Demo.tsx */
function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const shareUrl = window.location.origin + window.location.hash;
  const quote = "Check this Awesome product";
  const title = "Check this Awesome product";
  const { state } = useLocation();
  const searchText = window.location.hash.split("/")[2];

  const [stater, setStater] = useState(() => {
    if (state?.item) {
      return state;
    }
    return JSON.parse(localStorage.getItem("stater")) || { item: "" };
  });

  useEffect(() => {
    if (state?.item) {
      setStater(state);
      localStorage.setItem("stater", JSON.stringify(state));
    }
  }, [searchText]);

  useEffect(() => {
    localStorage.setItem("stater", JSON.stringify(stater));
  }, [stater]);

  const item = stater.item || {};

  useEffect(() => {
    setQuantity(1);
    setTimeout(() => window.scroll(0, 0), 200);
  }, [item]);

  const wishlist = useSelector((state) => state.wishlist.wishlistProducts);
  const dispatch = useDispatch();

  const translateImages = (imgArray) => {
    return imgArray.map((imgURL) => ({ original: imgURL, thumbnail: imgURL }));
  };

  const toggleWishlist = () => {
    const isInWishlist = wishlist.some(
      (wishlistItem) => item.name === wishlistItem.name
    );
    if (isInWishlist) {
      dispatch(removeItem(item.name));
      toast.success("Removed from Wishlist!", {
        position: "bottom-right",
        theme: "colored",
        autoClose: 2000,
      });
    } else {
      dispatch(addItem(item));
      toast.success("Added to Wishlist!", {
        position: "bottom-right",
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  const isAddedToWishlist = (name) => {
    // https://stackoverflow.com/a/8217584
    return wishlist.some((item) => item.name === name) ? "red" : "none";
  };

  return (
    <div className="full-page-wrapper">
      <div className="product-page-content">
        <div className="product-header">
          <div className="product-header-wrapper">
            <div className="product-name-seller">
              <h2>{item.name}</h2>
            </div>
          </div>
          <div className="rating-wrapper">
            <svg
              className="navbar_wishlist_icon"
              xmlns="http://www.w3.org/2000/svg"
              fill={isAddedToWishlist(item.name)}
              viewBox="0 0 24 24"
              strokeWidth="1.9"
              stroke="currentColor"
              onClick={() => toggleWishlist()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <FacebookShareButton url={shareUrl} quote={quote}>
              <FacebookIcon size={30} round={true}></FacebookIcon>
            </FacebookShareButton>
            <EmailShareButton url={shareUrl} subject={title}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
          <div className="rating-wrapper">
            <Rating ratings={parseFloat(item.rating)} />
          </div>
        </div>
        <div className="product-details">
          <div className="product-images-wrapper">
            <ImageGallery // https://www.npmjs.com/package/react-image-gallery
              items={translateImages(item.images)}
              showPlayButton={false}
              autoPlay={true}
              thumbnailClass={"thumbnails"}
              showFullscreenButton={false}
              showNav={false}
              slideInterval={5000}
              id="product-image-gallery"
            />
          </div>
          <div className="purchase-wrapper">
            <div className="description-wrapper">
              <p className="desc-text">{item.description}</p>
            </div>
            <div className="buy-options">
              <div className="price-quantity">
                <h4>${item.price}</h4>
                <QuantityButton quantity={quantity} setQuantity={setQuantity} />
              </div>
              <div className="purchase-buttons">
                <AddToCartButton productDetails={item} quantity={quantity} />
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-container">
          <h3>Reviews</h3>
          <div className="reviews">
            <Reviews item={item} />
          </div>
        </div>

        <div className="related-items">
          <h3>Related Items</h3>
          <div className="related-products">
            <RelatedItems item={item} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductPage;
