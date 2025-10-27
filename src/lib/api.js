// src/lib/api.j
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://g4s408kkw4cg48ccskcwc8kg.72.60.221.4.sslip.io/api', // backend URL
  withCredentials: true,    
   headers: {
    "ngrok-skip-browser-warning": "true",
  },           // important for HttpOnly cookies
});

export default API;
