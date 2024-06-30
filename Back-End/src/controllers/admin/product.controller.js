const db = require("../../database");

const getProducts = async () => {
  return await db.product.findAll();
};

const addProduct = async (
  name,
  price,
  discount,
  stock,
  description,
  onSale
) => {
  try {
    const newProduct = await db.product.create({
      name,
      price,
      discount,
      stock,
      description,
      onSale,
    });
    console.log('Product added successfully', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error adding product', error);
    throw new Error('Failed to add product');
  }
};

const editProduct = async (
  id,
  name,
  price,
  discount,
  stock,
  description,
  onSale
) => {
  try {
    const product = await db.product.findByPk(id);
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (stock !== undefined) product.stock = stock;
    if (description !== undefined) product.description = description;
    if (onSale !== undefined) product.onSale = onSale;
    await product.save();
    console.log('Product edited successfully', product);
    return product;
  } catch (error) {
    console.error('Error editing product', error);
    throw new Error('Failed to edit product');
  }
};

const deleteProduct = async (id) => {
  const product = await db.product.findByPk(id);
  await product.destroy();
  return true;
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
