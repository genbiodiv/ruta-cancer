import React, { useState } from 'react';
import { 
  GitBranch, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle, 
  Dna, 
  Flame, 
  Activity, 
  Info, 
  ShieldCheck, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';

interface CloneInfo {
  name: string;
  count: number;
  color: string;
  desc: string;
  hallmarkGains?: string;
}

interface EmergingHallmark {
  id: string;
  number?: number;
  title: string;
  type: 'hallmark' | 'enabler';
  category: string;
  molecularDriver: string;
}

interface GenerationStep {
  generation: number;
  stageName: string;
  label: string;
  populationState: string;
  emergingHallmarks: EmergingHallmark[];
  cloneBreakdown: Record<string, CloneInfo[]>; // Keyed by pressure ('standard' | 'chemotherapy' | 'immune_pressure' | 'hypoxia')
  availablePressures: { id: string; label: string; desc: string }[];
  environmentalPressureDesc: Record<string, string>;
  selectiveMechanism: string;
  evolutionaryConcept: string;
  molecularDetail: string;
}

export const PopulationHistoryView: React.FC = () => {
  const [currentGen, setCurrentGen] = useState<number>(0);
  const [activePressure, setActivePressure] = useState<string>('standard');

  const historySteps: GenerationStep[] = [
    // ================= GENERACIÓN 0 =================
    {
      generation: 0,
      stageName: 'Tejido Normal Fisiológico',
      label: 'Generación 0: Tejido Epitelial Homeostático',
      populationState: 'Población celular normal, fenotípicamente homogénea. Todas las células poseen vías de reparación intactas (BER, NER, MMR, HR, NHEJ) y puntos de control funcionales comandados por p53/ATM/ATR.',
      emergingHallmarks: [],
      availablePressures: [
        { id: 'standard', label: 'Homeostasis Fisiológica', desc: 'Nutrientes y factores de crecimiento estromales normales.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 36, color: '#0284c7', desc: 'Genoma estable, p53 íntegro, ciclo celular estrictamente regulado.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Condiciones tisulares homeostáticas sin estrés genotóxico carcinógeno relevante.'
      },
      selectiveMechanism: 'La selección purificadora fisiológica elimina cualquier célula aberrante mediante apoptosis o senescencia dependiente de p53.',
      evolutionaryConcept: 'La tasa de variación genética es mínima (~1 error por cada 10⁹ pares de bases replicados). La población permanece clonalmente estable.',
      molecularDetail: 'La ARN polimerasa y las ADN polimerasas replicativas (Pol δ/ε) operan a máxima fidelidad con verificación inmediata de lectura por exonucleasa.'
    },

    // ================= GENERACIÓN 1 =================
    {
      generation: 1,
      stageName: 'Inestabilidad Genómica Inicial',
      label: 'Generación 1: Falla de Reparación y Fenotipo Mutador',
      populationState: 'La exposición a un carcinógeno o estrés oxidativo continuo genera una lesión que se copia durante la replicación, fijando una mutación heterocigota en un gen de reparación (ej. inactivación de MSH2 o defecto en BER).',
      emergingHallmarks: [
        {
          id: 'enabler-genome-instability',
          title: 'Inestabilidad Genómica y Mutacional',
          type: 'enabler',
          category: 'Característica Facilitadora',
          molecularDriver: 'Deficiencia en MMR (inestabilidad de microsatélites) o sobrecarga en BER por especies reactivas de oxígeno (8-oxoG).'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Exposición Carcinogénica Basal', desc: 'Presencia de aductos químicos o estrés oxidativo crónico.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 28, color: '#0284c7', desc: 'Genoma estable con vías de reparación activas.' },
          { name: 'Subclon 1 (Fenotipo mutador)', count: 8, color: '#f59e0b', desc: 'Reparación comprometida; tasa basal de mutación acelerada 100 veces.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'El epitelio absorbe dosis continuas de carcinógenos (humo de tabaco, radiación UV o disbiosis microbiana).'
      },
      selectiveMechanism: 'El subclon mutador no prolifera más rápido que las células normales, pero acumula variación genética silenciosa en cada ciclo replicativo.',
      evolutionaryConcept: 'Adquisición de la característica facilitadora central: la inestabilidad genómica no confiere ventajas inmediatas, sino que acelera la probabilidad estocástica de mutaciones posteriores.',
      molecularDetail: 'Sin MMR o BER competente, los errores de apareamiento y bases oxidadas persisten en la hebra hija y se fijan de forma permanente tras una segunda ronda de duplicación.'
    },

    // ================= GENERACIÓN 2 =================
    {
      generation: 2,
      stageName: 'Colapso de Supresores de Crecimiento',
      label: 'Generación 2: Inactivación de Frenos del Ciclo Celular (p53 / Rb)',
      populationState: 'Alimentado por el fenotipo mutador, en una de las células hijas del Subclon 1 ocurre una mutación inactivadora en el dominio de unión a ADN de TP53 o la deleción de CDKN2A (p16).',
      emergingHallmarks: [
        {
          id: 'hallmark-suppressors',
          number: 1,
          title: 'Inactivación de Supresores del Crecimiento',
          type: 'hallmark',
          category: 'Capacidad Funcional #1',
          molecularDriver: 'Mutación somática en TP53 (ej. R175H o R273H) y pérdida de transactivación de p21 (CDKN1A).'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Microambiente Estándar', desc: 'Competencia física incipiente en la capa epitelial.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 20, color: '#0284c7', desc: 'Células normales que se detienen ante estrés.' },
          { name: 'Subclon 1 (Solo mutador)', count: 6, color: '#f59e0b', desc: 'Reparación defectuosa pero con p53 aún activo.' },
          { name: 'Subclon 2 (Mutador + p53 mutado)', count: 10, color: '#ef4444', desc: 'Ignora los puntos de control G1/S; no se detiene a reparar.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'El tejido experimenta saturación física en la lámina basal epitelial.'
      },
      selectiveMechanism: 'El Subclon 2 continúa replicándose incluso cuando el ADN está dañado, evitando los retrasos de ciclo que sufren los subclones competentes.',
      evolutionaryConcept: 'Divergencia clonal: la población se vuelve heterogénea; coexisten variantes con distintas respuestas ante señales fisiológicas de arresto.',
      molecularDetail: 'La ausencia de p21 permite a los complejos Ciclina E-CDK2 hiperfosforilar a la proteína Rb continuamente, liberando al factor E2F para entrar en fase S sin autorización.'
    },

    // ================= GENERACIÓN 3 =================
    {
      generation: 3,
      stageName: 'Autonomía Proliferativa y Evasión de Muerte',
      label: 'Generación 3: Evasión Apoptótica y Señalización Sostenida',
      populationState: 'La replicación sin frenos facilita mutaciones adicionales: un clon adquiere activación en KRAS/BRAF y sobreexpresión de BCL-2. Las células se independizan de señales tróficas y resisten la apoptosis.',
      emergingHallmarks: [
        {
          id: 'hallmark-signaling',
          number: 3,
          title: 'Señalización Proliferativa Sostenida',
          type: 'hallmark',
          category: 'Capacidad Funcional #3',
          molecularDriver: 'Mutación activadora KRAS G12D que mantiene la cinasa ERK fosforilada permanentemente.'
        },
        {
          id: 'hallmark-death',
          number: 2,
          title: 'Resistencia a la Muerte Celular',
          type: 'hallmark',
          category: 'Capacidad Funcional #2',
          molecularDriver: 'Sobreexpresión de BCL-2 o pérdida de BAX/BAK que bloquea la permeabilización mitocondrial.'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Sin Tratamiento (Crecimiento Libre)', desc: 'Microambiente tisular normal.' },
        { id: 'chemotherapy', label: 'Estrés Citotóxico (Quimioterapia)', desc: 'Exposición a un fármaco que daña el ADN (ej. cisplatino o doxorrubicina).' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 12, color: '#0284c7', desc: 'Desplazado lentamente hacia los bordes.' },
          { name: 'Subclon 1 (Mutador)', count: 4, color: '#f59e0b', desc: 'Población remanente.' },
          { name: 'Subclon 3 (KRAS act. + BCL-2)', count: 20, color: '#7c3aed', desc: 'Autosuficiencia en factores de crecimiento y resistencia a apoptosis.' }
        ],
        chemotherapy: [
          { name: 'Clon Normal (WT)', count: 2, color: '#0284c7', desc: 'La gran mayoría entra en apoptosis fisiológica.' },
          { name: 'Subclon 1 (Mutador)', count: 1, color: '#f59e0b', desc: 'Muerte letal masiva por no procesar las lesiones del fármaco.' },
          { name: 'Subclon 3 (Resistente)', count: 33, color: '#7c3aed', desc: 'Sobrevive porque no ejecuta apoptosis; se expande rápidamente en el nicho vacío.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Competencia clonal por espacio tisular en la mucosa.',
        chemotherapy: 'Cuello de botella farmacológico severo: el agente citotóxico mata a células sensibles pero actúa como potente fuerza selectiva que enriquece el clon resistente.'
      },
      selectiveMechanism: 'Bajo estrés farmacológico, la capacidad de resistir la apoptosis mitocondrial decide la supervivencia absoluta del clon.',
      evolutionaryConcept: 'Selección clonal somática: el fármaco no "creó" la resistencia; la variante preexistente con BCL-2/p53 mutado fue seleccionada favorablemente al erradicar a sus competidores.',
      molecularDetail: 'La ausencia de caspasa-3 escindida en el Subclon 3 previene la degradación proteolítica del citoesqueleto y la fragmentación internucleosomal del ADN.'
    },

    // ================= GENERACIÓN 4 =================
    {
      generation: 4,
      stageName: 'Crisis Telomérica y Reactivación de TERT',
      label: 'Generación 4: Inmortalidad Replicativa Ilimitada',
      populationState: 'Tras decenas de divisiones aceleradas, los telómeros alcanzan una longitud críticamente corta. La mayoría de células entra en senescencia o catástrofe de puentes cromosómicos, hasta que un subclon adquiere mutaciones en el promotor de TERT.',
      emergingHallmarks: [
        {
          id: 'hallmark-immortality',
          number: 4,
          title: 'Inmortalidad Replicativa',
          type: 'hallmark',
          category: 'Capacidad Funcional #4',
          molecularDriver: 'Sustitución puntual de novo C228T en el promotor del gen TERT que genera sitios de unión para factores ETS.'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Erosión Telomérica Fisiológica', desc: 'Agotamiento del límite replicativo de Hayflick.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 4, color: '#0284c7', desc: 'En recambio quiescente basal.' },
          { name: 'Subclones en Crisis / Senescencia', count: 6, color: '#94a3b8', desc: 'Telómeros colapsados; arresto definitivo o mitosis aberrante.' },
          { name: 'Subclon 4 (Inmortalizado TERT+)', count: 26, color: '#b91c1c', desc: 'Elongación telomérica activa; divisiones sin límite biológico.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Límite de Hayflick: las células no inmortalizadas agotan su reserva telomérica terminal.'
      },
      selectiveMechanism: 'El Subclon 4 es el único capaz de superar la crisis telomérica sin sufrir senescencia replicativa ni catástrofe de roturas cromosómicas.',
      evolutionaryConcept: 'Superación de barreras biológicas intrínsecas: la senescencia replicativa actúa como una trampa evolucionada que el tumor elude reactivando programas embrionarios.',
      molecularDetail: 'La enzima ribonucleoproteína telomerasa añade repeticiones hexanucleotídicas TTAGGG a los extremos 3\' monocatenarios del cromosoma en cada ciclo celular.'
    },

    // ================= GENERACIÓN 5 =================
    {
      generation: 5,
      stageName: 'Hipoxia y Reconfiguración Metabólica',
      label: 'Generación 5: Efecto Warburg e Inducción de Vasculatura (VEGF)',
      populationState: 'La masa celular supera los 200 µm de diámetro, rebasando el límite de difusión pasiva de oxígeno. En el centro hipóxico y ácido, se estabiliza HIF-1α; se induce angiogénesis aberrante y viraje metabólico hacia la glucólisis aeróbica.',
      emergingHallmarks: [
        {
          id: 'hallmark-metabolism',
          number: 9,
          title: 'Desregulación Metabólica Celular',
          type: 'hallmark',
          category: 'Capacidad Funcional #9',
          molecularDriver: 'Sobreexpresión de GLUT1, hexocinasa II y LDHA para producir biomasa acelerada (efecto Warburg).'
        },
        {
          id: 'hallmark-vasculature',
          number: 5,
          title: 'Inducción de Vascularización',
          type: 'hallmark',
          category: 'Capacidad Funcional #5',
          molecularDriver: 'Estabilización de HIF-1α en hipoxia que transactiva masivamente el gen de VEGF-A.'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Gradiente de Hipoxia Tisular', desc: 'Núcleo tumoral hipóxico (pO2 < 10 mmHg).' },
        { id: 'antiangiogenic', label: 'Terapia Anti-Angiogénica', desc: 'Uso de anticuerpos anti-VEGF (ej. bevacizumab).' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 2, color: '#0284c7', desc: 'Periférico en tejido sano.' },
          { name: 'Subclones Necróticos Centrales', count: 4, color: '#475569', desc: 'Asfixiados por falta de glucosa y oxígeno.' },
          { name: 'Subclon 5 (Angiogénico / Warburg)', count: 30, color: '#059669', desc: 'Irrigado por neovasos tortuosos; consumo masivo de glucosa.' }
        ],
        antiangiogenic: [
          { name: 'Clon Normal (WT)', count: 2, color: '#0284c7', desc: 'Parénquima basal.' },
          { name: 'Subclones Necrotizados por Isquemia', count: 18, color: '#475569', desc: 'Colapso vascular por bloqueo de VEGF.' },
          { name: 'Subclon Adaptativo (Autofágico / Cooptación)', count: 16, color: '#059669', desc: 'Coopta vasos preexistentes y resiste en hipoxia extrema.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Estrés nutricional y acidosis por acumulación de ácido láctico en el centro tumoral.',
        antiangiogenic: 'Presión farmacológica dirigida que podó la vasculatura tumoral, forzando la selección de variantes metabólicamente más plásticas.'
      },
      selectiveMechanism: 'La capacidad de canalizar intermediarios glucolíticos hacia nucleótidos y lípidos en condiciones de hipoxia permite el crecimiento continuo de la masa tumoral.',
      evolutionaryConcept: 'Evolución del nicho ecológico: las células tumorales alteran activamente su microambiente reclutando vasos sanguíneos del huésped.',
      molecularDetail: 'La transcripción de VEGF-A por HIF-1α estimula receptores VEGFR2 en células endoteliales adyacentes, provocando brotamiento vascular caótico y fenestrado.'
    },

    // ================= GENERACIÓN 6 =================
    {
      generation: 6,
      stageName: 'Presión Inmune y Evasión por Puntos de Control',
      label: 'Generación 6: Escape a Linfocitos Citotóxicos (PD-L1 / MHC-I)',
      populationState: 'La inestabilidad genómica sostenida genera decenas de neoantígenos peptídicos mutados. El sistema inmune detecta las células e infiltra linfocitos T CD8+. Solo sobrevive el subclon que sobreexpresa el ligando inhibidor PD-L1 o pierde la beta-2 microglobulina.',
      emergingHallmarks: [
        {
          id: 'hallmark-immune',
          number: 8,
          title: 'Evasión de la Destrucción Inmunitaria',
          type: 'hallmark',
          category: 'Capacidad Funcional #8',
          molecularDriver: 'Sobreexpresión del ligando PD-L1 y reclutamiento de macrófagos M2 inmunosupresores.'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Vigilancia Inmunológica Endógena', desc: 'Ataque de linfocitos T CD8+ citotóxicos y células NK.' },
        { id: 'immunotherapy', label: 'Inmunoterapia (Anti-PD-1)', desc: 'Anticuerpo que bloquea el eje PD-1/PD-L1 reactivando la respuesta inmune.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Clon Normal (WT)', count: 2, color: '#0284c7', desc: 'Tolerado por el sistema inmunitario.' },
          { name: 'Subclones Lisados por Inmunidad', count: 4, color: '#94a3b8', desc: 'Reconocidos por MHC-I y eliminados por granzimas.' },
          { name: 'Subclon 6 (Inmunoevasor PD-L1+)', count: 30, color: '#e11d48', desc: 'Induce anergia en linfocitos T al contactar su receptor PD-1.' }
        ],
        immunotherapy: [
          { name: 'Clon Normal (WT)', count: 2, color: '#0284c7', desc: 'Parénquima sano.' },
          { name: 'Subclones Destruidos por Reactivación T', count: 22, color: '#94a3b8', desc: 'Los linfocitos reactivados lisan la mayor parte de la masa tumoral.' },
          { name: 'Subclon 6b (Pérdida de B2M / Antígeno-negativo)', count: 12, color: '#be123c', desc: 'Pierde completamente la expresión de MHC-I, volviéndose invisible a linfocitos T.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Vigilancia inmunológica natural: lisis continua de subclones inmunogénicos.',
        immunotherapy: 'Presión terapéutica de alta precisión que selecciona variantes con defectos en la maquinaria de procesamiento de antígenos (B2M o TAP1).'
      },
      selectiveMechanism: 'La capacidad de emitir señales de freno inmunitario ("checkpoints") previene la muerte celular mediada por perforinas de linfocitos citotóxicos.',
      evolutionaryConcept: 'Inmunoedición tumoral (Immunoediting): el sistema inmune moldea la composición antigénica del tumor, eliminando variantes detectables y seleccionando a las evasoras.',
      molecularDetail: 'La interacción PD-1:PD-L1 recluta a la fosfatasa SHP-2 en el linfocito T, desfosforilando a ZAP70 y cancelando la señal de activación del receptor TCR.'
    },

    // ================= GENERACIÓN 7 =================
    {
      generation: 7,
      stageName: 'Plasticidad Fenotípica y Diseminación Sistémica',
      label: 'Generación 7: Invasión Tisular, EMT y Metástasis Distante',
      populationState: 'La masa tumoral madura activa factores de plasticidad fenotípica (ZEB1, Snail). Las células pierden E-cadherina, degradan la membrana basal mediante metaloproteinasas (MMP-2/9), intravasan al torrente circulatorio y colonizan órganos distantes.',
      emergingHallmarks: [
        {
          id: 'hallmark-plasticity',
          number: 6,
          title: 'Desbloqueo de Plasticidad Fenotípica',
          type: 'hallmark',
          category: 'Capacidad Funcional #6',
          molecularDriver: 'Transición epitelio-mesénquima (EMT) mediada por reactivación de ZEB1/2 y Snail.'
        },
        {
          id: 'hallmark-invasion-metastasis',
          number: 7,
          title: 'Invasión Tisular y Metástasis',
          type: 'hallmark',
          category: 'Capacidad Funcional #7',
          molecularDriver: 'Pérdida de E-cadherina (CDH1), secreción de MMP-2/9 y resistencia a muerte por desanclaje (anoikis).'
        }
      ],
      availablePressures: [
        { id: 'standard', label: 'Diseminación Hematógena y Linfática', desc: 'Fuerzas de cizallamiento vascular y colonización de nuevos parénquimas.' }
      ],
      cloneBreakdown: {
        standard: [
          { name: 'Tejido Normal Residual', count: 1, color: '#0284c7', desc: 'Comprimido en la cápsula tumoral.' },
          { name: 'Tumor Primario Confinado', count: 7, color: '#be123c', desc: 'Células epiteliales cohesivas.' },
          { name: 'Subclon Metastásico Plástico (EMT+)', count: 28, color: '#881337', desc: 'Células mesenquimales invasoras colonizando hígado, pulmón o hueso.' }
        ]
      },
      environmentalPressureDesc: {
        standard: 'Cuello de botella hemodinámico extremo: las células circulantes deben sobrevivir a la fuerza de cizallamiento y sembrar en un parénquima extraño.'
      },
      selectiveMechanism: 'Solo las variantes con máxima adaptabilidad plástica, resistencia a anoikis y motilidad invasiva logran fundar macrometástasis en órganos secundarios.',
      evolutionaryConcept: 'Cáncer sistémico avanzado: la enfermedad no es el resultado de un solo interruptor prendido, sino la acumulación progresiva de capacidades funcionales (Hallmarks) seleccionadas generación tras generación.',
      molecularDetail: 'La transición mesenquimal disuelve desmosomas y uniones estrechas, reorganizando el citoesqueleto de actina en invadopodios que digieren el colágeno tipo IV de la lámina basal.'
    }
  ];

  const currentStep = historySteps[currentGen];

  // Adjust pressure if not available in current generation
  const activePressureObj = currentStep.availablePressures.find((p) => p.id === activePressure) 
    || currentStep.availablePressures[0];
  const activePressureKey = activePressureObj.id;

  const currentClones = currentStep.cloneBreakdown[activePressureKey] 
    || currentStep.cloneBreakdown['standard'] 
    || [];

  const handleNextGen = () => {
    if (currentGen < historySteps.length - 1) {
      const nextGen = currentGen + 1;
      setCurrentGen(nextGen);
      // Reset pressure to standard on new step if current not available
      const nextAvailable = historySteps[nextGen].availablePressures;
      if (!nextAvailable.some((p) => p.id === activePressure)) {
        setActivePressure(nextAvailable[0].id);
      }
    }
  };

  const handlePrevGen = () => {
    if (currentGen > 0) {
      const prevGen = currentGen - 1;
      setCurrentGen(prevGen);
      const prevAvailable = historySteps[prevGen].availablePressures;
      if (!prevAvailable.some((p) => p.id === activePressure)) {
        setActivePressure(prevAvailable[0].id);
      }
    }
  };

  const handleSetGen = (idx: number) => {
    setCurrentGen(idx);
    const available = historySteps[idx].availablePressures;
    if (!available.some((p) => p.id === activePressure)) {
      setActivePressure(available[0].id);
    }
  };

  const handleReset = () => {
    setCurrentGen(0);
    setActivePressure('standard');
  };

  const totalCellsInMosaic = currentClones.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-6 shadow-sm text-xs font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Simulator Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              Laboratorio Evolutivo Somático
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              Gen {currentStep.generation} de {historySteps.length - 1} · {currentStep.stageName}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-600" />
            Simulador de Evolución Clonal y Emergencia de Hallmarks
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Explora paso a paso cómo la variación heredable (generada por fallas de reparación) y las presiones selectivas tisulares impulsan la adquisición acumulativa de los Hallmarks of Cancer (Hanahan 2026).
          </p>
        </div>

        {/* Global Timeline Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="px-3 py-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
            title="Reiniciar a Generación 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>

          <button
            onClick={handlePrevGen}
            disabled={currentGen === 0}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors min-h-[40px]"
            title="Generación anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <button
            onClick={handleNextGen}
            disabled={currentGen === historySteps.length - 1}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors min-h-[40px]"
            title="Avanzar a la siguiente generación"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 8-Stage Generation Stepper Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 px-1">
          <span>Cronología de la Transformación Maligna:</span>
          <span>Etapa {currentGen + 1} / {historySteps.length}</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
          {historySteps.map((step, idx) => {
            const isCurrent = currentGen === idx;
            const isPast = currentGen > idx;

            return (
              <button
                key={idx}
                onClick={() => handleSetGen(idx)}
                className={`py-2 px-1.5 rounded-lg text-center transition-all min-h-[46px] flex flex-col justify-center items-center active:scale-95 ${
                  isCurrent
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-emerald-500/50'
                    : isPast
                    ? 'bg-white text-emerald-800 font-medium hover:bg-emerald-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span className="text-[10px] font-bold block">Gen {step.generation}</span>
                <span className="text-[9px] truncate max-w-[85px] block opacity-85">
                  {step.stageName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Generation Narrative Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
        {/* Step Header & Pressure Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
              Etapa Evolutiva {currentGen} de 7:
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {currentStep.label}
            </h3>
          </div>

          {/* Interactive Microenvironmental Pressure Selector */}
          {currentStep.availablePressures.length > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 shrink-0">
              <span className="text-[11px] font-bold text-slate-700 px-1">Presión microambiental:</span>
              <div className="flex items-center gap-1">
                {currentStep.availablePressures.map((press) => (
                  <button
                    key={press.id}
                    onClick={() => setActivePressure(press.id)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all min-h-[32px] ${
                      activePressureKey === press.id
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {press.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Narrative Description */}
        <p className="text-slate-700 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
          {currentStep.populationState}
        </p>

        {/* Emerging Hallmarks in this Generation */}
        {currentStep.emergingHallmarks.length > 0 && (
          <div className="space-y-2">
            <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-600" />
              Capacidades Adquiridas en esta Generación (Hanahan 2026):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentStep.emergingHallmarks.map((h) => (
                <div
                  key={h.id}
                  className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-200/80 text-rose-900">
                      {h.type === 'hallmark' && h.number ? `Hallmark #${h.number}` : 'Característica Facilitadora'}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-700">
                      {h.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{h.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    <strong className="text-slate-800">Motor molecular:</strong> {h.molecularDriver}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Cell Population Mosaic (36 Cells) */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                Mosaico Celular Tisular ({totalCellsInMosaic} células representativas)
              </span>
              <p className="text-[11px] text-slate-500 font-medium">
                Pasa el cursor sobre cualquier célula para inspeccionar el clon al que pertenece.
              </p>
            </div>

            {/* Proportional distribution bar */}
            <div className="flex h-3 w-48 sm:w-64 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
              {currentClones.map((clone, idx) => {
                const pct = Math.round((clone.count / totalCellsInMosaic) * 100);
                return (
                  <div
                    key={idx}
                    style={{ width: `${pct}%`, backgroundColor: clone.color }}
                    title={`${clone.name}: ${pct}%`}
                  />
                );
              })}
            </div>
          </div>

          {/* Cells Grid */}
          <div className="flex flex-wrap gap-2.5 py-2.5 justify-center sm:justify-start">
            {currentClones.map((clone, idx) => {
              const cells = Array.from({ length: clone.count });
              return cells.map((_, cIdx) => (
                <div
                  key={`${idx}-${cIdx}`}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs transition-all transform hover:scale-135 hover:shadow-md cursor-pointer active:scale-95"
                  style={{ backgroundColor: clone.color }}
                  title={`${clone.name}: ${clone.desc}`}
                >
                  •
                </div>
              ));
            })}
          </div>

          {/* Clonal Breakdown Legend */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {currentClones.map((clone, idx) => {
              const pct = Math.round((clone.count / totalCellsInMosaic) * 100);

              return (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span
                    className="w-4 h-4 rounded-full shrink-0 mt-0.5 shadow-2xs"
                    style={{ backgroundColor: clone.color }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-xs truncate">
                        {clone.name}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        ({clone.count} c / {pct}%)
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-600 leading-tight block mt-0.5">
                      {clone.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Causal Mechanisms & Darwinian Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Pressure & Selection */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Microambiente y Presión Selectiva:
            </span>
            <p className="text-slate-700 leading-relaxed font-normal">
              {currentStep.environmentalPressureDesc[activePressureKey] || currentStep.environmentalPressureDesc['standard']}
            </p>
            <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-100">
              <strong className="text-slate-700">Mecanismo de selección:</strong> {currentStep.selectiveMechanism}
            </div>
          </div>

          {/* Darwinian Principle */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
            <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Principio de Biología Evolutiva Somática:
            </span>
            <p className="text-emerald-950 leading-relaxed font-normal">
              {currentStep.evolutionaryConcept}
            </p>
            <div className="pt-1 text-[11px] text-emerald-800 border-t border-emerald-200/60 font-mono">
              <strong className="font-sans">Detalle molecular:</strong> {currentStep.molecularDetail}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Pedagogical Note */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed font-medium">
          <strong>Lección pedagógica central:</strong> El cáncer no surge de forma espontánea por un único interruptor molecular ni por un solo daño al ADN. Se trata de un proceso evolutivo continuo donde fallas en los sistemas de reparación generan variación genética o epigenética, y el microambiente actúa seleccionando progresivamente aquellos subclones que adquieren las capacidades biológicas (Hallmarks) necesarias para sobrevivir y expandirse.
        </p>
      </div>
    </div>
  );
};
