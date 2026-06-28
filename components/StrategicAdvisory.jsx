import React from 'react';
import { ADVISORY_FIRMS } from '../data/quantumData';
import { 
  Award, 
  Briefcase, 
  Layers, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Lock, 
  BarChart3, 
  CheckCircle
} from 'lucide-react';

export default function StrategicAdvisory() {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <Award className="text-cyber-accent animate-pulse" size={24} />
            Strategic Advisory & Market Intelligence
          </h1>
          <p className="text-sm text-cyber-muted font-sans mt-1">
            Comparing top-tier consulting firms driving Quantum Business Strategy (MBB) vs. Cryptographic IT Implementation (Big Four).
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/15 px-3 py-1 rounded border border-cyber-accent/30 uppercase tracking-wider self-start md:self-center">
          Market Intelligence Deck
        </span>
      </div>

      {/* 1. Quick-Reference Comparison Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2">
          <BarChart3 className="text-cyber-blue" size={16} />
          <h2 className="font-mono font-bold text-white text-xs uppercase tracking-wider">
            Macro-Level Alignment Matrix: Strategy vs. IT Implementation
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-cyber-border/40 text-cyber-muted text-[10px] uppercase">
                <th className="py-2.5 px-3 font-semibold">Consulting Leader</th>
                <th className="py-2.5 px-3 font-semibold">Strategic Class</th>
                <th className="py-2.5 px-3 font-semibold">Core Delivery Model</th>
                <th className="py-2.5 px-3 font-semibold">Primary Client Target</th>
                <th className="py-2.5 px-3 font-semibold">IT Integration Capability</th>
                <th className="py-2.5 px-3 text-right font-semibold">Global Focus Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/20 text-cyber-text">
              {ADVISORY_FIRMS.map(firm => (
                <tr key={firm.id} className="hover:bg-[#0B1320]/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${firm.id === 'mckinsey' ? 'bg-blue-400' : 'bg-indigo-400'}`}></span>
                    {firm.name}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      firm.type.includes('Strategy') 
                        ? 'bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent' 
                        : 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue'
                    }`}>
                      {firm.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-cyber-muted">{firm.comparisonMetrics.deliveryModel}</td>
                  <td className="py-3.5 px-3">{firm.comparisonMetrics.clientTarget}</td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] font-bold ${
                      firm.comparisonMetrics.itIntegrationCap.includes('High') ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {firm.comparisonMetrics.itIntegrationCap}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right text-white font-bold">{firm.comparisonMetrics.maturityRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Side-By-Side Profile Cards (SWOT Matrix & Partners) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ADVISORY_FIRMS.map(firm => (
          <div key={firm.id} className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-5 hover:border-cyber-blue/35 transition-all duration-300">
            {/* Card Header */}
            <div className="flex justify-between items-start border-b border-cyber-border/40 pb-3">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Briefcase size={16} className={firm.id === 'mckinsey' ? 'text-blue-400' : 'text-indigo-400'} />
                  {firm.name}
                </h3>
                <p className="text-[10px] text-cyber-muted font-mono uppercase">{firm.marketShare}</p>
              </div>
              <span className={`text-[9px] font-mono border px-2 py-0.5 rounded ${
                firm.type.includes('Strategy')
                  ? 'bg-cyber-accent/15 border-cyber-accent/30 text-cyber-accent'
                  : 'bg-cyber-blue/15 border-cyber-blue/30 text-cyber-blue'
              }`}>
                {firm.id === 'mckinsey' ? 'MBB LEADERSHIP' : 'BIG FOUR COMPLIANCE'}
              </span>
            </div>

            {/* Core Focus Block */}
            <div className="bg-[#0B1320] border border-cyber-border/40 rounded p-3 text-xs leading-relaxed space-y-1">
              <div className="text-cyber-blue font-bold font-mono text-[10px] uppercase">Core Mandate & Focus:</div>
              <p className="text-cyber-muted">{firm.coreFocus}</p>
            </div>

            {/* Lead Advisory Partners */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-white font-mono font-semibold">
                <Users size={13} className="text-cyber-accent" />
                <span>Lead Practice Partners:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {firm.leadPartners.map((partner, idx) => (
                  <span key={idx} className="bg-[#0B1320] border border-cyber-border text-cyber-muted text-[10px] font-mono px-2 py-1 rounded">
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            {/* 2x2 SWOT Matrix */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-white font-mono font-semibold border-t border-cyber-border/20 pt-3">
                <Layers size={13} className="text-cyber-blue" />
                <span>Firm SWOT Matrix:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* STRENGTHS */}
                <div className="bg-[#0B1320] border border-emerald-500/25 rounded p-3 space-y-2 hover:border-emerald-500/40 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold">
                    S
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider">Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-[10px] font-mono text-cyber-muted leading-relaxed">
                    {firm.swot.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WEAKNESSES */}
                <div className="bg-[#0B1320] border border-rose-500/25 rounded p-3 space-y-2 hover:border-rose-500/40 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-6 h-6 bg-rose-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-rose-500/10 text-rose-400 font-mono text-[9px] font-bold">
                    W
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <AlertTriangle size={13} />
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider">Weaknesses</span>
                  </div>
                  <ul className="space-y-1.5 text-[10px] font-mono text-cyber-muted leading-relaxed">
                    {firm.swot.weaknesses.map((weak, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* OPPORTUNITIES */}
                <div className="bg-[#0B1320] border border-cyber-blue/25 rounded p-3 space-y-2 hover:border-cyber-blue/40 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-6 h-6 bg-cyber-blue/5 rounded-bl-full flex items-center justify-center border-l border-b border-cyber-blue/10 text-cyber-blue font-mono text-[9px] font-bold">
                    O
                  </div>
                  <div className="flex items-center gap-1.5 text-cyber-blue">
                    <TrendingUp size={13} />
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider">Opportunities</span>
                  </div>
                  <ul className="space-y-1.5 text-[10px] font-mono text-cyber-muted leading-relaxed">
                    {firm.swot.opportunities.map((opp, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-cyber-blue mt-0.5">•</span>
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* THREATS */}
                <div className="bg-[#0B1320] border border-amber-500/25 rounded p-3 space-y-2 hover:border-amber-500/40 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-6 h-6 bg-amber-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-amber-500/10 text-amber-400 font-mono text-[9px] font-bold">
                    T
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Lock size={13} />
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider">Threats</span>
                  </div>
                  <ul className="space-y-1.5 text-[10px] font-mono text-cyber-muted leading-relaxed">
                    {firm.swot.threats.map((thr, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{thr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
