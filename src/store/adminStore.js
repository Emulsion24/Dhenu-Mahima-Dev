import { create } from "zustand";
import API from "@/lib/api"; 
export const useAdminStore = create((set) => ({

uploadBanner: async (formData) => {
    console.log(formData)
  const { data } = await API.post("/admin/banners/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
},

// 🗑️ Delete banner
 deleteBanner: async (id) => {
  const  data = await API.delete(`/admin/delete-banner/${id}`);
  return data;
},

uploadMessage:async(info)=>{
const{data}=await API.post("/admin/message/upload",{info});
return data;
},
 deleteMessage: async (id) => {
  const { data } = await API.delete(`/admin/delete-message/${id}`);
  return data;
},
getMessage:async()=>{
    const res=await API.get("/admin/message");
    return res.data;
},
updateBannerOrder:async (banners) => {
  const orderList = banners.map((b, index) => ({
    id: b.id,
    order: index + 1,
  }));
  
  try {
    await API.put("/admin/banners/reorder", { orderList });
  } catch (err) {
    console.error("Failed to update order:", err);
  }
},


}));