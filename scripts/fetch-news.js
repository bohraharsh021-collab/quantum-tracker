import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const parser = new Parser({
  timeout: 60000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/rdf+xml, application/xml;q=0.9, text/xml;q=0.8'
  }
});

// Entity Normalization mappings
const ORG_NORMALIZATION = {
  'ibm quantum': 'IBM',
  'ibm research': 'IBM',
  'ibm': 'IBM',
  'google quantum ai': 'Google Quantum AI',
  'google ai': 'Google Quantum AI',
  'google': 'Google Quantum AI',
  'microsoft quantum': 'Microsoft Quantum',
  'microsoft': 'Microsoft Quantum',
  'quantinuum': 'Quantinuum',
  'ionq': 'IonQ',
  'rigetti': 'Rigetti Computing',
  'd-wave': 'D-Wave Systems',
  'dwave': 'D-Wave Systems',
  'psiquantum': 'PsiQuantum',
  'quera': 'QuEra Computing',
  'atom computing': 'Atom Computing',
  'infleqtion': 'Infleqtion',
  'xanadu': 'Xanadu',
  'iqm': 'IQM Quantum',
  'orca computing': 'ORCA Computing',
  'orca': 'ORCA Computing',
  'alice & bob': 'Alice & Bob',
  'alice and bob': 'Alice & Bob',
  'oxford quantum circuits': 'Oxford Quantum Circuits',
  'oqc': 'Oxford Quantum Circuits',
  'pasqal': 'Pasqal',
  'q-ctrl': 'Q-CTRL',
  'qctrl': 'Q-CTRL',
  'riverlane': 'Riverlane',
  'seeqc': 'SeeQC',
  'classiq': 'Classiq',
  'zapata': 'Zapata AI',
  'quantum brilliance': 'Quantum Brilliance',
  'iisc': 'IISc Bangalore',
  'tifr': 'TIFR Mumbai',
  'iit madras': 'IIT Madras',
  'iitm': 'IIT Madras',
  'iit bombay': 'IIT Bombay',
  'iit kanpur': 'IIT Kanpur',
  'mit': 'MIT',
  'harvard': 'Harvard University',
  'stanford': 'Stanford University',
  'oxford university': 'Oxford University',
  'cambridge university': 'Cambridge University',
  'eth zurich': 'ETH Zurich',
  'epfl': 'EPFL',
  'waterloo': 'University of Waterloo',
  'qutech': 'QuTech Delft',
  'nus': 'National University of Singapore',
  'university of sydney': 'University of Sydney',
  'qnu labs': 'QNu Labs',
  'qnu': 'QNu Labs',
  'c-cdac': 'C-DAC',
  'cdac': 'C-DAC'
};

const ORG_TYPES = {
  'IBM': 'Corporation',
  'Google Quantum AI': 'Corporation',
  'Microsoft Quantum': 'Corporation',
  'D-Wave Systems': 'Corporation',
  'Quantinuum': 'Startup',
  'IonQ': 'Startup',
  'Rigetti Computing': 'Startup',
  'PsiQuantum': 'Startup',
  'QuEra Computing': 'Startup',
  'Atom Computing': 'Startup',
  'Infleqtion': 'Startup',
  'Xanadu': 'Startup',
  'IQM Quantum': 'Startup',
  'ORCA Computing': 'Startup',
  'Alice & Bob': 'Startup',
  'Oxford Quantum Circuits': 'Startup',
  'Pasqal': 'Startup',
  'Q-CTRL': 'Startup',
  'Riverlane': 'Startup',
  'SeeQC': 'Startup',
  'Classiq': 'Startup',
  'Zapata AI': 'Startup',
  'Quantum Brilliance': 'Startup',
  'QNu Labs': 'Startup',
  'QpiAI': 'Startup',
  'IISc Bangalore': 'Academia',
  'TIFR Mumbai': 'Academia',
  'IIT Madras': 'Academia',
  'IIT Bombay': 'Academia',
  'IIT Kanpur': 'Academia',
  'MIT': 'Academia',
  'Harvard University': 'Academia',
  'Stanford University': 'Academia',
  'Oxford University': 'Academia',
  'Cambridge University': 'Academia',
  'ETH Zurich': 'Academia',
  'EPFL': 'Academia',
  'University of Waterloo': 'Academia',
  'QuTech Delft': 'Academia',
  'National University of Singapore': 'Academia',
  'University of Sydney': 'Academia',
  'Press Information Bureau': 'Government',
  'Department of Science & Technology': 'Government',
  'ISRO': 'Government',
  'DRDO': 'Government',
  'C-DAC': 'Government',
  'NIST': 'Government',
  'National Science Foundation': 'Government',
  'Department of Energy': 'Government',
  'UK NQCC': 'Government',
  'European Commission': 'Government'
};

