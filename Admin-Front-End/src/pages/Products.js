import React, { useState } from "react";
import ProductTable from "../components/ProductTable";
import { Box, Button, Drawer } from "@mui/material";
import useProducts from "../hooks/useProducts";
import AddProductForm from "../components/AddProductForm";

const Products = () => {
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const { addProduct } = useProducts();

  const toggleAddDrawer = (open) => {
    setAddDrawerOpen(open);
  };

  const handleAddProduct = (newProduct) => {
    addProduct(
      newProduct.name,
      parseFloat(newProduct.price),
      parseFloat(newProduct.discount),
      parseInt(newProduct.stock, 10),
      newProduct.description,
      newProduct.onSale
    );
    toggleAddDrawer(false);
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>
      <hr className="mb-6" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleAddDrawer(true)}
      >
        Add Product
      </Button>
      <ProductTable />
      <Drawer
        open={addDrawerOpen}
        onClose={() => toggleAddDrawer(false)}
        anchor="right"
      >
        <Box className="w-80 p-4">
          <AddProductForm onSave={handleAddProduct} />
        </Box>
      </Drawer>
    </div>
  );
};

export default Products;
