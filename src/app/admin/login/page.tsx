"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const isAuth = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_session="));
    if (isAuth && isAuth.split("=")[1] === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulated short delay for realism
    setTimeout(() => {
      if (username === "admin" && password === "password123") {
        // Set cookie for 1 day
        document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Lax";
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid username or password. (Hint: admin / password123)");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange/5 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/5 blur-3xl" />

      <div className="w-full max-w-md bg-charcoal-2/80 backdrop-blur-xl border border-border-subtle p-8 rounded-3xl shadow-card relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <Image
              src="/ai-voice-hq-face.webp"
              alt="AI Voice HQ logo"
              width={48}
              height={48}
              priority
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
          </Link>
          <h2 className="font-heading font-extrabold text-2xl text-text-main tracking-wider text-center">
            AI VOICE <span className="text-orange">HQ</span>
          </h2>
          <p className="text-text-muted text-xs mt-1">
            Administrative Control Panel
          </p>
        </div>

        {/* Card Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-sm focus:outline-hidden focus:border-orange transition-colors"
              placeholder="Enter your username"
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal/50 border border-border-subtle px-4 py-3 rounded-xl text-text-main text-sm focus:outline-hidden focus:border-orange transition-colors"
              placeholder="••••••••••••"
              suppressHydrationWarning
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex gap-2 items-start animate-fadeIn">
              <svg
                className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-orange hover:bg-orange/90 text-charcoal font-bold text-sm shadow-glow hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            suppressHydrationWarning
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-charcoal"
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
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-text-muted hover:text-text-main transition-colors inline-flex items-center gap-1"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
