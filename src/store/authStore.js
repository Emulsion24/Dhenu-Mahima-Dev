// lib/userStore.js
import { create } from "zustand";
import API from "@/lib/api"; // Axios instance

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  // ✅ Signup + send OTP
  signup: async (email, password, name, phone, address) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/signup", { email, password, name, phone, address });
      set({ loading: false });
      return res.data; // expect { message: "OTP sent", email }
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // ✅ Verify OTP for signup
  verifyOtp: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      set({ loading: false });
      return res.data; // expect { message: "Signup verified", user }
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // ✅ Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/login", { email, password });
      set({ loading: false, user: res.data.user });
      return res.data; // { user, token }
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await API.post("/auth/logout");
    } finally {
      set({ user: null });
    }
  },

  // ✅ Forgot password (send reset link via email)
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const res = await API.post("/auth/forgot-password", { email });
      set({ loading: false });
      return res.data; // { message: "Reset link sent" }
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // ✅ Reset password using token from email link
 resetPassword: async (token, newPassword) => {
    set({ loading: true, error: null });
    try {
      console.log("Zustand resetPassword called with:", { token, newPassword });
      
      const res = await API.post("/auth/reset-password", { 
        token: token,
        newPassword: newPassword 
      });
      
      console.log("Reset password response:", res.data);
      set({ loading: false });
      return res.data; // { message: "Password reset successful" }
    } catch (err) {
      console.error("Reset password error in store:", err);
      set({ loading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  // ✅ Check authenticated user
fetchUser: async () => {
  set({ loading: true, error: null });

  try {
    const res = await API.get("/auth/check-auth", {
      withCredentials: true, // ✅ Ensures cookies are sent
    });

    const userData = res.data?.user; // safe access

    set({
      loading: false,
      user: userData,
      isAuthenticated: !!userData, // ✅ track auth state
    });

    return userData;
  } catch (err) {
    console.log("❌ Auth check failed:", err.response?.data || err.message);

    set({
      loading: false,
      user: null,
      isAuthenticated: false,
      error: err.response?.data?.message || "Authentication failed",
    });

    return null;
  }
},


}));
