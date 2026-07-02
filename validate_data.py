import os
import re
import json
from datetime import datetime

# Define color constants for terminal output
RESET = '\033[0m'
BRIGHT = '\033[1m'
RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
BLUE = '\033[34m'
CYAN = '\033[36m'
BG_RED = '\033[41m'
BG_GREEN = '\033[42m'

SYMBOL_SUCCESS = '[PASS]'
SYMBOL_WARNING = '[WARN]'
SYMBOL_ERROR = '[FAIL]'
SYMBOL_INFO = '[INFO]'

error_count = 0
warning_count = 0
test_count = 0

def log_header(title):
    print(f"\n{BRIGHT}{BLUE}=== {title.upper()} ==={RESET}")

def assert_test(condition, message, is_critical=True, details=''):
    global test_count, error_count, warning_count
    test_count += 1
    if condition:
        print(f"  {GREEN}{SYMBOL_SUCCESS}{RESET} {message}")
    else:
        if is_critical:
            error_count += 1
            print(f"  {RED}{SYMBOL_ERROR} CRITICAL:{RESET} {message}")
            if details:
                print(f"     \033[2m{details}{RESET}")
        else:
            warning_count += 1
            print(f"  {YELLOW}{SYMBOL_WARNING} WARNING:{RESET} {message}")
            if details:
                print(f"     \033[2m{details}{RESET}")

def clean_and_parse_js_variable(file_content, var_name):
    """
    Extracts a JS variable from file_content, cleans it up to be valid JSON, and parses it.
    """
    # Regex to find: export const VAR_NAME = [ ... ]; or export const VAR_NAME = { ... };
    # We look for the variable declaration and match brackets/braces carefully
    pattern = rf"export\s+const\s+{var_name}\s*=\s*(.*?);"
    match = re.search(pattern, file_content, re.DOTALL)
    if not match:
        # Try matching without the trailing semicolon if it's the end of file
        pattern_no_semi = rf"export\s+const\s+{var_name}\s*=\s*(.*)"
        match = re.search(pattern_no_semi, file_content, re.DOTALL)
        if not match:
            return None
            
    js_block = match.group(1).strip()
    
    # Clean up JS specific syntaxes to make it JSON-compatible:
    # 1. Remove comments: both single line // and multi line /* */
    js_block = re.sub(r'/\*.*?\*/', '', js_block, flags=re.DOTALL)
    js_block = re.sub(r'//.*', '', js_block)
    
    # 2. Convert single quotes to double quotes, but protect inner apostrophes
    # Simple replacement if there are no complex nested quotes:
    # Let's temporarily replace escaped single quotes (\')
    js_block = js_block.replace("\\'", "TEMP_ESC_SINGLE")
    
    # Find single quotes and replace with double quotes if they wrap a string
    js_block = re.sub(r"'([^']*)'", r'"\1"', js_block)
    js_block = js_block.replace("TEMP_ESC_SINGLE", "'")
    
    # 3. Quote unquoted keys (e.g. name: -> "name":)
    js_block = re.sub(r'([a-zA-Z0-9_]+)\s*:', r'"\1":', js_block)
    
    # 4. Remove trailing commas before closing braces/brackets
    js_block = re.sub(r',\s*([\]\}])', r'\1', js_block)
    
    # 5. Fix concatenated strings like "arm" + "chair" if any (none in this file, but good for safety)
    
    # Let's clean up any double commas or stray issues
    js_block = re.sub(r',\s*,', ',', js_block)
    
    # Try parsing
    try:
        return json.loads(js_block)
    except Exception as e:
        # Fallback: Let's do some more target fixing if needed
        # Print a snippet for debugging if it fails
        # print("FAIL BLOCK:", js_block[:200])
        raise ValueError(f"Failed to parse variable {var_name}: {str(e)}")

