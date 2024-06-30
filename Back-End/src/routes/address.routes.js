module.exports = (express, app) => {
  const controller = require("../controllers/address.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a address with id
  router.get("/select/:id", controller.one);

  // // Create a address.
  router.post("/create", controller.create);

  // Get all addresses for a specific user
  router.get("/:email/addresses", controller.getUserAddresses);

  // Update existing shipping address
  router.put("/update", controller.update);

  // Add routes to server.
  app.use("/api/addresses", router);
};
