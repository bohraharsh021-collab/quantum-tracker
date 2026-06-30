import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  Shield, 
  Landmark, 
  Zap, 
  HelpCircle, 
  Code, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Compass,
  Search,
  CheckCircle2,
  Clock,
  FlaskConical
} from 'lucide-react';
import { MCKINSEY_ADVISORY_DECK } from '../data/quantumData';

// Expanded 30+ high-fidelity application profiles
const EXPANDED_APPLICATIONS = [
  {
    name: "Quantum Key Distribution (QKD) for Defense Networks",
    category: "Security & Cryptography",
    description: "Uses the physical properties of light particles (photons) to distribute cryptographic keys securely. Any interception attempt alters the quantum states, alerting security teams instantly.",
    trl: 8,
    industries: "Defense, National Security, Telecom, Banking",
    commercialDevelopers: "QNu Labs, ID Quantique, Toshiba, QuintessenceLabs",
    governmentProjects: "Indian Armed Forces (NQM), US Defense Quantum Communications Network",
    studentResearchOpportunities: "Laser pulse timing optimization internship at QNu Labs; PhD positions at IISc Quantum Sensors Lab.",
    algorithms: "BB84 Protocol, Decoy-State Protocol, E91 Entanglement-based protocol"
  },
  {
    name: "Post-Quantum Cryptography (PQC) Database Migration",
    category: "Security & Cryptography",
    description: "Software algorithms mathematically designed to run on classical systems that are immune to decryption by Shor's algorithm running on future fault-tolerant quantum computers.",
    trl: 7,
    industries: "Finance, Cloud Providers, Enterprise Software, Public Infrastructure",
    commercialDevelopers: "Google Cloud, Cloudflare, Microsoft, Signal, QNu Labs",
    governmentProjects: "NIST PQC Standardization Initiative, Indian DRDO PQC Deployment",
    studentResearchOpportunities: "Research on Module-Lattice-Based Key Encapsulation at IIT Madras; internship opportunities at Cloudflare.",
    algorithms: "ML-KEM (Kyber), ML-DSA (Dilithium), FN-DSA (Falcon)"
  },
  {
    name: "Nitrogen-Fixing Catalyst Simulation (Haber-Bosch)",
    category: "Chemistry & Materials",
    description: "Simulating the electronic structure of the active site (FeMoco) of nitrogenase enzyme to discover catalyst alternatives for room-temperature nitrogen fixation.",
    trl: 3,
    industries: "Agriculture, Chemical Manufacturing, Fertilizer Production",
    commercialDevelopers: "BASF, Google Quantum AI, Classiq",
    governmentProjects: "US Department of Energy Catalysis Research, Horizon Europe",
    studentResearchOpportunities: "Master's thesis on active-space selection algorithms at TIFR Mumbai; research assistant positions at BASF Labs.",
    algorithms: "VQE (Variational Quantum Eigensolver), Quantum Phase Estimation (QPE)"
  },
  {
    name: "Solid-State Lithium-Battery Electrolyte Discovery",
    category: "Chemistry & Materials",
    description: "Simulating ion transport and molecular interface behaviors inside lithium-battery cells to accelerate discovery of dendrite-free solid-state electrolytes.",
    trl: 4,
    industries: "Automotive, Battery Manufacturers, Consumer Electronics",
    commercialDevelopers: "Ford, Hyundai, IBM Quantum Network, Classiq",
    governmentProjects: "National Quantum Mission (India) Battery Taskforce, Joint Center for Energy Storage (USA)",
    studentResearchOpportunities: "Internships at QpiAI India designing battery simulation algorithms; Research fellowships at IIT Bombay.",
    algorithms: "VQE (Variational Quantum Eigensolver), Density Functional Theory (DFT) modeling"
  },
  {
    name: "Superalloy Design for Jet Turbines & Spacecraft",
    category: "Chemistry & Materials",
    description: "Designing lightweight, high-temperature composite metals by modeling molecular crystal structures, reducing physical fabrication trials.",
    trl: 3,
    industries: "Aerospace, Defense, Heavy Machinery",
    commercialDevelopers: "Boeing, Airbus, Honeywell Quantum Solutions",
    governmentProjects: "ISRO Materials Research Hub (India), NASA Materials Lab",
    studentResearchOpportunities: "PhD studies on alloy simulation at IIT Kharagpur; research projects with Boeing Aerospace Hub.",
    algorithms: "Ab initio Molecular Dynamics (MD), QAOA for structural optimization"
  },
  {
    name: "Carbon Capture Metal-Organic Framework Simulation",
    category: "Chemistry & Materials",
    description: "Modeling gas adsorption dynamics in metal-organic frameworks (MOFs) to identify chemical compositions with maximum CO2 trapping capacity.",
    trl: 3,
    industries: "Energy, Oil & Gas, Environmental Policy",
    commercialDevelopers: "Shell, ExxonMobil, Pasqal",
    governmentProjects: "EU Green Deal Research Grants, India DST Environmental Task Force",
    studentResearchOpportunities: "Simulating gas diffusion on QuEra Aquila simulator; Research internships at Pasqal.",
    algorithms: "Analog Rydberg Atom Simulation, Quantum Monte Carlo (QMC)"
  },
  {
    name: "High-Yield Investment Portfolio Optimization",
    category: "Finance",
    description: "Selecting optimal asset weights in financial portfolios to maximize returns while strictly adhering to multi-variable risk limits.",
    trl: 5,
    industries: "Investment Banking, Wealth Management, Insurance",
    commercialDevelopers: "JPMorgan Chase, Goldman Sachs, Multiverse Computing",
    governmentProjects: "Singapore MAS Fintech Sandbox, India IFSCA GIFT City Pilots",
    studentResearchOpportunities: "Collaborations with IIT Madras IBM Hub on portfolio optimization algorithms; internships at Multiverse Computing.",
    algorithms: "Quantum Approximate Optimization Algorithm (QAOA), Quantum Annealing"
  },
  {
    name: "Derivative Pricing & Monte Carlo Risk Modeling",
    category: "Finance",
    description: "Using quantum amplitude estimation to evaluate financial derivatives and option prices exponentially faster than classical Monte Carlo methods.",
    trl: 4,
    industries: "Financial Services, Insurance, Risk Audit",
    commercialDevelopers: "Goldman Sachs, IBM Quantum, KPMG Advisory",
    governmentProjects: "UK Finance Innovation Fund, US SEC Analytics Hub",
    studentResearchOpportunities: "Thesis on Option Pricing using Quantum Amplitude Estimation at IISc; research block grants at KPMG.",
    algorithms: "Quantum Amplitude Estimation (QAE), Quantum Random Walk"
  },
  {
    name: "Arbitrage Detection in High-Frequency Trading",
    category: "Finance",
    description: "Identifying complex arbitrage cycle opportunities across global currencies and derivatives markets in near real-time.",
    trl: 4,
    industries: "Hedge Funds, Algorithmic Trading Firms",
    commercialDevelopers: "Proprietary trading desks, D-Wave Systems",
    governmentProjects: "Tokyo Stock Exchange Analytics Sandbox",
    studentResearchOpportunities: "Benchmarking arbitrage cycles on D-Wave Advantage; research collaborations with IIT Bombay Management Hub.",
    algorithms: "Quantum Annealing, Quadratic Unconstrained Binary Optimization (QUBO)"
  },
  {
    name: "Credit Default Prediction & Underwriting Risk",
    category: "Finance",
    description: "Training quantum classifier models to identify high-probability credit defaults from multi-dimensional borrower history.",
    trl: 3,
    industries: "Retail Banking, Credit Rating Agencies, Micro-finance",
    commercialDevelopers: "HSBC, IBM, Classiq Technologies",
    governmentProjects: "SIDBI Startup Credit Risk Sandbox (India)",
    studentResearchOpportunities: "Master's projects on Quantum Support Vector Machines (QSVM) at IIIT Hyderabad.",
    algorithms: "Quantum Support Vector Machine (QSVM), Quantum Neural Networks (QNN)"
  },
  {
    name: "Electrical Grid Load Balancing & Decentralization",
    category: "Optimization & Logistics",
    description: "Solving the unit commitment problem to route energy dynamically across nationwide power grids during peak loads or emergency outages.",
    trl: 4,
    industries: "Power Utilities, Smart Cities, Renewable Energy Providers",
    commercialDevelopers: "GE Power, D-Wave Systems, QpiAI",
    governmentProjects: "National Smart Grid Mission (India), US Department of Energy Grid Modernization",
    studentResearchOpportunities: "FPGA-Quantum interface modeling at C-DAC Pune; internships at GE Power research labs.",
    algorithms: "Quantum Annealing, QAOA"
  },
  {
    name: "Maritime Shipping Container Stowage & Routing",
    category: "Optimization & Logistics",
    description: "Optimizing ship cargo distributions and routing combinations to minimize fuel usage, port delays, and physical container handling.",
    trl: 5,
    industries: "Maritime Logistics, Shipping Lines, Port Authorities",
    commercialDevelopers: "Maersk, Multiverse Computing, Pasqal",
    governmentProjects: "Port of Rotterdam Optimization Initiative, Sagarmala Project (India)",
    studentResearchOpportunities: "Projects on maritime scheduling using Rydberg atom physics at QuEra Computing.",
    algorithms: "Rydberg Atom Maximum Independent Set (MIS), QAOA"
  },
  {
    name: "Airliner Fleet Scheduling & Crew Allocation",
    category: "Optimization & Logistics",
    description: "Optimizing plane rotations and cabin crew scheduling under dynamic weather conditions to prevent flight cancellations.",
    trl: 4,
    industries: "Airlines, Transportation, Travel Platforms",
    commercialDevelopers: "Delta Air Lines, Airbus, IBM Quantum",
    governmentProjects: "EU Single European Sky Initiative",
    studentResearchOpportunities: "Benchmarking crew pairing models at IIT Delhi; internship opportunities at Airbus.",
    algorithms: "QAOA, Quantum Integer Programming"
  },
  {
    name: "Cross-Border Supply Chain Port Bottleneck Solvers",
    category: "Optimization & Logistics",
    description: "Simulating multi-supplier supply networks to calculate optimal shipping paths during geopolitical shipping delays or canal closures.",
    trl: 5,
    industries: "Retail Giants, Manufacturing Supply Chains, Logistics Providers",
    commercialDevelopers: "Walmart, DHL, D-Wave Systems",
    governmentProjects: "US-Canada Joint Logistics Command, India Logistics Hub",
    studentResearchOpportunities: "QUBO optimization thesis with DHL Innovation Hub; research grants at IIT Bombay.",
    algorithms: "QUBO, Quantum Annealing"
  },
  {
    name: "Drug Candidate Small-Molecule Docking",
    category: "Healthcare & Biotech",
    description: "Predicting binding affinity between candidate molecules and target disease proteins to identify viable drug shapes.",
    trl: 4,
    industries: "Pharmaceuticals, Biotechnology, Academic Drug Labs",
    commercialDevelopers: "Boehringer Ingelheim, Tencent Quantum Lab, Classiq",
    governmentProjects: "CSIR Drug Research Institute (India), US NIH Drug Discovery Taskforce",
    studentResearchOpportunities: "Joint molecular docking projects with Tencent Quantum Lab; research at IISc Chemical Sciences.",
    algorithms: "VQE, Quantum Phase Estimation, Quantum Molecular Dynamics"
  },
  {
    name: "Monomer Protein Folding & Structure Prediction",
    category: "Healthcare & Biotech",
    description: "Calculating the 3D folding structure of complex protein chains from their amino acid sequences to isolate disease targets.",
    trl: 3,
    industries: "Pharma R&D, Genomics Research, Vaccine Developers",
    commercialDevelopers: "Biogen, Google Quantum AI, Xanadu",
    governmentProjects: "NQM Biotech Cluster (India), European Molecular Biology Lab",
    studentResearchOpportunities: "Protein folding algorithms projects using PennyLane at IISc; internships at Biogen.",
    algorithms: "Variational Quantum Eigensolver (VQE), Quantum Walk simulations"
  },
  {
    name: "Genetic Sequence Alignment & Variant Assembly",
    category: "Healthcare & Biotech",
    description: "Aligning millions of short DNA read sequences to reference genomes to detect genetic variants and mutations.",
    trl: 3,
    industries: "Genomic Clinics, Personalized Medicine Providers",
    commercialDevelopers: "Illumina, IBM Quantum, D-Wave",
    governmentProjects: "Genome India Project (DST), US Human Genome Reference Program",
    studentResearchOpportunities: "Sequence mapping projects at NCBS Bengaluru; internships at Illumina Genomics Lab.",
    algorithms: "Quantum String Matching, Quantum Annealing"
  },
  {
    name: "Clinical Trial Cohort Matching & Selection",
    category: "Healthcare & Biotech",
    description: "Evaluating patient health histories against strict trial criteria to select the most balanced and optimal cohorts for clinical trials.",
    trl: 4,
    industries: "Clinical Research Organizations, Pharma Companies",
    commercialDevelopers: "Roche, Novartis, Multiverse Computing",
    governmentProjects: "ICMR Clinical Trial Hub (India)",
    studentResearchOpportunities: "Cohort selection optimization research at IIT Kharagpur; research projects with Roche.",
    algorithms: "Quantum-Classical Hybrid Clustering, QAOA"
  },
  {
    name: "Autonomous Driving Lidar Sensor Fusion",
    category: "Machine Learning & AI",
    description: "Accelerating real-time 3D point cloud classification from Lidar inputs to identify road hazards for autonomous vehicles.",
    trl: 3,
    industries: "Automotive, Robotics, Drone Delivery Providers",
    commercialDevelopers: "Tesla, Waymo, NVIDIA Quantum",
    governmentProjects: "US DOT Intelligent Transport Systems, India Automotive Hub",
    studentResearchOpportunities: "Research on Lidar data processing with NVIDIA CUDA-Q at IIT Bombay.",
    algorithms: "Quantum Convolutional Neural Networks (QCNN), QSVM"
  },
  {
    name: "Quantum Generative Adversarial Networks (QGAN) for Fraud Detection",
    category: "Machine Learning & AI",
    description: "Generating highly realistic synthetic transaction data to train robust fraud-detection neural networks in banking.",
    trl: 3,
    industries: "Banking, Credit Card Providers, FinTech startups",
    commercialDevelopers: "HSBC, Rigetti, Multiverse Computing",
    governmentProjects: "EU Horizon Fintech Security Trust",
    studentResearchOpportunities: "QGAN code implementation projects using PennyLane at IIT Madras.",
    algorithms: "Quantum GANs, Quantum Circuit Born Machines (QCBM)"
  },
  {
    name: "Quantum Support Vector Machine (QSVM) for Classification",
    category: "Machine Learning & AI",
    description: "Mapping features into high-dimensional quantum states to classify complex, non-linear data patterns.",
    trl: 4,
    industries: "Image Recognition, Medical Diagnostic Scans, Remote Sensing",
    commercialDevelopers: "IBM Quantum, Classiq, Google AI",
    governmentProjects: "ISRO Satellite Image Classification Projects",
    studentResearchOpportunities: "Satellite image parsing research assistantships at ISRO Space Applications Centre.",
    algorithms: "Quantum Support Vector Machine (QSVM), Quantum Kernel Methods"
  },
  {
    name: "Natural Language Processing for Autonomous Chatbots (QNLP)",
    category: "Machine Learning & AI",
    description: "Representing grammatical structures as quantum circuits to perform high-fidelity semantic parsing and dialogue generation.",
    trl: 2,
    industries: "Customer Support, Intelligent Search Engines, Defense Communications",
    commercialDevelopers: "Quantinuum, British Telecom",
    governmentProjects: "DST Language Translation Mission (India)",
    studentResearchOpportunities: "Thesis on syntactic sentence-to-circuit mapping at Oxford; internships at Quantinuum.",
    algorithms: "Quantum Natural Language Processing (QNLP) Lambek models"
  },
  {
    name: "Climate Modeling & Extreme Weather Forecasting",
    category: "Space & Environment",
    description: "Simulating fluid dynamics and thermal energy changes in the atmosphere to predict hurricane landfall paths and heatwave triggers.",
    trl: 3,
    industries: "Meteorology, Insurance Underwriting, Agriculture",
    commercialDevelopers: "European Centre for Medium-Range Weather Forecasts, Pasqal",
    governmentProjects: "Indian Ministry of Earth Sciences, US NOAA Climate Task Force",
    studentResearchOpportunities: "Weather simulation models using Pasqal Pulser at IISc Climate Center.",
    algorithms: "Quantum Differential Equation Solvers, Tensor Networks"
  },
  {
    name: "Wind Farm Layout Turbine Placement Optimization",
    category: "Space & Environment",
    description: "Calculating optimal locations for wind turbines to maximize energy yield while minimizing wake effects and turbulence.",
    trl: 4,
    industries: "Wind Energy Operators, Infrastructure Funds",
    commercialDevelopers: "Vestas, Iberdrola, D-Wave Systems",
    governmentProjects: "Danish Energy Agency Offshore Wind Pilots",
    studentResearchOpportunities: "Optimizing wake models on D-Wave Advantage with IIT Delhi Energy Studies Dept.",
    algorithms: "Quantum Annealing, QUBO"
  },
  {
    name: "Deep Space Laser Communication Routing",
    category: "Space & Environment",
    description: "Routing signal paths dynamically across deep space satellites, accounting for planetary orbits and solar interference.",
    trl: 5,
    industries: "Satellite Operators, Telecommunications, Space Agencies",
    commercialDevelopers: "SpaceX Starlink, Amazon Project Kuiper, IonQ",
    governmentProjects: "ISRO Space Communication Hub, NASA Deep Space Network",
    studentResearchOpportunities: "Routing simulation project at ISRO Telemetry Network (ISTRAC) Bengaluru.",
    algorithms: "QAOA, Dijkstra's Quantum Algorithm"
  },
  {
    name: "Gravitational Wave Detector Laser Calibration",
    category: "Space & Environment",
    description: "Calibrating interferometer mirror positions using quantum optical squeezed states to detect microscopic gravitational wave ripples.",
    trl: 3,
    industries: "Scientific Research, High-Precision Instrumentation",
    commercialDevelopers: "LIGO Scientific Collaboration, Xanadu",
    governmentProjects: "LIGO-India Project (NQM Supported), NSF LIGO (USA)",
    studentResearchOpportunities: "Laser squeezing research at IUCAA Pune; summer research positions at LIGO.",
    algorithms: "Squeezed State Control, Quantum Feedback Loop Calibration"
  },
  {
    name: "Deep Space Network Antenna Coordination",
    category: "Space & Environment",
    description: "Scheduling antenna availability to align communications with dozens of active interplanetary space missions.",
    trl: 4,
    industries: "Space Exploration, Satellite Operations",
    commercialDevelopers: "Lockheed Martin, D-Wave Systems",
    governmentProjects: "NASA JPL Deep Space Network, ISRO Satellite Command Centre",
    studentResearchOpportunities: "Interplanetary scheduling optimization thesis at IIST Thiruvananthapuram.",
    algorithms: "Quantum Annealing, QUBO scheduling models"
  },
  {
    name: "Debris Orbital Tracking & Collision Prevention",
    category: "Space & Environment",
    description: "Tracking thousands of pieces of space junk and calculating optimal satellite evasion maneuvers in seconds.",
    trl: 4,
    industries: "Space Situational Awareness, Satellite Operators",
    commercialDevelopers: "LeoLabs, Astroscale, Pasqal",
    governmentProjects: "US Space Command, ISRO Project NETRA",
    studentResearchOpportunities: "Orbit routing models under Rydberg atom constraints at IISc Aerospace Hub.",
    algorithms: "Rydberg Atom MIS, QAOA"
  },
  {
    name: "Smart City Traffic Flow Grid Optimization",
    category: "Optimization & Logistics",
    description: "Coordinating traffic light cycles across thousands of smart city junctions to prevent gridlock during rush hours.",
    trl: 5,
    industries: "Urban Infrastructure, Smart Cities, Municipal Traffic Departments",
    commercialDevelopers: "Toyota Tsusho, D-Wave Systems",
    governmentProjects: "Toyota Smart City Pilot (Japan), Bengaluru City Traffic Police Pilot",
    studentResearchOpportunities: "Developing traffic light timing loops on D-Wave annealers at IISc Urban Transport Center.",
    algorithms: "Quantum Annealing, QUBO"
  },
  {
    name: "Water Distribution Pipe Flow Minimization",
    category: "Optimization & Logistics",
    description: "Optimizing pump pressures and valves in underground city water systems to minimize energy draw and prevent pipe bursts.",
    trl: 4,
    industries: "Municipal Water Works, Infrastructure Operators",
    commercialDevelopers: "Veolia, Classiq Technologies",
    governmentProjects: "EU Smart Water Infrastructure Projects",
    studentResearchOpportunities: "Fluid network optimization designs using Classiq at IIT Bombay.",
    algorithms: "Quantum Linear Systems Algorithm (HHL), QAOA"
  },
  {
    name: "Quantum Random Number Generators (QRNG) for Cryptography",
    category: "Security & Cryptography",
    description: "Harvesting quantum hardware vacuum noise to produce truly non-deterministic random numbers for cryptographic keys.",
    trl: 9,
    industries: "Gaming, Cybersecurity, Banking, Hardware Security Modules",
    commercialDevelopers: "QNu Labs, QuintessenceLabs, ID Quantique",
    governmentProjects: "Indian UIDAI Aadhaar Cryptographic Core, US Federal Key Repositories",
    studentResearchOpportunities: "Design of mini-QRNG chips for smartphones at IIT Madras; hardware QA internships at QNu Labs.",
    algorithms: "Quantum Entropy Extraction Protocols"
  },
  {
    name: "Superconducting Qubits Metrology Calibration",
    category: "Metrology & Sensing",
    description: "Using high-precision voltage and magnetic sensors to calibrate microwave control signals for transmon qubits, minimizing error drift.",
    trl: 7,
    industries: "Scientific Calibration, Quantum Hardware Manufacturers",
    commercialDevelopers: "Bluefors, Keysight Technologies, Rigetti",
    governmentProjects: "National Physical Laboratory (NPL India), NIST Metrology standards",
    studentResearchOpportunities: "Metrology internships at CSIR-NPL Delhi; microwave drift modeling projects at TIFR.",
    algorithms: "Bayesian Phase Estimation, Hamiltonian Learning"
  }
];

