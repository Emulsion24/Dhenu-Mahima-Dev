// src/lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://saccharic-noncollusively-loni.ngrok-free.dev', // backend URL
  withCredentials: true,    
   headers: {
    "ngrok-skip-browser-warning": "true",
  },           // important for HttpOnly cookies
});

export default API;
