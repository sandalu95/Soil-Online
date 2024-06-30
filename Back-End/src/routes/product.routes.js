module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/product.controller");

  // Select all products
  router.get("/", controller.all);

  // Create a product
  router.get("/", controller.create);

  // Select single product with id
  router.get("/select/:id", controller.one);

  // Update a product with given id
  router.put("/select/:id", controller.updateProduct);

  // Add routes to server
  app.use("/api/products", router);
};
