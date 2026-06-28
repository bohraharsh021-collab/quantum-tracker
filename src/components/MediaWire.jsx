import React from 'react';
import { MOCK_TOPICS } from '../data/quantumData';
import { Search, RotateCw, Sparkles, Star, ShieldAlert } from 'lucide-react';

export default function MediaWire({ 
  articles, 
  loading, 
  onRefresh, 
  filters, 
  setFilters 
}) {

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
            News & RSS Intelligence Wire
          </h1>
          <p className="text-sm text-cyber-muted">
            Parsed signals from arXiv, Nature, IEEE Spectrum, and The Quantum Insider scored with client-side sentiment analysis.
          </p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 py-1.5 px-3 bg-[#111A28] border border-cyber-border hover:border-cyber-accent text-cyber-accent text-xs font-mono font-bold rounded transition-all disabled:opacity-50 h-fit"
        >
          <RotateCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Polling Feeds...' : 'Force Refresh Feed'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: Sidebar Filters */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 h-fit space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyber-text font-mono border-b border-cyber-border pb-2">
            Intelligence Filters
          </h2>

          {/* Search Input */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyber-muted uppercase block">Search Terms</span>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 text-cyber-muted" size={14} />
              <input 
                type="text"
                placeholder="Keywords..."
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
                className="w-full bg-[#0B1320] border border-cyber-border rounded py-1 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
              />
            </div>
          </div>

          {/* Topic Domain */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyber-muted uppercase block">Topic Domain</span>
            <select
              value={filters.topic}
              onChange={e => handleFilterChange('topic', e.target.value)}
              className="w-full bg-[#0B1320] border border-cyber-border rounded py-1 px-2 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
            >
              <option value="all">All Sectors</option>
              {MOCK_TOPICS.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>
          </div>

          {/* Sentiment Selection */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyber-muted uppercase block">Scored Sentiment</span>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              {['all', 'positive', 'negative', 'mixed', 'neutral'].map(s => (
                <button
                  key={s}
                  onClick={() => handleFilterChange('sentiment', s)}
                  className={`py-1 px-1.5 border rounded uppercase text-center truncate ${
                    filters.sentiment === s 
                      ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold' 
                      : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Reliability Star Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-cyber-muted">
              <span>MIN RELIABILITY</span>
              <span className="text-cyber-accent font-bold">{filters.minReliability} Stars</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={filters.minReliability}
              onChange={e => handleFilterChange('minReliability', parseInt(e.target.value))}
              className="w-full accent-cyber-accent h-1 bg-[#0B1320] rounded-lg cursor-pointer"
            />
          </div>

          {/* Time-Travel History Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-cyber-muted">
              <span>TIME-TRAVEL DEPTH</span>
              <span className="text-cyber-accent font-bold">
                {filters.dateRange === '365' ? '1 Year (All)' : `${filters.dateRange} Days`}
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="90" 
              value={filters.dateRange === '365' ? 90 : filters.dateRange}
              onChange={e => {
                const val = e.target.value;
                handleFilterChange('dateRange', val === '90' ? '365' : val);
              }}
              className="w-full accent-cyber-accent h-1 bg-[#0B1320] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[8px] font-mono text-cyber-muted/70 px-0.5">
              <span>1 DAY</span>
              <span>30 DAYS</span>
              <span>1 YEAR</span>
            </div>
          </div>
        </div>

        {/* Right column: Grid of Articles */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-cyber-muted px-1">
            <span>RESULTS INDEXED: {articles.length}</span>
            <span>REAL-TIME SCORING: ACTIVE</span>
          </div>

          {articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map(art => (
                <div 
                  key={art.id} 
                  className={`bg-[#111A28] border rounded p-4 transition-all duration-300 hover:border-cyber-border/80 flex flex-col justify-between gap-3 border-l-4 ${
                    art.sentiment === 'positive' ? 'border-l-cyber-accent' : 
                    art.sentiment === 'negative' ? 'border-l-[#EF4444]' : 
                    art.sentiment === 'mixed' ? 'border-l-amber-500' : 'border-l-cyber-blue'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-cyber-muted mb-1">
                      <span className="bg-[#0B1320] px-2 py-0.5 rounded border border-cyber-border">
                        {art.source}
                      </span>
                      <span>{new Date(art.timestamp).toLocaleDateString()}</span>
                    </div>

                    <a 
                      href={art.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-sm text-white font-mono hover:text-cyber-accent transition-colors block leading-snug"
                    >
                      {art.headline}
                    </a>

                    <p className="text-xs text-cyber-muted mt-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between border-t border-cyber-border/40 pt-2.5 mt-1 text-[10px] font-mono">
                    {/* Star reliability */}
                    <div className="flex items-center gap-0.5">
                      <span className="text-cyber-muted mr-1">RELIABILITY:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          size={10} 
                          className={star <= art.reliability ? 'fill-amber-400 text-amber-400' : 'text-cyber-border'} 
                        />
                      ))}
                    </div>

                    {/* Keywords and Sentiment pill */}
                    <div className="flex items-center gap-2">
                      <span className="hidden md:inline text-cyber-muted">{art.keywords?.slice(0, 3).join(', ')}</span>
                      <span className={`px-1.5 py-0.2 rounded font-bold uppercase text-[9px] ${
                        art.sentiment === 'positive' ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20' : 
                        art.sentiment === 'negative' ? 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20' : 
                        art.sentiment === 'mixed' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                        'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                      }`}>
                        {art.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-cyber-border rounded p-12 text-center text-cyber-muted font-mono">
              <ShieldAlert size={36} className="mx-auto mb-2 opacity-50" />
              <p>No intelligence records found matching filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
