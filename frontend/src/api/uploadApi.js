const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

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

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
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