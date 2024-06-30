import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GRID_STRING_COL_DEF } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useProducts from "../hooks/useProducts";
import ProductEditForm from "./ProductEditForm";

export default function ProductTable() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toBeDelete, setToBeDelete] = useState();
  const [filterOnSale, setFilterOnSale] = useState(false);
  const {
    loading: productLoading,
    products,
    editProduct,
    deleteProduct,
  } = useProducts();
  const [rows, setRows] = useState(
    products.map(({ __typename, ...rest }) => rest)
  );

  useEffect(() => {
    if (!productLoading && products) {
      setRows(products.map(({ __typename, ...rest }) => rest));
    }
  }, [productLoading, products]);

  useEffect(() => {
    const filteredProducts = filterOnSale
      ? products.filter((product) => product.onSale)
      : products;
    setRows(filteredProducts.map(({ __typename, ...rest }) => rest));
  }, [filterOnSale, products]);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const actionColumnType = {
    ...GRID_STRING_COL_DEF,
    type: "custom",
    resizable: false,
    filterable: false,
    sortable: false,
    editable: false,
    groupable: false,
    display: "flex",
    renderCell: (params) => (
      <>
        <IconButton onClick={() => {}}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    ),
  };

  const handleEdit = (product) => {
    setToEdit(product);
    toggleDrawer(true);
  };

  function handleDelete(value) {
    setToBeDelete({ id: value.id, name: value.name });
    handleDialogOpen(true);
  }

  const handleSaveEdit = async (editedProduct) => {
    try {
      await editProduct(
        editedProduct.id,
        editedProduct.name,
        parseFloat(editedProduct.price),
        parseFloat(editedProduct.discount),
        parseInt(editedProduct.stock, 10),
        editedProduct.description,
        editedProduct.onSale
      );
      toggleDrawer(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  async function handleConfirmDelete() {
    handleDialogClose();
    await deleteProduct(toBeDelete.id);
  }

  function ActionButtons(props) {
    return (
      <>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEdit(props.value);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              handleDelete(props.value);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 400,
      renderCell: (params) => (
        <div className="flex items-center">
          <span>{params.value}</span>
          {params.row.onSale && (
            <span className="ml-2 text-xs text-white bg-red-500 rounded-full px-2 py-1">
              On Sale
            </span>
          )}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "float",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "discount",
      headerName: "Discount (%)",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 580,
      renderCell: (params) => (
        <Tooltip title={params.value}>{params.value}</Tooltip>
      ),
    },
    {
      field: "actions",
      ...actionColumnType,
      headerName: "Actions",
      width: 120,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => row,
      renderCell: (params) => <ActionButtons {...params} />,
    },
  ];

  return (
    <>
      <div className="mt-8">
        <FormControlLabel
          control={
            <Switch
              checked={filterOnSale}
              onChange={(e) => setFilterOnSale(e.target.checked)}
            />
          }
          label="Show On-Sale Items Only"
          className="mb-3"
        />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          disableRowSelectionOnClick
        />
      </div>
      <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="right">
        {toEdit && (
          <Box className="w-80 p-4">
            <ProductEditForm product={toEdit} onSave={handleSaveEdit} />
          </Box>
        )}
      </Drawer>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product{" "}
            <strong>{toBeDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
