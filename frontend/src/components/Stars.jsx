import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ rating }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {rating > number ? (
          <BsStarFill />
        ) : rating > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <div className="rating">
      <div className="rating__stars">{tempStars}</div>
      <p className="rating__count">Customers reviews</p>
    </div>
  );
};

export default Stars;
