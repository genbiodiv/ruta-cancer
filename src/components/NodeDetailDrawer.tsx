import React from 'react';
import { NetworkNode, Connection } from '../types/biology';
import { X, ArrowRight, Dna, ShieldAlert, Sparkles, Beaker, CheckCircle } from 'lucide-react';

interface NodeDetailDrawerProps {
  node: NetworkNode | null;
  connections: Connection[];
  allNodes: NetworkNode[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  node,
  connections,
  allNodes,
  onClose,
  onSelectNode,
}) => {
  if (!node) return null;

  const nodeMap = new Map<string, NetworkNode>();
  allNodes.forEach((n) => nodeMap.set(n.id, n));

  // Direct and indirect connected links
  const directIncoming = connections.filter((c) => c.to === node.id && c.type === 'direct');
  const directOutgoing = connections.filter((c) => c.from === node.id && c.type === 'direct');
  const indirectLinks = connections.filter(
    (c) => (c.from === node.id || c.to === node.id) && c.type === 'indirect'
  );

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'damage':
        return { text: 'Nivel 1: Daño molecular', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'repair':
        return { text: 'Nivel 2: Reparación celular', color: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'signaling':
        return { text: 'Nivel 3: Señalización y control', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'outcome':
        return { text: 'Nivel 4: Respuestas celulares', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'population':
        return { text: 'Nivel 5: Dinámica poblacional', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { text: 'Nivel celular', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const badge = getLevelBadge(node.level);
  const details = node.molecularDetails;

  return (
    <div className="fixed inset-0 z-50 lg:static lg:z-30 lg:w-[420px] lg:h-full lg:shrink-0 flex flex-col justify-end lg:justify-start">
      {/* Mobile Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer / Bottom Sheet Container */}
      <div className="relative w-full bg-white rounded-t-3xl lg:rounded-none border-t lg:border-t-0 lg:border-l border-slate-200 shadow-2xl lg:shadow-lg max-h-[85vh] lg:max-h-full h-auto lg:h-full flex flex-col z-10 animate-in slide-in-from-bottom duration-200">
        {/* Mobile Drag Handle */}
        <div className="lg:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-start justify-between gap-3 shrink-0">
          <div>
            <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold border rounded ${badge.color}`}>
              {badge.text}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">{node.name}</h2>
            <p className="text-xs text-slate-500 font-medium">{node.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Cerrar detalles"
            aria-label="Cerrar panel de detalles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 pb-16 lg:pb-6 space-y-4 text-xs overscroll-contain">
        {/* Short Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-slate-700 leading-relaxed font-normal">{node.shortDescription}</p>
        </div>

        {/* Phase Dependency */}
        {details?.cellCyclePhase && (
          <div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1">
              Fase del ciclo celular
            </span>
            <p className="text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5">
              {details.cellCyclePhase}
            </p>
          </div>
        )}

        {/* Lesion Types Handled */}
        {details?.lesionTypes && details.lesionTypes.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1">
              Lesiones o sustratos específicos
            </span>
            <div className="flex flex-wrap gap-1.5">
              {details.lesionTypes.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-sky-50 text-sky-800 border border-sky-100 rounded px-2 py-0.5 text-[11px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Molecular Components */}
        {details?.keyComponents && details.keyComponents.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1">
              Componentes y enzimas representativas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {details.keyComponents.map((comp, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-50 text-indigo-800 border border-indigo-100 rounded px-2 py-0.5 text-[11px] font-mono"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sequential Molecular Steps */}
        {details?.molecularSteps && details.molecularSteps.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
              Operaciones moleculares secuenciales
            </span>
            <ol className="space-y-1.5 pl-3 border-l-2 border-slate-200">
              {details.molecularSteps.map((step, idx) => (
                <li key={idx} className="text-slate-600 leading-snug">
                  <span className="font-semibold text-slate-800 mr-1">{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Functional Outcome vs Consequences of Failure */}
        {details && (
          <div className="space-y-2">
            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-md">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Consecuencia de su funcionamiento:
              </span>
              <p className="text-emerald-950 leading-relaxed">{details.functionalOutcome}</p>
            </div>

            <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-md">
              <span className="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Consecuencias de su falla:
              </span>
              <p className="text-rose-950 leading-relaxed">{details.consequencesOfFailure}</p>
            </div>
          </div>
        )}

        {/* Fidelity & Biological Rule */}
        {details?.fidelityNotes && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-md">
            <span className="font-bold text-amber-900 block mb-0.5">
              Principio biológico esencial:
            </span>
            <p className="text-amber-950 leading-relaxed">{details.fidelityNotes}</p>
          </div>
        )}

        {/* Experimental Evidence */}
        {details?.experimentalEvidence && (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-0.5">
              <Beaker className="w-3.5 h-3.5 text-sky-700" />
              Evidencia experimental en el laboratorio:
            </span>
            <p className="text-slate-600 leading-relaxed">{details.experimentalEvidence}</p>
          </div>
        )}

        {/* Direct Causal Connections */}
        <div className="pt-2 border-t border-slate-200">
          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
            Relaciones causales directas
          </span>

          {directIncoming.length > 0 && (
            <div className="mb-2">
              <span className="text-[10px] text-slate-500 font-semibold block mb-1">Activado por:</span>
              <div className="space-y-1">
                {directIncoming.map((conn, idx) => {
                  const src = nodeMap.get(conn.from);
                  if (!src) return null;
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectNode(src.id)}
                      className="w-full text-left p-1.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded flex items-center justify-between text-slate-700 transition-colors"
                    >
                      <span className="font-medium text-slate-800">{src.name}</span>
                      <span className="text-[10px] text-slate-500 italic">{conn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {directOutgoing.length > 0 && (
            <div>
              <span className="text-[10px] text-slate-500 font-semibold block mb-1">Desencadena:</span>
              <div className="space-y-1">
                {directOutgoing.map((conn, idx) => {
                  const tgt = nodeMap.get(conn.to);
                  if (!tgt) return null;
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectNode(tgt.id)}
                      className="w-full text-left p-1.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded flex items-center justify-between text-slate-700 transition-colors"
                    >
                      <span className="font-medium text-slate-800">{tgt.name}</span>
                      <span className="text-[10px] text-slate-500 italic">{conn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Potential Indirect Consequences */}
        {indirectLinks.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1.5">
              Posibles consecuencias indirectas
            </span>
            <div className="space-y-1">
              {indirectLinks.map((conn, idx) => {
                const otherId = conn.from === node.id ? conn.to : conn.from;
                const other = nodeMap.get(otherId);
                if (!other) return null;
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectNode(other.id)}
                    className="w-full text-left p-2 bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200 rounded-lg flex items-center justify-between text-amber-900 transition-colors"
                  >
                    <span className="font-medium">{other.name}</span>
                    <span className="text-[10px] text-amber-700 italic">{conn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile bottom close button */}
        <div className="pt-2 border-t border-slate-200 lg:hidden">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 active:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span>Cerrar ficha técnica</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
