import React from "react";
import Rating from "../Product/Rating";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card-wrapper">
      <h4>{review.name}</h4>
      <div className="review-stars">
        <Rating ratings={review.stars} />
      </div>
      <hr />
      <div className="review-text">
        <p>{review.text}</p>
      </div>
    </div>
  );
}
