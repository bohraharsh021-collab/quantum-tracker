import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const parser = new Parser({
  timeout: 60000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/rdf+xml, application/xml;q=0.9, text/xml;q=0.8'
  }
});

const FEEDS = [
  // Category 1: Academic & Pre-Print
  { name: 'arXiv (quant-ph)', url: 'https://export.arxiv.org/rss/quant-ph', category: 'academic' },
  { name: 'Nature: npj Quantum Information', url: 'https://www.nature.com/npjqi.rss', category: 'academic' },
  { name: 'IQC Waterloo', url: 'https://uwaterloo.ca/institute-for-quantum-computing/feed', category: 'academic' },
  { name: 'Fermilab: Quantum Computing', url: 'https://news.fnal.gov/tag/quantum-computing/feed/', category: 'academic' },
  
  // Category 2: Industry & Market Intelligence
  { name: 'The Quantum Insider', url: 'https://thequantuminsider.com/feed/', category: 'industry' },
  { name: 'Quantum Computing Report', url: 'https://quantumcomputingreport.com/feed/', category: 'industry' },
  { name: 'IQT News', url: 'https://www.insidequantumtechnology.com/feed/', category: 'industry' },
  { name: 'Post-Quantum Security', url: 'https://postquantum.com/feed/', category: 'industry' },
  
  // Category 3: General Science & Engineering
  { name: 'Phys.org: Quantum Physics', url: 'https://phys.org/rss-feed/physics-news/quantum-physics/', category: 'science' },
  { name: 'ScienceDaily: Quantum', url: 'https://www.sciencedaily.com/rss/matter_energy/quantum_computers.xml', category: 'science' },
  { name: 'MIT Tech Review: Computing', url: 'https://www.technologyreview.com/topic/computing/feed', category: 'science' },
  { name: 'NextBigFuture: Quantum', url: 'https://www.nextbigfuture.com/tag/quantum-computing/feed', category: 'science' },

  // Category 4: Government & Policy
  { name: 'NIST Quantum', url: 'https://www.nist.gov/blogs/taking-measure/rss.xml', category: 'government' },
  { name: 'EU Digital Strategy', url: 'https://digital-strategy.ec.europa.eu/en/rss.xml', category: 'government' },
  { name: 'India DST News', url: 'https://dst.gov.in/rss.xml', category: 'government' },
  { name: 'UK NQCC News', url: 'https://www.nqcc.ac.uk/feed/', category: 'government' },
  { name: 'India Science Wire', url: 'https://vigyanprasar.gov.in/isw/rss-feed.xml', category: 'government' },

  // Category 5: Company & Startup
  { name: 'IBM Quantum Blog', url: 'https://www.ibm.com/quantum/blog/rss', category: 'company' },
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/', category: 'company' },
  { name: 'IonQ Blog', url: 'https://ionq.com/resources/rss.xml', category: 'startup' },
  { name: 'Rigetti Computing', url: 'https://www.rigetti.com/blog-feed.xml', category: 'startup' },
  { name: 'QpiAI News', url: 'https://www.qpiai.tech/blog-feed.xml', category: 'startup' }
];

const POSITIVE_LEXICON = {
  'breakthrough': 2.5, 'milestone': 2.0, 'supremacy': 2.0, 'advantage': 2.0,
  'record-breaking': 2.5, 'record': 1.5, 'success': 1.5, 'successful': 1.5,
  'successfully': 1.5, 'progress': 1.5, 'advance': 1.5, 'advanced': 1.5,
  'advancement': 1.5, 'scalable': 2.0, 'scaling': 1.5, 'pioneer': 1.5,
  'pioneering': 1.5, 'solve': 1.5, 'solved': 1.5, 'solving': 1.5,
  'revolution': 2.0, 'revolutionary': 2.0, 'innovative': 1.5, 'innovation': 1.5,
  'efficient': 1.5, 'efficiency': 1.5, 'optimized': 1.5, 'optimization': 1.5,
  'improve': 1.5, 'improved': 1.5, 'improvement': 1.5, 'enhance': 1.5,
  'enhanced': 1.5, 'enhancement': 1.5, 'exceed': 1.5, 'exceeded': 1.5,
  'funding': 1.5, 'invest': 1.5, 'investment': 1.5, 'commercial': 1.5,
  'commercialize': 1.5, 'commercialization': 1.5, 'partner': 1.5, 'partnership': 1.5,
  'collaboration': 1.5, 'collaborate': 1.5, 'launch': 1.5, 'launched': 1.5,
  'unveil': 1.5, 'unveiled': 1.5, 'demonstrate': 1.5, 'demonstrated': 1.5,
  'demonstration': 1.5, 'robust': 1.5, 'fidelity': 2.0, 'high-fidelity': 2.5,
  'landmark': 2.0, 'gain': 1.0, 'growth': 1.0, 'boost': 1.0, 'accelerate': 1.5,
  'accelerated': 1.5
};

