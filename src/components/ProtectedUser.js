"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Verifying access...</p>
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
