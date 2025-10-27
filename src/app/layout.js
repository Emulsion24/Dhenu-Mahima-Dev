
import "./globals.css";
import { Suspense } from "react";

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
     

    
     
      </body>
          <Suspense/>  
    </html>

  );
}