const NEGATIVE_LEXICON = {
  'decoherence': 2.0, 'noise': 1.5, 'error': 1.5, 'errors': 1.5,
  'setback': 2.5, 'delay': 2.0, 'delayed': 2.0, 'struggle': 1.5,
  'struggling': 1.5, 'limit': 1.5, 'limitation': 1.5, 'limitations': 1.5,
  'bottleneck': 2.0, 'fail': 2.0, 'failure': 2.5, 'failed': 2.0,
  'loss': 1.5, 'lose': 1.5, 'threat': 2.0, 'risk': 1.5, 'risks': 1.5,
  'bug': 1.5, 'bugs': 1.5, 'flaw': 1.5, 'flaws': 1.5, 'drawback': 1.5,
  'drawbacks': 1.5, 'expensive': 1.5, 'costly': 1.5, 'slow': 1.0,
  'slower': 1.0, 'unstable': 2.0, 'instability': 2.0, 'challenge': 1.0,
  'challenges': 1.0, 'challenging': 1.0, 'obstacle': 1.5, 'obstacles': 1.5,
  'skeptical': 2.0, 'skepticism': 2.5, 'hype': 2.0, 'overhyped': 2.5,
  'exaggeration': 2.0, 'warning': 2.0, 'caution': 1.5, 'dispute': 1.5,
  'disputed': 1.5, 'concern': 1.5, 'concerns': 1.5, 'critical': 1.0,
  'vulnerability': 2.0, 'vulnerabilities': 2.0
};

async function fetchNews() {
  console.log('Build-time News Fetching Initiated...');
  const compiledArticles = [];

  for (const feed of FEEDS) {
    try {
      console.log(`Fetching: ${feed.name}`);
      const feedData = await parser.parseURL(feed.url);
      const items = feedData.items || [];

      for (let i = 0; i < Math.min(items.length, 20); i++) {
        const item = items[i];
        const title = item.title || '';
        const link = item.link || '';
        const pubDate = item.pubDate || item.isoDate || new Date().toISOString();
        const contentSnippet = item.contentSnippet || item.summary || '';

        // Clean content description snippet
        const cleanDesc = contentSnippet.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 180) + '...';

        // Check if content matches quantum computing topic parameters
        const contentStr = (title + ' ' + cleanDesc).toLowerCase();
        const bypassCategories = ['academic', 'government', 'company', 'startup'];
        const isQuantum = 
          bypassCategories.includes(feed.category) ||
          contentStr.includes('quantum') || 
          contentStr.includes('qubit') || 
          contentStr.includes('cryptography') || 
          contentStr.includes('decoherence');

        if (!isQuantum) continue;

        // Score Sentiment
        let score = 0;
        Object.entries(POSITIVE_LEXICON).forEach(([word, weight]) => {
          if (contentStr.includes(word)) score += weight;
        });
        Object.entries(NEGATIVE_LEXICON).forEach(([word, weight]) => {
          if (contentStr.includes(word)) score -= weight;
        });

        let sentiment = 'neutral';
        if (score > 1.5) sentiment = 'positive';
        else if (score < -1.5) sentiment = 'negative';
        else if (Math.abs(score) > 0.5) sentiment = 'mixed';

        // Country detection
        let country = 'Global';
        if (contentStr.includes('india') || contentStr.includes('bangalore') || contentStr.includes('mumbai') || contentStr.includes('chennai')) {
          country = 'India';
        } else if (contentStr.includes('google') || contentStr.includes('ibm') || contentStr.includes('usa') || contentStr.includes('america')) {
          country = 'United States of America';
        } else if (contentStr.includes('china') || contentStr.includes('ustc') || contentStr.includes('hefei')) {
          country = 'China';
        } else if (contentStr.includes('uk') || contentStr.includes('london') || contentStr.includes('oxford')) {
          country = 'United Kingdom';
        }

        let timestamp = new Date().toISOString();
        try {
          if (pubDate) {
            const parsedDate = new Date(pubDate);
            if (!isNaN(parsedDate.getTime())) {
              timestamp = parsedDate.toISOString();
            }
          }
        } catch (e) {}

        compiledArticles.push({
          id: `build-${i}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          headline: title,
          source: feed.name,
          timestamp,
          summary: cleanDesc,
          sentiment,
          reliability: 4,
          topic: contentStr.includes('crypto') || contentStr.includes('key') ? 'Cryptography' : 'Hardware',
          keywords: ['quantum', country.toLowerCase()],
          country,
          link
        });
      }
    } catch (err) {
      console.error(`Failed to parse feed ${feed.name}:`, err.message);
    }
  }

  // Merge with existing news.json to accumulate history over time
  const outputPath = path.resolve('src/data/news.json');
  let combinedArticles = [];
  try {
    if (fs.existsSync(outputPath)) {
      const raw = fs.readFileSync(outputPath, 'utf8');
      combinedArticles = JSON.parse(raw);
    }
  } catch (err) {
    console.log("No existing news.json found or failed to parse, starting fresh.");
  }

  // Add new articles if they are not already in news.json (deduplicated by headline)
  compiledArticles.forEach(newItem => {
    if (!combinedArticles.some(oldItem => oldItem.headline === newItem.headline)) {
      combinedArticles.push(newItem);
    }
  });

  // Sort by newest first
  combinedArticles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Keep a rolling history of up to 1000 articles
  const MAX_HISTORY = 1000;
  if (combinedArticles.length > MAX_HISTORY) {
    combinedArticles = combinedArticles.slice(0, MAX_HISTORY);
  }

  const tempPath = outputPath + '.tmp';
  try {
    fs.writeFileSync(tempPath, JSON.stringify(combinedArticles, null, 2));
    fs.renameSync(tempPath, outputPath);
    console.log(`Successfully compiled and wrote ${combinedArticles.length} articles (including history) to: ${outputPath}`);
  } catch (err) {
    console.error("Write error occurred during atomic file lock:", err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

fetchNews().then(() => {
  process.exit(0);
}).catch(err => {
  console.error("News Fetching script crash:", err);
  process.exit(1);
});
