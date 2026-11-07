import React from 'react';
import { X, BookOpen, ExternalLink, CheckCircle2, Info } from 'lucide-react';

interface ScientificReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScientificReferencesModal: React.FC<ScientificReferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-700 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              Fundamentos y Referencias Científicas
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar modal de referencias"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 leading-relaxed">
          {/* Main Citation */}
          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
              Referencia Principal (Hallmarks del Cáncer)
            </span>
            <h3 className="font-bold text-slate-900 text-sm">
              Hanahan, D. (2026). Hallmarks of cancer—Then and now, and beyond.
            </h3>
            <p className="text-slate-700 text-xs">
              <em>Cell</em>, 189(8), 2254–2277.{' '}
              <a
                href="https://doi.org/10.1016/j.cell.2025.12.049"
                target="_blank"
                rel="noreferrer"
                className="text-sky-700 underline font-semibold inline-flex items-center gap-1 hover:text-sky-900"
              >
                doi.org/10.1016/j.cell.2025.12.049 <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p className="text-[11px] text-slate-600 italic">
              Esta revisión establece las 9 capacidades funcionales del cáncer y las 5 características facilitadoras (incluyendo la inestabilidad genómica como puente facilitador, no como capacidad oncogénica en sí misma).
            </p>
          </div>

          {/* Core Textbooks */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5">
              Manuales y Fuentes de Referencia en Biología Celular y Molecular
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">
                  Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022).
                </span>
                <span className="text-slate-600">
                  <em>Molecular Biology of the Cell</em> (7th ed.). W. W. Norton & Company.
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Capítulos 5 y 17: Mecanismos de reparación del ADN (BER, NER, MMR, HR, NHEJ) y control del ciclo celular (complejos CDK/ciclinas, p53, p21).
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">
                  Weinberg, R. A. (2021).
                </span>
                <span className="text-slate-600">
                  <em>The Biology of Cancer</em> (3rd ed.). W. W. Norton & Company.
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Capítulos 8, 9 y 12: Muerte celular programada (vías apoptóticas intrínseca y extrínseca), supresores de tumores e inestabilidad genómica.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-900 block">
                  Lodish, H., Berk, A., Kaiser, C. A., Krieger, M., Bretscher, A., Ploegh, H., Martin, K. C., Yaffe, M. B., & Amon, A. (2021).
                </span>
                <span className="text-slate-600">
                  <em>Molecular Cell Biology</em> (9th ed.). Macmillan Learning.
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Capítulo 6: Integridad genómica, enzimas de translesión (TLS) y fidelidad de replicación.
                </p>
              </div>
            </div>
          </div>

          {/* Established Biology vs Didactic Simplifications */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Distinción Epistemológica: Biología Establecida vs. Simplificaciones Didácticas
            </h4>

            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-800">
                  <tr>
                    <th className="p-3 w-1/2">Mecanismos Científicamente Establecidos</th>
                    <th className="p-3 w-1/2">Simplificaciones Didácticas en la Aplicación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 align-top text-slate-700">
                      <strong>Especificidad estricta de sustratos:</strong> NER procesa lesiones voluminosas y dímeros UV; BER procesa bases oxidadas y sitios AP; MGMT es reversión directa no catalítica; HR requiere cromátida hermana en S/G2.
                    </td>
                    <td className="p-3 align-top text-slate-600 bg-slate-50/50">
                      Se modelan las 6 vías principales sin desplegar todas las isoformas de glicosilasas (ej. MUTYH, MPG) ni los subtipos raros de recombinación no clásica (SSA, BIR).
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 align-top text-slate-700">
                      <strong>Independencia entre arresto y reparación:</strong> La detención del ciclo provee una ventana temporal, pero la reparación física depende de complejos enzimáticos distintos.
                    </td>
                    <td className="p-3 align-top text-slate-600 bg-slate-50/50">
                      Se ilustran los puntos de control como interruptores funcionales binarios (operativo/disfuncional) para facilitar el análisis causal comparativo sin simulación estocástica continua.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 align-top text-slate-700">
                      <strong>Lesión vs. Mutación:</strong> Una alteración química no es una mutación hasta que la polimerasa replica la cadena y fija un par erróneo en ambas hebras.
                    </td>
                    <td className="p-3 align-top text-slate-600 bg-slate-50/50">
                      Se ilustra el paso directo de «supervivencia con daño» a variación genética heredable para evidenciar la conexión temporal sin requerir modelado tridimensional atómico.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 align-top text-slate-700">
                      <strong>Inestabilidad genómica como facilitador:</strong> Hanahan (2026) clasifica la inestabilidad genómica como característica habilitadora, no como una capacidad funcional celular autónoma.
                    </td>
                    <td className="p-3 align-top text-slate-600 bg-slate-50/50">
                      Se presenta en un panel puente especializado, desaconsejando que los estudiantes la clasifiquen erróneamente como un décimo hallmark.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
