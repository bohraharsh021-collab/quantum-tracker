// High-Fidelity Mock Data for Quantum Computing Tracker Dashboard

export const MOCK_TOPICS = ['Hardware', 'Algorithms', 'Cryptography', 'Investment', 'Security'];

export const MOCK_SOURCES = [
  'arXiv (quant-ph)',
  'The Quantum Insider',
  'Nature News',
  'IEEE Spectrum',
  'NQM India Portal',
  'PIB India',
  'MIT Technology Review',
  'QNu Press Release'
];

export const MOCK_ORGANIZATIONS = [
  {
    id: 'org-1',
    name: 'QNu Labs',
    type: 'Startup',
    location: 'Bengaluru, India',
    country: 'India',
    established: 2016,
    focus: 'Quantum Cryptography, QKD, QRNG',
    funding: 'Series A ($12M)',
    employees: '50-100',
    description: 'India\'s leading quantum cybersecurity startup, pioneering Quantum Key Distribution (QKD) and Quantum Random Number Generators (QRNG). Collaborates closely with the Indian Armed Forces and DRDO.'
  },
  {
    id: 'org-2',
    name: 'IISc Quantum Computing Lab',
    type: 'Academic Hub',
    location: 'Bengaluru, India',
    country: 'India',
    established: 1909,
    focus: 'Superconducting Qubits, Quantum Optics',
    funding: 'NQM Grant Supported',
    employees: '30+ Researchers',
    description: 'Indian Institute of Science (IISc) runs a premier research lab focused on quantum computing hardware development, building indigenous superconducting qubits and topological insulators.'
  },
  {
    id: 'org-3',
    name: 'IIT Madras Quantum Hub',
    type: 'Academic Hub',
    location: 'Chennai, India',
    country: 'India',
    established: 2022,
    focus: 'Quantum Algorithms, IBM Quantum Network Hub',
    funding: 'Government & Corporate funded',
    employees: '50+ Researchers',
    description: 'First Indian institution to join the IBM Quantum Network as a hub. Focuses on developing quantum algorithms for optimization, finance, and material sciences.'
  },
  {
    id: 'org-4',
    name: 'IBM Quantum',
    type: 'Enterprise',
    location: 'Yorktown Heights, NY, USA',
    country: 'United States of America',
    established: 2016,
    focus: 'Superconducting Qubits, Cloud Quantum Computing',
    funding: 'Corporate ($1B+)',
    employees: '1000+',
    description: 'Global giant in superconducting quantum computing. Hosts the IBM Quantum Network, offering cloud-based access to the world\'s largest fleet of quantum processors.'
  },
  {
    id: 'org-5',
    name: 'Google Quantum AI',
    type: 'Enterprise',
    location: 'Santa Barbara, CA, USA',
    country: 'United States of America',
    established: 2014,
    focus: 'Superconducting Qubits, Quantum Error Correction',
    funding: 'Corporate',
    employees: '250-500',
    description: 'Achieved historical quantum supremacy milestone in 2019 with the Sycamore processor. Currently focusing on scaling physical qubits to build stable logical qubits.'
  },
  {
    id: 'org-6',
    name: 'Quantinuum',
    type: 'Enterprise',
    location: 'Broomfield, CO, USA & London, UK',
    country: 'United Kingdom',
    established: 2021,
    focus: 'Trapped Ion Qubits, Quantum Software',
    funding: 'Corporate & VC ($300M+)',
    employees: '400+',
    description: 'Formed by the merger of Honeywell Quantum Solutions and Cambridge Quantum. Pioneers high-fidelity trapped-ion hardware (H-Series) and TKET compiler.'
  },
  {
    id: 'org-7',
    name: 'TIFR Quantum Measurement & Control Laboratory',
    type: 'Academic Hub',
    location: 'Mumbai, India',
    country: 'India',
    established: 2010,
    focus: 'Superconducting Qubits, Microwave Electronics',
    funding: 'NQM & DAE Funded',
    employees: '25+ Researchers',
    description: 'Tata Institute of Fundamental Research (TIFR) pioneers microwave control circuits and coherence lifetime optimization for superconducting transmons in India.'
  },
  {
    id: 'org-8',
    name: 'QpiAI',
    type: 'Startup',
    location: 'Bengaluru, India',
    country: 'India',
    established: 2019,
    focus: 'Quantum-AI Hybrid Software, Silicon Quantum Chips',
    funding: 'Pre-Series A ($6.5M)',
    employees: '20-50',
    description: 'Bengaluru-based startup developing hybrid Quantum-AI software pipelines, optimization engines, and designing spin-qubit chips.'
  },
  {
    id: 'org-9',
    name: 'Rigetti Computing',
    type: 'Enterprise',
    location: 'Berkeley, CA, USA',
    country: 'United States of America',
    established: 2013,
    focus: 'Superconducting Multi-chip Processors',
    funding: 'Publicly Traded (NASDAQ)',
    employees: '100-200',
    description: 'Pioneers multi-chip quantum processor architectures. Offers full-stack quantum-classical cloud computing services.'
  },
  {
    id: 'org-10',
    name: 'IIT Bombay Center of Excellence in Quantum',
    type: 'Academic Hub',
    location: 'Mumbai, India',
    country: 'India',
    established: 2023,
    focus: 'Silicon Photonics, Quantum Sensing',
    funding: 'NQM Approved Hub',
    employees: '40+ Researchers',
    description: 'National Quantum Mission (NQM) designated hub focusing on silicon-based photonic integrated circuits and quantum sensors for aerospace and medicine.'
  }
];

