import Link from "next/link";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <Mail className="h-16 w-16 text-[#DC2626] mb-6" />
      <h1 className="text-4xl font-bold text-[#DC2626] mb-4">DClaw Email</h1>
      <p className="text-lg text-gray-600 mb-8">Smart inbox, auto-reply & scheduling</p>
      <Link
        href="/dashboard"
        className="rounded-md bg-[#DC2626] px-6 py-3 text-white font-medium hover:bg-[#b91c1c] transition-colors"
      >
        Open Dashboard
      </Link>
    </main>
  );
}
