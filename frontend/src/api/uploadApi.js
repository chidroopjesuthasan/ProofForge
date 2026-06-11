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
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export async function listProjectUploads(projectId) {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/uploads`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return parseResponse(response);
}

export async function uploadProjectZip(projectId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/uploads`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  return parseResponse(response);
}

export async function deleteProjectUpload(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return parseResponse(response);
}

// Compatibility aliases.
export const getProjectUploads = listProjectUploads;
export const uploadZip = uploadProjectZip;
export const deleteUpload = deleteProjectUpload;