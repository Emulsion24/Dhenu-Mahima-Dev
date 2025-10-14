"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import API from "@/lib/api";

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
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking admin access...</p>
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
