import React, { useState, useMemo, useCallback } from 'react';
import { GLOBAL_RESOURCES_DATA, SOVEREIGN_FUNDING } from '../data/quantumData';
import { 
  Globe, 
  Shield, 
  Landmark, 
  Cpu, 
  GraduationCap, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  BookOpen,
  GitCompare,
  Zap,
  ListTodo
} from 'lucide-react';

export default function GlobalResources({ articles = [] }) {
  const [selectedCountry, setSelectedCountry] = useState('United States of America');
  const [activeSubTab, setActiveSubTab] = useState('profile'); // profile, compare, lessons

  const currentCountry = useMemo(() => {
    return GLOBAL_RESOURCES_DATA.find(c => c.country === selectedCountry);
  }, [selectedCountry]);

  // Comparative matrix data for all major players
  const comparisonData = useMemo(() => [
    {
      country: 'United States of America',
      budget: '$1.8B (NQI Baseline)',
      primaryQubit: 'Superconducting & Trapped Ion',
      satelliteQKD: 'R&D Phase (Focus on fiber/free-space)',
      pqcTransition: 'Advanced (NIST Standards mandated)',
      sovereignThreatIndex: 'Medium (Decoherence supply dependance)'
    },
    {
      country: 'China',
      budget: '$10B+ (Estimated State Cap)',
      primaryQubit: 'Photonic & Superconducting',
      satelliteQKD: 'Operational (Micius Satellite & Backbone)',
      pqcTransition: 'High (Sovereign hardware protocols)',
      sovereignThreatIndex: 'Low (Self-reliant supply chain)'
    },
    {
      country: 'India',
      budget: '$730M (₹6,003 Cr NQM)',
      primaryQubit: 'Superconducting & Photonic',
      satelliteQKD: 'Active R&D (ISRO LEO communication link)',
      pqcTransition: 'Moderate (National cryptography framework)',
      sovereignThreatIndex: 'Medium (Imported cryo equipment reliance)'
    },
    {
      country: 'United Kingdom',
      budget: '£1B+ (National Program)',
      primaryQubit: 'Trapped Ion & Superconducting',
      satelliteQKD: 'Active Testing (Defense link)',
      pqcTransition: 'Moderate (Aligning with NIST)',
      sovereignThreatIndex: 'Medium (Fab facilities bottleneck)'
    },
    {
      country: 'European Union',
      budget: '€1B+ (Flagship + National)',
      primaryQubit: 'Neutral Atom & Silicon Spin',
      satelliteQKD: 'R&D Phase (SAGA Mission planned)',
      pqcTransition: 'Moderate (Euro-cryptography rules)',
      sovereignThreatIndex: 'Low-Medium (ASML Lithography anchor)'
    },
    {
      country: 'Japan',
      budget: '¥40B+ (Cabinet Strategy)',
      primaryQubit: 'Superconducting & Silicon Spin',
      satelliteQKD: 'Operational (Toshiba high-rate QKD)',
      pqcTransition: 'Advanced (Industrial networks)',
      sovereignThreatIndex: 'Medium (Relying on US cloud nodes)'
    },
    {
      country: 'Singapore',
      budget: '$100M+ SGD (NQS Focus)',
      primaryQubit: 'Photonic & Atomic Sensors',
      satelliteQKD: 'Operational (Satellite ground swaps)',
      pqcTransition: 'Moderate (Financial sector rollout)',
      sovereignThreatIndex: 'Low (Deep specialization)'
    },
    {
      country: 'Canada',
      budget: '$360M USD (NQS Strategy)',
      primaryQubit: 'Photonic & Superconducting Annealing',
      satelliteQKD: 'R&D Phase (Kepler QKD payload)',
      pqcTransition: 'Moderate (Academic systems alignment)',
      sovereignThreatIndex: 'Medium (US corporate talent drain)'
    },
    {
      country: 'Israel',
      budget: '$400M USD (INQI Focus)',
      primaryQubit: 'Trapped Ion & Silicon Dots',
      satelliteQKD: 'R&D Phase (Defense cryptography)',
      pqcTransition: 'Advanced (Control hardware synthesis)',
      sovereignThreatIndex: 'Medium (Limited local foundry capacity)'
    },
    {
      country: 'Australia',
      budget: '$600M USD (National Strategy)',
      primaryQubit: 'Silicon Spin & Quantum Diamond',
      satelliteQKD: 'R&D Phase (High-rate ground receivers)',
      pqcTransition: 'Advanced (Control algorithms optimization)',
      sovereignThreatIndex: 'Low-Medium (Geographic supply chain distance)'
    },
    {
      country: 'South Korea',
      budget: '$2.4B USD (ICT Subsidies)',
      primaryQubit: 'Trapped Ion & Silicon spins',
      satelliteQKD: 'Active testing (Sovereign telecom fiber links)',
      pqcTransition: 'Advanced (Microelectronics and switches)',
      sovereignThreatIndex: 'Medium (High laser component dependence)'
    },
    {
      country: 'Finland',
      budget: '$150M USD (State hardware)',
      primaryQubit: 'Superconducting',
      satelliteQKD: 'R&D Phase (Academic sensors)',
      pqcTransition: 'Moderate (Nokia PQC networks)',
      sovereignThreatIndex: 'Low-Medium (Strong local cryo infrastructure)'
    },
    {
      country: 'Russia',
      budget: '$350M+ USD (Rosatom)',
      primaryQubit: 'Superconducting Transmon',
      satelliteQKD: 'Active testing (Civilian fiber networks)',
      pqcTransition: 'Moderate (Sovereign crypto protocols)',
      sovereignThreatIndex: 'High (Severe cryo refrigerator sanctions)'
    }
  ], []);

  // Country-specific strategic lessons for India
  const countrySpecificLessons = useMemo(() => {
    return {
      'United States of America': {
        lead: 'Public-Private Consortiums & Cloud Access Playbook',
        lessons: [
          {
            area: 'Supply Chain Audits',
            takeaway: 'Leverage the QED-C model: Create a dedicated consortium of Indian startups (QNu, QpiAI) and defense nodes to map out domestic cryogenic components, identifying export dependencies early.'
          },
          {
            area: 'Secured Local Testbeds',
            takeaway: 'While the US builds commercial cloud networks, India must mandate local, secure, on-premises testbeds (like CDAC Pune) to prevent sensitive defense datasets from passing through global AWS/Azure networks.'
          },
          {
            area: 'Co-Investment Models',
            takeaway: 'Establish matching grants where the government coordinates with private VCs to double seed funding for hardware-centric startups.'
          }
        ]
      },
      'China': {
        lead: 'Sovereign Backbone Grids & Concentrated Command',
        lessons: [
          {
            area: 'Space-Based QKD Links',
            takeaway: 'Terrestrial fiber is prone to physical intercepts. India must co-develop dedicated LEO quantum satellites with ISRO to secure Indian Navy fleets in the Indian Ocean and border command centers.'
          },
          {
            area: 'Unified Command Structure',
            takeaway: 'China consolidated its quantum research under the Hefei National Laboratory. India should unify NQM Hubs under a centralized executive command to prevent fragmented research silos across different IITs.'
          },
          {
            area: 'Strategic Raw Materials',
            takeaway: 'Stockpile critical raw materials and cryogenics early, including closed-loop Helium-3 recycling models, to resist export embargoes.'
          }
        ]
      },
      'United Kingdom': {
        lead: 'Software Ecosystems & Co-Design Translation',
        lessons: [
          {
            area: 'Focus on Quantum Compiler Middleware',
            takeaway: 'India should focus heavily on quantum software and compilation layers (like the UK did with TKET). This allows local developers to gain instant utility-scale traction without waiting for domestic qubit fabrication to mature.'
          },
          {
            area: 'Defense Co-Design contracts',
            takeaway: 'Deploy joint R&D projects between defense laboratories (DRDO) and startups early, providing a direct customer channel for initial hardware prototypes.'
          }
        ]
      },
      'European Union': {
        lead: 'Semiconductor Tooling & Inter-State Consortia',
        lessons: [
          {
            area: 'Semiconductor Packaging Synergy',
            takeaway: 'Coordinate the National Quantum Mission directly with the India Semiconductor Mission (ISM) in Gujarat to build cleanroom packaging facilities tailored for silicon-spin/photonic chips.'
          },
          {
            area: 'Shared Regional Facilities',
            takeaway: 'Establish a national cryogenic pooling service where multiple universities can send chips for testing on shared dilution refrigerators, reducing initial capital expenditures.'
          }
        ]
      },
      'Japan': {
        lead: 'MNC Strategic Integration & Hardware Quality Standard',
        lessons: [
          {
            area: 'MNC Corporate Lab Incubation',
            takeaway: 'Incentivize Indian IT majors (Tata Consultancy Services, Infosys, Wipro) to launch dedicated quantum compiler laboratories and co-sponsor research projects at academic hubs.'
          },
          {
            area: 'High-Rate QKD Standard',
            takeaway: 'Establish clear technical standards for QKD encryption key rates and reliability before licensing commercial deployments on public telecom fiber.'
          }
        ]
      },
      'Singapore': {
        lead: 'ASEAN Collaboration & Specialized Sensor Niches',
        lessons: [
          {
            area: 'Niche Tech Dominance',
            takeaway: 'Rather than trying to build full-scale fault-tolerant universal hardware immediately, focus on specialized niches like satellite-ground sensors and atomic gravimeters.'
          },
          {
            area: 'International Hubbing',
            takeaway: 'Sign mutual exchange and testbed sharing agreements with friendly ASEAN states to share space and marine tracking telemetries.'
          }
        ]
      }
    };
  }, []);

  const handleCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
  }, []);

  const handleSubTabSelect = useCallback((tab) => {
    setActiveSubTab(tab);
  }, []);

  // Memoized strategic takeaways block
  const lessonsBlock = useMemo(() => {
    const currentTakeaway = countrySpecificLessons[selectedCountry] || countrySpecificLessons['United States of America'];
    return (
      <div className="space-y-4">
        {/* Advice header */}
        <div className="bg-cyber-accent/5 border border-cyber-accent/30 rounded p-4 flex items-center gap-3">
          <Sparkles className="text-cyber-accent animate-bounce" size={24} />
          <div>
            <h3 className="text-xs font-mono font-bold text-cyber-accent uppercase tracking-wider">
              Strategic Lesson Theme: {currentTakeaway.lead}
            </h3>
            <span className="text-[10px] font-mono text-cyber-muted">
              Tactical suggestions for India's NQM based on {selectedCountry} models
            </span>
          </div>
        </div>

        {/* Takeaways list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentTakeaway.lessons.map((lesson, idx) => (
            <div key={idx} className="bg-[#0B1320] border border-cyber-border rounded p-4 flex flex-col justify-between hover:border-cyber-accent/50 transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5">
                  <ListTodo className="text-cyber-blue" size={14} />
                  <span className="text-[10px] font-mono font-bold text-white uppercase">{lesson.area}</span>
                </div>
                <p className="text-xs text-cyber-muted leading-relaxed">
                  {lesson.takeaway}
                </p>
              </div>
              <div className="pt-3 flex items-center gap-1.5 text-[9px] font-mono text-cyber-accent font-bold uppercase mt-2">
                <span>Action Required</span>
                <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>

        {/* Global Sovereign Roadmap Lesson */}
        <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded p-4 text-xs font-mono text-cyber-blue leading-relaxed">
          <strong className="text-white uppercase block mb-1">General Sovereignty Takeaway:</strong>
          India cannot afford to fall behind on cryogenic and chip packaging infrastructure. With recent Bureau of Industry and Security export regulations locking access to gate fidelities above 99.9% and qubit sizes, building an independent, sovereign hardware stack is a matter of strategic national security.
        </div>
      </div>
    );
  }, [selectedCountry, countrySpecificLessons]);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <Globe className="text-cyber-blue" size={24} />
            Global Sovereign & Resource Matrix
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            Tracks quantum policies, funding, and leading research hubs of other nations, extracting strategic takeaways for India.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-[#111A28] border border-[#223047] rounded p-1">
          <button
            onClick={() => handleSubTabSelect('profile')}
            className={`px-3 py-1 font-mono text-[10px] uppercase rounded transition-all ${
              activeSubTab === 'profile' 
                ? 'bg-cyber-blue text-white font-bold' 
                : 'text-cyber-muted hover:text-white'
            }`}
          >
            Resource Profile
          </button>
          <button
            onClick={() => handleSubTabSelect('compare')}
            className={`px-3 py-1 font-mono text-[10px] uppercase rounded transition-all ${
              activeSubTab === 'compare' 
                ? 'bg-cyber-blue text-white font-bold' 
                : 'text-cyber-muted hover:text-white'
            }`}
          >
            Sovereign Matrix
          </button>
          <button
            onClick={() => handleSubTabSelect('lessons')}
            className={`px-3 py-1 font-mono text-[10px] uppercase rounded transition-all ${
              activeSubTab === 'lessons' 
                ? 'bg-cyber-blue text-white font-bold' 
                : 'text-cyber-muted hover:text-white text-cyber-accent'
            }`}
          >
            Strategic Takeaways
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Country Selector */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2 px-1">
            Global Nations
          </span>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0">
            {GLOBAL_RESOURCES_DATA.map((c, idx) => (
              <button
                key={idx}
                onClick={() => handleCountrySelect(c.country)}
                className={`min-w-[150px] lg:min-w-0 text-left p-3 border font-mono text-xs uppercase rounded flex items-center justify-between transition-all duration-300 ${
                  selectedCountry === c.country 
                    ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_15px_rgba(0,163,255,0.1)]' 
                    : 'bg-[#111A28] border-cyber-border text-cyber-text hover:border-cyber-blue hover:text-white'
                }`}
              >
                <span>{c.country}</span>
                <Globe size={13} className="ml-2 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Resource Details Grid */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-3 space-y-6">
          
          {/* Sub-Tab 1: National Resource Profile */}
          {activeSubTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold font-mono text-white uppercase">
                    {selectedCountry} Resource Ledger
                  </h2>
                  <span className="text-xs font-mono text-cyber-blue">
                    Sovereign Quantum Capacity profile
                  </span>
                </div>
                <Shield size={20} className="text-cyber-blue" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Government block */}
                <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-accent">
                    <Landmark size={14} />
                    <span className="text-xs font-mono font-bold uppercase text-white">Government Initiative</span>
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed">
                    {currentCountry?.government}
                  </p>
                </div>

                {/* Startups block */}
                <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-accent">
                    <Cpu size={14} />
                    <span className="text-xs font-mono font-bold uppercase text-white">Ingested Startups</span>
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed">
                    {currentCountry?.startups}
                  </p>
                </div>

                {/* Corporations block */}
                <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-blue">
                    <Globe size={14} />
                    <span className="text-xs font-mono font-bold uppercase text-white">Enterprise Leaders</span>
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed">
                    {currentCountry?.corporations}
                  </p>
                </div>

                {/* Academics block */}
                <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-1.5 text-cyber-blue">
                    <GraduationCap size={14} />
                    <span className="text-xs font-mono font-bold uppercase text-white">Research Laboratories</span>
                  </div>
                  <p className="text-xs text-cyber-muted leading-relaxed">
                    {currentCountry?.academic}
                  </p>
                </div>
              </div>

              {/* Country Summary Banner */}
              <div className="bg-cyber-blue/5 border border-cyber-blue/20 p-4 rounded text-xs text-cyber-blue font-mono flex items-start gap-2.5 leading-relaxed">
                <Info size={16} className="mt-0.5 flex-shrink-0 text-cyber-blue" />
                <div>
                  <strong className="uppercase text-white">Country Profile Summary:</strong>
                  <p className="mt-1 text-cyber-text">{currentCountry?.summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Sovereign Comparison Matrix */}
          {activeSubTab === 'compare' && (
            <div className="space-y-6">
              <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold font-mono text-white uppercase">
                    Sovereign Geopolitical Matrix
                  </h2>
                  <span className="text-xs font-mono text-cyber-blue">
                    Key sovereign capability indicators comparison
                  </span>
                </div>
                <GitCompare size={20} className="text-cyber-blue" />
              </div>

              <div className="overflow-x-auto border border-cyber-border rounded">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0B1320] text-cyber-muted border-b border-cyber-border uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Country</th>
                      <th className="p-3">Estimated Budget</th>
                      <th className="p-3">Qubit Focus</th>
                      <th className="p-3">Satellite QKD</th>
                      <th className="p-3">PQC Transition</th>
                      <th className="p-3">Sovereignty Risks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyber-border/40 text-cyber-text">
                    {comparisonData.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-cyber-blue/5 transition-colors ${
                          row.country === selectedCountry ? 'bg-cyber-blue/10 font-bold' : ''
                        }`}
                      >
                        <td className="p-3 text-white">{row.country}</td>
                        <td className="p-3 text-cyber-accent">{row.budget}</td>
                        <td className="p-3">{row.primaryQubit}</td>
                        <td className="p-3 text-cyber-blue">{row.satelliteQKD}</td>
                        <td className="p-3">{row.pqcTransition}</td>
                        <td className="p-3 text-red-400 text-[11px]">{row.sovereignThreatIndex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Lessons for India / Strategic Takeaways */}
          {activeSubTab === 'lessons' && (
            <div className="space-y-4">
              <div className="border-b border-cyber-border pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold font-mono text-white uppercase">
                    Lessons for India & Strategic Takeaways
                  </h2>
                  <span className="text-xs font-mono text-cyber-accent">
                    Actionable blueprints for the National Quantum Mission (NQM)
                  </span>
                </div>
                <BookOpen size={20} className="text-cyber-accent" />
              </div>

              {lessonsBlock}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
