import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="mb-4">Admin Panel</h4>

      <ul className="nav flex-column gap-2">

        <li>
          <Link className="text-white text-decoration-none" to="/admin">
            Dashboard
          </Link>
        </li>

        <li>
          <Link className="text-white text-decoration-none" to="/admin/assets">
            Assets
          </Link>
        </li>

        <li>
          <Link className="text-white text-decoration-none" to="/admin/users">
            Users
          </Link>
        </li>

        <li>
          <Link className="text-white text-decoration-none" to="/admin/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link className="text-white text-decoration-none" to="/admin/transactions">
            Transactions
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;