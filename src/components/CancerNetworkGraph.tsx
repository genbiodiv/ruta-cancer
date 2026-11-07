import React, { useState, useRef, useEffect } from 'react';
import { CancerNode, CancerConnection } from '../types/biology';
import { CANCER_DIMENSIONS } from '../data/cancerModelData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2,
  Layers, 
  Info,
  Dna,
  ShieldAlert,
  Sparkles,
  List,
  Map as MapIcon,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface CancerNetworkGraphProps {
  nodes: CancerNode[];
  connections: CancerConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
}

export const CancerNetworkGraph: React.FC<CancerNetworkGraphProps> = ({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 10 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchPinchDist, setTouchPinchDist] = useState<number | null>(null);

  // Responsive mode: 'list' for mobile screens, 'map' for canvas
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activeDimensionFilter, setActiveDimensionFilter] = useState<string>('all');

  const nodeMap = new Map<string, CancerNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const fitToScreen = () => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    if (w <= 0 || h <= 0) return;
    // Dimensions span ~1380px wide and 860px tall
    const optimalScale = Math.min(Math.max((w - 24) / 1380, 0.28), 1.05);
    const optimalPanX = Math.max(8, (w - 1380 * optimalScale) / 2);
    const optimalPanY = Math.max(12, (h - 860 * optimalScale) / 2);
    setScale(optimalScale);
    setPan({ x: optimalPanX, y: optimalPanY });
  };

  const resetView = () => {
    fitToScreen();
    onSelectNode(null);
  };

  const handleSwitchToMap = () => {
    setViewMode('map');
    setTimeout(fitToScreen, 50);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setViewMode('list');
      } else {
        setTimeout(fitToScreen, 100);
      }
    }
  }, []);

  // Jump smoothly to a specific column
  const jumpToDimension = (dimId: string) => {
    const dim = CANCER_DIMENSIONS.find((d) => d.id === dimId);
    if (!dim) return;
    const containerWidth = containerRef.current?.clientWidth || 800;
    const targetScale = Math.max(scale, 0.7);
    const targetPanX = (containerWidth / 2) - (dim.centerX * targetScale);
    setScale(targetScale);
    setPan({ x: targetPanX, y: 20 });
  };

  // Connected links for selected node
  const activeIncoming = connections.filter((c) => c.to === selectedNodeId);
  const activeOutgoing = connections.filter((c) => c.from === selectedNodeId);

  const isConnectedToSelected = (nodeId: string) => {
    if (!selectedNodeId) return true;
    if (nodeId === selectedNodeId) return true;
    return connections.some(
      (c) => (c.from === selectedNodeId && c.to === nodeId) || (c.to === selectedNodeId && c.from === nodeId)
    );
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-element')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.node-element')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
      setTouchPinchDist(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchPinchDist(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchPinchDist !== null) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = newDist / touchPinchDist;
      setScale((prev) => Math.min(Math.max(prev * ratio, 0.3), 1.8));
      setTouchPinchDist(newDist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchPinchDist(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.3), 1.8));
  };

  const filteredNodes = activeDimensionFilter === 'all'
    ? nodes
    : nodes.filter((n) => n.dimension === activeDimensionFilter);

  return (
    <div className="relative w-full h-full bg-slate-100/70 overflow-hidden select-none flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header / View Switcher Bar */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-20 shrink-0">
        {/* View Mode Toggle: Lista vs Mapa 2D */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors min-h-[36px] ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5 text-rose-600" />
            <span>Lista por dimensiones</span>
          </button>

          <button
            onClick={handleSwitchToMap}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors min-h-[36px] ${
              viewMode === 'map'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mapa visual 2D</span>
          </button>
        </div>

        {/* In Map Mode: Quick Jump to Dimension */}
        {viewMode === 'map' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden sm:inline">Saltar a:</span>
            {CANCER_DIMENSIONS.map((dim) => (
              <button
                key={dim.id}
                onClick={() => jumpToDimension(dim.id)}
                className="px-2 py-1 bg-slate-50 hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 whitespace-nowrap transition-colors min-h-[32px] min-w-[32px]"
              >
                {dim.shortLabel}
              </button>
            ))}
          </div>
        )}

        {/* In List Mode: Filter by dimension pills */}
        {viewMode === 'list' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <button
              onClick={() => setActiveDimensionFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors min-h-[32px] ${
                activeDimensionFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Todos ({nodes.length})
            </button>
            {CANCER_DIMENSIONS.map((dim) => (
              <button
                key={dim.id}
                onClick={() => setActiveDimensionFilter(dim.id)}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors min-h-[32px] ${
                  activeDimensionFilter === dim.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {dim.shortLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Node Status Sub-Bar (In Flex Flow) */}
      {selectedNodeId && (
        <div className="bg-rose-50 border-b border-rose-200 px-3.5 py-1.5 flex items-center justify-between gap-2 z-20 shrink-0 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-rose-950 truncate">
                {nodeMap.get(selectedNodeId)?.name}
              </span>
              <span className="text-[11px] text-rose-700 hidden sm:inline truncate">
                · {nodeMap.get(selectedNodeId)?.subtitle}
              </span>
              <span className="text-[10px] bg-rose-200/70 text-rose-900 font-semibold px-2 py-0.5 rounded-full shrink-0">
                {activeIncoming.length} causas · {activeOutgoing.length} consecuencias
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectNode(null)}
            className="px-2.5 py-1 text-rose-800 hover:text-rose-950 hover:bg-rose-100 active:bg-rose-200 font-semibold text-xs rounded transition-colors flex items-center gap-1 shrink-0 min-h-[32px]"
            aria-label="Deseleccionar nodo"
          >
            <span>Deseleccionar</span>
            <span className="text-sm font-bold">✕</span>
          </button>
        </div>
      )}

      {/* ================= VIEW MODE 1: LISTA POR DIMENSIONES ================= */}
      {viewMode === 'list' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {CANCER_DIMENSIONS
            .filter((dim) => activeDimensionFilter === 'all' || activeDimensionFilter === dim.id)
            .map((dim) => {
              const dimNodes = nodes.filter((n) => n.dimension === dim.id);
              if (dimNodes.length === 0) return null;

              return (
                <div key={dim.id} className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{dim.label}</h3>
                      <p className="text-[11px] text-slate-500">{dim.desc}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {dimNodes.length} elementos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dimNodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const incoming = connections.filter((c) => c.to === node.id);
                      const outgoing = connections.filter((c) => c.from === node.id);

                      let cardBg = 'bg-white';
                      let borderColor = isSelected ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200';
                      let badgeColor = node.type === 'hallmark' 
                        ? 'bg-rose-50 text-rose-800 border-rose-200' 
                        : 'bg-amber-50 text-amber-900 border-amber-200';

                      return (
                        <div
                          key={node.id}
                          onClick={() => onSelectNode(isSelected ? null : node.id)}
                          className={`p-3.5 rounded-xl border ${cardBg} ${borderColor} shadow-xs hover:shadow-sm active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div>
                                <h4 className="font-bold text-slate-900 text-xs leading-snug">
                                  {node.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-medium">
                                  {node.subtitle}
                                </p>
                              </div>

                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${badgeColor}`}>
                                {node.type === 'hallmark' && node.number ? `Hallmark #${node.number}` : 'Facilitador'}
                              </span>
                            </div>

                            <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-2 mt-1">
                              {node.shortDescription}
                            </p>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-2">
                              <span className="text-indigo-700 font-semibold">{incoming.length} causas</span>
                              <span>·</span>
                              <span className="text-rose-700 font-semibold">{outgoing.length} efectos</span>
                            </span>

                            <span className="text-rose-600 font-bold flex items-center gap-0.5 text-xs">
                              Ver detalles <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ================= VIEW MODE 2: MAPA VISUAL 2D ================= */}
      {viewMode === 'map' && (
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {/* Visual Controls Toolbar */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg shadow-sm">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.15, 1.8))}
              title="Acercar mapa"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.15, 0.3))}
              title="Alejar mapa"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={fitToScreen}
              title="Ajustar al lienzo completo"
              className="p-1.5 text-rose-700 hover:text-rose-950 hover:bg-rose-50 rounded transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              title="Restablecer vista centrada"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-0.5" />
            <span className="text-[11px] font-mono text-slate-500 px-1">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* SVG Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="w-full h-full cursor-grab active:cursor-grabbing relative touch-none overflow-hidden"
          >
            <svg
              width="100%"
              height="100%"
              className="w-full h-full block"
            >
              <defs>
                <marker
                  id="cancer-arrow-direct"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
                </marker>

                <marker
                  id="cancer-arrow-indirect"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
                </marker>

                <marker
                  id="cancer-arrow-muted"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 2 L 6 5 L 0 8 z" fill="#94a3b8" />
                </marker>
              </defs>

              <g
                transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}
                style={{
                  transformOrigin: '0 0',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                {/* Background Dimension Columns */}
                <g className="dimension-columns">
                  {CANCER_DIMENSIONS.map((dim, index) => {
                    const xStart = 20 + index * 270;
                    return (
                      <g key={dim.id}>
                        <rect
                          x={xStart}
                          y={20}
                          width={250}
                          height={850}
                          rx={12}
                          fill={index % 2 === 0 ? '#f8fafc' : '#ffffff'}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                        <rect
                          x={xStart}
                          y={20}
                          width={250}
                          height={44}
                          rx={12}
                          fill="#1e1b4b"
                        />
                        <rect
                          x={xStart}
                          y={32}
                          width={250}
                          height={32}
                          fill="#1e1b4b"
                        />
                        <text
                          x={xStart + 16}
                          y={42}
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="700"
                          fontFamily="inherit"
                        >
                          {dim.label}
                        </text>
                        <text
                          x={xStart + 16}
                          y={56}
                          fill="#a5b4fc"
                          fontSize="9.5"
                          fontFamily="inherit"
                        >
                          {dim.desc}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Connections Layer */}
                <g className="connections-layer">
                  {connections.map((conn, idx) => {
                    const source = nodeMap.get(conn.from);
                    const target = nodeMap.get(conn.to);
                    if (!source || !target) return null;

                    const sx = source.x + 210;
                    const sy = source.y + 35;
                    const tx = target.x;
                    const ty = target.y + 35;

                    const dx = tx - sx;
                    const cp1x = sx + dx * 0.45;
                    const cp1y = sy;
                    const cp2x = tx - dx * 0.45;
                    const ty_adj = ty;

                    const isDirect = conn.type === 'direct';
                    const isSelectedSource = selectedNodeId === conn.from;
                    const isSelectedTarget = selectedNodeId === conn.to;
                    const isHighlighted = isSelectedSource || isSelectedTarget;
                    const isDimmed = selectedNodeId !== null && !isHighlighted;

                    let strokeColor = '#94a3b8';
                    let strokeWidth = 1.5;
                    let markerEnd = 'url(#cancer-arrow-muted)';
                    let strokeDasharray = isDirect ? 'none' : '4 4';

                    if (isHighlighted) {
                      if (isDirect) {
                        strokeColor = '#e11d48';
                        strokeWidth = 3;
                        markerEnd = 'url(#cancer-arrow-direct)';
                        strokeDasharray = 'none';
                      } else {
                        strokeColor = '#d97706';
                        strokeWidth = 2.5;
                        markerEnd = 'url(#cancer-arrow-indirect)';
                        strokeDasharray = '5 4';
                      }
                    } else if (isDimmed) {
                      strokeColor = '#cbd5e1';
                      strokeWidth = 1;
                    }

                    return (
                      <g key={`conn-${idx}`} opacity={isDimmed ? 0.25 : 1}>
                        <path
                          d={`M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${ty_adj}, ${tx} ${ty}`}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDasharray}
                          markerEnd={markerEnd}
                        />
                        {isHighlighted && conn.label && (
                          <text
                            x={(sx + tx) / 2}
                            y={(sy + ty) / 2 - 6}
                            fill={isDirect ? '#be123c' : '#b45309'}
                            fontSize="9.5"
                            fontWeight="600"
                            textAnchor="middle"
                            className="pointer-events-none bg-white px-1"
                          >
                            {conn.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* Nodes Layer */}
                <g className="nodes-layer">
                  {nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isDimmed = selectedNodeId !== null && !isConnectedToSelected(node.id);

                    let cardBg = '#ffffff';
                    let cardBorder = isSelected ? '#e11d48' : '#cbd5e1';
                    let badgeBg = node.type === 'hallmark' ? '#ffe4e6' : '#fef3c7';
                    let badgeText = node.type === 'hallmark' ? '#be123c' : '#92400e';
                    let badgeBorder = node.type === 'hallmark' ? '#fecdd3' : '#fde68a';

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => onSelectNode(isSelected ? null : node.id)}
                        className="node-element cursor-pointer group"
                        opacity={isDimmed ? 0.35 : 1}
                      >
                        <rect
                          x="0"
                          y="0"
                          width="210"
                          height="72"
                          rx="8"
                          fill={cardBg}
                          stroke={cardBorder}
                          strokeWidth={isSelected ? '2.5' : '1.2'}
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"
                          className="transition-all duration-150"
                        />

                        {/* Category Indicator Accent Strip */}
                        <rect
                          x="0"
                          y="0"
                          width="4"
                          height="72"
                          rx="2"
                          fill={
                            node.dimension === 'enabler' ? '#f59e0b' :
                            node.dimension === 'intrinsic' ? '#e11d48' :
                            node.dimension === 'metabolic' ? '#6366f1' :
                            node.dimension === 'microenvironment' ? '#10b981' : '#dc2626'
                          }
                        />

                        <text
                          x="14"
                          y="22"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="inherit"
                        >
                          {node.name.length > 25 ? `${node.name.substring(0, 24)}…` : node.name}
                        </text>

                        <text
                          x="14"
                          y="36"
                          fill="#64748b"
                          fontSize="9"
                          fontWeight="500"
                          fontFamily="inherit"
                        >
                          {node.subtitle.length > 32 ? `${node.subtitle.substring(0, 31)}…` : node.subtitle}
                        </text>

                        <g transform="translate(14, 46)">
                          <rect
                            x="0"
                            y="0"
                            width="182"
                            height="18"
                            rx="4"
                            fill={badgeBg}
                            stroke={badgeBorder}
                            strokeWidth="1"
                          />
                          <text
                            x="8"
                            y="12"
                            fill={badgeText}
                            fontSize="8.5"
                            fontWeight="600"
                            fontFamily="inherit"
                          >
                            {node.type === 'hallmark' && node.number ? `Hallmark #${node.number} (Capacidad)` : 'Característica Facilitadora'}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Persistent Bottom Pedagogical Legend */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 sm:px-6 sm:py-2 flex items-center justify-between gap-3 text-xs text-slate-600 shrink-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-0.5">
          <span className="font-bold text-slate-800 flex items-center gap-1 shrink-0">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Leyenda:</span>
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-3.5 h-0.5 bg-rose-600 inline-block" />
            <span className="text-[11px] font-medium">Relación directa</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-600 inline-block" />
            <span className="text-[11px] font-medium">Influencia indirecta</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-100 border border-rose-400 inline-block" />
            <span className="text-[11px] font-medium">Capacidad funcional (9)</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-100 border border-amber-400 inline-block" />
            <span className="text-[11px] font-medium">Característica facilitadora (5)</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-medium hidden md:block shrink-0">
          Basado en Douglas Hanahan (Cell, 2026). Toca cualquier hallmark para inspeccionar su causalidad.
        </div>
      </div>
    </div>
  );
};
