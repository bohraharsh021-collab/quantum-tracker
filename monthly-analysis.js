import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('src/data/telemetryDb.json');
const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1521482588806578196/-l6KOkfUBVcAh0xtLDqg0geSz7QyaTxKCHlphhoEKlr84YDqmVqB-ILYXmoFlsDUO_Fa';

async function runAnalysis() {
  console.log('Initiating Monthly Telemetry Data Analysis...');
  
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
  
  // 1. Group by Country
  const countries = {};
  // 2. Group by Tech Platform
  const technologies = {};
  // 3. Group by Organization Mentions
  const organizations = {};
  // 4. Group by Org Type
  const orgTypes = {};

  targetSet.forEach(art => {
    const c = art.country || 'Global';
    countries[c] = (countries[c] || 0) + 1;

    const t = art.technology || 'Hardware Platforms';
    technologies[t] = (technologies[t] || 0) + 1;

    const o = art.organization || 'Global Ecosystem';
    organizations[o] = (organizations[o] || 0) + 1;

    const ot = art.organizationType || 'Startup';
    orgTypes[ot] = (orgTypes[ot] || 0) + 1;
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
  const orgChart = generateASCIIBarChart(organizations, 6);

  // Compile Report Content
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
    `🏢 TOP ACTIVE ORGANIZATIONS\n` +
    `------------------------------------------------------------------\n` +
    `${orgChart}\n` +
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
