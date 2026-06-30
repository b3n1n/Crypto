import React, { useState } from "react";
import useAdminUsers from "../../../custom_hooks/useAdminUsers";
import UserFromModal from "./UserFromModal";
import { apiFetch } from "../../../api/api";
import { useTranslation } from "react-i18next";

function UsersPage() {
  const { t } = useTranslation();
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


  if (loading) {
    return <div>{t("loading")}</div>;
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

  const deleteUser = async (id) => {
    if (confirm(t("confirmDeleteUser"))) {
      try {
        await apiFetch(`/api/admin/users/${id}/delete`, {
          method: "DELETE",
        });

        await loadUsers();
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>{t("users")}</h2>

        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + {t("addUser")}
        </button>
      </div>

      <table className="table table-striped bg-white shadow-sm">
        <thead>
          <tr>
            <th>{t("username")}</th>
            <th>{t("email")}</th>
            <th>{t("role")}</th>
            <th>{t("status")}</th>
            <th>{t("actions")}</th>
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
                  {user.active ? t("active") : t("blocked")}
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
                  {t("edit")}
                </button>

                <button
                  className={
                    user.active
                      ? "btn btn-danger btn-sm"
                      : "btn btn-success btn-sm"
                  }
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.active ? t("block") : t("unblock")}
                </button>
                <button
                  className={"btn btn-danger btn-sm ms-2"}
                  onClick={() => deleteUser(user.id)}
                >
                  {t("delete")}
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