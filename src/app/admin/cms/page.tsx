"use client";

import { useEffect, useState } from "react";
import { getContent, updateContent } from "@/data/content-store";

type ActiveTab = "home" | "product" | "pricing" | "integrations" | "menus" | "faq";

export default function CmsManager() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  // Save/Notification States
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await getContent();
      setContent(data);
    } catch (err) {
      console.error("Failed to load content for CMS:", err);
      showNotification("error", "Failed to retrieve website content configurations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  if (loading) {
    return (
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
    );
  }

  // Handle nested object text input changes
  const handleNestedFieldChange = (
    pageKey: string,
    sectionKey: string,
    fieldKey: string,
    value: any
  ) => {
    setContent((prev: any) => {
      const updated = { ...prev };
      if (!updated[pageKey]) updated[pageKey] = {};
      if (!updated[pageKey][sectionKey]) updated[pageKey][sectionKey] = {};
      updated[pageKey][sectionKey][fieldKey] = value;
      return updated;
    });
  };

  // Handle saving a section
  const handleSaveSection = async (pageKey: string, sectionKey: string) => {
    const saveKey = `${pageKey}-${sectionKey}`;
    setSavingSection(saveKey);
    try {
      const sectionData = content[pageKey][sectionKey];
      const res = await updateContent(pageKey, sectionKey, sectionData);
      if (res.success) {
        showNotification(
          "success",
          `Successfully saved and revalidated section [${sectionKey.toUpperCase()}] for page [${pageKey.toUpperCase()}].`
        );
      } else {
        throw new Error(res.error || "Save operation failed.");
      }
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update content configuration.");
    } finally {
      setSavingSection(null);
    }
  };

  // List Item Editors
  const handleListItemChange = (
    pageKey: string,
    sectionKey: string,
    index: number,
    fieldKey: string,
    value: any
  ) => {
    setContent((prev: any) => {
      const updated = { ...prev };
      updated[pageKey][sectionKey][index][fieldKey] = value;
      return updated;
    });
  };

  const addListItem = (pageKey: string, sectionKey: string, defaultObj: any) => {
    setContent((prev: any) => {
      const updated = { ...prev };
      updated[pageKey][sectionKey] = [...updated[pageKey][sectionKey], defaultObj];
      return updated;
    });
  };

  const removeListItem = (pageKey: string, sectionKey: string, index: number) => {
    setContent((prev: any) => {
      const updated = { ...prev };
      updated[pageKey][sectionKey] = updated[pageKey][sectionKey].filter(
        (_: any, i: number) => i !== index
      );
      return updated;
    });
  };

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "home", label: "Homepage" },
    { key: "product", label: "Product Page" },
    { key: "pricing", label: "Pricing Page" },
    { key: "integrations", label: "Integrations" },
    { key: "menus", label: "Menus Demo" },
    { key: "faq", label: "Main FAQ" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-3xl tracking-tight text-text-main">
            CMS Page Manager
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Edit live copywriting blocks, rates, FAQs, and integrations. Page caches will revalidate on save.
          </p>
        </div>
      </div>

      {/* Notifications banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl border text-sm flex gap-3 items-start animate-fadeIn fixed bottom-6 right-6 z-50 max-w-md shadow-lg ${
            notification.type === "success"
              ? "bg-green-950/90 border-green-500/30 text-green-400"
              : "bg-red-950/90 border-red-500/30 text-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Tabs */}
      <div className="flex border-b border-border-subtle overflow-x-auto gap-2 pb-px scrollbar-none select-none">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-3 px-5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? "border-orange text-orange bg-orange/5 rounded-t-xl"
                : "border-transparent text-text-muted hover:text-text-main hover:bg-charcoal-2/30 rounded-t-xl"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-8 mt-6">
        {/* HOMEPAGE TAB */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Section: Hero */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Home Hero Copy</h3>
                  <p className="text-xs text-text-muted">Main landing page headers and call to actions.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("home", "hero")}
                  disabled={savingSection === "home-hero"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "home-hero" ? "Saving..." : "Save Hero Section"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    value={content.home?.hero?.title || ""}
                    onChange={(e) => handleNestedFieldChange("home", "hero", "title", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.home?.hero?.subtitle || ""}
                    onChange={(e) => handleNestedFieldChange("home", "hero", "subtitle", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                    suppressHydrationWarning
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">CTA Demo Button</label>
                    <input
                      type="text"
                      value={content.home?.hero?.ctaDemoText || ""}
                      onChange={(e) => handleNestedFieldChange("home", "hero", "ctaDemoText", e.target.value)}
                      className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">CTA Product Button</label>
                    <input
                      type="text"
                      value={content.home?.hero?.ctaExploreText || ""}
                      onChange={(e) => handleNestedFieldChange("home", "hero", "ctaExploreText", e.target.value)}
                      className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: ROI Calculator Defaults */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">ROI Calculator Configuration</h3>
                  <p className="text-xs text-text-muted">Default parameter values for the slider components on the Homepage.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("home", "roiCalculator")}
                  disabled={savingSection === "home-roiCalculator"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "home-roiCalculator" ? "Saving..." : "Save ROI Calculator"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Default Monthly Calls</label>
                  <input
                    type="number"
                    value={content.home?.roiCalculator?.defaultCalls || 1000}
                    onChange={(e) => handleNestedFieldChange("home", "roiCalculator", "defaultCalls", parseInt(e.target.value) || 0)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-mono"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Default Average Ticket ($)</label>
                  <input
                    type="number"
                    value={content.home?.roiCalculator?.defaultTicket || 35}
                    onChange={(e) => handleNestedFieldChange("home", "roiCalculator", "defaultTicket", parseInt(e.target.value) || 0)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-mono"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT TAB */}
        {activeTab === "product" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Product Page Hero Copy</h3>
                  <p className="text-xs text-text-muted">Header labels for the product features path.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("product", "hero")}
                  disabled={savingSection === "product-hero"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "product-hero" ? "Saving..." : "Save Hero"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    value={content.product?.hero?.title || ""}
                    onChange={(e) => handleNestedFieldChange("product", "hero", "title", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.product?.hero?.subtitle || ""}
                    onChange={(e) => handleNestedFieldChange("product", "hero", "subtitle", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Product Feature Highlights</h3>
                  <p className="text-xs text-text-muted">List of 6 primary feature cards displayed in the grid block.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("product", "highlights")}
                  disabled={savingSection === "product-highlights"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "product-highlights" ? "Saving..." : "Save Features List"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.product?.highlights?.map((highlight: any, index: number) => (
                  <div key={index} className="bg-charcoal/30 border border-border-subtle/60 p-4 rounded-xl space-y-3 relative">
                    <span className="absolute top-3 right-3 text-[10px] bg-charcoal text-text-muted px-2 py-0.5 rounded-md font-bold font-mono">
                      #{index + 1}
                    </span>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Feature Title</label>
                      <input
                        type="text"
                        value={highlight.title || ""}
                        onChange={(e) => handleListItemChange("product", "highlights", index, "title", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Description Body</label>
                      <textarea
                        rows={2}
                        value={highlight.body || ""}
                        onChange={(e) => handleListItemChange("product", "highlights", index, "body", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === "pricing" && (
          <div className="space-y-8">
            {/* Pricing details */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Pricing Cards Copy</h3>
                  <p className="text-xs text-text-muted">Set monthly fees, order limits, and meter rate values.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("pricing", "pricingCard")}
                  disabled={savingSection === "pricing-pricingCard"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "pricing-pricingCard" ? "Saving..." : "Save Pricing Card"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Base Pricing ($ / mo)</label>
                  <input
                    type="number"
                    value={content.pricing?.pricingCard?.basePrice || 300}
                    onChange={(e) => handleNestedFieldChange("pricing", "pricingCard", "basePrice", parseInt(e.target.value) || 0)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-mono"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Included Orders (per mo)</label>
                  <input
                    type="number"
                    value={content.pricing?.pricingCard?.includedOrders || 300}
                    onChange={(e) => handleNestedFieldChange("pricing", "pricingCard", "includedOrders", parseInt(e.target.value) || 0)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-mono"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Overage Order Rate ($ / each)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={content.pricing?.pricingCard?.overageRate || 0.70}
                    onChange={(e) => handleNestedFieldChange("pricing", "pricingCard", "overageRate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-mono"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* Pricing FAQs list */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Pricing Page FAQs</h3>
                  <p className="text-xs text-text-muted">Frequently asked questions specific to pricing and cancellation.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addListItem("pricing", "faqs", { q: "New Question?", a: "New Answer text." })}
                    suppressHydrationWarning
                    className="px-3 py-2 border border-border-subtle hover:border-orange hover:bg-orange/5 text-text-main text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    + Add Q&A
                  </button>
                  <button
                    onClick={() => handleSaveSection("pricing", "faqs")}
                    disabled={savingSection === "pricing-faqs"}
                    suppressHydrationWarning
                    className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {savingSection === "pricing-faqs" ? "Saving..." : "Save FAQs List"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {content.pricing?.faqs?.map((faq: any, index: number) => (
                  <div key={index} className="bg-charcoal/30 border border-border-subtle/60 p-4 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeListItem("pricing", "faqs", index)}
                      suppressHydrationWarning
                      className="absolute top-3 right-3 p-1 rounded-md text-text-muted hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer"
                      title="Remove FAQ"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="pr-12">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.q || ""}
                        onChange={(e) => handleListItemChange("pricing", "faqs", index, "q", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Answer</label>
                      <textarea
                        rows={2}
                        value={faq.a || ""}
                        onChange={(e) => handleListItemChange("pricing", "faqs", index, "a", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INTEGRATIONS TAB */}
        {activeTab === "integrations" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Integrations Hero Copy</h3>
                  <p className="text-xs text-text-muted">Header copy block for POS system list page.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("integrations", "hero")}
                  disabled={savingSection === "integrations-hero"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "integrations-hero" ? "Saving..." : "Save Hero"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    value={content.integrations?.hero?.title || ""}
                    onChange={(e) => handleNestedFieldChange("integrations", "hero", "title", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.integrations?.hero?.subtitle || ""}
                    onChange={(e) => handleNestedFieldChange("integrations", "hero", "subtitle", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* POS */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Supported POS Integrations</h3>
                  <p className="text-xs text-text-muted">Logos and descriptions of active integration hooks.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addListItem("integrations", "posSystems", { name: "NEW POS", note: "Direct integration" })}
                    suppressHydrationWarning
                    className="px-3 py-2 border border-border-subtle hover:border-orange hover:bg-orange/5 text-text-main text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    + Add POS
                  </button>
                  <button
                    onClick={() => handleSaveSection("integrations", "posSystems")}
                    disabled={savingSection === "integrations-posSystems"}
                    suppressHydrationWarning
                    className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {savingSection === "integrations-posSystems" ? "Saving..." : "Save POS List"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.integrations?.posSystems?.map((pos: any, index: number) => (
                  <div key={index} className="bg-charcoal/30 border border-border-subtle/60 p-4 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeListItem("integrations", "posSystems", index)}
                      suppressHydrationWarning
                      className="absolute top-2 right-2 p-1 rounded-md text-text-muted hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer"
                      title="Remove POS"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">POS Brand Name</label>
                      <input
                        type="text"
                        value={pos.name || ""}
                        onChange={(e) => handleListItemChange("integrations", "posSystems", index, "name", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-bold font-mono"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Connection Note</label>
                      <input
                        type="text"
                        value={pos.note || ""}
                        onChange={(e) => handleListItemChange("integrations", "posSystems", index, "note", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MENUS TAB */}
        {activeTab === "menus" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Menus Page Hero Copy</h3>
                  <p className="text-xs text-text-muted">Header copy block for demo menus path.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("menus", "hero")}
                  disabled={savingSection === "menus-hero"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "menus-hero" ? "Saving..." : "Save Hero"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    value={content.menus?.hero?.title || ""}
                    onChange={(e) => handleNestedFieldChange("menus", "hero", "title", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.menus?.hero?.subtitle || ""}
                    onChange={(e) => handleNestedFieldChange("menus", "hero", "subtitle", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* Cuisines */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Selectable Demo Cuisines</h3>
                  <p className="text-xs text-text-muted">List of cuisines prospective leads can toggle on the menus page.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      addListItem("menus", "cuisines", {
                        id: `cuisine-${Date.now()}`,
                        cuisine: "New Cuisine",
                        restaurant: "Spice Bistro",
                        blurb: "Short description.",
                        emoji: "🍽️",
                      })
                    }
                    suppressHydrationWarning
                    className="px-3 py-2 border border-border-subtle hover:border-orange hover:bg-orange/5 text-text-main text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    + Add Cuisine
                  </button>
                  <button
                    onClick={() => handleSaveSection("menus", "cuisines")}
                    disabled={savingSection === "menus-cuisines"}
                    suppressHydrationWarning
                    className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {savingSection === "menus-cuisines" ? "Saving..." : "Save Cuisines List"}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {content.menus?.cuisines?.map((item: any, index: number) => (
                  <div key={index} className="bg-charcoal/30 border border-border-subtle/60 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-4 relative">
                    <button
                      onClick={() => removeListItem("menus", "cuisines", index)}
                      suppressHydrationWarning
                      className="absolute top-3 right-3 p-1 rounded-md text-text-muted hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer"
                      title="Remove Cuisine"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="sm:col-span-2">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Emoji</label>
                      <input
                        type="text"
                        value={item.emoji || ""}
                        onChange={(e) => handleListItemChange("menus", "cuisines", index, "emoji", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange text-center"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Cuisine Name</label>
                      <input
                        type="text"
                        value={item.cuisine || ""}
                        onChange={(e) => handleListItemChange("menus", "cuisines", index, "cuisine", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange font-semibold"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Restaurant Demo</label>
                      <input
                        type="text"
                        value={item.restaurant || ""}
                        onChange={(e) => handleListItemChange("menus", "cuisines", index, "restaurant", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange font-semibold"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Unique ID</label>
                      <input
                        type="text"
                        value={item.id || ""}
                        onChange={(e) => handleListItemChange("menus", "cuisines", index, "id", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-muted text-xs focus:outline-hidden focus:border-orange font-mono"
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="sm:col-span-12">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Blurb Summary Description</label>
                      <input
                        type="text"
                        value={item.blurb || ""}
                        onChange={(e) => handleListItemChange("menus", "cuisines", index, "blurb", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN FAQ TAB */}
        {activeTab === "faq" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">FAQ Page Hero Copy</h3>
                  <p className="text-xs text-text-muted">Header copy block for main FAQ listing page.</p>
                </div>
                <button
                  onClick={() => handleSaveSection("faq", "hero")}
                  disabled={savingSection === "faq-hero"}
                  suppressHydrationWarning
                  className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingSection === "faq-hero" ? "Saving..." : "Save Hero"}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Title</label>
                  <input
                    type="text"
                    value={content.faq?.hero?.title || ""}
                    onChange={(e) => handleNestedFieldChange("faq", "hero", "title", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-2.5 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.faq?.hero?.subtitle || ""}
                    onChange={(e) => handleNestedFieldChange("faq", "hero", "subtitle", e.target.value)}
                    className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>

            {/* List */}
            <div className="bg-charcoal-2 border border-border-subtle p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main">Frequently Asked Questions</h3>
                  <p className="text-xs text-text-muted">Master database list of FAQ items displayed on the FAQ route.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addListItem("faq", "faqs", { q: "New Question?", a: "New Answer text." })}
                    suppressHydrationWarning
                    className="px-3 py-2 border border-border-subtle hover:border-orange hover:bg-orange/5 text-text-main text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    + Add FAQ
                  </button>
                  <button
                    onClick={() => handleSaveSection("faq", "faqs")}
                    disabled={savingSection === "faq-faqs"}
                    suppressHydrationWarning
                    className="px-4 py-2 bg-orange hover:bg-orange/90 text-charcoal font-bold text-xs rounded-xl shadow-glow transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {savingSection === "faq-faqs" ? "Saving..." : "Save FAQ List"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {content.faq?.faqs?.map((faq: any, index: number) => (
                  <div key={index} className="bg-charcoal/30 border border-border-subtle/60 p-4 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => removeListItem("faq", "faqs", index)}
                      suppressHydrationWarning
                      className="absolute top-3 right-3 p-1 rounded-md text-text-muted hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer"
                      title="Remove FAQ"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="pr-12">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.q || ""}
                        onChange={(e) => handleListItemChange("faq", "faqs", index, "q", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors font-semibold"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Answer</label>
                      <textarea
                        rows={2.5}
                        value={faq.a || ""}
                        onChange={(e) => handleListItemChange("faq", "faqs", index, "a", e.target.value)}
                        className="w-full bg-charcoal/50 border border-border-subtle px-3 py-2 rounded-lg text-text-main text-xs focus:outline-hidden focus:border-orange transition-colors leading-relaxed"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
