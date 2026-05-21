"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail, Star, Archive, Inbox, Tag, ChevronLeft, ChevronRight,
  Search, X, Sparkles, Clock, User, Reply, Forward,
  CornerUpLeft, Trash2, MoreHorizontal, Zap, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SEED_EMAILS, LABEL_META, type SeedEmail, type LabelName } from "@/lib/seed-data";
import { listMessages, updateMessage, listAccounts, type Message } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DisplayEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  readStatus: boolean;
  starred: boolean;
  archived: boolean;
  labels: LabelName[];
  avatar: string;
  avatarColor: string;
  isDemo: boolean;
}

function seedToDisplay(s: SeedEmail): DisplayEmail {
  return { ...s, isDemo: true };
}

function apiToDisplay(m: Message): DisplayEmail {
  return {
    id: m.id,
    senderName: m.from_address.split("@")[0],
    senderEmail: m.from_address,
    subject: m.subject ?? "(no subject)",
    snippet: m.snippet ?? "",
    body: m.body_text ?? m.snippet ?? "(no body)",
    timestamp: m.received_at ?? m.created_at,
    readStatus: m.is_read,
    starred: m.is_starred,
    archived: m.is_archived,
    labels: [],
    avatar: m.from_address.slice(0, 2).toUpperCase(),
    avatarColor: "#7660A8",
    isDemo: false,
  };
}

// ─── Relative time ────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Yesterday";
  if (diffD < 7) return d.toLocaleDateString(undefined, { weekday: "short" });
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// ─── Demo banner ──────────────────────────────────────────────────────────────

function DemoBanner() {
  return (
    <div className="flex items-center gap-2 border-b border-[#FBF1DC] bg-[#FBF1DC] px-4 py-2">
      <Zap className="h-3.5 w-3.5 shrink-0 text-[#C28A00]" />
      <p className="text-xs font-medium text-[#C28A00]">
        Demo mode — showing 20 realistic YC-stage emails.{" "}
        <Link href="/auth?mode=signup" className="font-semibold underline hover:no-underline">
          Sign up free
        </Link>{" "}
        to connect your real inbox.
      </p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "inbox",   icon: Inbox,   label: "Inbox" },
  { id: "starred", icon: Star,    label: "Starred" },
  { id: "archive", icon: Archive, label: "Archive" },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  activeNav: string;
  setActiveNav: (v: string) => void;
  activeLabel: LabelName | null;
  setActiveLabel: (v: LabelName | null) => void;
  unreadCount: number;
}

