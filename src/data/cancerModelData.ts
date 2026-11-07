import { CancerNode, CancerConnection } from '../types/biology';

export interface CancerDimensionMeta {
  id: string;
  label: string;
  shortLabel: string;
  centerX: number;
  desc: string;
}

export const CANCER_DIMENSIONS: CancerDimensionMeta[] = [
  { 
    id: 'enabler', 
    label: 'Dimensión 1: Características Facilitadoras', 
    shortLabel: '1. Facilitadores', 
    centerX: 145, 
    desc: 'Condiciones biológicas del terreno que aceleran la adquisición de mutaciones y fenotipos' 
  },
  { 
    id: 'intrinsic', 
    label: 'Dimensión 2: Control y Supervivencia', 
    shortLabel: '2. Control Celular', 
    centerX: 415, 
    desc: 'Inactivación de frenos de ciclo, evasión de muerte y superación de la senescencia' 
  },
  { 
    id: 'metabolic', 
    label: 'Dimensión 3: Señalización y Metabolismo', 
    shortLabel: '3. Señalización', 
    centerX: 685, 
    desc: 'Autonomía mitógena, reprogramación bioenergética y plasticidad de linaje (EMT)' 
  },
  { 
    id: 'microenvironment', 
    label: 'Dimensión 4: Microambiente e Inmunidad', 
    shortLabel: '4. Microambiente', 
    centerX: 955, 
    desc: 'Acceso a vascularización, escape inmunológico y remodelación por células senescentes' 
  },
  { 
    id: 'dissemination', 
    label: 'Dimensión 5: Invasión y Metástasis', 
    shortLabel: '5. Diseminación', 
    centerX: 1225, 
    desc: 'Ruptura de barreras tisulares, intravasación y colonización de nichos distantes' 
  },
];

