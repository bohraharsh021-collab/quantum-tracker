import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { MOCK_ARTICLES, MOCK_ALERTS } from './data/quantumData';
import telemetryArticles from './data/telemetryDb.json';
import feedsConfig from './data/feedsConfig.json';

// Import sub-views lazily
const DashboardHub = React.lazy(() => import('./components/DashboardHub'));
const MediaWire = React.lazy(() => import('./components/MediaWire'));
const DirectoryEngine = React.lazy(() => import('./components/DirectoryEngine'));
const QuantumProcessorsMatrix = React.lazy(() => import('./components/QuantumProcessorsMatrix'));
const TaxonomyMaps = React.lazy(() => import('./components/TaxonomyMaps'));
const FinancialTracker = React.lazy(() => import('./components/FinancialTracker'));
const IndiaTracker = React.lazy(() => import('./components/IndiaTracker'));
const GlobalResources = React.lazy(() => import('./components/GlobalResources'));
const SovereignComparison = React.lazy(() => import('./components/SovereignComparison'));
const ApplicationsEncyclopedia = React.lazy(() => import('./components/ApplicationsEncyclopedia'));
const ProcurementLedger = React.lazy(() => import('./components/ProcurementLedger'));
const AlliancesNode = React.lazy(() => import('./components/AlliancesNode'));
const ExporterEngine = React.lazy(() => import('./components/ExporterEngine'));
const WorldMapLeaflet = React.lazy(() => import('./components/WorldMapLeaflet'));
const StrategicAdvisory = React.lazy(() => import('./components/StrategicAdvisory'));
const Settings = React.lazy(() => import('./components/Settings'));
const QAValidationRoom = React.lazy(() => import('./components/QAValidationRoom'));

// Import Icons
import { 
  Terminal, 
  Rss, 
  Search, 
  Map, 
  FileText, 
  X, 
  Menu, 
  Cpu, 
  Layers, 
  DollarSign, 
  BookOpen, 
  Handshake, 
  Award,
  Globe,
  GitCompare,
  TrendingUp,
  Settings2,
  CheckCircle2,
  Download
} from 'lucide-react';

const FEEDS = feedsConfig;

