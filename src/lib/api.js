// src/lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  withCredentials: true,               // important for HttpOnly cookies
});

export default API;
