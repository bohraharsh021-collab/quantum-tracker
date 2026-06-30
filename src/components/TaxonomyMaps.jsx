import React, { useState, useMemo } from 'react';
import { 
  GitPullRequest, 
  Activity, 
  Info, 
  Cpu, 
  Terminal, 
  Cloud, 
  TrendingUp, 
  ExternalLink,
  Zap,
  Code
} from 'lucide-react';

export default function TaxonomyMaps({ articles = [] }) {
  // Taxonomy Hierarchy Definition
  const taxonomyData = useMemo(() => [
    {
      category: "Qubit Methods",
      icon: Cpu,
      description: "Fundamental hardware architectures utilized to create physical and logical qubits.",
      nodes: [
        {
          name: "Superconducting",
          description: "Uses superconducting electrical circuits with Josephson junctions cooled to ~10mK. Fastest gate speeds but prone to environmental noise.",
          companies: ["IBM", "Google Quantum AI", "Rigetti Computing", "IQM", "TIFR"],
          keywords: ["superconducting", "transmon", "ibm", "google", "rigetti", "tifr"],
          trend: "Stable",
          color: "text-blue-400 border-blue-500/20"
        },
        {
          name: "Trapped Ion",
          description: "Suspends atomic ions in electromagnetic traps, manipulated via laser beams. Exceptional gate fidelity and long coherence times, but slower gates.",
          companies: ["Quantinuum", "IonQ", "Alpine Quantum Technologies"],
          keywords: ["trapped ion", "ion trap", "quantinuum", "ionq"],
          trend: "Rising",
          color: "text-amber-400 border-amber-500/20"
        },
        {
          name: "Neutral Atom",
          description: "Traps neutral atoms in 2D/3D grids using optical tweezers. Highly scalable for analog simulation and digital processors.",
          companies: ["QuEra Computing", "Pasqal", "Atom Computing"],
          keywords: ["neutral atom", "rydberg", "quera", "pasqal", "aquila"],
          trend: "Hot",
          color: "text-emerald-400 border-emerald-500/20"
        },
        {
          name: "Photonic",
          description: "Leverages photons routed through optical circuits. Runs at room temperature and integrates easily with fiber networks.",
          companies: ["Xanadu", "PsiQuantum", "USTC"],
          keywords: ["photonic", "squeezed light", "boson sampling", "xanadu", "psiqe", "jiuzhang"],
          trend: "Rising",
          color: "text-purple-400 border-purple-500/20"
        },
        {
          name: "Silicon Spin",
          description: "Traps electron/nuclear spins in silicon quantum dots. Highly compatible with standard semiconductor CMOS fabrication.",
          companies: ["Intel", "Quantum Motion", "QuTech", "QpiAI"],
          keywords: ["silicon spin", "spin qubit", "quantum dot", "intel", "qutech", "qpiai"],
          trend: "Hot",
          color: "text-pink-400 border-pink-500/20"
        },
        {
          name: "Topological",
          description: "Protects qubits physically by braiding Majorana zero modes. High immunity to local noise, currently in deep R&D.",
          companies: ["Microsoft Quantum"],
          keywords: ["topological", "majorana", "microsoft"],
          trend: "Emerging",
          color: "text-indigo-400 border-indigo-500/20"
        },
        {
          name: "NV Diamond",
          description: "Uses nitrogen-vacancy defects in synthetic diamond structures. Operates stably at room temperature, ideal for sensors.",
          companies: ["Quantum Brilliance", "Element Six", "CSIR-NPL"],
          keywords: ["nv diamond", "nitrogen-vacancy", "diamond qubit"],
          trend: "Emerging",
          color: "text-cyan-400 border-cyan-500/20"
        },
        {
          name: "Annealing",
          description: "Specialized system designed to find global minima for combinatorial optimization problems via quantum tunneling.",
          companies: ["D-Wave Systems", "NEC", "Fujitsu"],
          keywords: ["annealing", "annealer", "d-wave", "d wave"],
          trend: "Stable",
          color: "text-teal-400 border-teal-500/20"
        }
      ]
    },
    {
      category: "Programming Languages",
      icon: Code,
      description: "Languages used to write, compile, and execute quantum algorithms and code.",
      nodes: [
        {
          name: "Python",
          description: "The industry standard wrapper for constructing quantum circuits, machine learning pipelines, and scripting.",
          companies: ["IBM", "Google", "Rigetti", "Xanadu"],
          keywords: ["python", "py-"],
          trend: "Stable",
          color: "text-blue-400 border-blue-500/20"
        },
        {
          name: "C++",
          description: "Used for high-performance simulator backends, low-level compilers, and microcode firmware controllers.",
          companies: ["NVIDIA", "Intel", "IBM", "QpiAI"],
          keywords: ["c++", "cpp", "cuda-q"],
          trend: "Stable",
          color: "text-amber-400 border-amber-500/20"
        },
        {
          name: "Rust",
          description: "Rapidly replacing C++ for core runtime systems, safety-critical middleware, and compiler components.",
          companies: ["Xanadu", "Microsoft", "QpiAI"],
          keywords: ["rust", "rs-"],
          trend: "Rising",
          color: "text-orange-400 border-orange-500/20"
        },
        {
          name: "Julia",
          description: "Highly favored in academic circles for fast mathematical simulations and algorithm research.",
          companies: ["JuliaHub", "MIT", "Research Labs"],
          keywords: ["julia", "jl-"],
          trend: "Emerging",
          color: "text-purple-400 border-purple-500/20"
        },
        {
          name: "Q#",
          description: "Domain-specific programming language developed by Microsoft for quantum resource estimation.",
          companies: ["Microsoft"],
          keywords: ["q#", "qsharp"],
          trend: "Rising",
          color: "text-indigo-400 border-indigo-500/20"
        }
      ]
    },
    {
      category: "SDKs & Compilers",
      icon: Terminal,
      description: "Development toolkits to design circuits, apply optimization gates, and target QPUs.",
      nodes: [
        {
          name: "Qiskit",
          description: "The most widely adopted open-source software development kit for gate-based superconducting systems.",
          companies: ["IBM", "Community Developers"],
          keywords: ["qiskit"],
          trend: "Hot",
          color: "text-cyan-400 border-cyan-500/20"
        },
        {
          name: "Cirq",
          description: "Google's framework for writing, manipulating, and running quantum circuits on NISQ processors.",
          companies: ["Google Quantum AI"],
          keywords: ["cirq"],
          trend: "Stable",
          color: "text-blue-400 border-blue-500/20"
        },
        {
          name: "PennyLane",
          description: "Cross-platform library for differentiable quantum computing and quantum machine learning.",
          companies: ["Xanadu"],
          keywords: ["pennylane"],
          trend: "Explosive",
          color: "text-emerald-400 border-emerald-500/20"
        },
        {
          name: "TKET",
          description: "An advanced, platform-agnostic optimizing compiler developed to minimize gate counts and error rates.",
          companies: ["Quantinuum"],
          keywords: ["tket", "pytket"],
          trend: "Rising",
          color: "text-purple-400 border-purple-500/20"
        },
        {
          name: "CUDA-Q",
          description: "NVIDIA's unified system platform combining high-performance GPU simulation with physical QPUs.",
          companies: ["NVIDIA"],
          keywords: ["cuda-q", "cudaq", "nvidia"],
          trend: "Explosive",
          color: "text-emerald-400 border-emerald-500/20"
        },
        {
          name: "Braket SDK",
          description: "Unified developer toolkit to interface with hardware backends hosted on AWS.",
          companies: ["Amazon Web Services"],
          keywords: ["braket"],
          trend: "Stable",
          color: "text-orange-400 border-orange-500/20"
        },
        {
          name: "Pulser",
          description: "Pulse-level simulator and programmer specifically developed for neutral atom processors.",
          companies: ["Pasqal"],
          keywords: ["pulser"],
          trend: "Emerging",
          color: "text-amber-400 border-amber-500/20"
        },
        {
          name: "Qibo",
          description: "Full-stack middleware toolkit for quantum simulation, hardware control, and research calibration.",
          companies: ["Qilimanjaro", "TII"],
          keywords: ["qibo"],
          trend: "Rising",
          color: "text-pink-400 border-pink-500/20"
        },
        {
          name: "Classiq",
          description: "Automated compiler platform translating high-level functional concepts into gate logic.",
          companies: ["Classiq Technologies"],
          keywords: ["classiq"],
          trend: "Hot",
          color: "text-indigo-400 border-indigo-500/20"
        },
        {
          name: "BQSKit",
          description: "Berkeley Quantum Synthesis Toolkit, a super-optimizing compilation framework.",
          companies: ["Lawrence Berkeley Lab"],
          keywords: ["bqskit"],
          trend: "Emerging",
          color: "text-teal-400 border-teal-500/20"
        }
      ]
    },
    {
      category: "Cloud Platforms",
      icon: Cloud,
      description: "Host platforms providing commercial quantum hardware API endpoints and simulators.",
      nodes: [
        {
          name: "IBM Quantum",
          description: "Offers cloud endpoints to the largest commercial fleet of physical superconducting quantum processors.",
          companies: ["IBM"],
          keywords: ["ibm quantum", "ibm cloud"],
          trend: "Stable",
          color: "text-blue-400 border-blue-500/20"
        },
        {
          name: "Azure Quantum",
          description: "Microsoft's cloud sandbox hosting physical systems from Quantinuum, IonQ, and Rigetti.",
          companies: ["Microsoft", "Quantinuum", "IonQ", "Rigetti"],
          keywords: ["azure quantum", "microsoft azure"],
          trend: "Rising",
          color: "text-indigo-400 border-indigo-500/20"
        },
        {
          name: "AWS Braket",
          description: "Amazon's managed service offering access to neutral atom, trapped-ion, and photonic QPUs.",
          companies: ["AWS", "QuEra", "IonQ", "Rigetti"],
          keywords: ["amazon braket", "braket"],
          trend: "Stable",
          color: "text-orange-400 border-orange-500/20"
        },
        {
          name: "Google Cloud",
          description: "Enables corporate and research partners to access Google's internal Sycamore QPU grids.",
          companies: ["Google Cloud", "Google Quantum AI"],
          keywords: ["google cloud", "google quantum", "sycamore"],
          trend: "Stable",
          color: "text-blue-400 border-blue-500/20"
        },
        {
          name: "IonQ Cloud",
          description: "Direct API access portal to IonQ's trapped-ion processors, skipping public hyperscalers.",
          companies: ["IonQ"],
          keywords: ["ionq cloud"],
          trend: "Rising",
          color: "text-amber-400 border-amber-500/20"
        }
      ]
    }
  ], []);

  const [activeCategoryName, setActiveCategoryName] = useState(taxonomyData[0].category);
  const [selectedNodeName, setSelectedNodeName] = useState(taxonomyData[0].nodes[0].name);

  // Active Category & Selected Node Lookup
  const activeCategory = useMemo(() => {
    return taxonomyData.find(cat => cat.category === activeCategoryName);
  }, [activeCategoryName, taxonomyData]);

  const selectedNode = useMemo(() => {
    if (!activeCategory) return null;
    return activeCategory.nodes.find(n => n.name === selectedNodeName) || activeCategory.nodes[0];
  }, [activeCategory, selectedNodeName]);

  // Compute matched articles count from feed dynamically
  const nodeMetrics = useMemo(() => {
    const metrics = {};
    taxonomyData.forEach(cat => {
      cat.nodes.forEach(node => {
        const keywords = node.keywords;
        const matched = articles.filter(art => {
          const content = `${art.title || ''} ${art.summary || ''} ${(art.tags || []).join(' ')}`.toLowerCase();
          return keywords.some(kw => content.includes(kw.toLowerCase()));
        });
        metrics[node.name] = {
          count: matched.length,
          articlesList: matched.slice(0, 3) // get latest 3 headlines
        };
      });
    });
    return metrics;
  }, [articles, taxonomyData]);

  const activeCategoryIcon = useMemo(() => {
    if (!activeCategory) return Cpu;
    return activeCategory.icon;
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Sector Taxonomy Map
        </h1>
        <p className="text-sm text-cyber-muted">
          Hierarchical mapping of quantum technology domains, hardware implementations, languages, SDKs, and deployment platforms.
        </p>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {taxonomyData.map(cat => {
          const CatIcon = cat.icon;
          const totalCatArticles = cat.nodes.reduce((acc, n) => acc + (nodeMetrics[n.name]?.count || 0), 0);
          return (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategoryName(cat.category);
                setSelectedNodeName(cat.nodes[0].name);
              }}
              className={`text-left p-4 border font-mono rounded flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                activeCategoryName === cat.category 
                  ? 'bg-cyber-accent/10 border-cyber-accent text-white shadow-[0_0_15px_rgba(0,230,153,0.1)]' 
                  : 'bg-[#111A28] border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-white'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-xs uppercase tracking-wider font-bold">
                  {cat.category}
                </span>
                <CatIcon size={18} className={activeCategoryName === cat.category ? "text-cyber-accent" : "text-cyber-muted"} />
              </div>
              <div className="mt-4 flex justify-between items-end w-full">
                <span className="text-2xl font-bold font-mono text-white">
                  {cat.nodes.length} <span className="text-[10px] text-cyber-muted font-normal">Nodes</span>
                </span>
                <span className="text-[10px] bg-[#0B1320] border border-cyber-border/40 px-2 py-0.5 rounded text-cyber-blue">
                  {totalCatArticles} news items
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Redesigned Hierarchy Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node selector grid (Left/Middle 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111A28] border border-cyber-border rounded p-4">
            <div className="flex items-center gap-2 border-b border-cyber-border/60 pb-2 mb-4">
              <span className="p-1 rounded bg-cyber-accent/10 text-cyber-accent">
                {React.createElement(activeCategoryIcon, { size: 16 })}
              </span>
              <h2 className="font-mono font-bold uppercase text-white text-xs">
                {activeCategoryName} Hierarchy Nodes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCategory?.nodes.map((node) => {
                const count = nodeMetrics[node.name]?.count || 0;
                const isSelected = selectedNodeName === node.name;
                
                return (
                  <button
                    key={node.name}
                    onClick={() => setSelectedNodeName(node.name)}
                    className={`text-left p-3.5 border rounded font-mono transition-all duration-200 flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-cyber-blue/10 border-cyber-blue text-white shadow-[0_0_12px_rgba(0,163,255,0.15)]'
                        : 'bg-[#0B1320] border-cyber-border/60 text-cyber-muted hover:border-cyber-blue/40'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full mb-1">
                      <span className="font-bold text-white text-xs tracking-wide">
                        {node.name}
                      </span>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                        node.trend === 'Explosive' || node.trend === 'Hot' ? 'bg-red-500/10 text-[#EF4444]' :
                        node.trend === 'Rising' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-cyber-muted'
                      }`}>
                        {node.trend.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-[11px] text-cyber-muted line-clamp-2 leading-relaxed mb-3">
                      {node.description}
                    </p>

                    <div className="flex justify-between items-center w-full text-[10px]">
                      <span className="text-cyber-blue truncate max-w-[120px]">
                        {node.companies.slice(0, 2).join(', ')}
                      </span>
                      <span className="font-semibold text-cyber-accent bg-cyber-accent/10 px-1.5 rounded">
                        {count} articles
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed node panel (Right Column) */}
        <div className="lg:col-span-1">
          {selectedNode ? (
            <div className="bg-[#111A28] border border-cyber-blue/40 rounded p-5 space-y-5 h-full flex flex-col justify-between shadow-[0_0_20px_rgba(0,163,255,0.03)]">
              <div>
                <div className="border-b border-cyber-border pb-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest">
                      Node Details
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20">
                      <TrendingUp size={10} /> {selectedNode.trend}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white mt-1">
                    {selectedNode.name}
                  </h3>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-cyber-muted text-[10px] uppercase">Description</span>
                    <p className="text-white leading-relaxed bg-[#0B1320] border border-cyber-border/40 p-3 rounded">
                      {selectedNode.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-cyber-muted text-[10px] uppercase">Key Industry Players</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.companies.map((comp, idx) => (
                        <span key={idx} className="bg-[#0B1320] border border-cyber-border text-white px-2 py-0.5 rounded text-[10px]">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-[10px] uppercase text-cyber-muted border-b border-cyber-border/40 pb-1">
                      <span>Related Live News</span>
                      <span className="text-cyber-accent font-bold">
                        {nodeMetrics[selectedNode.name]?.count || 0} Total
                      </span>
                    </div>

                    {(nodeMetrics[selectedNode.name]?.articlesList || []).length > 0 ? (
                      <div className="space-y-2">
                        {nodeMetrics[selectedNode.name].articlesList.map((art, idx) => (
                          <div key={idx} className="bg-[#0B1320] border border-cyber-border/40 rounded p-2.5 space-y-1 hover:border-cyber-accent/40 transition-colors">
                            <h5 className="font-bold text-[11px] text-white line-clamp-1">
                              {art.title}
                            </h5>
                            <div className="flex justify-between text-[9px] text-cyber-muted">
                              <span>{art.source || 'Telecom Feed'}</span>
                              <span>{new Date(art.pubDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-cyber-muted italic py-1">
                        No active news feed items match this node's keywords.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cyber-border/40 mt-4 flex items-center gap-2">
                <span className="p-1 rounded bg-[#0B1320] border border-cyber-border/60 text-cyber-blue">
                  <Info size={12} />
                </span>
                <p className="text-[9px] font-mono text-cyber-muted leading-tight">
                  Dynamic counts index on articles containing matching taxonomy signatures.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#111A28] border border-cyber-border rounded p-6 text-center text-cyber-muted font-mono text-xs italic">
              Select a taxonomy node to explore details.
            </div>
          )}
        </div>
      </div>

      {/* Global Architecture Banner */}
      <div className="bg-cyber-blue/10 border border-cyber-blue/20 p-4 rounded text-xs text-cyber-blue font-mono flex items-start gap-2.5">
        <Info size={18} className="mt-0.5 flex-shrink-0 text-cyber-blue" />
        <div className="space-y-1">
          <p className="font-semibold text-white">
            Architecture Mapping & National Strategy Integration
          </p>
          <p className="leading-relaxed text-cyber-muted">
            The Indian National Quantum Mission (NQM) allocates explicit research clusters for superconducting, photonics, and silicon spin-qubit designs, coordinating national efforts across IISc, TIFR, and the IIT system.
          </p>
        </div>
      </div>
    </div>
  );
}
