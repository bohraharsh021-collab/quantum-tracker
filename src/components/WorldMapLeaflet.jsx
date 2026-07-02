import React, { useEffect, useRef, useState } from 'react';
import { MOCK_HUBS } from '../data/quantumData';
import { Shield, Info, Compass, Globe, Award } from 'lucide-react';

const getCoordinates = (node) => {
  if (!node || !node.coordinates) return { lat: 0, lng: 0 };
  if (Array.isArray(node.coordinates)) {
    return { lat: node.coordinates[0] || 0, lng: node.coordinates[1] || 0 };
  }
  return {
    lat: node.coordinates.lat || 0,
    lng: node.coordinates.lng || 0
  };
};

export default function WorldMapLeaflet({ articles = [], onCountrySelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Filter articles that relate directly to the clicked hub
  const nodeNews = React.useMemo(() => {
    if (!selectedNode || !articles) return [];
    
    // Map of hub ID to keyword search terms
    const hubKeywords = {
      'hub-bengaluru': ['iisc', 'qpiai', 'bengaluru', 'qnu', 'karnataka'],
      'hub-mumbai': ['tifr', 'mumbai', 'tata institute'],
      'hub-chennai': ['iit madras', 'iitm', 'chennai'],
      'hub-yorktown': ['ibm', 'yorktown', 'heron', 'condor'],
      'hub-santa-barbara': ['google', 'santa barbara', 'sycamore'],
      'hub-college-park': ['ionq', 'college park', 'maryland'],
      'hub-delft': ['qutech', 'delft', 'netherlands', 'spin qubit'],
      'hub-munich': ['munich', 'germany', 'max planck'],
      'hub-hefei': ['hefei', 'ustc', 'origin quantum', 'jiuzhang', 'wukong', 'china'],
      'hub-singapore': ['cqt', 'singapore', 'nus']
    };

    const keywords = hubKeywords[selectedNode.id] || [];
    
    return articles.filter(art => {
      const headline = (art.headline || '').toLowerCase();
      const summary = (art.summary || '').toLowerCase();
      const artKeywords = Array.isArray(art.keywords) ? art.keywords.map(k => k.toLowerCase()) : [];
      
      return keywords.some(keyword => {
        return headline.includes(keyword) || 
               summary.includes(keyword) || 
               artKeywords.some(ak => ak.includes(keyword));
      });
    }).slice(0, 3);
  }, [selectedNode, articles]);
  
  const onCountrySelectRef = useRef(onCountrySelect);

  // Sync ref with updated callback
  useEffect(() => {
    onCountrySelectRef.current = onCountrySelect;
  }, [onCountrySelect]);

  useEffect(() => {
    // Check if Leaflet L global is loaded from CDN
    if (!window.L || !containerRef.current) return;

    // Initialize Leaflet Map
    const map = window.L.map(containerRef.current, {
      center: [20.0, 10.0],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false
    });

    mapRef.current = map;

    // Add sleek dark cybertech tiles
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom CSS icons for glowing nodes
    MOCK_HUBS.forEach(node => {
      const { lat, lng } = getCoordinates(node);

      // Determine glow colors based on category/id
      let glowClass = 'bg-cyber-blue shadow-[0_0_12px_#00A3FF]';
      if (node.id.includes('bengaluru') || node.id.includes('mumbai') || node.id.includes('chennai')) {
        glowClass = 'bg-cyber-accent shadow-[0_0_12px_#00E699]';
      } else if (node.id.includes('hefei') || node.id.includes('yorktown') || node.id.includes('santa-barbara')) {
        glowClass = 'bg-amber-400 shadow-[0_0_12px_#F59E0B]';
      }

      const customIcon = window.L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="relative flex items-center justify-center w-4 h-4">
                 <div class="absolute w-4 h-4 rounded-full ${glowClass} animate-ping opacity-50"></div>
                 <div class="absolute w-2.5 h-2.5 rounded-full ${glowClass} border border-white/20"></div>
               </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Marker Click Event
      marker.on('click', () => {
        setSelectedNode(node);
        // Center map slightly offset for layout padding
        map.panTo([lat, lng]);
        
        // Notify parent using the callback ref
        if (node.id.includes('bengaluru') || node.id.includes('mumbai') || node.id.includes('chennai')) {
          onCountrySelectRef.current?.('India');
        } else if (node.id.includes('yorktown') || node.id.includes('santa-barbara') || node.id.includes('college-park')) {
          onCountrySelectRef.current?.('USA');
        } else if (node.id.includes('hefei')) {
          onCountrySelectRef.current?.('China');
        } else if (node.id.includes('delft') || node.id.includes('munich')) {
          onCountrySelectRef.current?.('EU');
        } else if (node.id.includes('singapore')) {
          onCountrySelectRef.current?.('Singapore');
        }
      });
    });

    // Clean up map container on unmount to prevent React 18 double-initialization crashes
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleZoom = (direction) => {
    if (!mapRef.current) return;
    if (direction === 'in') mapRef.current.zoomIn();
    else mapRef.current.zoomOut();
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-cyber-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-cyber-text font-mono uppercase flex items-center gap-2">
          <Globe className="text-cyber-accent" size={24} />
          Geospatial Hubs Command Map
        </h1>
        <p className="text-sm text-cyber-muted font-sans">
          Zoomable real-world quantum capability ledger. Click any glowing node to inspect its institutional focus and coordinate profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Window */}
        <div className="relative border border-cyber-border rounded bg-[#0B1320] h-[500px] lg:col-span-3 overflow-hidden z-10">
          <div ref={containerRef} className="w-full h-full" style={{ background: '#0B1320' }}></div>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
            <button 
              onClick={() => handleZoom('in')}
              className="w-8 h-8 bg-[#111A28]/95 border border-cyber-border text-white hover:border-cyber-accent font-mono text-lg rounded flex items-center justify-center transition-colors"
            >
              +
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="w-8 h-8 bg-[#111A28]/95 border border-cyber-border text-white hover:border-cyber-accent font-mono text-lg rounded flex items-center justify-center transition-colors"
            >
              -
            </button>
          </div>
        </div>

        {/* Node Sidebar Profile */}
        <div className="bg-[#111A28] border border-cyber-border rounded p-5 lg:col-span-1 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-cyber-border pb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyber-accent uppercase tracking-wider font-bold">
                Telemetry Output
              </span>
              <Compass size={14} className="text-cyber-accent animate-spin-slow" />
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white font-mono text-sm leading-tight">
                    {selectedNode.name}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-cyber-muted font-mono uppercase">
                      {selectedNode.institution}
                    </span>
                    <span className="text-[9px] bg-cyber-accent/15 border border-cyber-accent/35 text-cyber-accent font-mono uppercase px-1 rounded">
                      {selectedNode.status}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0B1320] border border-cyber-border/40 rounded p-3 text-xs leading-relaxed space-y-2">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Shield size={12} className="text-cyber-blue" />
                    <span>Technical Focus:</span>
                  </div>
                  <p className="text-cyber-muted font-mono">{selectedNode.focus}</p>
                </div>

                {/* Live News Telemetry for Node */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-cyber-accent uppercase tracking-wider font-bold border-b border-cyber-border/30 pb-1">
                    Live Node Feeds ({nodeNews.length})
                  </div>
                  {nodeNews.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto max-h-[140px] pr-1">
                      {nodeNews.map((art, idx) => (
                        <a 
                          key={idx}
                          href={art.link || '#'}
                          target={art.link ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="block bg-[#0B1320] hover:bg-cyber-blue/10 border border-cyber-border/30 rounded p-2 hover:border-cyber-blue/50 transition-all group"
                        >
                          <div className="flex justify-between items-center text-[9px] font-mono text-cyber-muted mb-1">
                            <span className="truncate max-w-[80px] text-cyber-blue font-bold">
                              {art.source || 'News Wire'}
                            </span>
                            <span>
                              {art.timestamp ? new Date(art.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : 'Recent'}
                            </span>
                          </div>
                          <h4 className="text-[11px] text-white font-mono leading-tight font-semibold group-hover:text-cyber-accent transition-colors line-clamp-2">
                            {art.headline}
                          </h4>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-cyber-muted font-mono italic py-2 text-center bg-[#0B1320] border border-cyber-border/30 rounded">
                      No recent news telemetry for this hub.
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-mono text-cyber-blue space-y-1">
                  <div>LATITUDE: {getCoordinates(selectedNode).lat.toFixed(4)}° N</div>
                  <div>LONGITUDE: {getCoordinates(selectedNode).lng.toFixed(4)}° E</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-cyber-muted font-mono text-xs space-y-2">
                <Info size={24} className="mx-auto text-cyber-muted/60" />
                <p>Select any coordinate marker on the map to output its quantum resource data.</p>
              </div>
            )}
          </div>

          <div className="border-t border-cyber-border/40 pt-3 text-[10px] font-mono text-cyber-muted leading-relaxed">
            Note: Glowing markers indicate actively monitored superconducting, neutral-atom, trapped-ion, and QKD satellite ground nodes.
          </div>
        </div>
      </div>
    </div>
  );
}
