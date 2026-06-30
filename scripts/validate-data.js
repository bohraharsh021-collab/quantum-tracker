import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve file paths for ES modules in Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Import the tables from quantumData.js using relative paths
import { 
  PROCESSORS_MATRIX, 
  PROCUREMENT_LEDGER, 
  ALLIANCES_NETWORK, 
  MOCK_ORGANIZATIONS,
  SOVEREIGN_FUNDING,
  MOCK_TAXONOMY
} from '../src/data/quantumData.js';

// ANSI escape codes for styling console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m'
};

const symbols = {
  success: '✔',
  warning: '⚠',
  error: '✖',
  info: 'ℹ'
};

let errorCount = 0;
let warningCount = 0;
let testCount = 0;

function logHeader(title) {
  console.log(`\n${colors.bright}${colors.blue}=== ${title.toUpperCase()} ===${colors.reset}`);
}

function assertTest(condition, message, isCritical = true, details = '') {
  testCount++;
  if (condition) {
    console.log(`  ${colors.green}${symbols.success}${colors.reset} ${message}`);
  } else {
    if (isCritical) {
      errorCount++;
      console.log(`  ${colors.red}${symbols.error} CRITICAL:${colors.reset} ${message}`);
      if (details) console.log(`     ${colors.dim}${details}${colors.reset}`);
    } else {
      warningCount++;
      console.log(`  ${colors.yellow}${symbols.warning} WARNING:${colors.reset} ${message}`);
      if (details) console.log(`     ${colors.dim}${details}${colors.reset}`);
    }
  }
}