export const CANCER_NODES: CancerNode[] = [
  // ================= DIMENSIÓN 1: CARACTERÍSTICAS FACILITADORAS =================
  {
    id: 'can-enabler-genomic',
    dimension: 'enabler',
    type: 'enabler',
    name: 'Inestabilidad Genómica y Mutacional',
    subtitle: 'Puente directo con la falla de reparación',
    shortDescription: 'Falla intrínseca en la fidelidad de replicación o en las 6 vías de reparación que acelera la tasa de variación mutagénica.',
    x: 40,
    y: 90,
    colorTheme: 'amber',
    details: {
      definition: 'Condición facilitadora primaria (Hanahan 2026). No es una capacidad tumoral autónoma, sino el motor que multiplica la probabilidad estadística de mutaciones conductoras (driver mutations).',
      normalMechanism: 'Vigilancia de alta fidelidad por polimerasas replicativas, BER, NER, MMR, HR, NHEJ y arresto mediado por p53/ATM/ATR que mantienen una tasa de error de solo ~1 mutación por cada 10⁹ pb por generación.',
      molecularAlteration: 'Pérdida homocigota o mutaciones en BRCA1/2, MLH1/MSH2 (inestabilidad de microsatélites MSI), defectos en Pol ε/Pol δ, o fallas en TP53 que impiden la eliminación de células lesionadas.',
      populationAdvantage: 'Genera un repertorio heterogéneo masivo de subclones en el tejido, proporcionando el sustrato esencial para la selección clonal frente a fármacos o restricciones tisulares.',
      experimentalEvidence: 'Cuantificación de carga mutacional tumoral (TMB) por NGS, cariotipo espectral (SKY) para reordenamientos y ensayos de fragmentación cromosómica (cinética de γ-H2AX).',
      connectionToDnaDamage: 'Es el conector causal primario e insustituible entre el fracaso del mapa de reparación del ADN y la emergencia del fenotipo oncológico.',
      keyGenesAndProteins: ['TP53', 'BRCA1/BRCA2', 'MLH1', 'MSH2', 'ATM', 'RAD51', 'PARP1'],
      hanahan2026Insight: 'Hanahan (2026) enfatiza que los defectos de reparación por sí solos no generan tumores si la vigilancia tisular y la respuesta apoptótica están intactas.'
    }
  },
  {
    id: 'can-enabler-epigenetic',
    dimension: 'enabler',
    type: 'enabler',
    name: 'Reprogramación Epigenética No Mutacional',
    subtitle: 'Modificación heredable sin cambio de secuencia',
    shortDescription: 'Hipermetilación aberrante de promotores CpG, cambios en histonas y desorganización de la cromatina.',
    x: 40,
    y: 240,
    colorTheme: 'amber',
    details: {
      definition: 'Mecanismo facilitador caracterizado por alteraciones globales y heredables en el epigenoma que silencian supresores o desreprimen oncogenes sin alterar la secuencia nucleotídica.',
      normalMechanism: 'Mantenimiento fiel de patrones de metilación por DNMT1 y equilibrio entre histona acetiltransferasas (HATs) y desacetilasas (HDACs) para preservar la identidad celular terminal.',
      molecularAlteration: 'Hipermetilación de islas CpG en promotores de genes de reparación (ej. silenciamiento de MLH1 en cáncer colorrectal o de MGMT en glioma) y mutaciones en reguladores como TET2, DNMT3A, EZH2.',
      populationAdvantage: 'Permite transiciones fenotípicas rápidas y reversibles que otorgan resistencia plástica a fármacos sin depender de la lenta tasa de mutaciones genéticas.',
      experimentalEvidence: 'Secuenciación con bisulfito de sodio (WGBS), ChIP-seq para marcas H3K4me3 y H3K27me3, y ensayos de sensibilidad a inhibidores de DNMT (azacitidina).',
      connectionToDnaDamage: 'El daño persistente recluta complejos represores Polycomb a sitios de lesión, facilitando la hipermetilación accidental de promotores de reparación.',
      keyGenesAndProteins: ['DNMT1/3A', 'TET2', 'EZH2', 'KDM6A', 'Complejos Polycomb PRC2'],
      hanahan2026Insight: 'Consolidada en 2026 como característica facilitadora fundamental independiente de la inestabilidad genética clásica.'
    }
  },
  {
    id: 'can-enabler-inflammation',
    dimension: 'enabler',
    type: 'enabler',
    name: 'Inflamación Promotora de Tumores',
    subtitle: 'Estrés estromal continuo y liberación de ROS',
    shortDescription: 'Infiltrado leucocitario crónico que suministra factores de crecimiento, proteasas y especies reactivas mutagénicas.',
    x: 40,
    y: 390,
    colorTheme: 'amber',
    details: {
      definition: 'Microambiente inflamatorio paradójico: en lugar de destruir las células alteradas, macrófagos asociados a tumor (TAMs) y neutrófilos nutren el crecimiento tumoral.',
      normalMechanism: 'Inflamación aguda resolutiva: infiltración de neutrófilos y macrófagos M1 que fagocitan restos, destruyen patógenos y dan paso a la regeneración tisular controlada.',
      molecularAlteration: 'Polarización hacia macrófagos M2 inmunosupresores, secreción continua de TNF-α, IL-6, TGF-β y activación constitutiva de las vías NF-κB y STAT3.',
      populationAdvantage: 'Bombardeo continuo de factores mitógenos estromales y supervivencia en condiciones de hipoxia y acidosis tisular.',
      experimentalEvidence: 'Inmunohistoquímica para CD68/CD163 (TAMs), cuantificación de citoquinas en estroma tumoral por ELISA y modelos murinos tratados con anti-inflamatorios (ej. aspirina/coxibs).',
      connectionToDnaDamage: 'Los macrófagos y neutrófilos activados liberan de forma crónica óxido nítrico (NO) y superóxido (O₂•⁻), causando lesiones oxidativas (8-oxoG) en el ADN de células adyacentes.',
      keyGenesAndProteins: ['NF-κB', 'STAT3', 'COX-2', 'IL-6', 'TNF-α', 'Macrófagos TAM (M2)'],
      hanahan2026Insight: 'Hanahan (2026) resalta la inflamación estromal como uno de los vínculos más potentes entre daño tisular crónico, estrés genotóxico y adquisición de hallmarks.'
    }
  },
  {
    id: 'can-enabler-microbiome',
    dimension: 'enabler',
    type: 'enabler',
    name: 'Microbiomas Polimórficos',
    subtitle: 'Disbiosis y toxinas genotóxicas epiteliales',
    shortDescription: 'Poblaciones microbianas en mucosas que modulan la inflamación, secretan toxinas bacterianas y alteran la respuesta terapéutica.',
    x: 40,
    y: 540,
    colorTheme: 'amber',
    details: {
      definition: 'Característica facilitadora introducida por Hanahan: comunidades bacterianas comensales alteradas que colonizan nichos epiteliales y generan metabolitos mutagénicos.',
      normalMechanism: 'Microbiota equilibrada y eubiótica que preserva la integridad de la barrera mucosa, estimula la vigilancia inmunológica fisiológica y sintetiza ácidos grasos protectores (butirato).',
      molecularAlteration: 'Sobrecrecimiento de cepas bacterianas específicas (ej. E. coli pks+, Fusobacterium nucleatum, Bacteroides fragilis) que degradan mucina y penetran el epitelio.',
      populationAdvantage: 'Generación de nichos de baja respuesta inmunitaria y resistencia a quimioterápicos por metabolización bacteriana de fármacos.',
      experimentalEvidence: 'Secuenciación metagenómica del gen 16S ARNr en biopsias tumorales pareadas con mucosa normal y modelos gnotobióticos libres de gérmenes.',
      connectionToDnaDamage: 'La colibactina (sintetizada por cepas pks+) reacciona químicamente con el ADN formando aductos de adenina que inducen roturas de doble cadena (DSBs).',
      keyGenesAndProteins: ['Fusobacterium nucleatum', 'E. coli pks+ (isla colibactina)', 'Bacteroides fragilis toxigénica'],
      hanahan2026Insight: 'Pasa de ser una correlación ambiental a una característica facilitadora mecanísticamente vinculada al daño en el genoma epitelial.'
    }
  },
  {
    id: 'can-enabler-innervation',
    dimension: 'enabler',
    type: 'enabler',
    name: 'Inervación y Neurogénesis Tumoral',
    subtitle: 'Señalización neural autónoma y estromal',
    shortDescription: 'Brotamiento de axones sensoriales y autonómicos hacia el interior del tumor que liberan neurotransmisores tróficos.',
    x: 40,
    y: 690,
    colorTheme: 'amber',
    details: {
      definition: 'Característica facilitadora reconocida en Hanahan 2026: el sistema nervioso periférico ramifica fibras dentro del parénquima tumoral, promoviendo proliferación y diseminación.',
      normalMechanism: 'Las fibras nerviosas periféricas mantienen tono vascular y sensibilidad en órganos diana, con una estricta regulación de factores neurotróficos (NGF, BDNF).',
      molecularAlteration: 'Secreción tumoral desregulada de neurotrofinas (NGF) que induce axonogénesis; liberación continua de adrenalina, noradrenalina y acetilcolina en el estroma.',
      populationAdvantage: 'Estimulación adrenérgica de receptores β2 que inhibe apoptosis intrínseca, acelera la neoangiogénesis y guía la invasión perineural.',
      experimentalEvidence: 'Tinciones para marcadores axonales (β-III tubulina, PGP9.5), denervación quirúrgica o farmacológica con betabloqueantes en modelos animales.',
      connectionToDnaDamage: 'La estimulación adrenérgica sostenida activa vías de supervivencia que permiten a las células resistir tratamientos genotóxicos inductores de DSBs.',
      keyGenesAndProteins: ['NGF / TrkA', 'Receptores adrenérgicos β2', 'Acetilcolina / Receptores nicotínicos', 'BDNF'],
      hanahan2026Insight: 'La neurogénesis tumoral es uno de los campos de mayor expansión terapéutica en la actualización 2026.'
    }
  },

  // ================= DIMENSIÓN 2: CONTROL Y SUPERVIVENCIA =================
  {
    id: 'can-hallmark-suppressors',
    dimension: 'intrinsic',
    type: 'hallmark',
    number: 1,
    name: 'Inactivación de Supresores de Crecimiento',
    subtitle: 'Evasión de los frenos del ciclo celular (p53 / Rb)',
    shortDescription: 'Pérdida funcional de los puntos de control G1/S y G2/M que detienen el ciclo ante alteraciones en el genoma.',
    x: 310,
    y: 150,
    colorTheme: 'rose',
    details: {
      definition: 'Capacidad funcional adquirida #1. Eliminación de los programas moleculares que imponen arresto celular o senescencia obligada frente a estrés genotóxico o hiperproliferación.',
      normalMechanism: 'p53 transactiva p21 (CDKN1A), inhibiendo complejos CDK4/6-Ciclina D y CDK2-Ciclina E; la proteína Rb permanece hipofosforada y retiene secuestrado a E2F, bloqueando la fase S.',
      molecularAlteration: 'Mutaciones puntuales en el dominio de unión a ADN de TP53 (R175, R248, R273), deleciones en CDKN2A (p16INK4a), amplificación de MDM2 o hiperfosforilación constitutiva de Rb.',
      populationAdvantage: 'Las células lesionadas no sufren detención del ciclo: continúan replicando su ADN dañado inmediatamente, acortando el tiempo de duplicación poblacional.',
      experimentalEvidence: 'Incorporación activa de BrdU/EdU tras radiación ionizante, inmunohistoquímica con sobreacumulación de p53 mutante estabilizado y secuenciación génica.',
      connectionToDnaDamage: 'Si el punto de control G1/S falla, la horquilla replicativa colisiona con lesiones no reparadas de NER o BER, forzando roturas cromosómicas aberrantes.',
      keyGenesAndProteins: ['TP53', 'RB1', 'CDKN1A (p21)', 'CDKN2A (p16)', 'MDM2', 'CDK4/6'],
      hanahan2026Insight: 'Reafirma que la pérdida de supresores es un evento permisivo: no crea la mutación, sino que permite que la célula mutada sobreviva y prolifere.'
    }
  },
  {
    id: 'can-hallmark-death',
    dimension: 'intrinsic',
    type: 'hallmark',
    number: 2,
    name: 'Resistencia a la Muerte Celular',
    subtitle: 'Bloqueo de la apoptosis mitocondrial y extrínseca',
    shortDescription: 'Incapacidad de activar la vía de BAX/BAK o caspasas frente a daño letal en el ADN o estrés citotóxico.',
    x: 310,
    y: 370,
    colorTheme: 'rose',
    details: {
      definition: 'Capacidad funcional adquirida #2. Desconexión de los circuitos de autodestrucción celular programada frente a daño genotóxico irreparable, estrés oncogénico o señales inmunes.',
      normalMechanism: 'Ante daño masivo no reparable, p53 y cinasas de estrés inducen proteínas BH3-only (PUMA, NOXA, BIM) que neutralizan a BCL-2 y activan BAX/BAK, abriendo poros mitocondriales (MOMP).',
      molecularAlteration: 'Translocación t(14;18) que sobreexpresa BCL-2, amplificación de MCL-1, silenciamiento o pérdida de BAX, o sobreexpresión de inhibidores de caspasa (XIAP).',
      populationAdvantage: 'Permite la supervivencia clonal de variantes celulares con genomas caóticos o tras ciclos de radioterapia y quimioterapia citotóxica.',
      experimentalEvidence: 'Ausencia de tinción con anexina V por citometría de flujo, persistencia de células tras exposición a inductores de apoptosis (ej. venetoclax) y Western blot para caspasa-3 intacta.',
      connectionToDnaDamage: 'La persistencia de roturas de doble cadena (DSBs) induciría muerte celular inmediata si los umbrales de activación de BCL-2 no estuvieran constitutivamente alterados.',
      keyGenesAndProteins: ['BCL-2', 'BAX', 'BAK', 'PUMA', 'NOXA', 'MCL-1', 'Caspasa-9 / Caspasa-3'],
      hanahan2026Insight: 'Hanahan 2026 subraya que las células tumorales también desarrollan resistencia a formas no apoptóticas de muerte (ferroptosis, necroptosis).'
    }
  },
  {
    id: 'can-hallmark-immortality',
    dimension: 'intrinsic',
    type: 'hallmark',
    number: 4,
    name: 'Inmortalidad Replicativa',
    subtitle: 'Mantenimiento telomérico por TERT o vía ALT',
    shortDescription: 'Mantenimiento indefinido de los extremos cromosómicos para evadir el límite senescente de Hayflick.',
    x: 310,
    y: 590,
    colorTheme: 'rose',
    details: {
      definition: 'Capacidad funcional adquirida #4. Adquisición de potencial proliferativo ilimitado evitando la crisis telomérica y la catástrofe de puentes cromosómicos terminales.',
      normalMechanism: 'Las células somáticas sufren acortamiento de telómeros (~50–100 pb por ronda de división); cuando se erosionan, se detectan como DSBs no reparables y provocan senescencia.',
      molecularAlteration: 'Mutaciones puntuales en el promotor del gen TERT (C228T, C250T causadas frecuentemente por UV) o recombinación homóloga alternativa aberrante entre telómeros (ALT).',
      populationAdvantage: 'Elimina el límite generacional estricto del linaje, permitiendo la acumulación continua de divisiones celulares a lo largo de décadas.',
      experimentalEvidence: 'Ensayo TRAP (Telomeric Repeat Amplification Protocol) para actividad enzimática de telomerasa y análisis de longitud telomérica por Southern blot o Q-FISH.',
      connectionToDnaDamage: 'Los telómeros erosionados se confunden con extremos rotos de ADN y son procesados erróneamente por NHEJ, provocando fusiones cromosómicas dicéntricas masivas.',
      keyGenesAndProteins: ['TERT (subunidad catalítica)', 'TERC (molde ARN)', 'Complejo Shelterina (TRF1/2)', 'RAD50/MRE11'],
      hanahan2026Insight: 'Las mutaciones del promotor de TERT son las mutaciones no codificantes más frecuentes en melanomas, gliomas y carcinomas uroteliales.'
    }
  },

  // ================= DIMENSIÓN 3: SEÑALIZACIÓN Y METABOLISMO =================
  {
    id: 'can-hallmark-signaling',
    dimension: 'metabolic',
    type: 'hallmark',
    number: 3,
    name: 'Señalización Proliferativa Sostenida',
    subtitle: 'Autonomía mitógena constitutiva (MAPK / PI3K)',
    shortDescription: 'Independencia de factores de crecimiento externos mediante mutaciones constitutivamente activadoras en oncogenes.',
    x: 580,
    y: 150,
    colorTheme: 'indigo',
    details: {
      definition: 'Capacidad funcional adquirida #3. Hiperactivación autonómica permanente de las rutas intracelulares que comandan la replicación del ADN y el aumento de biomasa celular.',
      normalMechanism: 'Los factores de crecimiento mitógenos se unen transitoriamente a receptores tirosina cinasa (RTKs); se activan las cinasas RAS-RAF-MEK-ERK o PI3K-AKT-mTOR de forma pulsátil.',
      molecularAlteration: 'Mutaciones en codones clave de KRAS (G12D/V), BRAF (V600E), PIK3CA, o amplificaciones de EGFR/HER2 que dejan al interruptor molecular en estado perpetuamente encendido.',
      populationAdvantage: 'Las células proliferan continuamente sin requerir la presencia de factores tróficos ni señales autorizadas del estroma tisular.',
      experimentalEvidence: 'Fosforilación continua de ERK1/2 o AKT en células cultivadas en ausencia total de suero fetal, y ensayos de clonogenicidad independiente de anclaje.',
      connectionToDnaDamage: 'Las lesiones no corregidas por BER (8-oxoG) o NER (aductos) fijan sustituciones de bases en codones de KRAS y BRAF durante la replicación en fase S.',
      keyGenesAndProteins: ['KRAS', 'BRAF', 'EGFR / HER2', 'PIK3CA', 'AKT', 'mTOR', 'MYC'],
      hanahan2026Insight: 'Hanahan 2026 destaca que la hiperestimulación mitógena crónica también induce estrés de replicación, generando más inestabilidad en el genoma.'
    }
  },
  {
    id: 'can-hallmark-metabolism',
    dimension: 'metabolic',
    type: 'hallmark',
    number: 9,
    name: 'Desregulación Metabólica Celular',
    subtitle: 'Efecto Warburg y biosíntesis de macromoléculas',
    shortDescription: 'Conversión de glucosa en lactato en presencia de oxígeno para canalizar carbono hacia la síntesis de nucleótidos y lípidos.',
    x: 580,
    y: 370,
    colorTheme: 'indigo',
    details: {
      definition: 'Capacidad funcional adquirida #9. Reconfiguración global de las rutas energéticas celulares: la prioridad pasa de producir ATP eficiente a producir precursores biosintéticos a gran velocidad.',
      normalMechanism: 'En presencia de O₂, la glucólisis citoplasmática genera piruvato que entra a la mitocondria para el ciclo de Krebs y fosforilación oxidativa, rindiendo ~36 ATP por glucosa.',
      molecularAlteration: 'Sobreexpresión del transportador GLUT1, piruvato cinasa M2 (PKM2), lactato deshidrogenasa A (LDHA) y reprogramación dependiente de glutamina vía MYC y pérdida de p53.',
      populationAdvantage: 'Suministro ininterrumpido de ribosa-5-fosfato (para nuevos nucleótidos) y acetil-CoA (para membranas lipídicas) que sostienen ritmos frenéticos de duplicación.',
      experimentalEvidence: 'Medición de la tasa de acidificación extracelular (ECAR) y consumo de oxígeno (OCR) en analizador Seahorse, y tomografía por emisión de positrones con ¹⁸F-FDG.',
      connectionToDnaDamage: 'p53 fisiológico estimula la fosforilación oxidativa mitocondrial; cuando p53 se inactiva por daño no resuelto, la célula vira forzosamente al fenotipo Warburg.',
      keyGenesAndProteins: ['GLUT1', 'PKM2', 'LDHA', 'HIF-1α', 'IDH1/IDH2 mutadas', 'MYC'],
      hanahan2026Insight: 'El metabolismo no es un simple efecto colateral, sino una capacidad conductora que permite el crecimiento de la masa tumoral en hipoxia.'
    }
  },
  {
    id: 'can-hallmark-plasticity',
    dimension: 'metabolic',
    type: 'hallmark',
    number: 6,
    name: 'Desbloqueo de Plasticidad Fenotípica',
    subtitle: 'Transición epitelio-mesénquima (EMT) y desdiferenciación',
    shortDescription: 'Regresión hacia estados pluripotenciales o transdiferenciación que permite evadir terapias dirigidas.',
    x: 580,
    y: 590,
    colorTheme: 'indigo',
    details: {
      definition: 'Capacidad funcional formalizada en Hanahan 2026: capacidad de revertir o desviar la identidad de linaje celular para adaptarse a presiones microambientales o farmacológicas.',
      normalMechanism: 'Fijación epigenética estricta del linaje diferenciado terminal; factores de pluripotencia como Oct4, Sox2 y Nanog se encuentran permanentemente reprimidos en epitelios adultos.',
      molecularAlteration: 'Reactivación de factores de transcripción de EMT (Snail, Slug, Twist, ZEB1/2) y pérdida de marcadores del citoesqueleto epitelial (E-cadherina, citoqueratinas).',
      populationAdvantage: 'Permite que un adenocarcinoma prostático o pulmonar transdiferencie a un carcinoma neuroendocrino resistente a inhibidores de receptores.',
      experimentalEvidence: 'Detección por citometría de marcadores mesenquimales (vimentina, N-cadherina) con pérdida de E-cadherina, y secuenciación de ARN de célula única (scRNA-seq).',
      connectionToDnaDamage: 'El daño crónico al ADN y las especies reactivas de oxígeno activan TGF-β y vías de estrés que desbloquean la expresión de factores embrionarios.',
      keyGenesAndProteins: ['ZEB1 / ZEB2', 'Snail / Slug', 'Twist', 'E-cadherina', 'Vimentina', 'TGF-β'],
      hanahan2026Insight: 'Distingue con nitidez la plasticidad fenotípica (cambio de identidad funcional) de la inestabilidad genética clásica.'
    }
  },

  // ================= DIMENSIÓN 4: MICROAMBIENTE E INMUNIDAD =================
  {
    id: 'can-hallmark-vasculature',
    dimension: 'microenvironment',
    type: 'hallmark',
    number: 5,
    name: 'Inducción de Vascularización',
    subtitle: 'Angiogénesis aberrante e interruptor angiogénico',
    shortDescription: 'Secreción sostenida de VEGF y factores pro-angiogénicos para construir redes vasculares tumorales.',
    x: 850,
    y: 150,
    colorTheme: 'emerald',
    details: {
      definition: 'Capacidad funcional adquirida #5. Rompimiento del balance quiescente endotelial ("angiogenic switch") para irrigar la masa neoplásica y suministrar oxígeno y glucosa.',
      normalMechanism: 'Equilibrio estricto en tejidos normales donde los factores proangiogénicos (VEGF-A) son contrarrestados por inhibidores fisiológicos (trombospondina-1, endostatina).',
      molecularAlteration: 'Estabilización de HIF-1α por hipoxia tisular intratumoral, secreción masiva de VEGF-A, angiopoyetina-2 y degradación de la membrana basal vascular por pericitos defectuosos.',
      populationAdvantage: 'Permite que las colonias tumorales superen la barrera física de difusión pasiva de oxígeno (~100–200 µm) y continúen su expansión tridimensional.',
      experimentalEvidence: 'Inmunofluorescencia de densidad microvascular con CD31/CD34, dosificación de VEGF en suero y microscopía intravital de vasos tortuosos y permeables.',
      connectionToDnaDamage: 'La hipoxia severa en zonas hipovascularizadas genera estrés oxidativo y roturas de ADN, acelerando la inestabilidad en células que logran sobrevivir.',
      keyGenesAndProteins: ['VEGF-A / VEGFR2', 'HIF-1α', 'Angiopoyetina-1/2', 'Trombospondina-1', 'FGF2'],
      hanahan2026Insight: 'Los neovasos tumorales son anatómicamente caóticos, fenestrados y con pericitos desprendidos, facilitando la intravasación tumoral.'
    }
  },
  {
    id: 'can-hallmark-immune',
    dimension: 'microenvironment',
    type: 'hallmark',
    number: 8,
    name: 'Evasión de la Destrucción Inmunitaria',
    subtitle: 'Escape a linfocitos CD8+ y sobreexpresión de PD-L1',
    shortDescription: 'Neutralización activa de linfocitos T citotóxicos y pérdida de presentación antigénica en MHC de clase I.',
    x: 850,
    y: 370,
    colorTheme: 'emerald',
    details: {
      definition: 'Capacidad funcional adquirida #8. Inactivación de la inmunovigilancia tisular antitumoral ejercida por linfocitos T citotóxicos CD8+, células NK y células presentadoras.',
      normalMechanism: 'Los linfocitos T reconocen péptidos mutados (neoantígenos) en el complejo mayor de histocompatibilidad (MHC-I) y liberan perforinas y granzimas, induciendo apoptosis.',
      molecularAlteration: 'Sobreexpresión del ligando inhibidor PD-L1 en la membrana tumoral, pérdida de beta-2 microglobulina (B2M) que destruye el MHC-I, o reclutamiento de linfocitos Treg inmunosupresores.',
      populationAdvantage: 'Permite que células con cientos de mutaciones y neoantígenos anómalos prosperen sin ser eliminadas por el sistema inmunológico del huésped.',
      experimentalEvidence: 'Inmunohistoquímica de PD-L1 (puntuación TPS/CPS), citometría de infiltración de linfocitos T CD8+ exhaustos (LAG-3, TIM-3) y respuesta a anticuerpos anti-PD-1 (pembrolizumab).',
      connectionToDnaDamage: 'A mayor defecto de reparación (ej. deficiencia de MMR con alta MSI), mayor número de neoantígenos; esto ejerce una selección implacable a favor de subclones que sobreexpresen PD-L1.',
      keyGenesAndProteins: ['PD-L1 / PD-1', 'CTLA-4', 'MHC-I (HLA-A/B/C)', 'Beta-2 microglobulina (B2M)', 'Linfocitos Treg (FoxP3+)'],
      hanahan2026Insight: 'Pilar de la inmunoterapia oncológica moderna: desbloquear el freno inmunitario reactiva la lisis de células tumorales.'
    }
  },
  {
    id: 'can-enabler-senescence',
    dimension: 'microenvironment',
    type: 'enabler',
    name: 'Células Senescentes y Secretoma SASP',
    subtitle: 'El estroma envejecido que nutre al cáncer',
    shortDescription: 'Células estromales y tumorales que entran en arresto permanente pero liberan un secretoma inflamatorio pro-oncogénico.',
    x: 850,
    y: 590,
    colorTheme: 'emerald',
    details: {
      definition: 'Dimensión actualizada en Hanahan 2026: células que ya no proliferan pero permanecen metabólicamente hiperactivas, remodelando el microambiente a través del SASP.',
      normalMechanism: 'La senescencia actúa inicialmente como barrera protectora antitumoral irreversible frente a daño severo en el ADN mediante p16 y p21 sostenidos.',
      molecularAlteration: 'Persistencia crónica de células senescentes que secretan metaloproteinasas (MMP-1, MMP-3), factores de crecimiento y quimiocinas (IL-8, CXCL1).',
      populationAdvantage: 'El secretoma SASP ablanda la matriz extracelular, promueve angiogénesis vecina y protege a subclones tumorales de la respuesta inmune.',
      experimentalEvidence: 'Tinción histoquímica para β-galactosidasa asociada a senescencia (SA-β-gal), niveles de p16INK4a y medición de citoquinas del SASP en microambiente.',
      connectionToDnaDamage: 'Es el destino celular directo resultante del daño no resuelto con p53 funcional; su permanencia a largo plazo paradójicamente favorece la malignidad.',
      keyGenesAndProteins: ['Fenotipo SASP', 'SA-β-galactosidasa', 'p16INK4a', 'MMP-1/3', 'IL-6 / IL-8'],
      hanahan2026Insight: 'Doble filo de la senescencia: protectora celular individual a corto plazo, pero facilitadora de agresividad tisular a largo plazo.'
    }
  },

  // ================= DIMENSIÓN 5: DISEMINACIÓN SISTÉMICA =================
  {
    id: 'can-hallmark-invasion',
    dimension: 'dissemination',
    type: 'hallmark',
    number: 7,
    name: 'Invasión Tisular Local',
    subtitle: 'Degradación de matriz y motilidad estromal',
    shortDescription: 'Desprendimiento de la masa primaria, digestión de membrana basal por metaloproteinasas y motilidad activa.',
    x: 1120,
    y: 260,
    colorTheme: 'rose',
    details: {
      definition: 'Primera fase de la capacidad funcional #7. Ruptura física de las restricciones anatómicas del epitelio y avance invasivo a través del estroma circundante.',
      normalMechanism: 'Las células epiteliales están ancladas por uniones adherentes (complejo E-cadherina/catenina) y confinadas por una membrana basal de colágeno IV y laminina.',
      molecularAlteration: 'Disolución del complejo E-cadherina, secreción de metaloproteinasas de matriz activas (MMP-2, MMP-9, MT1-MMP) y formación de invadopodios con polimerización de actina.',
      populationAdvantage: 'Escape del confinamiento espacial y del estrés metabólico local en el centro del tumor primario hacia zonas con mayor irrigación tisular.',
      experimentalEvidence: 'Ensayos de migración e invasión en cámaras de Boyden recubiertas de Matrigel, zimografía en gel para actividad de MMPs e histopatología de invasión perineural o linfovascular.',
      connectionToDnaDamage: 'Subclones con inestabilidad genómica acumulan alteraciones en reguladores del citoesqueleto (RhoA, Rac1) que facilitan la transición motil.',
      keyGenesAndProteins: ['MMP-2 / MMP-9', 'E-cadherina (CDH1)', 'Cateninas (α, β)', 'Rho/Rac GTPasas', 'Integrinas αvβ3'],
      hanahan2026Insight: 'La invasión no es solo un fenómeno celular aislado, sino una cooperación dinámica con fibroblastos asociados a tumor (CAFs).'
    }
  },
  {
    id: 'can-hallmark-metastasis',
    dimension: 'dissemination',
    type: 'hallmark',
    number: 7,
    name: 'Colonización Metastásica Distante',
    subtitle: 'Intravasación, supervivencia circulatoria y nicho distal',
    shortDescription: 'Viaje por vía hematógena o linfática, extravasación y proliferación en parénquimas orgánicos distantes.',
    x: 1120,
    y: 480,
    colorTheme: 'rose',
    details: {
      definition: 'Fase culminante de la capacidad #7 y responsable del ~90% de la mortalidad oncológica. Establecimiento autónomo de tumores secundarios en órganos lejanos.',
      normalMechanism: 'Las células normales que se desprenden de su matriz sufren muerte programada por desanclaje (anoikis); los capilares y la respuesta inmune filtran células circulantes.',
      molecularAlteration: 'Resistencia a anoikis mediada por TrkB/AKT, formación de émbolos con plaquetas que protegen de fuerzas de cizallamiento y preparación del nicho pre-metastásico por exosomas.',
      populationAdvantage: 'Dispersión sistémica del clon tumoral en múltiples parénquimas orgánicos con abundancia de nutrientes y espacio biológico.',
      experimentalEvidence: 'Detección de células tumorales circulantes (CTCs) por CellSearch, modelos murinos de metástasis experimental (inyección intracardiaca o en vena de la cola) y bioluminiscencia in vivo.',
      connectionToDnaDamage: 'El cuello de botella implacable del torrente circulatorio solo es superado por variantes con evasión apoptótica extrema y máxima adaptabilidad clonal.',
      keyGenesAndProteins: ['Células tumorales circulantes (CTCs)', 'Nicho pre-metastásico', 'Resistencia a Anoikis (TrkB)', 'Agregación plaquetaria (TF)'],
      hanahan2026Insight: 'Hanahan 2026 destaca la colonización como el paso limitante de velocidad: millones de células se desprenden, pero solo una fracción minúscula logra formar una metástasis macrometastásica.'
    }
  }
];

