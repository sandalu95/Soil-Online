import React, { useEffect, useState } from "react";
import { NumberWidget } from "../components/widget/NumberWidget";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReviewsIcon from "@mui/icons-material/Reviews";
import useUsers from "../hooks/useUsers";
import useProducts from "../hooks/useProducts";
import { ProductPurchasesWidget } from "../components/widget/ProductPurchasesWidget";
import { MonthlyRevenue } from "../components/widget/MonthlyRevenue";
import { MonthlyOrderCount } from "../components/widget/MonthlyOrderCount";
import { RecentReviewsListWidget } from "../components/widget/RecentReviewsListWidget";
import { gql } from "@apollo/client";
import client from "../apollo/client";
import { ReviewDistributionByProductWidget } from "../components/widget/ReviewDistributionByProductWidget";
import { ReviewCountWidget } from "../components/widget/ReviewCountWidget";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      content
      date
      stars
      user {
        email
        username
      }
      product {
        id
        name
      }
    }
  }
`;

const REVIEW_ADDED_SUBSCRIPTION = gql`
  subscription OnReviewAdded {
    reviewAdded {
      id
      content
      date
      stars
      user {
        email
        username
      }
      product {
        id
        name
      }
    }
  }
`;

export const Dashboard = () => {
  const [reviews, setReviews] = useState([]);

  const { loading: userLoading, error: userError, users } = useUsers();
  const {
    loading: productLoading,
    error: productError,
    products,
  } = useProducts();

  // Load initial reviews
  useEffect(() => {
    async function loadReviews() {
      const { data } = await client.query({ query: GET_REVIEWS });
      setReviews(data.reviews);
    }
    loadReviews();
  }, []);

  // Setup subscription
  useEffect(() => {
    const subscription = client
      .subscribe({
        query: REVIEW_ADDED_SUBSCRIPTION,
      })
      .subscribe({
        next: ({ data }) => {
          const newReview = data.reviewAdded;
          setReviews((prevReviews) => [newReview, ...prevReviews]);
        },
        error: (err) => console.error(err),
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (userLoading || productLoading) return <p>Loading...</p>;
  if (userError || productError) return <p>Error :(</p>;

  return (
    <div className="flex-1 px-5 py-6 max-h-screen h-screen">
      <div className="flex flex-row gap-4">
        <div className="w-3/4 flex flex-col">
          <div className="flex flex-row gap-4 mb-4">
            <NumberWidget
              title="Total Users"
              value={users?.length || 0}
              icon={
                <PeopleIcon className="text-primary-600" fontSize="large" />
              }
              buttonText="Users"
              buttonLink="/users"
            />
            <NumberWidget
              title="Total Products"
              value={products?.length || 0}
              icon={
                <InventoryIcon className="text-primary-600" fontSize="large" />
              }
              buttonText="Products"
              buttonLink="/products"
            />
            <NumberWidget
              title="Total Reviews"
              value={reviews.length || 0}
              icon={
                <ReviewsIcon className="text-primary-600" fontSize="large" />
              }
              buttonText="Reviews"
              buttonLink="/reviews"
            />
          </div>
          <div className="flex flex-row gap-2 mb-3">
            <div className="w-1/2 flex flex-col gap-2">
              <ReviewDistributionByProductWidget reviews={reviews} />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <MonthlyRevenue />
              <ProductPurchasesWidget />
            </div>
          </div>
          <div className="flex flex-row gap-2 mb-3">
            <ReviewCountWidget
              reviews={reviews}
              title="Highest Rated Product"
              type="HIGHEST"
              icon={
                <ThumbUpIcon className="text-primary-600" fontSize="large" />
              }
            />
            <ReviewCountWidget
              reviews={reviews}
              title="Lowest Rated Product"
              type="LOWEST"
              icon={
                <ThumbDownIcon className="text-primary-600" fontSize="large" />
              }
            />
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-2">
          <RecentReviewsListWidget reviews={reviews} />
          <MonthlyOrderCount />
        </div>
      </div>
    </div>
  );
};
