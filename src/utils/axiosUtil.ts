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
let refreshSubscribers: (() => void)[] = [];

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

// Request Interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);
// Response Interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(client(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data }= await axios.post(`${import.meta.env.VITE_BACKENT_URL}/api/generate-newtoken`,{},{headers:{'Content-Type': 'application/json'}, withCredentials: true});
        if ('success' in data&&data.success===true) {
          isRefreshing = false;
          onTokenRefreshed();
          return client(originalRequest);
        }
      } catch {
        isRefreshing = false;
        handleAlert("error", "Session expired. Please login again.");

        return Promise.reject(new Error("403"));
      }finally{
        isRefreshing = false
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
    const isCode = parseInt(error.message);
    if ("errorType" in error) {
      throw new AppError(error.message, error.errorType, error.result);
    } else if (!isNaN(isCode)) {
      throw new Error("403");
    } else {
      throw new Error("unexpted error");
    }
  }
};
