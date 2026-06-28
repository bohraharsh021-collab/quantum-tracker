import React, { useState, useMemo } from 'react';
import { VC_FUNDING_ROUNDS } from '../data/quantumData';
import { DollarSign, Landmark, ArrowUpDown, TrendingUp } from 'lucide-react';

export default function FinancialTracker() {
  const [sortField, setSortField] = useState('amount');
  const [sortOrder, setSortOrder] = useState('desc');

  // Compute charts data
  const chartData = useMemo(() => {
    const countries = {};
    VC_FUNDING_ROUNDS.forEach(round => {
      countries[round.country] = (countries[round.country] || 0) + round.amount;
    });
    return Object.entries(countries).map(([country, amount]) => ({
      country,
      amount
    })).sort((a, b) => b.amount - a.amount);
  }, []);

  const totalInvestment = useMemo(() => {
    return VC_FUNDING_ROUNDS.reduce((sum, r) => sum + r.amount, 0);
  }, []);

  const sortedRounds = useMemo(() => {
    return [...VC_FUNDING_ROUNDS].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 220;
  const maxAmount = Math.max(...chartData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Venture Capital & Investment Tracker
        </h1>
        <p className="text-sm text-cyber-muted">
          Tracking private capital flows, VC rounds, and strategic equity investments in global and Indian quantum startups.
        </p>
      </div>

      {/* Stats and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Totals & Aggregations */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 relative overflow-hidden">
            <Landmark className="absolute top-4 right-4 text-cyber-accent opacity-20" size={40} />
            <span className="text-xs font-mono text-cyber-muted uppercase block">Total Logged VC Funding</span>
            <span className="text-3xl font-bold text-cyber-accent font-mono block mt-1">
              ${totalInvestment.toFixed(1)}M
            </span>
            <span className="text-xs text-cyber-muted mt-2 block">
              Across major startups in India, US, and Europe.
            </span>
          </div>

          <div className="bg-[#111A28] border border-cyber-border rounded p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyber-text font-mono border-b border-cyber-border pb-2 mb-3">
              Funding by Country
            </h3>
            <div className="space-y-2">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyber-muted">{data.country}</span>
                  <span className="text-white font-bold">${data.amount.toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Chart (SVG Custom Bar Chart) */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-cyber-border pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-cyber-blue" size={18} />
              <h2 className="font-mono font-bold uppercase text-cyber-text">
                VC Distribution Map
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyber-muted">VALUES IN MILLIONS (USD)</span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full min-w-[400px]"
            >
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = 30 + ratio * 140;
                const value = Math.round(maxAmount * (1 - ratio));
                return (
                  <g key={idx}>
                    <line 
                      x1="60" 
                      y1={y} 
                      x2={chartWidth - 20} 
                      y2={y} 
                      stroke="#223047" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x="10" 
                      y={y + 4} 
                      fill="#64748B" 
                      fontSize="9" 
                      fontFamily="IBM Plex Mono"
                    >
                      ${value}M
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {chartData.map((data, idx) => {
                const barSpacing = (chartWidth - 100) / chartData.length;
                const x = 75 + idx * barSpacing;
                const barWidth = Math.min(barSpacing - 20, 45);
                const barHeight = (data.amount / maxAmount) * 140;
                const y = 170 - barHeight;

                return (
                  <g key={idx} className="group cursor-pointer">
                    {/* Glowing Accent Gradient */}
                    <defs>
                      <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E699" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Bar */}
                    <rect 
                      x={x} 
                      y={y} 
                      width={barWidth} 
                      height={barHeight} 
                      fill={`url(#grad-${idx})`}
                      className="transition-all duration-300 hover:fill-cyber-accent"
                    />

                    {/* Value label on top of bar */}
                    <text 
                      x={x + barWidth / 2} 
                      y={y - 6} 
                      textAnchor="middle" 
                      fill="#E2E8F0" 
                      fontSize="9" 
                      fontWeight="bold"
                      fontFamily="IBM Plex Mono"
                    >
                      ${data.amount.toFixed(0)}M
                    </text>

                    {/* Country label under bar */}
                    <text 
                      x={x + barWidth / 2} 
                      y="190" 
                      textAnchor="middle" 
                      fill="#64748B" 
                      fontSize="9" 
                      fontFamily="IBM Plex Mono"
                    >
                      {data.country.substring(0, 10)}
                    </text>
                  </g>
                );
              })}

              {/* Baseline */}
              <line 
                x1="60" 
                y1="170" 
                x2={chartWidth - 20} 
                y2="170" 
                stroke="#223047" 
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* VC Transactions Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="p-4 border-b border-cyber-border">
          <h2 className="font-mono font-bold uppercase text-cyber-text">
            Equity Disbursement Ledger
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0B1320] text-cyber-muted border-b border-cyber-border uppercase">
              <tr>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('startup')}>
                  Startup <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('country')}>
                  Country <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('round')}>
                  Investment Round <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('amount')}>
                  Amount (USD) <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('date')}>
                  Transaction Date <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3">Lead Investors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-cyber-text">
              {sortedRounds.map(round => (
                <tr key={round.id} className="hover:bg-cyber-blue/5 transition-colors">
                  <td className="p-3 font-bold text-white">{round.startup}</td>
                  <td className="p-3 text-cyber-muted">{round.country}</td>
                  <td className="p-3">
                    <span className="bg-cyber-blue/15 text-cyber-blue px-2 py-0.5 rounded text-[10px]">
                      {round.round}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-cyber-accent">
                    ${round.amount.toFixed(1)}M
                  </td>
                  <td className="p-3 text-cyber-muted">{round.date}</td>
                  <td className="p-3 text-[11px] text-cyber-muted truncate max-w-[200px]" title={round.leadInvestors}>
                    {round.leadInvestors}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
