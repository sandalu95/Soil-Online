import axios from "axios";

const API_HOST = "http://localhost:4000";

// Get all cart items for a specific user
async function getCartItems(email, cartId) {
  try {
    const response = await axios.get(`${API_HOST}/api/cart`, {
      params: { email, cartId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
}

// Find a cart for a specific user (create if not exist)
async function findOrCreateCart(email) {
  try {
    const payload = email ? { userEmail: email } : {};
    const response = await axios.post(`${API_HOST}/api/cart`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error finding or creating the cart of ${email}: `, error);
  }
}

async function deleteCartAPI(cartId) {
  try {
    const response = await axios.delete(`${API_HOST}/api/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting the cart with ID ${cartId}: `, error);
  }
}

async function addToCartAPI(cartId, productId, quantity = 1) {
  const requestBody = {
    cartId: cartId,
    productId: productId,
    quantity: quantity,
  };

  try {
    const response = await axios.post(
      `${API_HOST}/api/cart/items`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding item ${productId} to the cart: `, error);
  }
}

async function removeFromCartAPI(cartId, productId) {
  try {
    const response = await axios.delete(
      `${API_HOST}/api/cart/items/${cartId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting item ${productId} from the cart: `, error);
  }
}

async function updateItemAmount(cartId, productId, quantity) {
  const requestBody = {
    quantity: quantity,
  };

  try {
    const response = await axios.put(
      `${API_HOST}/api/cart/items/${cartId}/${productId}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating quantity of item ${productId} in the cart: `,
      error
    );
  }
}

function removeCartId() {
  localStorage.removeItem("cartId");
}

function getStoredCartId() {
  return localStorage.getItem("cartId");
}

function storeCartId(cartId) {
  localStorage.setItem("cartId", cartId);
}

export {
  getCartItems,
  findOrCreateCart,
  deleteCartAPI,
  addToCartAPI,
  removeFromCartAPI,
  updateItemAmount,
  getStoredCartId,
  storeCartId,
  removeCartId,
};
