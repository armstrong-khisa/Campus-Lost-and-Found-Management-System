const BASE_URL = "http://127.0.0.1:3000";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  // If token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      "Something went wrong."
    );
  }

  return data;
}

const api = {
  get: (endpoint) => request(endpoint),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};

export default api;