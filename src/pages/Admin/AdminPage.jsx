import React from "react";
import AdminDashboard from "./AdminDashboard";
import AssetsPage from "./assets/AssetPage";
import UsersPage from "./users/UsersPage";
import TransactionsPage from "./transactions/TransactionsPage";
import AdminLayout from "./AdminLayout";

function AdminPage() {
  return (

    <div className="container-fluid p-4">

      <h1 className="mb-4 fw-bold">
        Admin Dashboard
      </h1>

      {/* STATS */}

      <div className="row mb-4">

       <AdminDashboard/>

      </div>

      {/* ASSETS */}

      <div className="card shadow-sm mb-4">

        <AssetsPage/>

      </div>

      {/* USERS */}

      <div className="card shadow-sm mb-4">

        <UsersPage/>

      </div>

      {/* TRANSACTIONS */}

      <div className="card shadow-sm">

        <TransactionsPage/>

      </div>

    </div>
  );
}

export default AdminPage;