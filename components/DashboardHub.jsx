import React from 'react';
import { MOCK_ALERTS, SOVEREIGN_FUNDING, PROCESSORS_MATRIX } from '../data/quantumData';
import { Shield, Cpu, TrendingUp, AlertTriangle, CheckCircle, Award } from 'lucide-react';

export default function DashboardHub({ articles, onSwitchTab, onSearch }) {
  const activeAlerts = MOCK_ALERTS;
  const nqmIndia = SOVEREIGN_FUNDING.find(f => f.country === 'India');

  // Compute metrics
  const totalProcessors = PROCESSORS_MATRIX.length;
  const maxPhysicalQubits = Math.max(...PROCESSORS_MATRIX.map(p => p.physicalQubits));
  const maxLogicalQubits = Math.max(...PROCESSORS_MATRIX.map(p => p.logicalQubits));
  
  const positiveArticles = articles.filter(a => a.sentiment === 'positive').length;
  const bullishRatio = articles.length > 0 ? Math.round((positiveArticles / articles.length) * 100) : 0;
  
  const criticalAlertsCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const threatLevel = criticalAlertsCount > 0 ? 'CRITICAL' : activeAlerts.length > 1 ? 'HIGH' : 'NOMINAL';

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
            Quantum Command Center
          </h1>
          <p className="text-sm text-cyber-muted">
            National Quantum Mission (NQM) & Global Ecosystem Intelligence Ledger
          </p>
        </div>
        <div className="text-right font-mono text-xs text-cyber-muted">
          SYSTEM CLASSIFICATION: <span className="text-[#EF4444] font-bold">LEVEL-9 SECURE</span>
        </div>
      </div>

      {/* Grid of Core HUD Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Bullish Ratio */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-accent transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <TrendingUp size={48} className="text-cyber-accent" />
          </div>
          <span className="text-xs font-mono text-cyber-muted uppercase block">Sector Sentiment</span>
          <span className="text-3xl font-bold text-cyber-accent font-mono block mt-1">
            {bullishRatio}%
          </span>
          <span className="text-xs text-cyber-muted mt-2 block">
            Bullish Ratio (Positive News Momentum)
          </span>
        </div>

        {/* Metric 2: Threat Level */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-[#EF4444] transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Shield size={48} className={threatLevel === 'CRITICAL' ? 'text-[#EF4444]' : 'text-cyber-blue'} />
          </div>
          <span className="text-xs font-mono text-cyber-muted uppercase block">Threat Level</span>
          <span className={`text-3xl font-bold font-mono block mt-1 ${
            threatLevel === 'CRITICAL' ? 'text-[#EF4444] alert-pulse-red rounded px-1 w-fit' : 
            threatLevel === 'HIGH' ? 'text-amber-500' : 'text-cyber-accent'
          }`}>
            {threatLevel}
          </span>
          <span className="text-xs text-cyber-muted mt-2 block">
            Active Decoherence & Cryptographic Risks
          </span>
        </div>

        {/* Metric 3: Processors */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-blue transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Cpu size={48} className="text-cyber-blue" />
          </div>
          <span className="text-xs font-mono text-cyber-muted uppercase block">Processors Logged</span>
          <span className="text-3xl font-bold text-cyber-blue font-mono block mt-1">
            {totalProcessors}
          </span>
          <span className="text-xs text-cyber-muted mt-2 block">
            Peak physical qubits: <strong className="text-white">{maxPhysicalQubits}</strong>
          </span>
        </div>

        {/* Metric 4: Alerts */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-amber-500 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <AlertTriangle size={48} className="text-amber-500" />
          </div>
          <span className="text-xs font-mono text-cyber-muted uppercase block">Active Warnings</span>
          <span className="text-3xl font-bold text-amber-500 font-mono block mt-1">
            {activeAlerts.length}
          </span>
          <span className="text-xs text-cyber-muted mt-2 block">
            Requires immediate administrative check
          </span>
        </div>
      </div>

      {/* Main Grid: NQM India & Alerts Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: National Quantum Mission (NQM) Status */}
        <div className="lg:col-span-2 bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <Award className="text-cyber-accent" size={20} />
              <h2 className="font-mono font-bold uppercase text-cyber-text">
                India National Quantum Mission Status
              </h2>
            </div>
            <span className="bg-cyber-accent/15 text-cyber-accent text-xs font-mono px-2 py-0.5 rounded border border-cyber-accent/30">
              ₹6,003 CR Budget
            </span>
          </div>

          <p className="text-sm text-cyber-muted leading-relaxed">
            The Government of India has authorized the implementation of the National Quantum Mission (NQM) from 2023 to 2031. Led by DST, it establishes India as a leading nation in quantum tech hardware fabrication, algorithms research, secure communications (QKD), and quantum sensors.
          </p>

          {/* Allocation Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyber-text font-mono mb-3">
              Thematic Hub (T-Hub) Allocation Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nqmIndia?.focusAreas.map((area, idx) => (
                <div key={idx} className="bg-[#0B1320] border border-cyber-border/60 rounded p-3 hover:border-cyber-accent/40 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono font-semibold text-white truncate pr-2">{area.name}</span>
                    <span className="text-xs font-mono text-cyber-accent bg-cyber-accent/10 px-1.5 rounded">{area.allocation}</span>
                  </div>
                  <p className="text-[11px] text-cyber-muted leading-normal">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyber-text font-mono mb-2">
              NQM Strategic Milestones
            </h3>
            <div className="relative border-l border-cyber-border pl-4 space-y-4 py-2 ml-2">
              {nqmIndia?.milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg ${
                    m.status === 'Completed' ? 'bg-cyber-accent' : 
                    m.status === 'In Progress' ? 'bg-cyber-blue' : 'bg-cyber-muted'
                  }`} />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyber-accent bg-cyber-accent/10 px-1 py-0.2 rounded">
                      {m.year}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-1.5 rounded ${
                      m.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      m.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-gray-500/10 text-cyber-muted'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-white font-mono mt-1">{m.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Threat Alerts Center */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-cyber-border pb-3 mb-4">
              <Shield className="text-[#EF4444]" size={20} />
              <h2 className="font-mono font-bold uppercase text-cyber-text">
                Signals & Threat Feed
              </h2>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {activeAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`border-l-4 rounded p-3 bg-[#0B1320] transition-colors ${
                    alert.severity === 'critical' ? 'border-[#EF4444]' : 
                    alert.severity === 'warning' ? 'border-amber-500' : 'border-cyber-blue'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-[9px] font-mono uppercase px-1 rounded font-bold ${
                      alert.severity === 'critical' ? 'bg-[#EF4444]/15 text-[#EF4444]' : 
                      alert.severity === 'warning' ? 'bg-amber-500/15 text-amber-500' : 'bg-cyber-blue/15 text-cyber-blue'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[9px] font-mono text-cyber-muted">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1 font-mono">{alert.title}</h4>
                  <p className="text-[11px] text-cyber-muted mt-1 leading-normal">{alert.description}</p>
                  
                  {alert.sourceArticleId && (
                    <button 
                      onClick={() => {
                        onSwitchTab('media');
                        onSearch(alert.title.substring(0, 15));
                      }} 
                      className="text-[10px] text-cyber-accent hover:underline mt-2 font-mono flex items-center gap-1"
                    >
                      Inspect Source Article &rarr;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-cyber-border/40 mt-4">
            <button 
              onClick={() => onSwitchTab('reports')} 
              className="w-full text-center py-2 px-3 bg-cyber-accent hover:bg-cyber-accent/80 text-cyber-bg font-mono font-bold text-xs rounded transition-all"
            >
              Export System Dossier (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
