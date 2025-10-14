// app/dashboard/page.js (or page.jsx)
import ProtectedUser from "@/components/ProtectedUser";
import UserDashboard from "@/components/UserDashboard";

export default function DashboardPage() {
  
  return (
    <ProtectedUser>
      <UserDashboard />
    </ProtectedUser>
  );
}