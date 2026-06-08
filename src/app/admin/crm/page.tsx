"use client";

import { useEffect, useState } from "react";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  Lead,
} from "@/data/content-store";

export default function CrmLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [posFilter, setPosFilter] = useState("all");
  const [interestFilter, setInterestFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<Omit<Lead, "id" | "createdAt">>({
    name: "",
    email: "",
    phone: "",
    restaurantName: "",
    posSystem: "",
    status: "new",
    notes: "",
    interestLevel: "medium",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to load leads in CRM:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const openAddDrawer = () => {
    setSelectedLead(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      restaurantName: "",
      posSystem: "",
      status: "new",
      notes: "",
      interestLevel: "medium",
    });
    setFormError("");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      restaurantName: lead.restaurantName,
      posSystem: lead.posSystem || "",
      status: lead.status,
      notes: lead.notes || "",
      interestLevel: lead.interestLevel || "medium",
    });
    setFormError("");
    setIsDrawerOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSaving(true);

    try {
      if (!formData.name || !formData.restaurantName || !formData.email) {
        throw new Error("Name, Email, and Restaurant Name are required fields.");
      }

      if (selectedLead) {
        // Update Action
        const res = await updateLead({
          ...selectedLead,
          ...formData,
        });
        if (!res.success) {
          throw new Error(res.error || "Failed to update lead.");
        }
      } else {
        // Create Action
        const res = await createLead(formData);
        if (!res.success) {
          throw new Error(res.error || "Failed to create lead.");
        }
      }

      // Close drawer & reload
      setIsDrawerOpen(false);
      await loadLeads();
    } catch (err: any) {
      setFormError(err.message || "An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteLead(id);
      if (!res.success) {
        alert(res.error || "Failed to delete lead.");
      } else {
        setIsConfirmingDelete(null);
        await loadLeads();
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting lead.");
    }
  };

  // Get unique POS options for the dropdown list
  const posOptions = Array.from(
    new Set(leads.map((l) => l.posSystem).filter(Boolean))
  );

  // Filter & Sort computation
  const filteredLeads = leads
    .filter((lead) => {
      const query = search.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.restaurantName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.notes && lead.notes.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const matchesPos =
        posFilter === "all" || lead.posSystem === posFilter;

      const matchesInterest =
        interestFilter === "all" || lead.interestLevel === interestFilter;

      return matchesSearch && matchesStatus && matchesPos && matchesInterest;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "restaurantName") {
        comparison = a.restaurantName.localeCompare(b.restaurantName);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="space-y-8 animate-fadeIn relative pb-12">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl tracking-tight text-text-main">
            CRM Lead Manager
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Track inquiries, update sales pipeline status, and add follow-up interaction details.
          </p>
        </div>
        <button
          onClick={openAddDrawer}
          suppressHydrationWarning
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange hover:bg-orange/90 text-charcoal font-bold text-sm shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Lead
        </button>
      </div>

      {/* Advanced Filters Panel */}
      <div className="bg-charcoal-2 border border-border-subtle p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads, notes, restaurant..."
              className="w-full bg-charcoal/50 border border-border-subtle rounded-xl pl-9 pr-4 py-2.5 text-xs text-text-main focus:outline-hidden focus:border-orange transition-colors"
              suppressHydrationWarning
            />
            <svg
              className="w-4 h-4 text-text-muted absolute left-3 top-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-charcoal/50 border border-border-subtle rounded-xl px-3 py-2.5 text-xs text-text-main focus:outline-hidden focus:border-orange transition-colors cursor-pointer"
            suppressHydrationWarning
          >
            <option value="all">All Statuses</option>
            <option value="new">New Inquiry</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="demo_scheduled">Demo Scheduled</option>
            <option value="won">Closed Won</option>
            <option value="lost">Closed Lost</option>
          </select>
        </div>

        {/* POS System */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            POS Integration
          </label>
          <select
            value={posFilter}
            onChange={(e) => setPosFilter(e.target.value)}
            className="w-full bg-charcoal/50 border border-border-subtle rounded-xl px-3 py-2.5 text-xs text-text-main focus:outline-hidden focus:border-orange transition-colors cursor-pointer"
            suppressHydrationWarning
          >
            <option value="all">All Systems</option>
            {posOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Interest Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Interest Level
          </label>
          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="w-full bg-charcoal/50 border border-border-subtle rounded-xl px-3 py-2.5 text-xs text-text-main focus:outline-hidden focus:border-orange transition-colors cursor-pointer"
            suppressHydrationWarning
          >
            <option value="all">All Interests</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Leads Spreadsheet Table */}
      <div className="bg-charcoal-2 border border-border-subtle rounded-2xl overflow-hidden">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-orange"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <svg className="w-12 h-12 text-text-muted mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.302M9 10.5h.008v.008H9V10.5zm6 0h.008v.008H15V10.5zm3 11.25a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-heading font-bold text-text-main">No leads found</h4>
            <p className="text-xs text-text-muted max-w-xs mx-auto">
              No results match your active filters. Try refining your keywords or filter parameters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-charcoal/30 border-b border-border-subtle text-[11px] font-bold uppercase tracking-wider text-text-muted select-none">
                  <th
                    className="py-4 px-6 cursor-pointer hover:text-text-main transition-colors"
                    onClick={() => {
                      if (sortBy === "restaurantName") toggleSortOrder();
                      else {
                        setSortBy("restaurantName");
                        setSortOrder("asc");
                      }
                    }}
                  >
                    Restaurant {sortBy === "restaurantName" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="py-4 px-6 cursor-pointer hover:text-text-main transition-colors"
                    onClick={() => {
                      if (sortBy === "name") toggleSortOrder();
                      else {
                        setSortBy("name");
                        setSortOrder("asc");
                      }
                    }}
                  >
                    Contact Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">POS</th>
                  <th className="py-4 px-6">Interest</th>
                  <th className="py-4 px-6">Status</th>
                  <th
                    className="py-4 px-6 cursor-pointer hover:text-text-main transition-colors"
                    onClick={() => {
                      if (sortBy === "createdAt") toggleSortOrder();
                      else {
                        setSortBy("createdAt");
                        setSortOrder("desc");
                      }
                    }}
                  >
                    Created {sortBy === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/40">
                {filteredLeads.map((lead) => {
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
                    <tr
                      key={lead.id}
                      className="hover:bg-charcoal/20 transition-colors group text-xs text-text-muted"
                    >
                      <td className="py-4 px-6 font-semibold text-text-main group-hover:text-orange transition-colors">
                        {lead.restaurantName}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-text-main font-medium">{lead.name}</span>
                          <span className="text-[10px] text-text-muted">{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-[11px]">{lead.phone}</td>
                      <td className="py-4 px-6 font-semibold">{lead.posSystem || "-"}</td>
                      <td className="py-4 px-6 font-semibold capitalize">
                        <span className={interestColors[lead.interestLevel]}>
                          ● {lead.interestLevel}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                            statusColors[lead.status] || "bg-charcoal-3 text-text-muted"
                          }`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {new Date(lead.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditDrawer(lead)}
                            suppressHydrationWarning
                            className="p-1.5 rounded-lg border border-border-subtle hover:border-orange hover:bg-orange/10 hover:text-orange text-text-muted transition-colors cursor-pointer"
                            title="Edit Lead"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          {isConfirmingDelete === lead.id ? (
                            <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded-lg">
                              <button
                                onClick={() => handleDelete(lead.id)}
                                suppressHydrationWarning
                                className="text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors"
                              >
                                Confirm
                              </button>
                              <span className="text-[9px] text-red-500">|</span>
                              <button
                                onClick={() => setIsConfirmingDelete(null)}
                                suppressHydrationWarning
                                className="text-[10px] font-bold text-text-muted hover:text-text-main transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setIsConfirmingDelete(lead.id)}
                              suppressHydrationWarning
                              className="p-1.5 rounded-lg border border-border-subtle hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-text-muted transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Premium Sliding Side Drawer for adding/editing a lead */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-lg bg-charcoal-2 border-l border-border-subtle shadow-2xl flex flex-col h-full z-10 animate-slideLeft">
            {/* Header */}
            <div className="h-16 px-6 border-b border-border-subtle flex items-center justify-between bg-charcoal-3/30 shrink-0">
              <div>
                <h3 className="font-heading font-bold text-lg text-text-main">
                  {selectedLead ? "Edit Lead Details" : "Create New CRM Lead"}
                </h3>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                  {selectedLead ? `Lead ID: ${selectedLead.id}` : "Account Registration"}
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-text-muted hover:text-text-main focus:outline-hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {formError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex gap-2 items-start animate-fadeIn">
                  <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Restaurant Name */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    required
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    placeholder="e.g. Mercer's Kitchen"
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* POS System */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    POS System
                  </label>
                  <input
                    type="text"
                    name="posSystem"
                    value={formData.posSystem}
                    onChange={handleInputChange}
                    placeholder="e.g. Toast, Clover, Square"
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@mercerskitchen.com"
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(402) 555-0123"
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                    suppressHydrationWarning
                  />
                </div>

                {/* Pipeline Status */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Pipeline Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors cursor-pointer"
                    suppressHydrationWarning
                  >
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="demo_scheduled">Demo Scheduled</option>
                    <option value="won">Closed Won</option>
                    <option value="lost">Closed Lost</option>
                  </select>
                </div>

                {/* Interest Level */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Interest Level
                  </label>
                  <select
                    name="interestLevel"
                    value={formData.interestLevel}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors cursor-pointer"
                    suppressHydrationWarning
                  >
                    <option value="high">High Interest</option>
                    <option value="medium">Medium Interest</option>
                    <option value="low">Low Interest</option>
                  </select>
                </div>
              </div>

              {/* Notes & Log details */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                  Notes & Interaction Logs
                </label>
                <textarea
                  name="notes"
                  rows={6}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Record conversation logs, setup specifications, spice level rules, custom overrides..."
                  className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors resize-y leading-relaxed font-sans"
                  suppressHydrationWarning
                />
              </div>

              {/* Bottom Actions Drawer */}
              <div className="pt-6 border-t border-border-subtle flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  suppressHydrationWarning
                  className="px-4 py-2.5 rounded-xl border border-border-subtle hover:bg-charcoal/50 text-xs font-semibold text-text-muted hover:text-text-main transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  suppressHydrationWarning
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="animate-spin h-3.5 w-3.5 text-charcoal" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Lead"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
