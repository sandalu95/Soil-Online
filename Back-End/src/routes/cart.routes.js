module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/cart.controller");

  // Create a cart if not exists
  router.post("/", controller.createCartIfNotExist);

  // Get cart items (by email or cart ID)
  router.get("/", controller.getCartItems);

  // Delete a cart
  router.delete("/:cartId", controller.deleteCart);

  // Create a cart item
  router.post("/items", controller.createCartItem);

  // Update a cart item
  router.put("/items/:cartId/:productId", controller.updateCartItem);

  // Remove a cart item
  router.delete("/items/:cartId/:productId", controller.deleteCartItem);

  // Add routes to server
  app.use("/api/cart", router);
};
