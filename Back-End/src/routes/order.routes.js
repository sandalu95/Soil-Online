module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/order.controller");

  // Create an order
  router.post("/", controller.createOrder);

  // Get all orders
  router.get("/", controller.getOrders);

  // Get orders by email
  router.get("/:email", controller.getOrdersByEmail);

  // Get order items
  router.get("/items/:orderId", controller.getOrderItems);

  // Add routes to server
  app.use("/api/orders", router);
};
