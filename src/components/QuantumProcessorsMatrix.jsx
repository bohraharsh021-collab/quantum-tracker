import React, { useState, useMemo } from 'react';
import { PROCESSORS_MATRIX } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { Search, ArrowUpDown, Layers, CheckSquare, Square } from 'lucide-react';

export default function QuantumProcessorsMatrix({ articles = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('physicalQubits');
  const [sortOrder, setSortOrder] = useState('desc');
  const [compareList, setCompareList] = useState([]);

  // Combine static processors with dynamic news overrides
  const processorsData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return [...overrides.newProcessors, ...PROCESSORS_MATRIX];
  }, [articles]);

  // Filter processors
  const filteredProcessors = useMemo(() => {
    return processorsData.filter(p => {
      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.qubitType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  // Sort processors
  const sortedProcessors = useMemo(() => {
    return [...filteredProcessors].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredProcessors, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleCompare = (proc) => {
    if (compareList.some(item => item.name === proc.name)) {
      setCompareList(compareList.filter(item => item.name !== proc.name));
    } else {
      if (compareList.length >= 3) {
        alert("Maximum of 3 processors can be compared side-by-side.");
        return;
      }
      setCompareList([...compareList, proc]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Quantum Processors Spec Matrix
        </h1>
        <p className="text-sm text-cyber-muted">
          Comprehensive 18-point technical column layout evaluating superconducting, ion-trap, neutral atom, and photonic quantum computing processors.
        </p>
      </div>

      {/* Control bar */}
      <div className="bg-[#111A28] border border-cyber-border rounded p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3 top-2.5 text-cyber-muted" size={16} />
          <input 
            type="text"
            placeholder="Search processor name, vendor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B1320] border border-cyber-border rounded py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyber-accent font-mono"
          />
        </div>

        <div className="text-xs font-mono text-cyber-muted">
          Select checkbox in row to compare up to 3 processors side-by-side. ({compareList.length}/3 selected)
        </div>
      </div>

      {/* Compare drawer/section if selected */}
      {compareList.length > 0 && (
        <div className="bg-[#111A28] border border-cyber-accent/40 rounded p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-cyber-border/80 pb-2">
            <h3 className="font-bold font-mono text-xs uppercase text-cyber-accent flex items-center gap-2">
              <Layers size={14} /> Side-By-Side Spec Comparison
            </h3>
            <button 
              onClick={() => setCompareList([])} 
              className="text-[10px] font-mono text-cyber-muted hover:text-white"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareList.map(proc => (
              <div key={proc.name} className="bg-[#0B1320] border border-cyber-border rounded p-4 space-y-2 relative">
                <button 
                  onClick={() => toggleCompare(proc)} 
                  className="absolute top-2 right-2 text-cyber-muted hover:text-white text-xs"
                >
                  &times;
                </button>
                <h4 className="font-bold text-sm text-white font-mono">{proc.name}</h4>
                <span className="text-[10px] font-mono text-cyber-blue block uppercase">{proc.manufacturer} ({proc.qubitType})</span>
                
                <div className="divide-y divide-cyber-border/40 text-[11px] font-mono pt-2 space-y-1">
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Physical Qubits:</span> <span className="text-white font-semibold">{proc.physicalQubits}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Logical Qubits:</span> <span className="text-white font-semibold">{proc.logicalQubits || 'N/A'}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Quantum Volume:</span> <span className="text-white font-semibold">{proc.quantumVolume || 'N/A'}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Gate Fidelity (2-Q):</span> <span className="text-cyber-accent font-semibold">{proc.gateFidelity2Q}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Coherence T1 / T2:</span> <span className="text-white">{proc.t1Coherence}us / {proc.t2Coherence}us</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Cooling Temp / Method:</span> <span className="text-white text-right max-w-[120px] truncate">{proc.coolingTemp}mK ({proc.coolingMethod})</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Error Protocol:</span> <span className="text-white text-right max-w-[120px] truncate">{proc.errorMitigation}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Energy Draw / CLOPS:</span> <span className="text-white">{proc.energyConsumption}kW / {proc.clops}</span></div>
                  <div className="flex justify-between py-1"><span className="text-cyber-muted">Status / Model:</span> <span className="text-white uppercase">{proc.devStatus} ({proc.deploymentModel})</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0B1320] text-cyber-muted border-b border-cyber-border uppercase select-none whitespace-nowrap">
              <tr>
                <th className="p-3 text-center">Compare</th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  Name <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('manufacturer')}>
                  Manufacturer <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('qubitType')}>
                  Type <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('physicalQubits')}>
                  Phys Qubits <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('logicalQubits')}>
                  Log Qubits <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('quantumVolume')}>
                  Q.Volume <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white" onClick={() => handleSort('clops')}>
                  CLOPS <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-center">Fid 1-Q</th>
                <th className="p-3 text-center">Fid 2-Q</th>
                <th className="p-3 text-right">T1 Coherence (us)</th>
                <th className="p-3 text-right">T2 Coherence (us)</th>
                <th className="p-3 text-right">Temp (mK)</th>
                <th className="p-3">Cooling Method</th>
                <th className="p-3 font-semibold">Error Mitigation</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deployment</th>
                <th className="p-3 text-right">Power (kW)</th>
                <th className="p-3 text-right">Launch Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-cyber-text whitespace-nowrap">
              {sortedProcessors.map(proc => {
                const isCompared = compareList.some(item => item.name === proc.name);
                return (
                  <tr key={proc.name} className="hover:bg-cyber-blue/5 transition-colors">
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => toggleCompare(proc)} 
                        className="text-cyber-accent hover:text-white"
                      >
                        {isCompared ? <CheckSquare size={14} /> : <Square size={14} />}
                      </button>
                    </td>
                    <td className="p-3 font-bold text-white">{proc.name}</td>
                    <td className="p-3 text-cyber-muted">{proc.manufacturer}</td>
                    <td className="p-3">
                      <span className="bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 rounded text-[10px]">
                        {proc.qubitType}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-cyber-accent">{proc.physicalQubits}</td>
                    <td className="p-3 text-right text-white font-semibold">{proc.logicalQubits || 'N/A'}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.quantumVolume || 'N/A'}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.clops || 'N/A'}</td>
                    <td className="p-3 text-center text-cyber-muted">{proc.gateFidelity1Q}</td>
                    <td className="p-3 text-center text-cyber-accent font-semibold">{proc.gateFidelity2Q}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.t1Coherence}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.t2Coherence}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.coolingTemp}</td>
                    <td className="p-3 text-cyber-muted truncate max-w-[120px]">{proc.coolingMethod}</td>
                    <td className="p-3 text-[11px] truncate max-w-[150px]">{proc.errorMitigation}</td>
                    <td className="p-3">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase ${
                        proc.devStatus === 'Production' ? 'bg-green-500/10 text-green-400' :
                        proc.devStatus === 'Beta' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-cyber-muted'
                      }`}>
                        {proc.devStatus}
                      </span>
                    </td>
                    <td className="p-3 text-cyber-muted">{proc.deploymentModel}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.energyConsumption}</td>
                    <td className="p-3 text-right text-cyber-muted">{proc.launchYear}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
