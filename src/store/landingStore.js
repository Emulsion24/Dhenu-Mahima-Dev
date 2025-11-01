import { create } from "zustand";
import API from "@/lib/api";

export const useLandingStore = create((set) => ({
  banners: [],
  message: null,
  loading: true,
  error: null,

  // ✅ Fetch banners safely
  getBanners: async () => {
    try {
      const { data } = await API.get("/banners");
      if (!Array.isArray(data)) {
        console.error("Expected an array from backend, got:", data);
        throw new Error("Invalid banner data format");
      }
      set({ banners: data });
      return data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      set({ error });
      return [];
    }
  },

  // ✅ Fetch message safely
  getMessage: async () => {
    try {
      const res = await API.get("/quote");
      set({ message: res.data });
      return res.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      set({ error });
      return null;
    }
  },

  // ✅ Load all landing page data before rendering main UI
  loadLandingData: async () => {
    set({ loading: true, error: null });
    try {
      await Promise.all([
        useLandingStore.getState().getBanners(),
        useLandingStore.getState().getMessage(),
      ]);
    } catch (error) {
      console.error("Error loading landing data:", error);
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
}));
