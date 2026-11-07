import { Network, Dna, GitBranch, BookOpen } from 'lucide-react';

export type AppTab = 'cellular_map' | 'cancer_map' | 'simulator';

interface TopBarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenReferences: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReferences,
}) => {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-white border-b border-slate-200 sticky top-0 z-40 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
          D
        </div>
        <div className="min-w-0">
          <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 truncate block">
            Del daño al destino celular
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate hidden sm:block">
            Reparación del ADN y características del cáncer (Hanahan 2026)
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation tabs for tablet & desktop viewports */}
      <nav className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
        <button
          onClick={() => setActiveTab('cellular_map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
            activeTab === 'cellular_map'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-sky-600" />
          <span>1. Daño y Reparación</span>
        </button>

        <button
          onClick={() => setActiveTab('cancer_map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
            activeTab === 'cancer_map'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Dna className="w-3.5 h-3.5 text-rose-600" />
          <span>2. Cáncer (Hallmarks)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
            activeTab === 'simulator'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
          <span>3. Simulador Poblacional</span>
        </button>
      </nav>

      {/* Zone 3: Functional actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenReferences}
          aria-label="Ver fundamentos científicos"
          className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] sm:min-h-[36px]"
        >
          <BookOpen className="w-4 h-4 text-sky-700" />
          <span className="hidden sm:inline">Fundamento científico</span>
        </button>
      </div>
    </header>
  );
};
