import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { 
  Download, 
  FileText, 
  CheckSquare, 
  Square, 
  Info, 
  CheckCircle,
  FileSpreadsheet,
  FileCode,
  FileDown
} from 'lucide-react';
import { PROCESSORS_MATRIX, VC_FUNDING_ROUNDS, PROCUREMENT_LEDGER, ALLIANCES_NETWORK, MOCK_ORGANIZATIONS } from '../data/quantumData';
import { getDynamicNewsOverrides } from '../utils/newsOverrides';

export default function ExporterEngine({ articles = [] }) {
  const [selectedModules, setSelectedModules] = useState({
    news: true,
    processors: false,
    sovereign: false,
    india: false,
    funding: false,
    procurement: false,
    alliances: false,
    directory: false
  });
  
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exporting, setExporting] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const toggleModule = (mod) => {
    setSelectedModules(prev => ({ ...prev, [mod]: !prev[mod] }));
  };

  const selectAll = () => {
    setSelectedModules({
      news: true, processors: true, sovereign: true, india: true, funding: true, procurement: true, alliances: true, directory: true
    });
  };

  const selectNone = () => {
    setSelectedModules({
      news: false, processors: false, sovereign: false, india: false, funding: false, procurement: false, alliances: false, directory: false
    });
  };

  // Compile full report dataset in memory
  const reportData = useMemo(() => {
    const overrides = getDynamicNewsOverrides(articles);
    return {
      news: articles.slice(0, 50).map(a => ({ title: a.title, source: a.source, date: a.pubDate, country: a.country })),
      processors: [...overrides.newProcessors, ...PROCESSORS_MATRIX].map(p => ({ name: p.name, manufacturer: p.manufacturer, qubits: p.physicalQubits })),
      procurement: [...overrides.newProcurements, ...PROCUREMENT_LEDGER],
      alliances: [...overrides.newAlliances, ...ALLIANCES_NETWORK],
      funding: VC_FUNDING_ROUNDS,
      organizations: MOCK_ORGANIZATIONS.map(o => ({ name: o.name, type: o.type, country: o.country }))
    };
  }, [articles]);

  // Export Trigger
  const triggerExport = () => {
    setExporting(true);
    setDownloadLink(null);

    setTimeout(() => {
      try {
        if (exportFormat === 'json') {
          exportJSON();
        } else if (exportFormat === 'csv') {
          exportCSV();
        } else if (exportFormat === 'markdown' || exportFormat === 'md') {
          exportMarkdown();
        } else if (exportFormat === 'docx' || exportFormat === 'doc') {
          exportDocx();
        } else {
          exportPDF();
        }
      } catch (err) {
        console.error("Export failure:", err);
      } finally {
        setExporting(false);
      }
    }, 800);
  };

  // 1. JSON Exporter
  const exportJSON = () => {
    const compiled = {};
    if (selectedModules.news) compiled.news = reportData.news;
    if (selectedModules.processors) compiled.processors = reportData.processors;
    if (selectedModules.procurement) compiled.procurements = reportData.procurement;
    if (selectedModules.alliances) compiled.alliances = reportData.alliances;
    if (selectedModules.funding) compiled.funding = reportData.funding;
    if (selectedModules.directory) compiled.directory = reportData.organizations;

    const blob = new Blob([JSON.stringify(compiled, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'quantum-telemetry-dossier.json');
  };

  // 2. CSV Exporter
  const exportCSV = () => {
    let csvContent = '';
    
    if (selectedModules.news) {
      csvContent += '--- LATEST INGESTED NEWS ---\nHeadline,Source,Date,Country\n';
      reportData.news.forEach(n => {
        csvContent += `"${n.title.replace(/"/g, '""')}","${n.source}","${n.date}","${n.country}"\n`;
      });
      csvContent += '\n';
    }

    if (selectedModules.processors) {
      csvContent += '--- PROCESSORS SPEC MATRIX ---\nProcessor,Manufacturer,Qubits\n';
      reportData.processors.forEach(p => {
        csvContent += `"${p.name}","${p.manufacturer}",${p.qubits}\n`;
      });
      csvContent += '\n';
    }

    if (selectedModules.procurement) {
      csvContent += '--- PROCUREMENT & CONTRACTS ---\nBuyer,Vendor,Product,Value (M USD),Date,Status\n';
      reportData.procurement.forEach(p => {
        csvContent += `"${p.buyer}","${p.seller}","${p.product}",${p.value},"${p.date}","${p.status}"\n`;
      });
      csvContent += '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, 'quantum-telemetry-dossier.csv');
  };

  // 3. Markdown Exporter
  const exportMarkdown = () => {
    let md = `# Quantum Intelligence Telemetry Dossier\nGenerated on: ${new Date().toLocaleString()}\n\n`;

    if (selectedModules.news) {
      md += `## 📰 Ingested News Wire Ledger\n\n| Headline | Source | Country |\n|---|---|---|\n`;
      reportData.news.forEach(n => {
        md += `| ${n.title} | ${n.source} | ${n.country} |\n`;
      });
      md += '\n';
    }

    if (selectedModules.processors) {
      md += `## 💻 Quantum Processors Spec Matrix\n\n| QPU Processor | Manufacturer | Qubits |\n|---|---|---|\n`;
      reportData.processors.forEach(p => {
        md += `| ${p.name} | ${p.manufacturer} | ${p.qubits} |\n`;
      });
      md += '\n';
    }

    if (selectedModules.procurement) {
      md += `## 💼 Procurement Contracts & Ledgers\n\n| Buyer | Seller | Product | Value |\n|---|---|---|---|\n`;
      reportData.procurement.forEach(p => {
        md += `| ${p.buyer} | ${p.seller} | ${p.product} | $${p.value}M |\n`;
      });
      md += '\n';
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    downloadBlob(blob, 'quantum-telemetry-dossier.md');
  };

  // 4. DOCX (Word Document) Exporter
  const exportDocx = () => {
    // Generate styled HTML that Word opens natively
    let html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Quantum Telemetry Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1 { color: #0b3c5d; border-bottom: 2px solid #0b3c5d; padding-bottom: 5px; }
        h2 { color: #328cc1; margin-top: 25px; }
        table { border-collapse: collapse; width: 100%; margin-top: 10px; }
        th, td { border: 1px solid #d9b310; padding: 8px; text-align: left; font-size: 11px; }
        th { bg-color: #0b3c5d; color: white; }
      </style>
      </head>
      <body>
      <h1>Quantum Command Dossier</h1>
      <p>Report Compiled: ${new Date().toLocaleString()}</p>
    `;

    if (selectedModules.news) {
      html += `<h2>📰 Ingested News Wire Ledger</h2><table><tr><th>Headline</th><th>Source</th><th>Country</th></tr>`;
      reportData.news.forEach(n => {
        html += `<tr><td>${n.title}</td><td>${n.source}</td><td>${n.country}</td></tr>`;
      });
      html += '</table>';
    }

    if (selectedModules.processors) {
      html += `<h2>💻 Processor Specs Matrix</h2><table><tr><th>QPU Name</th><th>Manufacturer</th><th>Qubits</th></tr>`;
      reportData.processors.forEach(p => {
        html += `<tr><td>${p.name}</td><td>${p.manufacturer}</td><td>${p.qubits}</td></tr>`;
      });
      html += '</table>';
    }

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'application/msword' });
    downloadBlob(blob, 'quantum-telemetry-dossier.doc');
  };

  // 5. PDF Exporter using jsPDF
  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("Courier", "bold");
    doc.setFontSize(16);
    doc.text("QUANTUM COMMAND TELEMETRY DOSSIER", 14, y);
    y += 10;
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);
    y += 15;

    if (selectedModules.news) {
      doc.setFont("Courier", "bold");
      doc.setFontSize(12);
      doc.text("1. LATEST INGESTED TELEMETRY WIRE (TOP 10)", 14, y);
      y += 8;
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      reportData.news.slice(0, 10).forEach(n => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const text = `- [${n.source}] ${n.title.substring(0, 80)}...`;
        doc.text(text, 14, y);
        y += 6;
      });
      y += 10;
    }

    if (selectedModules.processors) {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Courier", "bold");
      doc.setFontSize(12);
      doc.text("2. PROCESSOR SPECS MATRIX", 14, y);
      y += 8;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      reportData.processors.slice(0, 10).forEach(p => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const text = `QPU: ${p.name} (${p.manufacturer}) - ${p.qubits} Qubits`;
        doc.text(text, 14, y);
        y += 6;
      });
    }

    doc.save('quantum-telemetry-dossier.pdf');
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
          <Download className="text-cyber-accent" size={24} />
          Telemetry Exporter Engine
        </h1>
        <p className="text-sm text-cyber-muted">
          Select monitoring modules, select target document formatting, and generate structured datasets dynamic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Checklist and Formats */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-6 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-cyber-border/40 pb-2">
            <h2 className="font-mono font-bold text-white text-xs uppercase">
              Select Exporter Columns
            </h2>
            <div className="flex gap-2 text-[10px] font-mono">
              <button onClick={selectAll} className="text-cyber-accent hover:underline">Select All</button>
              <span className="text-cyber-border">|</span>
              <button onClick={selectNone} className="text-cyber-muted hover:underline">Clear</button>
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(selectedModules).map(key => (
              <button
                key={key}
                onClick={() => toggleModule(key)}
                className={`flex items-center gap-3 p-3.5 border rounded font-mono text-xs uppercase text-left transition-all ${
                  selectedModules[key]
                    ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-accent font-bold'
                    : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-white'
                }`}
              >
                {selectedModules[key] ? <CheckSquare size={16} /> : <Square size={16} />}
                <span>{key === 'news' ? 'Ingested News Wire' : `${key} Tracker`}</span>
              </button>
            ))}
          </div>

          {/* Formats Selector */}
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-white text-xs uppercase">
              Select Output Format
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'pdf', label: 'PDF Dossier', icon: <FileDown size={14} /> },
                { id: 'docx', label: 'DOCX Word', icon: <FileText size={14} /> },
                { id: 'csv', label: 'CSV Spreadsheet', icon: <FileSpreadsheet size={14} /> },
                { id: 'json', label: 'JSON Dataset', icon: <FileCode size={14} /> },
                { id: 'markdown', label: 'MD Markdown', icon: <FileText size={14} /> }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setExportFormat(f.id)}
                  className={`p-3 border rounded font-mono text-xs uppercase flex flex-col items-center justify-center gap-2 transition-all ${
                    exportFormat === f.id
                      ? 'bg-cyber-blue/15 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_10px_rgba(0,163,255,0.15)]'
                      : 'bg-[#0B1320] border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-white'
                  }`}
                >
                  {f.icon}
                  <span>{f.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate trigger */}
          <button
            onClick={triggerExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-accent to-cyber-blue hover:opacity-95 text-black font-mono font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            {exporting ? 'Compiling Dossier...' : 'Export Telemetry Document'}
          </button>
        </div>

        {/* Right 1 Col: Info Card */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-6 lg:col-span-1 space-y-4">
          <div className="border-b border-cyber-border/40 pb-2">
            <h2 className="font-mono font-bold text-white text-xs uppercase">
              Exporter Telemetry Info
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#0B1320] border border-cyber-border/50 rounded p-4 text-xs font-mono leading-relaxed space-y-2">
              <div className="text-cyber-accent font-bold">ETL Telemetry Integration:</div>
              <p className="text-cyber-muted">
                The document exporter queries the centralized `telemetryDb.json` file. Any news override modifications generated by the RSS parsing pipeline are dynamically captured and integrated.
              </p>
            </div>

            <div className="bg-cyber-blue/5 border border-cyber-blue/20 p-4 rounded text-xs font-mono flex items-start gap-2 leading-relaxed text-cyber-blue">
              <Info size={16} className="mt-0.5 shrink-0" />
              <div>
                <strong className="uppercase">Academic Citation Note:</strong>
                <p className="mt-1">
                  Exported dossiers can be used as structured datasets for student research papers, policy audits, and engineering reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
