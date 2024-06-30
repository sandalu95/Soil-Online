import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import useReviews from "../hooks/useReviews";
import Rating from "@mui/material/Rating";

const ReviewsTable = () => {
  const { loading, error, reviews, deleteReview, approveReview, refetch } =
    useReviews();

  const handleDelete = async (id) => {
    await deleteReview(id);
    refetch();
  };

  const handleApprove = async (id) => {
    await approveReview(id);
    refetch();
  };

  function renderRating(params) {
    return (
      <Tooltip title={params.value.toString()}>
        <div>
          <Rating readOnly value={params.value} />
        </div>
      </Tooltip>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "product", headerName: "Product", width: 330 },
    { field: "content", headerName: "Content", width: 400 },
    {
      field: "stars",
      headerName: "Rating",
      renderCell: renderRating,
      display: "flex",
      width: 170,
    },
    {
      field: "date",
      headerName: "Date",
      width: 190,
      valueFormatter: (params) => {
        const date = new Date(params);
        return date.toLocaleString();
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <Tooltip title="Approve">
            <IconButton onClick={() => handleApprove(params.row.id)}>
              <ThumbUpIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = reviews.map((review) => ({
    id: review.id,
    username: review.user.username,
    product: review.product.name,
    content: review.content,
    stars: review.stars,
    date: review.date,
  }));

  return (
    <>
      <div className="mt-8" style={{ width: "100%" }}>
        <h2 className="text-xl font-semibold mb-6">Flagged Reviews <FlagIcon color="error" /></h2>
        {rows.length > 0 ? (
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
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No flagged reviews available
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewsTable;
