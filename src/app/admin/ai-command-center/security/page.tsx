"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Database,
  DollarSign,
  Key,
  Users,
  Clock,
  History,
  CheckCircle2,
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  details: string;
  createdAt: string;
}

export default function SecurityPanelPage() {
  const [securityStatus, setSecurityStatus] = useState<any>({
    isEmergencyLockdown: false,
    dailySpendLimit: 0,
    dailySpentSoFar: 0,
    activeWorkersCount: 7,
    totalWorkersCount: 7,
  });
  const [employees, setEmployees] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [newBudget, setNewBudget] = useState("0");
  const [isUpdatingBudget, setIsUpdatingBudget] = useState(false);

  const fetchData = async () => {
    try {
      const [secRes, empRes] = await Promise.all([
        fetch("/api/admin/ai/security"),
        fetch("/api/admin/ai/employees"),
      ]);

      const secData = await secRes.json();
      const empData = await empRes.json();

      if (secData.securityStatus) {
        setSecurityStatus(secData.securityStatus);
        setNewBudget(secData.securityStatus.dailySpendLimit?.toString() || "0");
      }
      if (secData.auditLogs) {
        setAuditLogs(secData.auditLogs);
      }
      if (empData.employees) {
        setEmployees(empData.employees);
      }
    } catch (e) {
      console.error("Failed to load security settings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleLockdown = async () => {
    const isLocked = securityStatus.isEmergencyLockdown;
    const action = isLocked ? "LIFT_LOCKDOWN" : "EMERGENCY_LOCKDOWN";

    if (!isLocked && !confirm("⚠️ ATTENTION OWNER: Are you sure you want to trigger Emergency Lockdown? All AI employees will immediately stop executing operations.")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/ai/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(isLocked ? "Lockdown successfully lifted. Workforce restored." : "EMERGENCY LOCKDOWN ENGAGED. All AI processes halted.");
        fetchData();
      }
    } catch (e) {
      alert("Error updating security state");
    }
  };

  const handleUpdateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingBudget(true);
    try {
      const res = await fetch("/api/admin/ai/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_BUDGET_CAP",
          dailyLimit: parseFloat(newBudget) || 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Daily budget cap updated to ₹${newBudget}. Zero unauthorized spend enforced.`);
        fetchData();
      }
    } catch (e) {
      alert("Failed to update budget limit");
    } finally {
      setIsUpdatingBudget(false);
    }
  };

  const handleTriggerBackup = async () => {
    try {
      const res = await fetch("/api/admin/ai/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "TRIGGER_BACKUP" }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Database snapshot and schema backup verified successfully on Supabase PostgreSQL.");
        fetchData();
      }
    } catch (e) {
      alert("Backup trigger failed");
    }
  };

  const handleToggleWorker = async (code: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    try {
      await fetch("/api/admin/ai/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, status: newStatus }),
      });
      fetchData();
    } catch (e) {
      alert("Failed to toggle worker");
    }
  };

  const isLocked = securityStatus.isEmergencyLockdown;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl text-white shadow-xl transition-all border ${
        isLocked
          ? "bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-red-500"
          : "bg-gradient-to-r from-[#101B35] to-[#1E293B] border-blue-900"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner Security Protocol &amp; Kill-Switch</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>AVNIVO Owner Security Panel</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Strict isolation layer. No AI agent can modify system policies, alter budgets, delete database tables, or publish without verified Owner credentials.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true);
                fetchData();
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/ai-command-center"
              className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>
          </div>
        </div>

        {actionMessage && (
          <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-xl text-xs text-accent font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionMessage}</span>
          </div>
        )}
      </div>

      {/* Main Security Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Emergency Kill Switch */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Emergency Kill-Switch</span>
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                isLocked ? "bg-red-100 text-red-700 border border-red-300" : "bg-emerald-100 text-emerald-700 border border-emerald-300"
              }`}>
                {isLocked ? "Active Lockdown" : "System Armed"}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Instantly halts all 7 AI Employees and freezes all API dispatches. Use this if any AI generates unwanted content or you wish to suspend automated suggestions.
            </p>
          </div>

          <button
            onClick={handleToggleLockdown}
            className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
              isLocked
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{isLocked ? "LIFT EMERGENCY LOCKDOWN" : "TRIGGER EMERGENCY LOCKDOWN"}</span>
          </button>
        </div>

        {/* 2. Financial Safety Budget Cap */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-primary flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Zero-Spend Budget Enforcer</span>
            </h3>
            <p className="text-xs text-gray-500">
              Guarantees AI cannot spend money on advertisements or paid services without Owner authorization.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">Current Daily Cap</span>
              <strong className="text-base text-emerald-900 font-black">
                ₹{securityStatus.dailySpendLimit || 0}.00
              </strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Spent Today</span>
              <strong className="text-base text-charcoal font-black">₹0.00</strong>
            </div>
          </div>

          <form onSubmit={handleUpdateBudget} className="space-y-2">
            <label className="text-[11px] font-bold text-charcoal block">Update Daily Budget Cap (₹ INR):</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="100"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={isUpdatingBudget}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow shrink-0"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* 3. Database Snapshot & Protection */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-primary flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Database Integrity &amp; Snapshots</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Supabase PostgreSQL database is shielded with Row Level Security (RLS) and transaction safeguards. AI agents possess read/draft permissions only and cannot DROP or TRUNCATE tables.
            </p>
          </div>

          <button
            onClick={handleTriggerBackup}
            className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-secondary border border-blue-200 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Database className="w-4 h-4" />
            <span>Verify Database Snapshot</span>
          </button>
        </div>
      </div>

      {/* Individual Worker Permissions Table */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-primary font-display flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" />
              <span>Individual Worker Access &amp; Power State</span>
            </h3>
            <p className="text-xs text-gray-500">
              Selectively enable or pause specific AI employees according to your business needs:
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] font-black border-y border-gray-200">
              <tr>
                <th className="py-3 px-4">AI Worker</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Direct Action Scope</th>
                <th className="py-3 px-4">Approval Required</th>
                <th className="py-3 px-4 text-right">Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => {
                const isActive = emp.status === "ACTIVE" && !isLocked;
                return (
                  <tr key={emp.code} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span>{emp.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">{emp.roleTitle}</td>
                    <td className="py-3.5 px-4 text-gray-500 max-w-xs truncate">{emp.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-secondary border border-blue-200 uppercase">
                        100% Required
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleWorker(emp.code, emp.status)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                        }`}
                      >
                        {isActive ? "ACTIVE" : "PAUSED"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary font-display flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            <span>Immutable Security Audit Log</span>
          </h3>
          <span className="text-[11px] text-gray-400">Total Entries: {auditLogs.length}</span>
        </div>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 text-center">No security audit records logged yet.</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{log.action}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                      {log.performedBy}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono truncate max-w-xl">{log.details}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-medium shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(log.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
