import React from "react";
import AdminDashboard from "./AdminDashboard";
import AssetsPage from "./assets/AssetPage";
import UsersPage from "./users/UsersPage";
import TransactionsPage from "./transactions/TransactionsPage";
import AdminLayout from "./AdminLayout";
import { useTranslation } from "react-i18next";

function AdminPage() {
  const { t } = useTranslation();
  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 fw-bold">{t("adminPanel")}</h1>

      <div className="row mb-4">
        <AdminDashboard />
      </div>

      <div className="card shadow-sm mb-4">
        <AssetsPage />
      </div>

      <div className="card shadow-sm mb-4">
        <UsersPage />
      </div>

      <div className="card shadow-sm">
        <TransactionsPage />
      </div>
    </div>
  );
}

export default AdminPage;