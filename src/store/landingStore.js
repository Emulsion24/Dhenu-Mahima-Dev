import { create } from "zustand";
import API from "@/lib/api"; 
export const useLandingStore = create((set) => ({

 getBanners : async () => {
  const { data } = await API.get("/banners");
if (!Array.isArray(data)) {
  console.error("Expected an array from backend, got:", data);
 // prevent runtime errors
} else {
 return data;
}
  
},

getMessage: async()=>{
    const res=await API.get("/quote");
    console.log(res.data)
    return res.data;
}

}));