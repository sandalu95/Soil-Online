import React, { useState } from "react";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const ProductEditForm = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editedProduct.name) newErrors.name = "Name is required";
    if (!editedProduct.price) newErrors.price = "Price is required";
    if (!editedProduct.description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const productToSave = {
        ...editedProduct,
        discount: editedProduct.discount === "" ? 0 : editedProduct.discount,
        stock: editedProduct.stock === "" ? 0 : editedProduct.stock,
      };
      onSave(productToSave);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form className="space-y-4 p-3">
      <h1 className="text-xl font-semibold mt-8 mb-3">Edit Product</h1>
      <FormGroup>
        <TextField
          name="name"
          label="Name"
          value={editedProduct.name}
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
          value={editedProduct.price}
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
          value={editedProduct.discount}
          onChange={handleChange}
          margin="normal"
          defaultValue={0}
        />
        <TextField
          name="stock"
          label="Stock"
          type="number"
          value={editedProduct.stock}
          onChange={handleChange}
          margin="normal"
          defaultValue={0}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={5}
          value={editedProduct.description}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.description}
          helperText={errors.description}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={editedProduct.onSale}
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

export default ProductEditForm;
