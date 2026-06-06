export type Role = "employer" | "employee";

export const roleStore = {
  get(): Role | null {
    if (typeof window === "undefined") return null;
    return (localStorage.getItem("shadowpay-role") as Role) || null;
  },
  set(role: Role) {
    if (typeof window !== "undefined") {
      localStorage.setItem("shadowpay-role", role);
    }
  },
  clear() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shadowpay-role");
      localStorage.removeItem("shadowpay-employer-auth");
    }
  },
};

export const employerAuth = {
  getPin(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("shadowpay-employer-pin");
  },
  setPin(pin: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("shadowpay-employer-pin", pin);
    }
  },
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("shadowpay-employer-auth") === "true";
  },
  setAuthenticated() {
    if (typeof window !== "undefined") {
      localStorage.setItem("shadowpay-employer-auth", "true");
    }
  },
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shadowpay-employer-auth");
    }
  },
};