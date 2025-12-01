import axios from "axios";
import { clearAuthState } from "./services/clearAuthState";
import { getCookie, setCookie } from "./services/cookieUtils";

const API_URL =
  import.meta.env.VITE_PUBLIC_API_ENDPOINT || "https://admin-waccommerce.webc.in/api/v1";

let isRefreshing = false;
let failedQueue = [];

const selectedApp = localStorage.getItem("selectedApp");
let appId = null;

try {
  appId = selectedApp ? JSON.parse(selectedApp)?.app_id : null;
} catch {
  appId = null;
}

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", "X-App-ID": appId || "" },
});

// Request interceptor → add tokens
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    const resetToken = getCookie("resetToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (resetToken) {
      config.headers.Authorization = `Bearer ${resetToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 only once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) {
          clearAuthState();
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_URL}/refresh`, {
          refreshToken,
        });

        const newAccessToken = data?.data?.accessToken;
        if (newAccessToken) {
          setCookie("access_token", newAccessToken, 1); // refresh for 1 day or backend-defined
          apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        clearAuthState();
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle forbidden/other errors
    if (error.response?.status === 403) {
      window.location.href = "/permission-denied";
    } else if (error.response?.status === 502) {
      window.location.href = "/internal-server-error";
    }

    return Promise.reject(error);
  }
);

export const sendRequest = async (url, { arg }) => {
  const method = arg?.method || "POST";
  const { ...payload } = arg || {};

  try {
    switch (method.toUpperCase()) {
      case "GET":
        return await apiClient.get(url, { params: payload });
      case "POST":
        return await apiClient.post(url, payload);
      case "PUT":
        return await apiClient.put(url, payload);
      case "PATCH":
        return await apiClient.patch(url, payload);
      case "DELETE":
        return await apiClient.delete(url, { data: payload });
      default:
        return await apiClient.post(url, payload);
    }
  } catch (error) {
    console.error("API Request Failed:", {
      url,
      method,
      payload,
      status: error.response?.status,
      message: error.message,
    });

    // Optionally throw a normalized error
    throw new Error(
      `Request failed: ${error.response?.status} - ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

export default apiClient;
