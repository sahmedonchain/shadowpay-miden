import type { Role } from "@/lib/role";

export function LandingPage({ onEnter }: { onEnter: (role: Role) => void }) {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-bold text-white">ShadowPay</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it works</a>
            <a href="#miden" className="hover:text-white transition">Miden</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEnter("employee")}
              className="text-sm text-zinc-400 hover:text-white transition px-3 py-1.5"
            >
              Employee Login
            </button>
            <button
              onClick={() => onEnter("employer")}
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-lg transition font-medium"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/10 border border-violet-600/20 text-violet-300 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            Live on Miden Testnet · SDK v0.14
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Private Payroll &<br />
            <span className="text-violet-400">Treasury Management</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The first private payroll system built on Miden's zero-knowledge blockchain.
            Pay your team without exposing salaries, wallet addresses, or treasury balances on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onEnter("employer")}
              className="w-full sm:w-auto px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition text-sm"
            >
              Launch as Employer →
            </button>
            <button
              onClick={() => onEnter("employee")}
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl font-medium transition text-sm"
            >
              Login as Employee
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-4">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-violet-400">ZK</p>
              <p className="text-zinc-500 text-xs mt-1">Zero Knowledge</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-zinc-500 text-xs mt-1">Private</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-white">v0.14</p>
              <p className="text-zinc-500 text-xs mt-1">Miden SDK</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-6 space-y-4">
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">The Problem</span>
              <h2 className="text-xl font-bold">Traditional onchain payroll exposes everything</h2>
              <div className="space-y-2.5">
                {[
                  "Anyone can see employee salaries",
                  "Treasury balance is fully public",
                  "Wallet addresses are traceable",
                  "Competitors track your team size",
                  "No financial privacy for your org",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-950/20 border border-green-900/30 rounded-2xl p-6 space-y-4">
              <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">ShadowPay Solution</span>
              <h2 className="text-xl font-bold">Complete privacy by default</h2>
              <div className="space-y-2.5">
                {[
                  "Salary amounts stay hidden on-chain",
                  "Treasury balance is encrypted",
                  "Wallet addresses are private",
                  "ZK proofs verify without revealing",
                  "Full audit trail for the employer only",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Everything you need</h2>
            <p className="text-zinc-500 text-sm">Built for both employers and employees</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "◈",
                title: "Private Treasury",
                desc: "Fund and manage your treasury. Balance stays hidden from the public while fully auditable by you.",
                tag: "Employer",
                tagColor: "violet",
              },
              {
                icon: "◎",
                title: "Team Management",
                desc: "Add employees with their Miden wallet addresses. Salary info stays private between parties.",
                tag: "Employer",
                tagColor: "violet",
              },
              {
                icon: "◆",
                title: "Payroll Engine",
                desc: "Create and approve payroll batches. Each approval generates a ZK proof locked to the recipient.",
                tag: "Employer",
                tagColor: "violet",
              },
              {
                icon: "◉",
                title: "Proof-Based Claims",
                desc: "Employees claim salary using ZK proof verification. Only the correct wallet can unlock payment.",
                tag: "Employee",
                tagColor: "green",
              },
              {
                icon: "📋",
                title: "Audit Trail",
                desc: "Complete transaction history visible only to the employer. Every action logged with timestamp.",
                tag: "Employer",
                tagColor: "violet",
              },
              {
                icon: "🔐",
                title: "Role-Based Access",
                desc: "Separate employer and employee interfaces. PIN-protected employer dashboard keeps controls secure.",
                tag: "Both",
                tagColor: "blue",
              },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{f.icon}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    f.tagColor === "violet"
                      ? "bg-violet-600/10 border-violet-600/20 text-violet-400"
                      : f.tagColor === "green"
                      ? "bg-green-600/10 border-green-600/20 text-green-400"
                      : "bg-blue-600/10 border-blue-600/20 text-blue-400"
                  }`}>{f.tag}</span>
                </div>
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
            <p className="text-zinc-500 text-sm">Simple 4-step private payroll flow</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: "Add your team",
                desc: "Employer adds employees with their Miden wallet addresses and sets monthly salary amount.",
                role: "Employer",
              },
              {
                step: "02",
                title: "Create payroll",
                desc: "Select an employee and create a payroll batch. System checks treasury for sufficient balance.",
                role: "Employer",
              },
              {
                step: "03",
                title: "Approve & generate proof",
                desc: "Employer approves payroll. A ZK proof is generated and cryptographically locked to the employee wallet.",
                role: "Employer",
              },
              {
                step: "04",
                title: "Employee claims salary",
                desc: "Employee connects their Miden wallet and claims salary. Proof verifies identity before releasing payment.",
                role: "Employee",
              },
            ].map((s) => (
              <div key={s.step} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 flex gap-4">
                <div className="text-3xl font-bold text-zinc-800 shrink-0 leading-none mt-1">{s.step}</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-white text-sm">{s.title}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                      s.role === "Employer"
                        ? "bg-violet-600/10 border-violet-600/20 text-violet-400"
                        : "bg-green-600/10 border-green-600/20 text-green-400"
                    }`}>{s.role}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIDEN SECTION */}
      <section id="miden" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-950/30 to-zinc-900/50 border border-violet-800/20 rounded-2xl p-8 md:p-10 space-y-6">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-600/30 flex items-center justify-center">
                <span className="text-violet-300 font-bold text-sm">M</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Built on Miden</h3>
                <p className="text-zinc-500 text-xs">Zero-knowledge blockchain</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">Why Miden makes this possible</h2>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
              Miden is a ZK rollup with client-side proving and private state. Unlike other blockchains
              where all transaction data is public, Miden's note-based architecture allows transactions
              to be verified without revealing their contents. ShadowPay is designed to leverage this natively.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 pt-2">
              {[
                {
                  label: "Private Notes",
                  desc: "Payroll exists as private notes on Miden — not public transactions visible to anyone",
                },
                {
                  label: "Client-side Proving",
                  desc: "ZK proofs are generated locally on your device before being submitted to the network",
                },
                {
                  label: "Mainnet Ready",
                  desc: "Built for Miden mainnet launch. Miden SDK v0.14 fully integrated and running on testnet",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5 border-l-2 border-violet-600/30 pl-4">
                  <p className="text-violet-300 text-sm font-semibold">{item.label}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="https://miden.xyz" target="_blank" rel="noreferrer"
                className="text-xs text-zinc-500 hover:text-violet-400 transition flex items-center gap-1">
                miden.xyz ↗
              </a>
              <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer"
                className="text-xs text-zinc-500 hover:text-violet-400 transition flex items-center gap-1">
                docs.miden.xyz ↗
              </a>
              <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer"
                className="text-xs text-zinc-500 hover:text-violet-400 transition flex items-center gap-1">
                GitHub ↗
              </a>
              <a href="https://chromewebstore.google.com/detail/miden-wallet/ablmompanofnodfdkgchkpmphailefpb"
                target="_blank" rel="noreferrer"
                className="text-xs text-zinc-500 hover:text-violet-400 transition flex items-center gap-1">
                Get Miden Wallet ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to try ShadowPay?</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Install the Miden Wallet Chrome extension, connect to testnet,
            and experience truly private onchain payroll.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onEnter("employer")}
              className="w-full sm:w-auto px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition text-sm"
            >
              Launch as Employer →
            </button>
            <button
              onClick={() => onEnter("employee")}
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl font-medium transition text-sm"
            >
              Login as Employee
            </button>
          </div>
          
            <a
  href="https://chromewebstore.google.com/detail/miden-wallet/ablmompanofnodfdkgchkpmphailefpb"
  target="_blank"
  rel="noreferrer"
  className="inline-block text-xs text-zinc-600 hover:text-zinc-400 transition"
>
  Get Miden Wallet Chrome Extension ↗
</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
            <span className="text-sm text-zinc-500">ShadowPay</span>
            <span className="text-zinc-700 text-xs">· Built on Miden Testnet</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <a href="https://github.com/sahmedonchain/shadowpay-miden" target="_blank" rel="noreferrer"
              className="hover:text-zinc-400 transition">GitHub</a>
            <a href="https://miden.xyz" target="_blank" rel="noreferrer"
              className="hover:text-zinc-400 transition">Miden</a>
            <a href="https://docs.miden.xyz" target="_blank" rel="noreferrer"
              className="hover:text-zinc-400 transition">Docs</a>
            <span>v0.14 · Testnet</span>
          </div>
        </div>
      </footer>

    </div>
  );
}