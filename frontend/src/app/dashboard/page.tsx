"use client";

import { useState, useEffect, useCallback } from "react";
import { InboxShell, type MessageItem } from "@/components/ui/inbox-shell";
import { listMessages, updateMessage, listAccounts, type Message } from "@/lib/api";
import { Mail, User, Clock } from "lucide-react";

function toMessageItem(m: Message): MessageItem {
  return {
    id: m.id,
    from_address: m.from_address,
    subject: m.subject,
    snippet: m.snippet,
    received_at: m.received_at,
    is_read: m.is_read,
    is_starred: m.is_starred,
    is_archived: m.is_archived,
  };
}

export default function Dashboard() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const accounts = await listAccounts();
        if (accounts.length > 0) {
          setAccountId(accounts[0].id);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!accountId) return;
    (async () => {
      const result = await listMessages({ account_id: accountId, limit: 50 });
      setMessages(result.items);
    })();
  }, [accountId]);

  const handleSelect = useCallback(
    async (id: string) => {
      setSelectedId(id);
      const msg = messages.find((m) => m.id === id);
      if (msg && !msg.is_read) {
        const updated = await updateMessage(id, { is_read: true });
        setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      }
    },
    [messages]
  );

  const handleArchive = useCallback(async (id: string) => {
    const updated = await updateMessage(id, { is_archived: true });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const handleStar = useCallback(async (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    const updated = await updateMessage(id, { is_starred: !msg.is_starred });
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
  }, [messages]);

  const selectedMsg = messages.find((m) => m.id === selectedId);

  const readingPane = selectedMsg ? (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="px-8 py-5 border-b border-[#E8E8EC]">
        <h1 className="text-xl font-semibold text-[#0F0F12] mb-3">
          {selectedMsg.subject || "(no subject)"}
        </h1>
        <div className="flex items-center gap-4 text-sm text-[#5A5A66]">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {selectedMsg.from_address}
          </span>
          {selectedMsg.received_at && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(selectedMsg.received_at).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-6 text-[#404049] text-sm leading-relaxed whitespace-pre-wrap">
        {selectedMsg.body_text || selectedMsg.snippet || "(no body)"}
      </div>
    </div>
  ) : null;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F8FA]">
        <div className="flex items-center gap-2 text-[#7660A8]">
          <Mail className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Loading DClaw Mail…</span>
        </div>
      </div>
    );
  }

  return (
    <InboxShell
      messages={messages.map(toMessageItem)}
      selectedId={selectedId}
      onSelect={handleSelect}
      onArchive={handleArchive}
      onStar={handleStar}
      readingPane={readingPane}
    />
  );
}
