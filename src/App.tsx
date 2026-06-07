import { useState, useEffect } from "react";
import { AppProviders } from "./providers";
import { ShadowPayApp } from "./components/ShadowPayApp";
import { LandingPage } from "./components/LandingPage";
import { roleStore, employerAuth } from "@/lib/role";
import type { Role } from "@/lib/role";

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [pendingRole, setPendingRole] = useState<Role | null>(null);

  useEffect(() => {
    // Already logged in check
    const saved = roleStore.get();
    if (saved === "employer" && employerAuth.isAuthenticated()) {
      setShowApp(true);
    } else if (saved === "employee") {
      setShowApp(true);
    } else {
      roleStore.clear();
    }
  }, []);

  const handleLandingEnter = (role: Role) => {
    if (role === "employee") {
      roleStore.set("employee");
    }
    setPendingRole(role);
    setShowApp(true);
  };

  // Landing page — no wallet needed
  if (!showApp) {
    return <LandingPage onEnter={handleLandingEnter} />;
  }

  // App — wallet + Miden SDK
  return (
    <AppProviders>
      <ShadowPayApp pendingRole={pendingRole} />
    </AppProviders>
  );
}