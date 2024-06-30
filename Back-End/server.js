const express = require("express");
const cors = require("cors");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("./src/database");
const typeDefs = require("./src/graphql.js").typeDefs;
const resolvers = require("./src/graphql.js").resolvers;

const startServer = async () => {
  // Database will be synced in the background
  db.sync();

  const app = express();

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer({ schema }, wsServer);

  // Parse requests of content-type - application/json
  app.use(express.json());

  // Add CORS support
  app.use(cors());

  // Route of the root
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to SOIL API" });
  });

  // Add other routes
  require("./src/routes/user.routes.js")(express, app);
  require("./src/routes/product.routes.js")(express, app);
  require("./src/routes/cart.routes.js")(express, app);
  require("./src/routes/review.routes.js")(express, app);
  require("./src/routes/reply.routes.js")(express, app);
  require("./src/routes/userfollows.routes.js")(express, app);
  require("./src/routes/address.routes.js")(express, app);
  require("./src/routes/order.routes.js")(express, app);

  // Set port, listen for requests.
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(
      `GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
