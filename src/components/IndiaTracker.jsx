import React from 'react';
import { INDIA_TRACKER_DATA } from '../data/quantumData';
import { GraduationCap, Briefcase, Cpu, Award, Milestone } from 'lucide-react';

export default function IndiaTracker() {
  const getIcon = (category) => {
    switch (category) {
      case 'Government':
        return <Award className="text-cyber-accent" size={18} />;
      case 'Colleges & Universities':
        return <GraduationCap className="text-cyber-blue" size={18} />;
      case 'Students & Professionals':
        return <Milestone className="text-amber-500" size={18} />;
      case 'Multinational Companies (MNCs)':
        return <Briefcase className="text-purple-400" size={18} />;
      case 'Startups':
        return <Cpu className="text-emerald-400" size={18} />;
      case 'State Governments':
        return <Award className="text-cyan-400" size={18} />;
      default:
        return <Award size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          India Quantum Ecosystem Ledger
        </h1>
        <p className="text-sm text-cyber-muted">
          Tracks Indian National Quantum Mission (NQM) developments, academic hubs, student initiatives, multinational tech centers, and state policies.
        </p>
      </div>

      {/* Grid of Tracker Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INDIA_TRACKER_DATA.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-accent/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
                <div className="flex items-center gap-2">
                  {getIcon(item.category)}
                  <span className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20">
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white font-mono">{item.entity}</h3>
              <p className="text-xs text-cyber-muted leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="border-t border-cyber-border/40 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono">
              <span className="text-cyber-muted">ESTIMATED SCOPE:</span>
              <span className="text-white font-bold">{item.budget}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Highlights Banner */}
      <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded p-4 text-xs font-mono text-cyber-blue space-y-2 leading-relaxed">
        <h4 className="font-bold uppercase tracking-wider text-white">NQM Educational & Professional Directives:</h4>
        <p>
          DST has mandated that all 4 thematic hubs (T-Hubs) establish student exchange agreements with international institutes. Additionally, the Ministry of Electronics and IT (MeitY) has initiated a quantum simulator development project (QSim) led by IIT Roorkee and C-DAC to train Indian professionals on simulated quantum hardware.
        </p>
      </div>
    </div>
  );
}
