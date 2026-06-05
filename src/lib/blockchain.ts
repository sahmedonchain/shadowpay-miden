import { db } from "./db";
import type { DBType } from "./db";
import { proofEngine } from "./proof";
import { createId } from "./id";

export const blockchain = {
  getState(): DBType {
    return db.get();
  },

  addEmployee(name: string, salary: number) {
    const data = db.get();
    const employee = { id: createId(), name, salary };
    db.set({ ...data, employees: [...data.employees, employee] });
    return employee;
  },

  deleteEmployee(id: string) {
    const data = db.get();
    db.set({ ...data, employees: data.employees.filter((e) => e.id !== id) });
  },

  createPayroll(employeeId: string, amount: number) {
    const data = db.get();

    const exists = data.payrolls.find(
      (p) =>
        p.employeeId === employeeId &&
        p.amount === amount &&
        p.status === "pending"
    );
    if (exists) return exists;

    const payroll = {
      id: createId(),
      employeeId,
      amount,
      status: "pending" as const,
      createdAt: Date.now(),
    };

    db.set({ ...data, payrolls: [...data.payrolls, payroll] });
    return payroll;
  },

  approvePayroll(payrollId: string) {
    const data = db.get();
    const payroll = data.payrolls.find((p) => p.id === payrollId);
    if (!payroll || payroll.status !== "pending") return false;
    if (data.treasury < payroll.amount) return false;

    const proof = proofEngine.generate(payrollId, payroll.amount);

    const updatedPayrolls = data.payrolls.map((p) =>
      p.id === payrollId ? { ...p, status: "approved" as const, proof } : p
    );

    const transaction = {
      id: createId(),
      type: "DEDUCT" as const,
      amount: payroll.amount,
      reason: `Payroll approved for employee ${payroll.employeeId.slice(0, 8)}`,
      timestamp: Date.now(),
    };

    db.set({
      ...data,
      treasury: data.treasury - payroll.amount,
      payrolls: updatedPayrolls,
      transactions: [...data.transactions, transaction],
    });

    return true;
  },

  claimPayroll(payrollId: string) {
    const data = db.get();
    const payroll = data.payrolls.find((p) => p.id === payrollId);
    if (!payroll || payroll.status !== "approved") return false;
    if (!payroll.proof || !proofEngine.verify(payroll.proof, payrollId)) return false;

    const updated = data.payrolls.map((p) =>
      p.id === payrollId ? { ...p, status: "claimed" as const } : p
    );

    db.set({ ...data, payrolls: updated });
    return true;
  },

  fundTreasury(amount: number) {
    const data = db.get();
    const transaction = {
      id: createId(),
      type: "ADD" as const,
      amount,
      reason: "Manual treasury funding",
      timestamp: Date.now(),
    };
    db.set({
      ...data,
      treasury: data.treasury + amount,
      transactions: [...data.transactions, transaction],
    });
  },

  deletePayroll(payrollId: string) {
    const data = db.get();
    const payroll = data.payrolls.find((p) => p.id === payrollId);
    if (!payroll || payroll.status === "claimed") return false;

    if (payroll.status === "approved") {
      // refund treasury
      const transaction = {
        id: createId(),
        type: "ADD" as const,
        amount: payroll.amount,
        reason: `Payroll deleted — refund`,
        timestamp: Date.now(),
      };
      db.set({
        ...data,
        treasury: data.treasury + payroll.amount,
        payrolls: data.payrolls.filter((p) => p.id !== payrollId),
        transactions: [...data.transactions, transaction],
      });
    } else {
      db.set({
        ...data,
        payrolls: data.payrolls.filter((p) => p.id !== payrollId),
      });
    }
    return true;
  },
};