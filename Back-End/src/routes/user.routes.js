module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with email.
  router.get("/select/:email", controller.one);

  // Select one user from the database if email and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update user basic info
  router.put("/update", controller.update);

  // Change user password
  router.put("/changepw", controller.changePassword);

  // Delete user with password validation
  router.delete("/delete", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
