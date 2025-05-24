import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { APIPaths } from "../../utils/APIPaths";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import responsiveConfigs from "./CarouselConfigs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reviews({ item }) {
  const currentUser = useSelector((state) => state.user.user);
  const [itemReviewed, setItemReviewed] = useState(item);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hasOrderedBefore, setHasOrderedBefore] = useState(false);

  const updateItemAfterReview = async () => {
    const reviewObject = {
      userId: currentUser._id,
      name: `${currentUser.firstname} ${currentUser.lastname}`,
      stars: rating,
      text: reviewText,
    };

    const updatedItem = await axios.patch(
      `${APIPaths.Product}/review/${itemReviewed._id}`,
      reviewObject
    );
    setItemReviewed(updatedItem.data);
  };

  useEffect(() => {
    const ordersWithThisItem = async () => {
      if (currentUser === null || currentUser._id === null) return;
      const prevOrdersOfThisItem = await axios.get(
        `${APIPaths.Orders}/${currentUser._id}/${item.name}`
      );
      setHasOrderedBefore(prevOrdersOfThisItem.data.length !== 0);
    };
    setItemReviewed(item);
    ordersWithThisItem();
  }, [item, currentUser]);

  const resetReviewWithError = (text) => {
    setRating(1);
    setReviewText("");
    toast.error(text, {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };

  const addReview = () => {
    const userInReviews = itemReviewed.reviews.find((reviews) => {
      return reviews.userId === currentUser._id;
    });
    if (userInReviews !== undefined) {
      resetReviewWithError("Already Added Your Review!");
      return;
    } else if (!hasOrderedBefore) {
      resetReviewWithError("Please Purchase Item to Add Your Review");
      return;
    } else if (reviewText === "") {
      resetReviewWithError("Review Must Contain Text");
      return;
    }

    updateItemAfterReview();
    setRating(1);
    setReviewText("");
    toast.success("Added Review!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };

  return (
    <>
      {currentUser !== null && currentUser._id !== null && (
        <div className="add-review-container">
          <div className="add-review-header">
            <h5>Add Your Review</h5>
          </div>
          <div className="add-review-form">
            <div className="review-inputs">
              <select
                id="rating-selector"
                name="Rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>

              <input
                type="text"
                value={reviewText}
                id="review-text"
                placeholder="Add Review Here"
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="add-review-button">
              <button onClick={addReview}>Add Review</button>
            </div>
          </div>
        </div>
      )}

      <div className="past-reviews-container">
        {itemReviewed.reviews.length === 0 ? (
          <div className="no-review-wrapper">
            <h5>No Reviews Yet</h5>
          </div>
        ) : (
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
            {itemReviewed.reviews.map((review, index) => {
              return <ReviewCard key={index} review={review} />;
            })}
          </Carousel>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
