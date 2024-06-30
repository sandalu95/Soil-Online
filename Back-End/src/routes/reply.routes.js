module.exports = (express, app) => {
  const controller = require("../controllers/reply.controller.js");
  const router = express.Router();

  // Get all replies for selected reviews
  router.get("/:reviewId", controller.getReviewReplies);

  // Create new review
  router.post("/create", controller.createReply);

  // Update the given review
  router.put("/:replyId", controller.updateReply);

  // Delete the given review
  router.delete("/:replyId", controller.deleteReply);

  app.use("/api/reply", router);
};
