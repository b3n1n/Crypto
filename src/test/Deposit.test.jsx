import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import DepositModal from "../components/UI/Header/Deposit";
import api from "../api/axios";

vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("DepositModal", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders modal when show=true", () => {
    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    expect(
      screen.getByText(/deposit funds/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /deposit/i,
      })
    ).toBeInTheDocument();
  });

  test("does not render when show=false", () => {
    render(
      <DepositModal
        show={false}
        onClose={onCloseMock}
      />
    );

    expect(
      screen.queryByText(/deposit funds/i)
    ).not.toBeInTheDocument();
  });

  test("updates amount input", async () => {
    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "100");

    expect(input).toHaveValue(100);
  });

  test("sends deposit request", async () => {
    api.post.mockResolvedValue({
      data: "Deposit successful",
    });

    window.alert = vi.fn();

    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "100");

    await userEvent.click(
      screen.getByRole("button", {
        name: /deposit/i,
      })
    );

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(
        1
      );
    });

    expect(api.post).toHaveBeenCalledWith(
      "/wallet/deposit",
      {
        symbol: "USDT",
        amount: 100,
      }
    );
  });

  test("calls onClose after successful deposit", async () => {
    api.post.mockResolvedValue({
      data: "Deposit successful",
    });

    window.alert = vi.fn();

    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "500");

    await userEvent.click(
      screen.getByRole("button", {
        name: /deposit/i,
      })
    );

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test("shows loading state", async () => {
    api.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: "Deposit successful",
              }),
            100
          )
        )
    );

    window.alert = vi.fn();

    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "100");

    await userEvent.click(
      screen.getByRole("button", {
        name: /deposit/i,
      })
    );

    expect(
      screen.getByText(/processing/i)
    ).toBeInTheDocument();
  });

  test("handles api error", async () => {
    api.post.mockRejectedValue({
      response: {
        data: "Deposit failed",
      },
    });

    window.alert = vi.fn();

    render(
      <DepositModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "100");

    await userEvent.click(
      screen.getByRole("button", {
        name: /deposit/i,
      })
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Deposit failed"
      );
    });
  });
});