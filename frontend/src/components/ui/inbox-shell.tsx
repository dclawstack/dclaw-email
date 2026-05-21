"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Star, Archive, Inbox, Tag, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessageItem {
  id: string;
  from_address: string;
  subject: string | null;
  snippet: string | null;
  received_at: string | null;
  is_read: boolean;
  is_starred: boolean;
  is_archived: boolean;
}

interface InboxShellProps {
  messages: MessageItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onArchive: (id: string) => void;
  onStar: (id: string) => void;
  readingPane?: React.ReactNode;
  sidebarExtras?: React.ReactNode;
}

const NAV_ITEMS = [
  { icon: Inbox, label: "Inbox", shortcut: "gi" },
  { icon: Star, label: "Starred", shortcut: "gs" },
  { icon: Archive, label: "Archive", shortcut: "ga" },
  { icon: Tag, label: "Labels", shortcut: "gl" },
];

export function InboxShell({
  messages,
  selectedId,
  onSelect,
  onArchive,
  onStar,
  readingPane,
  sidebarExtras,
}: InboxShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Inbox");
  const [showShortcuts, setShowShortcuts] = useState(false);

  const selectedIndex = messages.findIndex((m) => m.id === selectedId);

  const navigateUp = useCallback(() => {
    if (selectedIndex > 0) onSelect(messages[selectedIndex - 1].id);
    else if (messages.length > 0) onSelect(messages[0].id);
  }, [selectedIndex, messages, onSelect]);

  const navigateDown = useCallback(() => {
    if (selectedIndex < messages.length - 1) onSelect(messages[selectedIndex + 1].id);
    else if (messages.length > 0) onSelect(messages[messages.length - 1].id);
  }, [selectedIndex, messages, onSelect]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "j": navigateDown(); break;
        case "k": navigateUp(); break;
        case "e": if (selectedId) onArchive(selectedId); break;
        case "s": if (selectedId) onStar(selectedId); break;
        case "?": setShowShortcuts((v) => !v); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigateDown, navigateUp, selectedId, onArchive, onStar]);

  return (
    <div className="flex h-screen bg-[#F8F8FA] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-[#E8E8EC] bg-white transition-all duration-200",
          sidebarOpen ? "w-56" : "w-14"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-[#E8E8EC]">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#7660A8] flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-[15px] font-semibold text-[#0F0F12] truncate">DClaw Mail</span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={cn(
                "w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
                activeNav === label
                  ? "bg-[#F1EEF8] text-[#7660A8]"
                  : "text-[#404049] hover:bg-[#F2F2F4]"
              )}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </button>
          ))}
          {sidebarExtras}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="flex items-center justify-center h-10 border-t border-[#E8E8EC] text-[#7A7A85] hover:text-[#7660A8] transition-colors"
          title={sidebarOpen ? "Collapse" : "Expand"}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {/* Message list pane */}
      <div className="flex flex-col w-80 flex-shrink-0 border-r border-[#E8E8EC] bg-white overflow-hidden">
        {/* Pane header */}
        <div className="flex items-center gap-2 px-4 h-14 border-b border-[#E8E8EC]">
          <Search className="w-4 h-4 text-[#A3A3AC]" />
          <span className="text-sm font-semibold text-[#0F0F12] flex-1">{activeNav}</span>
          <span className="text-xs text-[#A3A3AC]">{messages.length}</span>
        </div>

        {/* Message rows */}
        <ul className="flex-1 overflow-y-auto divide-y divide-[#F2F2F4]">
          {messages.length === 0 ? (
            <li className="flex flex-col items-center justify-center py-16 text-[#A3A3AC]">
              <Inbox className="w-8 h-8 mb-2" />
              <p className="text-sm">All caught up</p>
            </li>
          ) : (
            messages.map((msg) => (
              <li key={msg.id}>
                <button
                  onClick={() => onSelect(msg.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 transition-colors",
                    selectedId === msg.id
                      ? "bg-[#F1EEF8] border-l-2 border-[#7660A8]"
                      : "hover:bg-[#F8F6FB]"
                  )}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={cn(
                        "text-sm truncate max-w-[160px]",
                        msg.is_read ? "font-normal text-[#5A5A66]" : "font-semibold text-[#0F0F12]"
                      )}
                    >
                      {msg.from_address}
                    </span>
                    <span className="text-xs text-[#A3A3AC] flex-shrink-0 ml-2">
                      {msg.received_at
                        ? new Date(msg.received_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm truncate",
                      msg.is_read ? "font-normal text-[#5A5A66]" : "font-medium text-[#1A1A20]"
                    )}
                  >
                    {msg.subject || "(no subject)"}
                  </p>
                  <p className="text-xs text-[#7A7A85] truncate mt-0.5">{msg.snippet}</p>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Reading pane */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {readingPane ?? (
          <div className="flex flex-col items-center justify-center flex-1 text-[#A3A3AC]">
            <Mail className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">Select an email to read</p>
            <p className="text-xs mt-1">Press <kbd className="px-1.5 py-0.5 bg-[#F2F2F4] rounded text-[#5A5A66] font-mono text-xs">?</kbd> for shortcuts</p>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts overlay */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#0F0F12]">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-[#A3A3AC] hover:text-[#7660A8]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <dl className="space-y-2 text-sm">
              {[
                ["j", "Next message"],
                ["k", "Previous message"],
                ["e", "Archive selected"],
                ["s", "Star/unstar"],
                ["gi", "Go to Inbox"],
                ["/", "Search (coming soon)"],
                ["r", "Reply (coming soon)"],
                ["?", "Toggle shortcuts"],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between">
                  <dt>
                    <kbd className="px-2 py-0.5 bg-[#F1EEF8] text-[#7660A8] rounded font-mono text-xs font-semibold">
                      {key}
                    </kbd>
                  </dt>
                  <dd className="text-[#5A5A66]">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