export const MOCK_ARTICLES = [
  {
    id: 'art-1',
    headline: "IBM Unveils 1,121-Qubit Quantum Processor 'Condor' with Advanced Error Mitigation",
    source: "The Quantum Insider",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    summary: "IBM has officially debuted its Condor chip, a 1,121-qubit superconducting quantum processor. The release is accompanied by novel error-mitigation protocols that successfully demonstrate utility-scale calculations prior to full fault-tolerance.",
    sentiment: "positive",
    reliability: 5,
    topic: "Hardware",
    keywords: ["superconducting", "ibm", "condor", "qubits"],
    country: "United States of America"
  },
  {
    id: 'art-2',
    headline: "Security Alert: Quantum Decryption Risk for RSA-2048 Identified Faster Than Expected",
    source: "arXiv (quant-ph)",
    timestamp: new Date(Date.now() - 1000 * 60 * 340).toISOString(), // 5.6 hours ago
    summary: "A newly published paper details a theoretical optimization in Shor's algorithm, reducing the required logical qubits for RSA-2048 factoring. Security analysts urge accelerated migration to post-quantum cryptographic standards.",
    sentiment: "negative",
    reliability: 4,
    topic: "Cryptography",
    keywords: ["rsa-2048", "shor", "decryption", "security"],
    country: "United Kingdom"
  },
  {
    id: 'art-3',
    headline: "India's National Quantum Mission Allocates ₹1,500 Crore for Indigenous Hardware Hubs",
    source: "PIB India",
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
    summary: "The Indian Ministry of Science & Technology announced the official release of funding to establish four thematic hubs (T-Hubs) in India. Spanning hardware, software, sensing, and communication, the hubs will be anchored at premier institutes including IISc and IITs.",
    sentiment: "positive",
    reliability: 5,
    topic: "Investment",
    keywords: ["nqm", "india", "funding", "iisc", "iits"],
    country: "India"
  },
  {
    id: 'art-4',
    headline: "QNu Labs Successfully Demonstrates 150km Quantum Key Distribution (QKD) Link",
    source: "QNu Press Release",
    timestamp: new Date(Date.now() - 1000 * 60 * 1200).toISOString(), // 20 hours ago
    summary: "Indian startup QNu Labs has achieved a new milestone by establishing a stable, high-rate QKD link over a distance of 150 kilometers. The field trial was carried out over standard commercial telecom fiber with low key error rates, signaling immediate readiness for critical infrastructure deployment.",
    sentiment: "positive",
    reliability: 5,
    topic: "Cryptography",
    keywords: ["qnu-labs", "qkd", "cryptography", "telecom"],
    country: "India"
  },
  {
    id: 'art-5',
    headline: "Google Quantum AI Achieves Lower Logical Error Rates by Scaling Physical Qubits",
    source: "Nature News",
    timestamp: new Date(Date.now() - 1000 * 60 * 1800).toISOString(), // 30 hours ago
    summary: "Google researchers have experimentally demonstrated that increasing the size of a surface code logical qubit reduces its error rate. This marks a critical milestone, confirming that physical scale-up successfully counters environmental decoherence.",
    sentiment: "positive",
    reliability: 5,
    topic: "Hardware",
    keywords: ["google", "logical-qubit", "surface-code"],
    country: "United States of America"
  },
  {
    id: 'art-6',
    headline: "Quantum Computing Venture Capital Funding Falls 20% in Q1 Amid AI Hype",
    source: "The Quantum Insider",
    timestamp: new Date(Date.now() - 1000 * 60 * 2500).toISOString(), // 41 hours ago
    summary: "Venture capital funding for quantum hardware and software startups fell by 20% in the first quarter of this fiscal year. Analysts attribute the drop to rising interest rates and a shift in investor focus toward generative AI systems.",
    sentiment: "negative",
    reliability: 5,
    topic: "Investment",
    keywords: ["funding", "venture-capital", "ai-hype", "market"],
    country: "Global"
  },
  {
    id: 'art-7',
    headline: "Microsoft and Quantinuum Demonstrate Fault-Tolerant Quantum Computing with 4 Logical Qubits",
    source: "Nature News",
    timestamp: new Date(Date.now() - 1000 * 60 * 4300).toISOString(), // ~3 days ago
    summary: "Using Quantinuum's H-series ion-trap hardware, Microsoft has successfully created four highly stable logical qubits. Over 14,000 individual runs were executed without a single logical error, representing a massive leap in diagnostic fidelity.",
    sentiment: "positive",
    reliability: 5,
    topic: "Hardware",
    keywords: ["microsoft", "quantinuum", "ion-trap"],
    country: "United States of America"
  },
  {
    id: 'art-8',
    headline: "DRDO Partners with Indian Startups to Deploy Post-Quantum Cryptography in Defense Networks",
    source: "PIB India",
    timestamp: new Date(Date.now() - 1000 * 60 * 6000).toISOString(), // ~4.1 days ago
    summary: "The Defence Research and Development Organisation (DRDO) has signed contracts with QNu Labs and other domestic startups to deploy post-quantum cryptographic (PQC) algorithms across strategic military communication nodes.",
    sentiment: "positive",
    reliability: 5,
    topic: "Security",
    keywords: ["drdo", "pqc", "military", "defense", "qnu-labs"],
    country: "India"
  },
  {
    id: 'art-9',
    headline: "Start-up Claims Room Temperature Superconductivity in Quantum Dot Array; Experts Skeptical",
    source: "IEEE Spectrum",
    timestamp: new Date(Date.now() - 1000 * 60 * 8000).toISOString(), // ~5.5 days ago
    summary: "A Silicon Valley quantum startup claims to have achieved zero electrical resistance at 15°C using a novel silicon quantum dot array. Leading condensed matter physicists express deep skepticism, citing lack of independent verification.",
    sentiment: "mixed",
    reliability: 2,
    topic: "Hardware",
    keywords: ["superconductivity", "quantum-dots", "silicon"],
    country: "United States of America"
  },
  {
    id: 'art-10',
    headline: "China Unveils 176-Qubit 'Jiuzhang 3.0' Photonic Quantum Computing Prototype",
    source: "arXiv (quant-ph)",
    timestamp: new Date(Date.now() - 1000 * 60 * 12000).toISOString(), // ~8.3 days ago
    summary: "Chinese research teams have successfully built the Jiuzhang 3.0 quantum computing system using 176 detected photons. It solves Gaussian Boson Sampling problems billions of times faster than classical supercomputers, setting a new photonic speed record.",
    sentiment: "positive",
    reliability: 4,
    topic: "Hardware",
    keywords: ["jiuzhang", "photonic", "china", "boson-sampling"],
    country: "China"
  }
];

export const MOCK_ALERTS = [
  {
    id: 'alert-1',
    title: "Critical Quantum Cryptography Vulnerability",
    description: "RSA-2048 decryption optimization paper published on arXiv. Immediate policy review recommended for sensitive government and financial data.",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 340).toISOString(),
    sourceArticleId: 'art-2'
  },
  {
    id: 'alert-2',
    title: "Major Investment Decline Identified",
    description: "Q1 quantum sector funding reports confirm a 20% quarter-over-quarter reduction, signaling potential sector consolidation.",
    severity: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 2500).toISOString(),
    sourceArticleId: 'art-6'
  },
  {
    id: 'alert-3',
    title: "Coherence Alert: Dilution Refrigerator Drift",
    description: "Anomalous temperature variations registered at University of Chicago experimental site. Physical qubits coherence time T1 decreased temporarily by 15%.",
    severity: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 5000).toISOString(),
    sourceArticleId: null
  }
];

