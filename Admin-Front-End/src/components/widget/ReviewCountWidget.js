import * as React from "react";
import { useEffect } from "react";
import _ from "lodash";
import StarIcon from "@mui/icons-material/Star";

export const ReviewCountWidget = (props) => {
  const [widgetData, setWidgetData] = React.useState({
    average: 0,
    product: "",
  });

  const { reviews, title, type, icon } = props;

  useEffect(() => {
    if (reviews) {
      const groupedReviews = _.groupBy(reviews, "product.id");
      const averageStarsByProduct = _.mapValues(groupedReviews, (reviews) =>
        _.meanBy(reviews, "stars")
      );

      if (type === "HIGHEST") {
        const mostRatedProduct = _.maxBy(
          _.keys(averageStarsByProduct),
          (productId) => averageStarsByProduct[productId]
        );

        setWidgetData({
          average: averageStarsByProduct[mostRatedProduct]?.toFixed(1),
          product: groupedReviews[mostRatedProduct]?.[0]?.product?.name,
        });
      } else if (type === "LOWEST") {
        const leastRatedProduct = _.minBy(
          _.keys(averageStarsByProduct),
          (productId) => averageStarsByProduct[productId]
        );

        setWidgetData({
          average: averageStarsByProduct[leastRatedProduct]?.toFixed(1),
          product: groupedReviews[leastRatedProduct]?.[0]?.product?.name,
        });
      }
    }
  }, [reviews, type]);

  return (
    <div className="flex flex-row px-4 py-3 border border-neutral-200 rounded-lg flex-1 justify-between">
      <div className="flex flex-col">
        <span className="font-sans text-neutral-400 text-sm font-bold mb-1">
          {title}
        </span>
        <span className="font-sans text-black text-xl font-extrabold mb-1">
          {widgetData?.product}
        </span>
        <div className="flex flex-row justify-center items-center bg-primary-50 px-2 py-2 rounded w-[80px]">
          <span className="font-sans text-lg text-primary-800 font-semibold mr-2">
            {widgetData?.average}
          </span>
          <StarIcon className="text-primary-800" sx={{ fontSize: 18 }} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-full p-4 flex items-center justify-center bg-primary-50">
          {icon}
        </div>
      </div>
    </div>
  );
};
