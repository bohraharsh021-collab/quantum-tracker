import React, { useState, useMemo } from 'react';
import { VC_FUNDING_ROUNDS } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { 
  DollarSign, 
  Landmark, 
  ArrowUpDown, 
  TrendingUp, 
  Filter, 
  Calendar, 
  Zap, 
  Briefcase 
} from 'lucide-react';

// Mapped sector helper
const getSectorForStartup = (startup) => {
  const name = startup.toLowerCase();
  if (name.includes('qnu') || name.includes('cryptography') || name.includes('secure') || name.includes('quintessence')) {
    return "Cryptography & QKD";
  }
  if (name.includes('qpiai') || name.includes('motion') || name.includes('software') || name.includes('classiq') || name.includes('horizon') || name.includes('entropica')) {
    return "Software & Compilers";
  }
  if (name.includes('ibm') || name.includes('google') || name.includes('rigetti') || name.includes('pasqal') || name.includes('ionq') || name.includes('xanadu') || name.includes('d-wave') || name.includes('psi') || name.includes('oqc') || name.includes('diraq') || name.includes('brilliance') || name.includes('eleqtron') || name.includes('planqc')) {
    return "Hardware";
  }
  if (name.includes('ctrl') || name.includes('sensor') || name.includes('clock') || name.includes('control') || name.includes('machines') || name.includes('q-ctrl')) {
    return "Sensing & Control";
  }
  return "Hardware"; // Default
};

// Month conversion helper
const getMonthStr = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const parts = dateStr.split('-');
  const year = parts[0];
  const month = parts[1] || '01';
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mIdx = parseInt(month) - 1;
  return `${monthNames[mIdx] || 'Jan'} ${year}`;
};

// Quarter conversion helper
const getQuarterStr = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const parts = dateStr.split('-');
  const year = parts[0];
  const month = parseInt(parts[1] || '1');
  const quarter = Math.ceil(month / 3);
  return `${year}-Q${quarter}`;
};

