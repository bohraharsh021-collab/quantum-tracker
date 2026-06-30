/**
 * Quantum Tracker Dynamic Override Parser
 * Scans fetched news headlines and summaries for hardware breakthroughs,
 * commercial defense procurement deals, and research alliances.
 * Updates all database tables automatically and free of charge.
 */

export function getDynamicNewsOverrides(articles = []) {
  const overrides = {
    indiaQubits: null,
    indiaStatus: null,
    newProcessors: [],
    newProcurements: [],
    newAlliances: [],
    newVCFunding: []
  };

  if (!articles || articles.length === 0) return overrides;

  const processedHeadlines = new Set();

  articles.forEach((art, index) => {
    const headline = (art.headline || '').trim();
    if (processedHeadlines.has(headline.toLowerCase())) return;
    processedHeadlines.add(headline.toLowerCase());

    const summary = (art.summary || '').trim();
    const content = (headline + ' ' + summary).toLowerCase();
    const dateStr = art.timestamp ? new Date(art.timestamp).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    // ==========================================
    // 1. SCAN FOR QUBIT BREAKTHROUGHS (India/QpiAI)
    // ==========================================
    if (
      (content.includes('india') || content.includes('qpiai') || content.includes('nqm') || content.includes('tifr')) &&
      (content.includes('qubit') || content.includes('qpu') || content.includes('processor'))
    ) {
      const match = content.match(/(\d+)\s*-?\s*qubit/);
      if (match) {
        const qubitsValue = parseInt(match[1]);
        if (qubitsValue > 8 && qubitsValue < 2000) {
          if (!overrides.indiaQubits || qubitsValue > overrides.indiaQubits) {
            overrides.indiaQubits = qubitsValue;
            overrides.indiaStatus = "Active (NQM Breakthrough)";
          }
        }
      }
    }

    // ==========================================
    // 2. SCAN FOR NEW PROCESSOR ANNOUNCEMENTS
    // ==========================================
    if (
      content.includes('unveil') || 
      content.includes('launch') || 
      content.includes('demonstrate') || 
      content.includes('announce') ||
      content.includes('develop')
    ) {
      const processorMatch = content.match(/(\d+)\s*-?\s*qubit\s+([a-zA-Z0-9\-]+)\s+processor/i) ||
                             content.match(/(\d+)\s*-?\s*qubit\s+([a-zA-Z0-9\-]+)\s+chip/i) ||
                             content.match(/([a-zA-Z0-9\-]+)\s+processor\s+with\s+(\d+)\s+qubit/i);

      if (processorMatch) {
        let name = '';
        let qubits = 0;
        
        if (isNaN(processorMatch[1])) {
          name = processorMatch[1];
          qubits = parseInt(processorMatch[2]);
        } else {
          qubits = parseInt(processorMatch[1]);
          name = processorMatch[2];
        }

        name = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();

        const ignoredNames = ['new', 'logical', 'physical', 'spin', 'ion', 'trap', 'silicon', 'superconducting', 'quantum', 'photonic', 'adiabatic'];
        if (name.length > 2 && !ignoredNames.includes(name.toLowerCase()) && qubits > 2) {
          if (!overrides.newProcessors.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            let manufacturer = "QpiAI India";
            if (content.includes('ibm')) manufacturer = "IBM";
            else if (content.includes('google')) manufacturer = "Google";
            else if (content.includes('ustc') || content.includes('origin')) manufacturer = "USTC / Origin Quantum";
            else if (content.includes('tifr')) manufacturer = "TIFR";
            else if (content.includes('iisc')) manufacturer = "IISc";

            overrides.newProcessors.push({
              name,
              manufacturer,
              qubitType: content.includes('spin') ? "Silicon Spin" : content.includes('photonic') ? "Photonic" : "Superconducting",
              physicalQubits: qubits,
              logicalQubits: content.includes('logical') ? Math.floor(qubits / 10) : 0,
              quantumVolume: Math.pow(2, Math.min(qubits, 12)),
              gateFidelity1Q: "99.95%",
              gateFidelity2Q: "99.20%",
              t1Coherence: 120,
              t2Coherence: 100,
              coolingTemp: content.includes('spin') ? 1000 : 15,
              coolingMethod: content.includes('spin') ? "Helium Flow Cryostat" : "Dilution Refrigerator",
              errorMitigation: "Dynamic Zero Noise Extrapolation (ZNE)",
              devStatus: "Announced via News",
              deploymentModel: "Strategic Cloud/On-Premises",
              energyConsumption: 15,
              clops: 6000,
              launchYear: new Date(art.timestamp).getFullYear() || 2026
            });
          }
        }
      }
    }

    // ==========================================
    // 3. SCAN FOR DYNAMIC CONTRACT PROCUREMENT
    // ==========================================
    if (
      content.includes('contract') || 
      content.includes('purchase') || 
      content.includes('procure') || 
      content.includes('buys') || 
      content.includes('order') ||
      content.includes('deal') ||
      content.includes('awards')
    ) {
      const valueMatch = content.match(/\$\s*(\d+(\.\d+)?)\s*(million|m)/i) || 
                         content.match(/₹\s*(\d+(\.\d+)?)\s*(crore|cr)/i);
      
      if (valueMatch) {
        let numericValue = parseFloat(valueMatch[1]);
        if (content.includes('crore') || content.includes('cr')) {
          numericValue = numericValue * 0.12;
        }

        let buyer = "Ministry of Defense";
        if (content.includes('navy')) buyer = "Indian Navy";
        else if (content.includes('army')) buyer = "Indian Army";
        else if (content.includes('air force')) buyer = "US Air Force";
        else if (content.includes('isro')) buyer = "ISRO India";
        else if (content.includes('drdo')) buyer = "DRDO India";

        let seller = "QNu Labs";
        if (content.includes('qpiai')) seller = "QpiAI India";
        else if (content.includes('infleqtion')) seller = "Infleqtion";
        else if (content.includes('ionq')) seller = "IonQ";
        else if (content.includes('pasqal')) seller = "Pasqal";

        let product = "Quantum Key Distribution (QKD) Hardware";
        if (content.includes('clock')) product = "Atomic Rubidium Clocks";
        else if (content.includes('sensor')) product = "Gravitational Sensor Arrays";
        else if (content.includes('computer')) product = "Quantum Simulator Cluster";

        overrides.newProcurements.push({
          id: `dyn-pr-${index}`,
          buyer,
          seller,
          product,
          value: parseFloat(numericValue.toFixed(2)),
          date: dateStr,
          status: "Active Delivery"
        });
      }
    }

    // ==========================================
    // 4. SCAN FOR STRATEGIC ALLIANCES & PARTNERSHIPS
    // ==========================================
    if (
      content.includes('partner') || 
      content.includes('collaborate') || 
      content.includes('alliance') || 
      content.includes('join forces') || 
      content.includes('pact')
    ) {
      const partnerMatch = headline.match(/([a-zA-Z0-9\s]+)\s+(partners\s+with|collaborates\s+with|signs\s+pact\s+with)\s+([a-zA-Z0-9\s]+)/i) ||
                           headline.match(/([a-zA-Z0-9\s]+)\s+and\s+([a-zA-Z0-9\s]+)\s+announce\s+partnership/i);

      if (partnerMatch) {
        let partnerA = partnerMatch[1].trim();
        let partnerB = partnerMatch[3] ? partnerMatch[3].trim() : partnerMatch[2].trim();

        const wordsA = partnerA.split(' ');
        const wordsB = partnerB.split(' ');
        partnerA = wordsA.slice(-2).join(' ');
        partnerB = wordsB.slice(0, 2).join(' ');

        if (
          partnerA.length > 2 && 
          partnerB.length > 2 && 
          !partnerA.toLowerCase().includes('company') && 
          !partnerB.toLowerCase().includes('company')
        ) {
          overrides.newAlliances.push({
            id: `dyn-al-${index}`,
            partyA: partnerA,
            partyB: partnerB,
            scope: summary.substring(0, 80) || "Collaborative R&D on secure cryptography algorithms and processor hardware.",
            date: dateStr,
            type: "R&D Consortium"
          });
        }
      }
    }

    // ==========================================
    // 5. SCAN FOR VC FUNDING ROUNDS (newVCFunding)
    // ==========================================
    if (
      content.includes('raise') || 
      content.includes('funding') || 
      content.includes('secure') || 
      content.includes('invest') || 
      content.includes('capital') || 
      content.includes('round') ||
      content.includes('valuation')
    ) {
      const valueMatch = content.match(/\$\s*(\d+(\.\d+)?)\s*(million|m)/i) || 
                         content.match(/₹\s*(\d+(\.\d+)?)\s*(crore|cr)/i);
      
      if (valueMatch) {
        let numericValue = parseFloat(valueMatch[1]);
        if (content.includes('crore') || content.includes('cr')) {
          numericValue = numericValue * 0.12; // convert crore INR to million USD
        }

        // Determine startup
        let startup = "Quantum Startup";
        let country = "United States of America"; // default
        
        if (content.includes('qpiai')) { startup = "QpiAI"; country = "India"; }
        else if (content.includes('qnu')) { startup = "QNu Labs"; country = "India"; }
        else if (content.includes('pasqal')) { startup = "Pasqal"; country = "France"; }
        else if (content.includes('xanadu')) { startup = "Xanadu"; country = "Canada"; }
        else if (content.includes('d-wave')) { startup = "D-Wave"; country = "Canada"; }
        else if (content.includes('psiquantum')) { startup = "PsiQuantum"; country = "United States of America"; }
        else if (content.includes('motion')) { startup = "Quantum Motion"; country = "United Kingdom"; }
        else if (content.includes('oqc') || content.includes('oxford quantum')) { startup = "Oxford Quantum Circuits"; country = "United Kingdom"; }
        else if (content.includes('classiq')) { startup = "Classiq"; country = "Israel"; }
        else if (content.includes('q-ctrl')) { startup = "Q-Ctrl"; country = "Australia"; }
        else {
          // Fallback startup name extraction
          const matchStartup = headline.match(/([a-zA-Z0-9\-]+)\s+(raises|secures|announces|gets)/i);
          if (matchStartup && !['quantum', 'startup', 'company', 'firm', 'new'].includes(matchStartup[1].toLowerCase())) {
            startup = matchStartup[1].trim();
            startup = startup.charAt(0).toUpperCase() + startup.slice(1);
          }
        }

        // Determine round
        let round = "Venture Round";
        if (content.includes('series a')) round = "Series A";
        else if (content.includes('series b')) round = "Series B";
        else if (content.includes('series c')) round = "Series C";
        else if (content.includes('series d')) round = "Series D";
        else if (content.includes('seed')) round = "Seed";
        else if (content.includes('pre-series a')) round = "Pre-Series A";

        // Determine investors
        let leadInvestors = "Undisclosed Venture Capitalists";
        const investorMatch = content.match(/led\s+by\s+([a-zA-Z0-9\s,&]+)/i);
        if (investorMatch) {
          const rawInv = investorMatch[1].split(' in ')[0].split(' to ')[0].trim();
          if (rawInv.length > 3 && rawInv.length < 50) {
            leadInvestors = rawInv;
          }
        }

        overrides.newVCFunding.push({
          id: `dyn-vc-${index}`,
          startup,
          country,
          round,
          amount: parseFloat(numericValue.toFixed(2)),
          date: dateStr,
          leadInvestors
        });
      }
    }
  });

  return overrides;
}
