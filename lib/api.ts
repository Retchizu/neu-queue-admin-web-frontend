import axios, { AxiosError, AxiosHeaders } from "axios";
import { auth } from "@/lib/firebaseConfig";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUID_REQUEST_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = async () => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    if (typeof window !== "undefined") localStorage.setItem("token", token);
    return token;
  } else if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    if (storedToken) return storedToken;
  }

  return "";
};

// 🧩 REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = AxiosHeaders.from({
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    });
  }
  return config;
});

// 🧩 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest: any = error.config;

    // If 401 (unauthorized) and request not retried yet
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await getToken();
        if (newToken) {
          originalRequest.headers = AxiosHeaders.from({
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newToken}`,
          });
        }

        // Retry the failed request with new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
