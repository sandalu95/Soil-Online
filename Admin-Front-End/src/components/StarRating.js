import * as React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const StarRating = (props) => {
  const { rating, size } = props;

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < rating;
        return isFilled ? (
          <StarIcon
            key={index}
            className="text-yellow-500"
            sx={{ fontSize: size }}
          />
        ) : (
          <StarBorderIcon
            key={index}
            className="text-yellow-500"
            sx={{ fontSize: size }}
          />
        );
      })}
    </div>
  );
};
