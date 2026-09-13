import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";

const cards = [
  ["Market intelligence", "Track supported digital assets and review market conditions.", "/terminal"],
  ["Portfolio workspace", "Connect portfolio data when wallet infrastructure is configured.", "/portfolio"],
  ["Risk center", "Review concentration, exposure and drawdown metrics.", "/risk"],
  ["NEXORA AI", "Ask structured questions about available financial data.", "/terminal"],
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <main className="min-h-screen bg-ink text-white"><nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-line px-6 py-5 lg:px-10"><Link href="/" className="font-bold tracking-[0.25em] text-cyan">NEXORA</Link><div className="flex items-center gap-4 text-sm"><span className="hidden text-slate-400 sm:inline">{user.email}</span><form action="/api/v1/auth/logout" method="post"><button className="rounded-full border border-line px-4 py-2 hover:border-cyan">Sign out</button></form></div></nav><section className="mx-auto max-w-7xl px-6 py-12 lg:px-10"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm uppercase tracking-[0.2em] text-cyan">Private workspace</p><h1 className="mt-3 text-4xl font-semibold md:text-5xl">Good to see you, {user.displayName}.</h1><p className="mt-4 max-w-2xl text-slate-400">Your NEXORA command center. Connect real providers as they become configured.</p></div><span className="w-fit rounded-full border border-amber-800/60 bg-amber-950/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300">Demo data mode</span></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{cards.map(([title, description, href]) => <Link key={title} href={href} className="rounded-2xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-slate-500"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">NEXORA Terminal</p><h2 className="mt-10 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p><span className="mt-8 inline-block text-sm font-semibold text-cyan">Open workspace →</span></Link>)}</div><div className="mt-10 rounded-2xl border border-line bg-panel p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Account status</p><div className="mt-5 grid gap-4 text-sm text-slate-400 sm:grid-cols-3"><div><span className="block text-slate-500">Role</span><strong className="mt-1 block text-white">{user.role}</strong></div><div><span className="block text-slate-500">Email verification</span><strong className="mt-1 block text-white">{user.emailVerifiedAt ? "Verified" : "Pending"}</strong></div><div><span className="block text-slate-500">Access</span><strong className="mt-1 block text-white">Standard workspace</strong></div></div></div></section></main>;
}
