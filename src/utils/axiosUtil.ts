import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { handleAlert } from "./alert/SweeAlert";
import { AppError } from "../customError";

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKENT_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Request Interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userToken = localStorage.getItem("userToken");
    const refresh = localStorage.getItem("userRefresh");
    if (userToken) {
      config.headers["AuthForUser"] = userToken;
      if (refresh) {
        config.headers["RefreshAuthForUser"] = refresh;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers["authorizationforuser"]) {
      localStorage.setItem(
        "userRefresh",
        response.headers["authorizationforuser"]
      );
    }
    return response.data;
  },
  async (error) => {
    const originalRequest = {
      ...error.config,
      headers: { ...error.config.headers },
    };
    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers["AuthForUser"] = newToken;
            resolve(client(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKENT_URL}/user/getNewToken`,
          {
            refresh: localStorage.getItem("userRefresh"),
          }
        );
        if (data?.token) {
          localStorage.setItem("userToken", data.token);
          onTokenRefreshed(data.token);
          isRefreshing = false;
          originalRequest.headers["AuthForUser"] = data.token;
          return client(originalRequest);
        }
      } catch {
        handleAlert("error", "Session expired. Please login again.");

        return Promise.reject(new Error("token expired"));
      }
    }

    if (error.response?.status === 401) {
      if ("errorType" in error.response.data) {
        throw {
          message: error.response.data.message,
          errorType: error.response.data.errorType,
          result: error.response.data.result,
        };
      } else {
        localStorage.removeItem("adminToken");
        return Promise.reject(new Error("Admin token expired."));
      }
    }
    if (!error?.response?.data?.success) {
      throw {
        message: error.response.data.message,
        errorType: error.response.data.errorType,
        result: error.response.data.result,
      };
    } else {
      return Promise.reject(new Error(error.response.data.message));
    }
  }
);

export const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
  try {
    return await client(options);
  } catch (error: any) {
    if ("errorType" in error) {
      throw new AppError(error.message, error.errorType, error.result);
    } else {
      throw new Error("unexpted error");
    }
  }
};
