import * as React from "react";
import { WidgetContainer } from "./WidgetContainer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GET_MONTHLY_REVENUE } from "../../hooks/useOrders";
import { useEffect } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import client from "../../apollo/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const MonthlyRevenue = () => {
  const [chartData, setChartData] = React.useState(undefined);

  const { loading, data } = useQuery(GET_MONTHLY_REVENUE, {
    variables: { months: 5 },
    client,
  });

  useEffect(() => {
    const revenue = data?.monthlyRevenueForLastXMonths;

    setChartData({
      labels: revenue?.map((order) =>
        moment(order.month, "YYYY-MM").format("MMMM")
      ),
      datasets: [
        {
          label: "Monthly Revenue",
          data: revenue?.map((order) => order.totalRevenue),
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    });
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <WidgetContainer title="Revenue Over Time">
      {!loading && chartData && <Bar data={chartData} options={options} />}
    </WidgetContainer>
  );
};
