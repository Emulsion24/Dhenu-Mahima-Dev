// src/lib/api.j
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const URL=process.env.API_URL;
console.log(URL)
const API = axios.create({
  baseURL:`${URL}`, // backend URL
  withCredentials: true,    
   headers: {
    "ngrok-skip-browser-warning": "true",
  },           
});

export default API;
