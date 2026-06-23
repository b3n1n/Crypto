import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DepositModal from "./Deposit";

function Navigation(props) {
  const { role } = useAuth();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const token = localStorage.getItem("token");
  const { logout } = useAuth();
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
      <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-3 fw-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trending-up w-8 h-8 text-primary ms-3 me-3"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
        CryptoTrade
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 fs-5 gap-3">
        <li>
          <Link to="/" className="nav-link px-2 link-dark">
            Trade
          </Link>
        </li>
        <li>
          {role === "ADMIN" ? (
            <Link to="/admin" className="nav-link">
              Admin Panel
            </Link>
          ) : (
            <Link
              to="/Portfolio"
              className="nav-link px-2 link-dark d-flex justify-content-center align-items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-wallet w-4 h-4"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
              </svg>
              Portfolio
            </Link>
          )}
        </li>
        <li>
          <Link
            to="/Market"
            className="nav-link px-2 link-secondary d-flex justify-content-center align-items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chart-column w-4 h-4"
            >
              <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
              <path d="M18 17V9"></path>
              <path d="M13 17V5"></path>
              <path d="M8 17v-3"></path>
            </svg>
            Markets
          </Link>
        </li>
      </ul>

      <div className="col-md-3 text-end">
        {token ? (
          <div className="d-flex justify-content-end gap-2 me-4">
            <button
              className="btn btn-success"
              onClick={() => setShowDepositModal(true)}
            >
              Add Funds
            </button>
            <DepositModal
              show={showDepositModal}
              onClose={() => setShowDepositModal(false)}
            />
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/Login" className="btn btn-light me-2 fw-bold fs-6">
              Sign In
            </Link>

            <Link to="/Register" className="btn btn-dark me-5">
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navigation;
