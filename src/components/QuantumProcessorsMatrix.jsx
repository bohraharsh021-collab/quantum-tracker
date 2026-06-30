import React, { useState, useMemo, useCallback } from 'react';
import { PROCESSORS_MATRIX } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';
import { Search, ArrowUpDown, Layers, CheckSquare, Square, Zap, Award } from 'lucide-react';

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
  }, [searchTerm, processorsData]);

  // Sort processors
  const sortedProcessors = useMemo(() => {
    return [...filteredProcessors].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredProcessors, sortField, sortOrder]);

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField]);

  // Support up to 6 processors side-by-side
  const toggleCompare = useCallback((proc) => {
    setCompareList(prevList => {
      if (prevList.some(item => item.name === proc.name)) {
        return prevList.filter(item => item.name !== proc.name);
      } else {
        if (prevList.length >= 6) {
          alert("Maximum of 6 processors can be compared side-by-side.");
          return prevList;
        }
        return [...prevList, proc];
      }
    });
  }, []);

  // Spec parser utilities for highlighting best values
  const parseFidelity = useCallback((val) => {
    if (!val || val === 'N/A') return 0;
    return parseFloat(val.toString().replace('%', '')) || 0;
  }, []);

  const parseNum = useCallback((val) => {
    if (val === undefined || val === null || val === 'N/A') return 0;
    return Number(val) || 0;
  }, []);

  // Compute best specs among compared processors
  const compareBestSpecs = useMemo(() => {
    if (compareList.length === 0) return {};
    let maxPhys = 0, maxLog = 0, maxQV = 0, maxFid1 = 0, maxFid2 = 0, maxT1 = 0, maxT2 = 0, maxClops = 0;
    
    compareList.forEach(proc => {
      maxPhys = Math.max(maxPhys, parseNum(proc.physicalQubits));
      maxLog = Math.max(maxLog, parseNum(proc.logicalQubits));
      maxQV = Math.max(maxQV, parseNum(proc.quantumVolume));
      maxFid1 = Math.max(maxFid1, parseFidelity(proc.gateFidelity1Q));
      maxFid2 = Math.max(maxFid2, parseFidelity(proc.gateFidelity2Q));
      maxT1 = Math.max(maxT1, parseNum(proc.t1Coherence));
      maxT2 = Math.max(maxT2, parseNum(proc.t2Coherence));
      maxClops = Math.max(maxClops, parseNum(proc.clops));
    });

    return {
      physicalQubits: maxPhys,
      logicalQubits: maxLog,
      quantumVolume: maxQV,
      gateFidelity1Q: maxFid1,
      gateFidelity2Q: maxFid2,
      t1Coherence: maxT1,
      t2Coherence: maxT2,
      clops: maxClops
    };
  }, [compareList, parseNum, parseFidelity]);

  // Compute best specs among all processors (for table cells highlight)
  const tableBestSpecs = useMemo(() => {
    let maxPhys = 0, maxLog = 0, maxQV = 0, maxFid1 = 0, maxFid2 = 0, maxT1 = 0, maxT2 = 0, maxClops = 0;
    
    processorsData.forEach(proc => {
      maxPhys = Math.max(maxPhys, parseNum(proc.physicalQubits));
      maxLog = Math.max(maxLog, parseNum(proc.logicalQubits));
      maxQV = Math.max(maxQV, parseNum(proc.quantumVolume));
      maxFid1 = Math.max(maxFid1, parseFidelity(proc.gateFidelity1Q));
      maxFid2 = Math.max(maxFid2, parseFidelity(proc.gateFidelity2Q));
      maxT1 = Math.max(maxT1, parseNum(proc.t1Coherence));
      maxT2 = Math.max(maxT2, parseNum(proc.t2Coherence));
      maxClops = Math.max(maxClops, parseNum(proc.clops));
    });

    return {
      physicalQubits: maxPhys,
      logicalQubits: maxLog,
      quantumVolume: maxQV,
      gateFidelity1Q: maxFid1,
      gateFidelity2Q: maxFid2,
      t1Coherence: maxT1,
      t2Coherence: maxT2,
      clops: maxClops
    };
  }, [processorsData, parseNum, parseFidelity]);

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
          Select checkbox in row to compare up to 6 processors side-by-side. ({compareList.length}/6 selected)
        </div>
      </div>

      {/* Compare Drawer (opens instantly when compareList has elements) */}
      {compareList.length > 0 && (
        <div className="bg-[#111A28] border border-cyber-accent/60 rounded p-5 space-y-4 shadow-[0_0_20px_rgba(0,230,153,0.05)] transition-all duration-300">
          <div className="flex justify-between items-center border-b border-cyber-border/80 pb-2">
            <h3 className="font-bold font-mono text-xs uppercase text-cyber-accent flex items-center gap-2">
              <Layers size={14} /> Side-By-Side Spec Comparison (Best specs highlighted in green <Zap size={10} className="inline text-emerald-400 fill-emerald-400" />)
            </h3>
            <button 
              onClick={() => setCompareList([])} 
              className="text-[10px] font-mono text-cyber-muted hover:text-white border border-cyber-border px-2 py-0.5 rounded hover:bg-cyber-accent hover:text-cyber-bg transition-colors"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {compareList.map(proc => {
              const physVal = parseNum(proc.physicalQubits);
              const logVal = parseNum(proc.logicalQubits);
              const qvVal = parseNum(proc.quantumVolume);
              const fid1Val = parseFidelity(proc.gateFidelity1Q);
              const fid2Val = parseFidelity(proc.gateFidelity2Q);
              const t1Val = parseNum(proc.t1Coherence);
              const t2Val = parseNum(proc.t2Coherence);
              const clopsVal = parseNum(proc.clops);

              const isBestPhys = physVal === compareBestSpecs.physicalQubits && physVal > 0;
              const isBestLog = logVal === compareBestSpecs.logicalQubits && logVal > 0;
              const isBestQV = qvVal === compareBestSpecs.quantumVolume && qvVal > 0;
              const isBestFid1 = fid1Val === compareBestSpecs.gateFidelity1Q && fid1Val > 0;
              const isBestFid2 = fid2Val === compareBestSpecs.gateFidelity2Q && fid2Val > 0;
              const isBestT1 = t1Val === compareBestSpecs.t1Coherence && t1Val > 0;
              const isBestT2 = t2Val === compareBestSpecs.t2Coherence && t2Val > 0;
              const isBestClops = clopsVal === compareBestSpecs.clops && clopsVal > 0;

              return (
                <div key={proc.name} className="bg-[#0B1320] border border-cyber-border hover:border-cyber-blue rounded p-3.5 space-y-2 relative transition-all">
                  <button 
                    onClick={() => toggleCompare(proc)} 
                    className="absolute top-2 right-2 text-cyber-muted hover:text-[#EF4444] text-sm font-bold"
                    title="Remove from comparison"
                  >
                    &times;
                  </button>
                  <h4 className="font-bold text-xs text-white font-mono truncate pr-4">{proc.name}</h4>
                  <span className="text-[9px] font-mono text-cyber-blue block uppercase truncate">
                    {proc.manufacturer}
                  </span>
                  
                  <div className="divide-y divide-cyber-border/40 text-[10px] font-mono pt-2 space-y-1">
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">Phys Qubits:</span>
                      <span className={`font-semibold ${isBestPhys ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.physicalQubits} {isBestPhys && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">Log Qubits:</span>
                      <span className={`font-semibold ${isBestLog ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.logicalQubits || '0'} {isBestLog && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">Q.Volume:</span>
                      <span className={`font-semibold ${isBestQV ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.quantumVolume || 'N/A'} {isBestQV && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">Fidelity 1-Q:</span>
                      <span className={`font-semibold ${isBestFid1 ? 'text-emerald-400 flex items-center gap-0.5' : 'text-cyber-accent'}`}>
                        {proc.gateFidelity1Q} {isBestFid1 && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">Fidelity 2-Q:</span>
                      <span className={`font-semibold ${isBestFid2 ? 'text-emerald-400 flex items-center gap-0.5' : 'text-cyber-accent'}`}>
                        {proc.gateFidelity2Q} {isBestFid2 && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">T1 (us):</span>
                      <span className={`font-semibold ${isBestT1 ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.t1Coherence} {isBestT1 && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">T2 (us):</span>
                      <span className={`font-semibold ${isBestT2 ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.t2Coherence} {isBestT2 && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-cyber-muted">CLOPS:</span>
                      <span className={`font-semibold ${isBestClops ? 'text-emerald-400 flex items-center gap-0.5' : 'text-white'}`}>
                        {proc.clops || 'N/A'} {isBestClops && <Zap size={8} className="fill-emerald-400" />}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 text-right">
                      <span className="text-cyber-muted">Cooling:</span>
                      <span className="text-white truncate max-w-[80px]" title={`${proc.coolingTemp}mK (${proc.coolingMethod})`}>
                        {proc.coolingTemp}mK
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-cyber-muted">Status:</span>
                      <span className="text-white uppercase text-[8px]">{proc.devStatus}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Table Container with height constraint and sticky headers */}
      <div className="bg-[#111A28] border border-cyber-border rounded overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto overflow-x-auto relative">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="text-cyber-muted border-b border-cyber-border uppercase select-none whitespace-nowrap sticky top-0 z-20">
              <tr className="bg-[#0B1320]">
                <th className="p-3 text-center sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Compare</th>
                <th className="p-3 cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('name')}>
                  Name <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('manufacturer')}>
                  Manufacturer <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('qubitType')}>
                  Type <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('physicalQubits')}>
                  Phys Qubits <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('logicalQubits')}>
                  Log Qubits <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('quantumVolume')}>
                  Q.Volume <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-right cursor-pointer hover:text-white sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border" onClick={() => handleSort('clops')}>
                  CLOPS <ArrowUpDown size={12} className="inline ml-1" />
                </th>
                <th className="p-3 text-center sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Fid 1-Q</th>
                <th className="p-3 text-center sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Fid 2-Q</th>
                <th className="p-3 text-right sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">T1 (us)</th>
                <th className="p-3 text-right sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">T2 (us)</th>
                <th className="p-3 text-right sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Temp (mK)</th>
                <th className="p-3 sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Cooling Method</th>
                <th className="p-3 font-semibold sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Error Mitigation</th>
                <th className="p-3 sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Status</th>
                <th className="p-3 sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Deployment</th>
                <th className="p-3 text-right sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Power (kW)</th>
                <th className="p-3 text-right sticky top-0 z-20 bg-[#0B1320] border-b border-cyber-border">Launch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-cyber-text whitespace-nowrap">
              {sortedProcessors.map(proc => {
                const isCompared = compareList.some(item => item.name === proc.name);
                
                const physVal = parseNum(proc.physicalQubits);
                const logVal = parseNum(proc.logicalQubits);
                const qvVal = parseNum(proc.quantumVolume);
                const clopsVal = parseNum(proc.clops);
                const fid1Val = parseFidelity(proc.gateFidelity1Q);
                const fid2Val = parseFidelity(proc.gateFidelity2Q);
                const t1Val = parseNum(proc.t1Coherence);
                const t2Val = parseNum(proc.t2Coherence);

                const isBestPhys = physVal === tableBestSpecs.physicalQubits && physVal > 0;
                const isBestLog = logVal === tableBestSpecs.logicalQubits && logVal > 0;
                const isBestQV = qvVal === tableBestSpecs.quantumVolume && qvVal > 0;
                const isBestClops = clopsVal === tableBestSpecs.clops && clopsVal > 0;
                const isBestFid1 = fid1Val === tableBestSpecs.gateFidelity1Q && fid1Val > 0;
                const isBestFid2 = fid2Val === tableBestSpecs.gateFidelity2Q && fid2Val > 0;
                const isBestT1 = t1Val === tableBestSpecs.t1Coherence && t1Val > 0;
                const isBestT2 = t2Val === tableBestSpecs.t2Coherence && t2Val > 0;

                return (
                  <tr key={proc.name} className={`hover:bg-cyber-blue/5 transition-colors ${isCompared ? 'bg-cyber-accent/5' : ''}`}>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => toggleCompare(proc)} 
                        className="text-cyber-accent hover:text-white"
                        aria-label={`Compare ${proc.name}`}
                      >
                        {isCompared ? <CheckSquare size={14} /> : <Square size={14} />}
                      </button>
                    </td>
                    <td className="p-3 font-bold text-white flex items-center gap-1.5">
                      {proc.name}
                      {(isBestPhys || isBestFid2 || isBestT1) && (
                        <Award size={12} className="text-emerald-400" title="Top Performer Spec" />
                      )}
                    </td>
                    <td className="p-3 text-cyber-muted">{proc.manufacturer}</td>
                    <td className="p-3">
                      <span className="bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 rounded text-[10px]">
                        {proc.qubitType}
                      </span>
                    </td>
                    {/* Phys Qubits */}
                    <td className={`p-3 text-right font-bold ${isBestPhys ? 'text-emerald-400 bg-emerald-500/5' : 'text-cyber-accent'}`}>
                      {proc.physicalQubits}
                    </td>
                    {/* Log Qubits */}
                    <td className={`p-3 text-right font-semibold ${isBestLog ? 'text-emerald-400 bg-emerald-500/5' : 'text-white'}`}>
                      {proc.logicalQubits || '0'}
                    </td>
                    {/* Q.Volume */}
                    <td className={`p-3 text-right ${isBestQV ? 'text-emerald-400 bg-emerald-500/5 font-semibold' : 'text-cyber-muted'}`}>
                      {proc.quantumVolume || 'N/A'}
                    </td>
                    {/* CLOPS */}
                    <td className={`p-3 text-right ${isBestClops ? 'text-emerald-400 bg-emerald-500/5 font-semibold' : 'text-cyber-muted'}`}>
                      {proc.clops || 'N/A'}
                    </td>
                    {/* Fid 1-Q */}
                    <td className={`p-3 text-center ${isBestFid1 ? 'text-emerald-400 bg-emerald-500/5 font-semibold' : 'text-cyber-muted'}`}>
                      {proc.gateFidelity1Q}
                    </td>
                    {/* Fid 2-Q */}
                    <td className={`p-3 text-center font-semibold ${isBestFid2 ? 'text-emerald-400 bg-emerald-500/5' : 'text-cyber-accent'}`}>
                      {proc.gateFidelity2Q}
                    </td>
                    {/* T1 */}
                    <td className={`p-3 text-right ${isBestT1 ? 'text-emerald-400 bg-emerald-500/5 font-semibold' : 'text-cyber-muted'}`}>
                      {proc.t1Coherence}
                    </td>
                    {/* T2 */}
                    <td className={`p-3 text-right ${isBestT2 ? 'text-emerald-400 bg-emerald-500/5 font-semibold' : 'text-cyber-muted'}`}>
                      {proc.t2Coherence}
                    </td>
                    {/* coolingTemp */}
                    <td className="p-3 text-right text-cyber-muted">{proc.coolingTemp}</td>
                    <td className="p-3 text-cyber-muted truncate max-w-[120px]">{proc.coolingMethod}</td>
                    <td className="p-3 text-[11px] truncate max-w-[150px]">{proc.errorMitigation}</td>
                    <td className="p-3">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase ${
                        proc.devStatus === 'Production' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        proc.devStatus === 'Beta' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        proc.devStatus === 'R&D' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-gray-500/10 text-cyber-muted'
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

