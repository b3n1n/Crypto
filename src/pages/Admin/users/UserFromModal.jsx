import React from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../../../api/api";
import useAdminUsers from "../../../custom_hooks/useAdminUsers";
import { toast } from "react-toastify";

function UserFromModal({
  show,
  onClose,
  onSave,
  formData,
  handleChange,
  editingUser,
}) {
  const { t } = useTranslation();
  if (!show) return null;

const createUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await apiFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success(`User created`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingUser ? t("editUser") : t("addUser")}
            </h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder={t("username")}
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder={t("email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder={t("password")}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">USER</option>

              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {t("cancel")}
            </button>

            <button className="btn btn-success" onClick={onSave} onClick={createUser}>
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFromModal;