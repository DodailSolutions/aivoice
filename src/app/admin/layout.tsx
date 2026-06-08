"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Skip auth check if we are on the login page
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const checkAuth = () => {
      const isAuth = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_session="));
      if (!isAuth || isAuth.split("=")[1] !== "true") {
        router.push("/admin/login");
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // If on login page, just render children directly (no sidebar shell)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="flex flex-col items-center gap-4 animate-pulse">
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
          <span className="text-text-muted text-sm font-medium">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    document.cookie =
      "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      exact: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
          />
        </svg>
      ),
    },
    {
      name: "CRM Leads",
      href: "/admin/crm",
      exact: false,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "CMS Content",
      href: "/admin/cms",
      exact: false,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
  ];

  const getBreadcrumb = () => {
    if (pathname === "/admin") return "Overview";
    if (pathname === "/admin/crm") return "CRM Leads";
    if (pathname === "/admin/cms") return "CMS Content";
    return "Admin";
  };

  const isLinkActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen flex bg-charcoal text-text-main font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal-2 border-r border-border-subtle shrink-0">
        {/* Brand/Logo Area */}
        <div className="h-16 px-6 border-b border-border-subtle flex items-center gap-3">
          <Image
            src="/ai-voice-hq-face.webp"
            alt="AI Voice HQ logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-heading font-extrabold text-lg tracking-wider text-text-main">
            AI VOICE <span className="text-orange">HQ</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                suppressHydrationWarning
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-orange/10 text-orange border-l-4 border-orange pl-3"
                    : "text-text-muted hover:bg-charcoal/50 hover:text-text-main"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-border-subtle bg-charcoal-3/30 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-orange/20 text-orange border border-orange/30 flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-text-main truncate">
                Admin User
              </span>
              <span className="text-[10px] text-text-muted truncate">
                admin@aivoicehq.com
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            suppressHydrationWarning
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-border-subtle hover:border-red-500/50 hover:bg-red-500/10 text-xs font-semibold text-text-muted hover:text-red-400 transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Menu Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal-2 border-r border-border-subtle flex flex-col transform lg:hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-0"
        }`}
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="h-16 px-6 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/ai-voice-hq-face.webp"
              alt="AI Voice HQ logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="font-heading font-extrabold text-lg tracking-wider text-text-main">
              AI VOICE <span className="text-orange">HQ</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-text-muted hover:text-text-main focus:outline-hidden"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                suppressHydrationWarning
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-orange/10 text-orange border-l-4 border-orange pl-3"
                    : "text-text-muted hover:bg-charcoal/50 hover:text-text-main"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border-subtle bg-charcoal-3/30 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-orange/20 text-orange border border-orange/30 flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-text-main truncate">
                Admin User
              </span>
              <span className="text-[10px] text-text-muted truncate">
                admin@aivoicehq.com
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            suppressHydrationWarning
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-border-subtle hover:border-red-500/50 hover:bg-red-500/10 text-xs font-semibold text-text-muted hover:text-red-400 transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar header */}
        <header className="h-16 bg-charcoal-2 border-b border-border-subtle px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-text-muted hover:text-text-main focus:outline-hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>Admin Portal</span>
              <span>/</span>
              <span className="font-semibold text-text-main">
                {getBreadcrumb()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              suppressHydrationWarning
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-orange hover:text-orange/80 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange/20 hover:border-orange/40 bg-orange/5"
            >
              View Site
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
