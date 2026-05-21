"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Eye, EyeOff, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── OAuth Button ─────────────────────────────────────────────────────────────

function OAuthButton({
  provider,
  icon,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#E8E8EC] bg-white px-4 py-2.5 text-sm font-medium text-[#0F0F12] transition-all hover:border-[#C9C0DE] hover:bg-[#F8F6FB] active:bg-[#F2F2F4]"
    >
      {icon}
      Continue with {provider}
    </button>
  );
}

// ─── Brand side ───────────────────────────────────────────────────────────────

function BrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2D1F5E] via-[#4A3878] to-[#7660A8] p-12 lg:flex">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-semibold text-white">DClaw Mail</span>
      </div>

      {/* Central message */}
      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-[#C9C0DE]" />
          <span className="text-xs font-semibold text-[#C9C0DE]">AI-powered inbox</span>
        </div>
        <blockquote className="mb-6 text-2xl font-bold leading-snug text-white">
          &ldquo;I get to inbox zero every morning for the first time in 8 years.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
            ZA
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Zara Ahmed</p>
            <p className="text-xs text-[#C9C0DE]">CTO at Finara · YC W24</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative grid grid-cols-3 gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
        {[
          { value: "2,400+", label: "Active users" },
          { value: "< 4 min", label: "Avg. to inbox zero" },
          { value: "28%", label: "MoM growth" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="mt-0.5 text-[11px] text-[#C9C0DE]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

type Mode = "login" | "signup";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParams.get("mode") === "signup") setMode("signup");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email is required"); return; }
    if (!password || password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    // Demo: simulate auth delay, then redirect
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push("/dashboard?demo=true");
  };

  const handleOAuth = async (provider: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    router.push("/dashboard?demo=true");
  };

  return (
    <div className="flex min-h-screen">
      <BrandPanel />

      {/* Form side */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Back link */}
        <div className="flex items-center justify-between px-8 pt-6">
          <Link href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[#7A7A85] transition-colors hover:text-[#0F0F12]">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-1 text-sm text-[#7A7A85]">
            {mode === "login" ? "No account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              className="ml-1 font-semibold text-[#7660A8] hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 px-8 pt-4 pb-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7660A8]">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-[#0F0F12]">DClaw Mail</span>
        </div>

        {/* Form container */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-[380px]">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-[#0F0F12]">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-1.5 text-sm text-[#7A7A85]">
                {mode === "login"
                  ? "Sign in to your DClaw Mail inbox"
                  : "Start your free account — no credit card required"}
              </p>
            </div>

            {/* OAuth buttons */}
            <div className="mb-5 space-y-2.5">
              <OAuthButton
                provider="Google"
                onClick={() => handleOAuth("Google")}
                icon={
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                }
              />
              <OAuthButton
                provider="Apple"
                onClick={() => handleOAuth("Apple")}
                icon={
                  <svg className="h-4 w-4 fill-current text-[#0F0F12]" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                }
              />
              <OAuthButton
                provider="GitHub"
                onClick={() => handleOAuth("GitHub")}
                icon={
                  <svg className="h-4 w-4 fill-current text-[#0F0F12]" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                }
              />
            </div>

            {/* Divider */}
            <div className="relative mb-5 flex items-center">
              <div className="flex-1 border-t border-[#E8E8EC]" />
              <span className="mx-3 text-xs font-medium text-[#A3A3AC]">or continue with email</span>
              <div className="flex-1 border-t border-[#E8E8EC]" />
            </div>

            {/* Email/password form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "signup" && (
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-[#404049]">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E8EC] bg-white px-3.5 py-2.5 text-sm text-[#0F0F12] placeholder-[#A3A3AC] outline-none transition-colors focus:border-[#7660A8] focus:ring-2 focus:ring-[#7660A8]/10"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[#404049]">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8EC] bg-white px-3.5 py-2.5 text-sm text-[#0F0F12] placeholder-[#A3A3AC] outline-none transition-colors focus:border-[#7660A8] focus:ring-2 focus:ring-[#7660A8]/10"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-[#404049]">
                    Password
                  </label>
                  {mode === "login" && (
                    <a href="#" className="text-xs font-medium text-[#7660A8] hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "signup" ? "Min. 8 characters" : "••••••••"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E8EC] bg-white px-3.5 py-2.5 pr-10 text-sm text-[#0F0F12] placeholder-[#A3A3AC] outline-none transition-colors focus:border-[#7660A8] focus:ring-2 focus:ring-[#7660A8]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3AC] hover:text-[#5A5A66]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-lg bg-[#FBE9E7] px-3 py-2 text-xs font-medium text-[#B3261E]">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "group flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all",
                  loading
                    ? "cursor-not-allowed bg-[#B0A4CE]"
                    : "bg-[#7660A8] hover:bg-[#5C4A8E] hover:shadow-md active:bg-[#4A3878]"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {mode === "login" ? "Signing in…" : "Creating account…"}
                  </span>
                ) : (
                  <>
                    {mode === "login" ? "Sign in" : "Create free account"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {mode === "signup" && (
                <p className="text-center text-[11px] text-[#A3A3AC]">
                  By signing up you agree to our{" "}
                  <a href="#" className="text-[#7660A8] hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-[#7660A8] hover:underline">Privacy Policy</a>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#7660A8] border-t-transparent" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
