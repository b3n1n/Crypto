import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { parseJwt } from "../utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}) {

  const [token, setToken] =
    useState(null);

  const [role, setRole] =
    useState(null);

  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    if (savedToken) {

      setToken(savedToken);

      const payload =
        parseJwt(savedToken);

      setRole(payload?.role || null);
    }

  }, []);

  const login = (jwt) => {

    localStorage.setItem(
      "token",
      jwt
    );

    setToken(jwt);

    const payload =
      parseJwt(jwt);

    setRole(payload?.role || null);
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated:
          !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}