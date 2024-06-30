import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Star = ({ filled }) => {
  if (filled >= 1) {
    return <StarIcon className="star-icon" style={{ color: "#ffb400" }} />;
  } else if (filled >= 0.5) {
    return <StarHalfIcon className="star-icon" style={{ color: "#ffb400" }} />;
  } else {
    return (
      <StarOutlineIcon className="star-icon" style={{ color: "#e0e0e0" }} />
    );
  }
};

export default Star;
