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
  Award,
  BookOpen,
  Briefcase,
  Activity
} from 'lucide-react';

// Complete high-fidelity comparative dataset for 12 sovereign nations
export const SOVEREIGN_COMPARISON_DATA = [
  {
    id: "india",
    country: "India",
    flag: "🇮🇳",
    fundingUSD: 0.73, // Billion USD (INR 6,003 Crore)
    fundingDetails: "$0.73B (₹6,003 Cr) allocated under the National Quantum Mission (NQM) (2023 - 2031).",
    policy: "National Quantum Mission (NQM) (2023-2031) targeting hardware, quantum security, sensors, and materials.",
    activeStartups: "QNu Labs, QpiAI, BosonQ Psi, QuanElan",
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
      { name: "IIT Bombay (QSEC)", city: "Mumbai", role: "Silicon integrated photonic chips & quantum sensing" }
    ],
    techFocus: [
      "Superconducting Transmons",
      "Post-Quantum Cryptography (PQC)",
      "Satellite & Fiber QKD Networks",
      "Quantum Sensors for Defense"
    ],
    bottlenecks: [
      "No domestic cryogenic Helium-3 purification or supply chain.",
      "Lack of advanced semiconductor fabs (dependent on foreign foundries).",
      "Extreme reliance on imported dilution refrigerators (e.g., Bluefors, Oxford Instruments)."
    ],
    strategicPriority: "Sovereign autonomy in critical infrastructure security & military-grade quantum communication.",
    readinessScore: 65
  },
  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    fundingUSD: 6.8, 
    fundingDetails: "$1.8B National Quantum Initiative (NQI) Act (federal) + estimated $5.0B+ in corporate enterprise R&D & VC.",
    policy: "National Quantum Initiative (NQI) Act, National Defense Authorization Act (NDAA) quantum provisions.",
    activeStartups: "Rigetti Computing, IonQ, PsiQuantum, Infleqtion, Atom Computing",
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
      { name: "Chicago Quantum Exchange", city: "Chicago, IL", role: "Multi-university testbed & regional quantum fiber loop" }
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
    fundingUSD: 10.0,
    fundingDetails: "Estimated $10.0B+ state-directed strategic funding, centralizing resources through national labs.",
    policy: "14th Five-Year Plan focusing on satellite QKD, photonics and superconducting chips.",
    activeStartups: "Origin Quantum, QuantumCTek, SpinQ Technology, TuringQ",
    qubitRange: "66 - 176+ Qubits",
    qubitMin: 66,
    qubitMax: 176,
    qubitDetails: "176-detected photon GBS prototype (Jiuzhang 3.0) and 66-qubit superconducting QPUs (Zu Chongzhi 2.1).",
    workforce: "9,000+ Researchers",
    workforceSize: 9000,
    workforceDetails: "State-channelled academic pipelines directing thousands of scholars into quantum communication and hardware labs.",
    hubs: [
      { name: "Hefei National Laboratory", city: "Hefei", role: "Central strategic research node, transmon fabs & photonic testing" },
      { name: "USTC Quantum Center", city: "Hefei", role: "Micius satellite laser terminal & Jiuzhang photonic design" }
    ],
    techFocus: [
      "Photonic Quantum Computing",
      "Satellite-to-Ground QKD Links",
      "Superconducting Qubits",
      "Nationwide Fiber Cryptography Grids"
    ],
    bottlenecks: [
      "Blocked from importing advanced EUV lithography machines due to international export controls.",
      "High reliance on US-designed Electronic Design Automation (EDA) software.",
      "Vulnerability to high-frequency coaxial cables and RF electronics import bans."
    ],
    strategicPriority: "Unbreakable nation-scale cryptographic communication, space-based QKD networks, and photonic simulation.",
    readinessScore: 92
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    fundingUSD: 3.5,
    fundingDetails: "£2.5B ($3.5B USD) allocated under the UK National Quantum Strategy (2024 - 2034).",
    policy: "UK National Quantum Strategy (2024-2034) aiming for a quantum-enabled economy.",
    activeStartups: "Oxford Quantum Circuits (OQC), Quantum Motion, Orca Computing, Phasecraft",
    qubitRange: "32 - 100 Qubits",
    qubitMin: 32,
    qubitMax: 100,
    qubitDetails: "Quantinuum's trapped-ion processors (H-Series) and Oxford Quantum Circuits' superconducting QPUs.",
    workforce: "4,000+ Researchers",
    workforceSize: 4000,
    workforceDetails: "Highly concentrated hubs of excellence fueled by the UK National Quantum Technologies Programme.",
    hubs: [
      { name: "National Quantum Computing Centre", city: "Harwell", role: "National testbed hosting multiple physical hardware configurations" },
      { name: "Oxford University Quantum Hub", city: "Oxford", role: "Ion-trap computing, high-precision atomic clocks, and spin research" }
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
    id: "germany",
    country: "Germany",
    flag: "🇩🇪",
    fundingUSD: 2.2,
    fundingDetails: "€2.0B ($2.2B USD) state funding under 'Quantum Technologies - From Scientific Foundations to Market'.",
    policy: "Federal Program 'Quantum Technologies - From Scientific Foundations to Market' for commercial hardware translation.",
    activeStartups: "eleQtron, planqc, kiutra, HQS Quantum Simulations",
    qubitRange: "20 - 100 Qubits",
    qubitMin: 20,
    qubitMax: 100,
    qubitDetails: "Neutral-atom quantum computing development and superconducting research lines in Jülich.",
    workforce: "3,500+ Researchers",
    workforceSize: 3500,
    workforceDetails: "Dense academic networks integrated with Max Planck and Fraunhofer institutes.",
    hubs: [
      { name: "Munich Quantum Valley", city: "Munich", role: "Neutral atom arrays, superconducting hardware, and computing simulators" },
      { name: "Forschungszentrum Jülich", city: "Jülich", role: "Superconducting hardware integration with European supercomputers" }
    ],
    techFocus: [
      "Neutral Atom Simulators",
      "Superconducting QPUs",
      "Quantum Simulators",
      "Quantum Sensors for Industry"
    ],
    bottlenecks: [
      "Slower commercial spin-out velocity from academic institutions compared to US.",
      "Dependence on global component suppliers for laser control sub-modules."
    ],
    strategicPriority: "Industrial engineering integration, sovereign industrial sensors, and neutral-atom processing.",
    readinessScore: 84
  },
  {
    id: "france",
    country: "France",
    flag: "🇫🇷",
    fundingUSD: 2.0,
    fundingDetails: "€1.8B ($2.0B USD) French National Quantum Strategy.",
    policy: "French National Quantum Strategy targeting hybrid computing, startups, and research fellowships.",
    activeStartups: "Pasqal, Alice & Bob, Quandela, C12 Quantum Electronics",
    qubitRange: "50 - 256 Qubits",
    qubitMin: 50,
    qubitMax: 256,
    qubitDetails: "Pasqal's 256-atom neutral atom simulator and Quandela's photonic systems.",
    workforce: "3,200+ Researchers",
    workforceSize: 3200,
    workforceDetails: "Top-tier physics talent from CNRS and leading universities.",
    hubs: [
      { name: "CEA-Leti & CEA-Saclay", city: "Grenoble", role: "Cryogenic silicon spin engineering and industrial microelectronics" },
      { name: "Institut d'Optique", city: "Palaiseau", role: "Neutral atom physics and lasers for quantum manipulation" }
    ],
    techFocus: [
      "Neutral Atoms",
      "Photonic Simulators",
      "Cat Qubits (Alice & Bob)",
      "Cryogenic Component Design"
    ],
    bottlenecks: [
      "Vulnerability to US-dominated cloud access platforms for distributing French processor availability.",
      "Venture capital scale lags behind US and UK markets."
    ],
    strategicPriority: "Sovereign quantum processors, high-performance hybrid supercomputers, and photonic networks.",
    readinessScore: 85
  },
  {
    id: "netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    fundingUSD: 0.65,
    fundingDetails: "€615M ($0.65B USD) allocated via Quantum Delta NL.",
    policy: "Quantum Delta NL National Agenda, creating a unified Dutch quantum cluster across 5 core hubs.",
    activeStartups: "Orange Quantum Systems, QuiX Quantum, QphoX, QuantWare",
    qubitRange: "10 - 50 Qubits",
    qubitMin: 10,
    qubitMax: 50,
    qubitDetails: "Silicon spin qubits at QuTech and QuiX Quantum's photonic processors.",
    workforce: "1,500+ Researchers",
    workforceSize: 1500,
    workforceDetails: "World-leading talent at TU Delft and Eindhoven University.",
    hubs: [
      { name: "QuTech at TU Delft", city: "Delft", role: "Silicon spin qubits, topological materials, and quantum internet nodes" },
      { name: "University of Twente", city: "Enschede", role: "Silicon photonics and quantum optics research" }
    ],
    techFocus: [
      "Silicon Spin Qubits",
      "Photonic Computing",
      "Quantum Internet",
      "Microwave-to-Optical Converters"
    ],
    bottlenecks: [
      "High competition for talent with larger neighboring European nations.",
      "Sovereign reliance on global packaging and foundry operations."
    ],
    strategicPriority: "Pioneering the quantum internet, high-fidelity silicon spin scaling, and supply chain toolkits.",
    readinessScore: 80
  },
  {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    fundingUSD: 1.8,
    fundingDetails: "Estimated $1.8B USD government and industrial consortium funding.",
    policy: "Vision for Quantum Technology Innovation, establishing R&D centers and national quantum computing hubs.",
    activeStartups: "QunaSys, Jij, blueqat, LQUOM",
    qubitRange: "50 - 100 Qubits",
    qubitMin: 50,
    qubitMax: 100,
    qubitDetails: "Superconducting quantum processors developed by RIKEN and Fujitsu.",
    workforce: "3,000+ Researchers",
    workforceSize: 3000,
    workforceDetails: "Strong engineering and materials science workforce across corporate research arms.",
    hubs: [
      { name: "RIKEN Center for Quantum Computing", city: "Wako", role: "Superconducting processors and hybrid systems" },
      { name: "Tokyo University Quantum Hub", city: "Tokyo", role: "IBM Quantum Hub and algorithm design" }
    ],
    techFocus: [
      "Superconducting QPUs",
      "Quantum Chemistry Software",
      "Laser Modulation Technology",
      "Quantum Material Science"
    ],
    bottlenecks: [
      "Slower adoption rate of quantum startups compared to corporate groups.",
      "Heavy reliance on imported components for microwave generator control lines."
    ],
    strategicPriority: "Hardware-software co-design for industrial chemistry, semiconductor manufacturing, and superconducting systems.",
    readinessScore: 86
  },
  {
    id: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    fundingUSD: 0.27,
    fundingDetails: "SGD 360M+ ($0.27B USD) via the National Research Foundation (NRF) and National Quantum Strategy.",
    policy: "Singapore National Quantum Strategy (NQS) supporting CQT, local industry, and financial sector readiness.",
    activeStartups: "Horizon Quantum Computing, SpeQtral, Entropica Labs",
    qubitRange: "5 - 20 Qubits",
    qubitMin: 5,
    qubitMax: 20,
    qubitDetails: "Small-scale optical and silicon dot testing beds at university research centers.",
    workforce: "800+ Researchers",
    workforceSize: 800,
    workforceDetails: "Highly specialized and dense talent pool concentrated around the Centre for Quantum Technologies.",
    hubs: [
      { name: "Centre for Quantum Technologies (CQT)", city: "Singapore", role: "Space-based QKD nano-satellites, optical qubits & materials" },
      { name: "A*STAR Quantum Labs", city: "Singapore", role: "Quantum algorithms for finance, chemistry simulations & sensors" }
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
    readinessScore: 75
  },
  {
    id: "canada",
    country: "Canada",
    flag: "🇨🇦",
    fundingUSD: 0.36,
    fundingDetails: "CAD 360M ($0.36B USD) allocated under Canada's National Quantum Strategy.",
    policy: "Canada National Quantum Strategy focusing on computing, communications, and sensor commercialization.",
    activeStartups: "D-Wave Systems, Xanadu, Photonic Inc, Nord Quantique",
    qubitRange: "100 - 5,000+ Qubits",
    qubitMin: 100,
    qubitMax: 5000,
    qubitDetails: "Xanadu's photonic processors and D-Wave's 5,000+ qubit quantum annealers.",
    workforce: "2,500+ Researchers",
    workforceSize: 2500,
    workforceDetails: "Pioneering hubs in Vancouver, Waterloo, and Sherbrooke supporting dynamic startups.",
    hubs: [
      { name: "Institute for Quantum Computing (IQC)", city: "Waterloo", role: "Quantum optics, security protocols, spin systems, and cryptography" },
      { name: "Sherbrooke Quantum Institute", city: "Sherbrooke", role: "Superconducting hardware and microelectronics" }
    ],
    techFocus: [
      "Photonic Quantum Processors",
      "Quantum Annealers",
      "Quantum Software (PennyLane)",
      "Silicon spin interfaces"
    ],
    bottlenecks: [
      "High rate of talent migration to high-paying tech centers in the US.",
      "Scaling startup funding beyond early venture rounds."
    ],
    strategicPriority: "Leading in photonic cloud platforms, quantum annealing software, and next-generation spin technologies.",
    readinessScore: 87
  },
  {
    id: "israel",
    country: "Israel",
    flag: "🇮🇱",
    fundingUSD: 0.4,
    fundingDetails: "ILS 1.25B ($0.4B USD) National Quantum Initiative budget.",
    policy: "Israel National Quantum Initiative funded by the Innovation Authority and Defense Ministry for defense and industrial compute.",
    activeStartups: "Quantum Machines, Classiq, Quantum Source, Kedma",
    qubitRange: "10 - 50 Qubits",
    qubitMin: 10,
    qubitMax: 50,
    qubitDetails: "Quantum Machines' OPX control systems and Quantum Source photonic setups.",
    workforce: "1,200+ Researchers",
    workforceSize: 1200,
    workforceDetails: "Intense startup focus, deeply integrated academic-defense pipeline.",
    hubs: [
      { name: "Weizmann Institute of Science", city: "Rehovot", role: "Trapped ion and semiconductor quantum dots research" },
      { name: "Technion Quantum Center", city: "Haifa", role: "Quantum sensors and solid-state physics breakthroughs" }
    ],
    techFocus: [
      "Quantum Control Hardware (QM)",
      "Quantum Software Design (Classiq)",
      "Photonic hardware",
      "Quantum Key Distribution (QKD)"
    ],
    bottlenecks: [
      "Limited local foundry capacities for custom semiconductor chips.",
      "High concentration of resources in software rather than heavy hardware infrastructure."
    ],
    strategicPriority: "Dominating the global quantum control orchestration market, and securing defense cryptography.",
    readinessScore: 83
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    fundingUSD: 0.6,
    fundingDetails: "Estimated $0.6B USD state and national strategy investments.",
    policy: "Australian National Quantum Strategy led by Chief Scientist to build a thriving industry.",
    activeStartups: "Silicon Quantum Computing, Diraq, Q-Ctrl, QuintessenceLabs",
    qubitRange: "10 - 60 Qubits",
    qubitMin: 10,
    qubitMax: 60,
    qubitDetails: "Silicon spin qubits and high-precision quantum control software.",
    workforce: "1,800+ Researchers",
    workforceSize: 1800,
    workforceDetails: "Pioneering hubs centered around UNSW, University of Sydney, and Melbourne.",
    hubs: [
      { name: "Sydney Quantum Academy", city: "Sydney", role: "Joint training and research platform across 4 universities" },
      { name: "UNSW Quantum Lab", city: "Sydney", role: "Silicon spin qubit fabrication and nanoscale engineering" }
    ],
    techFocus: [
      "Silicon Spin Qubits",
      "Quantum Control Software (Q-Ctrl)",
      "Atom-scale fabrication",
      "Quantum Sensing"
    ],
    bottlenecks: [
      "Geographic isolation from European and North American supply hubs.",
      "Reliance on overseas investment for large scale commercialization."
    ],
    strategicPriority: "World-class leadership in high-fidelity silicon spin qubits and industrial quantum control software.",
    readinessScore: 81
  },
  {
    id: "southkorea",
    country: "South Korea",
    flag: "🇰🇷",
    fundingUSD: 2.4,
    fundingDetails: "Projected $2.4B USD strategy combining state subsidies with corporate semiconductor investments.",
    policy: "Ministry of Science & ICT Quantum Strategy, driving packaging and telecom security.",
    activeStartups: "SDT, local security ventures",
    qubitRange: "10 - 20 Qubits",
    qubitMin: 10,
    qubitMax: 20,
    qubitDetails: "Trapped ion hardware systems and high-precision electronic switches.",
    workforce: "2,200+ Researchers",
    workforceSize: 2200,
    workforceDetails: "Highly skilled microelectronics and telecom workforce.",
    hubs: [
      { name: "KIST Quantum Hub", city: "Seoul", role: "Trapped ion hardware fabrication and security links" },
      { name: "SKKU Quantum Foundry", city: "Suwon", role: "Superconducting material properties and device fabrication" }
    ],
    techFocus: [
      "Trapped Ion QPU",
      "Secure Fiber Relays",
      "Quantum Key Distribution (QKD)",
      "Cryo-CMOS Circuits"
    ],
    bottlenecks: [
      "No domestic manufacturer of custom optical laser hardware.",
      "High reliance on US software algorithms protocols."
    ],
    strategicPriority: "Securing national databases and telecom networks via sovereign hardware.",
    readinessScore: 78
  },
  {
    id: "finland",
    country: "Finland",
    flag: "🇫🇮",
    fundingUSD: 0.15,
    fundingDetails: "Estimated $150M USD funding allocated under state computing initiatives and IQM subsidies.",
    policy: "VTT Technical Research Center hardware rollout for national quantum deployment.",
    activeStartups: "IQM Quantum Computers, Bluefors Cryogenics",
    qubitRange: "5 - 50 Qubits",
    qubitMin: 5,
    qubitMax: 50,
    qubitDetails: "Superconducting transmons and cryogenic dilution refrigerators.",
    workforce: "1,100+ Researchers",
    workforceSize: 1100,
    workforceDetails: "Concentrated talent pool at Aalto University and VTT.",
    hubs: [
      { name: "IQM Espoo Core", city: "Espoo", role: "Superconducting hardware fabrication and cryogenic cables" },
      { name: "Aalto University Lab", city: "Helsinki", role: "Nanotechnology, superconducting qubits, and microwave controls" }
    ],
    techFocus: [
      "Superconducting QPUs",
      "Cryogenic Cable Design",
      "Dilution Refrigerators (Bluefors)",
      "High-Fidelity Metrology"
    ],
    bottlenecks: [
      "Venture capital scale lags behind US and UK markets.",
      "Talent drain to larger neighboring European hubs."
    ],
    strategicPriority: "Dominating the global cryogenic refrigerator and European superconducting research chip supply chains.",
    readinessScore: 84
  },
  {
    id: "russia",
    country: "Russia",
    flag: "🇷🇺",
    fundingUSD: 0.35,
    fundingDetails: "$350M+ funding run through Rosatom and Russian Quantum Center.",
    policy: "Sovereign Strategic program for autonomous quantum technologies.",
    activeStartups: "Russian Quantum Center (RQC)",
    qubitRange: "8 - 16 Qubits",
    qubitMin: 8,
    qubitMax: 16,
    qubitDetails: "Basic superconducting transmon QPUs.",
    workforce: "1,400+ Researchers",
    workforceSize: 1400,
    workforceDetails: "Strong theoretical physics foundations in Moscow State and MIPT.",
    hubs: [
      { name: "Skoltech Quantum Command", city: "Moscow", role: "Superconducting chip design and microwave lines" },
      { name: "MIPT Research Lab", city: "Dolgoprudny", role: "Sovereign quantum algorithms and cryptography protocols" }
    ],
    techFocus: [
      "Superconducting Qubits",
      "Microwave Calibration",
      "Quantum Cryptography",
      "Algorithm Modeling"
    ],
    bottlenecks: [
      "Severe international export controls blocking standard Bluefors fridges.",
      "High brain drain of senior researchers to European and US labs."
    ],
    strategicPriority: "Sovereign computing and crypto self-reliance to bypass global technology channels.",
    readinessScore: 68
  },
  {
    id: "denmark",
    country: "Denmark",
    flag: "🇩🇰",
    fundingUSD: 0.22,
    fundingDetails: "Estimated $220M USD allocated by Novo Nordisk Foundation and government initiatives.",
    policy: "Novo Nordisk Foundation Quantum Computing Programme to build fault-tolerant hardware.",
    activeStartups: "Boutique quantum tech and biotech developers",
    qubitRange: "5 - 12 Qubits",
    qubitMin: 5,
    qubitMax: 12,
    qubitDetails: "Small-scale experimental traps and semiconductor interface links.",
    workforce: "900+ Researchers",
    workforceSize: 900,
    workforceDetails: "Top-tier Niels Bohr Institute quantum physics academics.",
    hubs: [
      { name: "Niels Bohr Institute", city: "Copenhagen", role: "Fault-tolerant qubits research and quantum chemistry modeling" }
    ],
    techFocus: [
      "Fault-Tolerant Computing",
      "Quantum Chemistry",
      "Biotech & Life Sciences",
      "Optical Interfaces"
    ],
    bottlenecks: [
      "Lacks local cleanroom packaging foundries of industrial scale.",
      "Limited private VC capital compared to London or Paris."
    ],
    strategicPriority: "Leading in quantum chemistry applications for pharmaceuticals and biotech research.",
    readinessScore: 79
  },
  {
    id: "austria",
    country: "Austria",
    flag: "🇦🇹",
    fundingUSD: 0.12,
    fundingDetails: "Estimated $120M USD funding, including Austrian Quantum Alliance grants.",
    policy: "Austrian Quantum Alliance research program to support academic laboratories.",
    activeStartups: "Laser components and optical providers",
    qubitRange: "10 - 24 Qubits",
    qubitMin: 10,
    qubitMax: 24,
    qubitDetails: "High-precision trapped-ion hardware setups in Innsbruck.",
    workforce: "850+ Researchers",
    workforceSize: 850,
    workforceDetails: "Dense concentrations of laser physics and quantum optics PhDs.",
    hubs: [
      { name: "Innsbruck Quantum Hub", city: "Innsbruck", role: "Laser trapped ion physics and photonic quantum networking" },
      { name: "Vienna Center for Quantum Science", city: "Vienna", role: "Entangled photonics and fundamental optomechanical studies" }
    ],
    techFocus: [
      "Laser Ion Traps",
      "Photonic Entanglement",
      "Quantum Optics",
      "Precision Metrology"
    ],
    bottlenecks: [
      "Highly academic focus with limited commercial startup velocity.",
      "No local semiconductor packaging foundries."
    ],
    strategicPriority: "Leading high-precision optomechanical devices and entangled photonic networks.",
    readinessScore: 77
  },
  {
    id: "switzerland",
    country: "Switzerland",
    flag: "🇨🇭",
    fundingUSD: 0.15,
    fundingDetails: "Estimated $150M USD funding via Swiss National Science Foundation.",
    policy: "Swiss Quantum Initiative supporting academic excellence and industrial packaging.",
    activeStartups: "Nanoscale sensing and cryo-CMOS firms",
    qubitRange: "5 - 20 Qubits",
    qubitMin: 5,
    qubitMax: 20,
    qubitDetails: "Silicon spin qubit testing and advanced cryo-electronics.",
    workforce: "1,200+ Researchers",
    workforceSize: 1200,
    workforceDetails: "Highly skilled engineering talent at ETH Zurich and EPFL.",
    hubs: [
      { name: "ETH Zurich Quantum Lab", city: "Zurich", role: "Cryogenic control electronics and silicon spin interfaces" },
      { name: "EPFL Lausanne Hub", city: "Lausanne", role: "Quantum algorithms for finance and solid-state devices" }
    ],
    techFocus: [
      "Silicon Spin Qubits",
      "Cryo-CMOS Chips",
      "Advanced Microwave Control",
      "Nanoscale Sensors"
    ],
    bottlenecks: [
      "Immigration caps restricting high-level foreign software talent.",
      "Scaling hardware foundries beyond academic cleanrooms."
    ],
    strategicPriority: "Unlocking advanced control systems via cryo-CMOS and leading silicon spin research.",
    readinessScore: 82
  }
];