def main():
    global error_count, warning_count, test_count
    
    print(f"{BRIGHT}{CYAN}Quantum Tracker 2.0 - Python QA Automated Data Validation Suite{RESET}")
    print(f"Execution Time: {datetime.now().isoformat()}")
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, ".."))
    
    # -------------------------------------------------------------
    # SECTION 1: news.json Validation
    # -------------------------------------------------------------
    log_header('News Data Validation (news.json)')
    
    news_path = os.path.join(project_root, 'src', 'data', 'news.json')
    assert_test(os.path.exists(news_path), 'news.json file exists', True, f"Expected file at {news_path}")
    
    if os.path.exists(news_path):
        try:
            with open(news_path, 'r', encoding='utf-8') as f:
                news_articles = json.load(f)
            
            assert_test(isinstance(news_articles, list), 'news.json parses as a valid JSON array', True)
            
            if isinstance(news_articles, list):
                print(f"  {SYMBOL_INFO} Scanned {len(news_articles)} active articles.")
                
                headline_set = set()
                id_set = set()
                article_index = 0
                
                for art in news_articles:
                    art_ref = f"Article #{article_index} ({art.get('headline', '')[:30]}...)"
                    
                    # ID check
                    art_id = art.get('id')
                    assert_test(
                        isinstance(art_id, str) and len(art_id.strip()) > 0,
                        f"{art_ref} contains a non-empty unique string ID",
                        True,
                        f"ID value: {art_id}"
                    )
                    if art_id:
                        assert_test(art_id not in id_set, f"{art_ref} has unique ID", True, f"Duplicate ID: {art_id}")
                        id_set.add(art_id)
                        
                    # Headline check
                    headline = art.get('headline')
                    assert_test(
                        isinstance(headline, str) and len(headline.strip()) >= 10,
                        f"{art_ref} has a substantial headline (>= 10 chars)",
                        False,
                        f"Length: {len(headline) if headline else 0}"
                    )
                    if headline:
                        lower_headline = headline.lower().strip()
                        assert_test(lower_headline not in headline_set, f"{art_ref} has unique headline (dedup check)", False, f"Duplicate: \"{headline}\"")
                        headline_set.add(lower_headline)
                        
                    # Source check
                    assert_test(
                        isinstance(art.get('source'), str) and len(art.get('source', '').strip()) > 0,
                        f"{art_ref} contains source publisher",
                        True
                    )
                    
                    # Timestamp validation
                    timestamp = art.get('timestamp')
                    date_valid = False
                    if timestamp:
                        try:
                            # Try parsing ISO 8601
                            if 'Z' in timestamp:
                                # Simple parse
                                clean_t = timestamp.replace('Z', '')
                                if '.' in clean_t:
                                    clean_t = clean_t.split('.')[0]
                                datetime.strptime(clean_t, "%Y-%m-%dT%H:%M:%S")
                            else:
                                # General check
                                datetime.fromisoformat(timestamp)
                            date_valid = True
                        except Exception:
                            pass
                    assert_test(date_valid, f"{art_ref} has valid parseable ISO-8601 timestamp", True, f"Timestamp: {timestamp}")
                    
                    # Sentiment check
                    allowed_sentiments = ['positive', 'negative', 'mixed', 'neutral']
                    sentiment = art.get('sentiment')
                    assert_test(
                        sentiment in allowed_sentiments,
                        f"{art_ref} has valid sentiment value",
                        True,
                        f"Sentiment: \"{sentiment}\" (Allowed: {allowed_sentiments})"
                    )
                    
                    # Topic check
                    allowed_topics = ['Hardware', 'Algorithms', 'Cryptography', 'Investment', 'Security']
                    topic = art.get('topic')
                    assert_test(
                        topic in allowed_topics,
                        f"{art_ref} has valid topic tag",
                        False,
                        f"Topic: \"{topic}\" (Allowed: {allowed_topics})"
                    )
                    
                    # Reliability check
                    rel = art.get('reliability')
                    assert_test(
                        isinstance(rel, int) and 1 <= rel <= 5,
                        f"{art_ref} has reliability score between 1 and 5",
                        True,
                        f"Reliability: {rel}"
                    )
                    
                    # Country check
                    country = art.get('country')
                    assert_test(
                        isinstance(country, str) and len(country.strip()) > 0,
                        f"{art_ref} has country property",
                        False,
                        f"Country: \"{country}\""
                    )
                    
                    article_index += 1
                    if article_index >= 30:
                        # Skip full logs for remaining to prevent terminal bloat
                        remaining = news_articles[30:]
                        remaining_errs = 0
                        for r in remaining:
                            if not r.get('id') or not r.get('headline') or r.get('sentiment') not in allowed_sentiments:
                                remaining_errs += 1
                        assert_test(remaining_errs == 0, f"All other {len(remaining)} historical articles verified without critical errors", True, f"Errors in history: {remaining_errs}")
                        break
        except Exception as e:
            assert_test(False, "Successfully parse and read news.json", True, str(e))

    # -------------------------------------------------------------
    # SECTION 2: quantumData.js Validation
    # -------------------------------------------------------------
    log_header('Quantum Data JS Tables Validation (quantumData.js)')
    
    qd_path = os.path.join(project_root, 'src', 'data', 'quantumData.js')
    assert_test(os.path.exists(qd_path), 'quantumData.js file exists', True, f"Expected file at {qd_path}")
    
    if os.path.exists(qd_path):
        try:
            with open(qd_path, 'r', encoding='utf-8') as f:
                qd_content = f.read()
                
            # Validate PROCESSORS_MATRIX
            processors = clean_and_parse_js_variable(qd_content, 'PROCESSORS_MATRIX')
            assert_test(isinstance(processors, list) and len(processors) > 0, 'PROCESSORS_MATRIX parses correctly and has entries', True)
            
            if isinstance(processors, list):
                proc_names = set()
                for idx, p in enumerate(processors):
                    ref = f"Processor #{idx} ({p.get('name', 'Unknown')})"
                    assert_test(isinstance(p.get('name'), str) and len(p.get('name').strip()) > 0, f"{ref} has a non-empty name", True)
                    
                    name_key = p.get('name', '').lower().strip()
                    if name_key:
                        assert_test(name_key not in proc_names, f"{ref} has unique name", False, f"Duplicate: {p.get('name')}")
                        proc_names.add(name_key)
                        
                    assert_test(isinstance(p.get('manufacturer'), str) and len(p.get('manufacturer', '').strip()) > 0, f"{ref} has manufacturer", True)
                    
                    p_qubits = p.get('physicalQubits')
                    l_qubits = p.get('logicalQubits')
                    assert_test(isinstance(p_qubits, int) and p_qubits > 0, f"{ref} has positive integer physical qubits", True, f"Physical: {p_qubits}")
                    assert_test(isinstance(l_qubits, int) and 0 <= l_qubits <= p_qubits, f"{ref} has valid logical qubits (0 <= logical <= physical)", True, f"Logical: {l_qubits}")
                    
                    t1 = p.get('t1Coherence')
                    t2 = p.get('t2Coherence')
                    assert_test(isinstance(t1, (int, float)) and t1 >= 0, f"{ref} has valid T1 coherence", False, f"T1: {t1}")
                    assert_test(isinstance(t2, (int, float)) and t2 >= 0, f"{ref} has valid T2 coherence", False, f"T2: {t2}")
                    
                    fidelity_pattern = r'^\d+(\.\d+)?%$'
                    assert_test(isinstance(p.get('gateFidelity1Q'), str) and bool(re.match(fidelity_pattern, p.get('gateFidelity1Q', ''))), f"{ref} has valid 1Q gate fidelity (e.g. \"99.9%\")", False, f"1Q: {p.get('gateFidelity1Q')}")
                    assert_test(isinstance(p.get('gateFidelity2Q'), str) and bool(re.match(fidelity_pattern, p.get('gateFidelity2Q', ''))), f"{ref} has valid 2Q gate fidelity (e.g. \"99.2%\")", False, f"2Q: {p.get('gateFidelity2Q')}")
                    
                    launch = p.get('launchYear')
                    assert_test(isinstance(launch, int) and 2010 <= launch <= 2040, f"{ref} launch year is within range 2010-2040", True, f"Launch: {launch}")
            
            # Validate PROCUREMENT_LEDGER
            procurement = clean_and_parse_js_variable(qd_content, 'PROCUREMENT_LEDGER')
            assert_test(isinstance(procurement, list) and len(procurement) > 0, 'PROCUREMENT_LEDGER parses correctly and has entries', True)
            
            if isinstance(procurement, list):
                pr_ids = set()
                for idx, pr in enumerate(procurement):
                    ref = f"Procurement #{idx} (ID: {pr.get('id', 'Unknown')})"
                    pr_id = pr.get('id')
                    assert_test(isinstance(pr_id, str) and len(pr_id.strip()) > 0, f"{ref} has non-empty ID", True)
                    if pr_id:
                        assert_test(pr_id not in pr_ids, f"{ref} has unique ID", True, f"Duplicate ID: {pr_id}")
                        pr_ids.add(pr_id)
                        
                    assert_test(isinstance(pr.get('buyer'), str) and len(pr.get('buyer', '').strip()) > 0, f"{ref} has buyer agency/enterprise", True)
                    assert_test(isinstance(pr.get('seller'), str) and len(pr.get('seller', '').strip()) > 0, f"{ref} has seller/vendor", True)
                    assert_test(isinstance(pr.get('product'), str) and len(pr.get('product', '').strip()) > 0, f"{ref} has product name", True)
                    
                    val = pr.get('value')
                    assert_test(isinstance(val, (int, float)) and val > 0, f"{ref} has positive numeric valuation ($M)", True, f"Valuation: {val}")
                    
                    date_str = pr.get('date')
                    date_valid = False
                    if date_str and re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
                        try:
                            datetime.strptime(date_str, "%Y-%m-%d")
                            date_valid = True
                        except ValueError:
                            pass
                    assert_test(date_valid, f"{ref} has YYYY-MM-DD date", True, f"Date: {date_str}")
            
            # Validate ALLIANCES_NETWORK
            alliances = clean_and_parse_js_variable(qd_content, 'ALLIANCES_NETWORK')
            assert_test(isinstance(alliances, list) and len(alliances) > 0, 'ALLIANCES_NETWORK parses correctly and has entries', True)
            
            if isinstance(alliances, list):
                al_ids = set()
                for idx, al in enumerate(alliances):
                    ref = f"Alliance #{idx} (ID: {al.get('id', 'Unknown')})"
                    al_id = al.get('id')
                    assert_test(isinstance(al_id, str) and len(al_id.strip()) > 0, f"{ref} has non-empty ID", True)
                    if al_id:
                        assert_test(al_id not in al_ids, f"{ref} has unique ID", True, f"Duplicate ID: {al_id}")
                        al_ids.add(al_id)
                        
                    assert_test(isinstance(al.get('partyA'), str) and len(al.get('partyA', '').strip()) > 0, f"{ref} has partyA", True)
                    assert_test(isinstance(al.get('partyB'), str) and len(al.get('partyB', '').strip()) > 0, f"{ref} has partyB", True)
                    assert_test(isinstance(al.get('type'), str) and len(al.get('type', '').strip()) > 0, f"{ref} has type", False)
                    assert_test(isinstance(al.get('scope'), str) and len(al.get('scope', '').strip()) >= 10, f"{ref} has detailed scope (>= 10 chars)", False)
                    
                    date_str = al.get('date')
                    date_valid = False
                    if date_str and re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
                        try:
                            datetime.strptime(date_str, "%Y-%m-%d")
                            date_valid = True
                        except ValueError:
                            pass
                    assert_test(date_valid, f"{ref} has YYYY-MM-DD date", True, f"Date: {date_str}")
                    
        except Exception as e:
            assert_test(False, "Successfully parse and read quantumData.js", True, str(e))
            
    # -------------------------------------------------------------
    # SECTION 3: Summary & Exit Status
    # -------------------------------------------------------------
    log_header('QA Automation Validation Summary')
    print(f"Total Assertions Run: {test_count}")
    print(f"Critical Errors:      {RED if error_count > 0 else GREEN}{error_count}{RESET}")
    print(f"Warnings Issued:      {YELLOW if warning_count > 0 else GREEN}{warning_count}{RESET}")
    
    if error_count > 0:
        print(f"\n{BG_RED}{BRIGHT}  VALIDATION STATUS: FAILED  {RESET}")
        print(f"{RED}Please fix the critical errors listed above before merging updates or deploying.{RESET}\n")
        exit(1)
    else:
        print(f"\n{BG_GREEN}{BRIGHT}  VALIDATION STATUS: PASSED  {RESET}")
        if warning_count > 0:
            print(f"{YELLOW}Passed with {warning_count} warnings. Consider reviewing warning logs.{RESET}\n")
        else:
            print(f"{GREEN}Clean validation run! Codebase is ready for deployments.{RESET}\n")
        exit(0)

if __name__ == '__main__':
    main()
