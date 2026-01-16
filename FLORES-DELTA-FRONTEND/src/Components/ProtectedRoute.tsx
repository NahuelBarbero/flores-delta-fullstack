import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import { MobileBottomNav } from "@/Components/navigation/MobileBottomNav";
import { SplashScreen } from "@/Components/SplashScreen";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  // Show splash once per session after login
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem('floresdelta_splash_shown');
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('floresdelta_splash_shown', 'true');
    setShowSplash(false);
  };

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show splash screen after login (once per session)
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      {/* Main content with bottom padding for mobile nav */}
      <div className="pb-16 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile bottom navigation - only visible on small screens */}
      <MobileBottomNav />
    </>
  );
}
