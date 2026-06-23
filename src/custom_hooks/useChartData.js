import { useState, useEffect } from "react";

export default function useChartData(
  selectedId,
  activeRange
) {
  const [chartData, setChartData] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const rangeMap = {
    "1D": "1",
    "1W": "7",
    "1M": "30",
    "1Y": "365",
  };

  useEffect(() => {
    const loadChart = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedId}/market_chart?vs_currency=usd&days=${rangeMap[activeRange]}`
        );

        const data =
          await response.json();

        const formatted =
          data.prices.map((item) => {
            const date =
              new Date(item[0]);

            const label =
              activeRange === "1D"
                ? date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : date.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  });

            return {
              time: label,
              price: item[1],
            };
          });

        setChartData(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChart();
  }, [selectedId, activeRange]);

  return {
    chartData,
    loading,
    error,
  };
}