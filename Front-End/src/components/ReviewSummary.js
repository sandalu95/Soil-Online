import React from "react";
import "../pages/Product/product.css";
import { Button } from "react-bootstrap";
import Star from "./Star";

const ReviewSummary = ({ reviews, handleForm, buttonEnabled }) => {
  const totalReviews = reviews.length;
  const averageRating = parseFloat(
    (
      reviews.reduce((sum, review) => sum + review.stars, 0) / totalReviews
    ).toFixed(2)
  );

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (stars) => reviews.filter((review) => review.stars === stars).length
  );

  const handleReveiwForm = (visible) => {
    handleForm(visible);
  };

  return (
    <div className="review-summary">
      <div className="average-rating">
        <span className="average-title">Average Rating</span>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              filled={Math.min(1, Math.max(0, averageRating - index))}
            />
          ))}
        </div>
        <div className="rating-info">
          <span className="average">{averageRating}</span>
          <span className="total-reviews">Based on {totalReviews} reviews</span>
        </div>
      </div>
      <div className="rating-breakdown">
        {ratingCounts.map((count, index) => (
          <div key={index} className="rating-row">
            <div className="star-label">{5 - index} stars</div>
            <div className="rating-bar">
              <div
                className="filled-bar"
                style={{ width: `${(count / totalReviews) * 100}%` }}
              ></div>
            </div>
            <div className="rating-count">{count}</div>
          </div>
        ))}
      </div>
      <div className="review-button-container">
        <Button
          variant="success"
          onClick={() => handleReveiwForm(true)}
          disabled={!buttonEnabled}
        >
          Write a review
        </Button>
      </div>
    </div>
  );
};

export default ReviewSummary;
