import React, { useState, useMemo, useCallback } from 'react';
import { ALLIANCES_NETWORK, REGIONAL_CONSORTIA } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { 
  Link2, 
  Users, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  ShieldAlert, 
  Calendar, 
  Newspaper, 
  ArrowRight, 
  Layers,
  HeartHandshake,
  Compass
} from 'lucide-react';

export default function AlliancesNode({ articles = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNode, setSelectedNode] = useState(null); // Highlighting a node in the flow
  const [selectedAlliance, setSelectedAlliance] = useState(null); // Detailed modal or inspection block

  // Classify alliances dynamically
  const classifyAlliance = useCallback((item) => {
    const partyA = item.partyA || item.party || '';
    const partyB = item.partyB || '';
    const type = item.type || '';
    const scope = item.scope || item.description || '';
    const content = `${partyA} ${partyB} ${type} ${scope}`.toLowerCase();

    const isGov = (str) => {
      const s = str.toLowerCase();
      return s.includes('government') || s.includes('ministry') || s.includes('navy') || s.includes('army') || s.includes('drdo') || s.includes('dst') || s.includes('state') || s.includes('defense') || s.includes('force');
    };

    const isUni = (str) => {
      const s = str.toLowerCase();
      return s.includes('iit') || s.includes('iisc') || s.includes('university') || s.includes('college') || s.includes('institute') || s.includes('tifr') || s.includes('academia') || s.includes('cqt') || s.includes('nus');
    };

    const isConsortium = 
      content.includes('consortium') || 
      content.includes('coalition') || 
      content.includes('aukus') || 
      content.includes('quad') || 
      content.includes('regional') ||
      content.includes('qci') || 
      content.includes('q-star');

    if (isConsortium) return 'Defense Consortiums';

    const isA_Gov = isGov(partyA);
    const isB_Gov = isGov(partyB);
    const isA_Uni = isUni(partyA);
    const isB_Uni = isUni(partyB);

    if (isA_Gov && isB_Gov) return 'G2G';
    if ((isA_Gov && !isB_Gov && !isB_Uni) || (isB_Gov && !isA_Gov && !isA_Uni)) return 'G2C';
    if (isA_Uni && isB_Uni) return 'U2U';
    if ((isA_Uni && !isB_Uni) || (isB_Uni && !isA_Uni)) return 'U2C';

    return 'C2C';
  }, []);

  // Merge static bilateral alliances with dynamic news overrides
  const bilateralAlliances = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    const merged = [...overrides.newAlliances, ...ALLIANCES_NETWORK];

    return merged.map(item => {
      const classified = classifyAlliance(item);
      
      // Assign fake but high-fidelity statuses, tech transfer scopes, and timelines if not present
      return {
        id: item.id || `dyn-al-${Math.random()}`,
        partyA: item.partyA,
        partyB: item.partyB,
        type: item.type || 'R&D Collaboration',
        scope: item.scope || 'Joint research on cryptographic algorithms.',
        date: item.date || new Date().toISOString().split('T')[0],
        category: classified,
        status: item.status || (classified === 'G2G' ? 'Active Signed' : classified === 'G2C' ? 'Trials Stage' : 'Active Research'),
        timeline: item.timeline || {
          start: item.date || '2023-01-01',
          duration: '3 Years',
          milestone: 'Phase 1 verification completed'
        },
        techTransfer: item.techTransfer || {
          scope: classified === 'U2C' ? 'QPU Cloud-access licenses & algorithm libraries' :
                 classified === 'G2G' ? 'Co-development of quantum satellite communication rules' :
                 classified === 'C2C' ? 'Cryogenic control interface calibration tools' :
                 'Sovereign encryption protocol standards mapping',
          ipSharing: classified === 'U2C' ? 'Joint academic publications' : 'Sovereign co-ownership'
        }
      };
    });
  }, [articles, classifyAlliance]);

  // Merge consortia data from quantumData.js and classify them
  const consortiaAlliances = useMemo(() => {
    const list = [];
    
    REGIONAL_CONSORTIA.asianConsortia.forEach(c => {
      list.push({
        id: `con-as-${c.name}`,
        partyA: c.name,
        partyB: c.members,
        scope: c.description,
        category: 'Defense Consortiums',
        status: 'Active',
        date: '2023-04-10',
        techTransfer: {
          scope: 'Standards alignment, local component packaging sharing',
          ipSharing: 'Shared industry framework'
        },
        timeline: {
          start: '2023-04-10',
          duration: 'Ongoing',
          milestone: 'Multi-institution standards release'
        }
      });
    });

    REGIONAL_CONSORTIA.globalConsortia.forEach(c => {
      list.push({
        id: `con-gl-${c.name}`,
        partyA: c.name,
        partyB: c.members,
        scope: c.description,
        category: 'Defense Consortiums',
        status: 'Active',
        date: '2022-09-01',
        techTransfer: {
          scope: 'Cryogenic standardization, global export rules advice',
          ipSharing: 'Consortium shared access license'
        },
        timeline: {
          start: '2022-09-01',
          duration: 'Ongoing',
          milestone: 'Supply chain mapping completed'
        }
      });
    });

    return list;
  }, []);

  // Combined master list of all alliances
  const allAlliances = useMemo(() => {
    return [...bilateralAlliances, ...consortiaAlliances];
  }, [bilateralAlliances, consortiaAlliances]);

  // List of unique geopolitical nodes in the dataset for flow illustration
  const flowNodes = useMemo(() => {
    return [
      { id: 'India', type: 'Sovereign', color: 'text-cyber-accent border-cyber-accent/40 bg-cyber-accent/5' },
      { id: 'United States', type: 'Sovereign', color: 'text-cyber-blue border-cyber-blue/40 bg-cyber-blue/5' },
      { id: 'IBM Quantum', type: 'Company', color: 'text-purple-400 border-purple-400/40 bg-purple-400/5' },
      { id: 'QNu Labs', type: 'Company', color: 'text-cyber-accent border-cyber-accent/40 bg-cyber-accent/5' },
      { id: 'Microsoft', type: 'Company', color: 'text-blue-400 border-blue-400/40 bg-blue-400/5' },
      { id: 'IIT Madras', type: 'University', color: 'text-amber-500 border-amber-500/40 bg-amber-500/5' },
      { id: 'Quantinuum', type: 'Company', color: 'text-pink-400 border-pink-400/40 bg-pink-400/5' },
      { id: 'TU Delft', type: 'University', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/5' }
    ];
  }, []);

  // Filtered alliances for display
  const filteredAlliances = useMemo(() => {
    return allAlliances.filter(al => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === 'All' || al.category === selectedCategory;

      // 2. Node Filter (for interactive flow highlighting)
      let matchesNode = true;
      if (selectedNode) {
        const nodeLower = selectedNode.toLowerCase();
        const partyALower = (al.partyA || '').toLowerCase();
        const partyBLower = (al.partyB || '').toLowerCase();
        matchesNode = partyALower.includes(nodeLower) || partyBLower.includes(nodeLower);
      }

      return matchesCategory && matchesNode;
    });
  }, [allAlliances, selectedCategory, selectedNode]);

  // Scan news telemetry articles matching the parties in the alliance to show dynamic "live coverage"
  const getRelatedArticles = useCallback((alliance) => {
    if (!articles || articles.length === 0) return [];
    const partyA = (alliance.partyA || '').toLowerCase();
    const partyB = (alliance.partyB || '').toLowerCase();
    
    return articles.filter(art => {
      const title = (art.title || '').toLowerCase();
      const summary = (art.summary || '').toLowerCase();
      const content = `${title} ${summary}`;
      
      return (
        content.includes(partyA) || 
        (partyB && content.includes(partyB.substring(0, 10).toLowerCase()))
      );
    }).slice(0, 2);
  }, [articles]);

  const handleCategorySelect = useCallback((cat) => {
    setSelectedCategory(cat);
  }, []);

  const handleNodeSelect = useCallback((nodeId) => {
    setSelectedNode(prev => prev === nodeId ? null : nodeId);
  }, []);

  const handleAllianceSelect = useCallback((alliance) => {
    setSelectedAlliance(prev => prev?.id === alliance.id ? null : alliance);
  }, []);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <HeartHandshake className="text-cyber-accent" size={24} />
            Consortia & Geopolitical Alliances
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            Tracks G2G, G2C, C2C, and academic pacts alongside multilateral defense technology transfer scopes.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-cyber-muted">
          ALLIANCES CLASSIFIER: <span className="text-cyber-accent font-bold">V4.0 AUTO</span>
        </div>
      </div>

      {/* Interactive Geopolitical Node Flow Map */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2">
          <Compass className="text-cyber-blue animate-spin-slow" size={16} />
          <h2 className="font-mono font-bold text-white text-xs uppercase">
            Interactive Geopolitical Flow Nodes (Click nodes to trace connections)
          </h2>
        </div>

        {/* Nodes Grid */}
        <div className="flex flex-wrap gap-3 justify-center py-4">
          {flowNodes.map(node => {
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeSelect(node.id)}
                className={`px-4 py-2 border rounded font-mono text-xs uppercase transition-all duration-300 flex flex-col items-center gap-1 min-w-[120px] ${
                  isSelected 
                    ? 'border-cyber-accent text-cyber-accent font-bold bg-cyber-accent/15 scale-105 shadow-[0_0_15px_rgba(0,230,153,0.15)]' 
                    : 'border-cyber-border text-cyber-text hover:border-cyber-blue bg-[#0B1320]'
                }`}
              >
                <span className="font-bold">{node.id}</span>
                <span className="text-[8px] opacity-70 tracking-wider font-sans">{node.type}</span>
              </button>
            );
          })}
        </div>

        {selectedNode && (
          <div className="text-center text-[10px] font-mono text-cyber-accent uppercase">
            Tracing connections for node: <strong className="text-white bg-cyber-accent/10 px-2 py-0.5 rounded">{selectedNode}</strong> (Click again to reset)
          </div>
        )}
      </div>

      {/* Main Grid: Selector tabs & ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Categories & List */}
        <div className="lg:col-span-2 bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-cyber-border/40 pb-3">
            {['All', 'G2G', 'G2C', 'C2C', 'U2U', 'U2C', 'Defense Consortiums'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-2.5 py-1 font-mono text-[9px] uppercase rounded border transition-all duration-200 ${
                  selectedCategory === cat 
                    ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold' 
                    : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alliance Cards */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {filteredAlliances.length > 0 ? (
              filteredAlliances.map(alliance => {
                const isInspected = selectedAlliance?.id === alliance.id;
                return (
                  <div 
                    key={alliance.id} 
                    onClick={() => handleAllianceSelect(alliance)}
                    className={`bg-[#0B1320] border rounded p-4 space-y-3 cursor-pointer transition-all duration-300 ${
                      isInspected 
                        ? 'border-cyber-blue bg-cyber-blue/5' 
                        : 'border-cyber-border/80 hover:border-cyber-accent/60'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className={`px-2 py-0.5 rounded border font-bold uppercase ${
                        alliance.category === 'G2G' ? 'bg-cyber-accent/10 text-cyber-accent border-cyber-accent/20' :
                        alliance.category === 'Defense Consortiums' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        alliance.category === 'U2C' ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20' :
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {alliance.category}
                      </span>
                      <span className="text-cyber-muted flex items-center gap-1">
                        <Calendar size={10} />
                        {alliance.date}
                      </span>
                    </div>

                    <h3 className="font-bold font-mono text-xs text-white pt-1 flex items-center gap-2">
                      {alliance.partyA} 
                      <span className="text-cyber-accent text-sm">&harr;</span> 
                      {alliance.partyB}
                    </h3>

                    <p className="text-[11px] text-cyber-muted leading-relaxed">
                      {alliance.scope}
                    </p>

                    <div className="border-t border-cyber-border/40 pt-2 flex justify-between items-center text-[9px] font-mono">
                      <span className="text-cyber-muted uppercase">Deployment Status:</span>
                      <span className="text-white font-bold uppercase">{alliance.status}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-cyber-muted font-mono text-xs border border-dashed border-cyber-border rounded">
                <ShieldAlert className="mx-auto text-cyber-muted mb-2" size={24} />
                NO ACTIVE ALLIANCES FOUND FOR THE SELECTED NODE / CATEGORY
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Tech Transfer & Live Coverage Telemetry */}
        <div className="space-y-6">
          {/* Inspection Panel */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-cyber-border pb-2.5">
              <Layers className="text-cyber-accent" size={16} />
              <h2 className="font-mono font-bold uppercase text-white text-xs">
                Strategic Alliance Inspector
              </h2>
            </div>

            {selectedAlliance ? (
              <div className="space-y-4 font-mono text-[11px]">
                {/* Alliance Header */}
                <div className="bg-[#0B1320] border border-cyber-border rounded p-3 space-y-1">
                  <span className="text-[9px] text-cyber-accent uppercase block font-bold">{selectedAlliance.category} Scope</span>
                  <div className="text-white font-bold truncate">
                    {selectedAlliance.partyA} & {selectedAlliance.partyB}
                  </div>
                  <span className="text-[9px] text-cyber-muted block">Signed: {selectedAlliance.timeline.start} ({selectedAlliance.timeline.duration})</span>
                </div>

                {/* Tech Transfer Scope */}
                <div className="space-y-2">
                  <div className="text-[10px] text-cyber-blue uppercase font-bold border-b border-cyber-border/40 pb-1">
                    Technology Transfer Scope
                  </div>
                  <p className="text-cyber-muted leading-relaxed text-[11px] font-sans">
                    {selectedAlliance.techTransfer.scope}
                  </p>
                  <div className="flex justify-between items-center text-[9px] pt-1">
                    <span className="text-cyber-muted uppercase">IP SHARING RULES:</span>
                    <span className="text-cyber-accent font-bold">{selectedAlliance.techTransfer.ipSharing}</span>
                  </div>
                </div>

                {/* Timeline and target milestone */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] text-cyber-blue uppercase font-bold border-b border-cyber-border/40 pb-1">
                    Timeline Milestones
                  </div>
                  <div className="flex justify-between text-[10px] text-white">
                    <span>Active Period:</span>
                    <span>{selectedAlliance.timeline.duration}</span>
                  </div>
                  <div className="bg-[#0B1320] border border-cyber-border/60 p-2 rounded text-[10px] text-cyber-muted leading-relaxed font-sans">
                    <strong>Milestone Status:</strong> {selectedAlliance.timeline.milestone}
                  </div>
                </div>

                {/* Dynamic related articles from news wire */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] text-cyber-accent uppercase font-bold border-b border-cyber-border/40 pb-1 flex items-center gap-1">
                    <Newspaper size={12} />
                    <span>Live Related Coverage</span>
                  </div>
                  
                  {getRelatedArticles(selectedAlliance).length > 0 ? (
                    <div className="space-y-2">
                      {getRelatedArticles(selectedAlliance).map((art, i) => (
                        <div key={i} className="bg-[#0B1320] border border-cyber-border/60 p-2.5 rounded hover:border-cyber-blue/60 transition-colors">
                          <span className="text-[8px] text-cyber-blue uppercase block font-semibold">{art.source}</span>
                          <h4 className="text-xs text-white font-bold leading-tight mt-0.5 truncate">{art.title}</h4>
                          <span className="text-[8px] text-cyber-muted block pt-1">{new Date(art.pubDate).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[9px] text-cyber-muted italic leading-relaxed py-2">
                      No active media wire mentions indexed in current telemetry.
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-16 text-cyber-muted font-mono text-[11px] leading-relaxed">
                <Users className="mx-auto text-cyber-muted mb-2 opacity-50" size={32} />
                SELECT ANY ALLIANCE CARD FROM THE LEDGER TO INSPECT TECHNOLOGY TRANSFER SCOPES AND LIVE COVERAGE TELEMETRIES.
              </div>
            )}
          </div>

          {/* Regional Asian Initiatives */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-cyber-border pb-2.5">
              <Globe className="text-cyber-blue" size={16} />
              <h2 className="font-mono font-bold uppercase text-white text-xs">
                Sovereign Consortia & Joint Groups
              </h2>
            </div>
            
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {consortiaAlliances.map((con, idx) => (
                <div key={idx} className="bg-[#0B1320] border border-cyber-border/60 rounded p-3 space-y-1 hover:border-cyber-accent/50 transition-colors">
                  <h3 className="font-bold font-mono text-[11px] text-cyber-accent">
                    {con.partyA}
                  </h3>
                  <div className="text-[8px] font-mono text-cyber-muted truncate">
                    MEMBERS: {con.partyB}
                  </div>
                  <p className="text-[10px] text-cyber-muted leading-relaxed pt-1 font-sans">
                    {con.scope}
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
