const modules = [
  ["NEXORA AI", "Financial intelligence for research, markets and risk."],
  ["NEXORA Markets", "A structured command center for digital asset data."],
  ["NEXORA Network", "Blockchain infrastructure designed for the next phase."],
  ["NEXORA Pay", "Payment infrastructure for merchants and developers."],
  ["NEXORA Cloud", "APIs, SDKs and developer-grade financial services."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan font-black text-ink">N</div><span className="text-lg font-bold tracking-[0.25em]">NEXORA</span></div>
        <div className="hidden gap-7 text-sm text-slate-400 md:flex"><a href="#platform">Platform</a><a href="#network">Network</a><a href="#developers">Developers</a><a href="#security">Security</a></div>
        <a href="/terminal" className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-cyan">Launch Terminal</a>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10 lg:pt-32">
        <div className="max-w-4xl"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan"><span className="h-2 w-2 rounded-full bg-cyan" /> AI × Finance × Blockchain</div><h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">The Financial Network for the AI Era.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">NEXORA connects intelligent software, digital assets, businesses and financial infrastructure through an open, security-first ecosystem.</p><div className="mt-10 flex flex-wrap gap-4"><a href="/terminal" className="rounded-full bg-cyan px-6 py-3 font-bold text-ink">Explore NEXORA</a><a href="#platform" className="rounded-full border border-line px-6 py-3 font-bold text-white">Discover the platform <span aria-hidden>↗</span></a></div></div>
        <div className="mt-24 grid gap-4 border-y border-line py-5 text-sm text-slate-500 md:grid-cols-3"><div><span className="text-white">01</span> Intelligence layer</div><div><span className="text-white">02</span> Open infrastructure</div><div><span className="text-white">03</span> Permissioned by design</div></div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 pb-24 lg:px-10"><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">One ecosystem. Many capabilities.</p><h2 className="mt-4 text-3xl font-semibold md:text-5xl">Built for useful financial technology.</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{modules.map(([title, text], i) => <div key={title} className="rounded-2xl border border-line bg-panel p-7 transition hover:-translate-y-1 hover:border-slate-500"><div className="mb-14 text-sm text-slate-600">0{i + 1}</div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{text}</p><p className="mt-8 text-xs font-semibold uppercase tracking-widest text-slate-600">Coming soon / In development</p></div>)}</div></section>

      <section id="security" className="border-y border-line bg-panel"><div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Trust is infrastructure</p><h2 className="mt-4 text-3xl font-semibold md:text-4xl">Security before speed. Transparency before hype.</h2></div><div className="space-y-6 text-slate-400"><p>Real data, explicit permissions and clear product states are foundational to NEXORA.</p><p>Unreleased systems remain labeled as under development. No guaranteed returns, fabricated metrics or unrestricted AI access to user funds.</p><a href="/security" className="inline-block font-semibold text-white">Read our security principles →</a></div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-10"><div>© 2026 NEXORA. Technology in development.</div><div className="flex flex-wrap gap-5"><a href="/docs">Documentation</a><a href="/developers">Developers</a><a href="/risk">Risk Disclosure</a><a href="/privacy">Privacy</a></div></footer>
    </main>
  );
}
