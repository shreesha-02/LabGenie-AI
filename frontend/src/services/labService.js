/**
 * labService.js
 *
 * Handles communication with the LabGenie AI backend.
 * The base URL is read from the Vite environment variable VITE_API_BASE_URL.
 * If not set, defaults to "/api" (proxied by Vite dev server to localhost:5000).
 *
 * TODO: In a future step, the backend will call IBM Granite + RAG.
 *       No changes to this file will be needed — just update the backend controller.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

/**
 * Send a generate request to the backend.
 * @param {{ subject: string, topic: string, difficulty: string }} formData
 * @returns {Promise<object>} The lab manual object
 */
export async function generateManual(formData) {
  const response = await fetch(`${API_BASE}/lab/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate lab manual.");
  }

  return data.manual;
}
