module.exports = (express, app) => {
  const controller = require("../controllers/userfollows.controller.js");
  const router = express.Router();

  // Get following users
  router.get("/:followerEmail", controller.getFollowingUsers);

  // Follow a user
  router.post("/follow", controller.followUser);

  // Unfollow a user
  router.post("/unfollow", controller.unfollowUser);

  app.use("/api/userfollows", router);
};