// Processor Matrix containing exactly 18 technical columns to evaluate
export const PROCESSORS_MATRIX = [
  {
    name: "Condor",
    manufacturer: "IBM",
    qubitType: "Superconducting",
    physicalQubits: 1121,
    logicalQubits: 0,
    quantumVolume: 256,
    gateFidelity1Q: "99.92%",
    gateFidelity2Q: "98.50%",
    t1Coherence: 150, // in microseconds
    t2Coherence: 120, // in microseconds
    coolingTemp: 15, // in mK
    coolingMethod: "Dilution Refrigerator",
    errorMitigation: "Probabilistic Error Cancellation (PEC)",
    devStatus: "Beta",
    deploymentModel: "Cloud-only",
    energyConsumption: 25, // in kW
    clops: 3200,
    launchYear: 2023
  },
  {
    name: "Heron r2",
    manufacturer: "IBM",
    qubitType: "Superconducting",
    physicalQubits: 133,
    logicalQubits: 0,
    quantumVolume: 4096,
    gateFidelity1Q: "99.98%",
    gateFidelity2Q: "99.20%",
    t1Coherence: 220,
    t2Coherence: 180,
    coolingTemp: 10,
    coolingMethod: "Dilution Refrigerator",
    errorMitigation: "Zero Noise Extrapolation (ZNE)",
    devStatus: "Production",
    deploymentModel: "Cloud-only",
    energyConsumption: 18,
    clops: 7500,
    launchYear: 2024
  },
  {
    name: "Sycamore",
    manufacturer: "Google Quantum AI",
    qubitType: "Superconducting",
    physicalQubits: 53,
    logicalQubits: 0,
    quantumVolume: 512,
    gateFidelity1Q: "99.85%",
    gateFidelity2Q: "99.40%",
    t1Coherence: 35,
    t2Coherence: 25,
    coolingTemp: 15,
    coolingMethod: "Dilution Refrigerator",
    errorMitigation: "Syndrome Measurement Block",
    devStatus: "Internal Testing",
    deploymentModel: "Cloud-only",
    energyConsumption: 22,
    clops: 1200,
    launchYear: 2019
  },
  {
    name: "Ankaa-2",
    manufacturer: "Rigetti Computing",
    qubitType: "Superconducting",
    physicalQubits: 84,
    logicalQubits: 0,
    quantumVolume: 1024,
    gateFidelity1Q: "99.70%",
    gateFidelity2Q: "98.00%",
    t1Coherence: 80,
    t2Coherence: 65,
    coolingTemp: 20,
    coolingMethod: "Dilution Refrigerator",
    errorMitigation: "Dynamical Decoupling",
    devStatus: "Production",
    deploymentModel: "Hybrid Cloud",
    energyConsumption: 15,
    clops: 4300,
    launchYear: 2023
  },
  {
    name: "H2-1",
    manufacturer: "Quantinuum",
    qubitType: "Trapped Ion",
    physicalQubits: 32,
    logicalQubits: 4,
    quantumVolume: 1048576, // 2^20
    gateFidelity1Q: "99.997%",
    gateFidelity2Q: "99.91%",
    t1Coherence: 3000000, // 3 seconds
    t2Coherence: 2000000,
    coolingTemp: 4000, // 4 Kelvin (4000 mK)
    coolingMethod: "Helium Loop & Laser Cooling",
    errorMitigation: "Surface Code Error Correction",
    devStatus: "Production",
    deploymentModel: "Cloud & On-premises",
    energyConsumption: 35,
    clops: 1500,
    launchYear: 2023
  },
  {
    name: "Forte",
    manufacturer: "IonQ",
    qubitType: "Trapped Ion",
    physicalQubits: 36,
    logicalQubits: 0,
    quantumVolume: 65536,
    gateFidelity1Q: "99.95%",
    gateFidelity2Q: "99.40%",
    t1Coherence: 1000000, // 1 second
    t2Coherence: 800000,
    coolingTemp: 293000, // Room temp chamber with laser cooling
    coolingMethod: "Room Temperature Laser Trap",
    errorMitigation: "Acousto-optic Deflection Mitigation",
    devStatus: "Beta",
    deploymentModel: "Cloud-only",
    energyConsumption: 12,
    clops: 800,
    launchYear: 2022
  },
  {
    name: "QNu-Q1 (Indigen)",
    manufacturer: "QNu Labs / IISc",
    qubitType: "Superconducting",
    physicalQubits: 8,
    logicalQubits: 0,
    quantumVolume: 16,
    gateFidelity1Q: "99.50%",
    gateFidelity2Q: "96.50%",
    t1Coherence: 45,
    t2Coherence: 30,
    coolingTemp: 12,
    coolingMethod: "Dilution Refrigerator",
    errorMitigation: "None (Basic Calibration)",
    devStatus: "R&D",
    deploymentModel: "On-premises Lab",
    energyConsumption: 20,
    clops: 500,
    launchYear: 2025
  },
  {
    name: "Jiuzhang 3.0",
    manufacturer: "USTC",
    qubitType: "Photonic",
    physicalQubits: 176, // Photons
    logicalQubits: 0,
    quantumVolume: 0, // N/A for non-gate-based GBS
    gateFidelity1Q: "N/A",
    gateFidelity2Q: "N/A",
    t1Coherence: 0.1, // extremely low, speed of light
    t2Coherence: 0.1,
    coolingTemp: 293000, // fibers are room temp, detectors are 100mK
    coolingMethod: "Superconducting Nanowire Single-Photon Detectors",
    errorMitigation: "Post-selection Filters",
    devStatus: "R&D",
    deploymentModel: "Lab-bound",
    energyConsumption: 40,
    clops: 0, // N/A
    launchYear: 2023
  },
  {
    name: "Aquila",
    manufacturer: "QuEra Computing",
    qubitType: "Neutral Atom",
    physicalQubits: 256,
    logicalQubits: 0,
    quantumVolume: 0, // Analog Hamiltonian Simulator
    gateFidelity1Q: "99.90%",
    gateFidelity2Q: "99.10%",
    t1Coherence: 4000,
    t2Coherence: 1500,
    coolingTemp: 0.01, // Microkelvin scale for trap
    coolingMethod: "Laser Trapping & Cooling",
    errorMitigation: "Rydberg Atom Defect Checking",
    devStatus: "Production",
    deploymentModel: "Cloud-only",
    energyConsumption: 8,
    clops: 200,
    launchYear: 2022
  },
  {
    name: "Borealis",
    manufacturer: "Xanadu",
    qubitType: "Photonic",
    physicalQubits: 216, // Squeezed states
    logicalQubits: 0,
    quantumVolume: 0, // Continuous-variable
    gateFidelity1Q: "99.00%",
    gateFidelity2Q: "95.00%",
    t1Coherence: 1, // ultra short pulse duration
    t2Coherence: 1,
    coolingTemp: 293000, // Room temp processors
    coolingMethod: "Room Temp Processing & Cryo Detectors",
    errorMitigation: "Threshold Detection Mitigation",
    devStatus: "Production",
    deploymentModel: "Cloud-only",
    energyConsumption: 10,
    clops: 100,
    launchYear: 2022
  }
];