export default function FinancialTracker({ articles = [] }) {
  // Sorting state
  const [sortField, setSortField] = useState('amount');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter states
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterOrg, setFilterOrg] = useState('all');
  const [filterSector, setFilterSector] = useState('all');

  // Chart time toggle states: Monthly, Quarterly, Yearly, 5 Years, 10 Years
  const [timeToggle, setTimeToggle] = useState('Yearly');

  // Merge static VC data and dynamic VC overrides
  const allFundingRounds = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    const dynamicFunding = overrides.newVCFunding || [];
    
    const combined = [...VC_FUNDING_ROUNDS];
    dynamicFunding.forEach(dyn => {
      // Check for duplicates
      const exists = combined.some(
        c => c.startup.toLowerCase() === dyn.startup.toLowerCase() && 
             (c.date === dyn.date || Math.abs(c.amount - dyn.amount) < 0.1)
      );
      if (!exists) {
        combined.push(dyn);
      }
    });
    return combined;
  }, [articles]);

  // List of unique values for select filters
  const countriesList = useMemo(() => {
    const list = new Set(allFundingRounds.map(r => r.country));
    return Array.from(list).sort();
  }, [allFundingRounds]);

  const organizationsList = useMemo(() => {
    const list = new Set(allFundingRounds.map(r => r.startup));
    return Array.from(list).sort();
  }, [allFundingRounds]);

  const sectorsList = ["Hardware", "Software & Compilers", "Cryptography & QKD", "Sensing & Control"];

  // Filtered rounds based on search criteria
  const filteredRounds = useMemo(() => {
    return allFundingRounds.filter(round => {
      // Country Filter
      if (filterCountry !== 'all' && round.country !== filterCountry) return false;
      // Organization Filter
      if (filterOrg !== 'all' && round.startup !== filterOrg) return false;
      // Sector Filter
      const sector = getSectorForStartup(round.startup);
      if (filterSector !== 'all' && sector !== filterSector) return false;

      // Temporal range filters for 5 Years and 10 Years (based on metadata year 2026)
      const year = parseInt(round.date.split('-')[0]);
      const currentYear = 2026;
      if (timeToggle === '5 Years') {
        if (year < currentYear - 5 || year > currentYear) return false;
      } else if (timeToggle === '10 Years') {
        if (year < currentYear - 10 || year > currentYear) return false;
      }
      return true;
    });
  }, [allFundingRounds, filterCountry, filterOrg, filterSector, timeToggle]);

  // Sort rounds for ledger display
  const sortedRounds = useMemo(() => {
    return [...filteredRounds].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      
      // Support sector sorting since it's computed
      if (sortField === 'sector') {
        valA = getSectorForStartup(a.startup);
        valB = getSectorForStartup(b.startup);
      }

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredRounds, sortField, sortOrder]);

  // Aggregate funding by time period for the chart
  const groupedChartData = useMemo(() => {
    const groups = {};

    filteredRounds.forEach(round => {
      let label = '';
      const year = parseInt(round.date.split('-')[0]);
      
      if (timeToggle === 'Monthly') {
        label = getMonthStr(round.date);
      } else if (timeToggle === 'Quarterly') {
        label = getQuarterStr(round.date);
      } else if (timeToggle === 'Yearly' || timeToggle === '5 Years' || timeToggle === '10 Years') {
        label = `${year}`;
      }
      
      groups[label] = (groups[label] || 0) + round.amount;
    });

    const result = Object.entries(groups).map(([label, amount]) => ({
      label,
      amount
    }));

    // Chronological sorting
    result.sort((a, b) => {
      if (timeToggle === 'Monthly') {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [m1, y1] = a.label.split(' ');
        const [m2, y2] = b.label.split(' ');
        if (y1 !== y2) return parseInt(y1) - parseInt(y2);
        return months.indexOf(m1) - months.indexOf(m2);
      }
      if (timeToggle === 'Quarterly') {
        return a.label.localeCompare(b.label);
      }
      return parseInt(a.label) - parseInt(b.label);
    });

    return result;
  }, [filteredRounds, timeToggle]);

  // Total investment calculated from filtered subset
  const totalInvestment = useMemo(() => {
    return filteredRounds.reduce((sum, r) => sum + r.amount, 0);
  }, [filteredRounds]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // SVG Chart sizing
  const chartWidth = 500;
  const chartHeight = 220;
  const maxAmount = useMemo(() => {
    const values = groupedChartData.map(d => d.amount);
    return values.length > 0 ? Math.max(...values, 10) : 100;
  }, [groupedChartData]);

  // Group by country breakdown
  const fundingByCountry = useMemo(() => {
    const countries = {};
    filteredRounds.forEach(round => {
      countries[round.country] = (countries[round.country] || 0) + round.amount;
    });
    return Object.entries(countries)
      .map(([country, amount]) => ({ country, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredRounds]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
            Venture Capital & Investment Tracker
          </h1>
          <p className="text-sm text-cyber-muted font-sans mt-1">
            Tracking private capital flows, VC rounds, and strategic equity investments in global and Indian quantum startups.
          </p>
        </div>

        {/* Time toggles */}
        <div className="flex bg-[#111A28] border border-cyber-border rounded p-1 self-start md:self-center">
          {['Monthly', 'Quarterly', 'Yearly', '5 Years', '10 Years'].map(mode => (
            <button
              key={mode}
              onClick={() => setTimeToggle(mode)}
              className={`px-3 py-1.5 text-xs font-mono uppercase rounded transition-all ${
                timeToggle === mode 
                  ? 'bg-cyber-blue/15 text-cyber-blue font-bold border border-cyber-blue/30 shadow-[0_0_12px_rgba(0,163,255,0.15)]' 
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Select Filters row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#111A28] border border-cyber-border rounded p-4 font-mono text-xs">
        {/* Country Filter */}
        <div className="space-y-1.5">
          <label className="text-cyber-muted uppercase block flex items-center gap-1">
            <Filter size={11} /> Country
          </label>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-accent"
          >
            <option value="all">All Countries</option>
            {countriesList.map((country, idx) => (
              <option key={idx} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Organization Filter */}
        <div className="space-y-1.5">
          <label className="text-cyber-muted uppercase block flex items-center gap-1">
            <Filter size={11} /> Organization
          </label>
          <select
            value={filterOrg}
            onChange={(e) => setFilterOrg(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-accent"
          >
            <option value="all">All Organizations</option>
            {organizationsList.map((org, idx) => (
              <option key={idx} value={org}>{org}</option>
            ))}
          </select>
        </div>

        {/* Sector Filter */}
        <div className="space-y-1.5">
          <label className="text-cyber-muted uppercase block flex items-center gap-1">
            <Filter size={11} /> Sector
          </label>
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded px-3 py-2 text-white focus:outline-none focus:border-cyber-accent"
          >
            <option value="all">All Sectors</option>
            {sectorsList.map((sec, idx) => (
              <option key={idx} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Column: Totals & Aggregations */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 relative overflow-hidden">
            <Landmark className="absolute top-4 right-4 text-cyber-accent opacity-20" size={40} />
            <span className="text-[10px] text-cyber-muted uppercase block">Total Logged VC Funding</span>
            <span className="text-3xl font-bold text-cyber-accent font-mono block mt-2">
              ${totalInvestment.toFixed(2)}M
            </span>
            <span className="text-[10px] text-cyber-muted mt-2 block border-t border-cyber-border/40 pt-2">
              Aggregated across {filteredRounds.length} matching startup transaction logs.
            </span>
          </div>

          <div className="bg-[#111A28] border border-cyber-border rounded p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-cyber-border pb-2 mb-3">
              Geographic Breakdown
            </h3>
            {fundingByCountry.length > 0 ? (
              <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                {fundingByCountry.map((data, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-cyber-text">{data.country}</span>
                    <span className="text-white font-bold">${data.amount.toFixed(2)}M</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-cyber-muted py-2 text-center">No data for selected filters</div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Chart (SVG Custom Bar Chart) */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-cyber-border pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-cyber-blue" size={18} />
              <h2 className="font-bold uppercase text-white">
                Funding Over Time ({timeToggle})
              </h2>
            </div>
            <span className="text-[9px] text-cyber-muted uppercase">VALUES IN MILLIONS (USD)</span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="w-full overflow-x-auto">
            {groupedChartData.length > 0 ? (
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-full min-w-[400px]"
              >
                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = 30 + ratio * 140;
                  const value = (maxAmount * (1 - ratio)).toFixed(1);
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
                {groupedChartData.map((data, idx) => {
                  const barSpacing = (chartWidth - 100) / groupedChartData.length;
                  const x = 75 + idx * barSpacing;
                  const barWidth = Math.min(barSpacing - 10, 40);
                  const barHeight = (data.amount / maxAmount) * 140;
                  const y = 170 - barHeight;

                  return (
                    <g key={idx} className="group cursor-pointer">
                      <defs>
                        <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00A3FF" />
                          <stop offset="100%" stopColor="#00E699" stopOpacity="0.4" />
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
                        ${data.amount.toFixed(1)}M
                      </text>

                      {/* Period Label under bar */}
                      <text 
                        x={x + barWidth / 2} 
                        y="188" 
                        textAnchor="middle" 
                        fill="#64748B" 
                        fontSize="8" 
                        fontFamily="IBM Plex Mono"
                        transform={`rotate(-15, ${x + barWidth / 2}, 188)`}
                      >
                        {data.label}
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
            ) : (
              <div className="h-[220px] flex items-center justify-center border border-dashed border-cyber-border rounded text-cyber-muted">
                No telemetry matching active filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VC Transactions Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="p-4 border-b border-cyber-border flex items-center justify-between">
          <h2 className="font-mono font-bold uppercase text-white">
            Equity Disbursement Ledger
          </h2>
          <span className="text-[10px] text-cyber-muted font-mono uppercase">
            Showing {sortedRounds.length} Transactions
          </span>
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
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('sector')}>
                  Sector <ArrowUpDown size={12} className="inline ml-1" />
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
                  <td className="p-3 font-bold text-white flex items-center gap-1.5">
                    <Briefcase size={12} className="text-cyber-muted" />
                    {round.startup}
                  </td>
                  <td className="p-3 text-cyber-muted">{round.country}</td>
                  <td className="p-3">
                    <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                      {getSectorForStartup(round.startup)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-cyber-blue/15 text-cyber-blue px-2 py-0.5 rounded text-[10px]">
                      {round.round}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-cyber-accent">
                    ${round.amount.toFixed(2)}M
                  </td>
                  <td className="p-3 text-cyber-muted">{round.date}</td>
                  <td className="p-3 text-[11px] text-cyber-muted truncate max-w-[200px]" title={round.leadInvestors}>
                    {round.leadInvestors}
                  </td>
                </tr>
              ))}
              {sortedRounds.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-cyber-muted">
                    No transactions matching current filter configuration.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
