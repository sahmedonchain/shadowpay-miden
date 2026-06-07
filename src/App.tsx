import { useState } from "react";
import { AppProviders } from "./providers";
import { ShadowPayApp } from "./components/ShadowPayApp";
import { LandingPage } from "./components/LandingPage";
import { roleStore, employerAuth } from "@/lib/role";
import type { Role } from "@/lib/role";

export default function App() {
  const [showApp, setShowApp] = useState(() => {
    // Only skip landing if already fully authenticated
    const saved = roleStore.get();
    if (saved === "employer" && employerAuth.isAuthenticated()) return true;
    if (saved === "employee") return true;
    return false;
  });
  const [pendingRole, setPendingRole] = useState<Role | null>(null);

  const handleLandingEnter = (role: Role) => {
    if (role === "employee") {
      roleStore.set("employee");
    }
    setPendingRole(role);
    setShowApp(true);
  };

  if (!showApp) {
    return <LandingPage onEnter={handleLandingEnter} />;
  }

  return (
    <AppProviders>
      <ShadowPayApp pendingRole={pendingRole} />
    </AppProviders>
  );
}