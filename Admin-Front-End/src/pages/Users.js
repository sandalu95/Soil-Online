import React from "react";
import UsersTable from "../components/UsersTable";

const Users = () => {
  return (
    <div className="flex-1 p-7">
      <h1 className="text-3xl font-semibold mb-6">Users</h1>
      <hr className="mb-10" />
      <UsersTable />
    </div>
  );
};

export default Users;
