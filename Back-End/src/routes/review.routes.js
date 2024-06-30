module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Get all product reviews
  router.get("/:productId", controller.getProductReviews);

  // Create new review
  router.post("/", controller.createReview);

  // Update the given review
  router.put("/:reviewId", controller.updateReview);

  // Delete the given review
  router.delete("/:reviewId", controller.deleteReview);

  app.use("/api/reviews", router);
};
