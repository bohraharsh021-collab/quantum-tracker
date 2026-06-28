import React, { useMemo } from 'react';
import { ALLIANCES_NETWORK, REGIONAL_CONSORTIA } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { Link2, Users, Globe, Briefcase } from 'lucide-react';

export default function AlliancesNode({ articles = [] }) {
  // Merge static alliances with dynamic overrides from news feeds
  const alliancesData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return [...overrides.newAlliances, ...ALLIANCES_NETWORK];
  }, [articles]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Consortia & Alliances Ledger
        </h1>
        <p className="text-sm text-cyber-muted">
          Tracks strategic partnerships, cross-border research pacts, joint ventures, and governmental economic coalitions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Alliances Network */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-cyber-border pb-2.5">
            <Link2 className="text-cyber-accent" size={18} />
            <h2 className="font-mono font-bold uppercase text-white">
              Bilateral Strategic Partnerships
            </h2>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {alliancesData.map(alliance => (
              <div 
                key={alliance.id} 
                className="bg-[#0B1320] border border-cyber-border/80 rounded p-4 space-y-2 hover:border-cyber-blue transition-colors"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 px-2 py-0.5 rounded uppercase">
                    {alliance.type}
                  </span>
                  <span className="text-cyber-muted">{alliance.date}</span>
                </div>
                <h3 className="font-bold font-mono text-xs text-white pt-1">
                  {alliance.partyA} <span className="text-cyber-accent">&harr;</span> {alliance.partyB}
                </h3>
                <p className="text-xs text-cyber-muted leading-relaxed pt-1">
                  {alliance.scope}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Consortia Blocks (Asian and Global) */}
        <div className="space-y-6">
          {/* Asian Consortia */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-cyber-border pb-2.5">
              <Globe className="text-cyber-blue" size={18} />
              <h2 className="font-mono font-bold uppercase text-white">
                Regional Asian Initiatives
              </h2>
            </div>

            <div className="space-y-3">
              {REGIONAL_CONSORTIA.asianConsortia.map((con, idx) => (
                <div key={idx} className="bg-[#0B1320] border border-cyber-border/60 rounded p-3.5 space-y-1">
                  <h3 className="font-bold font-mono text-xs text-cyber-accent">
                    {con.name}
                  </h3>
                  <div className="text-[10px] font-mono text-cyber-muted">
                    MEMBERS: {con.members}
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed pt-1.5">
                    {con.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Consortia */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-cyber-border pb-2.5">
              <Users className="text-cyber-accent" size={18} />
              <h2 className="font-mono font-bold uppercase text-white">
                International Consortia Blocks
              </h2>
            </div>

            <div className="space-y-3">
              {REGIONAL_CONSORTIA.globalConsortia.map((con, idx) => (
                <div key={idx} className="bg-[#0B1320] border border-cyber-border/60 rounded p-3.5 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold font-mono text-xs text-cyber-blue">
                      {con.name}
                    </h3>
                    <span className="text-[9px] font-mono text-cyber-muted bg-cyber-muted/10 px-1 rounded uppercase">
                      {con.region}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-cyber-muted">
                    MEMBERS: {con.members}
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed pt-1.5">
                    {con.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
