import { useEffect, useState } from "react";

function useAdminAssets() {

  const [assets, setAssets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAssets =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            "http://localhost:8080/api/admin/assets",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load assets"
          );
        }

        const data =
          await response.json();

        setAssets(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    loadAssets();
  }, []);

  return {
    assets,
    setAssets,
    loading,
    error,
    loadAssets,
  };
}

export default useAdminAssets;