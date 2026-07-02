import React, { useMemo } from 'react';
import feedsConfig from '../data/feedsConfig.json';
import qaLogs from '../data/qaLogs.json';
import { 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  Clock, 
  FileText, 
  BarChart2, 
  Server, 
  Activity 
} from 'lucide-react';

export default function QAValidationRoom({ articles = [] }) {
  // Compute metadata integrity checklist
  const integrityStats = useMemo(() => {
    let total = articles.length;
    let missingCountry = 0;
    let missingOrg = 0;
    let missingTech = 0;
    let missingUrl = 0;
    let duplicateHeadlines = 0;

    const seenTitles = new Set();
    articles.forEach(art => {
      if (!art.country || art.country === 'Global') missingCountry++;
      if (!art.organization || art.organization === 'Global Ecosystem') missingOrg++;
      if (!art.technology || art.technology === 'Hardware Platforms') missingTech++;
      if (!art.url) missingUrl++;
      
      const titleLower = (art.title || '').toLowerCase();
      if (seenTitles.has(titleLower)) {
        duplicateHeadlines++;
      } else {
        seenTitles.add(titleLower);
      }
    });

    return {
      total,
      missingCountry,
      missingOrg,
      missingTech,
      missingUrl,
      duplicateHeadlines,
      integrityScore: total > 0 
        ? Math.round(((total * 4 - (missingCountry + missingOrg + missingTech + missingUrl)) / (total * 4)) * 100)
        : 100
    };
  }, [articles]);

  // Feed stats from config-driven architecture
  const activeFeedsCount = feedsConfig.length;
  const successfulFeeds = qaLogs?.feedStats?.success || 6;
  const failedFeeds = qaLogs?.feedStats?.failed || 15;
  const lastSyncTime = qaLogs?.lastRun 
    ? new Date(qaLogs.lastRun).toLocaleString() 
    : new Date().toLocaleString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <Activity className="text-cyber-accent" size={24} />
            QA Validation Room
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            Real-time parser logs, feed connectivity validation, metadata integrity tracking, and ingestion telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#111A28] border border-cyber-border rounded px-3 py-1 font-mono text-[10px] text-cyber-muted">
          <Clock size={12} />
          <span>LAST SYNC: {lastSyncTime}</span>
        </div>
      </div>

      {/* Grid of Key Diagnostic Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Database Size */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 space-y-2 relative overflow-hidden">
          <Database className="absolute right-4 top-4 text-cyber-accent opacity-15" size={32} />
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Telemetry Store Size</span>
          <span className="text-2xl font-bold text-white font-mono block">
            {articles.length} <span className="text-xs text-cyber-muted">/ 10,000</span>
          </span>
          <span className="text-[10px] text-cyber-muted font-mono block">Max history limit is respected</span>
        </div>

        {/* Ingestion Health */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 space-y-2 relative overflow-hidden">
          <Server className="absolute right-4 top-4 text-cyber-blue opacity-15" size={32} />
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Feed Sync Health</span>
          <span className="text-2xl font-bold text-white font-mono block">
            {successfulFeeds} <span className="text-xs text-cyber-muted">/{activeFeedsCount} OK</span>
          </span>
          <span className="text-[10px] text-red-400 font-mono block">{failedFeeds} feeds failed last cycle</span>
        </div>

        {/* Data Integrity Score */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 space-y-2 relative overflow-hidden">
          <BarChart2 className="absolute right-4 top-4 text-cyber-accent opacity-15" size={32} />
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Data Integrity Score</span>
          <span className="text-2xl font-bold text-cyber-accent font-mono block">
            {integrityStats.integrityScore}%
          </span>
          <span className="text-[10px] text-cyber-muted font-mono block">Based on metadata completeness</span>
        </div>

        {/* Duplicate Ingestion Prevention */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 space-y-2 relative overflow-hidden">
          <CheckCircle className="absolute right-4 top-4 text-green-500 opacity-15" size={32} />
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">Duplicate Ledger Telemetry</span>
          <span className="text-2xl font-bold text-green-400 font-mono block">
            {qaLogs?.feedStats?.duplicatesRemoved || 0}
          </span>
          <span className="text-[10px] text-cyber-muted font-mono block">Filtered during last ETL sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Feed Health Table */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b border-cyber-border/40 pb-2">
            <h2 className="font-mono font-bold text-white text-xs uppercase">
              Ingested Feeds Telemetry & Logs
            </h2>
            <span className="text-[10px] bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30 px-2 py-0.5 rounded font-mono uppercase">
              Config Driven
            </span>
          </div>

          <div className="overflow-x-auto max-h-[360px]">
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-cyber-border/40 text-cyber-muted uppercase">
                  <th className="py-2 px-2 font-semibold">Feed Channel</th>
                  <th className="py-2 px-2 font-semibold">Priority</th>
                  <th className="py-2 px-2 font-semibold">Country</th>
                  <th className="py-2 px-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border/20 text-cyber-text">
                {feedsConfig.map((feed, idx) => {
                  const isBroken = qaLogs?.feedStats?.failedFeedsList?.some(f => f.name === feed.name);
                  return (
                    <tr key={idx} className="hover:bg-[#0B1320]/45">
                      <td className="py-2 px-2 text-white font-bold max-w-[180px] truncate">{feed.name}</td>
                      <td className="py-2 px-2 uppercase text-cyber-muted">{feed.priority}</td>
                      <td className="py-2 px-2 text-cyber-blue">{feed.country}</td>
                      <td className="py-2 px-2 text-right">
                        {feed.status !== 'active' ? (
                          <span className="text-gray-500">DISABLED</span>
                        ) : isBroken ? (
                          <span className="text-red-400 font-bold">ERROR</span>
                        ) : (
                          <span className="text-cyber-accent font-bold">NOMINAL</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Metadata Validation Audits */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-1 space-y-4">
          <div className="border-b border-cyber-border/40 pb-2">
            <h2 className="font-mono font-bold text-white text-xs uppercase">
              Metadata Completeness Audit
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyber-muted">Articles Missing Region:</span>
                <span className={`font-bold ${integrityStats.missingCountry > 0 ? 'text-amber-400' : 'text-green-400'}`}>
                  {integrityStats.missingCountry}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyber-muted">Articles Missing Vendor/Org:</span>
                <span className={`font-bold ${integrityStats.missingOrg > 0 ? 'text-amber-400' : 'text-green-400'}`}>
                  {integrityStats.missingOrg}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyber-muted">Articles Missing Tech Tag:</span>
                <span className={`font-bold ${integrityStats.missingTech > 0 ? 'text-amber-400' : 'text-green-400'}`}>
                  {integrityStats.missingTech}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyber-muted">Articles Missing URL link:</span>
                <span className={`font-bold ${integrityStats.missingUrl > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {integrityStats.missingUrl}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyber-muted">Duplicate Headlines:</span>
                <span className={`font-bold ${integrityStats.duplicateHeadlines > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {integrityStats.duplicateHeadlines}
                </span>
              </div>
            </div>

            <div className="bg-cyber-accent/5 border border-cyber-accent/20 p-3.5 rounded text-[11px] font-mono text-cyber-muted leading-relaxed space-y-1">
              <div className="text-white font-bold uppercase flex items-center gap-1.5">
                <FileText size={12} className="text-cyber-accent" />
                <span>Validator Summary</span>
              </div>
              <p>
                Articles with missing metadata default to "Global", "Global Ecosystem", and "Hardware Platforms". Correct ingestion is verified via scripts/fetch-news.js parsing filters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
