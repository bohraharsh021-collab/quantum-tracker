import React, { useState } from 'react';
import { MOCK_TAXONOMY } from '../data/quantumData';
import { GitPullRequest, ToggleLeft, Activity, Info } from 'lucide-react';

export default function TaxonomyMaps() {
  const [selectedCategory, setSelectedCategory] = useState(MOCK_TAXONOMY[0].category);
  const currentCat = MOCK_TAXONOMY.find(cat => cat.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Sector Taxonomy Map
        </h1>
        <p className="text-sm text-cyber-muted">
          Hierarchical mapping of quantum technology domains, hardware implementations, algorithms, and cryptographic defenses.
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Category Nodes */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2 px-1">
            Taxonomy Sectors
          </span>
          {MOCK_TAXONOMY.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.category)}
              className={`w-full text-left p-3 border font-mono text-xs uppercase rounded flex items-center justify-between transition-all duration-300 ${
                selectedCategory === cat.category 
                  ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold shadow-[0_0_15px_rgba(0,230,153,0.15)]' 
                  : 'bg-[#111A28] border-cyber-border text-cyber-text hover:border-cyber-blue hover:text-white'
              }`}
            >
              <span>{cat.category}</span>
              <GitPullRequest size={14} />
            </button>
          ))}
        </div>

        {/* Content area: Explorable Sub-Nodes */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-3 space-y-4">
          <div className="border-b border-cyber-border pb-2">
            <h2 className="font-mono font-bold uppercase text-white flex items-center gap-2">
              <Activity size={18} className="text-cyber-blue" />
              {selectedCategory} Node Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCat?.subcategories.map((sub, idx) => (
              <div 
                key={idx} 
                className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-3 hover:border-cyber-accent/60 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-cyber-border/40 pb-1.5">
                  <span className="font-bold text-white text-sm font-mono tracking-wide">
                    {sub.name}
                  </span>
                  <ToggleLeft className="text-cyber-accent" size={16} />
                </div>

                <p className="text-xs text-cyber-muted leading-relaxed">
                  {sub.description}
                </p>

                {sub.name === 'Superconducting' && (
                  <div className="bg-[#111A28] border border-cyber-border/40 text-[10px] font-mono p-2 rounded text-cyber-blue space-y-1">
                    <div><strong>冷却温度:</strong> ~15mK (Dilution fridge)</div>
                    <div><strong>主要企業:</strong> IBM, Google, Rigetti, Intel</div>
                  </div>
                )}
                
                {sub.name === 'Trapped Ion' && (
                  <div className="bg-[#111A28] border border-cyber-border/40 text-[10px] font-mono p-2 rounded text-cyber-blue space-y-1">
                    <div><strong>冷却温度:</strong> ~4 Kelvin (Laser trap)</div>
                    <div><strong>主要企業:</strong> Quantinuum, IonQ</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-cyber-blue/10 border border-cyber-blue/20 p-3 rounded text-xs text-cyber-blue font-mono flex items-start gap-2">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>Architecture Note:</strong> The National Quantum Mission (NQM) in India supports research across both Superconducting and Photonic hardware architectures, with IITs and TIFR leading transmon research and CDAC spearheading algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
