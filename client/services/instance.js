import axios from "axios";

const baseURL = "/api";
// const baseURL = "http://localhost:5001/api";
//
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const protectedInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export { instance, protectedInstance };
