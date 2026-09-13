'use client';

import { useState } from 'react';
import { Eip1193WalletAdapter, getInjectedProvider } from '@/lib/wallets/eip1193';
import type { ConnectedWallet, WalletBalance } from '@/lib/wallets/types';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletsPage() {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [status, setStatus] = useState('Connect a browser wallet to begin.');
  const [busy, setBusy] = useState(false);

  async function connectWallet() {
    const provider = getInjectedProvider();
    if (!provider) {
      setStatus('No EVM browser wallet detected. Install MetaMask or another compatible wallet.');
      return;
    }

    setBusy(true);
    try {
      const adapter = new Eip1193WalletAdapter(provider);
      const connected = await adapter.connect();
      const walletBalance = await adapter.getBalance(connected.address);
      setWallet(connected);
      setBalance(walletBalance);
      setStatus('Wallet connected. NEXORA never requests or stores your private key.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Wallet connection failed.');
    } finally {
      setBusy(false);
    }
  }

  function disconnectWallet() {
    setWallet(null);
    setBalance(null);
    setStatus('Wallet disconnected from this NEXORA session.');
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">NEXORA Wallet Layer</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Connect your digital assets.</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            A non-custodial wallet connection foundation for portfolio visibility and future on-chain features.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Connection status</p>
              <p className="mt-2 text-lg font-medium">{wallet ? shortenAddress(wallet.address) : 'Not connected'}</p>
            </div>
            {wallet ? (
              <button onClick={disconnectWallet} className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold hover:border-slate-500">
                Disconnect
              </button>
            ) : (
              <button disabled={busy} onClick={connectWallet} className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
                {busy ? 'Connecting…' : 'Connect wallet'}
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Network</p>
              <p className="mt-2 font-medium">{wallet ? `Chain ID ${wallet.chainId}` : '—'}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Native balance</p>
              <p className="mt-2 break-all font-medium">{balance?.nativeBalance ?? '—'}</p>
            </div>
          </div>

          <p aria-live="polite" className="mt-6 text-sm text-slate-400">{status}</p>
        </section>

        <p className="mt-6 text-sm text-slate-500">
          Demo limitation: token indexing, transaction signing, chain switching, and persistent wallet records are scheduled for the next integration phase.
        </p>
      </div>
    </main>
  );
}
