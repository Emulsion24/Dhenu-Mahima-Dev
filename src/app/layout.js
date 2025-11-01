import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Dhenu Mahima – Nurturing the Sacred Bond with Cows",
  description:
    "Dhenu Mahima is dedicated to promoting the spiritual, cultural, and environmental significance of cows in Indian tradition. Learn, contribute, and join our mission to protect and serve Gau Mata.",
  keywords: [
    "Dhenu Mahima",
    "Gau Seva",
    "Cow Protection",
    "Gau Mata",
    "Indian Tradition",
    "Spiritual Organization",
  ],
  openGraph: {
    title: "Dhenu Mahima – Nurturing the Sacred Bond with Cows",
    description:
      "Join Dhenu Mahima in preserving the cultural and spiritual importance of cows through seva and awareness.",
    url: "https://www.dhenumahima.com",
    siteName: "Dhenu Mahima",
    images: [
      {
        url: "https://www.dhenumahima.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dhenu Mahima – Gau Seva",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhenu Mahima – Nurturing the Sacred Bond with Cows",
    description:
      "Spreading the message of love, care, and reverence for Gau Mata. Visit Dhenu Mahima to learn more.",
    images: ["https://www.dhenumahima.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.dhenumahima.com/home",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dhenu Mahima" />
      </head>

      <body className="antialiased bg-white text-gray-900">
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          {children}
        </Suspense>

        <Toaster
          position="top-center"
          toastOptions={{
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
    </html>
  );
}