export const CANCER_CONNECTIONS: CancerConnection[] = [
  // Facilitadores hacia Capacidades Celulares Intrínsecas
  {
    from: 'can-enabler-genomic',
    to: 'can-hallmark-suppressors',
    type: 'direct',
    label: 'Mutaciones conductoras en TP53 y RB1',
    mechanismExplanation: 'La inestabilidad mutacional fija mutaciones por transversión o deleción que inactivan los dominios de unión de p53 y p16.'
  },
  {
    from: 'can-enabler-genomic',
    to: 'can-hallmark-death',
    type: 'direct',
    label: 'Pérdida de efectores apoptóticos (BAX/PUMA)',
    mechanismExplanation: 'Mutaciones somáticas inactivan los efectores pro-apoptóticos downstream de p53, confiriendo resistencia a la muerte.'
  },
  {
    from: 'can-enabler-genomic',
    to: 'can-hallmark-signaling',
    type: 'direct',
    label: 'Mutaciones activadoras en KRAS y BRAF',
    mechanismExplanation: 'Errores replicativos no corregidos generan transiciones puntuales en codones mitógenos (KRAS G12D/V, BRAF V600E).'
  },
  {
    from: 'can-enabler-genomic',
    to: 'can-hallmark-immortality',
    type: 'indirect',
    label: 'Mutaciones en promotor de TERT',
    mechanismExplanation: 'Sustituciones C228T/C250T crean sitios de unión de novo para factores ETS, reactivando la telomerasa.'
  },
  {
    from: 'can-enabler-epigenetic',
    to: 'can-hallmark-suppressors',
    type: 'direct',
    label: 'Hipermetilación de promotor CDKN2A',
    mechanismExplanation: 'Metilación aberrante de islas CpG silencia la expresión de p16INK4a sin alterar la secuencia genética del gen.'
  },
  {
    from: 'can-enabler-epigenetic',
    to: 'can-hallmark-plasticity',
    type: 'direct',
    label: 'Desrepresión epigenética de EMT',
    mechanismExplanation: 'Remodelado de cromatina por EZH2/PRC2 desreprime promotores de ZEB1 y Snail, favoreciendo la plasticidad.'
  },

  // Inflamación y Microambiente hacia el Genoma y Vasculatura
  {
    from: 'can-enabler-inflammation',
    to: 'can-enabler-genomic',
    type: 'direct',
    label: 'Estrés oxidativo mutagénico continuo',
    mechanismExplanation: 'Leucocitos estromales liberan ROS y óxido nítrico, incrementando la carga basal de daño 8-oxoG en el epitelio vecino.'
  },
  {
    from: 'can-enabler-inflammation',
    to: 'can-hallmark-vasculature',
    type: 'direct',
    label: 'Liberación estromal de VEGF y angiopoyetinas',
    mechanismExplanation: 'Macrófagos TAM infiltrantes secretan factores de crecimiento endotelial en respuesta a citoquinas inflamatorias.'
  },
  {
    from: 'can-enabler-microbiome',
    to: 'can-enabler-inflammation',
    type: 'direct',
    label: 'Disbiosis activa receptores tipo Toll (TLR)',
    mechanismExplanation: 'Bacterias oportunistas estimulan receptores TLR en células dendríticas, cronificando la inflamación del estroma.'
  },
  {
    from: 'can-enabler-innervation',
    to: 'can-hallmark-death',
    type: 'indirect',
    label: 'Señalización adrenérgica anti-apoptótica',
    mechanismExplanation: 'La liberación de noradrenalina estimula receptores β2-adrenérgicos, activando AKT y bloqueando la vía intrínseca.'
  },

  // Interconexiones entre Hallmarks Intrínsecos y Metabólicos
  {
    from: 'can-hallmark-suppressors',
    to: 'can-hallmark-death',
    type: 'direct',
    label: 'Falla de p53 impide transactivación de BAX',
    mechanismExplanation: 'Sin p53 funcional, las señales de daño genotóxico no pueden inducir los niveles críticos de PUMA y NOXA para abrir la mitocondria.'
  },
  {
    from: 'can-hallmark-suppressors',
    to: 'can-hallmark-metabolism',
    type: 'indirect',
    label: 'Pérdida de inducción de SCO2 mitocondrial',
    mechanismExplanation: 'p53 estimula normalmente el complejo citocromo c oxidasa; su ausencia debilita la respiración forzando el efecto Warburg.'
  },
  {
    from: 'can-hallmark-signaling',
    to: 'can-hallmark-metabolism',
    type: 'direct',
    label: 'Vía AKT/MYC sobreexpresa GLUT1 y PKM2',
    mechanismExplanation: 'La señalización proliferativa sostenida hiperestimula directamente la captación de glucosa y su desvío a biomasa.'
  },
  {
    from: 'can-hallmark-signaling',
    to: 'can-hallmark-vasculature',
    type: 'indirect',
    label: 'Inducción de VEGF independiente de hipoxia',
    mechanismExplanation: 'La cinasa RAS oncogénica activa la transcripción de VEGF-A incluso en condiciones de normoxia tisular.'
  },

  // Plasticidad y Microambiente hacia Invasión y Metástasis
  {
    from: 'can-hallmark-plasticity',
    to: 'can-hallmark-invasion',
    type: 'direct',
    label: 'Pérdida de E-cadherina y motilidad activa',
    mechanismExplanation: 'La transición mesenquimal disuelve las uniones adherentes y organiza fibras de estrés de actina para migración estromal.'
  },
  {
    from: 'can-hallmark-invasion',
    to: 'can-hallmark-metastasis',
    type: 'direct',
    label: 'Intravasación en capilares y vasos linfáticos',
    mechanismExplanation: 'Las células invasoras degradan la lámina basal vascular con MMPs y entran al torrente circulatorio sistémico.'
  },
  {
    from: 'can-hallmark-vasculature',
    to: 'can-hallmark-metastasis',
    type: 'indirect',
    label: 'Neovasos fenestrados facilitan el escape',
    mechanismExplanation: 'Los vasos formados por angiogénesis tumoral carecen de uniones estrechas continuas, simplificando la intravasación.'
  },
  {
    from: 'can-enabler-genomic',
    to: 'can-hallmark-immune',
    type: 'indirect',
    label: 'Alta carga mutacional exige escape por PD-L1',
    mechanismExplanation: 'A mayor generación de neoantígenos por inestabilidad, mayor presión selectiva para sobreexpresar puntos de control PD-L1.'
  },
  {
    from: 'can-enabler-senescence',
    to: 'can-hallmark-invasion',
    type: 'direct',
    label: 'SASP secreta MMPs que degradan la matriz',
    mechanismExplanation: 'Las células senescentes secretan metaloproteinasas MMP-1 y MMP-3 que allanan el camino invasivo para subclones vecinos.'
  }
];
