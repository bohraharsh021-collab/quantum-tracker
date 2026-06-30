import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const newsPath = path.resolve('src/data/news.json');
const dbPath = path.resolve('src/data/telemetryDb.json');

if (!fs.existsSync(newsPath)) {
  console.log("No historical news.json found to migrate.");
  process.exit(0);
}

const oldArticles = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
let dbArticles = [];
if (fs.existsSync(dbPath)) {
  dbArticles = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

console.log(`Loaded ${oldArticles.length} historical articles and ${dbArticles.length} active telemetry articles.`);

let migratedCount = 0;

oldArticles.forEach(oldArt => {
  const title = oldArt.title || oldArt.headline || '';
  if (!title) return;

  // Check if already exists in telemetry DB
  if (dbArticles.some(art => art.title === title || art.url === oldArt.link)) {
    return;
  }

  const summary = oldArt.summary || '';
  const contentStr = (title + ' ' + summary).toLowerCase();

  // Normalize Country
  let country = oldArt.country || 'Global';
  if (country === 'United States of America' || country === 'USA') country = 'United States of America';

  // Normalize Org
  let org = 'Global Ecosystem';
  if (contentStr.includes('ibm')) org = 'IBM';
  else if (contentStr.includes('google')) org = 'Google Quantum AI';
  else if (contentStr.includes('microsoft')) org = 'Microsoft Quantum';
  else if (contentStr.includes('quantinuum')) org = 'Quantinuum';
  else if (contentStr.includes('ionq')) org = 'IonQ';
  else if (contentStr.includes('rigetti')) org = 'Rigetti Computing';
  else if (contentStr.includes('d-wave')) org = 'D-Wave Systems';
  else if (contentStr.includes('quera')) org = 'QuEra Computing';
  else if (contentStr.includes('qnu')) org = 'QNu Labs';
  else if (contentStr.includes('qpiai')) org = 'QpiAI';

  let orgType = 'Startup';
  if (['IBM', 'Google Quantum AI', 'Microsoft Quantum', 'D-Wave Systems'].includes(org)) orgType = 'Corporation';
  else if (['IISc', 'TIFR', 'IIT Madras', 'IIT Bombay', 'MIT', 'Harvard University'].some(ac => org.includes(ac))) orgType = 'Academia';

  // Technology & Qubit Method
  let tech = 'Hardware Platforms';
  let qubitMethod = 'Other';
  if (contentStr.includes('superconducting') || contentStr.includes('transmon') || contentStr.includes('qubit')) {
    tech = 'Superconducting';
    qubitMethod = 'Superconducting Transmons';
  } else if (contentStr.includes('trapped ion') || contentStr.includes('ion trap')) {
    tech = 'Trapped Ion';
    qubitMethod = 'Trapped Ions';
  } else if (contentStr.includes('neutral atom') || contentStr.includes('rydberg')) {
    tech = 'Neutral Atom';
    qubitMethod = 'Neutral Atoms / Rydberg Arrays';
  } else if (contentStr.includes('photonic')) {
    tech = 'Photonic';
    qubitMethod = 'Photonic / Linear Optical';
  }

  // Application
  let application = 'General Quantum';
  if (contentStr.includes('crypto') || contentStr.includes('qkd') || contentStr.includes('security')) {
    application = 'Post-Quantum Cryptography & QKD';
  }

  const migratedArt = {
    uuid: crypto.randomUUID(),
    title,
    summary,
    source: oldArt.source || 'Historical News',
    rssFeed: oldArt.rssFeed || '',
    category: oldArt.category || 'industry',
    country,
    organization: org,
    organizationType: orgType,
    technology: tech,
    processor: oldArt.processor || 'None',
    qubitMethod,
    application,
    procurement: oldArt.procurement || false,
    funding: oldArt.funding || false,
    partnership: oldArt.partnership || false,
    pubDate: oldArt.timestamp || oldArt.pubDate || new Date().toISOString(),
    tags: oldArt.tags || ['quantum', country.toLowerCase()],
    url: oldArt.link || oldArt.url || ''
  };

  dbArticles.push(migratedArt);
  migratedCount++;
});

// Sort by date newest first
dbArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

fs.writeFileSync(dbPath, JSON.stringify(dbArticles, null, 2));
console.log(`Successfully migrated ${migratedCount} historical articles into ${dbPath}. Total articles in database: ${dbArticles.length}`);
