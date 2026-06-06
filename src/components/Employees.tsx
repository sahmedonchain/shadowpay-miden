import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";

export function Employees() {
  const [data, setData] = useState<DBType | null>(null);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setData(blockchain.getState());
    return eventBus.subscribe(() => setData(blockchain.getState()));
  }, []);

  if (!data) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
    </div>
  );

  const handleAdd = () => {
    const s = Number(salary);
    if (!name.trim() || !s || s <= 0) return alert("Name and valid salary required");
    if (!wallet.trim()) return alert("Wallet address required");
    blockchain.addEmployee(name.trim(), s, wallet.trim());
    setName(""); setSalary(""); setWallet("");
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Team</h1>
        <p className="text-zinc-500 text-sm mt-0.5">Manage your team members</p>
      </div>

      {/* ADD FORM */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white">Add New Employee</h3>
        <input
          className="w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 transition"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 transition"
          placeholder="Monthly salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <input
          className="w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-600/50 transition font-mono"
          placeholder="Miden wallet address (mtst1...)"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <p className="text-zinc-700 text-xs">Employee must provide their Miden wallet address to receive salary</p>
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition"
        >
          Add Employee
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {data.employees.length === 0 ? (
          <div className="bg-zinc-900/30 border border-zinc-800/30 rounded-xl p-8 text-center">
            <p className="text-zinc-500 text-sm">No employees yet</p>
          </div>
        ) : data.employees.map((emp) => (
          <div key={emp.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-600/30 flex items-center justify-center shrink-0">
                <span className="text-violet-400 text-xs font-bold">{emp.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{emp.name}</p>
                <p className="text-xs text-zinc-500">{emp.salary.toLocaleString()} / month</p>
                {emp.walletAddress ? (
                  <p className="text-[10px] text-zinc-600 font-mono truncate mt-0.5">{emp.walletAddress}</p>
                ) : (
                  <p className="text-[10px] text-yellow-600 mt-0.5">⚠ No wallet address</p>
                )}
              </div>
            </div>
            <button
              onClick={() => blockchain.deleteEmployee(emp.id)}
              className="text-zinc-600 hover:text-red-400 text-xs transition px-2 py-1 rounded-md hover:bg-red-950/50 shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}