export const VC_FUNDING_ROUNDS = [
  { id: 'vc-1', startup: "QNu Labs", country: "India", round: "Series A", amount: 12.0, date: "2024-03-15", leadInvestors: "Speciale Invest, SIDBI Venture Capital" },
  { id: 'vc-2', startup: "PsiQuantum", country: "United States of America", round: "Series D Extension", amount: 150.0, date: "2024-05-10", leadInvestors: "Australian Government, Queensland Government" },
  { id: 'vc-3', startup: "QpiAI", country: "India", round: "Pre-Series A", amount: 6.5, date: "2023-11-20", leadInvestors: "YourNest Venture Capital" },
  { id: 'vc-4', startup: "Pasqal", country: "France", round: "Series B", amount: 108.0, date: "2023-01-24", leadInvestors: "Temasek Holdings, Wa\'ed Ventures" },
  { id: 'vc-5', startup: "Rigetti Computing", country: "United States of America", round: "Post-IPO Debt", amount: 20.0, date: "2024-02-05", leadInvestors: "Shoals Technologies Group" },
  { id: 'vc-6', startup: "Quantum Motion", country: "United Kingdom", round: "Series B", amount: 50.0, date: "2023-02-28", leadInvestors: "Bosch Ventures, Porsche SE, British Patient Capital" }
];

export const MOCK_HUBS = [
  {
    id: "hub-bengaluru",
    name: "Bengaluru Quantum Hub",
    coordinates: [13.0184, 77.5673],
    institution: "Indian Institute of Science (IISc) & QpiAI",
    focus: "Superconducting Transmon qubits & Silicon Spin-Qubit compiler structures",
    status: "Active"
  },
  {
    id: "hub-mumbai",
    name: "Mumbai Quantum Measurement Hub",
    coordinates: [18.9067, 72.8089],
    institution: "Tata Institute of Fundamental Research (TIFR)",
    focus: "Microwave controls and multi-qubit superconducting transmon testing",
    status: "Active"
  },
  {
    id: "hub-chennai",
    name: "Chennai Quantum Computing Center",
    coordinates: [12.9915, 80.2336],
    institution: "Indian Institute of Technology Madras (IITM)",
    focus: "Quantum algorithms, finance modeling, and IBM Quantum Network hub",
    status: "Active"
  },
  {
    id: "hub-yorktown",
    name: "IBM Quantum Yorktown Facility",
    coordinates: [41.2093, -73.8052],
    institution: "IBM Research",
    focus: "Superconducting quantum processors (IBM Heron, Condor) & quantum utility cloud scaling",
    status: "Active"
  },
  {
    id: "hub-santa-barbara",
    name: "Google Quantum AI Lab",
    coordinates: [34.4140, -119.8489],
    institution: "Google LLC",
    focus: "Sycamore processor, logical qubits & surface code error correction research",
    status: "Active"
  },
  {
    id: "hub-college-park",
    name: "IonQ College Park R&D Command",
    coordinates: [38.9897, -76.9378],
    institution: "IonQ, Inc. & University of Maryland",
    focus: "Trapped-ion quantum hardware & high-fidelity gate processing",
    status: "Active"
  },
  {
    id: "hub-delft",
    name: "QuTech Quantum Research Hub",
    coordinates: [52.0116, 4.3571],
    institution: "TU Delft & TNO",
    focus: "Silicon spin qubits, topological quantum states, and distributed quantum networks",
    status: "Active"
  },
  {
    id: "hub-munich",
    name: "Munich Quantum Valley Hub",
    coordinates: [48.1351, 11.5820],
    institution: "Ludwig Maximilian University & Max Planck Institute",
    focus: "Neutral atom arrays, superconducting hardware, and cryo-electronics",
    status: "Active"
  },
  {
    id: "hub-hefei",
    name: "Hefei National Laboratory",
    coordinates: [31.8381, 117.2530],
    institution: "University of Science and Technology of China (USTC) & Origin Quantum",
    focus: "Jiuzhang photonics sampling & Origin Wukong superconducting processors",
    status: "Active"
  },
  {
    id: "hub-singapore",
    name: "Centre for Quantum Technologies",
    coordinates: [1.2902, 103.7783],
    institution: "National University of Singapore (NUS) & A*STAR",
    focus: "Satellite-to-ground QKD communication and atomic sensors",
    status: "Active"
  }
];

// Helper to build milestones array supporting both flat rendering and past/future queries
const buildMilestones = (past, future) => {
  const arr = [
    ...past.map(m => ({ ...m, status: "Completed", period: "past" })),
    ...future.map(m => ({ ...m, status: "Planned", period: "future" }))
  ];
  arr.past = past;
  arr.future = future;
  return arr;
};

export const SOVEREIGN_FUNDING = [
  {
    country: "India",
    initiative: "National Quantum Mission (NQM)",
    budgetUSD: 730.0, // in Millions USD
    period: "2023 - 2031",
    focusAreas: [
      { name: "Thematic Hubs (T-Hubs)", area: "Thematic Hubs (T-Hubs)", allocation: "40%", description: "Setting up 4 major technology development centers (Hardware, Software, Communication, Sensing)." },
      { name: "Start-ups & Incubators", area: "Start-ups & Incubators", allocation: "20%", description: "Providing seed grants, workspace, and technical support to Indian quantum startups." },
      { name: "Human Resource & Training", area: "Human Resource & Training", allocation: "15%", description: "Funding PhD programs, international fellowships, and faculty research blocks." },
      { name: "Defense and Strategic QKD", area: "Defense and Strategic QKD", allocation: "25%", description: "Developing secure links for DRDO, Indian Army, Navy, and Space Networks." }
    ],
    milestones: buildMilestones(
      [
        { year: "2023", task: "Cabinet approval of ₹6,003 crore budget." },
        { year: "2024", task: "Formulate governing board & approve T-Hub guidelines." }
      ],
      [
        { year: "2026", task: "Demonstrate 8-physical qubit superconducting processor." },
        { year: "2028", task: "Deploy 50-physical qubit prototype indigenously." }
      ]
    )
  },
  {
    country: "United States of America",
    initiative: "National Quantum Initiative Act (NQI)",
    budgetUSD: 1800.0, // in Millions USD
    period: "2018 - 2028",
    focusAreas: [
      { name: "NSF & DOE Research Centers", area: "NSF & DOE Research Centers", allocation: "50%", description: "Running 10 joint research centers at national labs and universities." },
      { name: "Defense & NISQ applications", area: "Defense & NISQ applications", allocation: "30%", description: "Developing NISQ algorithms for defense cryptography and logistics." },
      { name: "NIST Metrology", area: "NIST Metrology", allocation: "20%", description: "Establishing hardware standards, qubit fidelity metrics, and calibration guidelines." }
    ],
    milestones: buildMilestones(
      [
        { year: "2019", task: "Initiate funding for DOE centers." },
        { year: "2023", task: "Launch the Quantum Economic Development Consortium (QED-C)." }
      ],
      [
        { year: "2025", task: "Define standard post-quantum cryptographic algorithms." }
      ]
    )
  },
  {
    country: "China",
    initiative: "National Strategy for Quantum Tech dominance",
    budgetUSD: 10000.0, // in Millions USD
    period: "2016 - 2030",
    focusAreas: [
      { name: "Hefei National Laboratory", area: "Hefei National Laboratory", allocation: "60%", description: "Pioneering superconducting transmons, topological states, and photonic simulators." },
      { name: "Satellite QKD (Micius)", area: "Satellite QKD (Micius)", allocation: "25%", description: "Expanding the global space-to-ground quantum communications network." },
      { name: "Sovereign Crypto Defense", area: "Sovereign Crypto Defense", allocation: "15%", description: "Complete quantum-proofing of national grid and military ledgers." }
    ],
    milestones: buildMilestones(
      [
        { year: "2016", task: "Launch Micius Quantum Satellite." },
        { year: "2021", task: "Establish Hefei-Shanghai ground QKD backbone." }
      ],
      [
        { year: "2024", task: "Introduce Jiuzhang 3.0 GBS processor prototype." }
      ]
    )
  }
];

