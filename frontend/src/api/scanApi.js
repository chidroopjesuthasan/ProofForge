const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const API_BASE_URL = RAW_API_BASE_URL.endsWith("/api")
  ? RAW_API_BASE_URL
  : `${RAW_API_BASE_URL.replace(/\/$/, "")}/api`;

function getAuthHeaders(includeJson = false) {
  const token = localStorage.getItem("pf_access_token");

  const headers = includeJson
    ? {
        "Content-Type": "application/json",
      }
    : {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response, allowNotFound = false) {
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (allowNotFound && response.status === 404) {
    return null;
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

export async function getUploadScanConfig(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}/scan-config`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  return parseResponse(response);
}

export async function updateUploadScanConfig(projectId, uploadId, payload) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}/scan-config`,
    {
      method: "PUT",
      headers: getAuthHeaders(true),
      body: JSON.stringify(payload),
    }
  );

  return parseResponse(response);
}

export async function runUploadScan(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}/scan`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return parseResponse(response);
}

export async function getLatestUploadScan(projectId, uploadId) {
  const response = await fetch(
    `${API_BASE_URL}/projects/${projectId}/uploads/${uploadId}/scan`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  return parseResponse(response, true);
}

// Compatibility aliases.
export const getScanConfig = getUploadScanConfig;
export const updateScanConfig = updateUploadScanConfig;
export const runScan = runUploadScan;
export const getLatestScan = getLatestUploadScan;