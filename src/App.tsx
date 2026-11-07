import React, { useState } from 'react';
import { TopBar, AppTab } from './components/TopBar';
import { NetworkGraph } from './components/NetworkGraph';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { CancerNetworkGraph } from './components/CancerNetworkGraph';
import { CancerNodeDetailDrawer } from './components/CancerNodeDetailDrawer';
import { PopulationHistoryView } from './components/PopulationHistoryView';
import { ScientificReferencesModal } from './components/ScientificReferencesModal';
import { NETWORK_NODES, CAUSAL_CONNECTIONS } from './data/modelData';
import { CANCER_NODES, CANCER_CONNECTIONS } from './data/cancerModelData';
import { Network, Dna, GitBranch } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('cellular_map');
  
  // Independent selection for Cellular Damage Map and Cancer Hallmarks Map
  const [selectedCellNodeId, setSelectedCellNodeId] = useState<string | null>(null);
  const [selectedCancerNodeId, setSelectedCancerNodeId] = useState<string | null>(null);

  // Modals
  const [isReferencesOpen, setIsReferencesOpen] = useState<boolean>(false);

  const selectedCellNode = NETWORK_NODES.find((n) => n.id === selectedCellNodeId) || null;
  const selectedCancerNode = CANCER_NODES.find((n) => n.id === selectedCancerNodeId) || null;

  return (
    <div className="h-dvh flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 overflow-hidden">
      {/* Top Bar Navigation (3 Pillars) */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReferences={() => setIsReferencesOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden relative pb-14 sm:pb-0">
        {/* PILLAR 1: Explorar el mapa de daño y reparación celular */}
        {activeTab === 'cellular_map' && (
          <div className="flex-1 min-h-0 flex overflow-hidden relative w-full h-full">
            <div className="flex-1 min-h-0 h-full w-full">
              <NetworkGraph
                nodes={NETWORK_NODES}
                connections={CAUSAL_CONNECTIONS}
                selectedNodeId={selectedCellNodeId}
                onSelectNode={setSelectedCellNodeId}
              />
            </div>

            {/* Selected Cellular Node Inspector Drawer */}
            {selectedCellNode && (
              <NodeDetailDrawer
                node={selectedCellNode}
                connections={CAUSAL_CONNECTIONS}
                allNodes={NETWORK_NODES}
                onClose={() => setSelectedCellNodeId(null)}
                onSelectNode={(id) => setSelectedCellNodeId(id)}
              />
            )}
          </div>
        )}

        {/* PILLAR 2: Explorar el mapa espejo de Cáncer (Hallmarks y Facilitadores) */}
        {activeTab === 'cancer_map' && (
          <div className="flex-1 min-h-0 flex overflow-hidden relative w-full h-full">
            <div className="flex-1 min-h-0 h-full w-full">
              <CancerNetworkGraph
                nodes={CANCER_NODES}
                connections={CANCER_CONNECTIONS}
                selectedNodeId={selectedCancerNodeId}
                onSelectNode={setSelectedCancerNodeId}
              />
            </div>

            {/* Selected Cancer Hallmark / Enabler Inspector Drawer */}
            {selectedCancerNode && (
              <CancerNodeDetailDrawer
                node={selectedCancerNode}
                connections={CANCER_CONNECTIONS}
                allNodes={CANCER_NODES}
                onClose={() => setSelectedCancerNodeId(null)}
                onSelectNode={(id) => setSelectedCancerNodeId(id)}
              />
            )}
          </div>
        )}

        {/* PILLAR 3: Simulador evolutivo poblacional (Separado como sección dedicada) */}
        {activeTab === 'simulator' && (
          <div className="flex-1 min-h-0 overflow-y-auto w-full">
            <div className="max-w-7xl w-full mx-auto p-3.5 sm:p-5 md:p-6 space-y-5 pb-8 sm:pb-12">
              <PopulationHistoryView />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Ergonomic Fixed Bottom Navigation Bar (Thumb Zone) */}
      <nav
        aria-label="Navegación principal en móviles"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 h-14 pb-safe sm:hidden flex items-center justify-around shadow-lg px-2"
      >
        <button
          onClick={() => setActiveTab('cellular_map')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-semibold transition-colors min-h-[44px] active:scale-95 ${
            activeTab === 'cellular_map'
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Network className={`w-5 h-5 mb-0.5 ${activeTab === 'cellular_map' ? 'text-sky-600 stroke-[2.2]' : 'text-slate-400'}`} />
          <span>1. Daño Celular</span>
        </button>

        <button
          onClick={() => setActiveTab('cancer_map')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-semibold transition-colors min-h-[44px] active:scale-95 ${
            activeTab === 'cancer_map'
              ? 'text-rose-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Dna className={`w-5 h-5 mb-0.5 ${activeTab === 'cancer_map' ? 'text-rose-600 stroke-[2.2]' : 'text-slate-400'}`} />
          <span>2. Cáncer (Mapa)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-semibold transition-colors min-h-[44px] active:scale-95 ${
            activeTab === 'simulator'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitBranch className={`w-5 h-5 mb-0.5 ${activeTab === 'simulator' ? 'text-emerald-600 stroke-[2.2]' : 'text-slate-400'}`} />
          <span>3. Simulador</span>
        </button>
      </nav>

      {/* Global Modals */}
      <ScientificReferencesModal
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
      />
    </div>
  );
}
