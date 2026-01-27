import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, //  REQUIRED for cookies
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // silently ignore auth check failure
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);


export default api;
