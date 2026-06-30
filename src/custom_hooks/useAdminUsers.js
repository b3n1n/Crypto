import { useState, useEffect } from "react";

function useAdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadUsers = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://crypto-application-956e851e13c5.herokuapp.com/api/admin/users",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load users"
        );
      }

      const data =
        await response.json();

      setUsers(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
  };
}

export default useAdminUsers;