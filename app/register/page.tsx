"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/v1/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName, email, password }) });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error?.message ?? "Unable to create account.");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return <main className="min-h-screen bg-ink px-6 py-10 text-white"><div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center"><Link href="/" className="mb-10 text-sm font-semibold tracking-[0.25em] text-cyan">NEXORA</Link><div className="rounded-3xl border border-line bg-panel p-8"><p className="text-sm uppercase tracking-[0.2em] text-cyan">Create workspace</p><h1 className="mt-3 text-3xl font-semibold">Start with NEXORA</h1><p className="mt-3 text-sm text-slate-400">Create your secure financial intelligence workspace.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm text-slate-300">Display name<input required minLength={2} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-white outline-none focus:border-cyan" /></label><label className="block text-sm text-slate-300">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-white outline-none focus:border-cyan" /></label><label className="block text-sm text-slate-300">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-white outline-none focus:border-cyan" /></label>{error && <p role="alert" className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-cyan px-4 py-3 font-bold text-ink disabled:opacity-60">{loading ? "Creating account…" : "Create account"}</button></form><p className="mt-6 text-sm text-slate-400">Already registered? <Link href="/login" className="font-semibold text-white hover:text-cyan">Sign in</Link></p></div></div></main>;
}
