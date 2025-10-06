import "./globals.css";


export const metadata = {
  title: "Dhenu Mahima",
  description: "Admin Dashboard & Landing Page for Dhenu Mahima",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">
   
    

       
        <main>{children}</main>

    
     
      </body>
    </html>
  );
}
