import React, { useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useWallet } from "../../../context/WalletContext";
import { useTranslation } from "react-i18next";

function WithdrawalModal({ show, onClose }) {
  const { t } = useTranslation();
  const { refreshWallets } = useWallet();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/wallet/withdraw", {
        amount: Number(amount),
      });

      await refreshWallets();

      toast.success(t("withdrawSuccessful"));
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Withdrawal failed",
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
            <h5 className="m-0">{t("withdrawFunds")}</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="card-body">
            <form onSubmit={handleWithdrawal}>
              <div className="mb-3">
                <label className="form-label">
                  <label>{t("amount")}</label>
                </label>

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

              <button className="btn btn-danger w-100" disabled={loading}>
                {t("processing")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithdrawalModal;
