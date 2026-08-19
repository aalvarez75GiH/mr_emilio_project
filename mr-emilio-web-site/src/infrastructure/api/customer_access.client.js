import axios from "axios";

import environment from "../../config/environment";

const customerAccessClient = axios.create({
  baseURL: environment.apiBaseUrl,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

customerAccessClient.interceptors.request.use((config) => {
  console.log("CUSTOMER ACCESS REQUEST:", {
    method: config.method,
    baseURL: config.baseURL,
    url: config.url,
    params: config.params,
  });

  return config;
});

customerAccessClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("CUSTOMER ACCESS REQUEST FAILED:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });

    return Promise.reject(error);
  }
);

export default customerAccessClient;
