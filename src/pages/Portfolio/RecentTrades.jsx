// RecentTrades.jsx
import React from "react";
import Trades from "./Trades";

function RecentTrades({ trades }) {
  return (
    <div className="container-fluid mt-4">
      {" "}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h3 className="mb-4 fw-bold">Recent Trades</h3>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="border-bottom text-secondary">
                <tr>
                  <th className="fw-normal">Time</th>
                  <th className="fw-normal">Type</th>
                  <th className="fw-normal text-end">Price</th>
                  <th className="fw-normal text-end">Amount</th>
                </tr>
              </thead>

              <tbody>
                {trades.map((trade, index) => (
                  <Trades
                    key={index}
                    time={new Date(trade.createdAt).toLocaleTimeString()}
                    type={trade.type}
                    amount={trade.amount}
                    symbol={trade.symbol}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentTrades;
