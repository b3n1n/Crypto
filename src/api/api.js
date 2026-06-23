const API_URL =
  import.meta.env.VITE_API_URL;

export async function apiFetch(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...options.headers,
      },
    }
  );

  if (!response.ok) {

    let message = "Request failed";

    try {
      const error =
        await response.json();

      message =
        error.message || message;

    } catch {

      message =
        await response.text();
    }

    throw new Error(message);
  }

  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    contentType &&
    contentType.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  return null;
}