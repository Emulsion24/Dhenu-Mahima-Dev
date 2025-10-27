// src/lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://saccharic-noncollusively-loni.ngrok-free.dev/api", // backend URL
  withCredentials: true,               // important for HttpOnly cookies
});

export default API;
