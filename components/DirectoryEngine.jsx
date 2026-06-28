import React, { useState, useMemo } from 'react';
import { MOCK_ORGANIZATIONS } from '../data/quantumData';
import { Search, MapPin, Building, Calendar, Cpu, Tag } from 'lucide-react';

export default function DirectoryEngine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  // Extract unique filter categories
  const types = useMemo(() => {
    return ['All', ...new Set(MOCK_ORGANIZATIONS.map(org => org.type))];
  }, []);

  const countries = useMemo(() => {
    return ['All', ...new Set(MOCK_ORGANIZATIONS.map(org => org.country))];
  }, []);

  // Filter organizations
  const filteredOrgs = useMemo(() => {
    return MOCK_ORGANIZATIONS.filter(org => {
      const matchesSearch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'All' || org.type === typeFilter;
      const matchesCountry = countryFilter === 'All' || org.country === countryFilter;

      return matchesSearch && matchesType && matchesCountry;
    });
  }, [searchTerm, typeFilter, countryFilter]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Ecosystem Directory Engine
        </h1>
        <p className="text-sm text-cyber-muted">
          Detailed directory mapping research institutions, enterprise providers, and startups in India and globally.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
            <input 
              type="text"
              placeholder="Search name, tech, focus..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
            />
          </div>
        </div>

        {/* Organization Type */}
        <div>
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Organization Type</label>
          <select 
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 px-3 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="text-[10px] font-mono uppercase text-cyber-muted block mb-1">Region / Country</label>
          <select 
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 px-3 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredOrgs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrgs.map(org => (
            <div key={org.id} className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4 hover:border-cyber-blue transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-white text-lg font-mono">{org.name}</h3>
                  <span className="bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30 text-xs font-mono px-2 py-0.5 rounded uppercase">
                    {org.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-cyber-muted font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-cyber-accent" />
                    {org.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Est. {org.established}
                  </span>
                  {org.funding && (
                    <span className="flex items-center gap-1 text-cyber-accent bg-cyber-accent/5 px-1 rounded">
                      <Tag size={12} />
                      {org.funding}
                    </span>
                  )}
                </div>

                <p className="text-xs text-cyber-text leading-relaxed pt-2">
                  {org.description}
                </p>
              </div>

              <div className="border-t border-cyber-border/40 pt-3 mt-3">
                <span className="text-[10px] font-mono uppercase text-cyber-muted block">Core Technical Focus</span>
                <span className="text-xs font-mono text-cyber-accent font-semibold block mt-1">
                  {org.focus}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-cyber-border rounded p-12 text-center text-cyber-muted font-mono">
          <Building size={36} className="mx-auto mb-2 opacity-50" />
          <p>No organizations match the selected criteria.</p>
        </div>
      )}
    </div>
  );
}
