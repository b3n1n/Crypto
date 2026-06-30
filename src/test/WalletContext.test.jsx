import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import {
  describe,
  test,
  expect,
  vi,
} from "vitest";

import {
  WalletProvider,
  useWallet,
} from "../context/WalletContext";

import * as apiModule from "../api/api";

vi.mock("../api/api");

function TestComponent() {
  const {
    portfolio,
    refreshWallets,
  } = useWallet();

  return (
    <>
      <button
        onClick={refreshWallets}
      >
        Refresh
      </button>

      <div data-testid="value">
        {portfolio?.totalValue ?? 0}
      </div>
    </>
  );
}

describe("WalletContext", () => {
  test("refreshWallets loads portfolio", async () => {
    apiModule.apiFetch.mockResolvedValue({
      totalValue: 1000,
      wallets: [],
      recentTrades: [],
    });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    screen
      .getByRole("button")
      .click();

    await waitFor(() => {
      expect(
        screen.getByTestId("value")
      ).toHaveTextContent("1000");
    });
  });
});