import React, { useState, useMemo } from 'react';
import { PROCUREMENT_LEDGER } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { Search, DollarSign } from 'lucide-react';

export default function ProcurementLedger({ articles = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Merge static procurement with dynamic overrides from news feeds
  const procurementData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return [...overrides.newProcurements, ...PROCUREMENT_LEDGER];
  }, [articles]);

  const filteredProcurements = useMemo(() => {
    return procurementData.filter(pr => {
      return (
        pr.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  const totalValue = useMemo(() => {
    return filteredProcurements.reduce((sum, pr) => sum + pr.value, 0);
  }, [filteredProcurements]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Procurement & Contract Ledger
        </h1>
        <p className="text-sm text-cyber-muted">
          Tracks governmental and enterprise procurements of quantum processors, QKD encryption units, and cryogenic infrastructure.
        </p>
      </div>

      {/* Search and Summary Panel */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
          <input 
            type="text"
            placeholder="Search buyer, vendor, system types..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
          />
        </div>

        {/* Total Metric */}
        <div className="bg-[#0B1320] border border-cyber-border/60 rounded p-2 px-4 flex justify-between items-center font-mono">
          <span className="text-[10px] text-cyber-muted uppercase">Ledger Subtotal</span>
          <span className="text-cyber-accent font-bold text-sm flex items-center">
            <DollarSign size={14} />
            {totalValue.toFixed(1)}M
          </span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0B1320] text-cyber-muted border-b border-cyber-border uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Buyer (Agency / Enterprise)</th>
                <th className="p-3">Vendor / Seller</th>
                <th className="p-3">Hardware / Service Product</th>
                <th className="p-3 text-right">Value (USD)</th>
                <th className="p-3">Contract Date</th>
                <th className="p-3">Deployment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-cyber-text">
              {filteredProcurements.map(pr => (
                <tr key={pr.id} className="hover:bg-cyber-blue/5 transition-colors">
                  <td className="p-3 font-bold text-cyber-blue">{pr.id}</td>
                  <td className="p-3 text-white font-bold">{pr.buyer}</td>
                  <td className="p-3 text-cyber-accent">{pr.seller}</td>
                  <td className="p-3">{pr.product}</td>
                  <td className="p-3 text-right font-bold text-cyber-accent">
                    ${pr.value.toFixed(1)}M
                  </td>
                  <td className="p-3 text-cyber-muted">{pr.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      pr.status === 'Delivered' || pr.status === 'Completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20'
                    }`}>
                      {pr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
