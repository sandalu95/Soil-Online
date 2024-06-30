import * as React from "react";
import { WidgetContainer } from "./WidgetContainer";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";
import _ from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ReviewDistributionByProductWidget = (props) => {
  const { reviews } = props;

  const [chartData, setChartData] = React.useState(undefined);

  useEffect(() => {
    if (reviews) {
      let otherReviewCount = 0;
      const labels = [];
      const data = [];

      const groupedReviews = _.groupBy(reviews, "product.id");
      const sortedData = _.orderBy(
        Object.entries(groupedReviews),
        (entry) => entry[1].length,
        "desc"
      );

      sortedData.forEach((d, index) => {
        const length = d[1].length;
        if (data.length > 5) {
          otherReviewCount += length;
          if (index === sortedData.length - 1) {
            data.push(otherReviewCount);
            labels.push("Other");
          }
        } else {
          data.push(length);
          labels.push(d[1][0].product.name);
        }
      });

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [reviews]);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (acc, cur) => acc + cur,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            label += percentage + "%";
            return label;
          },
        },
      },
      datalabels: {
        color: "gray",
        formatter: function (value, context) {
          const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return percentage + "%";
        },
        font: {
          weight: "bold",
          size: 10,
        },
      },
    },
  };

  return (
    <WidgetContainer title="Review Distribution by Product">
      {chartData && (
        <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />
      )}
    </WidgetContainer>
  );
};
