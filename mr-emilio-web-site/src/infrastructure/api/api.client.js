import axios from "axios";

import environment from "../../config/environment";

console.log("API BASE URL:", environment.apiBaseUrl);

const apiClient = axios.create({
  baseURL: environment.apiBaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  console.log("AXIOS REQUEST:", {
    method: config.method,
    baseURL: config.baseURL,
    url: config.url,
    params: config.params,
  });

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("AXIOS REQUEST FAILED:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });

    return Promise.reject(error);
  }
);

export default apiClient;
