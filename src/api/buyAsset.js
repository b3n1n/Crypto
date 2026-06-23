import { apiFetch } from "./api";

export function buyAsset(data) {
  return apiFetch(
    "/api/trade/buy",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export function sellAsset(data) {
  return apiFetch(
    "/api/trade/sell",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}