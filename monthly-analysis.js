import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('src/data/telemetryDb.json');
const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1521482588806578196/-l6KOkfUBVcAh0xtLDqg0geSz7QyaTxKCHlphhoEKlr84YDqmVqB-ILYXmoFlsDUO_Fa';

// Custom watchlist companies
const WATCHLIST = ['IBM', 'Google Quantum AI', 'D-Wave Systems', 'Xanadu', 'QNu Labs', 'QpiAI'];

async function runAnalysis() {
  console.log('Initiating Monthly Telemetry Data Analysis with Watchlist & Impact Scopes...');
  
  if (!fs.existsSync(dbPath)) {
    console.error('Telemetry database not found at src/data/telemetryDb.json!');
    process.exit(1);
  }

  const articles = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  // Filter for last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentArticles = articles.filter(art => {
    const pubDate = new Date(art.pubDate);
    return !isNaN(pubDate.getTime()) && pubDate >= thirtyDaysAgo;
  });

  const targetSet = recentArticles.length > 0 ? recentArticles : articles.slice(0, 100);
  const timePeriodLabel = recentArticles.length > 0 ? 'Last 30 Days' : 'Historical Sample (Top 100)';
  
  // Groupings
  const countries = {};
  const technologies = {};
  const organizations = {};
  
  // 1. Impact Categories Counters
  const impactCategories = {
    'Scientific Breakthrough': 0,
    'Commercial Impact': 0,
    'Policy & Infrastructure': 0
  };

  // 2. Watchlist tracking
  const watchlistStats = {};
  WATCHLIST.forEach(org => {
    watchlistStats[org] = { count: 0, highlights: [] };
  });

  targetSet.forEach(art => {
    // Basic counts
    const c = art.country || 'Global';
    countries[c] = (countries[c] || 0) + 1;

    const t = art.technology || 'Hardware Platforms';
    technologies[t] = (technologies[t] || 0) + 1;

    const o = art.organization || 'Global Ecosystem';
    organizations[o] = (organizations[o] || 0) + 1;

    // Impact Tagging Analysis
    const content = `${art.title || ''} ${art.summary || ''}`.toLowerCase();
    
    let isSci = content.includes('qubit') || content.includes('processor') || content.includes('fidelity') || 
                content.includes('coherence') || content.includes('error correction') || content.includes('algorithm') || 
                content.includes('nature') || content.includes('physics') || content.includes('optics');
                
    let isComm = content.includes('raise') || content.includes('funding') || content.includes('million') || 
                 content.includes('crore') || content.includes('investment') || content.includes('deal') || 
                 content.includes('procure') || content.includes('contract') || content.includes('partnership') || 
                 content.includes('collaborate');
                 
    let isPolicy = content.includes('policy') || content.includes('act') || content.includes('government') || 
                   content.includes('dst') || content.includes('nqm') || content.includes('ministry') || 
                   content.includes('consortium') || content.includes('treaty');

    if (isSci) impactCategories['Scientific Breakthrough']++;
    if (isComm) impactCategories['Commercial Impact']++;
    if (isPolicy) impactCategories['Policy & Infrastructure']++;

    // Watchlist matching
    WATCHLIST.forEach(watchedOrg => {
      if (content.includes(watchedOrg.toLowerCase()) || (art.organization && art.organization.toLowerCase() === watchedOrg.toLowerCase())) {
        watchlistStats[watchedOrg].count++;
        if (watchlistStats[watchedOrg].highlights.length < 2) {
          watchlistStats[watchedOrg].highlights.push(art.title);
        }
      }
    });
  });

  // Helper to build ASCII Bar Chart
  function generateASCIIBarChart(dataObj, maxBars = 10) {
    const sorted = Object.entries(dataObj).sort((a, b) => b[1] - a[1]).slice(0, maxBars);
    const maxVal = sorted.length > 0 ? sorted[0][1] : 1;
    const chartLines = sorted.map(([name, val]) => {
      const percentage = Math.round((val / targetSet.length) * 100);
      const barLength = Math.max(1, Math.round((val / maxVal) * 15));
      const bar = '█'.repeat(barLength).padEnd(15, '░');
      return `${name.padEnd(25)} ${bar} ${percentage}% (${val})`;
    });
    return chartLines.join('\n');
  }

  const countryChart = generateASCIIBarChart(countries);
  const techChart = generateASCIIBarChart(technologies);
  const impactChart = generateASCIIBarChart(impactCategories);

  // Format Watchlist Display
  let watchlistText = '';
  Object.entries(watchlistStats).forEach(([org, stats]) => {
    const barLength = Math.min(10, stats.count);
    const bar = '█'.repeat(barLength).padEnd(10, '░');
    watchlistText += `${org.padEnd(20)} ${bar} (${stats.count} mentions)\n`;
    if (stats.highlights.length > 0) {
      stats.highlights.forEach(h => {
        watchlistText += `  ↳ Hype: "${h.substring(0, 70)}..."\n`;
      });
    }
    watchlistText += '\n';
  });

  const monthName = now.toLocaleString('default', { month: 'long' });
  const yearName = now.getFullYear();

  const reportContent = 
    `📊 **QUANTUM INTEL COCKPIT — MONTHLY TELEMETRY REPORT**\n` +
    `📅 *Report Generated: ${monthName} 1st, ${yearName}*\n` +
    `⏱️ *Time Period Analyzed: ${timePeriodLabel}*\n` +
    `- **Total Articles Scanned**: ${targetSet.length}\n` +
    `- **Active Organizations Tracked**: ${Object.keys(organizations).length}\n` +
    `- **Global Regions Active**: ${Object.keys(countries).length}\n\n` +
    `\`\`\`text\n` +
    `📈 SOVEREIGN REGION MENTIONS\n` +
    `------------------------------------------------------------------\n` +
    `${countryChart}\n\n` +
    `🔬 HARDWARE PLATFORM SHARE\n` +
    `------------------------------------------------------------------\n` +
    `${techChart}\n\n` +
    `🎯 CATEGORY IMPACT BREAKDOWN\n` +
    `------------------------------------------------------------------\n` +
    `${impactChart}\n\n` +
    `👀 WATCHLIST OBSERVER\n` +
    `------------------------------------------------------------------\n` +
    `${watchlistText}` +
    `\`\`\``;

  // Send payload to Discord Webhook
  try {
    const payload = {
      username: "Quantum Command Analysis Engine",
      avatar_url: "https://raw.githubusercontent.com/lucide-react/lucide/main/icons/bar-chart-2.svg",
      content: reportContent
    };

    console.log('Publishing monthly report to Discord Webhook...');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(`Discord webhook responded with code ${response.status}`);
      process.exit(1);
    } else {
      console.log('Monthly report posted successfully.');
      process.exit(0);
    }
  } catch (err) {
    console.error("Failed to post monthly report:", err.message);
    process.exit(1);
  }
}

runAnalysis();
