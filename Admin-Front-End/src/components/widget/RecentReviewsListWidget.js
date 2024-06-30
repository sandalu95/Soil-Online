import React, { useEffect, useState } from "react";
import moment from "moment";
import { WidgetContainer } from "./WidgetContainer";
import { StarRating } from "../StarRating";

export const RecentReviewsListWidget = (props) => {
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    if (props.reviews.length > 0) {
      const sortedReviews = [...props.reviews].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentReviews(sortedReviews.slice(0, 5));
    }
  }, [props.reviews]);

  return (
    <WidgetContainer title="Recent Reviews">
      <div className="overflow-y-scroll">
        {recentReviews?.map((review) => {
          const {
            user: { username },
            id,
            stars,
            product: { name },
            content,
            date,
          } = review;

          return (
            <div
              key={id}
              className="w-ful rounded-lg px-4 py-2 bg-neutral-50 mb-2 border border-neutral-200"
            >
              <div className="flex flex-row items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-50 mr-3 flex justify-center items-center">
                  <span className="uppercase font-sans font-bold text-sm">
                    {username.substring(0, 2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-black font-sans font-extrabold">
                    {username}
                  </div>
                  <StarRating rating={stars} size={14} />
                </div>
              </div>
              <div className="text-sm text-neutral-500 font-sans italic mb-1">
                {content}
              </div>
              <div className="text-xs text-neutral-500 font-sans font-bold mb-2">
                ({name})
              </div>
              <div className="text-xs text-neutral-400 text-right">
                {moment(date).format("MMMM Do, YYYY, h:mm:ss a")}
              </div>
            </div>
          );
        })}
      </div>
    </WidgetContainer>
  );
};
