import React from "react";
import useAdminTransactions from "../../../custom_hooks/useAdminTransactions";
import { useTranslation } from "react-i18next";

function TransactionsPage() {
  const { t } = useTranslation();

  const {
    transactions,
    loading,
    error,
  } = useAdminTransactions();

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>

      <h2 className="mb-3">
        {t("transactions")}
      </h2>

      <table className="table table-bordered bg-white shadow-sm">

        <thead>

          <tr>
            <th>{t("user")}</th>
            <th>{t("asset")}</th>
            <th>{t("type")}</th>
            <th>{t("amount")}</th>
            <th>{t("date")}</th>
          </tr>

        </thead>

        <tbody>

          {transactions.map(
            (transaction, index) => (

              <tr key={index}>

                <td>
                  {transaction.userName}
                </td>

                <td>
                  {transaction.asset}
                </td>

                <td>

                  <span
                    className={
                      transaction.type === "BUY"
                        ? "badge bg-success"
                        : transaction.type === "SELL"
                        ? "badge bg-danger"
                        : "badge bg-primary"
                    }
                  >
                    {transaction.type}
                  </span>

                </td>

                <td>
                  {transaction.amount}
                </td>

                <td>
                  {new Date(
                    transaction.createdAt
                  ).toLocaleString()}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TransactionsPage;