export const PROCUREMENT_LEDGER = [
  { id: "pr-1", buyer: "Indian Army", seller: "QNu Labs", product: "Armored QKD System", value: 3.5, date: "2024-02-12", status: "Delivered" },
  { id: "pr-2", buyer: "DRDO (DLRL Hyderabad)", seller: "QNu Labs", product: "High-Rate QRNG Modules", value: 1.2, date: "2023-10-05", status: "Delivered" },
  { id: "pr-3", buyer: "US Air Force Research Lab", seller: "IonQ", product: "Forte Cloud Access & Hardware Dev", value: 25.5, date: "2023-09-18", status: "Active" },
  { id: "pr-4", buyer: "German Aerospace Center (DLR)", seller: "Quantinuum", product: "H-Series Trapped Ion Processing", value: 18.0, date: "2024-01-20", status: "Active" },
  { id: "pr-5", buyer: "CSIR-NPL Delhi", seller: "Bluefors", product: "LD400 Dilution Refrigerator", value: 0.9, date: "2023-07-11", status: "Completed" }
];

export const ALLIANCES_NETWORK = [
  { id: "al-1", partyA: "IBM Quantum", partyB: "IIT Madras", type: "Research Partnership", scope: "Algorithm development and access to IBM utility-scale processors for Indian PhD scholars.", date: "2022-09-12" },
  { id: "al-2", partyA: "Government of India", partyB: "United States Government", type: "Inter-governmental Joint Program", scope: "US-India Quantum Coordination Hub to exchange scientists and co-sponsor research grants.", date: "2023-06-22" },
  { id: "al-3", partyA: "Quantinuum", partyB: "Microsoft", type: "Technology Integration", scope: "Integrating Quantinuum trapped-ion hardware with Microsoft Azure Quantum virtual qubits.", date: "2024-04-03" },
  { id: "al-4", partyA: "QNu Labs", partyB: "Airtel", type: "Telecom Integration Hub", scope: "Trial run of QKD secure channels over commercial Delhi-to-Noida fiber links.", date: "2023-12-08" }
];

export const REGIONAL_CONSORTIA = {
  asianConsortia: [
    { name: "Quantum Consortium India (QCI)", members: "IITs, IISc, CDAC, QNu Labs, QpiAI", description: "Brings academia, public research labs, and startups together to form standardization benchmarks under the National Quantum Mission." },
    { name: "Q-STAR Japan", members: "Toshiba, NEC, Hitachi, Fujitsu, Tokyo University", description: "Industrial alliance focused on commercializing quantum computers, materials research, and post-quantum cryptosystems." },
    { name: "SG-Quantum Singapore", members: "NUS, NTU, Agency for Science, Technology and Research (A*STAR)", description: "Academic research consortium focusing on photonic networks, micro-dilution fridges, and fintech quantum algorithms." }
  ],
  globalConsortia: [
    { name: "Quantum Economic Development Consortium (QED-C)", region: "Global / USA lead", members: "200+ companies including Google, IBM, Boeing, Lockheed", description: "Maintains supply chain maps, creates cryogenic standards, and acts as industry voice to policymakers." },
    { name: "European Quantum Industry Consortium (QuIC)", region: "Europe", members: "ASML, Airbus, Infineon, Pasqal, IQM", description: "Coordinates semiconductor manufacturing interfaces, advocates funding programs, and guides venture-capital investments." }
  ]
};

