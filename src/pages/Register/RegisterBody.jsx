import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../../api/api";
import { useTranslation } from "react-i18next";

function RegisterBody() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = t("invalidEmail");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      newErrors.password = t("passwordRequirements");
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("passwordMismatch");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await apiFetch("/api/auth/register", {
        method: "POST",

        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      alert("Registration successful");

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      toast.success(t("registrationSuccessful"));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 col-12 col-md-6 col-lg-4">
        <h2 className="text-center mb-4"> {t("register")}</h2>

        <form noValidate onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label"> {t("username")}</label>

            <input
              type="text"
              className="form-control"
              placeholder={t("enterUsername")}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label"> {t("email")}</label>

            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label"> {t("password")}</label>

            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder={t("enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label"> {t("confirmYourPassword")}</label>

            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder={t("confirmYourPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
             {t("register")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterBody;
