import axios from "axios";

const API_HOST = "http://localhost:4000";

async function getProducts() {
  try {
    const response = await axios.get(API_HOST + "/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function findProduct(id) {
  try {
    const response = await axios.get(API_HOST + `/api/products/select/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error finding the product ${id}: `, error);
  }
}

// update product quantity
const updateProductQuantity = (cartItems) => {
  // Update product quantities based on the shopping cart
  cartItems.forEach(async (item) => {
    const requestBody = {
      stock: item?.product.stock - item?.quantity,
    };

    try {
      const response = await axios.put(
        `${API_HOST}/api/products/select/${item?.productId}`,
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating stock of product ${item?.productId}: `,
        error
      );
    }
  });
};

export { getProducts, findProduct, updateProductQuantity };
