// PATH: client/src/services/api.js
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 20000,
});

export const getSessionId = () => {
  let id = localStorage.getItem("gate_session_id");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("gate_session_id", id);
  }
  return id;
};

export const sendMessage = (userMessage, branch) =>
  API.post("/chat", { userMessage, sessionId: getSessionId(), branch });

export const fetchHistory = () => API.get(`/history/${getSessionId()}`);

export const clearHistory = () => API.delete(`/history/${getSessionId()}`);
