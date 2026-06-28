import React, { useState, useMemo } from 'react';
import { APPLICATIONS_ENCYCLOPEDIA, MCKINSEY_ADVISORY_DECK } from '../data/quantumData';
import { BookOpen, AlertTriangle, Shield, Landmark, Zap, HelpCircle, Code, Briefcase, Cpu, GraduationCap, Compass } from 'lucide-react';

export default function ApplicationsEncyclopedia() {
  const [activeSubTab, setActiveSubTab] = useState('encyclopedia'); // 'encyclopedia', 'advisory', or 'talent'
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedAdvisorySection, setSelectedAdvisorySection] = useState('geopolitics');
  const [selectedRole, setSelectedRole] = useState('cs'); // 'cs', 'physics', 'electrical', 'business'
  
  // Interactive matrix state
  const [activeMatrixCell, setActiveMatrixCell] = useState(null);

  const letters = ['ALL', 'A', 'E', 'F', 'S'];

  // Filter encyclopedia items - Memoized for performance
  const filteredEncyclopedia = useMemo(() => {
    return selectedLetter === 'ALL'
      ? APPLICATIONS_ENCYCLOPEDIA
      : APPLICATIONS_ENCYCLOPEDIA.filter(item => item.letter === selectedLetter);
  }, [selectedLetter]);

  const getStatusBadgeClass = (status) => {
    if (status.includes('Production') || status.includes('Ready')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (status.includes('Pilot') || status.includes('Lab')) return 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <BookOpen className="text-cyber-accent" size={24} />
            Applications & Advisory Hub
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            McKinsey-style consulting intelligence deck mapping A-to-Z quantum use cases, geopolitics, and natural disaster recovery.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0B1320] p-1 border border-cyber-border rounded font-mono text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubTab('encyclopedia')}
            className={`px-4 py-2 uppercase rounded whitespace-nowrap transition-all duration-300 ${
              activeSubTab === 'encyclopedia' 
                ? 'bg-cyber-accent/15 text-cyber-accent font-bold' 
                : 'text-cyber-muted hover:text-white'
            }`}
          >
            A-Z Encyclopedia
          </button>
          <button
            onClick={() => setActiveSubTab('advisory')}
            className={`px-4 py-2 uppercase rounded whitespace-nowrap transition-all duration-300 ${
              activeSubTab === 'advisory' 
                ? 'bg-cyber-accent/15 text-cyber-accent font-bold' 
                : 'text-cyber-muted hover:text-white'
            }`}
          >
            Geopolitical Advisory
          </button>
          <button
            onClick={() => setActiveSubTab('talent')}
            className={`px-4 py-2 uppercase rounded whitespace-nowrap transition-all duration-300 ${
              activeSubTab === 'talent' 
                ? 'bg-cyber-accent/15 text-cyber-accent font-bold' 
                : 'text-cyber-muted hover:text-white'
            }`}
          >
            Talent Advisory
          </button>
        </div>
      </div>

      {/* VIEW 1: A-Z ENCYCLOPEDIA */}
      {activeSubTab === 'encyclopedia' && (
        <div className="space-y-6">
          {/* Alphabet Filters */}
          <div className="flex flex-wrap gap-2 items-center bg-[#111A28] border border-cyber-border rounded p-3">
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider mr-2 font-bold">
              Filter by Sector:
            </span>
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 font-mono text-xs uppercase rounded border transition-all duration-300 ${
                  selectedLetter === letter
                    ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_10px_rgba(0,163,255,0.15)]'
                    : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-white'
                }`}
              >
                {letter === 'ALL' ? 'Show All' : letter}
              </button>
            ))}
          </div>

          {/* Directory Listings */}
          <div className="space-y-8">
            {filteredEncyclopedia.map((category, catIdx) => (
              <div key={catIdx} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2">
                  <div className="bg-cyber-blue/15 text-cyber-blue font-mono font-bold text-xs w-6 h-6 rounded flex items-center justify-center border border-cyber-blue/30">
                    {category.letter}
                  </div>
                  <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-blue/50 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-white text-sm font-mono leading-tight">{item.name}</h3>
                          <span className={`text-[9px] font-mono border px-2 py-0.5 rounded flex-shrink-0 ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="text-xs text-cyber-muted leading-relaxed">{item.desc}</p>
                        
                        <div className="text-[10px] font-mono space-y-1 bg-[#0B1320] border border-cyber-border/40 p-2.5 rounded">
                          <div className="text-cyber-blue font-bold">ALGORITHMS:</div>
                          <div className="text-white">{item.algorithms}</div>
                        </div>
                      </div>

                      <div className="border-t border-cyber-border/40 pt-3 mt-4 text-[10px] font-mono leading-relaxed">
                        <span className="text-cyber-accent font-bold uppercase">Business Return / Impact:</span>
                        <p className="text-cyber-muted mt-1">{item.businessImpact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: MCKINSEY/KPMG ADVISORY DECK */}
      {activeSubTab === 'advisory' && (
        <div className="space-y-6">
          {/* Sub-navigation */}
          <div className="grid grid-cols-3 gap-2 bg-[#111A28] border border-cyber-border rounded p-2 font-mono text-xs text-center">
            {[
              { id: 'geopolitics', name: 'Geopolitical Shocks', icon: <Landmark size={14} /> },
              { id: 'disasters', name: 'Disaster Response', icon: <AlertTriangle size={14} /> },
              { id: 'policies', name: 'Sovereign Policies', icon: <Shield size={14} /> }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedAdvisorySection(sec.id)}
                className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  selectedAdvisorySection === sec.id
                    ? 'bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/20 font-bold shadow-[0_0_10px_rgba(0,230,153,0.1)]'
                    : 'text-cyber-muted hover:text-white'
                }`}
              >
                {sec.icon}
                <span className="hidden sm:inline">{sec.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column: Interactive McKinsey Matrix */}
            <div className="bg-[#111A28] border border-cyber-border rounded p-4 lg:col-span-1 space-y-4">
              <div className="border-b border-cyber-border pb-2">
                <span className="text-[10px] font-mono text-cyber-accent uppercase tracking-wider font-bold block">
                  McKinsey Advisory Tool
                </span>
                <span className="text-xs text-white font-semibold">Threat vs. Readiness Matrix</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-[10px] leading-tight">
                {[
                  { id: 'sec', title: 'Cyber Security', risk: 'IMMEDIATE THREAT', advice: 'Shor\'s algorithm renders classical RSA keys vulnerable. Firms must execute post-quantum cryptographic (PQC) integration guides immediately.' },
                  { id: 'rd', title: 'Semiconductor R&D', risk: 'HIGH IMPACT', advice: 'Taiwan Wafer packaging blocks disrupt superconducting scaling. Teams must pivot to domestic cryogenic packaging and silicon spin-qubits.' },
                  { id: 'fin', title: 'Fintech Portfolios', risk: 'OPPORTUNITY LEAD', advice: 'First-movers using QAOA optimization for asset selection see 2% yield increases. Pilot programs should be prioritized.' },
                  { id: 'ops', title: 'Supply Logistics', risk: 'GRID OPTIMIZATION', advice: 'Firms should model Suez or grid evacuation networks on D-Wave annealers to establish disaster-resilient routes.' }
                ].map(cell => (
                  <button
                    key={cell.id}
                    onClick={() => setActiveMatrixCell(cell)}
                    className={`p-3 border rounded flex flex-col justify-between items-center min-h-[90px] transition-all duration-300 ${
                      activeMatrixCell?.id === cell.id
                        ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue shadow-[0_0_10px_rgba(0,163,255,0.15)] font-bold'
                        : 'bg-[#0B1320] border-cyber-border text-white hover:border-cyber-blue'
                    }`}
                  >
                    <span>{cell.title}</span>
                    <span className="text-[8px] opacity-80 mt-2 bg-white/10 px-1 rounded block">{cell.risk}</span>
                  </button>
                ))}
              </div>

              {/* Cell Advisory Output */}
              {activeMatrixCell ? (
                <div className="bg-[#0B1320] border border-cyber-border/40 rounded p-3 text-xs leading-relaxed space-y-2">
                  <div className="text-cyber-blue font-bold font-mono text-[10px] uppercase">
                    McKinsey Counsel - {activeMatrixCell.title}:
                  </div>
                  <p className="text-cyber-muted font-sans text-[11px]">{activeMatrixCell.advice}</p>
                </div>
              ) : (
                <div className="bg-[#0B1320] border border-cyber-border/20 rounded p-3 text-center text-xs text-cyber-muted font-mono py-6">
                  <HelpCircle size={16} className="mx-auto text-cyber-muted/40 mb-1" />
                  Select a business domain quadrant above to view strategic counsel.
                </div>
              )}
            </div>

            {/* Right Column: Advisory Slides */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Geopolitical Shocks */}
              {selectedAdvisorySection === 'geopolitics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MCKINSEY_ADVISORY_DECK.geopoliticalConflicts.map((g, idx) => (
                    <div key={idx} className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-accent/40 transition-all duration-300">
                      <div className="border-b border-cyber-border/40 pb-2 flex justify-between items-center">
                        <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                          Scenario: {g.scenario}
                        </h3>
                        <span className="text-[9px] font-mono text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">
                          IMPACT: {g.impact}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs font-mono text-cyber-muted">
                        <div>LIKELIHOOD: <span className="text-white">{g.likelihood}</span></div>
                      </div>

                      <p className="text-xs text-cyber-muted leading-relaxed font-sans">
                        <strong>Quantum Implication:</strong> {g.quantumImplication}
                      </p>

                      <div className="bg-cyber-accent/5 border border-cyber-accent/20 rounded p-3 text-xs leading-relaxed text-cyber-accent font-mono space-y-1">
                        <strong className="uppercase flex items-center gap-1">
                          <Zap size={12} />
                          KPMG Consulting Action Plan:
                        </strong>
                        <p className="text-cyber-text text-[11px] font-sans mt-1">{g.actionPlan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Natural Disasters */}
              {selectedAdvisorySection === 'disasters' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MCKINSEY_ADVISORY_DECK.naturalDisasters.map((d, idx) => (
                    <div key={idx} className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="border-b border-cyber-border/40 pb-2 flex justify-between items-center">
                          <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                            Disaster: {d.disaster}
                          </h3>
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            SOLVED BY QPU
                          </span>
                        </div>
                        
                        <div className="font-semibold text-xs text-white font-mono">{d.quantumSolution}</div>
                        <p className="text-xs text-cyber-muted leading-relaxed font-sans">
                          {d.desc}
                        </p>
                      </div>

                      <div className="border-t border-cyber-border/40 pt-3 mt-4 text-[10px] font-mono leading-relaxed text-cyber-accent">
                        <strong>Strategic Benefit:</strong> {d.benefit}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Government Policies */}
              {selectedAdvisorySection === 'policies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MCKINSEY_ADVISORY_DECK.governmentPolicies.map((p, idx) => (
                    <div key={idx} className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-blue/40 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="border-b border-cyber-border/40 pb-2 flex justify-between items-center">
                          <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider leading-tight">
                            Policy: {p.policy}
                          </h3>
                        </div>

                        <div className="text-[10px] font-mono space-y-1 bg-[#0B1320] border border-cyber-border/40 p-2.5 rounded">
                          <div className="text-cyber-blue font-bold uppercase">Directive Scope:</div>
                          <p className="text-white text-[11px] font-sans mt-0.5">{p.scope}</p>
                        </div>
                      </div>

                      <div className="border-t border-cyber-border/40 pt-3 mt-4 text-[10px] font-mono leading-relaxed text-cyber-accent">
                        <strong>Geopolitical Shift:</strong> {p.effect}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MCKINSEY/KPMG TALENT & CAREER ADVISORY */}
      {activeSubTab === 'talent' && (
        <div className="space-y-6">
          {/* Dashboard Intro Cards */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-cyber-accent" size={20} />
                <h2 className="font-mono font-bold uppercase text-white text-sm">
                  McKinsey & KPMG Talent Development Advisor
                </h2>
              </div>
              <span className="text-[10px] font-mono text-cyber-muted bg-cyber-accent/15 px-2.5 py-0.5 rounded border border-cyber-accent/30 uppercase">
                India NQM Track
              </span>
            </div>

            <p className="text-xs text-cyber-muted leading-relaxed font-mono">
              Strategic career maps for transitioning classical engineering talent, physicists, and business analysts into sovereign quantum hubs.
            </p>

            {/* Role Selectors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 font-mono text-[10.5px]">
              {[
                { id: 'cs', name: 'Software / CS', icon: <Code size={13} /> },
                { id: 'physics', name: 'Physics & Math', icon: <Compass size={13} /> },
                { id: 'electrical', name: 'Hardware / Electrical', icon: <Cpu size={13} /> },
                { id: 'business', name: 'MBA / Business Analyst', icon: <Briefcase size={13} /> }
              ].map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`py-2.5 px-3 border rounded flex items-center justify-center gap-2 transition-all duration-300 ${
                    selectedRole === role.id
                      ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_10px_rgba(0,163,255,0.1)]'
                      : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-blue'
                  }`}
                >
                  {role.icon}
                  <span>{role.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comparative Advisory Dashboard Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: Skill Gaps and Academic Nodes */}
            <div className="space-y-6">
              
              {/* Skill Gap Analysis Box */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider border-b border-cyber-border/40 pb-2">
                  1. Skill Gap Audit & Transition Analysis
                </h3>
                <div className="bg-[#0B1320] border border-cyber-border/40 rounded p-4 text-xs leading-relaxed space-y-2">
                  <div className="text-cyber-blue font-mono font-bold uppercase text-[10px]">
                    Current Background: {selectedRole === 'cs' ? 'Software Engineer' : selectedRole === 'physics' ? 'Physics Scholar' : selectedRole === 'electrical' ? 'ASIC/EE Designer' : 'Business Consultant'}
                  </div>
                  <p className="text-cyber-muted">
                    {selectedRole === 'cs' && "Highly proficient in software patterns, git, and algorithms. Needs to master linear algebra fundamentals (bra-ket notation, Hermitian operators, tensor products), qubit gate mechanics, and quantum SDK compilers."}
                    {selectedRole === 'physics' && "Strong in quantum mechanics and linear algebra. Needs to adopt professional software engineering practices (Python OOP, clean code architectures) and gain experience with hardware compiler pipelines."}
                    {selectedRole === 'electrical' && "Proficient in VLSI, analog layout, and ASICs. Needs to study cryogenic circuit constraints (sub-1 Kelvin), superconducting qubit microwave cabling, and silicon spin-qubit packaging."}
                    {selectedRole === 'business' && "Strong in market scoping, NPV matrices, and supply chains. Needs to learn quantum computing taxonomy (Logical vs Physical Qubits, decoherence times) and audit organizational transition risk."}
                  </p>
                </div>
              </div>

              {/* Research Hubs Box */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider border-b border-cyber-border/40 pb-2 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-cyber-accent" />
                  <span>2. Recommended Academic Centers (NQM Hubs)</span>
                </h3>
                <div className="space-y-3 font-mono text-[11px]">
                  {selectedRole === 'cs' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Madras (IBM Hub)</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Quantum algorithm testing, cloud QPU access coordinates, and algorithm benchmarks.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">C-DAC Pune / Bengaluru</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Quantum simulator (QSim) software optimization, SDK development, and compiler platforms.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'physics' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IISc Bengaluru</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Superconducting transmon fabrication, quantum sensing, and diamond defect laboratories.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">TIFR Mumbai</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Cryogenic microwave controls, transmon testing, and coherence modeling.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'electrical' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Bombay (QSEC)</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Silicon spin-qubit microelectronics, CMOS packaging, and integrated quantum photonics.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Delhi</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: QKD hardware transceivers, photon detectors, and fiber optic packaging.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'business' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Madras (DoMS) & IIMs</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Joint research briefs on technology commercialization and quantum asset scoping.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IISc Management Studies</div>
                        <div className="text-cyber-muted text-[10px] mt-1">Focus: Technology transfer and intellectual property management in sovereign labs.</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Recommended Projects and Roadmap */}
            <div className="space-y-6">
              
              {/* Build Projects Box */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider border-b border-cyber-border/40 pb-2">
                  3. Recommended Hands-On Projects
                </h3>
                <div className="grid grid-cols-1 gap-3 font-mono text-[11px]">
                  {selectedRole === 'cs' && (
                    <>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">VQE Molecular Simulator</span>
                          <span className="text-[9px] bg-cyber-blue/15 text-cyber-blue px-1.5 rounded">Intermediate</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Build a Variational Quantum Eigensolver circuit in Qiskit to calculate the ground-state energy of a hydrogen molecule (H2).</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Post-Quantum SSL Socket</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Implement a custom Python socket server utilizing NIST Kyber key encapsulation algorithms to encrypt classical communication lines.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'physics' && (
                    <>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Decoherence Noise Modeler</span>
                          <span className="text-[9px] bg-cyber-blue/15 text-cyber-blue px-1.5 rounded">Intermediate</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Develop a Python simulation mapping physical environmental noise impact on a superconducting transmon qubit over microsecond windows.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Neutral Atom Tweezers Map</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Model laser-field potential arrays mathematically to compute the optical tweezer spacing for zero cross-talk Rydberg states.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'electrical' && (
                    <>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Cryo-CMOS Heat Discharger</span>
                          <span className="text-[9px] bg-cyber-blue/15 text-cyber-blue px-1.5 rounded">Intermediate</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Create a finite-element thermal simulation tracking heat dissipation in CMOS control units operating inside a dilution refrigerator at 1 Kelvin.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Optical Laser Alignment calibration</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Program a closed-loop FPGA signal calibration model to align photon polarization angles automatically in physical fiber optic channels.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'business' && (
                    <>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Enterprise PQC Risk Audit Ledger</span>
                          <span className="text-[9px] bg-cyber-blue/15 text-cyber-blue px-1.5 rounded">Beginner</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Construct a risk assessment database template cataloging all legacy cryptographic assets, detailing threat timelines for Shor's decryption.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Quantum Supply Chain Vulnerability Brief</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Intermediate</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal">Compile a consulting intelligence brief mapping Helium-3 and high-coaxial cable export controls and how to secure backup packaging loops.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Career Roadmap Box */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider border-b border-cyber-border/40 pb-2 flex items-center gap-1.5">
                  <Compass size={14} className="text-cyber-accent" />
                  <span>4. McKinsey Transition Roadmap</span>
                </h3>
                <div className="relative border-l border-cyber-border pl-4 space-y-4 py-1 ml-2 text-xs font-mono">
                  {selectedRole === 'cs' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Linear Algebra Core</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Master complex vectors, Hilbert spaces, tensor products, and unitary matrices.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Qiskit Developer Track</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Complete the official IBM Qiskit developer curriculum and circuit design guides.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: SDK Contributions</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Contribute to open-source compilations on GitHub (Qiskit, TKET, or Cirq repositories).</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'physics' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Software Engineering Patterns</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Learn professional Python development (OOP, clean design patterns, unit testing frameworks).</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Lab Signal Control Basics</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Gain hands-on skills with microwave pulse generation and digital oscilloscope controls.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: NQM Fellowship application</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Apply for DST-sponsored National Quantum Mission research fellowships at IISc or TIFR hubs.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'electrical' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Cryo-CMOS & Low-Temp Physics</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Study semiconductor device behaviors under extreme 10mK dilution refrigerator environments.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: VLSI custom ASIC Design</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Specialize in custom RF circuit routing and layout optimization using Verilog/ASIC tools.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: Startup Hardware Partnership</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Collaborate with Indian hardware startups (QNu Labs, QpiAI) on custom spin-qubit transceivers.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'business' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Business Scoping & Tech Scopes</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Read McKinsey/KPMG whitepapers to map commercial deployment windows (2025-2030).</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Learn Quantum Taxonomy</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Understand core technical differences between quantum annealing, gate QPUs, and logical scaling metrics.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: Strategic PQC advisory</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5">Consult with organizations to transition databases to post-quantum cryptography prior to decryption threats.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
