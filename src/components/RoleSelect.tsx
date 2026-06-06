import { useState } from "react";
import type { Role } from "@/lib/role";
import { employerAuth } from "@/lib/role";

type Step = "select" | "employer-pin-setup" | "employer-pin-login";

export function RoleSelect({ onSelect }: { onSelect: (role: Role) => void }) {
  const [step, setStep] = useState<Step>("select");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const hasPin = !!employerAuth.getPin();

  const handleEmployerClick = () => {
    if (hasPin) {
      setStep("employer-pin-login");
    } else {
      setStep("employer-pin-setup");
    }
    setPin(""); setConfirmPin(""); setError("");
  };

  const handleSetupPin = () => {
    if (pin.length < 4) return setError("PIN must be at least 4 digits");
    if (pin !== confirmPin) return setError("PINs do not match");
    employerAuth.setPin(pin);
    employerAuth.setAuthenticated();
    onSelect("employer");
  };

  const handleLoginPin = () => {
    if (pin !== employerAuth.getPin()) {
      setError("Incorrect PIN");
      setPin("");
      return;
    }
    employerAuth.setAuthenticated();
    onSelect("employer");
  };

  if (step === "employer-pin-setup") return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-5">
        <button onClick={() => setStep("select")} className="text-zinc-600 hover:text-zinc-400 text-sm flex items-center gap-1 transition">
          ← Back
        </button>
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl">🔐</span>
          </div>
          <h2 className="text-xl font-bold text-white">Set Employer PIN</h2>
          <p className="text-zinc-500 text-sm">Create a PIN to secure employer access</p>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={8}
            placeholder="Create PIN (min 4 digits)"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(""); }}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 text-center tracking-widest"
          />
          <input
            type="password"
            inputMode="numeric"
            maxLength={8}
            placeholder="Confirm PIN"
            value={confirmPin}
            onChange={(e) => { setConfirmPin(e.target.value); setError(""); }}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 text-center tracking-widest"
            onKeyDown={(e) => e.key === "Enter" && handleSetupPin()}
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            onClick={handleSetupPin}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition"
          >
            Set PIN & Continue
          </button>
        </div>
      </div>
    </div>
  );

  if (step === "employer-pin-login") return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-5">
        <button onClick={() => setStep("select")} className="text-zinc-600 hover:text-zinc-400 text-sm flex items-center gap-1 transition">
          ← Back
        </button>
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl">🔐</span>
          </div>
          <h2 className="text-xl font-bold text-white">Employer Login</h2>
          <p className="text-zinc-500 text-sm">Enter your PIN to access employer dashboard</p>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={8}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleLoginPin()}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 text-center tracking-widest"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            onClick={handleLoginPin}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white">ShadowPay</h1>
          <p className="text-zinc-500 text-sm">Private payroll on Miden Testnet</p>
        </div>

        <div className="space-y-3">
          <p className="text-zinc-400 text-sm text-center">Select your role to continue</p>

          <button
            onClick={handleEmployerClick}
            className="w-full bg-zinc-900 border border-zinc-800 hover:border-violet-600/50 rounded-xl p-5 text-left transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-600/30 flex items-center justify-center shrink-0 group-hover:bg-violet-600/30 transition">
                <span className="text-violet-400 text-lg">◆</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold">Employer / Admin</p>
                  {hasPin && <span className="text-[10px] text-zinc-600">🔐 PIN protected</span>}
                </div>
                <p className="text-zinc-500 text-sm mt-0.5">Manage treasury, team, create and approve payroll</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect("employee")}
            className="w-full bg-zinc-900 border border-zinc-800 hover:border-green-600/50 rounded-xl p-5 text-left transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 border border-green-600/30 flex items-center justify-center shrink-0 group-hover:bg-green-600/30 transition">
                <span className="text-green-400 text-lg">◉</span>
              </div>
              <div>
                <p className="text-white font-semibold">Employee</p>
                <p className="text-zinc-500 text-sm mt-0.5">View and claim your approved salary payments</p>
              </div>
            </div>
          </button>
        </div>

        <p className="text-zinc-700 text-xs text-center">Powered by Miden ZK technology</p>
      </div>
    </div>
  );
}