export const MOCK_TAXONOMY = [
  {
    category: "Hardware Platforms",
    subcategories: [
      { name: "Superconducting", description: "Uses superconducting electrical circuits to create macroscopic artificial atoms. Pros: Fast gate speeds, established semiconductor manufacturing compatibility. Cons: Short coherence times, massive cooling requirements (10mK). Key Players: IBM, Google, Rigetti, TIFR." },
      { name: "Trapped Ion", description: "Uses ionized atoms suspended in electromagnetic fields. Qubits are manipulated via lasers. Pros: High fidelity, long coherence times. Cons: Slower gate speeds, scalability mechanical bottlenecks. Key Players: Quantinuum, IonQ." },
      { name: "Neutral Atom", description: "Uses optical tweezers to trap neutral atoms in 2D or 3D grids, using Rydberg states. Pros: Highly scalable (hundreds of qubits), flexible geometry. Cons: Slow preparation times, cooling required. Key Players: QuEra, Pasqal." },
      { name: "Photonic", description: "Uses photons (particles of light) as qubits, routed through optical chips. Pros: Minimal cooling needed (except for detectors), speeds of light data transmission. Cons: Photons do not interact easily, high loss rates. Key Players: Xanadu, Jiuzhang." }
    ]
  },
  {
    category: "Software & Algorithms",
    subcategories: [
      { name: "Quantum SDKs", description: "Software development kits enabling developers to build quantum circuits. Examples: Qiskit (IBM), Cirq (Google), TKET (Quantinuum)." },
      { name: "Quantum Algorithms", description: "Mathematical frameworks providing computational speedups. Examples: Shor's Algorithm (exponential speedup for factoring), Grover's Algorithm (quadratic speedup for database searches), VQE (Noisy-era chemistry simulation)." }
    ]
  },
  {
    category: "Post-Quantum Cryptography & Security",
    subcategories: [
      { name: "Post-Quantum Cryptography (PQC)", description: "Software algorithms running on classical systems that are mathematically secure against Shor's algorithm decryption. Examples: Kyber, Dilithium (NIST standards)." },
      { name: "Quantum Key Distribution (QKD)", description: "Hardware-based security using laws of quantum mechanics to transmit cryptographic keys. Attempts to intercept alter the quantum state, alerting users immediately. Key Players: QNu Labs." }
    ]
  }
];export const INDIA_TRACKER_DATA = [
  {
    category: "Government",
    entity: "Department of Science & Technology (DST)",
    details: "Central executive body coordinating NQM. Allocated ₹6,003 crore for thematic research hubs and strategic QKD links. Authorized setting up 4 major T-Hubs.",
    budget: "₹6,003 Cr (Mission Budget)",
    status: "Operational"
  },
  {
    category: "Colleges & Universities",
    entity: "IISc, IIT Madras, IIT Bombay, IIT Kanpur, TIFR",
    details: "Host sites for NQM hardware fabrication and algorithm hubs. IISc focuses on superconducting transmons, IITM anchors the IBM Quantum Network hub, and TIFR works on microwave control electronics.",
    budget: "Government Grants",
    status: "Active Research"
  },
  {
    category: "Students & Professionals",
    entity: "DST Fellowships & Internship Programs",
    details: "Creating 500+ PhD positions, international research exchange fellowships, and national quantum skill development workshops to train 2000+ professionals.",
    budget: "₹150 Cr allocation",
    status: "Rollout Stage"
  },
  {
    category: "Multinational Companies (MNCs)",
    entity: "IBM, Microsoft, Amazon Web Services (AWS)",
    details: "MNCs operating in India to provide infrastructure. IBM provides cloud access for IITs, AWS sponsors Quantum Lab at IISc, and Microsoft Garage supports QKD research.",
    budget: "Corporate Funded",
    status: "Active Partnerships"
  },
  {
    category: "Startups",
    entity: "QNu Labs, QpiAI, BosonQ Psi",
    details: "Domestic startup ecosystem. QNu Labs builds military-grade QKD links (partnered with Indian Army/DRDO), QpiAI designs silicon spin chips, and BosonQ Psi develops simulation softwares.",
    budget: "VC & Grants ($20M+)",
    status: "Commercializing"
  },
  {
    category: "State Governments",
    entity: "Karnataka, Telangana, Tamil Nadu ICT Depts",
    details: "State-level policies. Karnataka launched the Karnataka Quantum Policy establishing a dedicated startup incubator. Telangana planned a 'Quantum City' near Hyderabad.",
    budget: "State Level Grants",
    status: "Policy Formulated"
  }
];

export const GLOBAL_RESOURCES_DATA = [
  {
    country: "United States of America",
    government: "National Quantum Initiative (NQI) Act ($1.8B budget). Coordinates via NSF, Department of Energy (DOE) National Labs.",
    startups: "IonQ (Trapped-ion pioneer), Rigetti (Superconducting chips), QuEra (Neutral atom simulation), PsiQuantum (Photonic architecture).",
    corporations: "IBM (1121-qubit Condor), Google (Sycamore processor), Microsoft (Azure Quantum virtual qubits), AWS (Bracket cloud provider).",
    academic: "MIT (Center for Quantum Engineering), Harvard, Chicago Quantum Exchange (CQE).",
    summary: "Leads in commercial enterprise access, large venture-backed hardware startups, and comprehensive cloud-based quantum services."
  },
  {
    country: "China",
    government: "State-directed Quantum Strategy (Estimated $10B+ budget). Hefei National Laboratory acts as central engineering command.",
    startups: "Origin Quantum (Superconducting hardware vendor), QuantumCTek (QKD hardware & global backbone link integration).",
    corporations: "Tencent Quantum Lab (Algorithms/Software), Alibaba Quantum Lab (merged with CAS research institutes).",
    academic: "University of Science and Technology of China (USTC) - built Micius Satellite and Jiuzhang Photonic prototypes.",
    summary: "Strongest player in world-scale QKD communication grids, photonic boson sampling milestones, and state-funded research scale."
  },
  {
    country: "United Kingdom",
    government: "UK National Quantum Technologies Programme (£1B+ budget) spanning research hubs in sensors, computing, and communications.",
    startups: "Oxford Quantum Circuits (OQC - superconducting cloud services), Orca Computing (fiber photonic simulators).",
    corporations: "Quantinuum (Merged Honeywell & Cambridge Quantum - Trapped Ion leaders, built H-Series processors).",
    academic: "Oxford University, Cambridge University, University of Bristol.",
    summary: "Excellent software/hardware integrations, trapped-ion high-fidelity performance records, and early defense QKD testing."
  },
  {
    country: "European Union",
    government: "EU Quantum Flagship (€1B budget). National programs: Germany (€2B), France (€1.8B), Netherlands (€615M via Quantum Delta).",
    startups: "Pasqal (France - neutral atom processor Aquila provider), IQM (Finland/Germany - superconducting chips for research hubs).",
    corporations: "ASML (lithography systems crucial for silicon spin/photonic chips), Infineon (semiconductor fabrication for quantum).",
    academic: "TU Delft (QuTech), Munich Quantum Valley, CEA-Leti (Grenoble).",
    summary: "World-class semiconductor tooling hubs (ASML), strong research alliances, and neutral atom commercial scaling leads."
  },
  {
    country: "Japan",
    government: "Quantum Technology Innovation Strategy. Directed by Cabinet Office to build industrial competitiveness.",
    startups: "Q-STAR Consortium (Tokyo-based industrial alliance).",
    corporations: "Toshiba (QKD system leader), NEC (superconducting qubits), Fujitsu (annealer simulators), Hitachi (silicon spins).",
    academic: "RIKEN (Research Institute), University of Tokyo.",
    summary: "Pioneers in high-rate QKD systems (Toshiba), industrial hardware applications, and silicon spin collaborations."
  },
  {
    country: "Singapore",
    government: "National Quantum Strategy ($100M+ SGD). Funding bodies include National Research Foundation (NRF).",
    startups: "Horizon Quantum Computing (automated compilers), Entropica Labs (quantum chemistry algorithms).",
    corporations: "Collaborates with global partners for telecom integrations.",
    academic: "Centre for Quantum Technologies (CQT) at National University of Singapore (NUS).",
    summary: "Regional hub in Southeast Asia with deep specialization in satellite QKD sensors, compiler automation, and finance algorithms."
  }
];

