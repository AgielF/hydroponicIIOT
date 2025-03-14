import { WS_URL } from "../config/config";

export const createWebSocket = () => {
  console.log(`[WebSocket] Connecting to: ${WS_URL}`);
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("[WebSocket] Connection opened.");
  };

  ws.onerror = (error) => {
    console.error("[WebSocket] Error:", error);
  };

  ws.onclose = (event) => {
    console.warn(`[WebSocket] Connection closed: Code ${event.code}, Reason: ${event.reason}`);
  };

  return ws;
};
