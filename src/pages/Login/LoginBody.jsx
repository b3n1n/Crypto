import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../api/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function LoginBody(props) {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",

        body: JSON.stringify({
          userName,
          password,
        }),
      });

      login(data.token);
      toast.success(t("loginSuccessful"));
    } catch (err) {
      t(err.message) || toast.error(err.message);
    }
  };
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 col-12 col-md-6 col-lg-4">
        <h2 className="text-center mb-4">{t("login")}</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{t("username")}</label>

            <input
              type="text"
              className="form-control"
              value={userName}
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("password")}</label>

            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginBody;
