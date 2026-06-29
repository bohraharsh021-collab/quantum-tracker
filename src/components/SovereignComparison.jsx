import React, { useState, useMemo, useCallback } from 'react';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { 
  Globe, 
  Cpu, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Search, 
  Building2, 
  Zap,
  GitCompare,
  CheckCircle2,
  Info,
  Lock,
  Layers,
  Award
} from 'lucide-react';

// Complete high-fidelity comparative dataset
export const SOVEREIGN_COMPARISON_DATA = [
  {
    id: "india",
    country: "India",
    flag: "🇮🇳",
    fundingUSD: 0.73, // Billion USD (INR 6,003 Crore)
    fundingDetails: "$0.73B (₹6,003 Cr) allocated under the National Quantum Mission (NQM) (2023 - 2031).",
    qubitRange: "8 - 50 Qubits",
    qubitMin: 8,
    qubitMax: 50,
    qubitDetails: "Lab-tested superconducting transmons and photonic prototype circuits in R&D stages.",
    workforce: "2,000+ Researchers",
    workforceSize: 2000,
    workforceDetails: "Targeting 2,000+ trained postgrads, PhDs, and tech professionals through DST skill-development blocks.",
    hubs: [
      { name: "IISc Quantum Hardware Lab", city: "Bengaluru", role: "Superconducting Transmon Fabrication & Quantum Sensors" },
      { name: "TIFR Quantum Measurement Lab", city: "Mumbai", role: "Microwave control circuits & coherence optimization" },
      { name: "IIT Madras Quantum Hub", city: "Chennai", role: "IBM Quantum Network anchor, algorithms & financial modeling" },
      { name: "IIT Bombay (QSEC)", city: "Mumbai", role: "Silicon integrated photonic chips & quantum sensing" },
      { name: "C-DAC Pune (QSim Hub)", city: "Pune", role: "National Quantum Simulator software coordinator" }
    ],
    techFocus: [
      "Superconducting Transmons",
      "Post-Quantum Cryptography (PQC)",
      "Satellite & Fiber QKD Networks",
      "Quantum Sensors for Defense"
    ],
    bottlenecks: [
      "No domestic cryogenic Helium-3 purification or supply chain.",
      "Lack of advanced semiconductor fabs (heavily dependent on foreign foundries for silicon wafer patterning).",
      "Extreme reliance on imported dilution refrigerators (e.g., Bluefors, Oxford Instruments)."
    ],
    strategicPriority: "Sovereign autonomy in critical infrastructure security & military-grade quantum communication.",
    readinessScore: 65 // Out of 100
  },
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    fundingUSD: 6.8, // Estimated $1.8B NQI + $5.0B corporate/VC
    fundingDetails: "$1.8B National Quantum Initiative (NQI) Act (federal) + an estimated $5B+ in commercial enterprise R&D & VC.",
    qubitRange: "100 - 1,121+ Qubits",
    qubitMin: 100,
    qubitMax: 1121,
    qubitDetails: "1,121-qubit physical superconducting QPUs (IBM Condor) and high-fidelity trapped-ion architectures.",
    workforce: "12,000+ Professionals",
    workforceSize: 12000,
    workforceDetails: "Robust talent pipeline across tech giants (IBM, Google, Microsoft), specialized startups, and academic coalitions.",
    hubs: [
      { name: "IBM Quantum Yorktown", city: "Yorktown Heights, NY", role: "Superconducting processors & utility-scale cloud hubs" },
      { name: "Google Quantum AI Lab", city: "Santa Barbara, CA", role: "Sycamore processor, logical qubits & surface code correction" },
      { name: "Chicago Quantum Exchange", city: "Chicago, IL", role: "Multi-university testbed & regional quantum fiber loop" },
      { name: "Quantinuum R&D Fabs", city: "Broomfield, CO", role: "High-fidelity trapped-ion H-Series hardware fabrication" },
      { name: "MIT Center for Quantum Engineering", city: "Cambridge, MA", role: "Superconducting qubits, diamonds, and algorithms research" }
    ],
    techFocus: [
      "Superconducting Qubits",
      "Trapped-Ion Processors",
      "Silicon Spin Qubits",
      "Quantum Error Correction (QEC)",
      "Hybrid Quantum-Cloud Platforms"
    ],
    bottlenecks: [
      "Limited domestic Helium-3 reserves, vulnerable to foreign export caps.",
      "Dependence on global packaging assembly chains (e.g. Taiwan, SE Asia) for sub-component packaging.",
      "Visa delays and immigration restrictions slowing the import of high-level foreign PhD talent."
    ],
    strategicPriority: "Global commercial enterprise leadership, full-stack dominance, and setting worldwide cryptography standards.",
    readinessScore: 95
  },
  {
    id: "china",
    country: "China",
    flag: "🇨🇳",
    fundingUSD: 10.0, // Estimated state-directed budget
    fundingDetails: "Estimated $10.0B+ state-directed strategic funding, centralizing resources through national labs.",
    qubitRange: "66 - 176+ Qubits",
    qubitMin: 66,
    qubitMax: 176,
    qubitDetails: "176-detected photon GBS prototype (Jiuzhang 3.0) and 66-qubit superconducting QPUs (Zu Chongzhi 2.1).",
    workforce: "9,000+ Researchers",
    workforceSize: 9000,
    workforceDetails: "State-channelled academic pipelines directing thousands of scholars into quantum communication and hardware labs.",
    hubs: [
      { name: "Hefei National Laboratory", city: "Hefei", role: "Central strategic research node, transmon fabs & photonic testing" },
      { name: "USTC Quantum Center", city: "Hefei", role: "Micius satellite laser terminal & Jiuzhang photonic design" },
      { name: "Tencent Quantum Lab", city: "Shenzhen", role: "Chemical simulation, drug discovery algorithms & software suites" },
      { name: "QuantumCTek Integration", city: "Shanghai", role: "Commercial QKD terminal integration and backbone network engineering" },
      { name: "Alibaba CAS Joint Laboratory", city: "Hangzhou", role: "Superconducting cloud service trials & algorithm structures" }
    ],
    techFocus: [
      "Photonic Quantum Computing",
      "Satellite-to-Ground QKD Links",
      "Superconducting Qubits",
      "Nationwide Fiber Cryptography Grids"
    ],
    bottlenecks: [
      "Blocked from importing advanced DUV/EUV lithography machines (e.g., ASML) due to international export controls.",
      "High reliance on US-designed Electronic Design Automation (EDA) software for silicon modeling.",
      "Vulnerability to high-frequency coaxial cables and RF electronics import bans."
    ],
    strategicPriority: "Unbreakable nation-scale cryptographic communication, space-based QKD networks, and photonic simulation.",
    readinessScore: 92
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    fundingUSD: 3.5, // £2.5 Billion
    fundingDetails: "£2.5B ($3.5B USD) allocated under the UK National Quantum Strategy (2024 - 2034).",
    qubitRange: "32 - 100 Qubits",
    qubitMin: 32,
    qubitMax: 100,
    qubitDetails: "Quantinuum's trapped-ion processors (H-Series) and Oxford Quantum Circuits' superconducting QPUs.",
    workforce: "4,000+ Researchers",
    workforceSize: 4000,
    workforceDetails: "Highly concentrated hubs of excellence fueled by the UK National Quantum Technologies Programme.",
    hubs: [
      { name: "National Quantum Computing Centre", city: "Harwell", role: "National testbed hosting multiple physical hardware configurations" },
      { name: "Oxford University Quantum Hub", city: "Oxford", role: "Ion-trap computing, high-precision atomic clocks, and spin research" },
      { name: "Cambridge Quantum Computing", city: "Cambridge", role: "TKET compiler development and quantum chemical software" },
      { name: "University of Bristol Hub", city: "Bristol", role: "Silicon photonics, secure optical routers & quantum internet links" },
      { name: "Oxford Quantum Circuits Fab", city: "Oxford", role: "Coaxial transmon architectures and enterprise cloud QPUs" }
    ],
    techFocus: [
      "Trapped-Ion Hardware",
      "Compiler Optimization & SDKs",
      "Photonic Processing (Orca)",
      "High-Fidelity Quantum Metrology"
    ],
    bottlenecks: [
      "Reliance on foreign semiconductor packaging foundries (primarily in Asia).",
      "Limited domestic manufacturing capacity for specialized laser diodes and custom optics.",
      "Talent drain to higher-paying US corporations and venture-backed startups."
    ],
    strategicPriority: "World-class hardware compiler design, integration into global finance sectors, and high-fidelity computing.",
    readinessScore: 82
  },
  {
    id: "eu",
    country: "European Union",
    flag: "🇪🇺",
    fundingUSD: 8.5, // Merged EU + National
    fundingDetails: "€8.0B+ ($8.5B USD) combined funding, including €1B EU Flagship, €2B Germany, €1.8B France, and €0.6B Netherlands.",
    qubitRange: "50 - 256+ Qubits",
    qubitMin: 50,
    qubitMax: 256,
    qubitDetails: "256-atom neutral atom simulator (Pasqal) and research superconducting processors (IQM).",
    workforce: "7,500+ Researchers",
    workforceSize: 7500,
    workforceDetails: "Deeply collaborative cross-border research networks connecting inter-state institutes and spin-offs.",
    hubs: [
      { name: "QuTech at TU Delft", city: "Delft, Netherlands", role: "Silicon spin qubits, topological materials, and quantum internet nodes" },
      { name: "Munich Quantum Valley", city: "Munich, Germany", role: "Neutral atom arrays, superconducting hardware, and computing simulators" },
      { name: "CEA-Leti & CEA-Saclay", city: "Grenoble, France", role: "Cryogenic silicon spin engineering and industrial microelectronics" },
      { name: "VTT Technical Research Centre", city: "Espoo, Finland", role: "Superconducting hardware fabrication and low-temp electronics" },
      { name: "ICFO - Institute of Photonic Sciences", city: "Barcelona, Spain", role: "Quantum communication networks, sensors, and quantum simulators" }
    ],
    techFocus: [
      "Neutral Atom Simulators",
      "Silicon Spin Qubits",
      "Cryogenic Component Tooling",
      "Quantum Internet & Networking"
    ],
    bottlenecks: [
      "Geopolitical friction in state funding allocations slowing cooperative projects.",
      "Lagging venture capital ecosystems relative to US, leading to slower commercial scaling.",
      "Heavily reliant on US-managed cloud infrastructure for distributing QPU access."
    ],
    strategicPriority: "Securing semiconductor lithography supply chains (ASML) and fostering EU-wide data sovereignty.",
    readinessScore: 88
  },
  {
    id: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    fundingUSD: 0.27, // SGD 360M+
    fundingDetails: "SGD 360M+ ($0.27B USD) via the National Research Foundation (NRF) and National Quantum Strategy.",
    qubitRange: "5 - 20 Qubits",
    qubitMin: 5,
    qubitMax: 20,
    qubitDetails: "Small-scale optical and silicon dot testing beds at university research centers.",
    workforce: "800+ Researchers",
    workforceSize: 800,
    workforceDetails: "Highly specialized and dense talent pool concentrated around the Centre for Quantum Technologies.",
    hubs: [
      { name: "Centre for Quantum Technologies (CQT)", city: "Singapore", role: "Space-based QKD nano-satellites, optical qubits & materials" },
      { name: "A*STAR Quantum Labs", city: "Singapore", role: "Quantum algorithms for finance, chemistry simulations & sensors" },
      { name: "NTU School of Physical Sciences", city: "Singapore", role: "Spin-based materials, quantum cryptography protocols" },
      { name: "Horizon Quantum Computing", city: "Singapore", role: "Automated compiler translation & classical code synthesis tools" }
    ],
    techFocus: [
      "Satellite QKD Payloads",
      "Compiler Automation Tools",
      "Fintech Optimization Models",
      "Quantum Metrology & Clocks"
    ],
    bottlenecks: [
      "Lack of domestic heavy hardware fabrication foundries.",
      "Limited domestic land for large-scale cryogenic infrastructure.",
      "Reliance on international supply chains for high-end optical components."
    ],
    strategicPriority: "Becoming Southeast Asia's primary quantum-safe financial center and software compiler exporter.",
    readinessScore: 72
  }
];

