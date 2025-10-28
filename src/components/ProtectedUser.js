"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";
import { Loader2 } from "lucide-react";
export default function ProtectedUser({ children }) {
  const router = useRouter();
  const { user, setUser } = useAuthStore(); // ✅ fixed capitalization
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

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
          setUser(userData); // ✅ fixed

          // Redirect only if role is admin/subadmin
          if (userData.role === "admin" || userData.role === "subadmin") {
            router.replace("/admin");
          }
        }
      } catch (error) {
        console.log("Auth error:", error.response?.status || error.message);
        if (!isMounted) return;

        setUser(null); // ✅ fixed
        router.replace("/login");
      } finally {
        if (isMounted) {
          setLoading(false);
          setAuthChecked(true);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router, setUser]);

  if (loading || !authChecked) {
    return (
   <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-move">
      {/* Glowing ring background */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Main loader */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-md opacity-75 animate-ping"></div>
          <Loader2 className="w-16 h-16 text-white animate-spin relative z-10 drop-shadow-lg" />
        </div>

        <h1 className="text-white text-2xl font-bold mt-6 drop-shadow-lg tracking-wide animate-pulse">
          Preparing Your Experience...
        </h1>
        <p className="text-white/90 mt-2 text-sm font-medium">
          Please wait a moment ✨
        </p>
      </div>
    </div>
    );
  }

  // Only render children if user exists and role is "user"
  if (user && user.role === "user") {
    return <>{children}</>;
  }

  return null;
}
