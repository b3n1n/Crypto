import { useEffect, useState } from "react";

export default function useCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );

        const data = await response.json();

        const filteredCoins = data.filter((coin) => {
          const change = coin.price_change_percentage_24h;

          return (
            change !== null &&
            change !== undefined &&
            !isNaN(change) &&
            change !== 0
          );
        });

        setCoins(filteredCoins);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  return {
    coins,
    loading,
    error,
  };
}