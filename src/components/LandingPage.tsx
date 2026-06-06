import { useState } from "react";
import type { Role } from "@/lib/role";

const faqs = [
  {
    category: "General",
    items: [
      { q: "What is ShadowPay?", a: "ShadowPay is a non-custodial payroll dApp built natively on the Miden blockchain. It lets companies and DAOs run payroll — fund a vault, add team members, trigger payments, and let them claim — without exposing any salary data or wallet addresses on-chain." },
      { q: "Is it live or still in testnet?", a: "ShadowPay is live on Miden Testnet (SDK v0.14). You can connect your wallet and run real payroll flows today. Mainnet deployment follows Miden's own mainnet timeline." },
      { q: "Who is ShadowPay for?", a: "Any team that pays people on-chain — from a 2-person DAO to a 500-person protocol company. If you need to run payroll without your competitors, vendors, or the public seeing wallet addresses and amounts, ShadowPay is built for you." },
    ],
  },
  {
    category: "Privacy",
    items: [
      { q: "Can anyone see salary data on-chain?", a: "No. Salary amounts, recipient wallet addresses, and treasury balances are all shielded using Miden's zero-knowledge proofs. A block explorer sees that a valid payroll transaction occurred — nothing more." },
      { q: "Does ShadowPay ever access my payroll data?", a: "No. ShadowPay is non-custodial. Proofs are generated client-side in your browser. Your salary data never leaves your device unencrypted." },
      { q: "Can payroll be audited without revealing individual salaries?", a: "Yes. Miden's ZK proofs let you prove that payroll ran correctly and funds were disbursed as authorized — without disclosing individual amounts." },
    ],
  },
  {
    category: "Technical",
    items: [
      { q: "How does the zero-knowledge proof work?", a: "When you trigger payroll, Miden's STARK-based prover runs client-side and generates a cryptographic proof that all disbursements are valid — without revealing any underlying data." },
      { q: "Why Miden and not another chain?", a: "Miden is built for privacy at the protocol level. Its client-side proving model and shielded note system make it uniquely suited for payroll: each recipient's claim is a private note only they can read." },
    ],
  },
  {
    category: "Business",
    items: [
      { q: "Can I pay contractors and freelancers too?", a: "Yes. Anyone with a Miden-compatible wallet address can be added to your team. There's no distinction between full-time employees, part-time contractors, or one-off freelancers." },
      { q: "Is there a minimum team size or free tier?", a: "No minimum. You can run payroll for a single person or 500 people with the same interface. During testnet, ShadowPay is free to use." },
      { q: "Does treasury stay under my control at all times?", a: "Always. Your vault is a smart contract you control. ShadowPay never holds or has access to your funds. You can withdraw at any time." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800/50 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between text-left gap-3">
        <span className="text-sm text-white font-medium leading-snug">{q}</span>
        <span className={`text-zinc-500 text-lg shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{a}</p>}
    </div>
  );
}

export function LandingPage({ onEnter }: { onEnter: (role: Role) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-md border-b border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-bold text-white text-base">ShadowPay</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
            <a href="#miden" className="hover:text-white transition">Privacy</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onEnter("employer")} className="text-sm bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-5 py-2 rounded-lg font-medium">
              Launch App
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-300">
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50 px-4 py-4 space-y-1 bg-[#0a0a0c]">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg">How it Works</a>
            <a href="#miden" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg">Privacy</a>
            <div className="pt-2">
              <button onClick={() => onEnter("employer")} className="w-full text-sm bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl px-4 py-3.5 font-medium">
                Launch App
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-orange-500/10 via-red-600/5 to-transparent rounded-full blur-[80px]"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,165,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shrink-0"></span>
            LIVE ON MIDEN TESTNET — SDK V0.14
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight">
            Private Payroll,<br />Built on{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Miden</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Fund your vault, add your team, run payroll, and let them claim. Nothing exposed on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button onClick={() => onEnter("employer")} className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-semibold text-sm shadow-xl shadow-orange-500/20">
              Launch App →
            </button>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl font-medium text-sm">
              See How It Works
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 text-xs text-zinc-600">
            {["No on-chain salary exposure", "Treasury stays private", "ZK proofs on every payment", "Any team size"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-orange-500">✓</span>{t}
              </span>
            ))}
          </div>
        </div>

        {/* TERMINAL */}
        <div className="relative z-10 mt-10 w-full max-w-lg mx-auto px-0">
          <div className="bg-zinc-900/90 border border-zinc-700/40 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-950/60">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
              <span className="ml-2 text-[10px] text-zinc-600 font-mono truncate">shadowpay · Block #491,827</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0"></div>
            </div>
            <div className="p-4 font-mono text-[11px] divide-y divide-zinc-800/40">
              {[
                { label: "Recipients", value: "██ shielded wallets" },
                { label: "Total Disbursed", value: "████ MIDEN" },
                { label: "Treasury Balance", value: "██████" },
                { label: "ZK Proof", value: "Verified ✓", green: true },
                { label: "Solvency Proof", value: "Confirmed ✓", green: true },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2">
                  <span className="text-zinc-500">{row.label}</span>
                  <span className={row.green ? "text-green-400" : "text-zinc-600"}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <div className="p-3 bg-green-950/40 border border-green-800/30 rounded-lg">
                <p className="text-green-400 text-[11px] font-mono">✓ Payroll complete — no salary data exposed</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative z-10 mt-6 w-full max-w-lg mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 px-0">
          {[
            { label: "NETWORK", value: "Miden Testnet", orange: true },
            { label: "PROOF SYSTEM", value: "ZK Rollup" },
            { label: "SALARY EXPOSURE", value: "None", green: true },
            { label: "CONTROL", value: "Always yours" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900/60 border border-zinc-800/30 rounded-xl p-3 text-center">
              <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-[11px] font-semibold leading-tight ${s.green ? "text-green-400" : s.orange ? "text-orange-300" : "text-zinc-300"}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">HOW IT WORKS</p>
            <h2 className="text-2xl md:text-4xl font-bold">Four steps.<br className="md:hidden" /> Zero exposure.</h2>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">Everything runs on Miden's ZK infrastructure. Your salary data never touches a public ledger.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: "01", icon: "◈", label: "VAULT", title: "Fund Treasury", desc: "Deposit into your shielded vault. Balance encrypted — only you can see it." },
              { num: "02", icon: "◎", label: "TEAM", title: "Add Your Team", desc: "Add members by Miden wallet. Salary info stays fully private." },
              { num: "03", icon: "◆", label: "PAYROLL", title: "Run Payroll", desc: "Generate ZK proofs locking payments to each wallet — no amounts on-chain." },
              { num: "04", icon: "◉", label: "CLAIM", title: "Team Claims", desc: "Each member claims privately. Only they can unlock their share." },
            ].map((step) => (
              <div key={step.num} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-[10px] font-bold">{step.num}</span>
                  </div>
                  <span className="text-[9px] text-zinc-600 font-semibold uppercase tracking-wider">{step.label}</span>
                </div>
                <div className="text-xl text-orange-400/50">{step.icon}</div>
                <h3 className="font-semibold text-white text-xs sm:text-sm">{step.title}</h3>
                <p className="text-zinc-500 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR PRIVACY */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">ZERO-KNOWLEDGE PAYROLL</p>
            <h2 className="text-2xl md:text-4xl font-bold">Built for privacy.<br />Designed for every team.</h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg mx-auto md:mx-0">
              From a 2-person DAO to a 500-person company — run payroll privately, without a single salary appearing on a public chain.
            </p>
            <button onClick={() => onEnter("employer")} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-medium text-sm shadow-lg shadow-orange-500/20">
              Launch App
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "🔐", title: "Private Vault", desc: "Treasury shielded using ZK proofs — only you see the balance." },
              { icon: "◎", title: "Team Management", desc: "Wallet addresses and salaries encrypted — not readable without your keys." },
              { icon: "⚡", title: "One-click Payroll", desc: "Run payroll for your entire team in a single ZK transaction." },
              { icon: "📋", title: "Private Claims", desc: "Team members claim privately using their wallet credentials." },
              { icon: "✓", title: "Solvency Proofs", desc: "Prove you can cover payroll without revealing actual balance." },
              { icon: "◆", title: "ZK-Native", desc: "Built natively on Miden — not a privacy wrapper on a public chain." },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900/50 border border-zinc-800/40 rounded-xl p-4 space-y-2">
                <span className="text-lg">{f.icon}</span>
                <h4 className="text-xs font-semibold text-white">{f.title}</h4>
                <p className="text-[11px] text-zinc-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">CORE FEATURES</p>
            <h2 className="text-2xl md:text-3xl font-bold">Built for privacy.<br />Trusted by teams.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "🛡", title: "Shielded Salary", desc: "Compensation encrypted at circuit level. Amounts and addresses never broadcast in plaintext.", tag: "ZK-native" },
              { icon: "◈", title: "Private Treasury", desc: "Treasury cryptographically sealed. Auditable for solvency, opaque to competitors.", tag: "Miden STARK" },
              { icon: "⟳", title: "One-click Payroll", desc: "Run payroll in a single ZK transaction. No manual proofs required.", tag: "Automated" },
              { icon: "📋", title: "Audit Logs", desc: "Verifiable payroll reports with selective disclosure. Prove what you paid without revealing amounts.", tag: "Selective" },
              { icon: "🔐", title: "Multi-sig Treasury", desc: "Require M-of-N approvals. All signatures verified inside ZK circuit.", tag: "Multisig" },
              { icon: "⚡", title: "Solvency Proofs", desc: "Verify treasury solvency on-demand without revealing the actual balance.", tag: "On-demand" },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium">{f.tag}</span>
                </div>
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">Questions we get asked.<br />Answers you can trust.</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((section) => (
              <div key={section.category}>
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">{section.category}</p>
                <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl px-4 divide-y divide-zinc-800/40">
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIDEN */}
      <section id="miden" className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-orange-950/20 via-zinc-900/40 to-zinc-950 border border-orange-900/20 rounded-2xl p-6 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-orange-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <span className="text-orange-400 font-bold text-sm">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Built on Miden</h3>
                  <p className="text-zinc-500 text-xs">Zero-knowledge blockchain</p>
                </div>
              </div>
              <h2 className="text-xl md:text-3xl font-bold">Pay your team.<br />Show the chain nothing.</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ShadowPay is live on Miden Testnet. Connect your wallet, run real payroll flows, and experience truly private onchain payments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Private Notes", desc: "Payroll as ZK notes — not public transactions visible to explorers" },
                  { label: "Client-side Proving", desc: "ZK proofs generated locally in your browser" },
                  { label: "Mainnet Ready", desc: "SDK v0.14 integrated and live on testnet now" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-orange-500/30 pl-3 space-y-1">
                    <p className="text-orange-300 text-xs font-semibold">{item.label}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://miden.xyz" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">miden.xyz ↗</a>
                <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">docs.miden.xyz ↗</a>
                <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-lg mx-auto text-center space-y-5">
          <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">GET STARTED</p>
          <h2 className="text-2xl md:text-4xl font-bold">Pay your team.<br />Show the chain nothing.</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Connect your Miden Wallet and run real private payroll on testnet today — free, no lock-ups.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => onEnter("employer")} className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-semibold text-sm shadow-xl shadow-orange-500/20">
              Launch App
            </button>
            <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 rounded-xl font-medium text-sm text-center transition">
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
            <span className="text-sm text-zinc-500">ShadowPay</span>
            <span className="text-zinc-700 text-xs">· © 2025 All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
            <a href="#features" className="hover:text-zinc-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-400 transition">How it Works</a>
            <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition">GitHub</a>
            <a href="https://miden.xyz" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition">Miden</a>
          </div>
        </div>
      </footer>

    </div>
  );
}