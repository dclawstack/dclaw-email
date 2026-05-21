"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, Sparkles, Keyboard, Clock, Inbox, Shield,
  ArrowRight, Mail, Check, ChevronRight, Menu, X,
  Users, Search,
} from "lucide-react";

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8E8EC]/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7660A8]">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-[#0F0F12]">DClaw Mail</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {["Features", "Pricing", "Changelog", "Blog"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-[#5A5A66] transition-colors hover:text-[#0F0F12]">
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth"
            className="text-sm font-medium text-[#5A5A66] transition-colors hover:text-[#0F0F12]">
            Log in
          </Link>
          <Link href="/auth?mode=signup"
            className="rounded-pill bg-[#7660A8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5C4A8E] hover:shadow-brand active:bg-[#4A3878]">
            Start for free
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-[#5A5A66]" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#E8E8EC] bg-white px-6 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {["Features", "Pricing", "Changelog", "Blog"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-[#5A5A66]" onClick={() => setOpen(false)}>
                {item}
              </a>
            ))}
            <Link href="/auth"
              className="mt-2 rounded-lg border border-[#E8E8EC] px-4 py-2.5 text-center text-sm font-semibold text-[#0F0F12]">
              Log in
            </Link>
            <Link href="/auth?mode=signup"
              className="rounded-lg bg-[#7660A8] px-4 py-2.5 text-center text-sm font-semibold text-white">
              Start for free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── App Mockup ───────────────────────────────────────────────────────────────

function AppMockup() {
  const emails = [
    { from: "Paul Graham", label: "YC", subject: "Re: YC application — we're interested", time: "9:15 AM", read: false },
    { from: "Roelof Botha", label: "Funding", subject: "Series A term sheet ready for review", time: "8:42 AM", read: false },
    { from: "Sam Altman", label: null, subject: "OpenAI × DClaw Mail partnership", time: "7:30 AM", read: false },
    { from: "Alex Kim", label: "Team", subject: "🎉 We crossed $2M ARR", time: "Yesterday", read: true },
    { from: "Adora Cheung", label: "YC", subject: "Demo Day slot confirmed — 4:30pm", time: "Yesterday", read: true },
  ];

  const labelColors: Record<string, string> = {
    YC: "#C28A00", Funding: "#2E8B57", Team: "#7660A8",
  };

  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white shadow-[0_32px_80px_rgba(15,15,18,0.12)]">
      {/* Browser chrome */}
      <div className="flex h-8 items-center gap-2 border-b border-[#E8E8EC] bg-[#F8F8FA] px-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex h-4 w-48 items-center rounded border border-[#E8E8EC] bg-white px-2">
          <span className="text-[9px] text-[#A3A3AC]">app.dclawmail.com/inbox</span>
        </div>
      </div>

      <div className="flex h-[340px]">
        {/* Sidebar */}
        <aside className="w-36 shrink-0 border-r border-[#E8E8EC] bg-white py-2">
          <div className="mb-2 flex items-center gap-1.5 px-3 py-1">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#7660A8]">
              <Mail className="h-3 w-3 text-white" />
            </div>
            <span className="text-[11px] font-semibold text-[#0F0F12]">DClaw Mail</span>
          </div>
          {[
            { name: "Inbox", count: 9, active: true },
            { name: "Starred", count: null, active: false },
            { name: "Sent", count: null, active: false },
            { name: "Archive", count: null, active: false },
          ].map(({ name, count, active }) => (
            <div key={name}
              className={`mx-1 flex items-center gap-1.5 rounded px-2 py-1.5 text-[10px] font-medium ${active ? "bg-[#F1EEF8] text-[#7660A8]" : "text-[#5A5A66]"}`}>
              <div className={`h-2.5 w-2.5 rounded-sm ${active ? "bg-[#7660A8]" : "bg-[#D6D6D6]"}`} />
              {name}
              {count && <span className="ml-auto rounded-full bg-[#7660A8] px-1 text-[8px] text-white">{count}</span>}
            </div>
          ))}
          <div className="mt-2 border-t border-[#E8E8EC] pt-2">
            <div className="px-3 pb-1 text-[8px] font-semibold uppercase tracking-wide text-[#A3A3AC]">Labels</div>
            {["YC", "Funding", "Team", "Enterprise"].map((label) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1 text-[10px] text-[#5A5A66]">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: labelColors[label] ?? "#A3A3AC" }} />
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* Email list */}
        <div className="w-52 shrink-0 overflow-hidden border-r border-[#E8E8EC] bg-white">
          <div className="border-b border-[#E8E8EC] px-3 py-1.5">
            <span className="text-[10px] font-semibold text-[#0F0F12]">Inbox</span>
            <span className="ml-1 text-[10px] text-[#A3A3AC]">9 unread</span>
          </div>
          {emails.map((email, i) => (
            <div key={i}
              className={`border-b border-[#F2F2F4] px-2.5 py-2 ${i === 0 ? "border-l-2 border-l-[#7660A8] bg-[#F8F6FB]" : ""}`}>
              <div className="flex items-center justify-between">
                <span className={`max-w-[110px] truncate text-[10px] ${!email.read ? "font-semibold text-[#0F0F12]" : "font-normal text-[#5A5A66]"}`}>
                  {email.from}
                </span>
                <span className="shrink-0 text-[8px] text-[#A3A3AC]">{email.time}</span>
              </div>
              <div className={`mt-0.5 truncate text-[10px] ${!email.read ? "font-medium text-[#1A1A20]" : "text-[#7A7A85]"}`}>
                {email.subject}
              </div>
              {email.label && (
                <div className="mt-1">
                  <span className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold"
                    style={{ background: labelColors[email.label] + "22", color: labelColors[email.label] }}>
                    {email.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reading pane */}
        <div className="flex-1 bg-white p-4">
          <div className="mb-3 border-b border-[#F2F2F4] pb-3">
            <p className="text-[12px] font-semibold text-[#0F0F12]">Re: YC application — we&apos;re genuinely interested</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7660A8] text-[8px] font-bold text-white">PG</div>
              <div>
                <p className="text-[10px] font-medium text-[#0F0F12]">Paul Graham</p>
                <p className="text-[9px] text-[#A3A3AC]">pg@ycombinator.com</p>
              </div>
              <span className="ml-auto text-[9px] text-[#A3A3AC]">9:15 AM</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[100, 85, 100, 72, null, 100, 78, 55].map((w, i) =>
              w ? (
                <div key={i} className="h-1.5 rounded bg-[#F2F2F4]" style={{ width: `${w}%` }} />
              ) : (
                <div key={i} className="h-2.5" />
              )
            )}
            <div className="mt-3 flex gap-2">
              <div className="rounded-pill bg-[#7660A8] px-3 py-1 text-[9px] font-semibold text-white">Reply</div>
              <div className="rounded-pill border border-[#E8E8EC] px-3 py-1 text-[9px] font-medium text-[#5A5A66]">Forward</div>
              <div className="ml-auto flex items-center gap-1 rounded-pill bg-[#F1EEF8] px-2 py-1">
                <Sparkles className="h-2.5 w-2.5 text-[#7660A8]" />
                <span className="text-[8px] font-semibold text-[#7660A8]">AI Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[#7660A8]/6 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 -right-32 h-[400px] w-[400px] rounded-full bg-[#9384BD]/8 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E2DCEE] bg-[#F8F6FB] px-3.5 py-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7660A8]" />
              <span className="text-xs font-semibold text-[#7660A8]">Now in private beta · Powered by AI</span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.06] tracking-tight text-[#0F0F12] lg:text-6xl">
              The fastest{" "}
              <span className="bg-gradient-to-br from-[#4A3878] via-[#7660A8] to-[#9384BD] bg-clip-text text-transparent">
                email experience
              </span>{" "}
              ever built.
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-[#5A5A66]">
              DClaw Mail is an AI-native inbox that triages, drafts, and prioritizes your email so
              you can get to inbox zero in minutes — not hours. Built for knowledge workers who
              refuse to let email own their day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/auth?mode=signup"
                className="group inline-flex items-center gap-2 rounded-pill bg-[#7660A8] px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all hover:bg-[#5C4A8E] hover:shadow-lg active:bg-[#4A3878]">
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/dashboard?demo=true"
                className="inline-flex items-center gap-2 rounded-pill border border-[#E8E8EC] bg-white px-6 py-3 text-sm font-semibold text-[#0F0F12] transition-all hover:border-[#C9C0DE] hover:bg-[#F8F6FB]">
                View live demo
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-5">
              {["Free forever plan", "No credit card", "Setup in 60 seconds"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs font-medium text-[#7A7A85]">
                  <Check className="h-3.5 w-3.5 text-[#2E8B57]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: app mockup */}
          <div className="relative hidden lg:block">
            <div className="relative -mr-8 translate-y-2 scale-[0.96]">
              <AppMockup />
            </div>
            {/* Floating badges */}
            <div className="absolute -left-8 top-10 animate-[float_3s_ease-in-out_infinite] rounded-xl border border-[#E2DCEE] bg-white px-3 py-2 shadow-md">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F4EC] text-[10px] font-bold text-[#2E8B57]">AI</div>
                <div>
                  <p className="text-[10px] font-semibold text-[#0F0F12]">Triage complete</p>
                  <p className="text-[9px] text-[#A3A3AC]">9 emails → 3 actions</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 bottom-24 rounded-xl border border-[#E2DCEE] bg-white px-3 py-2 shadow-md">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#C28A00]" />
                <div>
                  <p className="text-[10px] font-semibold text-[#0F0F12]">Inbox zero</p>
                  <p className="text-[9px] text-[#A3A3AC]">Achieved in 4 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

const COMPANIES = [
  "Y Combinator", "Stripe", "Linear", "Vercel", "Notion",
  "Figma", "Anthropic", "Loom", "Retool", "Brex",
];

function SocialProof() {
  return (
    <section className="border-y border-[#E8E8EC] bg-[#F8F8FA] py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-widest text-[#A3A3AC]">
        Trusted by teams at
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap">
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
            <span key={i}
              className="inline-block text-sm font-semibold text-[#D6D6D6] transition-colors hover:text-[#A3A3AC]">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Inbox Triage",
    desc: "Your AI copilot reads every email, classifies priority, drafts replies, and surfaces the 3 things that actually need your attention — before you open the app.",
    tag: "P0 Core",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Under 100ms from keypress to response. No spinners. No lag. The UI was designed to feel like a native app running locally, even on mobile data.",
    tag: "< 100ms",
  },
  {
    icon: Keyboard,
    title: "Keyboard-First",
    desc: "60+ shortcuts map the entire inbox to your fingertips. Superhuman alumni helped design the keymap. Reach inbox zero without touching the mouse.",
    tag: "60+ shortcuts",
  },
  {
    icon: Clock,
    title: "Smart Snooze",
    desc: "Send emails to the future. AI predicts the optimal time for your recipient to open and engage, then resurfaces your message at the exact right moment.",
    tag: "AI timing",
  },
  {
    icon: Inbox,
    title: "Unified Inbox",
    desc: "Connect Gmail, Outlook, and IMAP accounts. One beautiful view. AI cross-references your calendar, docs, and CRM contacts so context is always there.",
    tag: "Multi-account",
  },
  {
    icon: Users,
    title: "Team Inboxes",
    desc: "Shared support@ and sales@ inboxes with real-time collision detection, AI workload balancing, and SLA tracking. Built for teams that move at startup speed.",
    tag: "Tier 2",
  },
  {
    icon: Search,
    title: "Semantic Search",
    desc: "\"What did Sarah say about the Q2 budget?\" — just type it. pgvector-powered search across 100K emails in under a second, in plain language.",
    tag: "pgvector",
  },
  {
    icon: Shield,
    title: "Encrypted & Private",
    desc: "End-to-end encrypted at rest and in transit. Your email data is never used to train AI models. SOC 2 Type II in progress. GDPR compliant from day one.",
    tag: "SOC 2",
  },
];

function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7660A8]">Features</p>
          <h2 className="text-4xl font-bold tracking-tight text-[#0F0F12]">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#5A5A66]">
            Built for power users from day one. Every interaction has been obsessed over
            to shave milliseconds and cognitive load.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
            <div key={title}
              className="group relative overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9C0DE] hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F1EEF8]">
                  <Icon className="h-4.5 w-4.5 text-[#7660A8]" size={18} />
                </div>
                <span className="rounded-full border border-[#E2DCEE] px-2 py-0.5 text-[10px] font-semibold text-[#7660A8]">
                  {tag}
                </span>
              </div>
              <h3 className="mb-1.5 text-[15px] font-semibold text-[#0F0F12]">{title}</h3>
              <p className="text-[13px] leading-relaxed text-[#5A5A66]">{desc}</p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r from-[#7660A8] to-[#9384BD] transition-transform duration-200 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Connect your accounts",
    desc: "Link Gmail, Outlook, or any IMAP account in 30 seconds. No IT setup. No forwarding rules. OAuth-secure connection, full sync in under 2 minutes.",
  },
  {
    num: "02",
    title: "AI learns your patterns",
    desc: "DClaw Mail studies your communication style, priority signals, and response patterns. By day 3, the triage is eerily accurate. By week 2, it drafts like you.",
  },
  {
    num: "03",
    title: "Inbox zero, on repeat",
    desc: "Every morning you open a pre-triaged inbox with 3–5 priorities. The rest is handled, snoozed, or archived automatically. Never get overwhelmed again.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#F8F6FB] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7660A8]">How it works</p>
          <h2 className="text-4xl font-bold tracking-tight text-[#0F0F12]">From setup to inbox zero in 3 steps</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="relative">
              <div className="mb-5 text-6xl font-black leading-none text-[#E2DCEE]">{num}</div>
              <div className="absolute top-2 left-16 h-[1px] w-full bg-gradient-to-r from-[#C9C0DE] to-transparent md:block hidden" />
              <h3 className="mb-2 text-xl font-semibold text-[#0F0F12]">{title}</h3>
              <p className="text-[15px] leading-relaxed text-[#5A5A66]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "DClaw Mail cut my email time in half. The AI triage alone is worth 10× the subscription price. I get to inbox zero every single morning for the first time in 8 years.",
    name: "Zara Ahmed",
    role: "CTO at Finara (YC W24)",
    avatar: "ZA",
    color: "#7660A8",
  },
  {
    quote: "Finally an email client that moves as fast as I think. The keyboard shortcuts are insane — I archived 200 emails in under 5 minutes. My team thought I was a wizard.",
    name: "Marcus Liu",
    role: "Founder, Buildstack (Sequoia-backed)",
    avatar: "ML",
    color: "#2E8B57",
  },
  {
    quote: "I ran a YC batch and wished every founder in it used DClaw Mail for investor updates. The AI draft + thread summarization would have saved everyone hours every week.",
    name: "Sofia Reyes",
    role: "YC Group Partner Alum & Angel Investor",
    avatar: "SR",
    color: "#C28A00",
  },
];

function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7660A8]">Testimonials</p>
          <h2 className="text-4xl font-bold tracking-tight text-[#0F0F12]">
            Loved by the people who live in their inbox
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, avatar, color }) => (
            <div key={name}
              className="flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <p className="mb-6 text-[15px] leading-relaxed text-[#404049]">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: color }}>
                  {avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F0F12]">{name}</p>
                  <p className="text-xs text-[#7A7A85]">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A3878] via-[#7660A8] to-[#9384BD] px-10 py-16 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#C9C0DE]">Ready to join?</p>
            <h2 className="mb-4 text-4xl font-bold text-white">
              Stop letting email own your day.
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base text-[#C9C0DE]">
              Join 2,400+ knowledge workers who&apos;ve switched to the AI-native inbox.
              Free forever for individuals. Setup in 60 seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/auth?mode=signup"
                className="group inline-flex items-center gap-2 rounded-pill bg-white px-7 py-3.5 text-sm font-bold text-[#7660A8] transition-all hover:bg-[#F8F6FB] hover:shadow-lg">
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/dashboard?demo=true"
                className="inline-flex items-center gap-2 rounded-pill border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                View demo inbox
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = {
    Product: ["Features", "Changelog", "Roadmap", "Pricing"],
    Company: ["About", "Blog", "Careers", "Press kit"],
    Legal: ["Privacy", "Terms", "Security", "GDPR"],
    Support: ["Documentation", "API Reference", "Status", "Contact"],
  };

  return (
    <footer className="border-t border-[#E8E8EC] bg-[#0F0F12] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7660A8]">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white">DClaw Mail</span>
            </div>
            <p className="text-sm leading-relaxed text-[#5A5A66]">
              The AI-native inbox built for knowledge workers who refuse to let email own their day.
            </p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#5A5A66]">{section}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#404049] transition-colors hover:text-white">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#1A1A20] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[#404049]">© 2026 DClaw Mail, Inc. All rights reserved.</p>
          <p className="text-xs text-[#404049]">Part of the <span className="text-[#7660A8]">DClaw Stack</span> — the AI-native vertical SaaS platform.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .rounded-pill { border-radius: 999px; }
        .shadow-brand { box-shadow: 0 12px 28px rgba(118,96,168,0.28); }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
