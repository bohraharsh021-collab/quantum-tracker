import React, { useState, useMemo } from 'react';
import { MOCK_ORGANIZATIONS } from '../data/quantumData';
import { Search, MapPin, Building, Calendar, Cpu, Tag, Globe, ExternalLink, MessageSquare } from 'lucide-react';

export default function DirectoryEngine({ articles = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Multi-national unique countries list
  const countriesList = useMemo(() => {
    return ['All', 'India', 'United States of America', 'United Kingdom', 'Canada', 'Singapore', 'Japan', 'European Union', 'Germany', 'France', 'Australia', 'Israel'];
  }, []);

  const categoriesList = useMemo(() => {
    return ['All', 'Startup', 'Corporation', 'Academic Hub', 'Government Agency'];
  }, []);

  // Filter organizations & map dynamic metrics from news ledger
  const organizationsWithTelemetry = useMemo(() => {
    return MOCK_ORGANIZATIONS.map(org => {
      // Find matching news articles (case-insensitive search)
      const mentions = articles.filter(art => {
        const headline = (art.title || '').toLowerCase();
        const summary = (art.summary || '').toLowerCase();
        const orgName = org.name.toLowerCase();
        return headline.includes(orgName) || summary.includes(orgName);
      });

      // Find funding announcements for this org
      const fundingArticles = mentions.filter(art => art.funding);
      // Find partnerships/procurements
      const partnerArticles = mentions.filter(art => art.partnership || art.procurement);

      return {
        ...org,
        mentionsCount: mentions.length,
        latestMentions: mentions.slice(0, 2),
        latestFunding: fundingArticles.length > 0 ? fundingArticles[0].title : null,
        latestPartnerships: partnerArticles.length > 0 ? partnerArticles[0].title : null
      };
    });
  }, [articles]);

  const filteredOrgs = useMemo(() => {
    return organizationsWithTelemetry.filter(org => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        org.name.toLowerCase().includes(q) ||
        org.focus.toLowerCase().includes(q) ||
        org.description.toLowerCase().includes(q);

      const matchesCountry = countryFilter === 'All' || org.country.toLowerCase().includes(countryFilter.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || 
        (categoryFilter === 'Startup' && org.type === 'Startup') ||
        (categoryFilter === 'Corporation' && org.type === 'Enterprise') ||
        (categoryFilter === 'Academic Hub' && org.type === 'Academic Hub') ||
        (categoryFilter === 'Government Agency' && org.type === 'Government Agency');

      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [organizationsWithTelemetry, searchTerm, countryFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Ecosystem Directory Explorer
        </h1>
        <p className="text-sm text-cyber-muted font-sans">
          Production-grade database tracking global sovereign organizations, research hubs, MNC enterprise, and quantum startups.
        </p>
      </div>

      {/* Configuration Filters */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Search Database</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-cyber-muted" size={14} />
            <input 
              type="text"
              placeholder="Search startup name, focus..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Ecosystem Category</label>
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 px-3 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono cursor-pointer"
          >
            {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Country Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Sovereign Country</label>
          <select 
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 px-3 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono cursor-pointer"
          >
            {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredOrgs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrgs.map(org => (
            <div 
              key={org.id} 
              className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-blue transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2 border-b border-cyber-border/40 pb-2">
                  <div>
                    <h3 className="font-bold text-white text-base font-mono">{org.name}</h3>
                    <span className="text-[9px] text-cyber-blue font-mono font-bold uppercase block mt-0.5">
                      {org.country}
                    </span>
                  </div>
                  <span className="bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold">
                    {org.type || 'Startup'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-cyber-muted font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-cyber-accent" />
                    {org.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    Est. {org.established}
                  </span>
                  {org.funding && (
                    <span className="flex items-center gap-1 text-cyber-accent">
                      <Tag size={11} />
                      {org.funding}
                    </span>
                  )}
                </div>

                <p className="text-xs text-cyber-text leading-relaxed font-sans">
                  {org.description}
                </p>

                {/* Live RSS Mentions widgets */}
                {org.latestMentions.length > 0 && (
                  <div className="bg-[#0B1320] border border-cyber-border/40 rounded p-2.5 space-y-1.5">
                    <span className="text-[9px] font-mono text-cyber-accent uppercase tracking-wider font-bold block flex items-center gap-1">
                      <MessageSquare size={10} />
                      Live Feed Mentions ({org.mentionsCount})
                    </span>
                    {org.latestMentions.map((ment, mIdx) => (
                      <a 
                        key={mIdx} 
                        href={ment.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-[11px] text-cyber-muted font-mono leading-tight hover:text-white transition-colors truncate"
                      >
                        - {ment.title} <ExternalLink size={8} className="inline ml-1" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Core technical fields */}
              <div className="border-t border-cyber-border/40 pt-3 mt-3 flex justify-between items-center text-[10px] font-mono">
                <div>
                  <span className="text-cyber-muted uppercase block">Core Tech Focus</span>
                  <span className="text-cyber-accent font-semibold block mt-0.5">
                    {org.focus}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-cyber-muted uppercase block">Telemetry Profile</span>
                  <span className="text-white block mt-0.5 font-bold">
                    CONNECTED
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-cyber-border rounded p-12 text-center text-cyber-muted font-mono">
          <Building size={36} className="mx-auto mb-2 opacity-50" />
          <p>No organizations found matching the filters.</p>
        </div>
      )}
    </div>
  );
}
