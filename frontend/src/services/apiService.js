import { API_BASE_URL } from "../config/config";

export const getData = async (endpoint) => {
  try {
    console.log(`[REST API] Sending request to: ${API_BASE_URL}/${endpoint}`);

    // Tambahkan header ngrok-skip-browser-warning
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      //JIKA APP TIDAK BISA MEMFETCH ENDPOINT YANG SUDAH DI FORWARDING DENGAN NGROX
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log(`[REST API] Response status: ${response.status}`);
    console.log(`[REST API] Response content-type: ${response.headers.get("content-type")}`);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response type. Expected JSON.");
    }

    const data = await response.json();
    console.log("[REST API] Data received:", data);
    return data;
  } catch (error) {
    console.error("[REST API] Error fetching data:", error);
    throw error;
  }
};
