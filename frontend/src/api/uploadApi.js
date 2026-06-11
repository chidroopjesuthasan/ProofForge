const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const API_BASE_URL = RAW_API_BASE_URL.endsWith("/api")
  ? RAW_API_BASE_URL
  : `${RAW_API_BASE_URL.replace(/\/$/, "")}/api`;

function getAuthHeaders() {
  const token = localStorage.getItem("pf_access_token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  let body = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message =
      body?.message ||
      body?.error ||
      body?.detail ||
      body?.data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  if (body && typeof body === "object" && "success" in body && "data" in body) {
    return body.data;
  }

  return body;
}

export async function uploadProjectZip(projectId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/uploads`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  return parseResponse(response);
}

export async function getProjectUploads(projectId) {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/uploads`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return parseResponse(response);
}

export async function getProjectUpload(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}`,
    {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  return parseResponse(response);
}

export async function deleteProjectUpload(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}`,
    {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  return parseResponse(response);
}