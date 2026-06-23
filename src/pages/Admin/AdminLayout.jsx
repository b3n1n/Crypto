import React from "react";
import AdminSidebar from "./sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div
        className="flex-grow-1 p-4"
        style={{ background: "#f8f9fa", minHeight: "100vh" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;