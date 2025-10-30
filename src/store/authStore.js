// lib/userStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import API from "@/lib/api"; // Axios instance


export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
      token: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setToken: (token) => set({ token }),

      // ✅ Signup + send OTP
      signup: async (email, password, name, phone, address) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/signup", { email, password, name, phone, address });
          set({ loading: false });
          toast.success("OTP sent to your email");
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          set({ loading: false, error: message });
          toast.error(message);
          throw err;
        }
      },

      // ✅ Verify OTP for signup
      verifyOtp: async (email, otp) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/verify-otp", { email, otp });
          const { user, token } = res.data;
          
          set({ 
            loading: false,
            user,
            token,
            isAuthenticated: true
          });
          toast.success("Account verified successfully");
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          set({ loading: false, error: message });
          toast.error(message);
          throw err;
        }
      },

      // ✅ Login
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/login", { email, password });
          const { user, token } = res.data;
          
          set({ 
            loading: false, 
            user,
            token,
            isAuthenticated: true,
            error: null
          });
          toast.success("Logged in successfully");
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          set({ 
            loading: false, 
            error: message,
            user: null,
            token: null,
            isAuthenticated: false
          });
          toast.error(message);
          throw err;
        }
      },


     // ✅ Logout
logout: async (showToast = true) => {
  try {
    await API.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    delete API.defaults.headers.common["Authorization"];

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });

    localStorage.removeItem("auth-storage");

    // ✅ Show toast only if this was a manual logout
    if (showToast) {
      toast.success("Logged out successfully");
    }
  }
},


      // ✅ Forgot password (send reset link via email)
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/forgot-password", { email });
          set({ loading: false });
          toast.success("Password reset link sent to your email");
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          set({ loading: false, error: message });
          toast.error(message);
          throw err;
        }
      },

      // ✅ Reset password using token from email link
      resetPassword: async (token, newPassword) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/reset-password", { token, newPassword });
          set({ loading: false });
          toast.success("Password reset successfully");
          return res.data;
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          set({ loading: false, error: message });
          toast.error(message);
          throw err;
        }
      },

      // ✅ Check authenticated user
      fetchUser: async () => {
  const state = get();

  set({ loading: true, error: null });

  try {
    const res = await API.get("/auth/check-auth", {
      withCredentials: true,
    });

    const userData = res.data?.user;

    set({
      loading: false,
      user: userData,
      isAuthenticated: !!userData,
    });

    return userData;
  } catch (err) {
    console.log("❌ Auth check failed:", err.response?.data || err.message);

    // ✅ Only show toast if user was authenticated before
    if (state.isAuthenticated) {
      toast.error("You are not authorized, please log in again");
    }

    set({
      loading: false,
      user: null,
      isAuthenticated: false,
      error: err.response?.data?.message || "Authentication failed",
    });

    return null;
  }
},


      // ✅ Helper method to check if user is logged in
      checkAuth: () => {
        const state = get();
        return state.isAuthenticated && !!state.user;
      },

      // ✅ Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
