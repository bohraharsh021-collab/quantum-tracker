import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  MOCK_ARTICLES, 
  MOCK_ALERTS, 
  MOCK_TOPICS 
} from './data/quantumData';
import preFetchedNews from './data/news.json';

// Import sub-views
import DashboardHub from './components/DashboardHub';
import MediaWire from './components/MediaWire';
import DirectoryEngine from './components/DirectoryEngine';
import QuantumProcessorsMatrix from './components/QuantumProcessorsMatrix';
import TaxonomyMaps from './components/TaxonomyMaps';
import FinancialTracker from './components/FinancialTracker';
import IndiaTracker from './components/IndiaTracker';
import GlobalResources from './components/GlobalResources';
import SovereignComparison from './components/SovereignComparison';
import ApplicationsEncyclopedia from './components/ApplicationsEncyclopedia';
import ProcurementLedger from './components/ProcurementLedger';
import AlliancesNode from './components/AlliancesNode';
import ReportsPortal from './components/ReportsPortal';
import WorldMapLeaflet from './components/WorldMapLeaflet';
import StrategicAdvisory from './components/StrategicAdvisory';
import Settings from './components/Settings';

// Import Icons
import { 
  Terminal, 
  Rss, 
  Search, 
  Map, 
  FileText, 
  Volume2, 
  VolumeX, 
  X, 
  Menu, 
  Cpu, 
  Layers, 
  DollarSign, 
  BookOpen, 
  Handshake, 
  AlertOctagon, 
  Award,
  Globe,
  GitCompare,
  TrendingUp,
  Settings2
} from 'lucide-react';

