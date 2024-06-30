import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import "../pages/Product/product.css";

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <span
            key={index}
            className="star"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            style={{ cursor: 'pointer' }}
          >
            {index <= (hoverRating || rating) ? (
              <StarIcon style={{ color: '#ffb400' }} />
            ) : (
              <StarOutlineIcon style={{ color: '#e0e0e0' }} />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
