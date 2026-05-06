"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Dashboard() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [results, setResults] = useState<{
    suggestedReply: string;
    toneAnalysis: string;
    followUpReminder: string;
  } | null>(null);

  const handleSmartReply = () => {
    setResults({
      suggestedReply: "Thank you for your email. I will review this and get back to you shortly.",
      toneAnalysis: "Professional",
      followUpReminder: "Follow up in 2 business days if no response",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#DC2626] px-6 py-4 flex items-center gap-3">
        <Mail className="h-6 w-6 text-white" />
        <h1 className="text-xl font-semibold text-white">DClaw Email</h1>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Compose</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none"
              placeholder="alice@example.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none"
              placeholder="Meeting follow-up"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Draft body</label>
            <textarea
              className="w-full h-48 rounded-lg border border-gray-300 p-4 text-sm focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none resize-none"
              placeholder="Write your message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            onClick={handleSmartReply}
            className="rounded-md bg-[#DC2626] px-6 py-3 text-white font-medium hover:bg-[#b91c1c] transition-colors"
          >
            Smart Reply
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Results</h2>
          {results ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Suggested Reply</h3>
                <p className="text-gray-800 text-sm leading-relaxed">{results.suggestedReply}</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Tone Analysis</h3>
                <p className="text-2xl font-bold text-[#DC2626]">{results.toneAnalysis}</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Follow-up Reminder</h3>
                <p className="text-gray-800 text-sm">{results.followUpReminder}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-12 shadow-sm border border-gray-200 text-center text-gray-500">
              Use Smart Reply to see results
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