export const MAP_NODES_DATA = [
  // India Nodes
  { name: "IISc Research Lab", city: "Bengaluru", lat: 13.0184, lng: 77.5673, role: "NQM Transmon Qubit Lab & Quantum Sensors Research Hub", category: "Academia" },
  { name: "C-DAC Bengaluru Hub", city: "Bengaluru", lat: 12.9716, lng: 77.5946, role: "Quantum Simulator (QSim) Integration Center", category: "Government Research" },
  { name: "QNu Labs HQ", city: "Bengaluru", lat: 12.9279, lng: 77.6271, role: "Defence-grade QKD Hardware Manufacturer", category: "Startup" },
  { name: "QpiAI India", city: "Bengaluru", lat: 12.9562, lng: 77.7011, role: "Silicon Spin-Qubit Processor Design & Quantum AI compiler development", category: "Startup" },
  { name: "IIT Bombay (QSEC)", city: "Mumbai", lat: 19.1334, lng: 72.9133, role: "Center of Excellence in Quantum Science & Engineering", category: "Academia" },
  { name: "TIFR Transmon Hub", city: "Mumbai", lat: 18.9067, lng: 72.8089, role: "Microwave controls and multi-qubit superconducting transmon testing", category: "Academia" },
  { name: "C-DAC HQ Pune", city: "Pune", lat: 18.5204, lng: 73.8567, role: "National Param Q-Sim Development Command Center & Compute Hub", category: "Government Research" },
  { name: "IIT Madras (IBM Hub)", city: "Chennai", lat: 12.9915, lng: 80.2336, role: "IBM Quantum Innovation Center & Advanced Algorithm Hub", category: "Academia" },
  { name: "DST / NQM HQ", city: "Delhi", lat: 28.5700, lng: 77.2000, role: "National Quantum Mission (NQM) Executive Command & Funding Office", category: "Government Executive" },
  
  // US Nodes
  { name: "Google Quantum AI", city: "Santa Barbara", lat: 34.4140, lng: -119.8489, role: "Google Sycamore Superconducting Processor Facility", category: "MNC" },
  { name: "IBM Quantum Yorktown", city: "Yorktown Heights", lat: 41.2093, lng: -73.8052, role: "IBM Heron QPU Development Facility", category: "MNC" },
  { name: "Chicago Quantum Exchange", city: "Chicago", lat: 41.7897, lng: -87.5997, role: "Multi-institutional Quantum Hub & Testbed Corridor", category: "Academia" },
  
  // China Nodes
  { name: "USTC National Lab", city: "Hefei", lat: 31.8381, lng: 117.2530, role: "Jiuzhang Photonic & Micius Satellite Command", category: "Academia" },
  { name: "Tencent Quantum Lab", city: "Beijing", lat: 39.9042, lng: 116.4074, role: "Advanced Drug Simulation & Material Science Lab", category: "MNC" },

  // UK Nodes
  { name: "Oxford Quantum Circuits", city: "Oxford", lat: 51.7520, lng: -1.2577, role: "Lucy Superconducting QPU Commercial Fab", category: "Startup" },
  { name: "Quantinuum London", city: "London", lat: 51.5074, lng: -0.1278, role: "Trapped-Ion H-Series Development HQ", category: "MNC" },

  // EU Nodes
  { name: "QuTech Delft", city: "Delft", lat: 52.0116, lng: 4.3571, role: "Silicon Spin-Qubit & Quantum Internet Consortium", category: "Academia" },
  { name: "Munich Quantum Valley", city: "Munich", lat: 48.1351, lng: 11.5820, role: "Superconducting & Neutral Atom Research Alliance", category: "Academia" },

  // Singapore Nodes
  { name: "CQT NUS", city: "Singapore", lat: 1.2902, lng: 103.7783, role: "Centre for Quantum Technologies & Satellite communication ground-hub", category: "Academia" }
];

export const APPLICATIONS_ENCYCLOPEDIA = [
  {
    letter: "A",
    title: "Algorithms & Cryptography",
    items: [
      {
        name: "Shor's Algorithm Factorization",
        desc: "Solves prime factorization in polynomial time, breaking RSA-style classical keys. Implemented via modular exponentiation.",
        algorithms: "Shor's Algorithm, Quantum Fourier Transform (QFT)",
        status: "Theoretical (Requires 1M+ logical qubits)",
        businessImpact: "Threatens $4T global secure e-commerce and state cryptographic databases."
      },
      {
        name: "Kyber Lattice-Based PQC",
        desc: "A NIST-standardized key encapsulation mechanism secure against Shor's algorithm decryption using hard mathematical lattice problems.",
        algorithms: "Module-LWR / Kyber-512",
        status: "Production Ready (Being integrated by Google, Cloudflare, Signal)",
        businessImpact: "Zero-downtime transition for cloud servers to resist future quantum decryption."
      }
    ]
  },
  {
    letter: "E",
    title: "Electronics & Semiconductor Design",
    items: [
      {
        name: "Silicon Spin Qubit Simulation",
        desc: "Modelling electron spin states in silicon quantum dots. Eliminates physical cryogenic prototyping delays.",
        algorithms: "VQE (Variational Quantum Eigensolver), Density Functional Theory (DFT)",
        status: "Lab Testing (Intel, QuTech)",
        businessImpact: "Accelerates semiconductor R&D by 5x, reducing fabrication cycle costs by millions."
      },
      {
        name: "Nanoscale Heat Dissipation Optimization",
        desc: "Optimizing thermal layouts in modern 2nm and 3nm silicon transistors to prevent heating hotspots.",
        algorithms: "Quantum Annealing (QAOA), Tensor Network Simulations",
        status: "Experimental NISQ Pilot",
        businessImpact: "Increases processing power efficiency of consumer CPUs by 30%."
      }
    ]
  },
  {
    letter: "F",
    title: "Finance",
    items: [
      {
        name: "Portfolio Arbitrage & Optimization",
        desc: "Selecting the highest-yielding asset ratios within strict risk limits from millions of possibilities.",
        algorithms: "Quantum Approximate Optimization Algorithm (QAOA)",
        status: "NISQ Pilot (JPMorgan Chase, Goldman Sachs)",
        businessImpact: "Boosts trading returns by 1.2% to 2.5% compared to classical asset selectors."
      },
      {
        name: "Monte Carlo Risk Simulation",
        desc: "Evaluating financial portfolios for rare 'black swan' market crash probabilities.",
        algorithms: "Quantum Amplitude Estimation (QAE)",
        status: "Theoretical / Small Qubit Lab Testing",
        businessImpact: "Speeds up overnight risk calculations from 8 hours to 3 minutes."
      }
    ]
  },
  {
    letter: "S",
    title: "Space & Aerospace Systems",
    items: [
      {
        name: "Satellite-to-Ground QKD links",
        desc: "Setting up secure quantum keys via laser communication corridors from low-earth-orbit (LEO) satellites.",
        algorithms: "BB84 protocol, Entanglement swaps",
        status: "Lab Testing & Active Pilots (ISRO, Chinese Academy of Sciences)",
        businessImpact: "Secures government and military satellite communication grids from signal interception."
      },
      {
        name: "Aerospace Structural Alloy Synthesis",
        desc: "Designing lightweight, high-temperature composite materials for spacecraft hulls and jet turbines.",
        algorithms: "Ab initio Molecular Dynamics (MD), VQE",
        status: "Lab Testing (Boeing, Airbus)",
        businessImpact: "Reduces satellite weight by 15%, saving $1.2M in launch fuel per satellite."
      }
    ]
  }
];

