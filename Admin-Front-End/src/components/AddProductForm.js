import React, { useState } from "react";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddProductForm = ({ onSave }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    discount: 0,
    stock: 0,
    description: "",
    onSale: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = "Name is required";
    if (!newProduct.price) newErrors.price = "Price is required";
    if (!newProduct.description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const productToSave = {
        ...newProduct,
        discount: newProduct.discount === "" ? 0 : newProduct.discount,
        stock: newProduct.stock === "" ? 0 : newProduct.stock,
      };
      onSave(productToSave);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="space-y-4 p-3">
      <h1 className="text-xl font-semibold mt-8 mb-3">Add Product</h1>
      <FormGroup>
        <TextField
          name="name"
          label="Name"
          value={newProduct.name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          name="discount"
          label="Discount"
          type="number"
          value={newProduct.discount}
          onChange={handleChange}
          margin="normal"
          defaultValue={0}
        />
        <TextField
          name="stock"
          label="Stock"
          type="number"
          value={newProduct.stock}
          onChange={handleChange}
          margin="normal"
          defaultValue={0}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={5}
          value={newProduct.description}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.description}
          helperText={errors.description}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newProduct.onSale}
              onChange={handleCheckboxChange}
              name="onSale"
            />
          }
          label="On Sale"
          className="mb-5"
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </FormGroup>
    </form>
  );
};

export default AddProductForm;
