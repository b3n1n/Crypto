import React from "react";
import useAdminDashboard from "../../custom_hooks/useAdminDashboard";

function AdminDashboard() {
  const { dashboard, loading, error } = useAdminDashboard();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboard) {
    return <div>No dashboard data</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-3">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Users</h6>
            <h3>{dashboard.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Assets</h6>
            <h3>{dashboard.totalAssets}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Transactions</h6>
            <h3>{dashboard.totalTransactions}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
