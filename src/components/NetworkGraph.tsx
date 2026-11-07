import React, { useState, useRef, useEffect } from 'react';
import { 
  NetworkNode, 
  Connection, 
  PerturbationState, 
  RepairPathwayId 
} from '../types/biology';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2,
  Layers, 
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  List,
  Map as MapIcon,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
  perturbationState?: PerturbationState;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  perturbationState,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 10 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchPinchDist, setTouchPinchDist] = useState<number | null>(null);

  // Responsive mode: On small screens default to 'list' for immediate legibility, but toggleable to 'map'
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activeLevelFilter, setActiveLevelFilter] = useState<string>('all');
  const [isLegendExpanded, setIsLegendExpanded] = useState<boolean>(false);

  useEffect(() => {
    // If small mobile viewport on initial mount, set 'list' as comfortable default
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setViewMode('list');
      } else {
        setTimeout(fitToScreen, 100);
      }
    }
  }, []);

  // Columns / Levels definition
  const levels = [
    { id: 'damage', label: 'Nivel 1: Daño molecular', shortLabel: '1. Daño', centerX: 145, desc: 'Alteración estructural o química del ADN' },
    { id: 'repair', label: 'Nivel 2: Reparación celular', shortLabel: '2. Reparación', centerX: 400, desc: '6 mecanismos específicos de reconocimiento' },
    { id: 'signaling', label: 'Nivel 3: Señalización y control', shortLabel: '3. Control', centerX: 670, desc: 'ATM/ATR, p53 y puntos de control G1/S, G2/M' },
    { id: 'outcome', label: 'Nivel 4: Respuestas celulares', shortLabel: '4. Destinos', centerX: 940, desc: 'Recuperación, arresto, senescencia o apoptosis' },
    { id: 'population', label: 'Nivel 5: Dinámica poblacional', shortLabel: '5. Población', centerX: 1220, desc: 'Variación heredable y selección clonal' },
  ];

  // Helper to determine node status based on perturbationState
  const getNodeStatus = (node: NetworkNode): { status: 'active' | 'compromised' | 'warning' | 'normal'; label: string } => {
    if (!perturbationState) return { status: 'normal', label: 'Estándar' };

    // Reparaciones
    if (node.id === 'rep-direct') {
      const active = perturbationState.repairStatus.DIRECT;
      return active ? { status: 'active', label: 'Disponible' } : { status: 'compromised', label: 'Comprometida' };
    }
    if (node.id === 'rep-ber') {
      const active = perturbationState.repairStatus.BER;
      return active ? { status: 'active', label: 'Disponible' } : { status: 'compromised', label: 'Comprometida' };
    }
    if (node.id === 'rep-ner') {
      const active = perturbationState.repairStatus.NER;
      return active ? { status: 'active', label: 'Disponible' } : { status: 'compromised', label: 'Comprometida' };
    }
    if (node.id === 'rep-mmr') {
      const active = perturbationState.repairStatus.MMR;
      return active ? { status: 'active', label: 'Disponible' } : { status: 'compromised', label: 'Comprometida' };
    }
    if (node.id === 'rep-hr') {
      const isSg2 = perturbationState.cellPhase === 'S' || perturbationState.cellPhase === 'G2';
      const active = perturbationState.repairStatus.HR && isSg2;
      if (!isSg2) {
        return { status: 'warning', label: 'Inactiva en G1/M' };
      }
      return active ? { status: 'active', label: 'Disponible en S/G2' } : { status: 'compromised', label: 'Comprometida' };
    }
    if (node.id === 'rep-nhej') {
      const active = perturbationState.repairStatus.NHEJ;
      return active ? { status: 'active', label: 'Operativa (propensa a error)' } : { status: 'compromised', label: 'Comprometida' };
    }

    // Señalización
    if (node.id === 'sig-p53') {
      const func = perturbationState.p53Status === 'functional';
      return func ? { status: 'active', label: 'Funcional' } : { status: 'compromised', label: 'Mutado / Deficiente' };
    }
    if (node.id === 'sig-checkpoints') {
      const op = perturbationState.checkpointsStatus === 'operational';
      return op ? { status: 'active', label: 'Puntos operativos' } : { status: 'compromised', label: 'Arresto fallido' };
    }

    // Apoptosis
    if (node.id === 'out-apop-intrinsic') {
      const act = perturbationState.intrinsicApoptosis;
      return act ? { status: 'active', label: 'Vía intacta' } : { status: 'compromised', label: 'Resistente a apoptosis' };
    }
    if (node.id === 'out-apop-extrinsic') {
      const act = perturbationState.extrinsicApoptosis;
      return act ? { status: 'active', label: 'Vía intacta' } : { status: 'compromised', label: 'Resistente a ligando' };
    }

    // Lesiones activas según estado
    if (node.id === 'dmg-uv' && perturbationState.damageType === 'uv') {
      return { status: 'warning', label: `Daño activo (${perturbationState.damageSeverity})` };
    }
    if (node.id === 'dmg-ros' && perturbationState.damageType === 'ros') {
      return { status: 'warning', label: `Estrés activo (${perturbationState.damageSeverity})` };
    }
    if (node.id === 'dmg-ir' && perturbationState.damageType === 'ionizing') {
      return { status: 'warning', label: `DSBs activas (${perturbationState.damageSeverity})` };
    }
    if (node.id === 'dmg-benzo' && perturbationState.damageType === 'benzoapyrene') {
      return { status: 'warning', label: `Aductos activos (${perturbationState.damageSeverity})` };
    }
    if (node.id === 'dmg-alkyl' && perturbationState.damageType === 'temozolomide') {
      return { status: 'warning', label: `Alquilación activa (${perturbationState.damageSeverity})` };
    }
    if (node.id === 'dmg-repl' && perturbationState.damageType === 'mismatch') {
      return { status: 'warning', label: `Errores activos (${perturbationState.damageSeverity})` };
    }

    // Consecuencias de daño no resuelto
    if (node.id === 'out-unresolved') {
      const hasCompromised = !perturbationState.repairStatus.NER || 
                             !perturbationState.repairStatus.BER || 
                             perturbationState.p53Status === 'compromised';
      if (hasCompromised) {
        return { status: 'warning', label: 'Riesgo mutagénico alto' };
      }
    }

    return { status: 'normal', label: 'Basal' };
  };

  // Node lookup map
  const nodeMap = new Map<string, NetworkNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Determine connected links for selected node
  const activeDirectConnections = connections.filter(
    (c) => c.type === 'direct' && (c.from === selectedNodeId || c.to === selectedNodeId)
  );
  const activeIndirectConnections = connections.filter(
    (c) => c.type === 'indirect' && (c.from === selectedNodeId || c.to === selectedNodeId)
  );

  const isConnectedToSelected = (nodeId: string) => {
    if (!selectedNodeId) return true;
    if (nodeId === selectedNodeId) return true;
    return connections.some(
      (c) => (c.from === selectedNodeId && c.to === nodeId) || (c.to === selectedNodeId && c.from === nodeId)
    );
  };

  // Mouse Drag handlers
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

  // Touch handlers for mobile phones & tablets
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
      setScale((prev) => Math.min(Math.max(prev * ratio, 0.4), 1.8));
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
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.45), 1.8));
  };

  const fitToScreen = () => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    if (w <= 0 || h <= 0) return;
    // The 5 diagram columns span ~1380px wide and 960px tall
    const optimalScale = Math.min(Math.max((w - 24) / 1380, 0.28), 1.05);
    const optimalPanX = Math.max(8, (w - 1380 * optimalScale) / 2);
    const optimalPanY = Math.max(12, (h - 960 * optimalScale) / 2);
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

  // Jump smoothly to a specific level column in map mode
  const jumpToLevel = (levelId: string) => {
    const lvl = levels.find((l) => l.id === levelId);
    if (!lvl) return;
    const containerWidth = containerRef.current?.clientWidth || 800;
    const targetScale = Math.max(scale, 0.7);
    const targetPanX = (containerWidth / 2) - (lvl.centerX * targetScale);
    setScale(targetScale);
    setPan({ x: targetPanX, y: 20 });
  };

  const filteredNodes = activeLevelFilter === 'all' 
    ? nodes 
    : nodes.filter((n) => n.level === activeLevelFilter);

  return (
    <div className="relative w-full h-full bg-slate-100/70 overflow-hidden select-none flex flex-col">
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
            <List className="w-3.5 h-3.5 text-sky-600" />
            <span>Lista por niveles</span>
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

        {/* In Map Mode: Quick Jump to Level Bar */}
        {viewMode === 'map' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden sm:inline">Saltar a:</span>
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => jumpToLevel(lvl.id)}
                className="px-2 py-1 bg-slate-50 hover:bg-slate-200 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 whitespace-nowrap transition-colors min-h-[32px] min-w-[32px]"
              >
                {lvl.shortLabel}
              </button>
            ))}
          </div>
        )}

        {/* In List Mode: Filter by level pills */}
        {viewMode === 'list' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <button
              onClick={() => setActiveLevelFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors min-h-[32px] ${
                activeLevelFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Todos ({nodes.length})
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevelFilter(lvl.id)}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors min-h-[32px] ${
                  activeLevelFilter === lvl.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {lvl.shortLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Node Status Sub-Bar (In Flex Flow to completely avoid overlapping controls) */}
      {selectedNodeId && (
        <div className="bg-sky-50 border-b border-sky-200 px-3.5 py-1.5 flex items-center justify-between gap-2 z-20 shrink-0 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-sky-950 truncate">
                {nodeMap.get(selectedNodeId)?.name}
              </span>
              <span className="text-[11px] text-sky-700 hidden sm:inline truncate">
                · {nodeMap.get(selectedNodeId)?.subtitle}
              </span>
              <span className="text-[10px] bg-sky-200/70 text-sky-900 font-semibold px-2 py-0.5 rounded-full shrink-0">
                {activeDirectConnections.length} directas · {activeIndirectConnections.length} indirectas
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectNode(null)}
            className="px-2.5 py-1 text-sky-800 hover:text-sky-950 hover:bg-sky-100 active:bg-sky-200 font-semibold text-xs rounded transition-colors flex items-center gap-1 shrink-0 min-h-[32px]"
            aria-label="Deseleccionar nodo"
          >
            <span>Deseleccionar</span>
            <span className="text-sm font-bold">✕</span>
          </button>
        </div>
      )}

      {/* ================= VIEW MODE 1: LISTA POR NIVELES (MOBILE FIRST) ================= */}
      {viewMode === 'list' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {levels
            .filter((lvl) => activeLevelFilter === 'all' || activeLevelFilter === lvl.id)
            .map((lvl) => {
              const levelNodes = nodes.filter((n) => n.level === lvl.id);
              if (levelNodes.length === 0) return null;

              return (
                <div key={lvl.id} className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{lvl.label}</h3>
                      <p className="text-[11px] text-slate-500">{lvl.desc}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {levelNodes.length} mecanismos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {levelNodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const { status, label: statusLabel } = getNodeStatus(node);

                      // Connected links count
                      const nodeDirect = connections.filter(
                        (c) => c.type === 'direct' && (c.from === node.id || c.to === node.id)
                      );
                      const nodeIndirect = connections.filter(
                        (c) => c.type === 'indirect' && (c.from === node.id || c.to === node.id)
                      );

                      let cardBg = 'bg-white';
                      let borderColor = 'border-slate-200';
                      let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';

                      if (status === 'active') {
                        badgeColor = 'bg-sky-50 text-sky-800 border-sky-200';
                      } else if (status === 'compromised') {
                        cardBg = 'bg-rose-50/30';
                        borderColor = 'border-rose-300';
                        badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
                      } else if (status === 'warning') {
                        cardBg = 'bg-amber-50/30';
                        borderColor = 'border-amber-300';
                        badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
                      }

                      if (isSelected) {
                        borderColor = 'border-sky-500 ring-2 ring-sky-500/20';
                      }

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
                                {statusLabel}
                              </span>
                            </div>

                            <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-2 mt-1">
                              {node.shortDescription}
                            </p>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-2">
                              <span className="text-sky-700 font-semibold">{nodeDirect.length} directas</span>
                              <span>·</span>
                              <span className="text-amber-700 font-semibold">{nodeIndirect.length} indirectas</span>
                            </span>

                            <span className="text-sky-600 font-bold flex items-center gap-0.5 text-xs">
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

      {/* ================= VIEW MODE 2: MAPA VISUAL 2D INTERACTIVO ================= */}
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
              className="p-1.5 text-sky-700 hover:text-sky-950 hover:bg-sky-50 rounded transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
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

          {/* Interactive SVG Canvas with Mouse & Touch Gestures */}
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
                {/* Arrow markers */}
                <marker
                  id="arrow-direct"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
                </marker>

                <marker
                  id="arrow-indirect"
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
                  id="arrow-muted"
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

              {/* Pan & Zoom Transform Group */}
              <g
                transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}
                style={{
                  transformOrigin: '0 0',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                {/* Background Level Columns */}
                <g className="level-columns">
                {levels.map((lvl, index) => {
                  const xStart = 20 + index * 270;
                  return (
                    <g key={lvl.id}>
                      {/* Column Background */}
                      <rect
                        x={xStart}
                        y={20}
                        width={250}
                        height={940}
                        rx={12}
                        fill={index % 2 === 0 ? '#f8fafc' : '#ffffff'}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      {/* Column Header */}
                      <rect
                        x={xStart}
                        y={20}
                        width={250}
                        height={44}
                        rx={12}
                        fill="#0f172a"
                      />
                      {/* Straighten bottom corners of header */}
                      <rect
                        x={xStart}
                        y={32}
                        width={250}
                        height={32}
                        fill="#0f172a"
                      />
                      <text
                        x={xStart + 16}
                        y={42}
                        fill="#f8fafc"
                        fontSize="12"
                        fontWeight="700"
                        fontFamily="inherit"
                      >
                        {lvl.label}
                      </text>
                      <text
                        x={xStart + 16}
                        y={56}
                        fill="#94a3b8"
                        fontSize="9.5"
                        fontFamily="inherit"
                      >
                        {lvl.desc}
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
                  let markerEnd = 'url(#arrow-muted)';
                  let strokeDasharray = isDirect ? 'none' : '4 4';

                  if (isHighlighted) {
                    if (isDirect) {
                      strokeColor = '#0284c7';
                      strokeWidth = 3;
                      markerEnd = 'url(#arrow-direct)';
                      strokeDasharray = 'none';
                    } else {
                      strokeColor = '#d97706';
                      strokeWidth = 2.5;
                      markerEnd = 'url(#arrow-indirect)';
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
                          fill={isDirect ? '#0369a1' : '#b45309'}
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
                  const { status, label: statusLabel } = getNodeStatus(node);

                  let cardBg = '#ffffff';
                  let cardBorder = '#cbd5e1';
                  let badgeBg = '#f1f5f9';
                  let badgeText = '#475569';
                  let badgeBorder = '#e2e8f0';

                  if (status === 'active') {
                    badgeBg = '#e0f2fe';
                    badgeText = '#0369a1';
                    badgeBorder = '#bae6fd';
                  } else if (status === 'compromised') {
                    cardBg = '#fff5f5';
                    cardBorder = '#fca5a5';
                    badgeBg = '#fee2e2';
                    badgeText = '#b91c1c';
                    badgeBorder = '#fecaca';
                  } else if (status === 'warning') {
                    cardBg = '#fffbeb';
                    cardBorder = '#fde68a';
                    badgeBg = '#fef3c7';
                    badgeText = '#b45309';
                    badgeBorder = '#fde68a';
                  }

                  if (isSelected) {
                    cardBorder = '#0284c7';
                  }

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
                        stroke={isSelected ? '#0284c7' : cardBorder}
                        strokeWidth={isSelected ? '2.5' : '1.2'}
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"
                        className="transition-all duration-150"
                      />

                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="72"
                        rx="2"
                        fill={
                          node.level === 'damage' ? '#ef4444' :
                          node.level === 'repair' ? '#0284c7' :
                          node.level === 'signaling' ? '#6366f1' :
                          node.level === 'outcome' ? '#10b981' : '#f59e0b'
                        }
                      />

                      <text
                        x="14"
                        y="22"
                        fill="#0f172a"
                        fontSize="11.5"
                        fontWeight="700"
                        fontFamily="inherit"
                      >
                        {node.name}
                      </text>

                      <text
                        x="14"
                        y="36"
                        fill="#64748b"
                        fontSize="9"
                        fontWeight="500"
                        fontFamily="inherit"
                      >
                        {node.subtitle}
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
                          {statusLabel}
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

      {/* Persistent Bottom Pedagogical Legend (Compact & Non-blocking) */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 sm:px-6 sm:py-2 flex items-center justify-between gap-3 text-xs text-slate-600 shrink-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-0.5">
          <span className="font-bold text-slate-800 flex items-center gap-1 shrink-0">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Leyenda:</span>
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-3.5 h-0.5 bg-sky-600 inline-block" />
            <span className="text-[11px] font-medium">Directa</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-600 inline-block" />
            <span className="text-[11px] font-medium">Indirecta</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-xs bg-sky-100 border border-sky-400 inline-block" />
            <span className="text-[11px] font-medium">Disponible</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-100 border border-rose-400 inline-block" />
            <span className="text-[11px] font-medium">Comprometida</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-medium hidden md:block shrink-0">
          Toca cualquier mecanismo para abrir su ficha molecular y relaciones causales.
        </div>
      </div>
    </div>
  );
};
