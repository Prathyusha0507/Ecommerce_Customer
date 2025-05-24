import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./Rating.css";

/* Reference from https://www.youtube.com/watch?v=KvEEmZ5ThC4
 */
function Rating({ ratings }) {
  const showStars = Array.from({ length: 5 }, (star, key) => {
    return (
      <span key={key}>
        {ratings - key >= 1 ? (
          <FaStar className="star" />
        ) : ratings - key > 0 && ratings - key < 1 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <AiOutlineStar className="star" />
        )}
      </span>
    );
  });
  return (
    <div>
      {showStars} <span>{ratings}</span>
    </div>
  );
}

export default Rating;