// Custom National Quantum Mission Inspired Vector Emblem
const NQMEmblem = () => (
  <svg className="w-7 h-7 text-cyber-accent animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="44" ry="11" stroke="#00E699" strokeWidth="2" transform="rotate(30 50 50)" className="opacity-80" />
    <ellipse cx="50" cy="50" rx="44" ry="11" stroke="#00E699" strokeWidth="2" transform="rotate(-30 50 50)" className="opacity-80" />
    <ellipse cx="50" cy="50" rx="44" ry="11" stroke="#00A3FF" strokeWidth="2" transform="rotate(90 50 50)" className="opacity-80" />
    <circle cx="50" cy="50" r="10" stroke="#00E699" strokeWidth="2.5" fill="#0B1320" />
    <circle cx="50" cy="50" r="3.5" fill="#00A3FF" />
    {[...Array(8)].map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 10 * Math.cos((i * Math.PI) / 4)}
        y2={50 + 10 * Math.sin((i * Math.PI) / 4)}
        stroke="#00E699"
        strokeWidth="1.2"
      />
    ))}
  </svg>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Module crashed:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center text-red-500 font-mono p-8 text-center bg-[#0B1320]">
          <span className="text-4xl mb-4">⚠️</span>
          <h2 className="text-xl font-bold mb-2">Module Crash Detected</h2>
          <p className="text-xs text-red-400 opacity-80 max-w-lg">{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 border border-red-500/30 rounded hover:bg-red-500/10">Reload Interface</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [breakingAlert, setBreakingAlert] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(14400); // Default: 4 hours (14400s)

  // Clean v4.0 Filters State
  const [filters, setFilters] = useState({
    search: '',
    country: null,
    organization: 'all',
    category: 'all',
    technology: 'all'
  });

  // Client-side ingestion using dynamic configs and CORS proxy
  const triggerFetchFeed = useCallback(async () => {
    setLoading(true);
    const fetchPromises = FEEDS.map(async (feed) => {
      if (feed.status !== 'active') return [];
      const feedArticles = [];
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) return [];
        
        const json = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) return [];

        let items = xmlDoc.getElementsByTagName('item');
        let isAtom = false;
        if (items.length === 0) {
          items = xmlDoc.getElementsByTagName('entry');
          isAtom = true;
        }

        // Fetch all available articles with no cap per feed
        for (let i = 0; i < items.length; i++) {
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

          const cleanDesc = description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 240) + '...';
          const contentStr = (title + ' ' + cleanDesc).toLowerCase();

          // Country detection
          let country = feed.country || 'Global';
          if (contentStr.includes('india') || contentStr.includes('bangalore') || contentStr.includes('mumbai')) {
            country = 'India';
          } else if (contentStr.includes('google') || contentStr.includes('ibm') || contentStr.includes('usa')) {
            country = 'United States of America';
          } else if (contentStr.includes('china') || contentStr.includes('ustc')) {
            country = 'China';
          }

          let pubDateISO = new Date().toISOString();
          try {
            if (pubDateStr) {
              const d = new Date(pubDateStr);
              if (!isNaN(d.getTime())) pubDateISO = d.toISOString();
            }
          } catch (e) {}

          feedArticles.push({
            uuid: 'client-' + i + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            title,
            summary: cleanDesc,
            source: feed.name,
            rssFeed: feed.url,
            category: feed.category,
            country,
            organization: feed.organization || 'Global Ecosystem',
            organizationType: 'Startup',
            technology: 'Hardware Platforms',
            processor: 'None',
            qubitMethod: 'Other',
            application: 'General Quantum',
            procurement: false,
            funding: false,
            partnership: false,
            pubDate: pubDateISO,
            tags: ['quantum', country.toLowerCase()],
            url: link
          });
        }
      } catch (err) {
        console.error(`Feed client ingest fail: ${feed.name}`, err);
      }
      return feedArticles;
    });

    const results = await Promise.all(fetchPromises);
    const newArticles = results.flat();

    if (newArticles.length > 0) {
      setArticles(prev => {
        const unique = [...prev];
        newArticles.forEach(item => {
          if (!unique.some(u => u.title === item.title)) {
            unique.unshift(item);
          }
        });
        return unique.slice(0, 10000); // 10,000 Cap
      });
    }
    setLoading(false);
  }, []);

  // Load Initial Telemetry Database
  useEffect(() => {
    const merged = [...telemetryArticles];
    MOCK_ARTICLES.forEach(item => {
      // Convert mock to new schema
      const title = item.headline || item.title;
      if (!merged.some(m => m.title === title)) {
        merged.push({
          uuid: item.id || ('mock-' + Math.random().toString(36).substring(2, 9)),
          title,
          summary: item.summary,
          source: item.source,
          rssFeed: '',
          category: item.topic === 'Investment' ? 'industry' : 'academic',
          country: item.country || 'Global',
          organization: 'Global Ecosystem',
          organizationType: 'Corporation',
          technology: item.topic === 'Hardware' ? 'Superconducting' : 'Hardware Platforms',
          processor: 'None',
          qubitMethod: 'Other',
          application: item.topic === 'Cryptography' ? 'Post-Quantum Cryptography & QKD' : 'General Quantum',
          procurement: item.topic === 'Security',
          funding: item.topic === 'Investment',
          partnership: false,
          pubDate: item.timestamp || new Date().toISOString(),
          tags: item.keywords || [],
          url: item.link || ''
        });
      }
    });
    setArticles(merged);
    triggerFetchFeed();
  }, [triggerFetchFeed]);

  // Background refresh hooks
  useEffect(() => {
    if (refreshInterval <= 0) return;
    const timer = setInterval(() => {
      triggerFetchFeed();
    }, refreshInterval * 1000);
    return () => clearInterval(timer);
  }, [refreshInterval, triggerFetchFeed]);

  // Filtered Articles Selector
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        const matchesHead = (article.title || '').toLowerCase().includes(q);
        const matchesSum = (article.summary || '').toLowerCase().includes(q);
        if (!matchesHead && !matchesSum) return false;
      }
      if (filters.category !== 'all' && article.category !== filters.category) return false;
      if (filters.technology !== 'all' && article.technology.toLowerCase() !== filters.technology.toLowerCase()) return false;
      if (filters.organization !== 'all' && article.organization.toLowerCase() !== filters.organization.toLowerCase()) return false;
      if (filters.country && article.country !== filters.country) return false;
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

  // Tab routing switcher
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
        return <DirectoryEngine articles={articles} />;
      case 'processors':
        return <QuantumProcessorsMatrix articles={articles} />;
      case 'taxonomy':
        return <TaxonomyMaps articles={articles} />;
      case 'finance':
        return <FinancialTracker articles={articles} />;
      case 'advisory':
        return <ApplicationsEncyclopedia articles={articles} />;
      case 'comparison':
        return <SovereignComparison articles={articles} />;
      case 'strategicAdvisory':
        return <StrategicAdvisory articles={articles} />;
      case 'indiatracker':
        return <IndiaTracker articles={articles} />;
      case 'globalresources':
        return <GlobalResources articles={articles} />;
      case 'procurement':
        return <ProcurementLedger articles={articles} />;
      case 'alliances':
        return <AlliancesNode articles={articles} />;
      case 'reports':
        return <ExporterEngine articles={articles} />;
      case 'map':
        return <WorldMapLeaflet articles={articles} onCountrySelect={handleCountryFilter} />;
      case 'qa-validation':
        return <QAValidationRoom articles={articles} />;
      case 'settings':
        return <Settings refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval} articles={articles} feeds={FEEDS} onRefresh={triggerFetchFeed} loading={loading} />;
      default:
        return <DashboardHub articles={articles} onSwitchTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0B1320] text-cyber-text font-sans">
      {/* 1. Header Navigation Bar */}
      <header className="h-16 border-b border-[#223047] bg-[#111A28] px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-cyber-accent hover:text-white"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2.5">
            <NQMEmblem />
            <div>
              <span className="font-mono font-bold tracking-wider text-sm text-white uppercase block leading-none">
                Quantum Command
              </span>
              <span className="text-[9px] text-cyber-accent font-mono block tracking-widest mt-1 uppercase leading-none">
                National Quantum Mission Platform
              </span>
            </div>
          </div>
        </div>

        {/* Global Loading and Refresh controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] bg-[#0B1320] border border-[#223047] rounded p-1">
            <span className="text-cyber-muted uppercase">REFRESH</span>
            <select
              value={refreshInterval}
              onChange={e => setRefreshInterval(parseInt(e.target.value))}
              className="bg-transparent text-cyber-accent border-none focus:ring-0 p-0 text-[10px] cursor-pointer focus:outline-none"
            >
              <option value="5" className="bg-[#111A28]">5s Test</option>
              <option value="60" className="bg-[#111A28]">1 Min</option>
              <option value="14400" className="bg-[#111A28]">4 Hours</option>
              <option value="0" className="bg-[#111A28]">Disabled</option>
            </select>
          </div>
        </div>
      </header>

      {/* 2. Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <aside className={`absolute lg:relative top-0 left-0 h-full w-60 border-r border-[#223047] bg-[#111A28] flex flex-col justify-between flex-shrink-0 z-30 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
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
              { id: 'advisory', name: 'Advisory Encyclopedia', icon: <BookOpen size={14} /> },
              { id: 'comparison', name: 'Sovereign Comparison', icon: <GitCompare size={14} /> },
              { id: 'strategicAdvisory', name: 'Student Advisory', icon: <TrendingUp size={14} /> },
              { id: 'finance', name: 'Financial Tracker', icon: <DollarSign size={14} /> },
              { id: 'indiatracker', name: 'India Tracker', icon: <Award size={14} /> },
              { id: 'globalresources', name: 'Global Resources', icon: <Globe size={14} /> },
              { id: 'procurement', name: 'Procurement Ledger', icon: <FileText size={14} /> },
              { id: 'alliances', name: 'Alliances & Consortia', icon: <Handshake size={14} /> },
              { id: 'reports', name: 'Document Exporter', icon: <Download size={14} /> },
              { id: 'qa-validation', name: 'QA Validation Room', icon: <CheckCircle2 size={14} /> },
              { id: 'settings', name: 'Settings', icon: <Settings2 size={14} /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
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
            className="absolute inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}

        {/* 3. Main Dashboard Window */}
        <main className="flex-1 overflow-y-auto bg-[#0B1320] p-4 lg:p-6 relative">
          {breakingAlert && (
            <div className="mb-4 bg-red-950/40 border border-red-500/30 rounded p-4 flex justify-between items-start animate-fade-in relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
              <div className="space-y-1 pl-2">
                <span className="font-mono font-bold text-red-400 text-xs uppercase tracking-wider block">
                  🚨 SYSTEM ALERT: CRITICAL TELEMETRY DETECTED
                </span>
                <p className="text-sm font-semibold text-white">
                  {breakingAlert.description}
                </p>
              </div>
              <button 
                onClick={() => setBreakingAlert(null)}
                className="text-cyber-muted hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex h-full items-center justify-center text-cyber-accent font-mono animate-pulse text-sm tracking-widest">
                LOADING MODULE...
              </div>
            }>
              {renderViewContent()}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
