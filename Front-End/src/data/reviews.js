import axios from "axios";

const API_HOST = "http://localhost:4000";

async function getReviews(productId) {
  try {
    const response = await axios.get(API_HOST + `/api/reviews/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
  }
}

async function createReview(productId, userEmail, feedback, rating) {
  try {
    const requestBody = {
      productId: productId,
      userEmail: userEmail,
      feedback: feedback,
      rating: rating,
    };
    const response = await axios.post(API_HOST + `/api/reviews`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error creating the new review:", error);
  }
}

async function updateReview(reviewId, feedback, rating) {
  try {
    const requestBody = {
      feedback: feedback,
      rating: rating,
    };
    const response = await axios.put(API_HOST + `/api/reviews/${reviewId}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error updating the review:", error);
  }
}

async function deleteReview(reviewId) {
  try {
    const response = await axios.delete(API_HOST + `/api/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting the review:", error);
  }
}

export { getReviews, createReview, updateReview, deleteReview };
