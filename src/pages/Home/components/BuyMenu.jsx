import { useState, useRef, useEffect } from "react";
import "./BuyMenu.css";

function BuyMenu({ coins }) {
  const [isSell, setIsSell] = useState(false);
  const [selectedId, setSelectedId] = useState("bitcoin");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const dropdownRef = useRef(null);

  const coin = coins?.find((c) => c.id === selectedId);
  const ticker = coin?.symbol?.toUpperCase() ?? "—";
  const currentPrice = coin?.current_price ?? 0;
  const [price, setPrice] = useState(currentPrice);

  const filtered =
    coins?.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const total =
    price && amount
      ? (parseFloat(price) * parseFloat(amount)).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  useEffect(() => {
    setPrice(coin?.current_price ?? "");
    setAmount("");
    setSearch("");
  }, [selectedId]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    setIsOpen(false);
  };

  const handlePercent = (pct) => {
    if (!currentPrice) return;

    const baseAmount = isSell ? 1 : 10000 / currentPrice;
    setAmount(((baseAmount * pct) / 100).toFixed(6));
  };

  const handleTrade = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await apiFetch(`/api/trade/${isSell ? "sell" : "buy"}`, {
        method: "POST",

        body: JSON.stringify({
          symbol: ticker,
          amount: parseFloat(amount),
          price: parseFloat(price),
        }),
      });

      alert(`${isSell ? "Sold" : "Bought"} ${amount} ${ticker}`);

      setAmount("");
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <div className="container pt-4 d-flex w-100 justify-content-center">
      <div className="trade-card p-4">
        <form onSubmit={handleTrade}>
          <div className="mb-3 dropdown-wrapper" ref={dropdownRef}>
            <label className="form-label section-title">Coin</label>

            <div
              className="custom-input d-flex align-items-center justify-content-between px-3 coin-selector"
              onClick={() => setIsOpen((v) => !v)}
            >
              <div className="d-flex align-items-center gap-2">
                {coin?.image && (
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-selector-img"
                  />
                )}

                <span className="coin-selector-name">{coin?.name}</span>

                <span className="coin-selector-symbol">{ticker}</span>
              </div>

              <span className="coin-selector-arrow">{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="dropdown">
                <div className="dropdown-select">
                  <input
                    autoFocus
                    type="text"
                    className="form-control dropdown_select"
                    placeholder="Search coin..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="dropdown_search_select">
                  {filtered.length === 0 && (
                    <div className="dropdown_search_select-coin-none">
                      Nothing found
                    </div>
                  )}

                  {filtered.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelect(c.id)}
                      className={`dropdown_search_select-coin ${
                        c.id === selectedId
                          ? "dropdown_search_select-coin_active"
                          : ""
                      }`}
                    >
                      {c.image && (
                        <img
                          className="dropdown_search_select-coin_img"
                          src={c.image}
                          alt={c.name}
                        />
                      )}

                      <span className="dropdown_search_select-coin_name">
                        {c.name}
                      </span>

                      <span className="dropdown_search_select-coin_symbol">
                        {c.symbol.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="d-flex gap-2 mb-3">
            <button
              className={`btn w-50 py-3 fw-semibold ${
                !isSell ? "btn-success" : "btn-light"
              }`}
              type="button"
              onClick={() => setIsSell(false)}
            >
              Buy
            </button>

            <button
              className={`btn w-50 py-3 fw-semibold ${
                isSell ? "btn-danger" : "btn-light sell-btn"
              }`}
              type="button"
              onClick={() => setIsSell(true)}
            >
              Sell
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label section-title">Price (USD)</label>

            <div className="d-flex gap-2 align-items-center">
              <input
                type="number"
                className="form-control custom-input"
                placeholder={currentPrice.toLocaleString("en-US")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <button type="button" className="btn btn-light switch-btn">
                ↕
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label section-title">
              Amount ({ticker})
            </label>

            <input
              type="number"
              className="form-control custom-input mb-3"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="d-flex gap-2">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  className="btn btn-light percent-btn w-25"
                  type="button"
                  key={pct}
                  onClick={() => handlePercent(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label section-title">Total (USD)</label>

            <input
              type="text"
              className="form-control custom-input total-input"
              placeholder="$0.00"
              value={total ? `$${total}` : ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            className={`btn w-100 buy-btn mb-3 ${
              isSell ? "btn-danger" : "btn-success"
            }`}
          >
            {isSell ? "Sell" : "Buy"} {ticker}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BuyMenu;
