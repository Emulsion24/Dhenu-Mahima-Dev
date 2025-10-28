
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Dhenu Mahima",
  description: "Admin Dashboard & Landing Page for Dhenu Mahima",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en">
        <Suspense fallback={<div className="text-center mt-10">Loading status...</div>}></Suspense>
      <head />
      
      <body className="antialiased">
   


       
      {children}
     <Toaster
  position="top-center"
  toastOptions={{
    className: '',
    style: {
      background: "linear-gradient(to right, #f97316, #fbbf24, #fde68a)",
      color: "black",
      fontWeight: "600",
      borderRadius: "10px",
      padding: "12px 20px",
      boxShadow: "0px 4px 15px rgba(249, 115, 22, 0.3)",
    },
  }}
/>

    
     
      </body>
          <Suspense/>  
    </html>

  );
}
