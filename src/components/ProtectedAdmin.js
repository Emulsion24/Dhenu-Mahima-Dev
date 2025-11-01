"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function ProtectedAdmin({ children }) {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false); // ✅ track if auth check is done

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await API.get("/auth/check-auth", {
          withCredentials: true,
        });

        if (!isMounted) return;

        if (res.status === 200) {
          const userData = res.data.user;
          setUser(userData);

          // Redirect only if role is not allowed
          if (userData.role === "admin" || userData.role === "subadmin") {
            // allowed
          } else {
            router.replace("/"); // redirect unauthorized users
          }
        }
      } catch (error) {
        console.log("Auth error:", error.response?.status || error.message);
        if (!isMounted) return;

        setUser(null);
        router.replace("/login");
      } finally {
        if (isMounted) setLoading(false);
        setAuthChecked(true); // ✅ mark auth check done
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router, setUser]);

  // Show loader while checking auth
 if (loading || !authChecked) {

   return (

    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-move overflow-hidden">
      {/* Soft glowing backdrop */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Loader container */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          {/* Spinning gradient ring behind logo */}
          <div className="absolute w-56 h-56 rounded-full border-8 border-t-transparent border-white/70 border-l-orange-300 border-r-yellow-300 animate-spin-slow"></div>

          {/* Static logo image */}
          <img
            src="/logo/logo5.webp" // replace with your actual logo path
            alt="Dhenu Mahima Logo"
            className="w-40 h-40 rounded-full relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Text */}
        <h1 className="text-white text-4xl font-bold mt-8 drop-shadow-lg tracking-wide animate-pulse">
          Dhenu Mahima
        </h1>
      </div>
    </div>
  );
  }
  // After auth check, only render children if user role is admin/subadmin
  if (user && (user.role === "admin" || user.role === "subadmin")) {
    return <>{children}</>;
  }

  // fallback
  return null;
}
