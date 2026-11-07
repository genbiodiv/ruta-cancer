export type BiologicalLevel = 
  | 'damage'      // Nivel 1: Origen y naturaleza del daño
  | 'repair'      // Nivel 2: Reconocimiento y reparación
  | 'signaling'   // Nivel 3: Detección, señalización y regulación
  | 'outcome'     // Nivel 4: Respuestas y decisiones celulares
  | 'population'; // Nivel 5: Consecuencias poblacionales y evolutivas

export type RepairPathwayId = 'DIRECT' | 'BER' | 'NER' | 'MMR' | 'HR' | 'NHEJ';

export type QualitativeStatus = 
  | 'plausible'      // Respuesta plausible
  | 'compromised'    // Respuesta comprometida
  | 'increased_risk' // Riesgo potencialmente aumentado
  | 'undetermined'   // No determinado
  | 'unevaluated';   // No evaluado

export interface Connection {
  from: string;
  to: string;
  type: 'direct' | 'indirect';
  label?: string;
  mechanismExplanation?: string;
}

export interface NetworkNode {
  id: string;
  level: BiologicalLevel;
  name: string;
  subtitle: string;
  shortDescription: string;
  category: 'damage' | 'repair' | 'sensor' | 'transducer' | 'effector' | 'checkpoint' | 'outcome' | 'hallmark_link';
  x: number;
  y: number;
  // Specific molecular information
  molecularDetails?: {
    lesionTypes: string[];
    keyComponents: string[];
    molecularSteps: string[];
    cellCyclePhase: string;
    functionalOutcome: string;
    consequencesOfFailure: string;
    fidelityNotes: string;
    experimentalEvidence: string;
  };
}

export type CellCyclePhase = 'G1' | 'S' | 'G2' | 'M';

export interface PerturbationState {
  damageType: 'uv' | 'ros' | 'ionizing' | 'benzoapyrene' | 'temozolomide' | 'mismatch';
  damageSeverity: 'low' | 'medium' | 'high';
  cellPhase: CellCyclePhase;
  repairStatus: Record<RepairPathwayId, boolean>; // true = funcional, false = comprometida
  p53Status: 'functional' | 'compromised';
  checkpointsStatus: 'operational' | 'dysfunctional';
  intrinsicApoptosis: boolean;
  extrinsicApoptosis: boolean;
  deathSignalsPresent: boolean;
  persistentProliferationSignals: boolean;
}

export interface BiologicalScenario {
  id: string;
  title: string;
  damageName: string;
  lesionDescription: string;
  primaryPathway: RepairPathwayId;
  defaultState: PerturbationState;
  guidingQuestion: string;
  predictionPrompt: string;
  scientificExplanation: string;
  comparativeConditionNote: string;
}

export interface CellComparisonProfile {
  id: 'A' | 'B' | 'C';
  name: string;
  tagline: string;
  repairStatus: 'competent' | 'pathway_compromised' | 'multiple_compromised';
  checkpoints: 'intact' | 'intact' | 'dysfunctional';
  p53: 'functional' | 'functional' | 'compromised';
  apoptosis: 'competent' | 'competent' | 'evaded';
  predictedOutcome: string;
  qualitativeStatus: QualitativeStatus;
  genomicIntegrityRisk: QualitativeStatus;
  cancerHallmarkRisk: QualitativeStatus;
  causalRationale: string;
}

export interface HallmarkOfCancer {
  id: string;
  number: number;
  title: string;
  classification: 'direct' | 'indirect' | 'not_modeled';
  description: string;
  questions: {
    normalMechanism: string;
    alterationFavors: string;
    populationAdvantage: string;
    experimentalProof: string;
  };
}

export interface EnablingCharacteristic {
  id: string;
  title: string;
  description: string;
  relevanceToDnaDamage: string;
}

export type CancerDimension = 
  | 'enabler'          // Dimensión 1: Características Facilitadoras (Inestabilidad, Inflamación, etc.)
  | 'intrinsic'        // Dimensión 2: Control del Ciclo y Supervivencia (Supresores, Apoptosis, Inmortalidad)
  | 'metabolic'        // Dimensión 3: Señalización, Metabolismo y Plasticidad (Señalización, Warburg, EMT)
  | 'microenvironment' // Dimensión 4: Microambiente e Inmunidad (Angiogénesis, Evasión Inmune, Senescencia)
  | 'dissemination';   // Dimensión 5: Invasión Tisular y Diseminación Metastásica

export interface CancerNode {
  id: string;
  dimension: CancerDimension;
  type: 'hallmark' | 'enabler';
  number?: number;
  name: string;
  subtitle: string;
  shortDescription: string;
  x: number;
  y: number;
  colorTheme: 'rose' | 'amber' | 'indigo' | 'emerald' | 'sky';
  details: {
    definition: string;
    normalMechanism: string;
    molecularAlteration: string;
    populationAdvantage: string;
    experimentalEvidence: string;
    connectionToDnaDamage: string;
    keyGenesAndProteins: string[];
    hanahan2026Insight: string;
  };
}

export interface CancerConnection {
  from: string;
  to: string;
  type: 'direct' | 'indirect';
  label: string;
  mechanismExplanation?: string;
}
