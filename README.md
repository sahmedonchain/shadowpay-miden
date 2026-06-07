# ShadowPay

> Privacy-first payroll & treasury management dApp — built on Miden's zero-knowledge architecture.

🌐 **Live Demo:** https://shadowpay-miden.vercel.app/
💻 **GitHub:** https://github.com/sahmedonchain/shadowpay-miden

---

## What is ShadowPay?

Most onchain payroll systems are fully public — anyone can see who got paid, how much, and from which wallet.

ShadowPay is the first private payroll system built natively on Miden's zero-knowledge blockchain. Pay your team without exposing salaries, wallet addresses, or treasury balances on-chain.

---

## Features

- 🔐 **Private Treasury Vault** — Balance encrypted, only you can see it
- 👥 **Team Management** — Add employees with Miden wallet addresses
- ⚡ **Payroll Engine** — Create and approve payroll with ZK proof generation
- ✅ **Proof-Based Claims** — Employees claim salary via wallet verification
- 📋 **Full Audit Trail** — Complete transaction log for employers
- 🔑 **Role-Based Access** — PIN-protected employer dashboard
- 📱 **Mobile Responsive** — Works on all screen sizes

---

## Architecture

ShadowPay's business logic maps directly to Miden's core primitives:

| ShadowPay | Miden |
|-----------|-------|
| Employee record | Private account |
| Payroll creation | Note creation |
| Approval + proof | State transition + ZK proof |
| Salary claim | Note consumption |
| Treasury balance | Private asset state |

---

## Tech Stack

- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Blockchain:** Miden SDK v0.14 (testnet)
- **Wallet:** Miden Wallet browser extension
- **Deploy:** Vercel

---

## Current Status

| Layer | Status |
|-------|--------|
| UI / UX | ✅ Complete |
| Payroll workflow | ✅ Complete |
| Treasury accounting | ✅ Complete |
| ZK proof simulation | ✅ Complete |
| Miden Wallet integration | ✅ Complete |
| Role-based access (PIN) | ✅ Complete |
| Mobile responsive | ✅ Complete |
| Real on-chain notes | 🔜 Mainnet phase |
| Smart contract deployment | 🔜 Mainnet phase |

---

## Roadmap

### Phase 1 — UI Prototype ✅
- Complete payroll lifecycle
- Treasury management
- ZK proof simulation layer
- Mobile responsive UI
- Role-based employer/employee system
- Miden Wallet browser extension integration

### Phase 2 — Miden Testnet Integration ✅
- Miden SDK v0.14 connected
- Real Miden Wallet connected
- Testnet live and functional

### Phase 3 — Mainnet 🔜
- Real on-chain payroll notes
- Private salary transfers via P2ID
- Proof-verified salary claims on mainnet
- Multi-company treasury support
- Employee self-custody of salary notes

---

## Local Development

```bash
git clone https://github.com/sahmedonchain/shadowpay-miden.git
cd shadowpay-miden
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173)

Install [Miden Wallet](https://chromewebstore.google.com/detail/miden-wallet/ablmompanofnodfdkgchkpmphailefpb) Chrome extension to connect.

---

## Why Miden?

Miden is uniquely suited for payroll:

- **Private notes by default** — salary amounts stay hidden
- **Client-side proving** — ZK proofs generated locally
- **No trusted intermediary** — approval flow is cryptographically enforced
- **Private state** — treasury balance never exposed on-chain

No other blockchain makes all of this possible natively.

---

## Contributing

Open prototype. Feedback and contributions welcome.

If you're from the Miden team — would love guidance on best mapping this payroll model to Miden's note and account primitives for mainnet.

---

## Contact

- **GitHub:** [@sahmedonchain](https://github.com/sahmedonchain)
- **Twitter:** [@sahmedonchain](https://twitter.com/sahmedonchain)

---

*Building in public on Miden. Long way to go — but shipping every day.*
