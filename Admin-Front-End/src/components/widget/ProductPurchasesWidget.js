import * as React from "react";
import { WidgetContainer } from "./WidgetContainer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_PURCHASES_PER_MONTH } from "../../hooks/useOrders";
import client from "../../apollo/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ProductPurchasesWidget = () => {
  const [chartData, setChartData] = React.useState(undefined);

  const { loading, data } = useQuery(GET_PRODUCT_PURCHASES_PER_MONTH, {
    variables: { months: 5 },
    client,
  });

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (data) {
      const purchases = data?.totalPurchasesPerProductLastXMonths;

      setChartData({
        labels: purchases?.[0]?.labels,
        datasets: purchases?.map((purchase, index) => ({
          label: purchase.productName,
          data: purchase.monthlyPurchases,
          fill: false,
          borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`,
          tension: 0.1,
        })),
      });
    }
  }, [data]);

  return (
    <WidgetContainer title="Product Purchases Over Time">
      <div>
        {!loading && chartData && <Line options={options} data={chartData} />}
      </div>
    </WidgetContainer>
  );
};
