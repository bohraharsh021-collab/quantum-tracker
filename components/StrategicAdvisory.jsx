import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Code2, 
  Award, 
  Users, 
  Compass, 
  Cpu, 
  Library, 
  Calendar,
  FileText,
  Bookmark,
  ChevronRight,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export default function StrategicAdvisory() {
  const [activeTab, setActiveTab] = useState('careers');

  // 1. Career Paths Data
  const careerPaths = [
    {
      id: "q-software",
      title: "Quantum Software Engineer",
      icon: <Code2 className="text-cyber-accent" size={18} />,
      demand: "High",
      salary: "$110k - $160k",
      focus: "Developing compilers, simulators, API layers, and cloud infrastructure for quantum hardware.",
      skills: ["Python", "Qiskit / Pennylane / Cirq", "C++ / Rust", "Quantum circuit optimization", "Software engineering principles"],
      description: "Bridges classical software systems and raw quantum processors. You will write compiler passes, design quantum cloud APIs, and translate high-level algorithms into gate operations."
    },
    {
      id: "q-hardware",
      title: "Quantum Hardware Engineer",
      icon: <Cpu className="text-cyber-blue" size={18} />,
      demand: "Critical",
      salary: "$120k - $180k",
      focus: "Designing, fabricating, and characterising physical transmons, spin qubits, or photonic chips.",
      skills: ["Solid-state physics", "Cleanroom fabrication", "RF engineering", "Cryogenic systems", "Microwave electronics"],
      description: "Works on the physical implementation of qubits. This involves designing nanofabrication masks, running dilution refrigerators, and optimizing coherence times."
    },
    {
      id: "q-algorithms",
      title: "Quantum Algorithm Researcher",
      icon: <TrendingUp className="text-amber-400" size={18} />,
      demand: "High",
      salary: "$130k - $190k",
      focus: "Designing noise-resilient algorithms (NISQ) and fault-tolerant algorithms.",
      skills: ["Linear algebra", "Complexity theory", "Quantum chemistry", "Machine learning", "Scientific computing"],
      description: "Develops new mathematical frameworks to solve problems in optimization, chemistry simulation, cryptography, and machine learning. Often requires a PhD."
    },
    {
      id: "q-control",
      title: "Quantum Control Engineer",
      icon: <Compass className="text-purple-400" size={18} />,
      demand: "Medium-High",
      salary: "$115k - $165k",
      focus: "Optimizing the analog microwave or laser pulses that manipulate physical qubits.",
      skills: ["Control theory", "Digital Signal Processing (DSP)", "FPGA programming", "RF circuit design", "Machine learning control"],
      description: "Sits between hardware and software. You will design pulse-level controls to maximize gate fidelities and mitigate errors before they reach the logical compiler layer."
    },
    {
      id: "q-cryptographer",
      title: "Quantum Cryptography / Security Consultant",
      icon: <Award className="text-rose-400" size={18} />,
      demand: "Very High",
      salary: "$120k - $175k",
      focus: "Implementing post-quantum cryptography (PQC) and quantum key distribution (QKD).",
      skills: ["Mathematical cryptography", "NIST PQC standards", "QKD hardware integration", "Network security", "Information theory"],
      description: "Helps enterprises and governments prepare for the post-RSA era. You will deploy lattice-based algorithms and design quantum-safe network architectures."
    }
  ];

  // 2. Learning Roadmap Data (Math, Coding, Physics)
  const roadmapData = {
    math: [
      {
        topic: "Linear Algebra",
        importance: "Foundational",
        concepts: ["Complex vector spaces", "Hermitian and Unitary matrices", "Spectral theorem & eigendecomposition", "Tensor products (multi-qubit states)"]
      },
      {
        topic: "Probability & Statistics",
        importance: "High",
        concepts: ["Probability distributions", "Mixed states & density matrices", "Measurement statistics", "Quantum state tomography"]
      },
      {
        topic: "Complex Numbers & Calculus",
        importance: "Medium",
        concepts: ["Euler's formula", "Partial differential equations", "Complex analysis", "Fourier transforms"]
      }
    ],
    coding: [
      {
        topic: "Core Python & Scientific Stack",
        importance: "Essential",
        concepts: ["Object-Oriented Programming", "NumPy (matrix calculations)", "SciPy (scientific modeling)", "Matplotlib (visualization)"]
      },
      {
        topic: "Quantum Frameworks",
        importance: "Foundational",
        concepts: ["Qiskit (circuit building, transpilation)", "PennyLane (quantum machine learning, gradients)", "Cirq (Google-focused hardware control)"]
      },
      {
        topic: "Performance Programming",
        importance: "High",
        concepts: ["C++ (low-overhead hardware controls)", "Rust (robust memory-safe compiling)", "CUDA (accelerating classical simulators)"]
      }
    ],
    physics: [
      {
        topic: "Basic Quantum Mechanics",
        importance: "Foundational",
        concepts: ["Superposition and interference", "Wave-particle duality", "Bra-ket notation (Dirac)", "Schrödinger equation"]
      },
      {
        topic: "Quantum Information Theory",
        importance: "High",
        concepts: ["Entanglement (Bell states)", "No-Cloning Theorem", "Quantum gates & Bloch sphere", "Error-correcting codes"]
      },
      {
        topic: "Solid-State & Optical Physics",
        importance: "Specialized",
        concepts: ["Superconductivity (Josephson junctions)", "Semiconductor quantum dots", "Photonics & laser interferometry", "Cavity quantum electrodynamics"]
      }
    ]
  };

  // 3. Textbooks & Online Courses
  const educationalResources = [
    {
      title: "Quantum Computation and Quantum Information",
      author: "Michael A. Nielsen & Isaac L. Chuang",
      type: "Textbook",
      level: "All Levels (The Bible of QC)",
      description: "Universally considered the fundamental textbook for anyone entering the field of quantum computing."
    },
    {
      title: "Quantum Computing: An Applied Approach",
      author: "Jack D. Hidary",
      type: "Textbook",
      level: "Intermediate",
      description: "Highly practical guide with accompanying code implementations in Python and Qiskit."
    },
    {
      title: "Introduction to Classical and Quantum Computing",
      author: "Thomas G. Wong",
      type: "Textbook",
      level: "Beginner",
      description: "Extremely approachable introduction, making quantum concepts accessible with minimal physics background."
    },
    {
      title: "Qiskit Learning Resources & Seminars",
      author: "IBM Quantum",
      type: "Online Course / Documentation",
      level: "Beginner to Advanced",
      description: "Interactive tutorials, textbooks, and video seminars covering everything from gate basics to complex algorithms."
    },
    {
      title: "MITx Quantum Information Science (edX)",
      author: "MIT Professors (Chuang et al.)",
      type: "Online Course Series",
      level: "Advanced",
      description: "Rigorous three-part graduate-level online curriculum covering quantum physics and computation structures."
    },
    {
      title: "Quantum Computing Specialization (Coursera)",
      author: "Saint Petersburg State University",
      type: "Online Course",
      level: "Intermediate",
      description: "Comprehensive multi-course specialization focusing on mathematical foundations and quantum programming."
    }
  ];

  // 4. Hackathons & Communities
  const communities = [
    {
      name: "Qiskit Global Hackathon & Summer School",
      host: "IBM Quantum",
      type: "Hackathon & Training",
      focus: "Worldwide",
      description: "The largest global event in quantum computing, offering intensive training lectures and team projects using real IBM QPUs."
    },
    {
      name: "IndiQ",
      host: "Indian Quantum Community",
      type: "Community Hub",
      focus: "India & South Asia",
      description: "A highly active Discord/Telegram community bringing together Indian quantum students, researchers, and professionals for R&D collaboration and study groups."
    },
    {
      name: "Womanium Quantum",
      host: "Womanium Foundation",
      type: "Global Training & Launchpad",
      focus: "Global",
      description: "An intensive summer school and fellowship program focused on preparing women and diverse candidates for careers in quantum computing."
    },
    {
      name: "Quantum Coalition Hack (QC Hack)",
      host: "Yale & Stanford student coalitions",
      type: "Student Hackathon",
      focus: "Global Students",
      description: "Annual collegiate hackathon offering beginner and advanced tracks, hardware access from sponsors, and networking with tech firms."
    },
    {
      name: "QWorld / QIndia",
      host: "QWorld Association",
      type: "Global Education Network",
      focus: "Local Chapters",
      description: "A volunteer-driven global network that hosts localized 'QBronze' and 'QSilver' workshops on quantum circuits and algorithms."
    }
  ];

  // 5. Fellowships & Scholarships
  const fellowships = [
    {
      name: "IBM Quantum PhD Fellowship Program",
      provider: "IBM Research",
      coverage: "Tuition, stipend, and research mentorship at IBM Labs.",
      target: "PhD Candidates globally working on quantum algorithms/hardware.",
      deadline: "Varies annually (typically late Fall)"
    },
    {
      name: "National Quantum Mission (NQM) Fellowship Scheme",
      provider: "DST, Government of India",
      coverage: "Generous monthly stipend (JRF/SRF/Postdoc rates) plus contingency grants.",
      target: "Masters/PhD/Postdoc scholars conducting research in designated Indian NQM Hubs (IISc, IITs, etc.).",
      deadline: "Rolling admission via DST announcements"
    },
    {
      name: "Womanium Quantum Fellowship",
      provider: "Womanium & Industry Sponsors",
      coverage: "Program registration coverage, project stipends, and internship matching.",
      target: "Undergraduate and graduate students globally.",
      deadline: "May annually"
    },
    {
      name: "CERN openlab Summer Student Programme",
      provider: "CERN",
      coverage: "9-week residency stipend, travel allowance, and hands-on project placement.",
      target: "Undergraduate/Master's students in computer science/physics interested in high-performance quantum algorithms.",
      deadline: "January annually"
    }
  ];

  // 6. Academic Paths (Degrees & Hubs)
  const academicHubs = [
    {
      name: "IIT Madras Interdisciplinary Hub",
      degree: "IDDD in Quantum Science & Technology",
      level: "Integrated Dual Degree (B.Tech + M.Tech)",
      location: "Chennai, India",
      focus: "IBM Quantum Network hub integration, quantum software, financial optimization modeling, and physics theory."
    },
    {
      name: "IISc Bengaluru Quantum Technology Program",
      degree: "M.Tech in Quantum Technology",
      level: "Postgraduate (M.Tech / PhD)",
      location: "Bengaluru, India",
      focus: "Cryogenic superconducting qubit characterization, quantum optics, silicon photonics, and quantum materials."
    },
    {
      name: "QuTech (TU Delft)",
      degree: "M.Sc. / Ph.D. Tracks in Quantum Information",
      level: "Graduate / PhD research",
      location: "Delft, Netherlands",
      focus: "Silicon spin qubits, topological insulators, quantum internet network protocols, and cryo-CMOS electronics."
    },
    {
      name: "DIAT Pune Department of Applied Physics",
      degree: "M.Tech in Quantum Computing",
      level: "Postgraduate (M.Tech)",
      location: "Pune, India",
      focus: "Defense-oriented quantum security, secure satellite QKD links, and cryptographic protocol implementations."
    },
    {
      name: "Institute for Quantum Computing (IQC)",
      degree: "Collaborative Quantum Information Graduate Program",
      level: "M.Sc. / Ph.D.",
      location: "Waterloo, Canada",
      focus: "Full-stack quantum computing research, quantum optics, cryptography, spin systems, and materials science."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            <GraduationCap className="text-cyber-accent animate-pulse" size={24} />
            Student Career & Skill Roadmap
          </h1>
          <p className="text-sm text-cyber-muted font-sans mt-1">
            Indispensable navigation map for students seeking research careers, software design roles, or hardware engineering positions in Quantum Science.
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/15 px-3 py-1 rounded border border-cyber-accent/30 uppercase tracking-wider self-start md:self-center">
          Academic Engine v4.0
        </span>
      </div>

      {/* Navigation Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-cyber-border/40 pb-4 font-mono">
        {[
          { id: 'careers', label: 'Career Paths', icon: <Compass size={14} /> },
          { id: 'roadmap', label: 'Learning Roadmap', icon: <Code2 size={14} /> },
          { id: 'resources', label: 'Textbooks & Courses', icon: <Library size={14} /> },
          { id: 'communities', label: 'Communities & Hacks', icon: <Users size={14} /> },
          { id: 'fellowships', label: 'Scholarships', icon: <Award size={14} /> },
          { id: 'academics', label: 'Academic Degrees', icon: <GraduationCap size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs uppercase rounded transition-all flex items-center gap-1.5 border ${
              activeTab === tab.id 
                ? 'bg-cyber-accent/15 text-cyber-accent font-bold border-cyber-accent/40 shadow-[0_0_12px_rgba(0,230,153,0.1)]' 
                : 'bg-[#111A28] text-cyber-muted border-cyber-border/60 hover:text-white hover:border-cyber-border'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        
        {/* TAB 1: CAREER PATHS */}
        {activeTab === 'careers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careerPaths.map(path => (
              <div 
                key={path.id} 
                className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-blue/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start border-b border-cyber-border/40 pb-3">
                    <div className="flex items-center gap-2">
                      {path.icon}
                      <h3 className="text-sm font-bold text-white font-mono uppercase">{path.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 border border-cyber-accent/20 rounded">
                      Demand: {path.demand}
                    </span>
                  </div>
                  
                  <p className="text-xs text-cyber-text leading-relaxed mt-3 font-sans">
                    {path.description}
                  </p>

                  <div className="mt-3 bg-[#0B1320] border border-cyber-border/40 p-3 rounded space-y-1 text-xs">
                    <strong className="text-cyber-blue font-mono uppercase text-[10px] block">Core Project Mandate:</strong>
                    <span className="text-cyber-muted font-sans block leading-normal">{path.focus}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyber-border/30 mt-4 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-cyber-muted uppercase">Est. Global Starting Salary:</span>
                    <span className="text-white font-bold">{path.salary}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase block">Key Skillsets Needed:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {path.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="bg-[#0B1320] border border-cyber-border text-white text-[9px] px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LEARNING ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-[#111A28] border border-cyber-border rounded p-4 font-mono text-xs text-cyber-muted leading-relaxed font-sans">
              <span className="font-mono text-cyber-accent font-bold uppercase text-[10px] block mb-1">Interactive Syllabus Guide:</span>
              Self-taught or academic guidelines structured to take you from a standard STEM background into high-level quantum systems research.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mathematics Track */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2.5 text-cyber-accent">
                  <Bookmark size={16} />
                  <h3 className="font-bold text-xs uppercase font-mono tracking-wider">01. Mathematics Core</h3>
                </div>

                <div className="space-y-4">
                  {roadmapData.math.map((item, idx) => (
                    <div key={idx} className="space-y-2 bg-[#0B1320] border border-cyber-border/40 p-3.5 rounded hover:border-cyber-accent/35 transition-colors">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-white">{item.topic}</span>
                        <span className="text-[9px] bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20 px-1.5 py-0.5 rounded uppercase">
                          {item.importance}
                        </span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-cyber-muted font-mono pl-1 list-none">
                        {item.concepts.map((concept, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1">
                            <span className="text-cyber-accent mt-0.5 font-bold">▪</span>
                            <span className="leading-normal">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coding & Compilers Track */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2.5 text-cyber-blue">
                  <Code2 size={16} />
                  <h3 className="font-bold text-xs uppercase font-mono tracking-wider">02. Coding & Compilers</h3>
                </div>

                <div className="space-y-4">
                  {roadmapData.coding.map((item, idx) => (
                    <div key={idx} className="space-y-2 bg-[#0B1320] border border-cyber-border/40 p-3.5 rounded hover:border-cyber-blue/35 transition-colors">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-white">{item.topic}</span>
                        <span className="text-[9px] bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 px-1.5 py-0.5 rounded uppercase">
                          {item.importance}
                        </span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-cyber-muted font-mono pl-1 list-none">
                        {item.concepts.map((concept, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1">
                            <span className="text-cyber-blue mt-0.5 font-bold">▪</span>
                            <span className="leading-normal">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantum Physics Core */}
              <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-2.5 text-amber-500">
                  <Cpu size={16} />
                  <h3 className="font-bold text-xs uppercase font-mono tracking-wider">03. Quantum Physics</h3>
                </div>

                <div className="space-y-4">
                  {roadmapData.physics.map((item, idx) => (
                    <div key={idx} className="space-y-2 bg-[#0B1320] border border-cyber-border/40 p-3.5 rounded hover:border-amber-500/35 transition-colors">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-white">{item.topic}</span>
                        <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase">
                          {item.importance}
                        </span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-cyber-muted font-mono pl-1 list-none">
                        {item.concepts.map((concept, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1">
                            <span className="text-amber-500 mt-0.5 font-bold">▪</span>
                            <span className="leading-normal">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TEXTBOOKS & ONLINE COURSES */}
        {activeTab === 'resources' && (
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 font-mono">
            <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-3">
              <Library className="text-cyber-accent" size={16} />
              <h2 className="font-bold text-white text-xs uppercase tracking-wider">
                Essential Textbooks & Interactive Courses
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationalResources.map((res, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#0B1320] border border-cyber-border/60 hover:border-cyber-accent/40 transition-all rounded p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-white uppercase leading-normal">{res.title}</h3>
                      <span className="text-[9px] whitespace-nowrap bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 px-2 py-0.5 rounded uppercase font-bold">
                        {res.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyber-muted block">By {res.author}</span>
                  </div>

                  <p className="text-[11px] text-cyber-text leading-relaxed font-sans">
                    {res.description}
                  </p>

                  <div className="border-t border-cyber-border/30 pt-2 flex justify-between items-center text-[10px] text-cyber-muted uppercase">
                    <span>SUGGESTED LEVEL:</span>
                    <span className="text-white font-bold">{res.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HACKATHONS & COMMUNITY HUBS */}
        {activeTab === 'communities' && (
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 font-mono">
            <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-3">
              <Users className="text-cyber-blue" size={16} />
              <h2 className="font-bold text-white text-xs uppercase tracking-wider">
                Hackathons & Collaborative Community Hubs
              </h2>
            </div>

            <div className="space-y-4">
              {communities.map((hub, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0B1320] border border-cyber-border/60 hover:border-cyber-blue/40 p-4 rounded transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 md:max-w-[70%]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xs font-bold text-white uppercase">{hub.name}</h3>
                      <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 px-2 py-0.5 rounded font-bold uppercase">
                        {hub.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-cyber-muted leading-relaxed font-sans">
                      {hub.description}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 border-cyber-border/30 pt-2.5 md:pt-0 text-[10px] text-cyber-muted space-y-0.5">
                    <span className="uppercase">Hosted by:</span>
                    <span className="text-white font-bold">{hub.host}</span>
                    <span className="text-cyber-blue font-bold mt-1 md:mt-0">{hub.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCHOLARSHIPS & FELLOWSHIPS */}
        {activeTab === 'fellowships' && (
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 font-mono">
            <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-3">
              <Award className="text-amber-500" size={16} />
              <h2 className="font-bold text-white text-xs uppercase tracking-wider">
                Fellowships & Research Scholarships
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fellowships.map((f, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0B1320] border border-cyber-border/60 hover:border-amber-500/30 rounded p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white uppercase">{f.name}</h3>
                    <span className="text-[9px] text-cyber-muted block">Provider: {f.provider}</span>
                  </div>

                  <div className="space-y-1 text-[11px] text-cyber-text leading-relaxed font-sans">
                    <p><strong>Coverage:</strong> {f.coverage}</p>
                    <p className="text-cyber-muted"><strong>Eligibility:</strong> {f.target}</p>
                  </div>

                  <div className="border-t border-cyber-border/30 pt-2 flex justify-between items-center text-[10px] text-cyber-muted font-mono">
                    <span>APPLICATION DEADLINE:</span>
                    <span className="text-amber-400 font-bold">{f.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ACADEMIC PATHS (DEGREES) */}
        {activeTab === 'academics' && (
          <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 font-mono">
            <div className="flex items-center gap-2 border-b border-cyber-border/40 pb-3">
              <GraduationCap className="text-cyber-accent" size={16} />
              <h2 className="font-bold text-white text-xs uppercase tracking-wider">
                Degree Programs & Regional University Hubs
              </h2>
            </div>

            <div className="space-y-4">
              {academicHubs.map((hub, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0B1320] border border-cyber-border/60 hover:border-cyber-accent/40 p-4 rounded transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyber-border/30 pb-2 mb-2 font-mono">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase">{hub.name}</h3>
                      <span className="text-[10px] text-cyber-muted block mt-0.5 font-bold text-cyber-accent">{hub.degree}</span>
                    </div>
                    <span className="text-[9px] bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 px-2.5 py-0.5 rounded font-bold uppercase self-start sm:self-center">
                      {hub.level}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-cyber-text leading-relaxed font-sans">
                      <strong>Target Research Areas:</strong> {hub.focus}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-cyber-muted uppercase pt-1">
                      <span>LOCATION:</span>
                      <span className="text-white font-bold">{hub.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
