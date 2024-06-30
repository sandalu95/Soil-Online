import axios from "axios";

const API_HOST = "http://localhost:4000";

// Get orders for a specific user
async function getOrders(email) {
  try {
    const response = await axios.get(`${API_HOST}/api/orders/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Create an order for a specific user
async function createOrder(email, orderItems, totalAmount) {
  try {
    const payload = {
      email: email,
      items: orderItems,
      total: totalAmount,
    };
    const response = await axios.post(`${API_HOST}/api/orders`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error creating the order for ${email}: `, error);
  }
}

export { getOrders, createOrder };
