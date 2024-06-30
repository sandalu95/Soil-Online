const db = require("../database");

exports.all = async (req, res) => {
  const products = await db.product.findAll();
  res.json(products);
};

exports.one = async (req, res) => {
  const product = await db.product.findOne({ where: { id: req.params.id } });
  res.json(product);
};

exports.create = async (req, res) => {
  const product = await db.product.create({
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
    stock: req.body.quantity,
    description: req.body.description,
    onSale: req.body.onSale,
    imageUrl: req.body.imageUrl,
  });

  res.json(product);
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await db.product.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).send("Product not found");
    } else {
      product.stock = stock;
      await product.save();
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
