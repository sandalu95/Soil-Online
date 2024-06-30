import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import client from "../apollo/client";
import gql from "graphql-tag";

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

export const RecentReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

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

  useEffect(() => {
    if (reviews.length > 0) {
      const sortedReviews = [...reviews].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentReviews(sortedReviews.slice(0, 3));
    }
  }, [reviews]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "product", headerName: "Product", width: 130 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "stars", headerName: "Stars", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      valueFormatter: (params) => new Date(params).toLocaleString(),
    },
  ];

  const rows = recentReviews.map((review) => ({
    id: review.id,
    username: review.user.username,
    product: review.product.name,
    content: review.content,
    stars: review.stars,
    date: review.date,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Recent Reviews</h2>
      <DataGrid rows={rows} columns={columns} pageSize={3} />
    </div>
  );
};
