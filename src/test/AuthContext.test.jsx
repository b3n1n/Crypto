import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  test,
  expect,
  beforeEach,
} from "vitest";

import {
  AuthProvider,
  useAuth,
} from "../context/AuthContext";

function TestComponent() {
  const {
    token,
    isAuthenticated,
    login,
    logout,
  } = useAuth();

  return (
    <div>
      <div data-testid="token">
        {token || "no-token"}
      </div>

      <div data-testid="auth">
        {isAuthenticated
          ? "authenticated"
          : "guest"}
      </div>

      <button
        onClick={() =>
          login("jwt-test-token")
        }
      >
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("starts as guest", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(
      screen.getByTestId("token")
    ).toHaveTextContent("no-token");

    expect(
      screen.getByTestId("auth")
    ).toHaveTextContent("guest");
  });

  test("loads token from localStorage", async () => {
    localStorage.setItem(
      "token",
      "stored-jwt"
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("token")
      ).toHaveTextContent(
        "stored-jwt"
      );
    });

    expect(
      screen.getByTestId("auth")
    ).toHaveTextContent(
      "authenticated"
    );
  });

  test("login stores token", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      localStorage.getItem("token")
    ).toBe("jwt-test-token");

    expect(
      screen.getByTestId("token")
    ).toHaveTextContent(
      "jwt-test-token"
    );

    expect(
      screen.getByTestId("auth")
    ).toHaveTextContent(
      "authenticated"
    );
  });

  test("logout removes token", async () => {
    localStorage.setItem(
      "token",
      "stored-jwt"
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("token")
      ).toHaveTextContent(
        "stored-jwt"
      );
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: /logout/i,
      })
    );

    expect(
      localStorage.getItem("token")
    ).toBeNull();

    expect(
      screen.getByTestId("token")
    ).toHaveTextContent(
      "no-token"
    );

    expect(
      screen.getByTestId("auth")
    ).toHaveTextContent(
      "guest"
    );
  });
});