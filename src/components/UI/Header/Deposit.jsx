import React, { useState } from "react";
import api from "../../../api/axios";

function DepositModal({ show, onClose }) {
  const [symbol, setSymbol] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/wallet/deposit", {
        symbol,
        amount: Number(amount),
      });

      alert(response.data);

      setAmount("");
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{
          opacity: 0.5,
          zIndex: 1040,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="position-fixed top-50 start-50 translate-middle"
        style={{
          zIndex: 1050,
          width: "450px",
          maxWidth: "90%",
        }}
      >
        <div className="card shadow-lg">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="m-0">Deposit Funds</h5>

            <button
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="card-body">
            <form onSubmit={handleDeposit}>

              <div className="mb-3">
                <label className="form-label">
                  Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.00000001"
                  className="form-control"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />
              </div>

              <button
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Deposit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositModal;