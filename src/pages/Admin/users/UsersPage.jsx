import React, { useState } from "react";
import useAdminUsers from "../../../custom_hooks/useAdminUsers";
import UserFromModal from "./UserFromModal";

function UsersPage() {
  const [editingUser, setEditingUser] = useState(null);

  const { users, loading, error, loadUsers } = useAdminUsers();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await apiFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      await loadUsers();

      setFormData({
        userName: "",
        email: "",
        password: "",
        role: "USER",
      });

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const saveUser = async () => {
    try {
      await apiFetch(
        isEdit ? `/api/admin/users/${editingUser.id}` : "/api/admin/users",
        {
          method,
          body: JSON.stringify(formData),
        },
      );

      await loadUsers();

      setEditingUser(null);

      setFormData({
        userName: "",
        email: "",
        password: "",
        role: "USER",
      });

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await apiFetch(`/api/admin/users/${id}/toggle-status`, {
        method: "PATCH",
      });

      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Users</h2>

        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      <table className="table table-striped bg-white shadow-sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>

              <td>{user.email}</td>

              <td>
                <span
                  className={
                    user.role === "ADMIN"
                      ? "badge bg-danger"
                      : "badge bg-primary"
                  }
                >
                  {user.role}
                </span>
              </td>

              <td>
                <span
                  className={
                    user.active ? "badge bg-success" : "badge bg-secondary"
                  }
                >
                  {user.active ? "Active" : "Blocked"}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingUser(user);

                    setFormData({
                      userName: user.userName,
                      email: user.email,
                      password: "",
                      role: user.role,
                    });

                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className={
                    user.active
                      ? "btn btn-danger btn-sm"
                      : "btn btn-success btn-sm"
                  }
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserFromModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={saveUser}
        formData={formData}
        handleChange={handleChange}
        editingUser={editingUser}
      />
    </div>
  );
}

export default UsersPage;
