import { useQuery, gql } from "@apollo/client";
import client from "../apollo/client";

export const GET_MONTHLY_ORDERS = gql`
  query GetMonthlyOrders {
    monthlyTotalOrdersForLastFiveMonths {
      month
      totalOrders
    }
  }
`;

export const GET_MONTHLY_REVENUE = gql`
  query GetMonthlyRevenue($months: Int!) {
    monthlyRevenueForLastXMonths(months: $months) {
      month
      totalRevenue
    }
  }
`;

export const GET_PRODUCT_PURCHASES_PER_MONTH = gql`
  query GetProductPurchasesPerMonths($months: Int!) {
    totalPurchasesPerProductLastXMonths(months: $months) {
      labels
      monthlyPurchases
      productName
      productId
    }
  }
`;

const useOrders = () => {
  const { loading, error, data, refetch } = useQuery(GET_MONTHLY_ORDERS, {
    client,
  });

  return {
    loading,
    error,
    monthlyOrders: data ? data.monthlyTotalOrdersForLastFiveMonths : [],
    refetch,
  };
};

export default useOrders;
