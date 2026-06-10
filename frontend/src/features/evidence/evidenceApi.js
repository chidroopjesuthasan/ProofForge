const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getToken() {
  return (
    localStorage.getItem("pf_access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("pf_token")
  );
}

async function request(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

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

export const evidenceApi = {
  createEvidence(projectId, payload) {
    return request(`/api/projects/${projectId}/evidence`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getEvidence(projectId) {
    return request(`/api/projects/${projectId}/evidence`, {
      method: "GET",
    });
  },

  getEvidenceById(projectId, evidenceId) {
    return request(`/api/projects/${projectId}/evidence/${evidenceId}`, {
      method: "GET",
    });
  },

  updateEvidence(projectId, evidenceId, payload) {
    return request(`/api/projects/${projectId}/evidence/${evidenceId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  deleteEvidence(projectId, evidenceId) {
    return request(`/api/projects/${projectId}/evidence/${evidenceId}`, {
      method: "DELETE",
    });
  },
};