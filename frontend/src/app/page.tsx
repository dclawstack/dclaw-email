import Link from "next/link"
import { Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8F6FB] px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand shadow-brand">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F0F12]">DClaw Mail</h1>
          <p className="mt-2 text-lg text-[#5A5A66]">
            Smart inbox — turn every email into a tracked next action
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-pill bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors shadow-brand"
        >
          Open Inbox
        </Link>
      </div>
    </main>
  )
}
