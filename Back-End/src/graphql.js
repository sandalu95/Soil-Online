const { gql } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const pubsub = require("./pubsub");
const REVIEW_ADDED = "REVIEW_ADDED";

const {
  getUsers,
  blockUser,
  unblockUser,
} = require("./controllers/admin/user.controller");
const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require("./controllers/admin/product.controller");
const {
  getOrders,
  getOrdersByEmail,
  getOrderItems,
  getXMonthTotalOrders,
  getXMonthTotalRevenue,
  getTotalPurchasesPerProductLastXMonths,
} = require("./controllers/admin/order.controller");
const {
  getReviews,
  deleteReview,
  getFlaggedReviews,
  setAdminDeleted,
  setFlagged,
  getReviewById,
} = require("./controllers/admin/review.controller");

const myDateType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

// Define GraphQL schema
const typeDefs = gql`
  scalar Date

  type User {
    email: String!
    username: String!
    isBlocked: Boolean!
    joinDate: String!
    mobile: String
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    discount: Float!
    stock: Int!
    description: String
    onSale: Boolean!
  }

  type Review {
    id: ID!
    content: String!
    date: Date!
    stars: Int!
    isFlagged: Boolean!
    isAdminDeleted: Boolean!
    user: User!
    product: Product!
  }

  type FullReview {
    id: ID!
    content: String!
    date: Date!
    stars: Int!
    isFlagged: Boolean!
    isAdminDeleted: Boolean!
    user: User!
    product: Product!
  }

  type Order {
    id: ID!
    total: Float!
    date: String!
    user: User!
    items: [OrderItem!]!
  }

  type OrderItem {
    orderId: ID!
    productId: ID!
    quantity: Int!
    product: Product!
  }

  type MonthlyOrder {
    month: String!
    totalOrders: Int!
  }

  type MonthlyRevenue {
    month: String!
    totalRevenue: Float!
  }

  type ProductPurchase {
    labels: [String!]
    monthlyPurchases: [Float!]
    productName: String!
    productId: ID!
  }

  type Query {
    users: [User]
    products: [Product]
    reviews: [Review]
    flaggedReviews: [FullReview]
    orders: [Order]
    ordersByEmail(email: String!): [Order]
    orderItems(orderId: ID!): [OrderItem]
    monthlyTotalOrdersForLastFiveMonths: [MonthlyOrder]
    monthlyRevenueForLastXMonths(months: Int!): [MonthlyRevenue]
    totalPurchasesPerProductLastXMonths(months: Int!): [ProductPurchase]
  }

  type Mutation {
    blockUser(email: String!): User
    unblockUser(email: String!): User
    addProduct(
      name: String!
      price: Float!
      discount: Float
      stock: Int!
      description: String
      onSale: Boolean
    ): Product
    editProduct(
      id: ID!
      name: String
      price: Float
      discount: Float
      stock: Int
      description: String
      onSale: Boolean
    ): Product
    deleteProduct(id: ID!): Boolean
    deleteReview(id: ID!): Boolean
    setAdminDeleted(id: ID!): Boolean
    setFlagged(id: ID!): Boolean
  }

  type Subscription {
    reviewAdded: Review
  }
`;

// Define resolvers
const resolvers = {
  Date: myDateType,
  Query: {
    users: () => getUsers(),
    products: () => getProducts(),
    reviews: () => getReviews(),
    flaggedReviews: () => getFlaggedReviews(),
    orders: () => getOrders(),
    ordersByEmail: (_, { email }) => getOrdersByEmail(email),
    orderItems: (_, { orderId }) => getOrderItems(orderId),
    monthlyTotalOrdersForLastFiveMonths: () => getXMonthTotalOrders(5),
    monthlyRevenueForLastXMonths: (_, { months }) =>
      getXMonthTotalRevenue(months),
    totalPurchasesPerProductLastXMonths: (_, { months }) =>
      getTotalPurchasesPerProductLastXMonths(months),
  },
  Mutation: {
    blockUser: (_, { email }) => blockUser(email),
    unblockUser: (_, { email }) => unblockUser(email),
    addProduct: (_, { name, price, discount, stock, description, onSale }) =>
      addProduct(name, price, discount, stock, description, onSale),
    editProduct: (
      _,
      { id, name, price, discount, stock, description, onSale }
    ) => editProduct(id, name, price, discount, stock, description, onSale),
    deleteProduct: (_, { id }) => deleteProduct(id),
    deleteReview: (_, { id }) => deleteReview(id),
    setAdminDeleted: (_, { id }) => setAdminDeleted(id),
    setFlagged: (_, { id }) => setFlagged(id),
  },
  Subscription: {
    reviewAdded: {
      subscribe: async (parent, args, context) => {
        const asyncIterator = pubsub.asyncIterator([REVIEW_ADDED]);
        return asyncIterator;
      },
      resolve: async (payload) => {
        console.log("##################Review Id", payload.reviewAdded);
        const review = await getReviewById(payload.reviewAdded.id);
        console.log("##################Review", review);
        return review;
      },
    },
  },
  Order: {
    user: async (order) => {
      return await order.getUser();
    },
    items: async (order) => {
      return await order.getOrderItems({ include: [Product] });
    },
  },
  OrderItem: {
    product: async (orderItem) => {
      return await orderItem.getProduct();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
