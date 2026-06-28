import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { MOCK_ALERTS, PROCESSORS_MATRIX, VC_FUNDING_ROUNDS, SOVEREIGN_FUNDING } from '../data/quantumData';
import { FileText, Download, Check, RefreshCw } from 'lucide-react';

export default function ReportsPortal({ articles }) {
  const [incSummary, setIncSummary] = useState(true);
  const [incProcessors, setIncProcessors] = useState(true);
  const [incFunding, setIncFunding] = useState(true);
  const [incAlerts, setIncAlerts] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState('');

  const executePDFCompilation = async () => {
    setIsCompiling(true);
    setCompileStatus('Initializing PDF Engine...');
    
    try {
      await new Promise(r => setTimeout(r, 600));
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yOffset = 20;

      const writeText = (text, size, fontStyle = 'normal', color = [33, 48, 71], spacing = 6) => {
        doc.setFont('Helvetica', fontStyle);
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, pageWidth - 30);
        
        if (yOffset + (lines.length * spacing) > pageHeight - 20) {
          doc.addPage();
          // Header line on new page
          doc.setDrawColor(34, 48, 71);
          doc.line(15, 10, pageWidth - 15, 10);
          yOffset = 20;
        }
        doc.text(lines, 15, yOffset);
        yOffset += (lines.length * spacing);
      };

      // 1. Draw Cover / Banner
      doc.setFillColor(11, 19, 32); // #0B1320
      doc.rect(0, 0, pageWidth, 42, 'F');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 230, 153); // #00E699 (Neon Accent)
      doc.text("QUANTUM COMPUTER DATA INTELLIGENCE", 15, 18);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // #64748B
      doc.text(`CONFIDENTIAL EXECUTIVE REPORT | GENERATED: ${new Date().toLocaleString()}`, 15, 26);
      doc.text(`SECURITY LEVEL: LEVEL-9 HIGHLY SECURED (ZERO SHIELD DATA LINK)`, 15, 32);

      doc.setDrawColor(0, 230, 153);
      doc.setLineWidth(0.8);
      doc.line(0, 42, pageWidth, 42);

      yOffset = 55;

      // 2. Executive summary
      if (incSummary) {
        setCompileStatus('Adding Executive Index...');
        writeText("1. EXECUTIVE SUMMARY INDEX", 12, 'bold', [0, 163, 255], 8);
        writeText("This dossier aggregates intelligence on the global quantum computing sector, with special emphasis on the Indian National Quantum Mission (NQM), quantum hardware matrix configurations, venture capital activity, and alert networks.", 9, 'normal', [100, 116, 139], 5);
        yOffset += 4;
        
        // India NQM info
        const nqm = SOVEREIGN_FUNDING.find(f => f.country === 'India');
        if (nqm) {
          writeText(`India NQM Budget: INR 6,003 Crore (Period: ${nqm.period})`, 10, 'bold', [255, 255, 255], 6);
          nqm.focusAreas.forEach(a => {
            writeText(`- ${a.name} (${a.allocation}): ${a.description}`, 8.5, 'normal', [100, 116, 139], 5);
          });
        }
        yOffset += 6;
      }

      // 3. Hardware Processor Matrix
      if (incProcessors) {
        setCompileStatus('Compiling Processor Matrix...');
        writeText("2. HARDWARE PROCESSORS MATRIX", 12, 'bold', [0, 163, 255], 8);
        writeText("Comparing peak operational quantum hardware chips across global and domestic developers (comprising physical and logical qubits, coherence metrics, and error profiles):", 9, 'normal', [100, 116, 139], 5);
        yOffset += 3;

        PROCESSORS_MATRIX.forEach((p, idx) => {
          const detail = `${idx + 1}. ${p.name} (${p.manufacturer}) - ${p.qubitType} platform`;
          writeText(detail, 9.5, 'bold', [255, 255, 255], 5);
          
          const spec = `   Specs: Qubits: ${p.physicalQubits} Phys / ${p.logicalQubits} Log | Gate Fidelity: ${p.gateFidelity2Q} | T1 Coherence: ${p.t1Coherence}us | Temp: ${p.coolingTemp}mK | Status: ${p.devStatus}`;
          writeText(spec, 8.5, 'normal', [100, 116, 139], 5);
          yOffset += 2;
        });
        yOffset += 6;
      }

      // 4. Financial VC Funding Ledgers
      if (incFunding) {
        setCompileStatus('Exporting Financial Ledger...');
        writeText("3. VENTURE CAPITAL & FINANCIAL LEDGER", 12, 'bold', [0, 163, 255], 8);
        writeText("Recent funding rounds documented across Indian and international startups:", 9, 'normal', [100, 116, 139], 5);
        yOffset += 3;

        VC_FUNDING_ROUNDS.forEach(round => {
          const info = `- ${round.startup} (${round.country}): $${round.amount}M in ${round.round}. Lead: ${round.leadInvestors}`;
          writeText(info, 9, 'normal', [255, 255, 255], 5);
        });
        yOffset += 6;
      }

      // 5. Threat Alert Center
      if (incAlerts) {
        setCompileStatus('Adding Alert Signals...');
        writeText("4. CYBER SHIELD DETECTED THREATS", 12, 'bold', [0, 163, 255], 8);
        
        MOCK_ALERTS.forEach(alert => {
          const detail = `[${alert.severity.toUpperCase()}] ${alert.title}`;
          writeText(detail, 9.5, 'bold', alert.severity === 'critical' ? [239, 68, 68] : [245, 158, 11], 5);
          writeText(`Description: ${alert.description}`, 8.5, 'normal', [100, 116, 139], 5);
          yOffset += 2;
        });
      }

      // Save PDF
      setCompileStatus('Saving PDF file...');
      doc.save(`Quantum_Computing_Intelligence_Report_${Date.now()}.pdf`);
      setCompileStatus('Report exported successfully!');
      
      setTimeout(() => {
        setIsCompiling(false);
        setCompileStatus('');
      }, 2000);

    } catch (err) {
      console.error(err);
      setCompileStatus(`Compilation Error: ${err.message}`);
      setTimeout(() => {
        setIsCompiling(false);
      }, 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase">
          Intelligence Dossier Portal
        </h1>
        <p className="text-sm text-cyber-muted">
          Compile active telemetry, security signals, hardware specifications, and financial transactions into a portable PDF dossier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config Card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <h2 className="text-base font-bold font-mono text-white uppercase border-b border-cyber-border pb-2">
            Report Section Configuration
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-cyber-text cursor-pointer hover:text-cyber-accent">
              <input 
                type="checkbox" 
                checked={incSummary}
                onChange={e => setIncSummary(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-[#0B1320] text-cyber-accent focus:ring-0 accent-cyber-accent"
              />
              Include Executive Index & Indian NQM Overview
            </label>

            <label className="flex items-center gap-3 text-sm text-cyber-text cursor-pointer hover:text-cyber-accent">
              <input 
                type="checkbox" 
                checked={incProcessors}
                onChange={e => setIncProcessors(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-[#0B1320] text-cyber-accent focus:ring-0 accent-cyber-accent"
              />
              Include Hardware Processors Comparison Spec
            </label>

            <label className="flex items-center gap-3 text-sm text-cyber-text cursor-pointer hover:text-cyber-accent">
              <input 
                type="checkbox" 
                checked={incFunding}
                onChange={e => setIncFunding(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-[#0B1320] text-cyber-accent focus:ring-0 accent-cyber-accent"
              />
              Include Venture Capital and Funding Ledger
            </label>

            <label className="flex items-center gap-3 text-sm text-cyber-text cursor-pointer hover:text-cyber-accent">
              <input 
                type="checkbox" 
                checked={incAlerts}
                onChange={e => setIncAlerts(e.target.checked)}
                className="w-4 h-4 rounded border-cyber-border bg-[#0B1320] text-cyber-accent focus:ring-0 accent-cyber-accent"
              />
              Include Security Shield Cyber Alert Register
            </label>
          </div>

          <button 
            onClick={executePDFCompilation}
            disabled={isCompiling}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyber-accent hover:bg-cyber-accent/80 text-cyber-bg font-mono font-bold text-sm rounded transition-all disabled:opacity-50"
          >
            {isCompiling ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <Download size={16} />
            )}
            {isCompiling ? 'Compiling Dossier...' : 'Compile & Download PDF'}
          </button>

          {compileStatus && (
            <div className="bg-[#0B1320] border border-cyber-border text-xs font-mono p-3 rounded text-cyber-accent flex items-center gap-2 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent"></span>
              {compileStatus}
            </div>
          )}
        </div>

        {/* Live Preview Wrapper */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 space-y-4">
          <h2 className="text-base font-bold font-mono text-white uppercase border-b border-cyber-border pb-2">
            Editorial Preview
          </h2>

          <div className="border border-cyber-border bg-[#0B1320] p-6 rounded text-xs font-mono space-y-4 relative overflow-hidden h-[300px] overflow-y-auto">
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 text-[#EF4444] opacity-5 font-bold text-6xl tracking-widest pointer-events-none select-none">
              RESTRICTED
            </div>

            <div className="flex justify-between border-b border-cyber-border/40 pb-2">
              <span className="text-cyber-accent font-bold">QUANTUM INTEL PORTAL REPORTS</span>
              <span className="text-cyber-muted">CLEARANCE: LEVEL-9</span>
            </div>

            {incSummary && (
              <div className="space-y-1">
                <span className="text-cyber-blue font-bold block">1. EXECUTIVE SUMMARY INDEX</span>
                <span className="text-cyber-muted block">Active quantum developments & National Quantum Mission statistics compiled.</span>
              </div>
            )}

            {incProcessors && (
              <div className="space-y-1">
                <span className="text-cyber-blue font-bold block">2. HARDWARE PROCESSORS MATRIX</span>
                <span className="text-cyber-muted block">Physical/logical qubits, coherence T1/T2, and temperature calibrations logged.</span>
              </div>
            )}

            {incFunding && (
              <div className="space-y-1">
                <span className="text-cyber-blue font-bold block">3. VENTURE CAPITAL & FINANCIAL LEDGER</span>
                <span className="text-cyber-muted block">Mapping local (QNu Labs, QpiAI) and global private capital disbursements.</span>
              </div>
            )}

            {incAlerts && (
              <div className="space-y-1">
                <span className="text-cyber-blue font-bold block">4. CYBER SHIELD DETECTED THREATS</span>
                <span className="text-cyber-muted block">Security signals, Shor\'s decryption risks, and cooling anomalies cataloged.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
