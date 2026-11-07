import React from 'react';
import { CancerNode, CancerConnection } from '../types/biology';
import { X, Dna, ShieldAlert, Sparkles, Beaker, CheckCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface CancerNodeDetailDrawerProps {
  node: CancerNode | null;
  connections: CancerConnection[];
  allNodes: CancerNode[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export const CancerNodeDetailDrawer: React.FC<CancerNodeDetailDrawerProps> = ({
  node,
  connections,
  allNodes,
  onClose,
  onSelectNode,
}) => {
  if (!node) return null;

  const nodeMap = new Map<string, CancerNode>();
  allNodes.forEach((n) => nodeMap.set(n.id, n));

  const incomingConnections = connections.filter((c) => c.to === node.id);
  const outgoingConnections = connections.filter((c) => c.from === node.id);

  const getDimensionBadge = (dim: string) => {
    switch (dim) {
      case 'enabler':
        return { text: 'Característica Facilitadora', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'intrinsic':
        return { text: 'Control Celular y Supervivencia', bg: 'bg-rose-100 text-rose-900 border-rose-300' };
      case 'metabolic':
        return { text: 'Señalización y Metabolismo', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
      case 'microenvironment':
        return { text: 'Microambiente e Inmunidad', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'dissemination':
        return { text: 'Diseminación Sistémica', bg: 'bg-rose-100 text-rose-900 border-rose-300' };
      default:
        return { text: 'Dimensión de Cáncer', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const badge = getDimensionBadge(node.dimension);
  const details = node.details;

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
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold border rounded ${badge.bg}`}>
                {node.type === 'hallmark' && node.number ? `Hallmark #${node.number}` : 'Facilitador'} · {badge.text}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">{node.name}</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{node.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Cerrar ficha"
            aria-label="Cerrar panel de detalles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 pb-16 lg:pb-6 space-y-4 text-xs overscroll-contain">
          {/* Definition according to Hanahan 2026 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
            <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider block flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-rose-600" />
              Definición y Rol en el Cáncer (Hanahan 2026)
            </span>
            <p className="text-slate-700 leading-relaxed font-normal">{details.definition}</p>
          </div>

          {/* Direct Connection to DNA Damage and Repair */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <span className="font-bold text-amber-950 text-[11px] uppercase tracking-wider block flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-amber-700" />
              Conexión Directa con el Daño y Reparación del ADN:
            </span>
            <p className="text-amber-950 leading-relaxed">{details.connectionToDnaDamage}</p>
          </div>

          {/* Key Genes & Molecular Effectors */}
          {details.keyGenesAndProteins && details.keyGenesAndProteins.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
                Genes, Oncogenes y Factores Clave
              </span>
              <div className="flex flex-wrap gap-1.5">
                {details.keyGenesAndProteins.map((gene, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-md px-2 py-0.5 text-[11px] font-mono font-semibold"
                  >
                    {gene}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Normal Mechanism vs Molecular Alteration */}
          <div className="space-y-2">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                1. Mecanismo Fisiológico Normal de Referencia:
              </span>
              <p className="text-emerald-950 leading-relaxed font-normal">{details.normalMechanism}</p>
            </div>

            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
              <span className="font-bold text-rose-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                2. Alteración Molecular que Favorece su Adquisición:
              </span>
              <p className="text-rose-950 leading-relaxed font-normal">{details.molecularAlteration}</p>
            </div>
          </div>

          {/* Population Advantage */}
          <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1">
            <span className="font-bold text-sky-950 text-[11px] uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              3. Ventaja Adaptativa para la Población Celular:
            </span>
            <p className="text-sky-950 leading-relaxed font-normal">{details.populationAdvantage}</p>
          </div>

          {/* Experimental Evidence */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-slate-600" />
              4. Evidencia Experimental de Laboratorio:
            </span>
            <p className="text-slate-600 leading-relaxed font-normal">{details.experimentalEvidence}</p>
          </div>

          {/* Hanahan 2026 Key Conceptual Insight */}
          <div className="p-2.5 bg-slate-100 rounded-lg text-slate-600 italic border border-slate-200">
            <span className="font-bold text-slate-800 not-italic block mb-0.5">Nota conceptual de Hanahan (2026):</span>
            {details.hanahan2026Insight}
          </div>

          {/* Causal Network Connections (Incoming & Outgoing) */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
              Conexiones Causales en la Red del Cáncer
            </span>

            {incomingConnections.length > 0 && (
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Favorecido / impulsado por:</span>
                <div className="space-y-1.5">
                  {incomingConnections.map((conn, idx) => {
                    const src = nodeMap.get(conn.from);
                    if (!src) return null;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectNode(src.id)}
                        className="w-full text-left p-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg flex items-center justify-between text-slate-700 transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900 block">{src.name}</span>
                          <span className="text-[10px] text-slate-500">{conn.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {outgoingConnections.length > 0 && (
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1">Desencadena / facilita:</span>
                <div className="space-y-1.5">
                  {outgoingConnections.map((conn, idx) => {
                    const tgt = nodeMap.get(conn.to);
                    if (!tgt) return null;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectNode(tgt.id)}
                        className="w-full text-left p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-lg flex items-center justify-between text-slate-700 transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900 block">{tgt.name}</span>
                          <span className="text-[10px] text-slate-500">{conn.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile bottom close button */}
          <div className="pt-2 border-t border-slate-200 lg:hidden">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 active:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>Cerrar ficha de hallmark</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
