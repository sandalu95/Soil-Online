const db = require("../database");
const { Transaction } = require("sequelize");

// create a cart if does not exist
exports.createCartIfNotExist = async (req, res) => {
  const { userEmail } = req.body;

  try {
    await db.sequelize.transaction(async (transaction) => {
      let cart;

      if (userEmail) {
        cart = await db.cart.findOne({
          where: { userEmail },
          lock: transaction.LOCK.UPDATE, // Lock the row to prevent race conditions
          transaction,
        });

        if (!cart) {
          cart = await db.cart.create({ userEmail }, { transaction });
        }
      } else {
        cart = await db.cart.create({}, { transaction });
      }

      res.status(201).json(cart);
    });
  } catch (error) {
    if (error.message.includes("Deadlock found")) {
      res
        .status(500)
        .send(
          "A temporary issue occurred due to multiple attempts to create a shopping cart simultaneously. This error is likely due to multiple requests trying to create the cart at the same time."
        );
    } else {
      res.status(500).send(`Unexpected error: ${error.message}`);
    }
  }
};


// Get cart items for a given user
exports.getCartItems = async (req, res) => {
  try {
    const { email, cartId } = req.query;

    let cart;
    if (email) {
      cart = await db.cart.findOne({
        where: { userEmail: email },
        include: [{ model: db.cartItem, include: [db.product] }],
      });
    } else if (cartId) {
      cart = await db.cart.findOne({
        where: { id: cartId },
        include: [{ model: db.cartItem, include: [db.product] }],
      });
    } else {
      return res.status(400).send("Either email or cart ID must be provided");
    }

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    res.json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Create a cart item
exports.createCartItem = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const product = await db.product.findOne({ where: { id: productId} });
    if (product.stock - quantity >= 0) {
      const cartItem = await db.cartItem.create({
        shoppingCartId: cartId,
        productId,
        quantity,
      });
      res.status(201).json(cartItem);
    } else {
      res.status(500).send("Product is out of stock");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const product = await db.product.findOne({ where: { id: productId} });
    if (product.stock - quantity >= 0) {
      const cartItem = await db.cartItem.findOne({
        where: {
          shoppingCartId: cartId,
          productId,
        },
      });
  
      if (!cartItem) {
        return res.status(404).send("Cart item not found");
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.json(cartItem);
    } else {
      res.status(500).send("Product is out of stock");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const result = await db.cartItem.destroy({
      where: {
        shoppingCartId: cartId,
        productId,
      },
    });

    if (result === 0) {
      return res.status(404).send("Cart item not found");
    }

    res.send("Cart item deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const result = await db.cart.destroy({ where: { id: cartId } });

    if (result === 0) {
      return res.status(404).send("Cart not found");
    }

    res.send("Cart deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
