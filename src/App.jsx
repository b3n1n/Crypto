import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Register from "./pages/Register";
import Login from "./pages/Login";
import useCoins from "./custom_hooks/useCoins";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import NotFound from "./pages/NotFound";
import AdminRoute from "./routes/AdminRoute";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import { WalletProvider } from "./context/WalletContext";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { coins, loading, error } = useCoins();

  if (loading) {
    return <div>Loading coins...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />

          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio coins={coins} />
              </ProtectedRoute>
            }
          />

          <Route path="/market" element={<Market coins={coins} />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </WalletProvider>
    </>
  );
}

export default App;
