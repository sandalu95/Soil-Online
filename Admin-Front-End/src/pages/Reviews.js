import React from "react";
import ReviewsTable from "../components/ReviewsTable";

const Reviews = () => {
  return (
    <div className="flex-1 p-6 m-2">
      <h1 className="text-3xl font-semibold mb-6">Reviews</h1>
      <hr className="mb-6" />
      <ReviewsTable />
    </div>
  );
};

export default Reviews;
