const db = require("../database");
const Order = db.order;
const OrderItem = db.orderItem;
const Product = db.product;
const User = db.user;

// Create a new order
exports.createOrder = async (req, res) => {
  const { email, items, total } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrder = await Order.create({
      total,
      date: new Date().toLocaleString(),
      userEmail: email,
    });

    const orderItems = items.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["email"] },
        { model: OrderItem, include: [Product] },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

// Get orders by email
exports.getOrdersByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.findAll({
      where: { userEmail: email }, // Ensure this condition is correctly applied
      include: [
        { model: User, attributes: ["email"] },
        { model: OrderItem, include: [Product] },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

// Get order items by order ID
exports.getOrderItems = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItems = await OrderItem.findAll({
      where: { orderId },
      include: [Product],
    });
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order items", error });
  }
};
