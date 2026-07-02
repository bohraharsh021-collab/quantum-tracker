import React, { useState, useMemo, useCallback } from 'react';
import { INDIA_TRACKER_DATA, SOVEREIGN_FUNDING, PROCESSORS_MATRIX } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Award, 
  Milestone, 
  MapPin, 
  Map,
  Search, 
  Calendar, 
  Building2, 
  ShieldAlert, 
  Compass, 
  Database,
  ArrowRight,
  Zap,
  Globe2
} from 'lucide-react';

export default function IndiaTracker({ articles = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState(null);

  // Parse dynamic overrides from news feeds
  const dynamicOverrides = useMemo(() => {
    return getDynamicNewsOverrides(articles);
  }, [articles]);

  // Merge static data with any specific entities or state items for granular display
  const categories = useMemo(() => ['All', 'Government', 'Academic Hubs & Researchers', 'Startups & Companies', 'State Initiatives'], []);

  // Dedicated Government agencies data block
  const agencies = useMemo(() => [
    {
      name: 'Department of Science & Technology (DST)',
      acronym: 'DST',
      role: 'Mission Secretariat & Funding Executive',
      focus: 'Overall coordination of the National Quantum Mission (NQM), governing council administration, and funding allocations for thematic hubs.',
      projects: ['₹6,003 Cr funding administration', 'Establishment of 4 Thematic Hubs (T-Hubs)', 'Sovereign Research Grants'],
      status: 'Active'
    },
    {
      name: 'Defence Research and Development Organisation',
      acronym: 'DRDO',
      role: 'Strategic Defense Ingestion Unit',
      focus: 'Design, field-testing, and deployment of military-grade Quantum Key Distribution (QKD) and Quantum Random Number Generators (QRNG).',
      projects: ['Joint labs with IIT Delhi and IISc', '150km commercial-fiber QKD trials', 'PQC deployment in Army communication nodes'],
      status: 'High Priority'
    },
    {
      name: 'Ministry of Electronics and Information Technology',
      acronym: 'MeitY',
      role: 'Civilian Infrastructure & HPC Integrator',
      focus: 'Developing cloud access infrastructure, middleware compilers, and coordinating quantum simulator (QSim) deployments.',
      projects: ['Quantum Simulator (QSim) toolkit release', 'Academic high-performance computing testbeds', 'National quantum software standard framework'],
      status: 'Active'
    },
    {
      name: 'Indian Space Research Organisation',
      acronym: 'ISRO',
      role: 'Satellite Communications Lead',
      focus: 'Pioneering space-to-ground quantum communications, satellite-based QKD links, and optical laser entanglement routing.',
      projects: ['LEO satellite-to-ground quantum link', 'Space-grade atomic clock payloads', 'Free-space optics encryption tests'],
      status: 'Active'
    },
    {
      name: 'Centre for Development of Advanced Computing',
      acronym: 'C-DAC',
      role: 'Supercomputing & Simulator Hub',
      focus: 'Designing hardware-accelerated quantum simulators and integrating classical supercomputing with quantum coprocessors.',
      projects: ['Param QSim development command', 'Indigenization of cryogenic control software', 'Joint developer certification courses'],
      status: 'Nominal'
    }
  ], []);

  // State-wise initiatives data block
  const stateInitiatives = useMemo(() => [
    {
      state: 'Karnataka',
      title: 'Karnataka Quantum Technology Policy',
      hub: 'Bengaluru Core',
      highlights: 'Established a dedicated ₹50 Crore state startup incubator, offering rent-free cleanroom access, seed-stage microgrants, and sponsoring joint research chairs at IISc.',
      focus: 'Startup scaling & silicon spin fabrication research templates.'
    },
    {
      state: 'Telangana',
      title: 'Telangana Quantum City',
      hub: 'Gachibowli High-Tech Corridor',
      highlights: 'Developing a 150-acre dedicated tech corridor in Hyderabad. Includes state-funded cryogenic labs to attract global manufacturers and offers tax rebates for quantum networking startups.',
      focus: 'Hardware assembly & secure civilian networks.'
    },
    {
      state: 'Tamil Nadu',
      title: 'Tamil Nadu ICT Quantum Skill Roadmap',
      hub: 'Chennai Corridor',
      highlights: 'Formulated a state curriculum framework with IIT Madras. Aims to upskill 10,000 engineering graduates in Qiskit and quantum hardware basics through the Tamil Nadu ICT Academy.',
      focus: 'Developer workforce & financial algorithms.'
    },
    {
      state: 'Maharashtra',
      title: 'Maharashtra Advanced Sensing Hub',
      hub: 'Mumbai-Pune Corridor',
      highlights: 'Joint initiative with TIFR and C-DAC Pune. Focuses on deploying superconducting microwave testing facilities and establishing secure fiber networks between government registries.',
      focus: 'Microwave control testing & fiber backbones.'
    }
  ], []);

  // Calendar milestones for NQM India with dynamic overrides support
  const milestones = useMemo(() => {
    const nqm = SOVEREIGN_FUNDING.find(f => f.country === 'India');
    const baseMilestones = nqm?.milestones || [];
    
    return baseMilestones.map(m => {
      const override = dynamicOverrides?.indiaMilestones?.[m.task];
      if (override) {
        return {
          ...m,
          status: override.status,
          task: override.task
        };
      }
      return m;
    });
  }, [dynamicOverrides]);

  // Process data for the main resource directory list
  const filteredEcosystemItems = useMemo(() => {
    return INDIA_TRACKER_DATA.filter(item => {
      // 1. Search filter
      const matchesSearch = 
        item.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category filter
      let matchesCategory = true;
      if (selectedCategory === 'Government') {
        matchesCategory = item.category === 'Government';
      } else if (selectedCategory === 'Academic Hubs & Researchers') {
        matchesCategory = item.category === 'Colleges & Universities' || item.category === 'Students & Professionals';
      } else if (selectedCategory === 'Startups & Companies') {
        matchesCategory = item.category === 'Startups' || item.category === 'Multinational Companies (MNCs)';
      } else if (selectedCategory === 'State Initiatives') {
        matchesCategory = item.category === 'State Governments';
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleStateSelect = useCallback((stateName) => {
    setSelectedState(prev => prev === stateName ? null : stateName);
  }, []);

  // Identify Indigen qubit breakthrough status
  const currentIndigenousQubits = useMemo(() => {
    if (dynamicOverrides.indiaQubits) {
      return {
        count: dynamicOverrides.indiaQubits,
        source: 'Dynamic Telemetry (Recent Breakthrough)',
        status: dynamicOverrides.indiaStatus || 'Active (NQM Breakthrough)'
      };
    }
    const indigen = PROCESSORS_MATRIX.find(p => p.name.includes('Indigen') || p.name.includes('QNu-Q1'));
    return {
      count: indigen?.physicalQubits || 8,
      source: 'NQM baseline target',
      status: 'Active R&D (Superconducting Lab)'
    };
  }, [dynamicOverrides, PROCESSORS_MATRIX]);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <Compass className="text-cyber-accent animate-pulse" size={24} />
            India Quantum Ecosystem Ledger
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            Coordinates and monitors Indian National Quantum Mission (NQM) developments, sovereign agencies, startups, and state-wise policies.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#111A28] border border-cyber-border/80 rounded px-3 py-1.5 font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-cyber-accent animate-ping" />
          <span className="text-cyber-accent font-bold uppercase">NQM PORTAL ACTIVE</span>
        </div>
      </div>

      {/* Indigenous Qubits HUD Banner */}
      <div className="relative bg-gradient-to-r from-[#111A28] to-[#0d2122] border border-cyber-accent/30 rounded p-5 overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Globe2 size={120} className="text-cyber-accent" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Main Qubit Counter */}
          <div className="lg:col-span-1 border-r border-cyber-border/60 pr-4 space-y-1">
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-cyber-accent" />
              <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider">Indigenous Hardware Status</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-cyber-accent font-mono tracking-tight">
                {currentIndigenousQubits.count}
              </span>
              <span className="text-xs font-mono text-white">Physical Qubits</span>
            </div>
            <span className="text-[9px] font-mono text-cyber-muted uppercase block leading-none pt-1">
              Platform: Superconducting QPU
            </span>
          </div>

          {/* Breakthrough Status Details */}
          <div className="lg:col-span-2 space-y-1 px-2">
            <span className="text-[10px] font-mono text-white font-semibold bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20 w-fit block uppercase">
              {currentIndigenousQubits.status}
            </span>
            <p className="text-xs text-cyber-text leading-relaxed">
              India is building local qubit fabrication capacity at IISc and TIFR. Telemetry shows accelerated trials on standard transmon microcircuits, moving towards the target of 50 physical qubits by 2028.
            </p>
            <span className="text-[10px] font-mono text-cyber-muted italic block pt-1">
              Data Source: {currentIndigenousQubits.source}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-1 bg-[#0B1320]/65 border border-cyber-border rounded p-3 font-mono text-[10px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-cyber-muted">NQM BUDGET:</span>
              <span className="text-white font-bold">₹6,003 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-muted">TIMELINE:</span>
              <span className="text-white">2023 - 2031</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-muted">THEMATIC HUBS:</span>
              <span className="text-cyber-accent">4 Centres (T-Hubs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sovereign Agencies Section */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2">
          <Building2 className="text-cyber-blue" size={18} />
          <h2 className="font-mono font-bold uppercase text-white text-sm">
            Sovereign Executing Agencies (DST, DRDO, MeitY, ISRO, C-DAC)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {agencies.map((agency) => (
            <div 
              key={agency.acronym} 
              className="bg-[#0B1320] border border-cyber-border hover:border-cyber-blue/50 rounded p-4 flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-cyber-accent bg-cyber-accent/5 border border-cyber-accent/15 px-2 py-0.5 rounded">
                    {agency.acronym}
                  </span>
                  <span className="text-[8px] font-mono text-cyber-muted uppercase">
                    {agency.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white font-mono leading-tight">{agency.name}</h3>
                <span className="text-[10px] font-mono text-cyber-blue block uppercase leading-none">
                  {agency.role}
                </span>
                <p className="text-[11px] text-cyber-muted leading-relaxed">
                  {agency.focus}
                </p>
              </div>

              <div className="border-t border-cyber-border/40 pt-2.5 mt-3 space-y-1">
                <span className="text-[8px] font-mono text-cyber-muted uppercase block">Core Milestones:</span>
                <ul className="space-y-0.5">
                  {agency.projects.map((proj, i) => (
                    <li key={i} className="text-[9px] font-mono text-white flex items-center gap-1">
                      <ArrowRight size={8} className="text-cyber-blue flex-shrink-0" />
                      <span className="truncate">{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State-wise Initiatives (Interactive Map/List) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: State-wise Policies */}
        <div className="lg:col-span-2 bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-cyber-border/40 pb-2">
            <div className="flex items-center gap-2">
              <Map className="text-cyber-accent" size={18} />
              <h2 className="font-mono font-bold uppercase text-white text-sm">
                State-Level Policies & Quantum Initiatives
              </h2>
            </div>
            <span className="text-[9px] font-mono text-cyber-muted bg-cyber-muted/10 px-2 py-0.5 rounded">
              STATE GRANTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stateInitiatives.map((item) => {
              const isSelected = selectedState === item.state;
              return (
                <div 
                  key={item.state} 
                  onClick={() => handleStateSelect(item.state)}
                  className={`border rounded p-4 space-y-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-cyber-accent/5 border-cyber-accent shadow-[0_0_10px_rgba(0,230,153,0.05)]' 
                      : 'bg-[#0B1320] border-cyber-border hover:border-cyber-accent/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded uppercase">
                        {item.state} Initiative
                      </span>
                      <h3 className="font-bold text-white font-mono text-xs pt-1.5 leading-tight">{item.title}</h3>
                    </div>
                    <MapPin size={14} className={isSelected ? "text-cyber-accent" : "text-cyber-muted"} />
                  </div>

                  <div className="text-[10px] font-mono text-cyber-blue">
                    PRIMARY HUB: {item.hub}
                  </div>
                  
                  <p className="text-[11px] text-cyber-muted leading-relaxed">
                    {item.highlights}
                  </p>

                  <div className="border-t border-cyber-border/45 pt-2 mt-2 flex justify-between items-center text-[9px] font-mono">
                    <span className="text-cyber-muted uppercase">Focus Domain:</span>
                    <span className="text-white font-semibold uppercase">{item.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Calendar Milestones */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2">
            <Calendar className="text-cyber-blue" size={18} />
            <h2 className="font-mono font-bold uppercase text-white text-sm">
              NQM Calendar Milestones
            </h2>
          </div>

          <div className="relative border-l border-cyber-border/80 pl-4 space-y-4 py-1 ml-1.5 max-h-[310px] overflow-y-auto pr-1">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-1">
                {/* Timeline status dot */}
                <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg ${
                  m.status.includes('Completed') ? 'bg-cyber-accent shadow-[0_0_8px_rgba(0,230,153,0.5)]' : 'bg-cyber-muted'
                }`} />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyber-accent bg-cyber-accent/10 px-1.5 py-0.2 rounded border border-cyber-accent/15">
                    {m.year}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 rounded font-bold ${
                    m.status.includes('Completed') 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-[#111A28] text-cyber-muted border border-cyber-border'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-[11px] text-white font-mono leading-relaxed">{m.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Ecosystem Directory */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-5">
        {/* Directory Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cyber-border/40 pb-3.5">
          <div className="flex items-center gap-2">
            <Database className="text-cyber-accent" size={18} />
            <h2 className="font-mono font-bold uppercase text-white text-sm">
              Resource Directory & Ingested Entities
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2 text-cyber-muted" size={14} />
            <input 
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B1320] border border-cyber-border rounded py-1 pl-8.5 pr-3 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1 font-mono text-[10px] uppercase rounded border transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold' 
                  : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Table/List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEcosystemItems.length > 0 ? (
            filteredEcosystemItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0B1320] border border-cyber-border/70 rounded p-4 flex flex-col justify-between hover:border-cyber-accent/40 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-cyber-border/30 pb-1.5">
                    <span className="text-[9px] font-mono text-cyber-blue uppercase font-bold">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-cyber-accent bg-cyber-accent/5 px-2 py-0.2 rounded border border-cyber-accent/10">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold font-mono text-xs text-white pt-0.5">{item.entity}</h3>
                  <p className="text-[11px] text-cyber-muted leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="border-t border-cyber-border/30 pt-2.5 mt-3 flex justify-between items-center text-[9px] font-mono">
                  <span className="text-cyber-muted uppercase">ALLOCATED SCOPE:</span>
                  <span className="text-white font-bold">{item.budget}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-8 text-cyber-muted font-mono text-xs border border-dashed border-cyber-border rounded">
              <ShieldAlert className="mx-auto text-cyber-muted mb-2" size={24} />
              NO ENTITIES MATCHING ACTIVE SEARCH OR TAB FILTERS
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
