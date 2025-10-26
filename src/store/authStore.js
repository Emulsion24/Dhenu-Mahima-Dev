// lib/userStore.js
import { create } from "zustand";
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
          const { user, token } = res.data;
          
          set({ 
            loading: false,
            user,
            token,
            isAuthenticated: true
          });
          
          return res.data;
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
          const { user, token } = res.data;
          
          set({ 
            loading: false, 
            user,
            token,
            isAuthenticated: true,
            error: null
          });
          
          return res.data;
        } catch (err) {
          set({ 
            loading: false, 
            error: err.response?.data?.message || err.message,
            user: null,
            token: null,
            isAuthenticated: false
          });
          throw err;
        }
      },

      // ✅ Logout
      logout: async () => {
        try {
          await API.post("/auth/logout");
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            error: null 
          });
          
          // Clear localStorage
          localStorage.removeItem('auth-storage');
        }
      },

      // ✅ Forgot password (send reset link via email)
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await API.post("/auth/forgot-password", { email });
          set({ loading: false });
          return res.data;
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
          return res.data;
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
      name: 'auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);