import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cryptolist from "./Cryptolist";
import RecentTrades from "./RecentTrades";
import useApi from "../../custom_hooks/useApi";
import "./styles/PortfolioBody.css";

function PortfolioBody() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: portfolio, loading, error } = useApi("/api/portfolio");

  if (!token) {
    return (
      <div className="logout-portfolio">
        <div className="logout-portfolio_container">
          <h1 className="logout-portfolio_container-h">🔒 Требуется вход</h1>

          <p className="logout-portfolio_container-p">
            Для просмотра портфеля необходимо авторизоваться.
          </p>

          <button onClick={() => navigate("/login")}>Войти</button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container d-flex mt-3 ">
      <div className="card p-4 shadow-sm rounded-4 border-0 portfolio-container">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h2 className="fw-bold">Portfolio</h2>

          <div className="text-end">
            <div className="text-secondary">Total Value</div>

              <h1 className="fw-bold m-0">
                ${Number(portfolio.totalValue).toLocaleString()}
              </h1>
          </div>
        </div>
        <Cryptolist wallets={portfolio.wallets} />
      </div>
      <RecentTrades trades={portfolio.recentTrades} />
    </div>
  );
}

export default PortfolioBody;