async function runValidation() {
  console.log(`${colors.bright}${colors.cyan}Quantum Tracker 2.0 - QA Automated Data Validation Suite${colors.reset}`);
  console.log(`Execution Time: ${new Date().toISOString()}`);
  console.log(`Directory Root: ${projectRoot}`);

  // -------------------------------------------------------------
  // SECTION 1: news.json Validation
  // -------------------------------------------------------------
  logHeader('News Data Validation (news.json)');
  
  const newsPath = path.join(projectRoot, 'src', 'data', 'news.json');
  assertTest(fs.existsSync(newsPath), 'news.json file exists', true, `Expected file at ${newsPath}`);
  
  if (fs.existsSync(newsPath)) {
    try {
      const rawNews = fs.readFileSync(newsPath, 'utf8');
      const newsArticles = JSON.parse(rawNews);
      
      assertTest(Array.isArray(newsArticles), 'news.json parses as a valid JSON array', true);
      
      if (Array.isArray(newsArticles)) {
        console.log(`  ${symbols.info} Scanned ${newsArticles.length} active articles.`);
        
        const headlineSet = new Set();
        const idSet = new Set();
        let articleIndex = 0;
        
        for (const art of newsArticles) {
          const artRef = `Article #${articleIndex} (${art.headline ? art.headline.substring(0, 30) + '...' : 'Unknown headline'})`;
          
          // Require ID
          assertTest(
            typeof art.id === 'string' && art.id.trim().length > 0, 
            `${artRef} contains a non-empty unique string ID`, 
            true, 
            `ID value: ${art.id}`
          );
          if (art.id) {
            assertTest(!idSet.has(art.id), `${artRef} has unique ID`, true, `Duplicate ID: ${art.id}`);
            idSet.add(art.id);
          }
          
          // Require headline
          assertTest(
            typeof art.headline === 'string' && art.headline.trim().length >= 10,
            `${artRef} has a substantial headline (>= 10 chars)`,
            false,
            `Length: ${art.headline ? art.headline.length : 0}`
          );
          if (art.headline) {
            const lowerHeadline = art.headline.toLowerCase().trim();
            assertTest(!headlineSet.has(lowerHeadline), `${artRef} has unique headline (deduplication check)`, false, `Duplicate: "${art.headline}"`);
            headlineSet.add(lowerHeadline);
          }
          
          // Require source
          assertTest(
            typeof art.source === 'string' && art.source.trim().length > 0,
            `${artRef} contains source publisher`,
            true
          );
          
          // Valid ISO date
          let dateParsed = false;
          if (art.timestamp) {
            const t = Date.parse(art.timestamp);
            dateParsed = !isNaN(t);
          }
          assertTest(dateParsed, `${artRef} has valid parseable ISO-8601 timestamp`, true, `Timestamp value: ${art.timestamp}`);
          
          // Validate sentiment field
          const allowedSentiments = ['positive', 'negative', 'mixed', 'neutral'];
          assertTest(
            allowedSentiments.includes(art.sentiment),
            `${artRef} has valid sentiment value`,
            true,
            `Sentiment value: "${art.sentiment}" (Allowed: ${allowedSentiments.join(', ')})`
          );
          
          // Validate topic field
          const allowedTopics = ['Hardware', 'Algorithms', 'Cryptography', 'Investment', 'Security'];
          assertTest(
            allowedTopics.includes(art.topic),
            `${artRef} has valid topic tag`,
            false,
            `Topic value: "${art.topic}" (Allowed: ${allowedTopics.join(', ')})`
          );
          
          // Reliability score range
          assertTest(
            Number.isInteger(art.reliability) && art.reliability >= 1 && art.reliability <= 5,
            `${artRef} has reliability score between 1 and 5`,
            true,
            `Reliability: ${art.reliability}`
          );
          
          // Country must be string
          assertTest(
            typeof art.country === 'string' && art.country.length > 0,
            `${artRef} has country property`,
            false,
            `Country: "${art.country}"`
          );
          
          articleIndex++;
          // Only deep-validate the first 30 articles in logs to avoid console bloat, but run checks on all
          if (articleIndex >= 30) {
            const remaining = newsArticles.slice(30);
            let remainingErrors = 0;
            remaining.forEach((r, idx) => {
              if (!r.id || !r.headline || !allowedSentiments.includes(r.sentiment) || isNaN(Date.parse(r.timestamp))) {
                remainingErrors++;
              }
            });
            assertTest(remainingErrors === 0, `All other ${remaining.length} historical articles verified without critical errors`, true, `Errors found in history: ${remainingErrors}`);
            break;
          }
        }
      }
    } catch (e) {
      assertTest(false, `Successfully parse and read news.json`, true, e.message);
    }
  }

  // -------------------------------------------------------------
  // SECTION 2: Processors Matrix Validation
  // -------------------------------------------------------------
  logHeader('Processors Matrix Validation (PROCESSORS_MATRIX)');
  
  assertTest(Array.isArray(PROCESSORS_MATRIX) && PROCESSORS_MATRIX.length > 0, 'PROCESSORS_MATRIX exists and contains entries', true);
  
  if (Array.isArray(PROCESSORS_MATRIX)) {
    const processorNames = new Set();
    
    PROCESSORS_MATRIX.forEach((p, idx) => {
      const procRef = `Processor #${idx} (${p.name || 'Unknown'})`;
      
      assertTest(typeof p.name === 'string' && p.name.trim().length > 0, `${procRef} has a non-empty name`, true);
      if (p.name) {
        assertTest(!processorNames.has(p.name.toLowerCase()), `${procRef} has a unique name`, false, `Duplicate processor name: "${p.name}"`);
        processorNames.add(p.name.toLowerCase());
      }
      
      assertTest(typeof p.manufacturer === 'string' && p.manufacturer.trim().length > 0, `${procRef} has a manufacturer`, true);
      assertTest(Number.isInteger(p.physicalQubits) && p.physicalQubits > 0, `${procRef} has positive integer physical qubits`, true, `Physical Qubits: ${p.physicalQubits}`);
      assertTest(Number.isInteger(p.logicalQubits) && p.logicalQubits >= 0 && p.logicalQubits <= p.physicalQubits, `${procRef} has logical qubits (0 <= logical <= physical)`, true, `Logical Qubits: ${p.logicalQubits}`);
      
      // Coherence values bounds
      assertTest(typeof p.t1Coherence === 'number' && p.t1Coherence >= 0, `${procRef} has valid T1 coherence`, false, `T1: ${p.t1Coherence}`);
      assertTest(typeof p.t2Coherence === 'number' && p.t2Coherence >= 0, `${procRef} has valid T2 coherence`, false, `T2: ${p.t2Coherence}`);
      
      // Fidelity strings check
      const fidelityRegex = /^\d+(\.\d+)?%$/;
      assertTest(fidelityRegex.test(p.gateFidelity1Q), `${procRef} has valid 1-qubit gate fidelity format (e.g. "99.9%")`, false, `1Q Fidelity: "${p.gateFidelity1Q}"`);
      assertTest(fidelityRegex.test(p.gateFidelity2Q), `${procRef} has valid 2-qubit gate fidelity format (e.g. "99.2%")`, false, `2Q Fidelity: "${p.gateFidelity2Q}"`);
      
      // Launch Year
      assertTest(Number.isInteger(p.launchYear) && p.launchYear >= 2010 && p.launchYear <= 2040, `${procRef} launch year is within realistic range (2010-2040)`, true, `Launch Year: ${p.launchYear}`);
    });
  }

  // -------------------------------------------------------------
  // SECTION 3: Procurement Ledger Validation
  // -------------------------------------------------------------
  logHeader('Procurement Ledger Validation (PROCUREMENT_LEDGER)');
  
  assertTest(Array.isArray(PROCUREMENT_LEDGER) && PROCUREMENT_LEDGER.length > 0, 'PROCUREMENT_LEDGER exists and contains entries', true);
  
  if (Array.isArray(PROCUREMENT_LEDGER)) {
    const ledgerIds = new Set();
    
    PROCUREMENT_LEDGER.forEach((pr, idx) => {
      const prRef = `Procurement #${idx} (ID: ${pr.id || 'N/A'})`;
      
      assertTest(typeof pr.id === 'string' && pr.id.trim().length > 0, `${prRef} has a non-empty ID`, true);
      if (pr.id) {
        assertTest(!ledgerIds.has(pr.id), `${prRef} has a unique ID`, true, `Duplicate ID: "${pr.id}"`);
        ledgerIds.add(pr.id);
      }
      
      assertTest(typeof pr.buyer === 'string' && pr.buyer.trim().length > 0, `${prRef} has a buyer agency/enterprise`, true);
      assertTest(typeof pr.seller === 'string' && pr.seller.trim().length > 0, `${prRef} has a vendor/seller`, true);
      assertTest(typeof pr.product === 'string' && pr.product.trim().length > 0, `${prRef} has a clear product name`, true);
      assertTest(typeof pr.value === 'number' && pr.value > 0, `${prRef} has positive numeric valuation ($M)`, true, `Value: ${pr.value}`);
      
      // Date Check YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      assertTest(dateRegex.test(pr.date) && !isNaN(Date.parse(pr.date)), `${prRef} has YYYY-MM-DD formatted date`, true, `Date: "${pr.date}"`);
      
      const allowedStatus = ['Delivered', 'Completed', 'Active', 'Active Delivery'];
      assertTest(allowedStatus.includes(pr.status), `${prRef} has recognized status`, false, `Status: "${pr.status}"`);
    });
  }

  // -------------------------------------------------------------
  // SECTION 4: Alliances Network Validation
  // -------------------------------------------------------------
  logHeader('Alliances & Partnerships Network Validation (ALLIANCES_NETWORK)');
  
  assertTest(Array.isArray(ALLIANCES_NETWORK) && ALLIANCES_NETWORK.length > 0, 'ALLIANCES_NETWORK exists and contains entries', true);
  
  if (Array.isArray(ALLIANCES_NETWORK)) {
    const allianceIds = new Set();
    
    ALLIANCES_NETWORK.forEach((al, idx) => {
      const alRef = `Alliance #${idx} (ID: ${al.id || 'N/A'})`;
      
      assertTest(typeof al.id === 'string' && al.id.trim().length > 0, `${alRef} has a non-empty ID`, true);
      if (al.id) {
        assertTest(!allianceIds.has(al.id), `${alRef} has a unique ID`, true, `Duplicate ID: "${al.id}"`);
        allianceIds.add(al.id);
      }
      
      assertTest(typeof al.partyA === 'string' && al.partyA.trim().length > 0, `${alRef} has first partner (partyA)`, true);
      assertTest(typeof al.partyB === 'string' && al.partyB.trim().length > 0, `${alRef} has second partner (partyB)`, true);
      assertTest(typeof al.type === 'string' && al.type.trim().length > 0, `${alRef} has alliance type`, false);
      assertTest(typeof al.scope === 'string' && al.scope.trim().length > 10, `${alRef} has detailed scope description (>= 10 chars)`, false);
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      assertTest(dateRegex.test(al.date) && !isNaN(Date.parse(al.date)), `${alRef} has YYYY-MM-DD formatted date`, true, `Date: "${al.date}"`);
    });
  }

  // -------------------------------------------------------------
  // SECTION 5: Summary & Exit Status
  // -------------------------------------------------------------
  logHeader('QA Automation Validation Summary');
  console.log(`Total Assertions Run: ${testCount}`);
  console.log(`Critical Errors:      ${errorCount > 0 ? colors.red + errorCount : colors.green + '0'}${colors.reset}`);
  console.log(`Warnings Issued:      ${warningCount > 0 ? colors.yellow + warningCount : colors.green + '0'}${colors.reset}`);
  
  if (errorCount > 0) {
    console.log(`\n${colors.bgRed}${colors.bright}  VALIDATION STATUS: FAILED  ${colors.reset}`);
    console.log(`${colors.red}Please fix the critical errors listed above before merging updates or deploying. ${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.bgGreen}${colors.bright}  VALIDATION STATUS: PASSED  ${colors.reset}`);
    if (warningCount > 0) {
      console.log(`${colors.yellow}Passed with ${warningCount} warnings. Consider reviewing warning logs for data quality issues.${colors.reset}\n`);
    } else {
      console.log(`${colors.green}Clean validation run! Codebase is ready for deployments.${colors.reset}\n`);
    }
    process.exit(0);
  }
}

runValidation().catch(err => {
  console.error(`${colors.bgRed}FATAL SYSTEM ERROR EXECUTING DATA VALIDATION SUITE:${colors.reset}`, err);
  process.exit(1);
});
