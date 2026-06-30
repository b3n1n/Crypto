import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { apiFetch } from "../api/api";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [portfolio, setPortfolio] = useState(null);

  const refreshWallets = async () => {
    try {
      const data = await apiFetch(
        "/api/portfolio"
      );

      setPortfolio(data);
    } catch (error) {
      console.error(
        "Failed to load portfolio",
        error
      );
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      refreshWallets();
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        portfolio,
        refreshWallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context =
    useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWallet must be used inside WalletProvider"
    );
  }

  return context;
}