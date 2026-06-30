import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { apiFetch } from "../api/api";
import RegisterBody from "../pages/Register/RegisterBody";

import { toast } from "react-toastify";

vi.mock("../api/api", () => ({
  apiFetch: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("RegisterBody", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("renders registration form", () => {
    render(<RegisterBody />);

    expect(
      screen.getByRole("heading", {
        name: /registration/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/confirm password/i),
    ).toBeInTheDocument();
  });

  test("shows invalid email error", async () => {
    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "wrong-email",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "Password1",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    expect(
      await screen.findByText(/invalid email format/i),
    ).toBeInTheDocument();
  });

  test("shows weak password error", async () => {
    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "alex@gmail.com",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "12345678",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "12345678",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    expect(
      screen.getByText(/password must contain at least 8 characters/i),
    ).toBeInTheDocument();
  });

  test("shows password mismatch error", async () => {
    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "alex@gmail.com",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "Password1",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password2",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test("sends registration request when form is valid", async () => {
    apiFetch.mockResolvedValue({});

    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "alex@gmail.com",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "Password1",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    await waitFor(() => {
      expect(apiFetch).toHaveBeenCalledTimes(1);
    });

    expect(apiFetch).toHaveBeenCalledWith("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        userName: "alex",
        email: "alex@gmail.com",
        password: "Password1",
      }),
    });
  });

  test("shows success alert after successful registration", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve("Registration successful"),
      }),
    );

    window.alert = vi.fn();

    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "alex@gmail.com",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "Password1",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Registration successful");
    });
  });

  test("shows server error toast", async () => {
    apiFetch.mockRejectedValue(new Error("Server Error"));

    render(<RegisterBody />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "alex",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "alex@gmail.com",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "Password1",
    );

    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      "Password1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Server Error");
    });
  });
});
