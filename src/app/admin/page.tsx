"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLeads, Lead } from "@/data/content-store";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        console.error("Failed to load leads for dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-orange"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  // Compute metrics
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === "won").length;
  const activeLocations = wonLeads + 2; // Mock + Won
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0.0";

  // Mock savings calculation (each lead won is active and saves ~40 hours/month)
  const totalHoursSaved = activeLocations * 42;

  // Status breakdown
  const statusCounts = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    demo_scheduled: leads.filter((l) => l.status === "demo_scheduled").length,
    won: wonLeads,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  const recentLeads = leads.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Header */}
      <div>
        <h1 className="font-heading font-extrabold text-3xl tracking-tight text-text-main">
          Dashboard Overview
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Monitor caller analytics, pipeline conversion rates, and integration health.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl relative overflow-hidden group hover:border-orange/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total CRM Leads
            </span>
            <span className="p-2 rounded-lg bg-orange/10 text-orange">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text-main tracking-tight">
              {totalLeads}
            </span>
            <span className="text-xs text-green-400 font-medium">
              +12% vs last month
            </span>
          </div>
        </div>

        {/* Active Locations */}
        <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl relative overflow-hidden group hover:border-orange/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Active Locations
            </span>
            <span className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text-main tracking-tight">
              {activeLocations}
            </span>
            <span className="text-xs text-text-muted">
              Live POS connections
            </span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl relative overflow-hidden group hover:border-orange/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Conversion Rate
            </span>
            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text-main tracking-tight">
              {conversionRate}%
            </span>
            <span className="text-xs text-green-400 font-medium">
              +4.2% spike
            </span>
          </div>
        </div>

        {/* Staff Hours Saved */}
        <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl relative overflow-hidden group hover:border-orange/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Staff Hours Saved
            </span>
            <span className="p-2 rounded-lg bg-orange/10 text-orange">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-text-main tracking-tight">
              {totalHoursSaved}h
            </span>
            <span className="text-xs text-text-muted">
              This billing period
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call Volume Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-charcoal-2 border border-border-subtle p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-text-main">
                Call Volume & Order Conversions
              </h3>
              <p className="text-xs text-text-muted">
                Weekly traffic distribution handled by AI Voice HQ.
              </p>
            </div>
            <span className="text-xs bg-charcoal px-3 py-1.5 rounded-lg border border-border-subtle text-text-muted font-medium">
              Last 7 Days
            </span>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 200" className="w-full h-full">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4" />

              {/* Volume Area and Line (Orange) */}
              <path
                d="M 0 160 Q 40 100 80 120 T 160 50 T 240 70 T 320 30 T 400 90 T 500 40 L 500 200 L 0 200 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M 0 160 Q 40 100 80 120 T 160 50 T 240 70 T 320 30 T 400 90 T 500 40"
                fill="none"
                stroke="#ff5a1f"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Order Area and Line (Green) */}
              <path
                d="M 0 185 Q 40 140 80 150 T 160 100 T 240 120 T 320 85 T 400 135 T 500 95 L 500 200 L 0 200 Z"
                fill="url(#orderGrad)"
              />
              <path
                d="M 0 185 Q 40 140 80 150 T 160 100 T 240 120 T 320 85 T 400 135 T 500 95"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Interactive Dots */}
              <circle cx="320" cy="30" r="5" fill="#ff5a1f" stroke="#121212" strokeWidth="1.5" />
              <circle cx="320" cy="85" r="5" fill="#22c55e" stroke="#121212" strokeWidth="1.5" />
            </svg>
            <div className="absolute top-4 left-6 flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange block" />
                Calls Logged (2,184)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 block" />
                Orders Transacted (1,745)
              </span>
            </div>
            {/* Tooltip Hover Overlay */}
            <div className="absolute top-[18%] left-[68%] bg-charcoal border border-border-subtle p-2 rounded-lg shadow-lg text-[10px] space-y-0.5 pointer-events-none">
              <p className="font-semibold text-text-main">Friday Rush (Dinner)</p>
              <p className="text-orange">Calls: 382</p>
              <p className="text-green-400">Orders: 310 (81.1% Conv)</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted mt-4 font-semibold px-2">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>

        {/* Lead Funnel Pipeline (1/3 width) */}
        <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-text-main mb-2">
              Leads Pipeline
            </h3>
            <p className="text-xs text-text-muted mb-6">
              Distribution of prospective accounts by pipeline stage.
            </p>
          </div>

          <div className="space-y-4">
            {/* Won */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-main flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 block" />
                  Closed Won (Live)
                </span>
                <span className="text-text-muted">{statusCounts.won}</span>
              </div>
              <div className="w-full bg-charcoal h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(statusCounts.won / totalLeads) * 100}%` }}
                />
              </div>
            </div>

            {/* Demo Scheduled */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-main flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange block" />
                  Demo Scheduled
                </span>
                <span className="text-text-muted">{statusCounts.demo_scheduled}</span>
              </div>
              <div className="w-full bg-charcoal h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange h-full rounded-full transition-all duration-500"
                  style={{ width: `${(statusCounts.demo_scheduled / totalLeads) * 100}%` }}
                />
              </div>
            </div>

            {/* Qualified */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-main flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 block" />
                  Qualified
                </span>
                <span className="text-text-muted">{statusCounts.qualified}</span>
              </div>
              <div className="w-full bg-charcoal h-2 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(statusCounts.qualified / totalLeads) * 100}%` }}
                />
              </div>
            </div>

            {/* Contacted / New */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-text-main flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 block" />
                  Contacted / Inquiry
                </span>
                <span className="text-text-muted">
                  {statusCounts.contacted + statusCounts.new}
                </span>
              </div>
              <div className="w-full bg-charcoal h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((statusCounts.contacted + statusCounts.new) / totalLeads) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle mt-6">
            <Link
              href="/admin/crm"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-border-subtle hover:border-orange hover:bg-orange/5 text-xs font-semibold text-text-main transition-all"
            >
              Open CRM Lead Manager
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Lead Inquiries */}
      <div className="bg-charcoal-2 border border-border-subtle rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-text-main">
              Recent Account Inquiries
            </h3>
            <p className="text-xs text-text-muted">
              Most recent submissions requesting AI configuration setups.
            </p>
          </div>
          <Link
            href="/admin/crm"
            className="text-xs font-semibold text-orange hover:text-orange/80 transition-colors"
          >
            View All Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-charcoal/30 border-b border-border-subtle text-[11px] font-bold uppercase tracking-wider text-text-muted">
                <th className="py-4 px-6">Restaurant</th>
                <th className="py-4 px-6">Contact Name</th>
                <th className="py-4 px-6">POS Integration</th>
                <th className="py-4 px-6">Interest</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/40">
              {recentLeads.map((lead) => {
                const statusColors = {
                  new: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                  contacted: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                  qualified: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
                  demo_scheduled: "bg-orange/10 text-orange border border-orange/20",
                  won: "bg-green-500/10 text-green-400 border border-green-500/20",
                  lost: "bg-red-500/10 text-red-400 border border-red-500/20",
                };

                const interestColors = {
                  low: "text-red-400",
                  medium: "text-yellow-500",
                  high: "text-green-400",
                };

                return (
                  <tr key={lead.id} className="hover:bg-charcoal/20 transition-colors group">
                    <td className="py-4 px-6 font-semibold text-text-main group-hover:text-orange transition-colors">
                      {lead.restaurantName}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-text-main">{lead.name}</span>
                        <span className="text-xs text-text-muted">{lead.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-text-muted">
                      {lead.posSystem || "Not specified"}
                    </td>
                    <td className="py-4 px-6 font-semibold text-xs capitalize">
                      <span className={interestColors[lead.interestLevel]}>
                        ● {lead.interestLevel}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusColors[lead.status] || "bg-charcoal-3 text-text-muted"
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-xs text-text-muted font-medium">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
