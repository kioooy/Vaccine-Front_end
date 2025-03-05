import React from "react";
import { useSelector } from "react-redux";

function ManageUser() {

  // get data tu redux
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>{user?.fullName}</h1>
    </div>
  );
}

export default ManageUser;
