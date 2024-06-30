const db = require("../../database");
const { Sequelize, Op } = require("sequelize");
const _ = require("lodash");
const moment = require("moment");
const Order = db.order;
const OrderItem = db.orderItem;
const Product = db.product;
const User = db.user;

// Create a new order
exports.createOrder = async (email, total, date, items) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const newOrder = await Order.create({
    total,
    date,
    userId: user.id,
  });

  const orderItems = items.map((item) => ({
    orderId: newOrder.id,
    productId: item.productId,
    quantity: item.quantity,
  }));

  await OrderItem.bulkCreate(orderItems);

  return newOrder;
};

// Get all orders
exports.getOrders = async () => {
  return await Order.findAll({
    include: [
      { model: User, attributes: ["email"] },
      { model: OrderItem, include: [Product] },
    ],
  });
};

// Get orders by email
exports.getOrdersByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  return await Order.findAll({
    where: { userId: user.id },
    include: [{ model: OrderItem, include: [Product] }],
  });
};

// Get order items by order ID
exports.getOrderItems = async (orderId) => {
  return await OrderItem.findAll({
    where: { orderId },
    include: [Product],
  });
};

exports.getXMonthTotalOrders = async (months) => {
  const xMonthsAgo = new Date();
  xMonthsAgo.setMonth(xMonthsAgo.getMonth() - months);

  return await Order.findAll({
    attributes: [
      [Sequelize.fn("date_format", Sequelize.col("date"), "%Y-%m"), "month"],
      [Sequelize.fn("count", Sequelize.col("id")), "totalOrders"],
    ],
    where: {
      date: {
        [Op.gte]: xMonthsAgo,
      },
    },
    group: ["month"],
    order: [["month", "ASC"]],
    raw: true,
  });
};

exports.getXMonthTotalRevenue = async (months) => {
  const xMonthsAgo = new Date();
  xMonthsAgo.setMonth(xMonthsAgo.getMonth() - months);

  const revenue = await Order.findAll({
    attributes: [
      [Sequelize.fn("date_format", Sequelize.col("date"), "%Y-%m"), "month"],
      [Sequelize.fn("sum", Sequelize.col("total")), "totalRevenue"],
    ],
    where: {
      date: {
        [Op.gte]: xMonthsAgo,
      },
    },
    group: ["month"],
    order: [["month", "ASC"]],
    raw: true,
  });

  return revenue;
};

exports.getTotalPurchasesPerProductLastXMonths = async (months) => {
  const finalPurchases = [];
  const labels = [];

  const xMonthsAgo = new Date();
  xMonthsAgo.setMonth(xMonthsAgo.getMonth() - months);

  let xMonths = [];
  for (let i = months; i > 0; i--) {
    let month = moment().subtract(i, "months").month() + 1;
    xMonths.push(month);
    labels.push(moment().subtract(i, "months").format("MMMM"));
  }

  const mostSellingProducts = await db.orderItem.findAll({
    attributes: [
      "productId",
      [Sequelize.fn("sum", Sequelize.col("quantity")), "totalQuantity"],
    ],
    include: [
      {
        model: db.order,
        where: {
          date: {
            [Op.gte]: xMonthsAgo,
          },
        },
      },
    ],
    group: ["productId"],
    order: [[Sequelize.literal("totalQuantity"), "DESC"]],
    limit: 5,
    raw: true,
  });

  const purchases = await db.orderItem.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("order.date")), "monthNumber"],
      [
        Sequelize.fn("date_format", Sequelize.col("order.date"), "%Y-%m"),
        "month",
      ],
      [
        Sequelize.fn("sum", Sequelize.literal("quantity * product.price")),
        "totalPurchases",
      ],
      [Sequelize.col("product.name"), "productName"],
      "productId",
    ],
    include: [
      {
        model: db.order,
        where: {
          date: {
            [Op.gte]: xMonthsAgo,
          },
        },
      },
      {
        model: db.product,
      },
    ],
    where: {
      productId: {
        [Op.in]: mostSellingProducts.map((product) => product.productId),
      },
    },
    group: ["productId", "month"],
    raw: true,
  });

  const groupedPurchases = _.groupBy(purchases, "productId");

  for (let key in groupedPurchases) {
    const monthlyPurchases = [];
    let purchases = groupedPurchases[key];

    xMonths.forEach((month) => {
      let purchase = purchases.find(
        (purchase) => parseInt(purchase.monthNumber) === month
      );
      if (purchase) {
        monthlyPurchases.push(purchase?.totalPurchases);
      } else {
        monthlyPurchases.push(0);
      }
    });

    finalPurchases.push({
      productId: key,
      productName: purchases[0].productName,
      monthlyPurchases,
      labels,
    });
  }

  return finalPurchases;
};