const FEEDS = [
  // Academic & Research (4)
  { name: 'arXiv (quant-ph)', url: 'https://export.arxiv.org/rss/quant-ph', category: 'academic' },
  { name: 'Nature: Quantum Information', url: 'https://www.nature.com/npjqi.rss', category: 'academic' },
  { name: 'IQC Waterloo', url: 'https://uwaterloo.ca/institute-for-quantum-computing/feed', category: 'academic' },
  { name: 'Fermilab: Quantum Computing', url: 'https://news.fnal.gov/tag/quantum-computing/feed/', category: 'academic' },
  // Industry News (4)
  { name: 'The Quantum Insider', url: 'https://thequantuminsider.com/feed/', category: 'industry' },
  { name: 'Quantum Computing Report', url: 'https://quantumcomputingreport.com/feed/', category: 'industry' },
  { name: 'IQT News', url: 'https://www.insidequantumtechnology.com/feed/', category: 'industry' },
  { name: 'Post-Quantum Security', url: 'https://postquantum.com/feed/', category: 'industry' },
  // Science & Media (4)
  { name: 'Phys.org: Quantum Physics', url: 'https://phys.org/rss-feed/physics-news/quantum-physics/', category: 'science' },
  { name: 'ScienceDaily: Quantum', url: 'https://www.sciencedaily.com/rss/matter_energy/quantum_computers.xml', category: 'science' },
  { name: 'MIT Tech Review: Computing', url: 'https://www.technologyreview.com/topic/computing/feed', category: 'science' },
  { name: 'NextBigFuture: Quantum', url: 'https://www.nextbigfuture.com/tag/quantum-computing/feed', category: 'science' },
  // Government & Policy (5)
  { name: 'NIST Quantum', url: 'https://www.nist.gov/blogs/taking-measure/rss.xml', category: 'government' },
  { name: 'EU Digital Strategy', url: 'https://digital-strategy.ec.europa.eu/en/rss.xml', category: 'government' },
  { name: 'India DST News', url: 'https://dst.gov.in/rss.xml', category: 'government' },
  { name: 'UK NQCC News', url: 'https://www.nqcc.ac.uk/feed/', category: 'government' },
  { name: 'India Science Wire', url: 'https://vigyanprasar.gov.in/isw/rss-feed.xml', category: 'government' },
  // Company Blogs (2)
  { name: 'IBM Quantum Blog', url: 'https://www.ibm.com/quantum/blog/rss', category: 'company' },
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/', category: 'company' },
  // Startup Blogs (3)
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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [breakingAlert, setBreakingAlert] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(14400); // Default: 4 hours (14400s)

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    sentiment: 'all',
    topic: 'all',
    minReliability: 1,
    dateRange: '30',
    country: null
  });

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Web Audio Alarm Synthesizer
  const playSynthesizedAlertSound = useCallback((severity) => {
    if (!soundEnabledRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      if (severity === 'critical') {
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(660.00, ctx.currentTime); // E5
        osc1.frequency.setValueAtTime(880.00, ctx.currentTime + 0.15); // A5
        osc1.frequency.setValueAtTime(660.00, ctx.currentTime + 0.30);
        osc1.frequency.setValueAtTime(880.00, ctx.currentTime + 0.45);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
        osc2.frequency.setValueAtTime(330.00, ctx.currentTime + 0.15); // E4
        
        gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.7);
      } else {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      }
      
      osc1.connect(gainNode);
      if (severity === 'critical') osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.start();
      if (severity === 'critical') osc2.start();
      
      osc1.stop(ctx.currentTime + 0.8);
      if (severity === 'critical') osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn("Audio Context playback warning.", e);
    }
  }, []);

  // Fetch feeds via CORS Proxy in parallel
  const triggerFetchFeed = useCallback(async () => {
    setLoading(true);
    
    const fetchPromises = FEEDS.map(async (feed) => {
      const feedArticles = [];
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
        
        // Timeout signal of 30 seconds (extended for slow gov/institutional sites)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) return [];
        
        const json = await response.json();
        const xmlString = json.contents;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const parserError = xmlDoc.getElementsByTagName('parsererror');
        if (parserError.length > 0) return [];

        let items = xmlDoc.getElementsByTagName('item');
        let isAtom = false;
        if (items.length === 0) {
          items = xmlDoc.getElementsByTagName('entry');
          isAtom = true;
        }

        for (let i = 0; i < Math.min(items.length, 10); i++) {
          const item = items[i];
          let title = '', link = '', pubDateStr = '', description = '';
          
          if (isAtom) {
            title = item.getElementsByTagName('title')[0]?.textContent || '';
            const linkEl = item.getElementsByTagName('link')[0];
            link = linkEl ? (linkEl.getAttribute('href') || linkEl.textContent || '') : '';
            pubDateStr = item.getElementsByTagName('updated')[0]?.textContent || 
                         item.getElementsByTagName('published')[0]?.textContent || '';
            description = item.getElementsByTagName('summary')[0]?.textContent || '';
          } else {
            title = item.getElementsByTagName('title')[0]?.textContent || '';
            link = item.getElementsByTagName('link')[0]?.textContent || '';
            pubDateStr = item.getElementsByTagName('pubDate')[0]?.textContent || '';
            description = item.getElementsByTagName('description')[0]?.textContent || '';
          }

          // Strip HTML from description
          const cleanDesc = description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 180) + '...';

          // Basic Quantum Filter check
          const contentStr = (title + ' ' + cleanDesc).toLowerCase();
          const isQuantum = 
            contentStr.includes('quantum') || 
            contentStr.includes('qubit') || 
            contentStr.includes('cryptography') || 
            contentStr.includes('decoherence') ||
            feed.url.includes('arxiv.org') ||
            feed.url.includes('nature.com') ||
            feed.url.includes('uwaterloo.ca') ||
            feed.category === 'government' ||
            feed.category === 'company' ||
            feed.category === 'startup';

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

          // Detect Country / Keywords
          let country = 'Global';
          if (contentStr.includes('india') || contentStr.includes('bangalore') || contentStr.includes('mumbai')) {
            country = 'India';
          } else if (contentStr.includes('google') || contentStr.includes('ibm') || contentStr.includes('usa')) {
            country = 'United States of America';
          } else if (contentStr.includes('china') || contentStr.includes('ustc')) {
            country = 'China';
          }

          // Safe Date conversion to prevent RangeError exceptions
          let finalTimestamp = new Date().toISOString();
          try {
            if (pubDateStr) {
              const parsedDate = new Date(pubDateStr);
              if (!isNaN(parsedDate.getTime())) {
                finalTimestamp = parsedDate.toISOString();
              }
            }
          } catch (e) {}

          const art = {
            id: 'feed-' + i + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            headline: title,
            source: feed.name,
            timestamp: finalTimestamp,
            summary: cleanDesc,
            sentiment,
            reliability: 4,
            topic: contentStr.includes('crypto') || contentStr.includes('key') ? 'Cryptography' : 'Hardware',
            keywords: ['quantum', country.toLowerCase()],
            country,
            link
          };
          feedArticles.push(art);
        }
      } catch (err) {
        console.error(`Feed processing error: ${feed.name}`, err);
      }
      return feedArticles;
    });

    const results = await Promise.all(fetchPromises);
    const newArticles = results.flat();

    if (newArticles.length > 0) {
      setArticles(prev => {
        // Filter out duplicates
        const unique = [...prev];
        let alertTriggered = false;
        newArticles.forEach(item => {
          if (!unique.some(u => u.headline === item.headline)) {
            unique.unshift(item);
            // Trigger breaking alert if it's negative or critical
            if (item.sentiment === 'negative' && !alertTriggered) {
              alertTriggered = true;
              const alertObj = {
                id: 'breaking-' + Date.now(),
                title: "Negative Decoherence/Risk Alert Scored",
                description: item.headline,
                severity: "critical",
                timestamp: new Date().toISOString()
              };
              setBreakingAlert(alertObj);
              playSynthesizedAlertSound('critical');
            }
          }
        });
        return unique;
      });
    }
    setLoading(false);
  }, [playSynthesizedAlertSound]);

  // Load Initial Mock Data
  useEffect(() => {
    const merged = [...preFetchedNews];
    MOCK_ARTICLES.forEach(item => {
      if (!merged.some(m => m.headline === item.headline)) {
        merged.push(item);
      }
    });
    setArticles(merged);
    // Run an initial fetch
    triggerFetchFeed();
  }, [triggerFetchFeed]);

  // Background refresh cycle hook
  useEffect(() => {
    if (refreshInterval <= 0) return;
    const intervalMs = refreshInterval * 1000;
    const timer = setInterval(() => {
      console.log("Background polling cycle triggered...");
      triggerFetchFeed();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [refreshInterval, triggerFetchFeed]);

  // Filtered Articles Selector - Memoized for performance
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        const matchesHead = article.headline.toLowerCase().includes(q);
        const matchesSum = article.summary.toLowerCase().includes(q);
        if (!matchesHead && !matchesSum) return false;
      }
      if (filters.sentiment !== 'all' && article.sentiment !== filters.sentiment) return false;
      if (filters.topic !== 'all' && article.topic.toLowerCase() !== filters.topic) return false;
      if (article.reliability < filters.minReliability) return false;
      
      // Country Filter
      if (filters.country && article.country !== filters.country) return false;

      // Timeframe
      const limit = new Date();
      limit.setDate(limit.getDate() - parseInt(filters.dateRange));
      if (new Date(article.timestamp) < limit) return false;

      return true;
    });
  }, [articles, filters]);

  const handleCountryFilter = useCallback((country) => {
    setFilters(prev => ({
      ...prev,
      country: prev.country === country ? null : country
    }));
    if (country === 'India') {
      setActiveTab('indiatracker');
    } else {
      setActiveTab('globalresources');
    }
  }, []);

  // Tab routing selector
  const renderViewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHub 
            articles={articles} 
            onSwitchTab={setActiveTab} 
            onSearch={(term) => setFilters(prev => ({ ...prev, search: term }))} 
          />
        );
      case 'media':
        return (
          <MediaWire 
            articles={filteredArticles} 
            loading={loading}
            onRefresh={triggerFetchFeed}
            filters={filters}
            setFilters={setFilters}
          />
        );
      case 'directory':
        return <DirectoryEngine />;
      case 'processors':
        return <QuantumProcessorsMatrix articles={articles} />;
      case 'taxonomy':
        return <TaxonomyMaps />;
      case 'finance':
        return <FinancialTracker />;
      case 'advisory':
        return <ApplicationsEncyclopedia />;
      case 'comparison':
        return <SovereignComparison articles={articles} />;
      case 'strategicAdvisory':
        return <StrategicAdvisory />;
      case 'indiatracker':
        return <IndiaTracker />;
      case 'globalresources':
        return <GlobalResources />;
      case 'procurement':
        return <ProcurementLedger articles={articles} />;
      case 'alliances':
        return <AlliancesNode articles={articles} />;
      case 'reports':
        return <ReportsPortal articles={filteredArticles} />;
      case 'map':
        return <WorldMapLeaflet onCountrySelect={handleCountryFilter} />;
      case 'settings':
        return <Settings refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval} articles={articles} feeds={FEEDS} onRefresh={triggerFetchFeed} loading={loading} />;
      default:
        return <DashboardHub articles={articles} onSwitchTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0B1320] text-[#E2E8F0] overflow-hidden select-none font-sans">
      
      {/* 1. Header component */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#223047] bg-[#111A28] flex-shrink-0 z-40">
        <div className="flex items-center gap-3">
          {/* Menu button for mobile sidebar */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-cyber-accent hover:text-white"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-cyber-accent to-cyber-blue rounded-sm flex-shrink-0 animate-pulse"></div>
            <div>
              <span className="font-mono font-bold tracking-wider text-sm text-white uppercase block leading-none">
                Quantum command
              </span>
              <span className="text-[10px] text-cyber-accent font-mono block tracking-widest mt-1 uppercase leading-none">
                NQM Portal v3.5
              </span>
            </div>
          </div>
        </div>

        {/* Sound and Polling Control widgets */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] bg-[#0B1320] border border-[#223047] rounded p-1">
            <span className="text-cyber-muted uppercase">REFRESH</span>
            <select
              value={refreshInterval}
              onChange={e => setRefreshInterval(parseInt(e.target.value))}
              className="bg-transparent text-cyber-accent border-none focus:ring-0 p-0 text-[10px] cursor-pointer focus:outline-none"
            >
              <option value="5" className="bg-[#111A28]">5s Test</option>
              <option value="60" className="bg-[#111A28]">1 Minute</option>
              <option value="14400" className="bg-[#111A28]">4 Hours (Free)</option>
              <option value="0" className="bg-[#111A28]">Disabled</option>
            </select>
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded border border-[#223047] transition-all ${
              soundEnabled ? 'text-cyber-accent bg-cyber-accent/10 border-cyber-accent/30' : 'text-cyber-muted hover:text-white'
            }`}
            title={soundEnabled ? 'Chimes Active' : 'Chimes Muted'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </header>

      {/* 2. Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Navigation Sidebar */}
        <aside className={`absolute lg:relative top-0 left-0 h-full w-60 border-r border-[#223047] bg-[#111A28] flex flex-col justify-between flex-shrink-0 z-30 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Navigation Links list */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100%-80px)]">
            <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider block mb-2 px-3">
              Monitoring Modules
            </span>
            
            {[
              { id: 'dashboard', name: 'Dashboard Hub', icon: <Terminal size={14} /> },
              { id: 'map', name: 'Geospatial Hubs', icon: <Map size={14} /> },
              { id: 'media', name: 'Media Wire', icon: <Rss size={14} /> },
              { id: 'directory', name: 'Ecosystem Directory', icon: <Search size={14} /> },
              { id: 'processors', name: 'Processors Matrix', icon: <Cpu size={14} /> },
              { id: 'taxonomy', name: 'Taxonomy Map', icon: <Layers size={14} /> },
              { id: 'advisory', name: 'Advisory & Use Cases', icon: <BookOpen size={14} /> },
              { id: 'comparison', name: 'Sovereign Comparison', icon: <GitCompare size={14} /> },
              { id: 'strategicAdvisory', name: 'Strategic Advisory', icon: <TrendingUp size={14} /> },
              { id: 'finance', name: 'Financial Tracker', icon: <DollarSign size={14} /> },
              { id: 'indiatracker', name: 'India Tracker', icon: <Award size={14} /> },
              { id: 'globalresources', name: 'Global Resources', icon: <Globe size={14} /> },
              { id: 'procurement', name: 'Procurement Ledger', icon: <FileText size={14} /> },
              { id: 'alliances', name: 'Alliances & Consortia', icon: <Handshake size={14} /> },
              { id: 'reports', name: 'Reports Dossier', icon: <FileText size={14} /> },
              { id: 'settings', name: 'Settings', icon: <Settings2 size={14} /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false); // Close sidebar on mobile
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono uppercase rounded transition-all ${
                  activeTab === item.id 
                    ? 'bg-cyber-accent/15 border-l-2 border-cyber-accent text-cyber-accent font-bold' 
                    : 'text-cyber-muted hover:bg-[#0B1320] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-[#223047] text-[10px] font-mono text-cyber-muted bg-[#0B1320]/40 space-y-1">
            <div>CLEARANCE: SECURE-9</div>
            <div>STATUS: NOMINAL (CONNECTED)</div>
            {filters.country && (
              <div className="text-cyber-accent truncate">
                MAP FILTER: {filters.country}
              </div>
            )}
          </div>
        </aside>

        {/* Sidebar backdrop overlay on mobile */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          />
        )}

        {/* Right Content display workspace */}
        <main className="flex-1 overflow-y-auto bg-[#0B1320] p-6 relative">
          
          {/* Breaking Alert Warning Banner */}
          {breakingAlert && (
            <div className="mb-6 p-4 border border-[#EF4444] bg-[#EF4444]/10 rounded flex items-start justify-between gap-4 breaking-pulse">
              <div className="flex items-start gap-3">
                <AlertOctagon className="text-[#EF4444] mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-mono font-bold text-sm text-[#EF4444] uppercase tracking-wide">
                    Breaking Decoherence / Sector Threat Warning
                  </h4>
                  <p className="text-xs text-white leading-relaxed mt-1">
                    {breakingAlert.description}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setBreakingAlert(null)}
                className="text-[#EF4444] hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Tab content renderer */}
          {renderViewContent()}
        </main>
      </div>
    </div>
  );
}
