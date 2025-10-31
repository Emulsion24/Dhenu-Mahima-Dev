import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore"; // adjust import path

const URL = process.env.NEXT_PUBLIC_API_URL;

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

let hasShownAuthToast = false;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // 🔒 401 — Unauthorized
      if (status === 401 && !hasShownAuthToast) {
        // ✅ Prevent showing on /login or /signup
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/signup") &&
          !window.location.pathname.startsWith("/")
        ) {
          toast.error("You are not authorized. Please log in again.");
        }

        try {
          // ✅ Logout silently — no toast
          useAuthStore.getState().logout(false);
        } catch (err) {
          console.error("Silent logout error:", err);
        }

        hasShownAuthToast = true;
        setTimeout(() => {
          hasShownAuthToast = false;
        }, 3000);
      }

      // 🚫 403 — Forbidden
      else if (status === 403) {
        toast.error(data?.message || "Access denied. You don’t have permission.");
      }

      // 💥 404 — Not Found
      else if (status === 404) {
        toast.error("Resource not found.");
      }

      // 🧨 500+ — Server Error
      else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default API;
