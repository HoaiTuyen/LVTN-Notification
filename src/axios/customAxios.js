// Add a request interceptor
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let isRefreshing = false;
let failedQueue = [];

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

// Add a response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn và chưa retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Đợi nếu đang refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(api(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        console.log(refreshToken);

        const res = await api.post(
          `/auth/refresh-token?refreshToken=${refreshToken}`
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        api.defaults.headers.Authorization = "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Clear token nếu refresh lỗi
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default api;
