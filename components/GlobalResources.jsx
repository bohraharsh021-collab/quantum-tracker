import React, { useState } from 'react';
import { GLOBAL_RESOURCES_DATA } from '../data/quantumData';
import { Globe, Shield, Landmark, Cpu, GraduationCap, Info } from 'lucide-react';

export default function GlobalResources() {
  const [selectedCountry, setSelectedCountry] = useState('United States of America');
  const currentCountry = GLOBAL_RESOURCES_DATA.find(c => c.country === selectedCountry);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Global Sovereign & Resource Matrix
        </h1>
        <p className="text-sm text-cyber-muted">
          Tracks the quantum resources of other nations: mapping their government initiatives, startups, corporations, and academic labs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Country Selector */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2 px-1">
            Global Nations
          </span>
          {GLOBAL_RESOURCES_DATA.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCountry(c.country)}
              className={`w-full text-left p-3 border font-mono text-xs uppercase rounded flex items-center justify-between transition-all duration-300 ${
                selectedCountry === c.country 
                  ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold shadow-[0_0_15px_rgba(0,230,153,0.15)]' 
                  : 'bg-[#111A28] border-cyber-border text-cyber-text hover:border-cyber-blue hover:text-white'
              }`}
            >
              <span>{c.country}</span>
              <Globe size={14} />
            </button>
          ))}
        </div>

        {/* Resource Details Grid */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-3 space-y-6">
          <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold font-mono text-white uppercase">
                {selectedCountry} Resource Ledger
              </h2>
              <span className="text-xs font-mono text-cyber-blue">
                Country Resources Profile
              </span>
            </div>
            <Shield size={20} className="text-cyber-blue" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Government block */}
            <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-accent">
                <Landmark size={14} />
                <span className="text-xs font-mono font-bold uppercase">Government Strategy</span>
              </div>
              <p className="text-xs text-cyber-muted leading-relaxed">
                {currentCountry?.government}
              </p>
            </div>

            {/* Startups block */}
            <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-accent">
                <Cpu size={14} />
                <span className="text-xs font-mono font-bold uppercase">Leading Startups</span>
              </div>
              <p className="text-xs text-cyber-muted leading-relaxed">
                {currentCountry?.startups}
              </p>
            </div>

            {/* Corporations block */}
            <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-blue">
                <Globe size={14} />
                <span className="text-xs font-mono font-bold uppercase">Enterprise Leaders</span>
              </div>
              <p className="text-xs text-cyber-muted leading-relaxed">
                {currentCountry?.corporations}
              </p>
            </div>

            {/* Academics block */}
            <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-blue">
                <GraduationCap size={14} />
                <span className="text-xs font-mono font-bold uppercase">Research Laboratories</span>
              </div>
              <p className="text-xs text-cyber-muted leading-relaxed">
                {currentCountry?.academic}
              </p>
            </div>
          </div>

          {/* Country Summary Banner */}
          <div className="bg-cyber-accent/5 border border-cyber-accent/20 p-4 rounded text-xs text-cyber-accent font-mono flex items-start gap-2 leading-relaxed">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <strong className="uppercase">Country Profile Summary:</strong>
              <p className="mt-1 text-cyber-text">{currentCountry?.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
