import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  if (token) {
    // ✔ TS-safe способ установить заголовок
    config.headers = config.headers || {};
    (config.headers as any).set?.("Authorization", `Bearer ${token}`);
    
    // fallback для старых версий (важно!)
    if (typeof (config.headers as any).set !== "function") {
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});