export default function SovereignComparison({ articles = [] }) {
  const sovereignData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return SOVEREIGN_COMPARISON_DATA.map(nation => {
      if (nation.id === 'india' && overrides.indiaQubits) {
        return {
          ...nation,
          qubitRange: `${overrides.indiaQubits} Qubits (Live Upgrade)`,
          qubitMax: overrides.indiaQubits,
          qubitDetails: `Auto-updated via news wire: QpiAI India announced a successful ${overrides.indiaQubits}-qubit processing benchmark.`
        };
      }
      return nation;
    });
  }, [articles]);

  const [activeNation, setActiveNation] = useState(SOVEREIGN_COMPARISON_DATA[0].id);
  const [compareSource, setCompareSource] = useState(SOVEREIGN_COMPARISON_DATA[0].id);
  const [compareTarget, setCompareTarget] = useState(SOVEREIGN_COMPARISON_DATA[1].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('matrix'); // 'matrix', 'compare', 'charts', 'hubs'
  
  const [selectedForCharts, setSelectedForCharts] = useState(
    () => SOVEREIGN_COMPARISON_DATA.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
  );

  const currentNationData = useMemo(() => {
    return sovereignData.find(n => n.id === activeNation);
  }, [sovereignData, activeNation]);

  const sourceCompareData = useMemo(() => {
    return sovereignData.find(n => n.id === compareSource);
  }, [sovereignData, compareSource]);

  const targetCompareData = useMemo(() => {
    return sovereignData.find(n => n.id === compareTarget);
  }, [sovereignData, compareTarget]);

  // Compute Cockpit HUD Metrics
  const totalGlobalBudget = useMemo(() => {
    return sovereignData.reduce((sum, item) => sum + item.fundingUSD, 0);
  }, [sovereignData]);

  const maxQubitsTargeted = useMemo(() => {
    return Math.max(...sovereignData.map(item => item.qubitMax));
  }, [sovereignData]);

  const totalResearchers = useMemo(() => {
    return sovereignData.reduce((sum, item) => sum + item.workforceSize, 0);
  }, [sovereignData]);

  const indiaData = useMemo(() => {
    return sovereignData.find(n => n.id === 'india');
  }, [sovereignData]);

  // Filter nations for search
  const filteredNations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return sovereignData.filter(n => {
      return (
        n.country.toLowerCase().includes(query) ||
        n.techFocus.some(f => f.toLowerCase().includes(query)) ||
        n.hubs.some(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  // Checkbox toggle for charts overlay
  const handleChartToggle = useCallback((id) => {
    setSelectedForCharts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Max funding / qubit limits for CSS charts scaling
  const maxFundingVal = useMemo(() => {
    const activeValues = SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).map(n => n.fundingUSD);
    return Math.max(...activeValues, 1);
  }, [selectedForCharts]);

  const maxQubitVal = useMemo(() => {
    const activeValues = SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).map(n => n.qubitMax);
    return Math.max(...activeValues, 1);
  }, [selectedForCharts]);

  return (
    <div className="space-y-6">
      
      {/* Cockpit HUD Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111A28]/25 p-4 rounded border border-cyber-border/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyber-accent rounded-full animate-ping"></span>
            <span className="font-mono text-[10px] text-cyber-accent uppercase tracking-widest">Sovereign Intel Stream Active</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase mt-1">
            Sovereign Cockpit & Competitive Matrix
          </h1>
          <p className="text-sm text-cyber-muted mt-0.5">
            Cross-border comparative analysis of national funding, qubit milestones, research hubs, and competitive SWOT positioning.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-[#111A28] border border-cyber-border rounded p-1 self-start md:self-auto z-10">
          {[
            { id: 'matrix', label: 'Sovereign Matrix' },
            { id: 'compare', label: 'Side-by-Side', icon: <GitCompare size={12} /> },
            { id: 'charts', label: 'Telemetry Charts', icon: <Layers size={12} /> },
            { id: 'hubs', label: 'Research Hubs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase rounded transition-all flex items-center gap-1.5 ${
                viewMode === tab.id 
                  ? 'bg-cyber-accent/15 text-cyber-accent font-bold border border-cyber-accent/30 shadow-[0_0_15px_rgba(0,230,153,0.15)]' 
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Cockpit Metrics HUD Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Aggregated Global Budget */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-accent transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Globe size={48} className="text-cyber-accent" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted block uppercase">Global Sovereign Pool</span>
          <span className="text-3xl font-bold text-cyber-accent font-mono block mt-2">
            ${totalGlobalBudget.toFixed(2)}B
          </span>
          <span className="text-[11px] text-cyber-muted mt-2 block border-t border-cyber-border/40 pt-2 font-mono">
            Logged across {SOVEREIGN_COMPARISON_DATA.length} major initiatives.
          </span>
        </div>

        {/* Card 2: India's NQM Funding Share */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-blue transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Award size={48} className="text-cyber-blue" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted block uppercase">India NQM Funding</span>
          <span className="text-3xl font-bold text-cyber-blue font-mono block mt-2">
            ${indiaData?.fundingUSD}B
          </span>
          <div className="mt-2 border-t border-cyber-border/40 pt-2 flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-mono text-cyber-muted">
              <span>Global Funding Share:</span>
              <span className="text-white font-bold">{((indiaData?.fundingUSD / totalGlobalBudget) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#0B1320] h-1 rounded-full overflow-hidden border border-cyber-border/50">
              <div className="bg-cyber-blue h-full" style={{ width: `${(indiaData?.fundingUSD / totalGlobalBudget) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Peak Qubits */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-amber-500 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Cpu size={48} className="text-amber-500" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted block uppercase">Peak Qubit Target</span>
          <span className="text-3xl font-bold text-amber-500 font-mono block mt-2">
            {maxQubitsTargeted}
          </span>
          <span className="text-[11px] text-cyber-muted mt-2 block border-t border-cyber-border/40 pt-2 font-mono">
            Max physical qubits (US Condor logged).
          </span>
        </div>

        {/* Card 4: Workforce */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-purple-500 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Users size={48} className="text-purple-500" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted block uppercase">Global Talent Pool</span>
          <span className="text-3xl font-bold text-purple-400 font-mono block mt-2">
            {totalResearchers.toLocaleString()}+
          </span>
          <span className="text-[11px] text-cyber-muted mt-2 block border-t border-cyber-border/40 pt-2 font-mono">
            Quantum engineers & researchers logged.
          </span>
        </div>
      </div>

      {/* MATRIX VIEW */}
      {viewMode === 'matrix' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-cyber-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search sovereign initiatives, hubs, or core technology focuses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111A28] border border-cyber-border rounded pl-9 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-cyber-accent text-white"
            />
          </div>

          {/* Interactive Comparison Table */}
          <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyber-border bg-[#0B1320]/60 font-mono text-[10px] uppercase text-cyber-muted">
                    <th className="p-4 font-bold">Nation / Region</th>
                    <th className="p-4 font-bold">Funding (USD)</th>
                    <th className="p-4 font-bold">Qubit Capacity</th>
                    <th className="p-4 font-bold">Workforce Size</th>
                    <th className="p-4 font-bold">Key Technologies</th>
                    <th className="p-4 font-bold text-center">Security Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40 font-mono text-xs">
                  {filteredNations.map((nation) => (
                    <tr 
                      key={nation.id} 
                      onClick={() => setActiveNation(nation.id)}
                      className={`hover:bg-cyber-border/20 transition-all cursor-pointer ${
                        activeNation === nation.id ? 'bg-cyber-accent/5 text-white' : 'text-cyber-text'
                      }`}
                    >
                      <td className="p-4 font-bold flex items-center gap-2.5">
                        <span className="text-lg leading-none">{nation.flag}</span>
                        <div>
                          <span>{nation.country}</span>
                          <span className="text-[10px] text-cyber-muted block font-normal normal-case">
                            Priority: {nation.strategicPriority.slice(0, 45)}...
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-cyber-accent">
                          ${nation.fundingUSD} Billion
                        </div>
                        <span className="text-[9px] text-cyber-muted block mt-0.5">
                          {nation.id === 'india' ? '₹6,003 Crore' : nation.id === 'uk' ? '£2.5 Billion' : 'State + Corp'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <Cpu size={12} className="text-cyber-blue" />
                          <span className="font-bold text-cyber-blue">{nation.qubitRange}</span>
                        </div>
                        <span className="text-[9px] text-cyber-muted block mt-0.5 max-w-[140px] truncate">
                          {nation.qubitDetails}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users size={12} className="text-white" />
                          <span>{nation.workforce}</span>
                        </div>
                        <div className="w-24 bg-cyber-border rounded-full h-1 mt-1.5 overflow-hidden">
                          <div 
                            className="bg-cyber-blue h-full rounded-full" 
                            style={{ width: `${Math.min(100, (nation.workforceSize / 12000) * 100)}%` }} 
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[280px]">
                          {nation.techFocus.slice(0, 2).map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="text-[9px] bg-cyber-border/40 text-cyber-text px-1.5 py-0.5 rounded border border-cyber-border"
                            >
                              {tech}
                            </span>
                          ))}
                          {nation.techFocus.length > 2 && (
                            <span className="text-[9px] text-cyber-muted px-1 py-0.5 font-bold">
                              +{nation.techFocus.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          nation.readinessScore >= 90
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : nation.readinessScore >= 80
                            ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                          {nation.readinessScore}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredNations.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-cyber-muted">
                        No sovereign nations matched search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Deep-Dive Panel */}
          {currentNationData && (
            <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-6">
              {/* Profile Title */}
              <div className="border-b border-cyber-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl leading-none">{currentNationData.flag}</span>
                  <div>
                    <h2 className="text-lg font-bold font-mono text-white uppercase flex items-center gap-2">
                      {currentNationData.country} Quantum Dossier
                      <span className="text-xs font-mono font-normal normal-case text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20">
                        Active Profile
                      </span>
                    </h2>
                    <span className="text-xs font-mono text-cyber-muted">
                      Strategic Priority: {currentNationData.strategicPriority}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono text-cyber-muted uppercase">Readiness Score:</span>
                  <span className="text-sm font-bold font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-1 rounded border border-cyber-accent/20">
                    {currentNationData.readinessScore} / 100
                  </span>
                </div>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Col: Core Stats */}
                <div className="space-y-4 lg:col-span-1">
                  <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">
                    Infrastructure Metrics
                  </span>

                  {/* Funding */}
                  <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-cyber-accent border-b border-cyber-border/40 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Funding Strength</span>
                      <TrendingUp size={14} />
                    </div>
                    <div className="text-xl font-bold font-mono text-white">
                      ${currentNationData.fundingUSD} Billion
                    </div>
                    <p className="text-xs text-cyber-muted leading-relaxed">
                      {currentNationData.fundingDetails}
                    </p>
                  </div>

                  {/* Qubits */}
                  <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-cyber-blue border-b border-cyber-border/40 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Qubit Capacity</span>
                      <Cpu size={14} />
                    </div>
                    <div className="text-xl font-bold font-mono text-white">
                      {currentNationData.qubitRange}
                    </div>
                    <p className="text-xs text-cyber-muted leading-relaxed">
                      {currentNationData.qubitDetails}
                    </p>
                  </div>

                  {/* Workforce */}
                  <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-white border-b border-cyber-border/40 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Workforce Base</span>
                      <Users size={14} />
                    </div>
                    <div className="text-xl font-bold font-mono text-white">
                      {currentNationData.workforce}
                    </div>
                    <p className="text-xs text-cyber-muted leading-relaxed">
                      {currentNationData.workforceDetails}
                    </p>
                  </div>
                </div>

                {/* Mid Col: Tech Focus and Research Hubs */}
                <div className="space-y-4 lg:col-span-1">
                  <div>
                    <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2">
                      Core Technology Focuses
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {currentNationData.techFocus.map((tech, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#0B1320] border border-cyber-border rounded px-3 py-2 flex items-center gap-2"
                        >
                          <Zap size={12} className="text-cyber-accent" />
                          <span className="text-xs font-mono text-white">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2">
                      Active Research Hubs ({currentNationData.hubs.length})
                    </span>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {currentNationData.hubs.map((hub, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#0B1320] border border-cyber-border rounded p-2.5 hover:border-cyber-blue transition-all"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-cyber-blue">
                            <span>{hub.name}</span>
                            <span className="text-cyber-muted font-normal">{hub.city}</span>
                          </div>
                          <p className="text-[10px] text-cyber-muted mt-1 leading-normal">
                            {hub.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Supply Chain Bottlenecks & Vulnerabilities */}
                <div className="lg:col-span-1 bg-amber-500/5 border border-amber-500/20 rounded p-4 space-y-4">
                  <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2 text-amber-500">
                    <AlertTriangle size={18} />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      Strategic Supply Chain Risks
                    </span>
                  </div>

                  <p className="text-xs text-cyber-text leading-relaxed">
                    Geopolitical vulnerabilities in manufacturing pipelines, cryogenic gases, and patent lockouts.
                  </p>

                  <div className="space-y-3">
                    {currentNationData.bottlenecks.map((bot, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2.5 text-xs text-cyber-muted bg-[#0B1320]/60 border border-cyber-border/40 p-2.5 rounded hover:border-amber-500/30 transition-all"
                      >
                        <span className="text-amber-500 font-bold font-mono">0{idx + 1}.</span>
                        <p className="leading-relaxed">{bot}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-cyber-border/40 text-[10px] font-mono text-cyber-muted flex items-center justify-between">
                    <span>SECURITY CLASSIFICATION:</span>
                    <span className="text-white font-bold">RESTRICTED DOSSIER</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* McKinsey-style SWOT quadrant analyzing India's competitive positioning */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 mt-6">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2">
                <Award className="text-cyber-accent animate-pulse" size={18} />
                <h2 className="font-mono font-bold uppercase text-white text-sm">
                  McKinsey SWOT Matrix: India Sovereign Positioning
                </h2>
              </div>
              <span className="text-[10px] font-mono text-cyber-muted bg-cyber-accent/15 px-2 py-0.5 rounded border border-cyber-accent/30 uppercase">
                STRATEGIC SCREEN
              </span>
            </div>

            <p className="text-xs text-cyber-muted leading-relaxed font-mono">
              Evaluating India's domestic capability base under the ₹6,003 Crore National Quantum Mission (2023-2031). Benchmark coordinates mapped relative to USA/China.
            </p>

            {/* 2x2 SWOT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* STRENGTHS */}
              <div className="bg-[#0B1320] border border-emerald-500/25 rounded p-4 space-y-3 hover:border-emerald-500/50 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                  S
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={16} />
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider">Internal Strengths</h3>
                </div>
                <ul className="space-y-2 text-[11px] font-mono text-cyber-text leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">▪</span>
                    <span><strong>Talent Infrastructure:</strong> Vast pool of high-tier mathematical, software, and physics graduates centered at IISc, IITs, and TIFR.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">▪</span>
                    <span><strong>Defense Synergy:</strong> Established procurement pipelines partnering public security units (DRDO/Army) with indigenous QKD builders like QNu Labs.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">▪</span>
                    <span><strong>NQM Authorization:</strong> Centralized ₹6,003 Cr mission budget protecting strategic hardware initiatives from immediate commercial market stress.</span>
                  </li>
                </ul>
              </div>

              {/* WEAKNESSES */}
              <div className="bg-[#0B1320] border border-rose-500/25 rounded p-4 space-y-3 hover:border-rose-500/50 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-rose-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-rose-500/10 text-rose-400 font-mono text-[10px] font-bold">
                  W
                </div>
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle size={16} />
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider">Internal Weaknesses</h3>
                </div>
                <ul className="space-y-2 text-[11px] font-mono text-cyber-text leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">▪</span>
                    <span><strong>Cryogenic Supply chain:</strong> Total reliance on imports for dilution refrigerators (e.g. Bluefors) and cryogenic Helium-3 purification systems.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">▪</span>
                    <span><strong>Foundry Bottlenecks:</strong> Lack of sub-28nm local silicon fabrication, delaying rapid testing cycles of custom spin-qubit integrated circuits.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">▪</span>
                    <span><strong>VC Capital Scale:</strong> Private investments in Indian quantum startups range from $5M-$12M Series A, trailing far behind US/EU averages ($50M+).</span>
                  </li>
                </ul>
              </div>

              {/* OPPORTUNITIES */}
              <div className="bg-[#0B1320] border border-cyber-blue/25 rounded p-4 space-y-3 hover:border-cyber-blue/50 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-cyber-blue/5 rounded-bl-full flex items-center justify-center border-l border-b border-cyber-blue/10 text-cyber-blue font-mono text-[10px] font-bold">
                  O
                </div>
                <div className="flex items-center gap-2 text-cyber-blue">
                  <TrendingUp size={16} />
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider">External Opportunities</h3>
                </div>
                <ul className="space-y-2 text-[11px] font-mono text-cyber-text leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyber-blue mt-0.5">▪</span>
                    <span><strong>Digital Public Infrastructure:</strong> Rapidly deploying NIST post-quantum cryptography (PQC) standards across UPI and Aadhaar cores.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyber-blue mt-0.5">▪</span>
                    <span><strong>US-India iCET Alliance:</strong> Tapping global research access, exchange fellowships, and semiconductor packaging joint-ventures.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-cyber-blue mt-0.5">▪</span>
                    <span><strong>Satellite QKD grids:</strong> Fabricating LEO satellites to launch a secure, trans-continental laser-encrypted communication network.</span>
                  </li>
                </ul>
              </div>

              {/* THREATS */}
              <div className="bg-[#0B1320] border border-amber-500/25 rounded p-4 space-y-3 hover:border-amber-500/50 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-full flex items-center justify-center border-l border-b border-amber-500/10 text-amber-400 font-mono text-[10px] font-bold">
                  T
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                  <Lock size={16} />
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider">External Threats</h3>
                </div>
                <ul className="space-y-2 text-[11px] font-mono text-cyber-text leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">▪</span>
                    <span><strong>Brain Drain poaching:</strong> High-performing Indian researchers being recruited away by massive capital hubs in US/China/EU labs.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">▪</span>
                    <span><strong>Superpower Hardware Gap:</strong> Global competitors demonstrating fault-tolerant logical scale (1000+ qubits) before India operates 50 qubits.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">▪</span>
                    <span><strong>Legacy Decryption:</strong> Factorization breakthroughs (Shor's algorithm factoring RSA-2048) before national security links are fully encrypted.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* COMPARISON VIEW */}
      {viewMode === 'compare' && (
        <div className="space-y-6">
          {/* Pickers */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs font-mono text-cyber-muted uppercase">Base Sovereign:</span>
              <select
                value={compareSource}
                onChange={(e) => setCompareSource(e.target.value)}
                className="bg-[#0B1320] border border-cyber-border rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyber-accent"
              >
                {sovereignData.map(n => (
                  <option key={n.id} value={n.id}>{n.flag} {n.country}</option>
                ))}
              </select>
            </div>

            <div className="text-cyber-muted font-mono hidden sm:block">VS</div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs font-mono text-cyber-muted uppercase">Compare To:</span>
              <select
                value={compareTarget}
                onChange={(e) => setCompareTarget(e.target.value)}
                className="bg-[#0B1320] border border-cyber-border rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyber-accent"
              >
                {sovereignData.map(n => (
                  <option key={n.id} value={n.id} disabled={n.id === compareSource}>
                    {n.flag} {n.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid Side-by-Side */}
          {sourceCompareData && targetCompareData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Base Sovereign Card */}
              <div className="bg-[#111A28] border border-cyber-accent/20 rounded p-5 space-y-4 hover:border-cyber-accent/50 transition-all duration-300">
                <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sourceCompareData.flag}</span>
                    <h3 className="font-bold text-lg text-white font-mono uppercase">{sourceCompareData.country}</h3>
                  </div>
                  <span className="text-xs font-mono bg-cyber-accent/10 text-cyber-accent px-2 py-0.5 border border-cyber-accent/20 rounded">
                    Score: {sourceCompareData.readinessScore}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Funding */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Funding (USD)</span>
                    <div className="text-lg font-bold text-cyber-accent font-mono">${sourceCompareData.fundingUSD}B</div>
                    <p className="text-xs text-cyber-text">{sourceCompareData.fundingDetails}</p>
                  </div>

                  {/* Qubit Range */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Lab Qubit Capacity</span>
                    <div className="text-lg font-bold text-cyber-blue font-mono">{sourceCompareData.qubitRange}</div>
                    <p className="text-xs text-cyber-text">{sourceCompareData.qubitDetails}</p>
                  </div>

                  {/* Workforce */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Workforce Size</span>
                    <div className="text-sm font-bold text-white font-mono">{sourceCompareData.workforce}</div>
                    <p className="text-xs text-cyber-text">{sourceCompareData.workforceDetails}</p>
                  </div>

                  {/* Tech Focus */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Core Technologies</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {sourceCompareData.techFocus.map((tech, idx) => (
                        <span key={idx} className="text-[9px] bg-[#0B1320] border border-cyber-border px-2 py-0.5 rounded text-white font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottlenecks */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-mono font-bold uppercase">
                      <AlertTriangle size={12} />
                      Strategic Bottlenecks
                    </div>
                    <ul className="list-disc list-inside text-xs text-cyber-muted space-y-1 pl-1">
                      {sourceCompareData.bottlenecks.map((bot, idx) => (
                        <li key={idx} className="leading-relaxed text-[11px] list-none flex items-start gap-1">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{bot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Target Sovereign Card */}
              <div className="bg-[#111A28] border border-cyber-blue/20 rounded p-5 space-y-4 hover:border-cyber-blue/50 transition-all duration-300">
                <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{targetCompareData.flag}</span>
                    <h3 className="font-bold text-lg text-white font-mono uppercase">{targetCompareData.country}</h3>
                  </div>
                  <span className="text-xs font-mono bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 border border-cyber-blue/20 rounded">
                    Score: {targetCompareData.readinessScore}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Funding */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Funding (USD)</span>
                    <div className="text-lg font-bold text-cyber-accent font-mono">${targetCompareData.fundingUSD}B</div>
                    <p className="text-xs text-cyber-text">{targetCompareData.fundingDetails}</p>
                  </div>

                  {/* Qubit Range */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Lab Qubit Capacity</span>
                    <div className="text-lg font-bold text-cyber-blue font-mono">{targetCompareData.qubitRange}</div>
                    <p className="text-xs text-cyber-text">{targetCompareData.qubitDetails}</p>
                  </div>

                  {/* Workforce */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Workforce Size</span>
                    <div className="text-sm font-bold text-white font-mono">{targetCompareData.workforce}</div>
                    <p className="text-xs text-cyber-text">{targetCompareData.workforceDetails}</p>
                  </div>

                  {/* Tech Focus */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Core Technologies</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {targetCompareData.techFocus.map((tech, idx) => (
                        <span key={idx} className="text-[9px] bg-[#0B1320] border border-cyber-border px-2 py-0.5 rounded text-white font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottlenecks */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-mono font-bold uppercase">
                      <AlertTriangle size={12} />
                      Strategic Bottlenecks
                    </div>
                    <ul className="list-disc list-inside text-xs text-cyber-muted space-y-1 pl-1">
                      {targetCompareData.bottlenecks.map((bot, idx) => (
                        <li key={idx} className="leading-relaxed text-[11px] list-none flex items-start gap-1">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{bot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Differences analysis block */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-4 text-xs font-mono space-y-2">
            <h4 className="text-white font-bold uppercase flex items-center gap-1.5">
              <Info size={14} className="text-cyber-accent" />
              Sovereign Comparison Takeaways
            </h4>
            <p className="text-cyber-muted leading-relaxed">
              Comparing <span className="text-white font-bold">{sourceCompareData?.country}</span> to <span className="text-white font-bold">{targetCompareData?.country}</span>:
              The funding gap is <span className="text-cyber-accent font-bold">${Math.abs((sourceCompareData?.fundingUSD || 0) - (targetCompareData?.fundingUSD || 0)).toFixed(2)} Billion</span>, 
              and the difference in maximum qubit testing capacities spans from <span className="text-cyber-blue font-bold">{sourceCompareData?.qubitRange}</span> up to <span className="text-cyber-blue font-bold">{targetCompareData?.qubitRange}</span>. 
              While both face regional supply chain barriers, their core strategic agendas differ: {sourceCompareData?.strategicPriority} vs {targetCompareData?.strategicPriority}
            </p>
          </div>
        </div>
      )}

      {/* TELEMETRY CHARTS VIEW (CSS-based Bar Charts) */}
      {viewMode === 'charts' && (
        <div className="space-y-6">
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-6">
            
            <div className="border-b border-cyber-border pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-white uppercase flex items-center gap-2">
                  <Layers size={14} className="text-cyber-accent" />
                  Sovereign Telemetry Link overlay
                </h3>
                <span className="text-[10px] text-cyber-muted font-mono block mt-0.5">
                  Responsive relative graphs comparing sovereign budgets and qubit goals.
                </span>
              </div>
              <div className="text-[10px] font-mono text-cyber-accent bg-[#0B1320] border border-cyber-border/80 p-2 rounded">
                SCALE: Relative percentages mapped in real-time
              </div>
            </div>

            {/* Checkbox selectors for filtering overlay */}
            <div className="p-3 bg-[#0B1320] border border-cyber-border/60 rounded space-y-2">
              <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">
                Toggle Telemetry Sources:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {sovereignData.map(n => (
                  <label key={n.id} className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-white">
                    <input
                      type="checkbox"
                      checked={selectedForCharts[n.id] || false}
                      onChange={() => handleChartToggle(n.id)}
                      className="rounded border-cyber-border text-cyber-accent focus:ring-0 focus:ring-offset-0 bg-[#0B1320] h-3.5 w-3.5"
                    />
                    <span className={selectedForCharts[n.id] ? 'text-cyber-accent' : 'text-cyber-muted'}>
                      {n.flag} {n.country}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
              
              {/* Chart 1: Sovereign Funding */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-cyber-border/40 pb-2">
                  <h4 className="font-mono font-bold text-xs uppercase text-cyber-accent flex items-center gap-1.5">
                    <Globe size={14} />
                    Sovereign Funding scale (Billion USD)
                  </h4>
                  <span className="text-[9px] font-mono text-cyber-muted">MAX VALUE: ${maxFundingVal}B</span>
                </div>

                <div className="space-y-4">
                  {SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).map(nation => {
                    const widthPercent = (nation.fundingUSD / maxFundingVal) * 100;
                    const isIndia = nation.id === 'india';
                    return (
                      <div key={nation.id} className="space-y-1 font-mono">
                        <div className="flex justify-between text-xs">
                          <span className={isIndia ? 'text-cyber-blue font-bold' : 'text-white'}>
                            {nation.flag} {nation.country}
                          </span>
                          <span className="font-bold text-cyber-accent">${nation.fundingUSD}B</span>
                        </div>
                        <div className="w-full bg-[#0B1320] h-4 rounded overflow-hidden border border-cyber-border/60 relative group">
                          <div 
                            className={`h-full transition-all duration-750 ${
                              isIndia 
                                ? 'bg-gradient-to-r from-cyber-blue/80 to-cyber-blue shadow-[0_0_10px_rgba(0,163,255,0.4)]'
                                : 'bg-gradient-to-r from-cyber-accent/60 to-cyber-accent shadow-[0_0_10px_rgba(0,230,153,0.3)]'
                            }`}
                            style={{ width: `${widthPercent}%` }}
                          />
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    );
                  })}
                  {SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).length === 0 && (
                    <div className="text-center py-10 text-xs text-cyber-muted border border-dashed border-cyber-border rounded">
                      Select at least one country to display funding telemetry.
                    </div>
                  )}
                </div>
              </div>

              {/* Chart 2: Qubit Roadmap Targets */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-cyber-border/40 pb-2">
                  <h4 className="font-mono font-bold text-xs uppercase text-cyber-blue flex items-center gap-1.5">
                    <Cpu size={14} />
                    Qubit Capacity roadmap (Physical Qubits)
                  </h4>
                  <span className="text-[9px] font-mono text-cyber-muted">MAX VALUE: {maxQubitVal}</span>
                </div>

                <div className="space-y-4">
                  {SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).map(nation => {
                    const widthPercent = (nation.qubitMax / maxQubitVal) * 100;
                    const isIndia = nation.id === 'india';
                    return (
                      <div key={nation.id} className="space-y-1 font-mono">
                        <div className="flex justify-between text-xs">
                          <span className={isIndia ? 'text-cyber-blue font-bold' : 'text-white'}>
                            {nation.flag} {nation.country}
                          </span>
                          <span className="font-bold text-cyber-blue">{nation.qubitRange}</span>
                        </div>
                        <div className="w-full bg-[#0B1320] h-4 rounded overflow-hidden border border-cyber-border/60 relative group">
                          <div 
                            className={`h-full transition-all duration-750 ${
                              isIndia 
                                ? 'bg-gradient-to-r from-[#0055ff] to-cyber-blue shadow-[0_0_10px_rgba(0,163,255,0.4)]'
                                : 'bg-gradient-to-r from-cyber-blue to-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                            }`}
                            style={{ width: `${widthPercent}%` }}
                          />
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    );
                  })}
                  {SOVEREIGN_COMPARISON_DATA.filter(n => selectedForCharts[n.id]).length === 0 && (
                    <div className="text-center py-10 text-xs text-cyber-muted border border-dashed border-cyber-border rounded">
                      Select at least one country to display qubit telemetry.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* HUBS VIEW */}
      {viewMode === 'hubs' && (
        <div className="space-y-4">
          <div className="bg-[#111A28] border border-cyber-border rounded p-4">
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2">
              Sovereign Academic & Research Institutions Grid
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOVEREIGN_COMPARISON_DATA.flatMap(nation => 
                nation.hubs.map((hub, idx) => ({
                  ...hub,
                  country: nation.country,
                  flag: nation.flag,
                  key: `${nation.id}-hub-${idx}`
                }))
              ).map((hub) => (
                <div 
                  key={hub.key}
                  className="bg-[#0B1320] border border-cyber-border rounded p-4 hover:border-cyber-accent transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
                      <span className="text-xs font-mono font-bold text-cyber-accent flex items-center gap-1.5">
                        <Building2 size={12} />
                        {hub.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyber-muted flex items-center gap-1">
                        {hub.flag} {hub.city}
                      </span>
                    </div>
                    <p className="text-xs text-cyber-text leading-relaxed font-mono">
                      {hub.role}
                    </p>
                  </div>
                  <div className="border-t border-cyber-border/40 pt-2.5 mt-3 flex justify-between items-center text-[10px] font-mono text-cyber-muted">
                    <span>NATION STATE:</span>
                    <span className="text-white font-bold uppercase">{hub.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