export default function ApplicationsEncyclopedia() {
  const [activeSubTab, setActiveSubTab] = useState('encyclopedia'); // 'encyclopedia', 'advisory', or 'talent'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Selected application inside split-pane catalog
  const [selectedApp, setSelectedApp] = useState(EXPANDED_APPLICATIONS[0]);
  const [selectedAdvisorySection, setSelectedAdvisorySection] = useState('geopolitics');
  const [selectedRole, setSelectedRole] = useState('cs'); // 'cs', 'physics', 'electrical', 'business'
  const [activeMatrixCell, setActiveMatrixCell] = useState(null);

  // Categories list computed dynamically
  const categories = useMemo(() => {
    const cats = new Set(EXPANDED_APPLICATIONS.map(app => app.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  // Filter application profiles dynamically
  const filteredApps = useMemo(() => {
    return EXPANDED_APPLICATIONS.filter(app => {
      const matchesSearch = 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.industries.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.algorithms.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCat = selectedCategory === 'ALL' || app.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const getTrlBadgeClass = (trl) => {
    if (trl >= 7) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (trl >= 4) return 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  const getTrlDescription = (trl) => {
    const descriptions = {
      1: "Basic principles observed",
      2: "Technology concept formulated",
      3: "Experimental proof of concept",
      4: "Lab validation of technology",
      5: "Validation in relevant environment",
      6: "Subsystem model in relevant environment",
      7: "Prototype demonstration in operational environment",
      8: "Actual system completed and qualified",
      9: "Actual system proven in operational environment"
    };
    return descriptions[trl] || "Development stage";
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
            A-Z Encyclopedia ({EXPANDED_APPLICATIONS.length} profiles)
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
          
          {/* Controls: Search and Category Dropdown */}
          <div className="bg-[#111A28] border border-cyber-border rounded p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96 relative">
              <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
              <input 
                type="text"
                placeholder="Search use case, algorithm, keyword..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-mono text-cyber-muted uppercase whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-[#0B1320] border border-cyber-border rounded py-1.5 px-3 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono w-full md:w-56"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'All Sectors' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Split-Pane Interactive Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: List Catalog */}
            <div className="lg:col-span-1 bg-[#111A28] border border-cyber-border rounded p-4 flex flex-col h-[650px]">
              <div className="border-b border-cyber-border pb-2 mb-3">
                <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block font-bold">
                  Catalog Results ({filteredApps.length})
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredApps.map(app => {
                  const isSelected = selectedApp?.name === app.name;
                  return (
                    <button
                      key={app.name}
                      onClick={() => setSelectedApp(app)}
                      className={`w-full text-left p-3 border font-mono rounded flex flex-col transition-all duration-200 ${
                        isSelected 
                          ? 'bg-cyber-accent/10 border-cyber-accent text-white shadow-[0_0_12px_rgba(0,230,153,0.08)]' 
                          : 'bg-[#0B1320] border-cyber-border/60 text-cyber-muted hover:border-cyber-blue/40'
                      }`}
                    >
                      <span className="text-white text-[11px] font-bold tracking-wide line-clamp-2">
                        {app.name}
                      </span>
                      <span className="text-[9px] text-cyber-blue uppercase mt-1.5 truncate">
                        {app.category}
                      </span>
                      <div className="flex justify-between items-center w-full mt-2 text-[9px]">
                        <span className="text-cyber-muted">TRL {app.trl}</span>
                        <span className={`px-1.5 py-0.2 rounded border ${getTrlBadgeClass(app.trl)}`}>
                          {app.trl >= 7 ? 'Operational' : app.trl >= 4 ? 'Validation' : 'Research'}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {filteredApps.length === 0 && (
                  <div className="text-center text-cyber-muted italic text-xs py-8">
                    No application profiles match the filter criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Standardized Detailed Profile */}
            <div className="lg:col-span-2">
              {selectedApp ? (
                <div className="bg-[#111A28] border border-cyber-blue/40 rounded p-6 space-y-5 h-[650px] overflow-y-auto flex flex-col justify-between shadow-[0_0_20px_rgba(0,163,255,0.02)]">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-cyber-border/80 pb-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest">
                            {selectedApp.category}
                          </span>
                          <h2 className="text-lg font-bold font-mono text-white mt-1 leading-tight">
                            {selectedApp.name}
                          </h2>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className={`text-[10px] font-mono border px-2.5 py-1 rounded font-bold uppercase tracking-wider ${getTrlBadgeClass(selectedApp.trl)}`}>
                            TRL {selectedApp.trl} / 9
                          </span>
                          <span className="text-[9px] text-cyber-muted mt-1 text-right">
                            {getTrlDescription(selectedApp.trl)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Standardized Sections */}
                    <div className="space-y-5 font-mono text-xs">
                      
                      {/* Description */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Compass size={12} className="text-cyber-blue" /> Description
                        </span>
                        <p className="text-white leading-relaxed bg-[#0B1320] border border-cyber-border/30 p-4 rounded font-sans text-xs">
                          {selectedApp.description}
                        </p>
                      </div>

                      {/* Industries */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Briefcase size={12} className="text-cyber-blue" /> Target Industries
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedApp.industries.split(',').map((ind, idx) => (
                            <span key={idx} className="bg-[#0B1320] border border-cyber-border text-white px-2.5 py-1 rounded text-[10px]">
                              {ind.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Commercial Developers */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Cpu size={12} className="text-cyber-blue" /> Commercial Developers
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedApp.commercialDevelopers.split(',').map((dev, idx) => (
                            <span key={idx} className="bg-[#0B1320] border border-cyber-blue/40 text-cyber-accent px-2.5 py-1 rounded text-[10px]">
                              {dev.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Government Projects */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Shield size={12} className="text-cyber-blue" /> Government Projects
                        </span>
                        <p className="text-white leading-relaxed bg-[#0B1320]/60 border border-cyber-border/30 p-3 rounded text-[11px]">
                          {selectedApp.governmentProjects}
                        </p>
                      </div>

                      {/* Student Research Opportunities */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <GraduationCap size={12} className="text-cyber-blue" /> Student Research Opportunities
                        </span>
                        <div className="bg-cyber-accent/5 border border-cyber-accent/25 text-cyber-accent p-3.5 rounded flex gap-2">
                          <GraduationCap size={16} className="flex-shrink-0 mt-0.5" />
                          <p className="leading-relaxed text-[11px] font-sans text-cyber-text">
                            {selectedApp.studentResearchOpportunities}
                          </p>
                        </div>
                      </div>

                      {/* Algorithms */}
                      <div className="space-y-1.5">
                        <span className="text-cyber-muted text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <Code size={12} className="text-cyber-blue" /> Core Algorithms Used
                        </span>
                        <p className="text-cyber-blue bg-[#0B1320] border border-cyber-border/40 p-2.5 rounded font-mono text-[10px]">
                          {selectedApp.algorithms}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="pt-4 border-t border-cyber-border/40 mt-4 text-[9px] text-cyber-muted font-mono leading-tight text-right">
                    Standardized according to Quantum Intelligence Platform v4.0 master specifications.
                  </div>
                </div>
              ) : (
                <div className="bg-[#111A28] border border-cyber-border rounded p-8 text-center text-cyber-muted font-mono text-xs italic py-20">
                  Select an application use case from the left catalog to explore standardized profile details.
                </div>
              )}
            </div>

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
                      ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_10px_rgba(0,163,255,0.15)]'
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
                  <p className="text-cyber-muted font-sans text-xs leading-relaxed">
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
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Quantum algorithm testing, cloud QPU access coordinates, and algorithm benchmarks.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">C-DAC Pune / Bengaluru</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Quantum simulator (QSim) software optimization, SDK development, and compiler platforms.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'physics' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IISc Bengaluru</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Superconducting transmon fabrication, quantum sensing, and diamond defect laboratories.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">TIFR Mumbai</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Cryogenic microwave controls, transmon testing, and coherence modeling.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'electrical' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Bombay (QSEC)</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Silicon spin-qubit microelectronics, CMOS packaging, and integrated quantum photonics.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Delhi</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: QKD hardware transceivers, photon detectors, and fiber optic packaging.</div>
                      </div>
                    </>
                  )}
                  {selectedRole === 'business' && (
                    <>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IIT Madras (DoMS) & IIMs</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Joint research briefs on technology commercialization and quantum asset scoping.</div>
                      </div>
                      <div className="border border-cyber-border/60 bg-[#0B1320] rounded p-3 hover:border-cyber-blue/30 transition-colors">
                        <div className="text-white font-bold">IISc Management Studies</div>
                        <div className="text-cyber-muted text-[10px] mt-1 font-sans">Focus: Technology transfer and intellectual property management in sovereign labs.</div>
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
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Build a Variational Quantum Eigensolver circuit in Qiskit to calculate the ground-state energy of a hydrogen molecule (H2).</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Post-Quantum SSL Socket</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Implement a custom Python socket server utilizing NIST Kyber key encapsulation algorithms to encrypt classical communication lines.</p>
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
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Develop a Python simulation mapping physical environmental noise impact on a superconducting transmon qubit over microsecond windows.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Neutral Atom Tweezers Map</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Model laser-field potential arrays mathematically to compute the optical tweezer spacing for zero cross-talk Rydberg states.</p>
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
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Create a finite-element thermal simulation tracking heat dissipation in CMOS control units operating inside a dilution refrigerator at 1 Kelvin.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Optical Laser Alignment calibration</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Advanced</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Program a closed-loop FPGA signal calibration model to align photon polarization angles automatically in physical fiber optic channels.</p>
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
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Construct a risk assessment database template cataloging all legacy cryptographic assets, detailing threat timelines for Shor's decryption.</p>
                      </div>
                      <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold">Quantum Supply Chain Vulnerability Brief</span>
                          <span className="text-[9px] bg-cyber-accent/15 text-cyber-accent px-1.5 rounded">Intermediate</span>
                        </div>
                        <p className="text-[10px] text-cyber-muted leading-normal font-sans">Compile a consulting intelligence brief mapping Helium-3 and high-coaxial cable export controls and how to secure backup packaging loops.</p>
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
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Master complex vectors, Hilbert spaces, tensor products, and unitary matrices.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Qiskit Developer Track</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Complete the official IBM Qiskit developer curriculum and circuit design guides.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: SDK Contributions</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Contribute to open-source compilations on GitHub (Qiskit, TKET, or Cirq repositories).</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'physics' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Software Engineering Patterns</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Learn professional Python development (OOP, clean design patterns, unit testing frameworks).</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Lab Signal Control Basics</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Gain hands-on skills with microwave pulse generation and digital oscilloscope controls.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: NQM Fellowship application</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Apply for DST-sponsored National Quantum Mission research fellowships at IISc or TIFR hubs.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'electrical' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Cryo-CMOS & Low-Temp Physics</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Study semiconductor device behaviors under extreme 10mK dilution refrigerator environments.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: VLSI custom ASIC Design</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Specialize in custom RF circuit routing and layout optimization using Verilog/ASIC tools.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: Startup Hardware Partnership</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Collaborate with Indian hardware startups (QNu Labs, QpiAI) on custom spin-qubit transceivers.</p>
                      </div>
                    </>
                  )}
                  {selectedRole === 'business' && (
                    <>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-accent" />
                        <div className="text-white font-bold">STEP 1: Business Scoping & Tech Scopes</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Read McKinsey/KPMG whitepapers to map commercial deployment windows (2025-2030).</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-blue" />
                        <div className="text-white font-bold">STEP 2: Learn Quantum Taxonomy</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Understand core technical differences between quantum annealing, gate QPUs, and logical scaling metrics.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-cyber-bg bg-cyber-muted" />
                        <div className="text-white font-bold">STEP 3: Strategic PQC advisory</div>
                        <p className="text-[10px] text-cyber-muted mt-0.5 font-sans">Consult with organizations to transition databases to post-quantum cryptography prior to decryption threats.</p>
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
