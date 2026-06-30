import React, { useState } from "react";
import api from "../../../api/axios";
import { useWallet } from "../../../context/WalletContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function DepositModal({ show, onClose }) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const { refreshWallets } = useWallet();

  if (!show) return null;

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("api/wallet/deposit", {
        amount: Number(amount),
      });

      await refreshWallets();

      toast.success(t("depositSuccessful"));

      setAmount("");
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data ||
          error.response?.data?.message ||
          "Deposit failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{
          opacity: 0.5,
          zIndex: 1040,
        }}
        onClick={onClose}
      />

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
            <h5 className="m-0"> {t("depositFunds")}</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="card-body">
            <form onSubmit={handleDeposit}>
              <div className="mb-3">
                <label className="form-label"> {t("amount")}</label>

                <input
                  type="number"
                  min="0"
                  step="0.00000001"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-success w-100" disabled={loading}>
                {loading ? t("processing") : t("deposit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositModal;
