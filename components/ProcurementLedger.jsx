import React, { useState, useMemo, useCallback } from 'react';
import { PROCUREMENT_LEDGER } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { 
  Search, 
  DollarSign, 
  Thermometer, 
  Zap, 
  Cpu, 
  Network, 
  ShieldCheck, 
  PieChart, 
  Layers, 
  Calendar,
  Grid,
  Filter
} from 'lucide-react';

export default function ProcurementLedger({ articles = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Merge static procurement ledger with dynamic news telemetry
  const rawProcurements = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return [...overrides.newProcurements, ...PROCUREMENT_LEDGER];
  }, [articles]);

  // Dynamic Categorization Engine
  // Classifies contracts into Cryogenics, Photonics, Fabrication, or Secure Networking
  const categorizedProcurements = useMemo(() => {
    return rawProcurements.map(item => {
      const prodName = (item.product || '').toLowerCase();
      const buyerName = (item.buyer || '').toLowerCase();
      const sellerName = (item.seller || '').toLowerCase();
      const content = `${prodName} ${buyerName} ${sellerName}`;

      let category = 'Fabrication'; // Default category

      if (
        content.includes('qkd') || 
        content.includes('cryptography') || 
        content.includes('secure') || 
        content.includes('network') || 
        content.includes('qrng') || 
        content.includes('key') || 
        content.includes('comms') || 
        content.includes('encryption')
      ) {
        category = 'Secure Networking';
      } else if (
        content.includes('refrigerator') || 
        content.includes('fridge') || 
        content.includes('dilution') || 
        content.includes('cooling') || 
        content.includes('helium') || 
        content.includes('cryo') || 
        content.includes('isotope')
      ) {
        category = 'Cryogenics';
      } else if (
        content.includes('photon') || 
        content.includes('laser') || 
        content.includes('optic') || 
        content.includes('detector') || 
        content.includes('spectroscopy') || 
        content.includes('boson') || 
        content.includes('light')
      ) {
        category = 'Photonics';
      } else if (
        content.includes('fab') || 
        content.includes('foundry') || 
        content.includes('lithography') || 
        content.includes('cleanroom') || 
        content.includes('silicon') || 
        content.includes('wafer') || 
        content.includes('packaging') || 
        content.includes('processor') ||
        content.includes('chip')
      ) {
        category = 'Fabrication';
      }

      return {
        ...item,
        category
      };
    });
  }, [rawProcurements]);

  // Compute category spending stats
  const categoryStats = useMemo(() => {
    const stats = {
      'Cryogenics': { total: 0, count: 0 },
      'Photonics': { total: 0, count: 0 },
      'Fabrication': { total: 0, count: 0 },
      'Secure Networking': { total: 0, count: 0 }
    };

    categorizedProcurements.forEach(pr => {
      if (stats[pr.category]) {
        stats[pr.category].total += pr.value;
        stats[pr.category].count += 1;
      }
    });

    return stats;
  }, [categorizedProcurements]);

  // Filtered procurements list
  const filteredProcurements = useMemo(() => {
    return categorizedProcurements.filter(pr => {
      // 1. Search term match
      const matchesSearch = 
        pr.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.id.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category filter match
      const matchesCategory = selectedCategory === 'All' || pr.category === selectedCategory;

      // 3. Status filter match
      const matchesStatus = 
        selectedStatus === 'All' || 
        (selectedStatus === 'Active' && (pr.status === 'Active' || pr.status === 'Active Delivery')) ||
        (selectedStatus === 'Completed' && (pr.status === 'Completed' || pr.status === 'Delivered'));

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [categorizedProcurements, searchTerm, selectedCategory, selectedStatus]);

  // Calculate sum of active contract values
  const totalLedgerValue = useMemo(() => {
    return filteredProcurements.reduce((sum, pr) => sum + pr.value, 0);
  }, [filteredProcurements]);

  const handleCategoryFilter = useCallback((cat) => {
    setSelectedCategory(cat);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setSelectedStatus(status);
  }, []);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="border-b border-cyber-border pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
            <ShieldCheck className="text-cyber-accent" size={24} />
            Procurement & Contract Ledger
          </h1>
          <p className="text-sm text-cyber-muted font-sans">
            Audits dynamic civilian and defense procurements, categorizing expenditure across key quantum hardware and infrastructure pillars.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-cyber-muted">
          TELEMETRY CONNECTION: <span className="text-cyber-accent font-bold">NOMINAL</span>
        </div>
      </div>

      {/* Category Spending Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Cryogenics spending card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-blue transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Thermometer size={48} className="text-cyber-blue" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted uppercase block">Cryogenics Contracts</span>
          <span className="text-2xl font-bold text-white font-mono block mt-1">
            ${categoryStats['Cryogenics'].total.toFixed(2)}M
          </span>
          <span className="text-[10px] font-mono text-cyber-blue mt-1.5 block">
            {categoryStats['Cryogenics'].count} active deals logged
          </span>
        </div>

        {/* Photonics spending card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-cyber-accent transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Zap size={48} className="text-cyber-accent" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted uppercase block">Photonics Contracts</span>
          <span className="text-2xl font-bold text-white font-mono block mt-1">
            ${categoryStats['Photonics'].total.toFixed(2)}M
          </span>
          <span className="text-[10px] font-mono text-cyber-accent mt-1.5 block">
            {categoryStats['Photonics'].count} active deals logged
          </span>
        </div>

        {/* Fabrication spending card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-amber-500 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Cpu size={48} className="text-amber-500" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted uppercase block">Fabrication Contracts</span>
          <span className="text-2xl font-bold text-white font-mono block mt-1">
            ${categoryStats['Fabrication'].total.toFixed(2)}M
          </span>
          <span className="text-[10px] font-mono text-amber-500 mt-1.5 block">
            {categoryStats['Fabrication'].count} active deals logged
          </span>
        </div>

        {/* Secure Networking spending card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-4 relative overflow-hidden group hover:border-purple-400 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Network size={48} className="text-purple-400" />
          </div>
          <span className="text-[10px] font-mono text-cyber-muted uppercase block">Secure Networking</span>
          <span className="text-2xl font-bold text-white font-mono block mt-1">
            ${categoryStats['Secure Networking'].total.toFixed(2)}M
          </span>
          <span className="text-[10px] font-mono text-purple-400 mt-1.5 block">
            {categoryStats['Secure Networking'].count} active deals logged
          </span>
        </div>
      </div>

      {/* Control panel: Search & Filters */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
            <input 
              type="text"
              placeholder="Search contracts by buyer, seller, or system types..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2 bg-[#0B1320] border border-cyber-border rounded px-2.5 py-1.5 text-xs font-mono">
            <Filter size={12} className="text-cyber-muted" />
            <span className="text-cyber-muted uppercase text-[10px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => handleStatusFilter(e.target.value)}
              className="bg-transparent text-white border-none focus:ring-0 p-0 text-xs cursor-pointer focus:outline-none uppercase font-bold"
            >
              <option value="All" className="bg-[#111A28]">All Statuses</option>
              <option value="Active" className="bg-[#111A28]">Active / In Delivery</option>
              <option value="Completed" className="bg-[#111A28]">Completed / Delivered</option>
            </select>
          </div>

          {/* Aggregate subtotal */}
          <div className="bg-[#0B1320] border border-cyber-border/80 rounded p-1.5 px-4 flex justify-between items-center font-mono text-xs">
            <span className="text-[10px] text-cyber-muted uppercase">Ledger Subtotal:</span>
            <span className="text-cyber-accent font-bold text-sm flex items-center">
              <DollarSign size={14} />
              {totalLedgerValue.toFixed(2)}M
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-cyber-border/40">
          <span className="text-[9px] font-mono text-cyber-muted uppercase self-center mr-2">Category Filters:</span>
          {['All', 'Cryogenics', 'Photonics', 'Fabrication', 'Secure Networking'].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-3 py-1 font-mono text-[10px] uppercase rounded border transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_10px_rgba(0,163,255,0.08)]' 
                  : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Data Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="bg-[#0B1320] text-cyber-muted border-b border-cyber-border uppercase text-[10px]">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Category</th>
                <th className="p-3">Buyer (Agency / Enterprise)</th>
                <th className="p-3">Vendor / Seller</th>
                <th className="p-3">Hardware / Service Product</th>
                <th className="p-3 text-right">Value (USD)</th>
                <th className="p-3">Contract Date</th>
                <th className="p-3">Deployment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-cyber-text">
              {filteredProcurements.length > 0 ? (
                filteredProcurements.map(pr => (
                  <tr key={pr.id} className="hover:bg-cyber-blue/5 transition-colors">
                    <td className="p-3 font-bold text-cyber-blue">{pr.id}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        pr.category === 'Cryogenics' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' :
                        pr.category === 'Photonics' ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20' :
                        pr.category === 'Fabrication' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {pr.category}
                      </span>
                    </td>
                    <td className="p-3 text-white font-semibold">{pr.buyer}</td>
                    <td className="p-3 text-cyber-accent">{pr.seller}</td>
                    <td className="p-3 text-white">{pr.product}</td>
                    <td className="p-3 text-right font-bold text-cyber-accent">
                      ${pr.value.toFixed(2)}M
                    </td>
                    <td className="p-3 text-cyber-muted text-[11px]">{pr.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${
                        pr.status === 'Delivered' || pr.status === 'Completed'
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/20 animate-pulse'
                      }`}>
                        {pr.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-cyber-muted font-mono text-xs uppercase border-t border-cyber-border">
                    No procurement records match search query or category filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
