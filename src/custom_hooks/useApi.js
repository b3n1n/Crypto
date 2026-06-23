import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export default function useApi(endpoint) {
  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result =
          await apiFetch(endpoint);

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
  };
}