export const MCKINSEY_ADVISORY_DECK = {
  geopoliticalConflicts: [
    {
      scenario: "Taiwan Strait Semiconductor Shock",
      likelihood: "Medium-High",
      impact: "Catastrophic ($10T+ Global Loss)",
      quantumImplication: "90% of global cryogenic control chips and silicon wafers are manufactured in Taiwan. A supply lock would delay superconducting and silicon spin quantum computer scaling timelines by 5 to 7 years.",
      actionPlan: "Establish domestic semiconductor packaging fabs (e.g., C-DAC and ISRO partnering with India Semiconductor Mission in Gujarat)."
    },
    {
      scenario: "Cryogenic Isotope Scarcity (Helium-3 / Silicon-28)",
      likelihood: "High",
      impact: "Severe ($500M Research Delay)",
      quantumImplication: "Helium-3 (required to cool dilution refrigerators to 10mK) is extremely rare, with major stocks located in Russia and US government reserves. Recent export sanctions threaten private lab hardware operations.",
      actionPlan: "Investment in closed-loop recycling dilution systems (Bluefors/CSIR) and optical neutral atom hardware that bypasses helium reliance."
    }
  ],
  naturalDisasters: [
    {
      disaster: "Climate-Induced Electrical Grid Failure",
      quantumSolution: "Quantum-Enhanced Disaster Grid Recovery",
      desc: "Using quantum annealing algorithms to solve multi-variable power routing problems across states during extreme hurricane or heatwave grid collapses.",
      benefit: "Reduces grid recovery times from days to minutes, protecting emergency critical healthcare infrastructure."
    },
    {
      disaster: "Supply Chain Transit Blockades (e.g., Suez Canal / Hurricanes)",
      quantumSolution: "Dynamic Maritime Routing Refinement",
      desc: "Using QAOA to calculate real-time ocean cargo rerouting during blockades, accounting for fuel capacity, storms, and port delays.",
      benefit: "Saves global retail supply chains an estimated $4B annually in shipping delays."
    }
  ],
  governmentPolicies: [
    {
      policy: "US Bureau of Industry and Security Export Controls (2024)",
      scope: "Export bans on quantum processors exceeding 34 logical qubits or gate fidelities over 99.9%.",
      effect: "Restricts global academic access to cutting-edge cloud QPUs, forcing non-US nations to accelerate domestic hardware fabrication."
    },
    {
      policy: "India's National Quantum Mission (NQM) Directive (2023-2031)",
      scope: "₹6,003 Crore funding for building 50-1000 physical qubit processors.",
      effect: "Establishes sovereign technology ownership, preventing reliance on foreign-controlled cloud networks for defense data processing."
    }
  ]
};

export const ADVISORY_FIRMS = [
  {
    id: "mckinsey",
    name: "McKinsey & Company",
    type: "Strategy & Advisory",
    logoColor: "text-blue-400",
    coreFocus: "QuantumBlack (Advanced Analytics), Business Use-Case Modeling, Geopolitical Risk & IP Shielding",
    marketShare: "42% Strategy Market Share",
    leadPartners: ["Niko Mohr", "Lari Hämäläinen", "Michael Kuhns"],
    comparisonMetrics: {
      deliveryModel: "Top-Down Executive Advisory",
      clientTarget: "Fortune 500 C-Suite & Sovereign Agencies",
      maturityRating: "9.2/10 Strategic Vision",
      itIntegrationCap: "Moderate (Relies on partners for physical deployment)"
    },
    swot: {
      strengths: [
        "Gold-standard C-Suite advisory credentials and executive level penetration.",
        "QuantumBlack data scientists integrated directly into advisory sprints.",
        "Deep strategic partnerships with hardware leaders (IBM, Google)."
      ],
      weaknesses: [
        "Higher cost structure ($1M+ engagement baseline) compared to general firms.",
        "Lacks bottom-up IT systems integration developers to configure physical secure servers.",
        "Heavy reliance on client internal teams for software stack implementation."
      ],
      opportunities: [
        "Unveiling sovereign advisory blueprints for NQM and European funding commissions.",
        "Monopolizing post-quantum cryptography (PQC) transition readiness audits.",
        "Co-authoring industry vertical templates for financial portfolio optimization."
      ],
      threats: [
        "Rising capability of boutique quantum advisory firms charging lower fees.",
        "Fast-scaling capability of Big Four firms expanding into high-level strategy.",
        "Internal brain-drain to venture-backed quantum software startups."
      ]
    }
  },
  {
    id: "kpmg",
    name: "KPMG International",
    type: "IT Implementation & Audit",
    logoColor: "text-indigo-400",
    coreFocus: "Enterprise Integration, Cryptographic Infrastructure Audits, PQC Compliance, and Systems Architecture",
    marketShare: "38% Implementation Market Share",
    leadPartners: ["Bent Dalager", "Dr. Sarah McCarthy", "Marcus Henderson"],
    comparisonMetrics: {
      deliveryModel: "Bottom-Up Technology Integration",
      clientTarget: "CISOs, IT Operations, and Security Administrators",
      maturityRating: "9.5/10 Technical Execution",
      itIntegrationCap: "High (Specialists in secure server configuration)"
    },
    swot: {
      strengths: [
        "Large global pool of certified security systems integrators and systems architects.",
        "Proprietary cryptographic asset scanning tools (KPMG Cryptographic Inventory Tool).",
        "Deep audit credentials with international regulatory standard agencies."
      ],
      weaknesses: [
        "Historically perceived as compliance/audit-centric rather than visionary strategy creators.",
        "Slower entry into high-level quantum algorithm physics research.",
        "Lighter integration with primary hardware lab developer networks."
      ],
      opportunities: [
        "Becoming the prime integrator for public sector database migrations to NIST PQC.",
        "Expanding compliance services for EU Cyber Resilience Act quantum clauses.",
        "Offering managed security service provider (MSSP) quantum-key monitoring."
      ],
      threats: [
        "Automated software scanning tools reducing audit consulting hours.",
        "Hyperscalers (AWS, Azure) launching native built-in PQC compliance checkers.",
        "Talent shortage in physical RF and quantum networking systems engineers."
      ]
    }
  }
];
