import React from "react";
import { Button, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useUsers from "../hooks/useUsers";

const UsersTable = () => {
  const { loading, error, users, blockUser, unblockUser, refetch } = useUsers();

  const handleBlock = async (email) => {
    await blockUser(email);
    refetch();
  };

  const handleUnblock = async (email) => {
    await unblockUser(email);
    refetch();
  };

  const columns = [
    { field: "id", headerName: "Email", width: 300 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "isBlocked", headerName: "Blocked", width: 150 },
    { field: "joinDate", headerName: "Join Date", width: 250 },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 200,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.isBlocked ? (
            <Tooltip title="Blocked users can be unblocked">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleUnblock(params.row.email)}
              >
                Unblock
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Users can be blocked">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleBlock(params.row.email)}
              >
                Block
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = users.map((user) => ({ ...user, id: user.email }));

  return (
    <div className="mt-10">
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
  );
};

export default UsersTable;
