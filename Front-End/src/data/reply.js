import axios from "axios";

const API_HOST = "http://localhost:4000";

async function getReplies(reviewId) {
  try {
    const response = await axios.get(API_HOST + `/api/reply/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw error;
  }
}

async function createReply(reviewId, userEmail, content) {
  try {
    const response = await axios.post(API_HOST + `/api/reply/create`, {
      reviewId,
      userEmail,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error;
  }
}

async function updateReply(replyId, content) {
  try {
    const response = await axios.put(API_HOST + `/api/reply/${replyId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating reply:", error);
    throw error;
  }
}

async function deleteReply(replyId) {
  try {
    await axios.delete(API_HOST + `/api/reply/${replyId}`);
  } catch (error) {
    console.error("Error deleting reply:", error);
    throw error;
  }
}

export { getReplies, createReply, updateReply, deleteReply };
