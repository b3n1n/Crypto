import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useChartData from "../../../custom_hooks/useChartData";

function Graph({ coins }) {
  const [activeRange, setActiveRange] = useState("1D");
  const [selectedId, setSelectedId] = useState("bitcoin");

  const rangeMap = { "1D": "1", "1W": "7", "1M": "30", "1Y": "365" };
  const ranges = ["1D", "1W", "1M", "1Y"];

  const coin = coins?.find((c) => c.id === selectedId);
  const price = coin?.current_price ?? 0;
  const change = coin?.price_change_percentage_24h ?? 0;
  const isPositive = change >= 0;
  const changeColor = isPositive ? "#16c784" : "#ea3943";

  const { chartData, loading, error } = useChartData(selectedId, activeRange);
  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const prices = chartData.map((d) => d.price);
  const minPrice = prices.length ? Math.min(...prices) * 0.9995 : "auto";
  const maxPrice = prices.length ? Math.max(...prices) * 1.0005 : "auto";

  return (
    <div className="w-100 p-4 m-3" style={{ borderRadius: "20px" }}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p className="m-0 fw-bold">
            {coin?.name} ({coin?.symbol?.toUpperCase()})
          </p>
          <p className="m-0" style={{ fontSize: "40px", fontWeight: "600" }}>
            $
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            <span style={{ color: changeColor, fontSize: "24px" }}>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <select
            className="form-select"
            style={{ width: "160px" }}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {coins?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          {ranges.map((r) => (
            <button
              key={r}
              className={`btn ${activeRange === r ? "btn-dark" : "btn-light"}`}
              onClick={() => setActiveRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(v) => v}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              width={90}
              tickFormatter={(v) => `$${Math.round(v).toLocaleString("en-US")}`}
            />
            <Tooltip
              formatter={(value) => [
                `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                "Price",
              ]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={changeColor}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
