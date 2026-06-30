import React, { useState, useEffect } from 'react';
import {
  Settings2,
  RefreshCw,
  Rss,
  Database,
  Info,
  Clock,
  Globe,
  Zap,
  CheckCircle2,
} from 'lucide-react';

const REFRESH_OPTIONS = [
  { label: '5 Seconds (Test)', value: 5 },
  { label: '1 Minute', value: 60 },
  { label: '30 Minutes', value: 1800 },
  { label: '1 Hour', value: 3600 },
  { label: '4 Hours (Recommended)', value: 14400 },
  { label: 'Disabled', value: 0 },
];

const CATEGORY_COLORS = {
  academic:   { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  industry:   { bg: 'bg-cyan-500/15',    text: 'text-cyan-400',    border: 'border-cyan-500/30' },
  science:    { bg: 'bg-purple-500/15',   text: 'text-purple-400',  border: 'border-purple-500/30' },
  government: { bg: 'bg-amber-500/15',    text: 'text-amber-400',   border: 'border-amber-500/30' },
  startup:    { bg: 'bg-rose-500/15',     text: 'text-rose-400',    border: 'border-rose-500/30' },
  company:    { bg: 'bg-orange-500/15',   text: 'text-orange-400',  border: 'border-orange-500/30' },
};

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-cyber-border bg-[#111A28] p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-cyber-accent/5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyber-accent/10">
          <Icon className="h-5 w-5 text-cyber-accent" />
        </div>
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function CategoryBadge({ category }) {
  const key = (category || '').toLowerCase();
  const colors = CATEGORY_COLORS[key] || {
    bg: 'bg-gray-500/15',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {category}
    </span>
  );
}

function InfoRow({ label, value, accent = false }) {
  return (
    <div className="flex items-center justify-between border-b border-cyber-border/40 py-3 last:border-b-0">
      <span className="font-mono text-xs uppercase tracking-wider text-cyber-muted">
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          accent ? 'text-cyber-accent' : 'text-white'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Settings({
  refreshInterval,
  setRefreshInterval,
  articles,
  feeds,
  onRefresh,
  loading,
}) {
  const [lastRefresh, setLastRefresh] = useState(() => new Date().toLocaleString());

  useEffect(() => {
    if (!loading) {
      setLastRefresh(new Date().toLocaleString());
    }
  }, [loading]);

  /* ── helpers ─────────────────────────────────────────────── */
  const autoRefreshOn = refreshInterval > 0;

  const nextRefreshEta = autoRefreshOn
    ? `~${refreshInterval >= 3600
        ? `${refreshInterval / 3600}h`
        : refreshInterval >= 60
          ? `${refreshInterval / 60}m`
          : `${refreshInterval}s`}`
    : '—';

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0B1320] px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mx-auto mb-10 flex max-w-6xl items-center gap-3">
        <Settings2 className="h-7 w-7 text-cyber-accent" />
        <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-white">
          Settings
        </h1>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        {/* ─── Section 1 — Feed Refresh Configuration ──────── */}
        <SectionCard icon={RefreshCw} title="Feed Refresh Configuration">
          {/* Interval selector */}
          <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-cyber-muted">
            Refresh Interval
          </label>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="mb-5 w-full cursor-pointer appearance-none rounded-lg border border-cyber-border bg-[#0B1320] px-4 py-2.5 font-mono text-sm text-white outline-none transition-colors duration-200 hover:border-cyber-accent focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/40"
          >
            {REFRESH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Refresh Now button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-cyber-accent bg-cyber-accent/10 px-4 py-2.5 font-mono text-sm font-semibold uppercase tracking-wider text-cyber-accent transition-all duration-200 hover:bg-cyber-accent/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            {loading ? 'Refreshing…' : 'Refresh Now'}
          </button>

          {/* Stats */}
          <div className="space-y-0 rounded-lg border border-cyber-border/40 bg-[#0B1320]/60 px-4">
            <InfoRow
              label="Last Refresh"
              value={lastRefresh}
            />
            <InfoRow
              label="Total Articles"
              value={articles.length}
              accent
            />
          </div>
        </SectionCard>

        {/* ─── Section 3 — System Information ──────────────── */}
        <SectionCard icon={Database} title="System Information">
          <div className="space-y-0 rounded-lg border border-cyber-border/40 bg-[#0B1320]/60 px-4">
            <InfoRow label="Total Feeds" value={feeds.length} />
            <InfoRow
              label="Articles in Memory"
              value={articles.length}
              accent
            />
            <InfoRow
              label="Auto-Refresh"
              value={
                <span className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      autoRefreshOn ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  {autoRefreshOn ? 'ON' : 'OFF'}
                </span>
              }
            />
            <InfoRow label="Next Refresh ETA" value={nextRefreshEta} />
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-cyber-border/40 bg-cyber-accent/5 px-4 py-3">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-cyber-accent" />
            <p className="text-xs leading-relaxed text-cyber-muted">
              Runs every 4 hours automatically via GitHub Actions{' '}
              <span className="text-emerald-400">(free)</span>
            </p>
          </div>
        </SectionCard>

        {/* ─── Section 2 — Active Feed Sources (full width) ── */}
        <div className="lg:col-span-2">
          <SectionCard icon={Rss} title="Active Feed Sources">
            <div className="overflow-x-auto rounded-lg border border-cyber-border/40">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-cyber-border/40 bg-[#0B1320]/80">
                    {['Name', 'Category', 'URL', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyber-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/20">
                  {feeds.map((feed, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors duration-150 hover:bg-cyber-accent/5"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-white">
                        {feed.name}
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={feed.category} />
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-3 font-mono text-xs text-cyber-muted">
                        {feed.url}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* ─── Section 4 — About ───────────────────────────── */}
        <div className="lg:col-span-2">
          <SectionCard icon={Info} title="About">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Globe,  label: 'App Name',    value: 'Quantum Tracker 2.0' },
                { icon: Info,   label: 'Version',     value: '2.0.1' },
                { icon: Zap,    label: 'Engine',      value: 'Dynamic News-to-Hardware Intelligence Parser' },
                { icon: Globe,  label: 'Hosting',     value: 'GitHub Pages (Free)' },
                { icon: Clock,  label: 'Auto-Update', value: 'GitHub Actions CI/CD (Free)' },
              ].map(({ icon: I, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-lg border border-cyber-border/40 bg-[#0B1320]/60 px-4 py-3 transition-colors duration-200 hover:border-cyber-accent/40"
                >
                  <I className="mt-0.5 h-4 w-4 shrink-0 text-cyber-accent" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-cyber-muted">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
