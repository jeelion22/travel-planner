import axios from "axios";

const baseURL = "https://reuniteme-backend.onrender.com/api";

// const baseURL = "http://localhost:5001/api";

// create an axios instance
const instance = axios.create({
  baseURL,
  // timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL,
  // timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});

protectedInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { instance, protectedInstance };