export default function SovereignComparison({ articles = [] }) {
  const sovereignData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return SOVEREIGN_COMPARISON_DATA.map(nation => {
      // Calculate dynamic news mentions
      const mentions = (articles || []).filter(art => {
        const text = `${art.headline || ''} ${art.summary || ''}`.toLowerCase();
        const countryName = nation.country.toLowerCase();
        if (text.includes(countryName)) return true;
        // Check common nicknames
        if (nation.id === 'usa' && (text.includes('usa') || text.includes('united states') || text.includes('america') || text.includes('ibm') || text.includes('google'))) return true;
        if (nation.id === 'uk' && (text.includes('uk') || text.includes('united kingdom') || text.includes('britain') || text.includes('quantinuum'))) return true;
        if (nation.id === 'india' && (text.includes('qpiai') || text.includes('nqm') || text.includes('tifr') || text.includes('qnu'))) return true;
        return false;
      }).length;

      let updated = { ...nation, newsMentions: mentions };

      if (nation.id === 'india' && overrides.indiaQubits) {
        updated = {
          ...updated,
          qubitRange: `${overrides.indiaQubits} Qubits (Live Upgrade)`,
          qubitMax: overrides.indiaQubits,
          qubitDetails: `Auto-updated via news wire: QpiAI India announced a successful ${overrides.indiaQubits}-qubit processing benchmark.`
        };
      }
      return updated;
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

  // Compute Cockpit HUD Metrics using dynamic data
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
        n.policy.toLowerCase().includes(query) ||
        n.activeStartups.toLowerCase().includes(query) ||
        n.techFocus.some(f => f.toLowerCase().includes(query)) ||
        n.hubs.some(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, sovereignData]);

  // Checkbox toggle for charts overlay
  const handleChartToggle = useCallback((id) => {
    setSelectedForCharts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Max funding / qubit limits for CSS charts scaling
  const maxFundingVal = useMemo(() => {
    const activeValues = sovereignData.filter(n => selectedForCharts[n.id]).map(n => n.fundingUSD);
    return Math.max(...activeValues, 1);
  }, [selectedForCharts, sovereignData]);

  const maxQubitVal = useMemo(() => {
    const activeValues = sovereignData.filter(n => selectedForCharts[n.id]).map(n => n.qubitMax);
    return Math.max(...activeValues, 1);
  }, [selectedForCharts, sovereignData]);

  return (
    <div className="space-y-6">
      
      {/* Cockpit HUD Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111A28]/25 p-4 rounded border border-cyber-border/40 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyber-accent rounded-full animate-ping"></span>
            <span className="font-mono text-[10px] text-cyber-accent uppercase tracking-widest">Sovereign Intel Stream Active</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase mt-1">
            Sovereign Cockpit & Competitive Matrix
          </h1>
          <p className="text-sm text-cyber-muted mt-0.5 font-sans">
            Cross-border comparative analysis of national funding, qubit milestones, research hubs, startups, policies and news telemetry.
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
            Logged across {sovereignData.length} sovereign countries.
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
            Max physical qubits logged.
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
            Quantum engineers & researchers.
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
              placeholder="Search sovereign policies, startups, hubs, or core technologies..."
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
                    <th className="p-4 font-bold">Nation</th>
                    <th className="p-4 font-bold">Budget & Policy</th>
                    <th className="p-4 font-bold">Qubit Capacity</th>
                    <th className="p-4 font-bold">Active Startups</th>
                    <th className="p-4 font-bold">Workforce</th>
                    <th className="p-4 font-bold text-center">News Mentions</th>
                    <th className="p-4 font-bold text-center">Readiness</th>
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
                      {/* Flag and Country */}
                      <td className="p-4 font-bold flex items-center gap-2.5">
                        <span className="text-lg leading-none">{nation.flag}</span>
                        <div>
                          <span>{nation.country}</span>
                          <span className="text-[9px] text-cyber-muted block font-normal normal-case">
                            Priority: {nation.strategicPriority.slice(0, 35)}...
                          </span>
                        </div>
                      </td>

                      {/* Budget and Policy */}
                      <td className="p-4">
                        <div className="font-bold text-cyber-accent">
                          ${nation.fundingUSD} Billion
                        </div>
                        <span className="text-[9px] text-cyber-muted block mt-0.5 max-w-[200px] truncate" title={nation.policy}>
                          {nation.policy}
                        </span>
                      </td>

                      {/* Qubit capacity */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <Cpu size={12} className="text-cyber-blue" />
                          <span className="font-bold text-cyber-blue">{nation.qubitRange}</span>
                        </div>
                        <span className="text-[9px] text-cyber-muted block mt-0.5 max-w-[140px] truncate">
                          {nation.qubitDetails}
                        </span>
                      </td>

                      {/* Active Startups */}
                      <td className="p-4">
                        <div className="max-w-[180px] truncate" title={nation.activeStartups}>
                          {nation.activeStartups}
                        </div>
                      </td>

                      {/* Workforce */}
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users size={12} className="text-white" />
                          <span>{nation.workforce}</span>
                        </div>
                      </td>

                      {/* News Mentions */}
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue rounded text-[10px]">
                          <Activity size={10} className="animate-pulse" />
                          <span>{nation.newsMentions} Mentions</span>
                        </div>
                      </td>

                      {/* Readiness Score */}
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
                      <td colSpan="7" className="p-8 text-center text-cyber-muted">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
                
                {/* Left Col: Core Stats */}
                <div className="space-y-4 lg:col-span-1">
                  <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block">
                    Infrastructure Metrics
                  </span>

                  {/* Budget & Policy */}
                  <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-cyber-accent border-b border-cyber-border/40 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Budget & Policy</span>
                      <TrendingUp size={14} />
                    </div>
                    <div className="text-xl font-bold font-mono text-white">
                      ${currentNationData.fundingUSD} Billion
                    </div>
                    <p className="text-xs text-cyber-muted leading-relaxed">
                      <strong>Policy:</strong> {currentNationData.policy}
                    </p>
                    <p className="text-[11px] text-cyber-text leading-relaxed">
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
                </div>

                {/* Mid Col: Tech Focus, Startups and Hubs */}
                <div className="space-y-4 lg:col-span-1">
                  {/* Startups */}
                  <div className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-white border-b border-cyber-border/40 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Active Startups</span>
                      <Briefcase size={14} className="text-cyber-accent" />
                    </div>
                    <p className="text-xs text-cyber-muted font-sans">
                      Key commercial ecosystem players driving research:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentNationData.activeStartups.split(',').map((st, idx) => (
                        <span key={idx} className="bg-[#111A28] border border-cyber-border text-white text-[10px] px-2 py-0.5 rounded font-mono">
                          {st.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

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
                </div>

                {/* Right Col: Supply Chain Bottlenecks & News Telemetry */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Supply Chain */}
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2 text-amber-500">
                      <AlertTriangle size={18} />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        Strategic Supply Chain Risks
                      </span>
                    </div>
                    <div className="space-y-2">
                      {currentNationData.bottlenecks.map((bot, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-2 text-xs text-cyber-muted bg-[#0B1320]/60 border border-cyber-border/40 p-2 rounded"
                        >
                          <span className="text-amber-500 font-bold font-mono">0{idx + 1}.</span>
                          <p className="leading-relaxed">{bot}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* News Mentions Card */}
                  <div className="bg-cyber-blue/5 border border-cyber-blue/20 rounded p-4 space-y-2">
                    <div className="flex items-center justify-between text-cyber-blue border-b border-cyber-blue/20 pb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase">Dynamic Intel Feeds</span>
                      <Activity size={14} className="animate-pulse" />
                    </div>
                    <div className="text-2xl font-bold font-mono text-white">
                      {currentNationData.newsMentions} News Hits
                    </div>
                    <p className="text-[11px] text-cyber-muted leading-relaxed font-sans">
                      Detected mentions and keywords relating to {currentNationData.country} in the parsed incoming telemetry logs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                <div className="border-b border-cyber-border pb-3 flex justify-between items-center font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sourceCompareData.flag}</span>
                    <h3 className="font-bold text-lg text-white font-mono uppercase">{sourceCompareData.country}</h3>
                  </div>
                  <span className="text-xs font-mono bg-cyber-accent/10 text-cyber-accent px-2 py-0.5 border border-cyber-accent/20 rounded">
                    Score: {sourceCompareData.readinessScore}
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Funding & Policy */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Funding & Policy</span>
                    <div className="text-lg font-bold text-cyber-accent font-mono">${sourceCompareData.fundingUSD}B</div>
                    <p className="text-xs text-cyber-text leading-relaxed"><strong>Policy:</strong> {sourceCompareData.policy}</p>
                    <p className="text-[11px] text-cyber-muted mt-1">{sourceCompareData.fundingDetails}</p>
                  </div>

                  {/* Qubit Range */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Qubit Capacity</span>
                    <div className="text-lg font-bold text-cyber-blue font-mono">{sourceCompareData.qubitRange}</div>
                    <p className="text-xs text-cyber-text">{sourceCompareData.qubitDetails}</p>
                  </div>

                  {/* Active Startups */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Active Startups</span>
                    <p className="text-xs text-white font-bold">{sourceCompareData.activeStartups}</p>
                  </div>

                  {/* News Mentions */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Dynamic Intel Hits</span>
                    <p className="text-xs text-cyber-blue font-bold">{sourceCompareData.newsMentions} articles found</p>
                  </div>

                  {/* Bottlenecks */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-mono font-bold uppercase">
                      <AlertTriangle size={12} />
                      Strategic Bottlenecks
                    </div>
                    <ul className="list-disc list-inside text-xs text-cyber-muted space-y-1 pl-1 font-sans">
                      {sourceCompareData.bottlenecks.map((bot, idx) => (
                        <li key={idx} className="leading-relaxed text-[11px] list-none flex items-start gap-1 font-mono">
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
                <div className="border-b border-cyber-border pb-3 flex justify-between items-center font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{targetCompareData.flag}</span>
                    <h3 className="font-bold text-lg text-white font-mono uppercase">{targetCompareData.country}</h3>
                  </div>
                  <span className="text-xs font-mono bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 border border-cyber-blue/20 rounded">
                    Score: {targetCompareData.readinessScore}
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Funding & Policy */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Funding & Policy</span>
                    <div className="text-lg font-bold text-cyber-accent font-mono">${targetCompareData.fundingUSD}B</div>
                    <p className="text-xs text-cyber-text leading-relaxed"><strong>Policy:</strong> {targetCompareData.policy}</p>
                    <p className="text-[11px] text-cyber-muted mt-1">{targetCompareData.fundingDetails}</p>
                  </div>

                  {/* Qubit Range */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Qubit Capacity</span>
                    <div className="text-lg font-bold text-cyber-blue font-mono">{targetCompareData.qubitRange}</div>
                    <p className="text-xs text-cyber-text">{targetCompareData.qubitDetails}</p>
                  </div>

                  {/* Active Startups */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Active Startups</span>
                    <p className="text-xs text-white font-bold">{targetCompareData.activeStartups}</p>
                  </div>

                  {/* News Mentions */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyber-muted uppercase">Dynamic Intel Hits</span>
                    <p className="text-xs text-cyber-blue font-bold">{targetCompareData.newsMentions} articles found</p>
                  </div>

                  {/* Bottlenecks */}
                  <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-mono font-bold uppercase">
                      <AlertTriangle size={12} />
                      Strategic Bottlenecks
                    </div>
                    <ul className="list-disc list-inside text-xs text-cyber-muted space-y-1 pl-1 font-sans">
                      {targetCompareData.bottlenecks.map((bot, idx) => (
                        <li key={idx} className="leading-relaxed text-[11px] list-none flex items-start gap-1 font-mono">
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
            <h4 className="text-white font-bold uppercase flex items-center gap-1.5 font-mono">
              <Info size={14} className="text-cyber-accent" />
              Sovereign Comparison Takeaways
            </h4>
            <p className="text-cyber-muted leading-relaxed font-sans">
              Comparing <span className="text-white font-bold font-mono">{sourceCompareData?.country}</span> to <span className="text-white font-bold font-mono">{targetCompareData?.country}</span>: 
              The budget divergence stands at <span className="text-cyber-accent font-bold font-mono">${Math.abs((sourceCompareData?.fundingUSD || 0) - (targetCompareData?.fundingUSD || 0)).toFixed(2)} Billion</span>. 
              The qubit capacities range from <span className="text-cyber-blue font-bold font-mono">{sourceCompareData?.qubitRange}</span> to <span className="text-cyber-blue font-bold font-mono">{targetCompareData?.qubitRange}</span>.
              Active startup ecosystems involve companies like <span className="text-white font-mono">{sourceCompareData?.activeStartups}</span> vs. <span className="text-white font-mono">{targetCompareData?.activeStartups}</span>.
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
                  {sovereignData.filter(n => selectedForCharts[n.id]).map(nation => {
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
                  {sovereignData.filter(n => selectedForCharts[n.id]).length === 0 && (
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
                  {sovereignData.filter(n => selectedForCharts[n.id]).map(nation => {
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
                  {sovereignData.filter(n => selectedForCharts[n.id]).length === 0 && (
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
          <div className="bg-[#111A28] border border-cyber-border rounded p-4 font-mono">
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2">
              Sovereign Academic & Research Institutions Grid
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sovereignData.flatMap(nation => 
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
                      <span className="text-[10px] font-mono text-cyber-muted flex items-center gap-1 font-sans">
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
