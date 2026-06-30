import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";

import WithdrawalModal from "../components/UI/Header/Withdrawal";

import api from "../api/axios";

const refreshWalletsMock = vi.fn();

vi.mock("../context/WalletContext", () => ({
  useWallet: () => ({
    refreshWallets: refreshWalletsMock,
  }),
}));

vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("WithdrawalModal", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders modal", () => {
    render(
      <WithdrawalModal
        show={true}
        onClose={onCloseMock}
      />
    );

    expect(
      screen.getByText(/withdraw funds/i)
    ).toBeInTheDocument();
  });

  test("does not render when hidden", () => {
    render(
      <WithdrawalModal
        show={false}
        onClose={onCloseMock}
      />
    );

    expect(
      screen.queryByText(/withdraw funds/i)
    ).not.toBeInTheDocument();
  });

  test("updates amount field", async () => {
    render(
      <WithdrawalModal
        show={true}
        onClose={onCloseMock}
      />
    );

    const input =
      screen.getByRole("spinbutton");

    await userEvent.type(input, "250");

    expect(input).toHaveValue(250);
  });

  test("sends withdrawal request", async () => {
    api.post.mockResolvedValue({});

    render(
      <WithdrawalModal
        show={true}
        onClose={onCloseMock}
      />
    );

    await userEvent.type(
      screen.getByRole("spinbutton"),
      "100"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /withdraw/i,
      })
    );

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });

    expect(api.post).toHaveBeenCalledWith(
      "/wallet/withdraw",
      {
        amount: 100,
      }
    );
  });

  test("refreshes wallets after withdraw", async () => {
    api.post.mockResolvedValue({});

    render(
      <WithdrawalModal
        show={true}
        onClose={onCloseMock}
      />
    );

    await userEvent.type(
      screen.getByRole("spinbutton"),
      "50"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /withdraw/i,
      })
    );

    await waitFor(() => {
      expect(refreshWalletsMock)
        .toHaveBeenCalled();
    });
  });

  test("closes modal after success", async () => {
    api.post.mockResolvedValue({});

    render(
      <WithdrawalModal
        show={true}
        onClose={onCloseMock}
      />
    );

    await userEvent.type(
      screen.getByRole("spinbutton"),
      "75"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /withdraw/i,
      })
    );

    await waitFor(() => {
      expect(onCloseMock)
        .toHaveBeenCalled();
    });
  });
});