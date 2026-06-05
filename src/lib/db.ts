import { eventBus } from "./event";
import type { Proof } from "./proof";

export type Employee = {
  id: string;
  name: string;
  salary: number;
};

export type Payroll = {
  id: string;
  employeeId: string;
  amount: number;
  status: "pending" | "approved" | "claimed";
  proof?: Proof;
  createdAt: number;
};

export type Transaction = {
  id: string;
  type: "DEDUCT" | "ADD";
  amount: number;
  reason: string;
  timestamp: number;
};

export type DBType = {
  treasury: number;
  employees: Employee[];
  payrolls: Payroll[];
  transactions: Transaction[];
};

const DEFAULT_DB: DBType = {
  treasury: 100000,
  employees: [],
  payrolls: [],
  transactions: [],
};

export const getDB = (): DBType => {
  if (typeof window === "undefined") return DEFAULT_DB;
  const raw = localStorage.getItem("shadowpay-db");
  if (!raw) return DEFAULT_DB;

  const parsed = JSON.parse(raw);
  return {
    treasury: parsed.treasury ?? 100000,
    employees: parsed.employees ?? [],
    payrolls: (parsed.payrolls ?? []).map((p: Payroll) => ({
      ...p,
      createdAt: p.createdAt ?? Date.now(),
    })),
    transactions: parsed.transactions ?? [],
  };
};

export const saveDB = (data: DBType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shadowpay-db", JSON.stringify(data));
    eventBus.emit();
  }
};

export const db = {
  get: getDB,
  set: saveDB,
};