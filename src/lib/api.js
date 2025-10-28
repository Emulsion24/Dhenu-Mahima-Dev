// src/lib/api.j
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // backend URL
  withCredentials: true,    
   headers: {
    "ngrok-skip-browser-warning": "true",
  },           
});

export default API;
