const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080"
).replace(/\/$/, "");

function readToken() {
  const directKeys = [
    "proofForgeToken",
    "pf_token",
    "token",
    "jwtToken",
    "accessToken",
  ];

  for (const key of directKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      return value;
    }
  }

  const objectKeys = ["auth", "user", "proofForgeAuth"];

  for (const key of objectKeys) {
    const value = localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      const parsed = JSON.parse(value);

      if (parsed?.token) {
        return parsed.token;
      }

      if (parsed?.accessToken) {
        return parsed.accessToken;
      }

      if (parsed?.jwt) {
        return parsed.jwt;
      }
    } catch {
      // Ignore invalid localStorage JSON.
    }
  }

  return null;
}

async function request(path, options = {}) {
  const token = readToken();

  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.detail ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const projectApi = {
  listProjects() {
    return request("/api/projects");
  },

  getProject(projectId) {
    return request(`/api/projects/${projectId}`);
  },

  createProject(payload) {
    return request("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateProject(projectId, payload) {
    return request(`/api/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteProject(projectId) {
    return request(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
  },
};