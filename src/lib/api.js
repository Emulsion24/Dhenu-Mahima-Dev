import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL =>", URL);

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default API;
