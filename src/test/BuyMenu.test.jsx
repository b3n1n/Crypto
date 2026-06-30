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
  vi,
  beforeEach,
} from "vitest";

import BuyMenu from "../pages/Home/components/BuyMenu";

import * as apiModule from "../api/api";

const refreshWalletsMock =
  vi.fn();

vi.mock(
  "../context/WalletContext",
  () => ({
    useWallet: () => ({
      refreshWallets:
        refreshWalletsMock,
    }),
  })
);

vi.mock("../api/api");

describe("BuyMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(
      "token",
      "jwt"
    );
  });

  const coins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      current_price: 50000,
    },
  ];

  test("renders coin name", () => {
    render(<BuyMenu coins={coins} />);

    expect(
      screen.getByText("Bitcoin")
    ).toBeInTheDocument();
  });

  test("changes amount input", async () => {
    render(<BuyMenu coins={coins} />);

    const inputs =
      screen.getAllByRole(
        "spinbutton"
      );

    await userEvent.type(
      inputs[1],
      "1"
    );

    expect(inputs[1]).toHaveValue(
      1
    );
  });

  test("sends buy request", async () => {
    apiModule.apiFetch
      .mockResolvedValue({});

    render(<BuyMenu coins={coins} />);

    const inputs =
      screen.getAllByRole(
        "spinbutton"
      );

    await userEvent.clear(
      inputs[1]
    );

    await userEvent.type(
      inputs[1],
      "1"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /buy btc/i,
      })
    );

    await waitFor(() => {
      expect(
        apiModule.apiFetch
      ).toHaveBeenCalled();
    });

    expect(
      refreshWalletsMock
    ).toHaveBeenCalled();
  });

  test("switches to sell mode", async () => {
    render(<BuyMenu coins={coins} />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /^sell$/i,
      })
    );

    expect(
      screen.getByRole("button", {
        name: /sell btc/i,
      })
    ).toBeInTheDocument();
  });
});