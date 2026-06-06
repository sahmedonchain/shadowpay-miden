import { useState } from "react";
import type { Role } from "../lib/role";

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
      { q: "Does ShadowPay ever access my payroll data?", a: "No. ShadowPay is non-custodial. Proofs are generated client-side in your browser. Your salary data never leaves your device unencrypted, and we have no ability to access your vault, balances, or team information." },
      { q: "Can payroll be audited without revealing individual salaries?", a: "Yes. Miden's ZK proofs let you prove that payroll ran correctly and funds were disbursed as authorized — without disclosing individual amounts. Auditors get cryptographic proof of validity, not a spreadsheet of salaries." },
    ],
  },
  {
    category: "Technical",
    items: [
      { q: "How does the zero-knowledge proof work?", a: "When you trigger payroll, Miden's STARK-based prover runs client-side and generates a cryptographic proof that all disbursements are valid — correct amounts, authorized recipients, sufficient vault balance — without revealing any underlying data." },
      { q: "Why Miden and not another chain?", a: "Miden is built for privacy at the protocol level — not as a layer on top. Its client-side proving model and shielded note system make it uniquely suited for payroll: each recipient's claim is a private note only they can read." },
    ],
  },
  {
    category: "Business",
    items: [
      { q: "Can I pay contractors and freelancers too?", a: "Yes. Anyone with a Miden-compatible wallet address can be added to your team. There's no distinction between full-time employees, part-time contractors, or one-off freelancers — they all receive and claim the same way." },
      { q: "Is there a minimum team size or free tier?", a: "No minimum. You can run payroll for a single person or 500 people with the same interface. During testnet, ShadowPay is free to use — connect your wallet and get started immediately." },
      { q: "Does treasury stay under my control at all times?", a: "Always. Your vault is a smart contract you control. ShadowPay never holds or has access to your funds. You can withdraw at any time — no lock-ups, no approvals needed from us." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800/50 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left gap-4">
        <span className="text-sm text-white font-medium">{q}</span>
        <span className={`text-zinc-500 text-xl shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="mt-3 text-sm text-zinc-500 leading-relaxed pr-8">{a}</p>}
    </div>
  );
}

export function LandingPage({ onEnter }: { onEnter: (role: Role) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-bold text-white text-base">ShadowPay</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
            <a href="#miden" className="hover:text-white transition">Privacy</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onEnter("employee")} className="text-sm text-zinc-400 hover:text-white transition px-4 py-2">Sign In</button>
            <button onClick={() => onEnter("employer")} className="text-sm bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-5 py-2 rounded-lg font-medium shadow-lg shadow-orange-500/20">
              Launch App
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-zinc-400 text-xl">
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50 px-6 py-4 space-y-2 bg-[#0a0a0c]">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 py-2">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 py-2">How it Works</a>
            <a href="#miden" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 py-2">Privacy</a>
            <button onClick={() => onEnter("employee")} className="w-full text-sm text-zinc-400 border border-zinc-700 rounded-lg px-4 py-2.5 mt-2">Sign In as Employee</button>
            <button onClick={() => onEnter("employer")} className="w-full text-sm bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg px-4 py-2.5 font-medium mt-1">Launch as Employer</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-orange-500/10 via-red-600/5 to-transparent rounded-full blur-[80px]"></div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,165,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.3) 1px, transparent 1px)", backgroundSize: "80px 80px" }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            LIVE ON MIDEN TESTNET — SDK V0.14
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Private Payroll,<br />Built on{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Miden</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The first payroll system built on Miden's zero-knowledge blockchain. Fund your vault, add your team, run payroll, and let them claim. Nothing exposed on-chain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button onClick={() => onEnter("employer")} className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-medium text-sm shadow-xl shadow-orange-500/25">
              Launch App
            </button>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/50 text-white rounded-xl font-medium text-sm">
              See How It Works
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5"><span className="text-orange-400">✓</span> No on-chain salary exposure</span>
            <span className="flex items-center gap-1.5"><span className="text-orange-400">✓</span> Treasury balance stays private</span>
            <span className="flex items-center gap-1.5"><span className="text-orange-400">✓</span> ZK proofs on every payment</span>
            <span className="flex items-center gap-1.5"><span className="text-orange-400">✓</span> Any team size</span>
          </div>
        </div>

        {/* MOCK TERMINAL */}
        <div className="relative z-10 mt-8 w-full max-w-2xl mx-auto px-2">
          <div className="bg-zinc-900/90 border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              <span className="ml-2 text-xs text-zinc-600 font-mono">shadowpay-payroll — Block #491,827</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
            <div className="p-5 font-mono text-xs space-y-0">
              {[
                { label: "Initiating payroll batch", value: "processing...", orange: true },
                { label: "Recipients", value: "██ shielded wallets" },
                { label: "Total Disbursed", value: "████ MIDEN" },
                { label: "Treasury Balance", value: "██████" },
                { label: "ZK Proof", value: "Verified ✓", green: true },
                { label: "Solvency Proof", value: "Confirmed ✓", green: true },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-zinc-800/50 last:border-0">
                  <span className="text-zinc-500">{row.label}</span>
                  <span className={row.green ? "text-green-400" : row.orange ? "text-orange-400" : "text-zinc-700"}>{row.value}</span>
                </div>
              ))}
              <div className="mt-3 p-3 bg-green-950/40 border border-green-800/30 rounded-lg">
                <p className="text-green-400">✓ Payroll complete — no salary data exposed on-chain</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="relative z-10 mt-6 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          {[
            { label: "POWERED BY MIDEN", value: "ZK Rollup" },
            { label: "ZERO-KNOWLEDGE", value: "Client-side Proving" },
            { label: "ON-CHAIN SALARY EXPOSURE", value: "None", green: true },
            { label: "IN YOUR CONTROL", value: "Any time" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900/50 border border-zinc-800/30 rounded-xl p-3 space-y-1">
              <p className="text-[9px] text-zinc-600 uppercase tracking-wider">{s.label}</p>
              <p className={`text-xs font-semibold ${s.green ? "text-green-400" : "text-zinc-300"}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-bold">Four steps.<br />Zero exposure.</h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">Everything runs on Miden's zero-knowledge infrastructure. Your salary data never touches a public ledger.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: "01", icon: "◈", label: "VAULT", title: "Fund Your Private Treasury", desc: "Deposit assets into your shielded treasury. The balance is encrypted — only you can see it, but it's cryptographically verifiable." },
              { num: "02", icon: "◎", label: "TEAM", title: "Add Your Team", desc: "Add team members by their Miden wallet address and set their salary in full privacy. No names or amounts go on-chain." },
              { num: "03", icon: "◆", label: "PAYROLL", title: "Run Payroll", desc: "Trigger payroll and generate ZK proofs that lock disbursements to each recipient wallet without revealing amounts on-chain." },
              { num: "04", icon: "◉", label: "CLAIM", title: "Team Claims Privately", desc: "Each team member claims their payment privately. Only they can claim — and only they received the exact amount disbursed." },
            ].map((step) => (
              <div key={step.num} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-5 space-y-3 hover:border-zinc-700/50 transition">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-xs font-bold">{step.num}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider">{step.label}</span>
                </div>
                <div className="text-2xl text-orange-400/60">{step.icon}</div>
                <h3 className="font-semibold text-white text-sm">{step.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR PRIVACY */}
      <section className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">ZERO-KNOWLEDGE PAYROLL</p>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">Built for privacy. Designed for every team.</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                From a 2-person DAO to a 500-person company, ShadowPay gives you payroll that runs correctly and privately — not needing a single salary to appear on a public chain.
              </p>
              <button onClick={() => onEnter("employer")} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-medium text-sm shadow-lg shadow-orange-500/20">
                Launch App
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "🔐", title: "Private Vault", desc: "Treasury balance shielded using Miden's ZK proofs — only you can see the balance or trigger withdrawals." },
                { icon: "◎", title: "Team Management", desc: "Add members at any time. Wallet addresses and salary info encrypted — not readable without your keys." },
                { icon: "⚡", title: "One-click Payroll", desc: "Run payroll for your entire team in a single ZK transaction. Miden's cryptography does the heavy lifting." },
                { icon: "📋", title: "Private Claim Flow", desc: "Team members claim their own payments privately. Only they can unlock their share using wallet credentials." },
                { icon: "✓", title: "Proof of Solvency", desc: "Prove you can cover payroll without revealing your actual balance — cryptographic proofs, not screenshots." },
                { icon: "◆", title: "ZK-Native on Miden", desc: "Not a privacy wrapper. Built natively on Miden where private state and ZK proofs are first-class." },
              ].map((f) => (
                <div key={f.title} className="bg-zinc-900/50 border border-zinc-800/40 rounded-xl p-4 space-y-2 hover:border-zinc-700/50 transition">
                  <span className="text-lg">{f.icon}</span>
                  <h4 className="text-xs font-semibold text-white">{f.title}</h4>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">CORE FEATURES</p>
            <h2 className="text-xl md:text-3xl font-bold">Built for privacy.<br />Trusted by teams.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: "🛡", title: "Shielded Salary Disbursement", desc: "Employee compensation encrypted at circuit level. Amounts and addresses never broadcast on-chain in plaintext.", tag: "ZK-native" },
              { icon: "◈", title: "Private Treasury Vault", desc: "Treasury balance cryptographically sealed. Publicly auditable for solvency, but opaque to competitors.", tag: "Miden STARK" },
              { icon: "⟳", title: "One-click Payroll", desc: "Run payroll for your entire team in a single ZK transaction. No repeated manual proofs required.", tag: "Automated" },
              { icon: "📋", title: "Compliance Audit Logs", desc: "Generate verifiable payroll reports with selective disclosure. Prove what you paid without revealing individual amounts.", tag: "Selective Disclosure" },
              { icon: "🔐", title: "Multi-Signatory Treasury", desc: "Require M-of-N approvals for treasury operations. All signatures verified inside the ZK circuit.", tag: "Multisig" },
              { icon: "⚡", title: "Real-Time Solvency Proofs", desc: "Any stakeholder can verify treasury solvency on-demand, without learning the actual balance.", tag: "On-demand" },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-5 space-y-3 hover:border-orange-900/30 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border bg-orange-500/10 border-orange-500/20 text-orange-400 font-medium">{f.tag}</span>
                </div>
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-4xl font-bold">Questions we get asked. Answers you can trust.</h2>
          </div>
          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">{section.category}</p>
                <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl px-5 divide-y divide-zinc-800/40">
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
      <section id="miden" className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-orange-950/20 via-zinc-900/40 to-zinc-950 border border-orange-900/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Built on Miden</h3>
                  <p className="text-zinc-500 text-xs">Zero-knowledge blockchain</p>
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">Pay your team.<br />Show the chain nothing.</h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                ShadowPay is live on Miden Testnet. Connect your wallet, run real payroll flows, and experience what private onchain payments actually feel like.
              </p>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { label: "Private Notes", desc: "Payroll as ZK notes on Miden — not public transactions visible to chain explorers" },
                  { label: "Client-side Proving", desc: "ZK proofs generated locally in your browser before network submission" },
                  { label: "Mainnet Ready", desc: "Built for Miden mainnet. SDK v0.14 fully integrated and live on testnet now" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-orange-500/30 pl-4 space-y-1">
                    <p className="text-orange-300 text-sm font-semibold">{item.label}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <a href="https://miden.xyz" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">miden.xyz ↗</a>
                <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">docs.miden.xyz ↗</a>
                <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-orange-400 transition">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">GET STARTED</p>
          <h2 className="text-xl md:text-3xl font-bold">Pay your team. Show the chain nothing.</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            ShadowPay is live on Miden Testnet. Connect your wallet and run real payroll flows today — no lock-ups, no approvals, no exposed salaries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => onEnter("employer")} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white rounded-xl font-medium text-sm shadow-xl shadow-orange-500/20">
              Launch App
            </button>
            <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 border border-zinc-700 hover:bg-zinc-900 text-white rounded-xl font-medium text-sm text-center transition">
              Read the Miden Docs
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
            <span className="text-sm text-zinc-500">ShadowPay</span>
            <span className="text-zinc-700 text-xs">· © 2025 ShadowPay. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-zinc-600">
            <a href="#features" className="hover:text-zinc-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-400 transition">Team</a>
            <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition">GitHub</a>
            <a href="https://miden.xyz" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition">Built on Miden</a>
          </div>
        </div>
      </footer>

    </div>
  );
}