function Sidebar({ open, onToggle, activeNav, setActiveNav, activeLabel, setActiveLabel, unreadCount }: SidebarProps) {
  const labels: LabelName[] = ["YC", "Funding", "Team", "Enterprise", "Press", "Legal", "Customer", "Board"];

  return (
    <aside className={cn(
      "flex flex-col border-r border-[#E8E8EC] bg-white transition-all duration-200",
      open ? "w-52" : "w-14"
    )}>
      {/* Logo row */}
      <div className="flex h-13 items-center gap-2.5 border-b border-[#E8E8EC] px-3.5 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7660A8]">
          <Mail className="h-4 w-4 text-white" />
        </div>
        {open && <span className="text-[14px] font-semibold text-[#0F0F12]">DClaw Mail</span>}
      </div>

      {/* Compose button */}
      {open && (
        <div className="px-3 pt-3 pb-1">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7660A8] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5C4A8E]">
            <CornerUpLeft className="h-3.5 w-3.5" />
            Compose
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {NAV.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => { setActiveNav(id); setActiveLabel(null); }}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors",
              activeNav === id && !activeLabel
                ? "bg-[#F1EEF8] text-[#7660A8]"
                : "text-[#404049] hover:bg-[#F2F2F4]"
            )}
            title={!open ? label : undefined}>
            <Icon className="h-4 w-4 shrink-0" />
            {open && (
              <>
                <span className="truncate">{label}</span>
                {id === "inbox" && unreadCount > 0 && (
                  <span className="ml-auto rounded-full bg-[#7660A8] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </>
            )}
          </button>
        ))}

        {/* Labels */}
        {open && (
          <div className="mt-3 pt-3 border-t border-[#E8E8EC]">
            <p className="mb-1 px-2.5 text-[9px] font-semibold uppercase tracking-wider text-[#A3A3AC]">Labels</p>
            {labels.map((lbl) => {
              const meta = LABEL_META[lbl];
              return (
                <button key={lbl}
                  onClick={() => { setActiveLabel(lbl); setActiveNav(""); }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                    activeLabel === lbl ? "bg-[#F1EEF8] text-[#7660A8]" : "text-[#5A5A66] hover:bg-[#F2F2F4]"
                  )}>
                  <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: meta.color }} />
                  {lbl}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Collapse toggle */}
      <button onClick={onToggle}
        className="flex h-10 items-center justify-center border-t border-[#E8E8EC] text-[#A3A3AC] transition-colors hover:text-[#7660A8]">
        {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    </aside>
  );
}

// ─── Email row ────────────────────────────────────────────────────────────────

function EmailRow({
  email, selected, onSelect, onArchive, onStar,
}: {
  email: DisplayEmail;
  selected: boolean;
  onSelect: () => void;
  onArchive: (e: React.MouseEvent) => void;
  onStar: (e: React.MouseEvent) => void;
}) {
  return (
    <li>
      <button onClick={onSelect}
        className={cn(
          "group w-full px-4 py-3 text-left transition-colors",
          selected ? "border-l-2 border-l-[#7660A8] bg-[#F8F6FB]" : "hover:bg-[#F8F8FA]",
          "border-b border-[#F2F2F4]"
        )}>
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: email.avatarColor }}>
            {email.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className={cn(
                "truncate text-[12px]",
                !email.readStatus ? "font-semibold text-[#0F0F12]" : "font-normal text-[#5A5A66]"
              )}>
                {email.senderName}
              </span>
              <span className="ml-2 shrink-0 text-[10px] text-[#A3A3AC]">{relativeTime(email.timestamp)}</span>
            </div>
            <p className={cn(
              "truncate text-[12px]",
              !email.readStatus ? "font-medium text-[#1A1A20]" : "text-[#7A7A85]"
            )}>
              {email.subject}
            </p>
            <p className="truncate text-[11px] text-[#A3A3AC]">{email.snippet}</p>
            {/* Labels */}
            {email.labels.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {email.labels.slice(0, 2).map((lbl) => {
                  const m = LABEL_META[lbl];
                  return (
                    <span key={lbl} className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                      style={{ background: m.bg, color: m.color }}>
                      {lbl}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Hover actions */}
        <div className="mt-1 hidden items-center gap-2 group-hover:flex">
          <button onClick={onArchive}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-[#7A7A85] hover:bg-[#F1EEF8] hover:text-[#7660A8]">
            <Archive className="h-3 w-3" /> Archive
          </button>
          <button onClick={onStar}
            className={cn(
              "flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium hover:bg-[#FBF1DC]",
              email.starred ? "text-[#C28A00]" : "text-[#7A7A85] hover:text-[#C28A00]"
            )}>
            <Star className={cn("h-3 w-3", email.starred && "fill-current")} />
            {email.starred ? "Starred" : "Star"}
          </button>
        </div>
      </button>
    </li>
  );
}

// ─── Reading pane ─────────────────────────────────────────────────────────────

function ReadingPane({
  email, onArchive, onStar, onClose,
}: {
  email: DisplayEmail;
  onArchive: () => void;
  onStar: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-[#E8E8EC] px-5 py-3">
        <button onClick={onClose} className="mr-1 rounded-lg p-1.5 text-[#7A7A85] hover:bg-[#F2F2F4] hover:text-[#0F0F12]" title="Back">
          <X className="h-4 w-4" />
        </button>
        <button onClick={onArchive} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#5A5A66] hover:bg-[#F2F2F4] hover:text-[#0F0F12]">
          <Archive className="h-3.5 w-3.5" /> Archive
        </button>
        <button onClick={onStar} className={cn(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium hover:bg-[#F2F2F4]",
          email.starred ? "text-[#C28A00]" : "text-[#5A5A66] hover:text-[#C28A00]"
        )}>
          <Star className={cn("h-3.5 w-3.5", email.starred && "fill-current")} />
          {email.starred ? "Starred" : "Star"}
        </button>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="rounded-lg p-1.5 text-[#7A7A85] hover:bg-[#F2F2F4]"><Reply className="h-4 w-4" /></button>
          <button className="rounded-lg p-1.5 text-[#7A7A85] hover:bg-[#F2F2F4]"><Forward className="h-4 w-4" /></button>
          <button className="rounded-lg p-1.5 text-[#7A7A85] hover:bg-[#F2F2F4]"><Trash2 className="h-4 w-4" /></button>
          <button className="rounded-lg p-1.5 text-[#7A7A85] hover:bg-[#F2F2F4]"><MoreHorizontal className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <h1 className="mb-4 text-xl font-bold text-[#0F0F12]">{email.subject}</h1>

        {/* Sender info */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: email.avatarColor }}>
            {email.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-sm font-semibold text-[#0F0F12]">{email.senderName}</span>
                <span className="ml-2 text-xs text-[#A3A3AC]">&lt;{email.senderEmail}&gt;</span>
              </div>
              <span className="text-xs text-[#A3A3AC]">
                {new Date(email.timestamp).toLocaleString(undefined, {
                  weekday: "short", month: "short", day: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </div>
            {/* Labels */}
            {email.labels.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {email.labels.map((lbl) => {
                  const m = LABEL_META[lbl];
                  return (
                    <span key={lbl} className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: m.bg, color: m.color }}>
                      {lbl}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="rounded-xl border border-[#F2F2F4] bg-[#F8F8FA] p-5">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#2B2B33]">
            {email.body}
          </pre>
        </div>

        {/* AI actions */}
        <div className="mt-5 rounded-xl border border-[#E2DCEE] bg-[#F8F6FB] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#7660A8]" />
            <span className="text-xs font-semibold text-[#7660A8]">AI Copilot suggestions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Draft a reply", "Summarize thread", "Set follow-up reminder", "Extract action items"].map((action) => (
              <button key={action}
                className="rounded-lg border border-[#E2DCEE] bg-white px-3 py-1.5 text-xs font-medium text-[#5A5A66] transition-colors hover:border-[#7660A8] hover:text-[#7660A8]">
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Reply box */}
        <div className="mt-5 rounded-xl border border-[#E8E8EC] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <CornerUpLeft className="h-4 w-4 text-[#A3A3AC]" />
            <span className="text-xs font-medium text-[#7A7A85]">Reply to {email.senderName}</span>
          </div>
          <textarea
            className="w-full resize-none rounded-lg border border-[#E8E8EC] p-3 text-sm text-[#0F0F12] placeholder-[#A3A3AC] outline-none focus:border-[#7660A8] focus:ring-2 focus:ring-[#7660A8]/10"
            rows={4}
            placeholder="Write a reply… or press ⌘K for AI draft"
          />
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-[#7660A8] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5C4A8E]">
                <Reply className="h-3.5 w-3.5" /> Send
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-[#E2DCEE] bg-[#F8F6FB] px-3 py-1.5 text-xs font-semibold text-[#7660A8] transition-colors hover:bg-[#F1EEF8]">
                <Sparkles className="h-3.5 w-3.5" /> AI Draft
              </button>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#7A7A85] hover:bg-[#F2F2F4]">
              <Clock className="h-3.5 w-3.5" /> Send later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

function DashboardContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [emails, setEmails] = useState<DisplayEmail[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("inbox");
  const [activeLabel, setActiveLabel] = useState<LabelName | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    (async () => {
      if (isDemo) {
        setEmails(SEED_EMAILS.map(seedToDisplay));
        setLoading(false);
        return;
      }
      try {
        const accounts = await listAccounts();
        if (accounts.length === 0) {
          setEmails(SEED_EMAILS.map(seedToDisplay));
        } else {
          const result = await listMessages({ account_id: accounts[0].id, limit: 50 });
          setEmails(result.items.map(apiToDisplay));
        }
      } catch {
        setEmails(SEED_EMAILS.map(seedToDisplay));
      } finally {
        setLoading(false);
      }
    })();
  }, [isDemo]);

  // Filter
  const filtered = emails.filter((e) => {
    if (e.archived && activeNav !== "archive") return false;
    if (activeNav === "starred" && !e.starred) return false;
    if (activeNav === "archive" && !e.archived) return false;
    if (activeLabel && !e.labels.includes(activeLabel)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        e.senderName.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.snippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedEmail = emails.find((e) => e.id === selectedId) ?? null;
  const unreadCount = emails.filter((e) => !e.readStatus && !e.archived).length;

  // Actions
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, readStatus: true } : e));
  }, []);

  const handleArchive = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, archived: true } : e));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const handleStar = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, starred: !e.starred } : e));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = filtered.findIndex((m) => m.id === selectedId);
      switch (e.key) {
        case "j": {
          const next = filtered[Math.min(idx + 1, filtered.length - 1)];
          if (next) handleSelect(next.id);
          break;
        }
        case "k": {
          const prev = filtered[Math.max(idx - 1, 0)];
          if (prev) handleSelect(prev.id);
          break;
        }
        case "e": if (selectedId) handleArchive(selectedId); break;
        case "s": if (selectedId) handleStar(selectedId); break;
        case "Escape": setSelectedId(null); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, selectedId, handleSelect, handleArchive, handleStar]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F8FA]">
        <div className="flex items-center gap-2.5 text-[#7660A8]">
          <Mail className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-medium">Loading DClaw Mail…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8F8FA] font-sans">
      {/* Demo banner */}
      {(isDemo || emails.some((e) => e.isDemo)) && <DemoBanner />}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
          unreadCount={unreadCount}
        />

        {/* Message list pane */}
        <div className={cn(
          "flex flex-col border-r border-[#E8E8EC] bg-white",
          selectedEmail ? "hidden w-0 lg:flex lg:w-80 lg:shrink-0" : "flex flex-1 lg:w-80 lg:flex-none lg:shrink-0"
        )}>
          {/* Pane header */}
          <div className="border-b border-[#E8E8EC] px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-[#0F0F12] capitalize">
                {activeLabel ?? activeNav}
              </h2>
              <span className="text-xs text-[#A3A3AC]">{filtered.length}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#A3A3AC]" />
              <input
                type="text"
                placeholder="Search emails…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#E8E8EC] bg-[#F8F8FA] py-1.5 pl-8 pr-3 text-xs text-[#0F0F12] placeholder-[#A3A3AC] outline-none focus:border-[#7660A8] focus:bg-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3A3AC] hover:text-[#5A5A66]">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Email list */}
          <ul className="flex-1 overflow-y-auto divide-y-0">
            {filtered.length === 0 ? (
              <li className="flex flex-col items-center justify-center py-16 text-[#A3A3AC]">
                <Inbox className="mb-2 h-8 w-8 opacity-30" />
                <p className="text-sm font-medium">
                  {searchQuery ? "No results" : "All caught up 🎉"}
                </p>
              </li>
            ) : (
              filtered.map((email) => (
                <EmailRow
                  key={email.id}
                  email={email}
                  selected={selectedId === email.id}
                  onSelect={() => handleSelect(email.id)}
                  onArchive={(e) => { e.stopPropagation(); handleArchive(email.id); }}
                  onStar={(e) => { e.stopPropagation(); handleStar(email.id); }}
                />
              ))
            )}
          </ul>

          {/* Keyboard shortcuts hint */}
          <div className="border-t border-[#E8E8EC] px-4 py-2">
            <p className="text-[10px] text-[#A3A3AC]">
              <kbd className="rounded bg-[#F2F2F4] px-1 font-mono">j/k</kbd> navigate ·{" "}
              <kbd className="rounded bg-[#F2F2F4] px-1 font-mono">e</kbd> archive ·{" "}
              <kbd className="rounded bg-[#F2F2F4] px-1 font-mono">s</kbd> star
            </p>
          </div>
        </div>

        {/* Reading pane */}
        <div className={cn(
          "flex-1 overflow-hidden",
          !selectedEmail && "hidden lg:flex lg:items-center lg:justify-center"
        )}>
          {selectedEmail ? (
            <ReadingPane
              email={selectedEmail}
              onArchive={() => handleArchive(selectedEmail.id)}
              onStar={() => handleStar(selectedEmail.id)}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-[#A3A3AC]">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EEF8]">
                <Mail className="h-6 w-6 text-[#C9C0DE]" />
              </div>
              <p className="text-sm font-medium text-[#5A5A66]">Select an email to read</p>
              <p className="mt-1 text-xs">
                Press <kbd className="rounded bg-[#F2F2F4] px-1.5 font-mono">j</kbd> to navigate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#F8F8FA]">
        <div className="flex items-center gap-2.5 text-[#7660A8]">
          <Mail className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-medium">Loading DClaw Mail…</span>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