// Simple text similarity check (Levenshtein distance)
function getSimilarity(s1, s2) {
  let longer = s1.toLowerCase();
  let shorter = s2.toLowerCase();
  if (s1.length < s2.length) {
    longer = s2.toLowerCase();
    shorter = s1.toLowerCase();
  }
  let longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  let costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

async function runPipeline() {
  console.log('Initiating ETL Scraper Pipeline v4.0...');
  
  const configPath = path.resolve('src/data/feedsConfig.json');
  const dbPath = path.resolve('src/data/telemetryDb.json');
  
  if (!fs.existsSync(configPath)) {
    console.error('Missing src/data/feedsConfig.json configuration!');
    process.exit(1);
  }
  
  const feeds = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const activeFeeds = feeds.filter(f => f.status === 'active');
  console.log(`Loaded ${activeFeeds.length} active feeds from configuration.`);

  let existingArticles = [];
  try {
    if (fs.existsSync(dbPath)) {
      existingArticles = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (err) {
    console.log('Failed to parse telemetryDb.json, starting fresh.');
  }

  const fetchedArticles = [];
  const feedStats = {
    total: activeFeeds.length,
    success: 0,
    failed: 0,
    failedFeedsList: [],
    duplicatesRemoved: 0
  };

  for (const feed of activeFeeds) {
    try {
      console.log(`Ingesting feed: ${feed.name}`);
      const parsedFeed = await parser.parseURL(feed.url);
      const items = parsedFeed.items || [];
      feedStats.success++;

      for (const item of items) {
        const title = (item.title || '').trim();
        const summaryText = (item.contentSnippet || item.summary || item.content || '').trim();
        const cleanDesc = summaryText.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 240) + '...';
        const link = item.link || '';
        const pubDateStr = item.pubDate || item.isoDate || new Date().toISOString();
        
        const contentStr = (title + ' ' + cleanDesc).toLowerCase();
        
        // Entity: Organization & Type
        let detectedOrg = feed.organization || 'Global Ecosystem';
        for (const [key, normalizedName] of Object.entries(ORG_NORMALIZATION)) {
          if (contentStr.includes(key)) {
            detectedOrg = normalizedName;
            break;
          }
        }
        const detectedOrgType = ORG_TYPES[detectedOrg] || 'Startup';

        // Entity: Country
        let detectedCountry = feed.country || 'Global';
        if (contentStr.includes('india') || contentStr.includes('bangalore') || contentStr.includes('mumbai') || contentStr.includes('iisc') || contentStr.includes('nqm')) {
          detectedCountry = 'India';
        } else if (contentStr.includes('google') || contentStr.includes('ibm') || contentStr.includes('usa') || contentStr.includes('nist') || contentStr.includes('america')) {
          detectedCountry = 'United States of America';
        } else if (contentStr.includes('china') || contentStr.includes('hefei') || contentStr.includes('ustc') || contentStr.includes('wukong')) {
          detectedCountry = 'China';
        } else if (contentStr.includes('uk') || contentStr.includes('london') || contentStr.includes('oxford') || contentStr.includes('quantinuum')) {
          detectedCountry = 'United Kingdom';
        } else if (contentStr.includes('canada') || contentStr.includes('waterloo') || contentStr.includes('xanadu') || contentStr.includes('d-wave')) {
          detectedCountry = 'Canada';
        } else if (contentStr.includes('singapore') || contentStr.includes('cqt') || contentStr.includes('nus')) {
          detectedCountry = 'Singapore';
        } else if (contentStr.includes('japan') || contentStr.includes('riken') || contentStr.includes('toshiba')) {
          detectedCountry = 'Japan';
        } else if (contentStr.includes('germany') || contentStr.includes('munich') || contentStr.includes('delta nl')) {
          detectedCountry = 'Germany';
        }

        // Entity: Technology & Qubit Method
        let tech = 'Hardware Platforms';
        let qubitMethod = 'Other';
        if (contentStr.includes('superconducting') || contentStr.includes('transmon') || contentStr.includes('qubit') || contentStr.includes('heron') || contentStr.includes('condor')) {
          tech = 'Superconducting';
          qubitMethod = 'Superconducting Transmons';
        } else if (contentStr.includes('trapped ion') || contentStr.includes('ion trap') || contentStr.includes('quantinuum') || contentStr.includes('ionq')) {
          tech = 'Trapped Ion';
          qubitMethod = 'Trapped Ions';
        } else if (contentStr.includes('neutral atom') || contentStr.includes('rydberg') || contentStr.includes('quera')) {
          tech = 'Neutral Atom';
          qubitMethod = 'Neutral Atoms / Rydberg Arrays';
        } else if (contentStr.includes('photonic') || contentStr.includes('photon') || contentStr.includes('xanadu')) {
          tech = 'Photonic';
          qubitMethod = 'Photonic / Linear Optical';
        } else if (contentStr.includes('spin qubit') || contentStr.includes('silicon spin') || contentStr.includes('silicon dot')) {
          tech = 'Silicon Spin';
          qubitMethod = 'Silicon Spin Qubits';
        } else if (contentStr.includes('topological') || contentStr.includes('majorana')) {
          tech = 'Topological';
          qubitMethod = 'Topological Qubits';
        } else if (contentStr.includes('diamond') || contentStr.includes('nv center') || contentStr.includes('nitrogen vacancy')) {
          tech = 'NV Diamond';
          qubitMethod = 'Nitrogen-Vacancy Diamond';
        } else if (contentStr.includes('annealing') || contentStr.includes('annealer') || contentStr.includes('d-wave')) {
          tech = 'Quantum Annealing';
          qubitMethod = 'Quantum Annealing';
        }

        // Processor
        let processor = 'None';
        const procMatch = contentStr.match(/(condor|heron|osprey|eagle|sycamore|ankaa|forte|indigen|jiuzhang|aquila|borealis|wukong)/i);
        if (procMatch) {
          processor = procMatch[1].charAt(0).toUpperCase() + procMatch[1].slice(1).toLowerCase();
        }

        // Applications
        let application = 'General Quantum';
        if (contentStr.includes('crypto') || contentStr.includes('key distribution') || contentStr.includes('qkd') || contentStr.includes('post-quantum')) {
          application = 'Post-Quantum Cryptography & QKD';
        } else if (contentStr.includes('drug') || contentStr.includes('molecular') || contentStr.includes('chemical') || contentStr.includes('protein')) {
          application = 'Molecular Drug Discovery';
        } else if (contentStr.includes('portfolio') || contentStr.includes('arbitrage') || contentStr.includes('finance') || contentStr.includes('trading')) {
          application = 'Portfolio & Arbitrage Optimization';
        } else if (contentStr.includes('battery') || contentStr.includes('electrolyte') || contentStr.includes('alloy') || contentStr.includes('composite')) {
          application = 'Battery & Materials Design';
        } else if (contentStr.includes('grid') || contentStr.includes('load balance') || contentStr.includes('power routing')) {
          application = 'Smart Grid Optimization';
        } else if (contentStr.includes('machine learning') || contentStr.includes('qml') || contentStr.includes('neural network')) {
          application = 'Quantum Machine Learning (QML)';
        }

        // Procurement, Funding, Partnerships
        const isProcurement = contentStr.includes('procure') || contentStr.includes('contract') || contentStr.includes('purchase') || contentStr.includes('deal') || contentStr.includes('order') || contentStr.includes('buy') || contentStr.includes('award');
        const isFunding = contentStr.includes('raise') || contentStr.includes('funding') || contentStr.includes('million') || contentStr.includes('crore') || contentStr.includes('seed') || contentStr.includes('series') || contentStr.includes('vc') || contentStr.includes('investment');
        const isPartnership = contentStr.includes('partner') || contentStr.includes('collaborate') || contentStr.includes('alliance') || contentStr.includes('mou') || contentStr.includes('sign') || contentStr.includes('pact');

        // Safe ISO Date string
        let pubDateISO = new Date().toISOString();
        try {
          if (pubDateStr) {
            const d = new Date(pubDateStr);
            if (!isNaN(d.getTime())) {
              pubDateISO = d.toISOString();
            }
          }
        } catch (e) {}

        const article = {
          uuid: crypto.randomUUID(),
          title,
          summary: cleanDesc,
          source: feed.name,
          rssFeed: feed.url,
          category: feed.category,
          country: detectedCountry,
          organization: detectedOrg,
          organizationType: detectedOrgType,
          technology: tech,
          processor,
          qubitMethod,
          application,
          procurement: isProcurement,
          funding: isFunding,
          partnership: isPartnership,
          pubDate: pubDateISO,
          tags: ['quantum', detectedCountry.toLowerCase(), tech.toLowerCase()],
          url: link
        };

        fetchedArticles.push(article);
      }
    } catch (err) {
      console.error(`Feed ingestion failed for ${feed.name}:`, err.message);
      feedStats.failed++;
      feedStats.failedFeedsList.push({ name: feed.name, error: err.message });
    }
  }

  // Merge, Deduplicate and Normalize
  const uniqueArticles = [...existingArticles];
  
  fetchedArticles.forEach(newArt => {
    // Check direct duplication (identical URL or exact title match)
    const isDuplicate = uniqueArticles.some(oldArt => {
      if (oldArt.url === newArt.url || oldArt.title === newArt.title) return true;
      // Levenshtein similarity check (> 0.85 indicates a likely copy/re-syndication)
      if (getSimilarity(oldArt.title, newArt.title) > 0.85) return true;
      return false;
    });

    if (!isDuplicate) {
      uniqueArticles.push(newArt);
    } else {
      feedStats.duplicatesRemoved++;
    }
  });

  // Sort by newest first
  uniqueArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Cap at 10,000 rolling history entries (removing only the oldest)
  const MAX_CAP = 10000;
  let finalArticles = uniqueArticles;
  if (uniqueArticles.length > MAX_CAP) {
    finalArticles = uniqueArticles.slice(0, MAX_CAP);
  }

  // Write telemetry database atomic
  const tempPath = dbPath + '.tmp';
  try {
    fs.writeFileSync(tempPath, JSON.stringify(finalArticles, null, 2));
    fs.renameSync(tempPath, dbPath);
    console.log(`\nETL Sync Complete.`);
    console.log(`Success Feeds: ${feedStats.success}/${feedStats.total}`);
    console.log(`Failed Feeds: ${feedStats.failed}`);
    console.log(`Duplicates Filtered: ${feedStats.duplicatesRemoved}`);
    console.log(`Total Database Size: ${finalArticles.length} / 10,000 articles.`);
  } catch (err) {
    console.error('Failed to write Telemetry database:', err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }

  // Write a simple JSON log file for QAValidationRoom to display Scraper logs
  const qaLogPath = path.resolve('src/data/qaLogs.json');
  const qaLogData = {
    lastRun: new Date().toISOString(),
    feedStats,
    dbSize: finalArticles.length
  };
  try {
    fs.writeFileSync(qaLogPath, JSON.stringify(qaLogData, null, 2));
  } catch (e) {
    console.warn("Failed to write QA validation log file:", e.message);
  }
}

runPipeline().then(() => {
  process.exit(0);
}).catch(err => {
  console.error("Fatal Scraper pipeline crash:", err);
  process.exit(1);
});
