import { 
  NetworkNode, 
  Connection, 
  HallmarkOfCancer, 
  EnablingCharacteristic 
} from '../types/biology';

export const NETWORK_NODES: NetworkNode[] = [
  // ================= NIVEL 1: ORIGEN Y NATURALEZA DEL DAÑO =================
  {
    id: 'dmg-uv',
    level: 'damage',
    category: 'damage',
    name: 'Radiación Ultravioleta',
    subtitle: 'Fotoproductos de pirimidina',
    shortDescription: 'Causa dímeros de ciclobutano pirimidina (CPD) y fotoproductos (6-4) que distorsionan la doble hélice.',
    x: 100,
    y: 90,
    molecularDetails: {
      lesionTypes: ['Dímeros de ciclobutano pirimidina (CPD)', 'Fotoproductos pirimidina-pirimidona (6-4PP)'],
      keyComponents: ['Fotones UVB/UVA', 'Pirimidinas adyacentes (T-T, T-C, C-C)'],
      molecularSteps: [
        'Absorción de radiación UV por bases nitrogenadas',
        'Formación de enlaces covalentes anómalos entre anillos pirimidínicos adyacentes',
        'Distorsión angular de ~30° en la doble hélice del ADN',
        'Bloqueo físico de la ARN polimerasa II y ADN polimerasas replicativas'
      ],
      cellCyclePhase: 'Independiente de la fase del ciclo celular (afecta ADN en cualquier momento)',
      functionalOutcome: 'Requiere reconocimiento rápido para evitar el colapso de horquillas o transcripción trunca.',
      consequencesOfFailure: 'Persistencia conduce a mutagénesis característica UV (transiciones C→T y CC→TT tándem).',
      fidelityNotes: 'La lesión química en sí no es una mutación; se convierte en mutación solo si es copiada erróneamente.',
      experimentalEvidence: 'Ensayo con endonucleasa T4 V o secuenciación con anticuerpos anti-CPD.'
    }
  },
  {
    id: 'dmg-ros',
    level: 'damage',
    category: 'damage',
    name: 'Especies Reactivas de Oxígeno',
    subtitle: 'Bases oxidadas y roturas simples',
    shortDescription: 'Genera 8-oxo-7,8-dihidroguanina (8-oxoG) y roturas de cadena simple (SSB) por estrés metabólico.',
    x: 100,
    y: 230,
    molecularDetails: {
      lesionTypes: ['8-oxo-7,8-dihidro-2\'-desoxiguanina (8-oxoG)', 'Roturas de cadena simple (SSB)', 'Sitios abásicos (AP)'],
      keyComponents: ['Radical hidroxilo (•OH)', 'Superóxido (O₂•⁻)', 'Peróxido de hidrógeno (H₂O₂)'],
      molecularSteps: [
        'Ataque electrofílico en la posición C8 de la guanina',
        'Modificación tautomérica que permite apareamiento anómalo con adenina (con formación syn)',
        'Generación de roturas de cadena simple por oxidación de la desoxirribosa'
      ],
      cellCyclePhase: 'Constitutivo en todas las fases por metabolismo mitocondrial endógeno.',
      functionalOutcome: 'Rápido reconocimiento por ADN glicosilasas antes de la entrada a replicación.',
      consequencesOfFailure: 'Si se replica sin reparar, 8-oxoG aparea con A, provocando transversiones G:C → T:A.',
      fidelityNotes: 'Es una de las lesiones endógenas más frecuentes (~10,000 por célula humana por día).',
      experimentalEvidence: 'Cromatografía líquida acoplada a espectrometría de masas (LC-MS) o ensayo ELISA para 8-OHdG.'
    }
  },
  {
    id: 'dmg-ir',
    level: 'damage',
    category: 'damage',
    name: 'Radiación Ionizante',
    subtitle: 'Roturas de doble cadena (DSBs)',
    shortDescription: 'Provoca roturas simultáneas en ambas cadenas enfrentadas del ADN y daño en racimo (clustered damage).',
    x: 100,
    y: 370,
    molecularDetails: {
      lesionTypes: ['Roturas de doble cadena (DSBs)', 'Lesiones complejas o agrupadas (clustered DNA damage)'],
      keyComponents: ['Rayos X, rayos gamma, partículas alfa', 'Ionización directa del esqueleto fosfodiéster'],
      molecularSteps: [
        'Ruptura de enlaces fosfodiéster en ambas cadenas en un radio menor a 10-20 pares de bases',
        'Pérdida de continuidad física del cromosoma y fragmentación cromosómica',
        'Rápida fosforilación de histona H2AX (γ-H2AX) en megabases alrededor de la rotura'
      ],
      cellCyclePhase: 'Ocurre en cualquier fase; su resolución depende críticamente de si hay cromátida hermana.',
      functionalOutcome: 'Activa la respuesta celular al daño más urgente y estricta (vía ATM).',
      consequencesOfFailure: 'Translocaciones cromosómicas, fusiones teloméricas, aneuploidía masiva o letalidad inmediata.',
      fidelityNotes: 'Una sola DSB no reparada es suficiente para desencadenar apoptosis o senescencia celular.',
      experimentalEvidence: 'Inmunofluorescencia de focos de γ-H2AX y 53BP1, electroforesis en gel de células individuales (ensayo Cometa neutro).'
    }
  },
  {
    id: 'dmg-benzo',
    level: 'damage',
    category: 'damage',
    name: 'Benzo[a]pireno y Químicos',
    subtitle: 'Aductos voluminosos de ADN',
    shortDescription: 'Compuestos aromáticos policíclicos activados por citocromo P450 que forman aductos covalentes masivos.',
    x: 100,
    y: 510,
    molecularDetails: {
      lesionTypes: ['Aducto BPDE-N²-guanina (+)-anti-B[a]PDE', 'Aductos voluminosos de hidrocarburos'],
      keyComponents: ['Metabolito reactivo BPDE (benzo[a]pireno diol epóxido)', 'Guanina en ADN'],
      molecularSteps: [
        'Activación metabólica de procarcinógenos por enzimas CYP1A1/CYP1B1',
        'Ataque nucleofílico del grupo amino exocíclico de la guanina al anillo epóxido',
        'Unión covalente de una molécula voluminosa que se aloja en el surco menor/mayor',
        'Distorsión severa de la arquitectura del ADN que impide el paso de polimerasas'
      ],
      cellCyclePhase: 'Ocurre constitutivamente tras exposición xenobiótica.',
      functionalOutcome: 'Requiere la vía de escisión de nucleótidos (NER) para extirpar el fragmento que contiene el aducto.',
      consequencesOfFailure: 'Mutaciones puntuales en protooncogenes (como KRAS) o genes supresores (TP53).',
      fidelityNotes: 'Demuestra la interacción directa entre exposición ambiental, metabolismo celular y alteración del ADN.',
      experimentalEvidence: 'Post-marcaje con fósforo-32 (³²P-postlabeling) y espectrometría de masas.'
    }
  },
  {
    id: 'dmg-alkyl',
    level: 'damage',
    category: 'damage',
    name: 'Agentes Alquilantes',
    subtitle: 'O⁶-metilguanina y alquilación',
    shortDescription: 'Fármacos como temozolomida o nitrosoureas que transfieren grupos alquilo a bases nitrogenadas.',
    x: 100,
    y: 650,
    molecularDetails: {
      lesionTypes: ['O⁶-metilguanina (O⁶-meG)', 'N⁷-metilguanina (N⁷-meG)', 'N³-metiladenina'],
      keyComponents: ['Temozolomida, MNNG, dacarbazina', 'Grupos metilo transferidos covalentemente'],
      molecularSteps: [
        'Alquilación química directa de átomos electronegativos en bases púricas',
        'O⁶-meG cambia la especificidad de apareamiento: la ADN polimerasa incorpora timina en lugar de citosina',
        'Generación de pares anómalos O⁶-meG:T durante la fase S'
      ],
      cellCyclePhase: 'La lesión química ocurre en cualquier fase; su toxicidad se manifiesta activamente en fase S.',
      functionalOutcome: 'Reparación preferente y no mutagénica por la proteína de suicidio MGMT.',
      consequencesOfFailure: 'Si MGMT no está disponible, el sistema MMR reconoce el par O⁶-meG:T, produciendo ciclos fútiles de corte y roturas secundarias.',
      fidelityNotes: 'Paradigma farmacológico: la ausencia de MGMT sensibiliza tumores cerebrales a la temozolomida.',
      experimentalEvidence: 'Ensayo de transferencia de metilo con sustrato radiomarcado o pirosecuenciación de promotor MGMT.'
    }
  },
  {
    id: 'dmg-repl',
    level: 'damage',
    category: 'damage',
    name: 'Errores de Replicación',
    subtitle: 'Desapareamientos y deslizamientos',
    shortDescription: 'Nucleótidos incorrectamente incorporados que escapan a la actividad correctora 3\'→5\' exonucleasa.',
    x: 100,
    y: 790,
    molecularDetails: {
      lesionTypes: ['Mal apareamiento base-base (ej. G:T, A:C)', 'Bucles de inserción/deleción (IDLs) en microsatélites'],
      keyComponents: ['ADN polimerasas replicativas (Pol δ, Pol ε)', 'Deslizamiento replicativo (strand slippage)'],
      molecularSteps: [
        'Escape de bases mal incorporadas a la actividad correctora (proofreading)',
        'Formación de pares no Watson-Crick en la cadena recién sintetizada',
        'Desalineamiento en secuencias repetidas en tándem (microsatélites)'
      ],
      cellCyclePhase: 'Exclusivo de la fase S (durante la replicación del ADN genómico).',
      functionalOutcome: 'Reconocimiento inmediato por el sistema MMR antes de la siguiente ronda de replicación.',
      consequencesOfFailure: 'Fijación permanente del error como mutación en la siguiente generación (inestabilidad de microsatélites - MSI).',
      fidelityNotes: 'Diferencia biológica crucial: una base mal apareada es químicamente normal pero está en la posición errónea.',
      experimentalEvidence: 'Electroforesis capilar para inestabilidad de microsatélites (paneles Bethesda / Promega).'
    }
  },

  // ================= NIVEL 2: RECONOCIMIENTO Y REPARACIÓN =================
  {
    id: 'rep-direct',
    level: 'repair',
    category: 'repair',
    name: 'Reparación Directa (MGMT)',
    subtitle: 'Reversión directa sin corte',
    shortDescription: 'Transferencia estequiométrica del grupo metilo a un residuo de cisteína de la proteína MGMT ("suicidio enzimático").',
    x: 360,
    y: 650,
    molecularDetails: {
      lesionTypes: ['O⁶-metilguanina', 'O⁶-alquilguanina'],
      keyComponents: ['MGMT (O⁶-alquilguanina-ADN alquiltransferasa)', 'Cisteína activa Cys145'],
      molecularSteps: [
        'MGMT escanea el ADN e inserta un residuo de arginina para evertir la base lesionada fuera de la hélice',
        'Transferencia irreversible del grupo metilo desde el O⁶ de la guanina al grupo tiol de Cys145 de MGMT',
        'Restauración de la guanina normal sin escindir bases ni romper el esqueleto fosfodiéster',
        'Inactivación permanente de la molécula de MGMT, seguida de ubiquitinación y degradación proteasomal'
      ],
      cellCyclePhase: 'Funciona en cualquier fase del ciclo celular (G1, S, G2, M).',
      functionalOutcome: 'Restauración del ADN con 100% de fidelidad y sin generar intermediarios de rotura.',
      consequencesOfFailure: 'Persistencia de O⁶-meG; apareamiento con timina; reconocimiento abortivo por MMR y citotoxicidad/mutagénesis.',
      fidelityNotes: 'Mecanismo no catalítico: una molécula de enzima repara exactamente una sola lesión ("reparación suicida").',
      experimentalEvidence: 'Western blot y cuantificación de actividad enzimática celular; metilación del promotor de MGMT por MSP.'
    }
  },
  {
    id: 'rep-ber',
    level: 'repair',
    category: 'repair',
    name: 'BER: Escisión de Bases',
    subtitle: 'Bases no voluminosas y oxidadas',
    shortDescription: 'Eliminación secuencial de bases alteradas: ADN glicosilasa, corte AP, síntesis de parche corto o largo y ligación.',
    x: 360,
    y: 230,
    molecularDetails: {
      lesionTypes: ['8-oxoG', 'Uracilo en ADN (desaminación de citosina)', 'Hipoxantina', 'Bases alquiladas menores'],
      keyComponents: ['ADN glicosilasas específicas (OGG1, UNG, MUTYH)', 'AP endonucleasa 1 (APE1)', 'ADN Polimerasa β', 'XRCC1 / ADN Ligasa III / Ligasa I'],
      molecularSteps: [
        'Reconocimiento y eversión de la base dañada por una ADN glicosilasa específica',
        'Rotura del enlace N-glucosídico liberando la base y dejando un sitio abásico (sitio AP)',
        'APE1 incide el enlace fosfodiéster 5\' del sitio AP, generando extremos 3\'-OH y 5\'-dRP',
        'Pol β elimina el grupo 5\'-dRP e incorpora el nucleótido correcto (parche corto)',
        'El complejo XRCC1/Ligasa III sella la muesca'
      ],
      cellCyclePhase: 'Activa en todas las fases del ciclo celular.',
      functionalOutcome: 'Reparación de alta fidelidad para el daño químico más abundante.',
      consequencesOfFailure: 'Acumulación de sitios AP citotóxicos; colapso a roturas de doble cadena si la horquilla replicativa encuentra el sitio AP.',
      fidelityNotes: 'BER no procesa dímeros de pirimidina ni aductos voluminosos.',
      experimentalEvidence: 'Ensayos de escisión in vitro con sustratos oligonucleotídicos fluorescentes conteniendo 8-oxoG o uracilo.'
    }
  },
  {
    id: 'rep-ner',
    level: 'repair',
    category: 'repair',
    name: 'NER: Escisión de Nucleótidos',
    subtitle: 'Lesiones voluminosas y UV',
    shortDescription: 'Corte dual de un oligonucleótido de 24–32 nucleótidos alrededor de la distorsión helicoidal, resíntesis y ligación.',
    x: 360,
    y: 110,
    molecularDetails: {
      lesionTypes: ['Dímeros de pirimidina (CPD, 6-4PP)', 'Aductos de benzo[a]pireno', 'Aductos de cisplatino intracadena'],
      keyComponents: ['GG-NER: Complejo XPC-RAD23B / DDB1-DDB2', 'TC-NER: ARN Pol II detenida, CSA, CSB', 'Factor basal TFIIH (helicasas XPB y XPD)', 'Endonucleasas XPF-ERCC1 (5\') y XPG (3\')', 'ADN Polimerasas δ/ε/κ y RFC/PCNA/Ligasa I'],
      molecularSteps: [
        'Reconocimiento del daño: en todo el genoma por XPC/DDB (GG-NER) o por detención de ARN Pol II en cadena transcrita (TC-NER)',
        'Reclutamiento de TFIIH y desenrollamiento local de la doble hélice por XPB y XPD',
        'Verificación de la lesión por XPA y protección de la cadena no dañada por RPA',
        'Incisión dual endonucleolítica: XPG corta en 3\' y XPF-ERCC1 corta en 5\', liberando un fragmento de ~24-30 nucleótidos',
        'Síntesis de relleno por Pol δ/ε con PCNA y sellado final por ADN Ligasa I o XRCC1-Ligasa III'
      ],
      cellCyclePhase: 'Activa en G1, S y G2. TC-NER depende de transcripción activa.',
      functionalOutcome: 'Eliminación fiel de lesiones que distorsionan gravemente la estructura tridimensional del ADN.',
      consequencesOfFailure: 'Persistencia de lesiones que bloquean la replicación y transcripción; xeroderma pigmentoso, fotosensibilidad extrema y riesgo 1000x de cáncer cutáneo.',
      fidelityNotes: 'Diferencia esencial con BER: NER corta ambos extremos del esqueleto fosfodiéster liberando un oligonucleótido largo, no una base aislada.',
      experimentalEvidence: 'Ensayo de síntesis de ADN no programada (UDS) por incorporación de EdU, o recuperación de síntesis de ARN (RRS).'
    }
  },
  {
    id: 'rep-mmr',
    level: 'repair',
    category: 'repair',
    name: 'MMR: Errores de Apareamiento',
    subtitle: 'Mismatches y microsatélites',
    shortDescription: 'Detección de pares no canónicos tras la replicación, discriminación de la cadena nueva, degradación y resíntesis.',
    x: 360,
    y: 790,
    molecularDetails: {
      lesionTypes: ['Desapareamientos base-base (G-T, C-A, etc.)', 'Bucles pequeños de inserción/deleción (1-4 nucleótidos)'],
      keyComponents: ['Sensor: MutSα (heterodímero MSH2-MSH6) o MutSβ (MSH2-MSH3)', 'Coordinador: MutLα (MLH1-PMS2)', 'Exonucleasa 1 (EXO1)', 'PCNA, RFC, RPA, ADN Polimerasa δ y ADN Ligasa I'],
      molecularSteps: [
        'Reconocimiento del mismatch por MutSα o bucle por MutSβ con flexión del ADN',
        'Unión dependiente de ATP de MutLα para coordinar el complejo y activar su endonucleasa latente',
        'Discriminación de la cadena hija recién sintetizada (guiada por PCNA y muescas transitorias)',
        'Incisión por MutLα y degradación direccional de la cadena por EXO1 más allá del error',
        'Resíntesis de la brecha monocatenaria por Pol δ estabilizada por RPA y ligación final'
      ],
      cellCyclePhase: 'Principalmente fase S y transición inmediata a G2 (acoplada temporalmente a la replicación).',
      functionalOutcome: 'Aumenta la fidelidad de la replicación del ADN en un factor de 100 a 1000 veces.',
      consequencesOfFailure: 'Fenotipo mutador, inestabilidad de microsatélites (MSI-H), síndrome de Lynch y cáncer colorrectal hereditario.',
      fidelityNotes: 'MMR no repara aductos voluminosos ni roturas de doble cadena; solo repara nucleótidos químicamente intactos pero mal emparejados.',
      experimentalEvidence: 'Análisis de microsatélites por PCR/electroforesis capilar (loci BAT-25, BAT-26, etc.) e inmunohistoquímica de MLH1/MSH2.'
    }
  },
  {
    id: 'rep-hr',
    level: 'repair',
    category: 'repair',
    name: 'HR: Recombinación Homóloga',
    subtitle: 'Reparación fiel de DSB en S/G2',
    shortDescription: 'Uso de la cromátida hermana idéntica como molde para la reparación libre de errores de roturas de doble cadena.',
    x: 360,
    y: 330,
    molecularDetails: {
      lesionTypes: ['Roturas de doble cadena (DSBs)', 'Colapso de horquillas de replicación monocatenarias'],
      keyComponents: ['Complejo MRN (Mre11-Rad50-Nbs1)', 'CtIP, EXO1 / BLM (resección 5\'→3\')', 'BRCA1, BRCA2, PALB2', 'Recombinasa RAD51', 'ADN Polimerasa δ / η y resolvasas'],
      molecularSteps: [
        'Detección de la DSB por el complejo MRN',
        'Resección 5\'→3\' extensa por CtIP y nucleasas para generar colas 3\' de ADN monocatenario (ssDNA)',
        'Carga de RPA sobre el ssDNA, posteriormente reemplazada por filamentos de nucleoproteína RAD51 con asistencia de BRCA1/BRCA2',
        'Invasión de la cromátida hermana homóloga para formar un bucle D (D-loop)',
        'Extensión por ADN polimerasa usando la cadena intacta como molde perfecto',
        'Captura del segundo extremo y resolución de uniones Holliday sin pérdidas ni ganancias'
      ],
      cellCyclePhase: 'Restringida estrictamente a fases S y G2 (requiere la presencia física de la cromátida hermana). Ausente en G1.',
      functionalOutcome: 'Reparación de roturas de doble cadena sin alterar la secuencia nucleotídica (alta fidelidad).',
      consequencesOfFailure: 'Inestabilidad cromosómica masiva, sensibilidad a inhibidores de PARP (letalidad sintética), mutaciones en BRCA1/2 asociadas a cáncer de mama/ovario.',
      fidelityNotes: 'Mecanismo fiel por excelencia para DSBs, pero biológicamente inviable en fase G1 por falta de molde homólogo.',
      experimentalEvidence: 'Recuento de focos nucleares de RAD51 por inmunofluorescencia y ensayos de recombinación homóloga génica (DR-GFP).'
    }
  },
  {
    id: 'rep-nhej',
    level: 'repair',
    category: 'repair',
    name: 'NHEJ: Unión No Homóloga',
    subtitle: 'Unión directa de DSB en todo el ciclo',
    shortDescription: 'Ligación directa de extremos rotos sin necesidad de molde homólogo extenso; rápida pero propensa a microdeleciones.',
    x: 360,
    y: 470,
    molecularDetails: {
      lesionTypes: ['Roturas de doble cadena (DSBs)', 'Extremos generados por radiación o estrés mecánico'],
      keyComponents: ['Heterodímero Ku70-Ku80', 'Subunidad catalítica de ADN-PK (DNA-PKcs)', 'Nucleasa Artemis', 'Polimerasas μ y λ', 'Complejo ADN Ligasa IV / XRCC4 / XLF / PAXX'],
      molecularSteps: [
        'Anillos de Ku70/Ku80 se deslizan sobre los extremos libres del ADN bicatenario roto',
        'Reclutamiento y activación de la serina/treonina cinasa DNA-PKcs formando la holoenzima DNA-PK',
        'Alineación y aproximación física de los dos extremos cromosómicos (sinapsis)',
        'Procesamiento de extremos no compatibles por la nucleasa Artemis (recorta salientes no apareables)',
        'Relleno de pequeñas brechas por polimerasas translesión Pol μ/λ',
        'Sellado definitivo por el complejo especializado ADN Ligasa IV-XRCC4-XLF'
      ],
      cellCyclePhase: 'Opera en cualquier fase del ciclo celular; es la vía predominante y obligatoria en fase G1.',
      functionalOutcome: 'Rápida restauración de la continuidad física del cromosoma, previniendo fragmentación catastrófica.',
      consequencesOfFailure: 'Roturas cromosómicas abiertas, translocaciones recíprocas, formación de cromosomas dicéntricos y crisis telomérica.',
      fidelityNotes: 'Propenso a errores: con frecuencia inserta o pierde entre 1 y varios nucleótidos durante el procesamiento de extremos.',
      experimentalEvidence: 'Focos de 53BP1 y fosfo-DNA-PKcs (S2056) por inmunofluorescencia y ensayos con plásmidos recircularizantes.'
    }
  },

  // ================= NIVEL 3: DETECCIÓN, SEÑALIZACIÓN Y REGULACIÓN =================
  {
    id: 'sig-sensors',
    level: 'signaling',
    category: 'sensor',
    name: 'ATM y ATR Quinasas',
    subtitle: 'Transductores maestros de daño',
    shortDescription: 'ATM responde primariamente a DSBs (con MRN); ATR responde a ADN monocatenario persistente (con RPA).',
    x: 620,
    y: 280,
    molecularDetails: {
      lesionTypes: ['DSBs (ATM)', 'ssDNA persistente / horquillas replicativas estancadas (ATR)'],
      keyComponents: ['ATM (Ataxia Telangiectasia Mutated)', 'ATR (ATM and Rad3-related)', 'MRN complex', 'ATRIP', 'RPA'],
      molecularSteps: [
        'Reclutamiento a sitios de lesión cromosómica',
        'Cambio conformacional y autofosforilación (ATM en Ser1981)',
        'Fosforilación en cascada de cientos de sustratos nucleares (H2AX, Chk1, Chk2, p53, MDM2)'
      ],
      cellCyclePhase: 'ATM opera en todas las fases; ATR es especialmente crítica en fase S para vigilar horquillas.',
      functionalOutcome: 'Amplificación exponencial de la señal de alerta genotóxica en todo el núcleo.',
      consequencesOfFailure: 'Incapacidad de detener el ciclo ante daño severo; entrada catastrófica a mitosis con cromosomas rotos.',
      fidelityNotes: 'ATM y ATR no reparan el ADN directamente; son transductores de señal que activan efectores.',
      experimentalEvidence: 'Western blot de fosfo-ATM (S1981) y fosfo-Chk1 (S345) / fosfo-Chk2 (T68).'
    }
  },
  {
    id: 'sig-p53',
    level: 'signaling',
    category: 'transducer',
    name: 'Eje p53 y MDM2',
    subtitle: 'Integrador central de destino',
    shortDescription: 'Estabilización de p53 por fosforilación que inhibe su degradación por MDM2; activa programas de detención o apoptosis.',
    x: 620,
    y: 470,
    molecularDetails: {
      lesionTypes: ['Estrés genotóxico de cualquier origen', 'Daño no resuelto'],
      keyComponents: ['Factor de transcripción p53 (TP53)', 'E3 ubiquitina ligasa MDM2', 'Quinasas Chk1/Chk2/ATM'],
      molecularSteps: [
        'En condiciones basales, MDM2 ubiquitina p53 dirigiéndolo a degradación rápida (vida media ~20 min)',
        'Tras daño, ATM/Chk2 fosforilan p53 en Ser15 y Ser20, bloqueando la interacción con MDM2',
        'p53 se acumula como tetrámero activo en el núcleo y se une a promotores diana',
        'Inducción diferencial: daño moderado favorece transcripción de p21 (detención); daño severo/persistente favorece PUMA, NOXA, BAX (apoptosis)'
      ],
      cellCyclePhase: 'Activo en todas las fases del ciclo celular.',
      functionalOutcome: 'Coordina la decisión entre dar tiempo para reparar o eliminar la célula en riesgo.',
      consequencesOfFailure: 'La célula prolifera ignorando el daño genómico; es la alteración genética más común en cáncer humano (>50%).',
      fidelityNotes: 'p53 no es el único regulador del ciclo o de la muerte celular, pero es el nodo integrador nodal más relevante.',
      experimentalEvidence: 'Ensayos de transactivación con luciferasa acoplada a promotores de p21/PUMA; análisis mutacional de TP53.'
    }
  },
  {
    id: 'sig-checkpoints',
    level: 'signaling',
    category: 'checkpoint',
    name: 'Puntos de Control G1/S y G2/M',
    subtitle: 'Inhibición de CDKs y detención',
    shortDescription: 'p21 inhibe CDK2/Ciclina E (G1/S); Chk1/Chk2 inactivan fosfatasas Cdc25 impidiendo activación de CDK1/Ciclina B (G2/M).',
    x: 620,
    y: 670,
    molecularDetails: {
      lesionTypes: ['Daño que compromete la fidelidad de la replicación o la segregación'],
      keyComponents: ['p21CIP1/WAF1 (CDKN1A)', 'Cdc25A / Cdc25C', 'Ciclina E-CDK2', 'Ciclina B-CDK1'],
      molecularSteps: [
        'Punto G1/S: p21 se une a complejos CDK4/6-Ciclina D y CDK2-Ciclina E, manteniendo a la proteína Rb hipofosforilada y secuestrando a E2F',
        'Punto G2/M: Chk1 fosforila Cdc25C, que es secuestrada por proteínas 14-3-3 en el citoplasma, impidiendo la desfosforilación activadora de CDK1',
        'El ciclo celular se detiene de forma reversible mientras los complejos de reparación operan'
      ],
      cellCyclePhase: 'Transiciones críticas G1→S y G2→M.',
      functionalOutcome: 'Detiene temporalmente el ciclo celular para impedir la replicación de ADN dañado o la mitosis con cromosomas rotos.',
      consequencesOfFailure: 'Entrada forzada a replicación con horquillas colapsadas o catástrofe mitótica con aneuploidía masiva.',
      fidelityNotes: 'Principio pedagógico clave: la detención del ciclo provee tiempo, pero NO repara el ADN por sí misma.',
      experimentalEvidence: 'Citometría de flujo con yoduro de propidio para perfil de contenido de ADN (fases del ciclo celular).'
    }
  },

  // ================= NIVEL 4: RESPUESTAS Y DECISIONES CELULARES =================
  {
    id: 'out-recovery',
    level: 'outcome',
    category: 'outcome',
    name: 'Recuperación y Continuación',
    subtitle: 'Reparación completa del daño',
    shortDescription: 'Extinción de la señal de daño, degradación de p21, reactivación de CDKs y reanudación ordenada del ciclo celular.',
    x: 900,
    y: 110,
    molecularDetails: {
      lesionTypes: ['Lesiones resueltas eficientemente'],
      keyComponents: ['Fosfatasas WIP1 (PPM1D)', 'Desfosforilación de p53 y γ-H2AX', 'Reactivación de complejos Ciclina-CDK'],
      molecularSteps: [
        'Culminación de la síntesis y ligación por la vía de reparación correspondiente',
        'Disipación de los complejos de reparación de la cromatina',
        'WIP1 y otras fosfatasas apagan la actividad de ATM, Chk1 y p53',
        'Reinicio de la maquinaria del ciclo celular con el genoma intacto'
      ],
      cellCyclePhase: 'Ocurre en la fase donde se completó la reparación.',
      functionalOutcome: 'Supervivencia celular con preservación de la estabilidad genómica.',
      consequencesOfFailure: 'Si la recuperación ocurre prematuramente antes de terminar la reparación, se fijan mutaciones o aberraciones.',
      fidelityNotes: 'La recuperación es exitosa únicamente cuando la estructura del ADN ha sido realmente restaurada.',
      experimentalEvidence: 'Pérdida temporal de focos de γ-H2AX y reincorporación de timidina o EdU en replicación.'
    }
  },
  {
    id: 'out-senescence',
    level: 'outcome',
    category: 'outcome',
    name: 'Senescencia Celular',
    subtitle: 'Detención irreversible y SASP',
    shortDescription: 'Salida permanente del ciclo celular con persistencia metabólica y secreción del fenotipo secretor (SASP).',
    x: 900,
    y: 310,
    molecularDetails: {
      lesionTypes: ['Daño persistente no reparable', 'Focos de daño en telómeros'],
      keyComponents: ['p21CIP1', 'p16INK4A', 'Heterocromatina asociada a senescencia (SAHF)', 'Factores SASP (IL-6, IL-8, MMPs)'],
      molecularSteps: [
        'Imposibilidad de reparar lesiones críticas tras detención prolongada',
        'Fijación epigenética de la represión transcripcional de promotores de proliferación',
        'Expresión sostenida de p16INK4A y condensación de cromatina en SAHF',
        'Producción y secreción paracrina de citoquinas inflamatorias y metaloproteinasas (SASP)'
      ],
      cellCyclePhase: 'Arresto terminal fuera del ciclo activo (estado G0 permanente e irreversible).',
      functionalOutcome: 'Bloqueo absoluto de la proliferación de una célula potencialmente peligrosa sin requerir su lisis.',
      consequencesOfFailure: 'Si el arresto senescente falla y los controles están mutados, la célula continúa dividiéndose con daño grave.',
      fidelityNotes: 'Aunque previene el cáncer de forma autónoma en la célula, el SASP crónico puede alterar el microambiente e inducir inflamación promotora.',
      experimentalEvidence: 'Tinción citoquímica para beta-galactosidasa asociada a senescencia (SA-β-gal a pH 6.0).'
    }
  },
  {
    id: 'out-apop-intrinsic',
    level: 'outcome',
    category: 'outcome',
    name: 'Apoptosis Intrínseca',
    subtitle: 'Vía mitocondrial de muerte',
    shortDescription: 'Poros de BAX/BAK en la mitocondria, liberación de citocromo c, activación de caspasa-9 y caspasas ejecutoras 3/7.',
    x: 900,
    y: 500,
    molecularDetails: {
      lesionTypes: ['Daño genotóxico masivo o irreparable', 'Roturas cromosómicas no reparables'],
      keyComponents: ['p53', 'Proteínas BH3-only (PUMA, NOXA, BIM)', 'Efectores pro-apoptóticos BAX y BAK', 'Antiapoptóticos BCL-2, BCL-XL, MCL-1', 'Citocromo c, APAF-1, Procaspasa-9', 'Caspasas ejecutoras 3 y 7'],
      molecularSteps: [
        'Activación transcripcional por p53 de PUMA y NOXA',
        'Neutralización de BCL-2 y BCL-XL, permitiendo la oligomerización de BAX y BAK',
        'Permeabilización de la membrana mitocondrial externa (MOMP)',
        'Salida de Citocromo c al citosol y unión con APAF-1 y dATP para formar el apoptosoma',
        'Reclutamiento y escisión activadora de la procaspasa-9 iniciadora',
        'Caspasa-9 activa corta proteolíticamente a las procaspasas ejecutoras 3 y 7',
        'Fragmentación internucleosomal del ADN por nucleasa CAD y degradación celular ordenada'
      ],
      cellCyclePhase: 'Puede ejecutarse en cualquier fase del ciclo celular ante estrés genotóxico insalvable.',
      functionalOutcome: 'Eliminación completa, limpia y no inflamatoria de una célula con genoma irreparablemente dañado.',
      consequencesOfFailure: 'Supervivencia de células con mutaciones graves, permitiendo la propagación de genomas inestables.',
      fidelityNotes: 'La vía intrínseca está directamente conectada con los sensores nucleares de daño a través de p53 y las proteínas de la familia BCL-2.',
      experimentalEvidence: 'Ensayo de anexina V / yoduro de propidio por citometría de flujo, ensayo TUNEL y detección de caspasa-3 escindida.'
    }
  },
  {
    id: 'out-apop-extrinsic',
    level: 'outcome',
    category: 'outcome',
    name: 'Apoptosis Extrínseca',
    subtitle: 'Vía de receptores de muerte',
    shortDescription: 'Ligandos de muerte (FASL, TNF) activan receptores de membrana, complejo DISC, caspasa-8 y caspasas ejecutoras.',
    x: 900,
    y: 690,
    molecularDetails: {
      lesionTypes: ['Señales externas del microambiente / linfocitos citotóxicos'],
      keyComponents: ['Ligandos: FASL, TRAIL, TNF-α', 'Receptores: FAS (CD95), DR4/DR5, TNFR1', 'Adaptador con dominio de muerte: FADD', 'Caspasa iniciadora 8 (y 10)', 'Caspasas ejecutoras 3 y 7 (y enlace tBID con mitocondria)'],
      molecularSteps: [
        'Unión homotrimérica de ligandos extracelulares a sus receptores de membrana correspondientes',
        'Alineación de dominios de muerte intracelulares (DD) y reclutamiento del adaptador FADD',
        'Formación del complejo de señalización inductor de muerte (DISC)',
        'Dimerización y maduración autocatalítica de la procaspasa-8 iniciadora',
        'Caspasa-8 corta y activa directamente a las caspasas ejecutoras 3 y 7',
        '(Opcional) En células tipo II, caspasa-8 corta la proteína BID a tBID, amplificando la señal a través de la mitocondria'
      ],
      cellCyclePhase: 'Independiente de la fase del ciclo celular; controlada por señales paracrinas o inmunitarias.',
      functionalOutcome: 'Eliminación de células anómalas mediada por el sistema inmunitario o por señales tisulares.',
      consequencesOfFailure: 'Evasión de la vigilancia inmunitaria celular (p. ej. por pérdida de receptores de muerte o sobreexpresión de c-FLIP).',
      fidelityNotes: 'Ambas vías apoptóticas divergen en el origen de su señal y en su caspasa iniciadora (9 vs 8), pero convergen idénticamente en las caspasas ejecutoras 3 y 7.',
      experimentalEvidence: 'Inmunotransferencia para caspasa-8 activa escindida (p18/p10) y bloqueo específico con inhibidor Z-IETD-FMK.'
    }
  },
  {
    id: 'out-unresolved',
    level: 'outcome',
    category: 'outcome',
    name: 'Supervivencia con Alteraciones',
    subtitle: 'Fijación de mutaciones',
    shortDescription: 'La célula evade el arresto y la muerte a pesar de tener ADN dañado o mal reparado, fijando mutaciones al replicar.',
    x: 900,
    y: 870,
    molecularDetails: {
      lesionTypes: ['Lesiones químicas no reparadas', 'Extremos cromosómicos mal ligados por NHEJ aberrante', 'Errores de replicación no corregidos'],
      keyComponents: ['Polimerasas de síntesis translesión (TLS: Pol η, Pol ι, Rev1/Pol ζ)', 'Pérdida de función de p53/p21', 'Pérdida de puntos de control'],
      molecularSteps: [
        'La horquilla replicativa encuentra una lesión no reparada y utiliza polimerasas TLS de baja fidelidad para atravesarla',
        'Incorporación de nucleótidos no complementarios frente a la lesión',
        'En la segunda ronda de replicación, la base errónea sirve de molde para su complemento normal',
        'La lesión química original se convierte en una mutación permanente en ambas cadenas del ADN de una célula hija'
      ],
      cellCyclePhase: 'Ocurre críticamente al atravesar la fase S y dividirse en mitosis (M).',
      functionalOutcome: 'Generación de diversidad genética heredable en la descendencia celular.',
      consequencesOfFailure: 'Foco inicial de inestabilidad genómica que puede alimentar la evolución clonal de variantes celulares.',
      fidelityNotes: 'Regla biológica capital: una lesión química NO es todavía una mutación; se convierte en mutación solo cuando se fija tras replicación.',
      experimentalEvidence: 'Secuenciación de nueva generación (NGS) para variantes de nucleótido único (SNVs) y firmas mutacionales de COSMIC.'
    }
  },

  // ================= NIVEL 5: CONSECUENCIAS POBLACIONALES =================
  {
    id: 'pop-variation',
    level: 'population',
    category: 'hallmark_link',
    name: 'Variación Genética Heredable',
    subtitle: 'Nivel poblacional: diversidad',
    shortDescription: 'Aparición de células hermanas con secuencias genómicas distintas debido a errores o reparación defectuosa.',
    x: 1180,
    y: 280,
    molecularDetails: {
      lesionTypes: ['Mutaciones puntuales', 'Indels', 'Alteraciones en número de copias (CNVs)'],
      keyComponents: ['Clones celulares heterogéneos', 'Tasa de mutación basal vs acelerada'],
      molecularSteps: [
        'Múltiples rondas de replicación con sistemas de vigilancia defectuosos',
        'Generación de un mosaico de subclones con perfiles mutacionales dispares',
        'Variación fenotípica en receptores, proteínas metabólicas o respuestas a estrés'
      ],
      cellCyclePhase: 'Escala multigeneracional (implica múltiples ciclos celulares completos).',
      functionalOutcome: 'Crea el sustrato genético sobre el cual opera la selección natural en los tejidos.',
      consequencesOfFailure: 'No es una patología inmediata por sí sola; requiere presiones selectivas para enriquecer variantes patológicas.',
      fidelityNotes: 'Distinción conceptual: la proliferación de una célula individual no equivale a la evolución de una población celular.',
      experimentalEvidence: 'Secuenciación de célula única (single-cell DNA sequencing) y árboles filogenéticos clonales.'
    }
  },
  {
    id: 'pop-selection',
    level: 'population',
    category: 'hallmark_link',
    name: 'Presión Selectiva y Clonalidad',
    subtitle: 'Supervivencia diferencial',
    shortDescription: 'Ciertas variantes tienen mayor probabilidad de proliferar bajo condiciones de estrés, hipoxia o quimioterapia.',
    x: 1180,
    y: 600,
    molecularDetails: {
      lesionTypes: ['Ambientes tisulares restrictivos', 'Agentes citotóxicos exógenos'],
      keyComponents: ['Microambiente tisular', 'Ventajas adaptativas relativas'],
      molecularSteps: [
        'Exposición de la población diversa a un cuello de botella selectivo (ej. daño continuo o fármaco)',
        'Muerte o senescencia de subclones que conservan controles normales',
        'Expansión selectiva de subclones resistentes con inactivación de p53 o evasión apoptótica',
        'Dominancia clonal progresiva de variantes menos diferenciadas'
      ],
      cellCyclePhase: 'Dinámica poblacional en el tiempo.',
      functionalOutcome: 'Emergencia de capacidades que coinciden con las características del cáncer (Hanahan 2026).',
      consequencesOfFailure: 'La pérdida de control genómico alimenta la adaptabilidad clonal aberrante.',
      fidelityNotes: 'El cáncer no surge por un interruptor único; es un proceso evolutivo darwiniano somático que ocurre en tejidos.',
      experimentalEvidence: 'Seguimiento de frecuencia de alelos variantes (VAF) en biopsias seriadas durante tratamiento oncológico.'
    }
  }
];

export const CAUSAL_CONNECTIONS: Connection[] = [
  // Relaciones directas Nivel 1 -> Nivel 2
  { from: 'dmg-uv', to: 'rep-ner', type: 'direct', label: 'Procesamiento preferente por NER' },
  { from: 'dmg-ros', to: 'rep-ber', type: 'direct', label: 'Reconocimiento por glicosilasas (OGG1)' },
  { from: 'dmg-ir', to: 'rep-hr', type: 'direct', label: 'Reparación fiel en S/G2' },
  { from: 'dmg-ir', to: 'rep-nhej', type: 'direct', label: 'Unión directa predominante en G1' },
  { from: 'dmg-benzo', to: 'rep-ner', type: 'direct', label: 'Extirpación de aductos voluminosos' },
  { from: 'dmg-alkyl', to: 'rep-direct', type: 'direct', label: 'Reversión directa por MGMT' },
  { from: 'dmg-repl', to: 'rep-mmr', type: 'direct', label: 'Corrección de desapareamientos en S' },

  // Relaciones directas Daño/Reparación incompleta -> Nivel 3 Señalización
  { from: 'dmg-ir', to: 'sig-sensors', type: 'direct', label: 'Activación directa de ATM por DSBs' },
  { from: 'dmg-uv', to: 'sig-sensors', type: 'direct', label: 'Activación de ATR por ssDNA en horquillas' },
  { from: 'sig-sensors', to: 'sig-p53', type: 'direct', label: 'Fosforilación estabilizadora de p53' },
  { from: 'sig-sensors', to: 'sig-checkpoints', type: 'direct', label: 'Inactivación de fosfatasas Cdc25' },
  { from: 'sig-p53', to: 'sig-checkpoints', type: 'direct', label: 'Transactivación de p21 (CDKN1A)' },

  // Relaciones directas Nivel 3 Señalización -> Nivel 4 Respuestas
  { from: 'sig-checkpoints', to: 'out-recovery', type: 'direct', label: 'Tiempo para reparación exitosa' },
  { from: 'sig-checkpoints', to: 'out-senescence', type: 'direct', label: 'Arresto permanente (p21/p16 sostenido)' },
  { from: 'sig-p53', to: 'out-apop-intrinsic', type: 'direct', label: 'Inducción de PUMA / NOXA / BAX' },
  { from: 'out-apop-extrinsic', to: 'out-apop-intrinsic', type: 'direct', label: 'Cruce por escisión de BID a tBID' },

  // Nivel 2 Reparación -> Resultados
  { from: 'rep-ber', to: 'out-recovery', type: 'direct', label: 'Restitución de bases oxidadas' },
  { from: 'rep-ner', to: 'out-recovery', type: 'direct', label: 'Eliminación completa de fotoproductos' },
  { from: 'rep-direct', to: 'out-recovery', type: 'direct', label: 'Restauración fiel sin corte' },
  { from: 'rep-mmr', to: 'out-recovery', type: 'direct', label: 'Corrección fiel del mismatch' },
  { from: 'rep-hr', to: 'out-recovery', type: 'direct', label: 'Resolución fiel con cromátida hermana' },
  { from: 'rep-nhej', to: 'out-recovery', type: 'direct', label: 'Restauración rápida de continuidad' },

  // Consecuencias directas e indirectas de falla o escape
  { from: 'rep-nhej', to: 'out-unresolved', type: 'indirect', label: 'Microdeleciones en unión de extremos' },
  { from: 'dmg-alkyl', to: 'rep-mmr', type: 'indirect', label: 'Reconocimiento fútil de O6-meG si falta MGMT' },
  { from: 'dmg-repl', to: 'out-unresolved', type: 'indirect', label: 'Persistencia de mismatch si MMR falla' },
  { from: 'dmg-uv', to: 'out-unresolved', type: 'indirect', label: 'Paso por polimerasas TLS si NER falla' },
  { from: 'dmg-benzo', to: 'out-unresolved', type: 'indirect', label: 'Síntesis translesión errónea' },
  { from: 'sig-p53', to: 'out-unresolved', type: 'indirect', label: 'Falla de apoptosis permite supervivencia' },

  // Nivel 4 -> Nivel 5 Consecuencias poblacionales
  { from: 'out-unresolved', to: 'pop-variation', type: 'direct', label: 'Fijación de mutaciones heredables' },
  { from: 'pop-variation', to: 'pop-selection', type: 'direct', label: 'Sustrato para selección clonal' },
  { from: 'out-recovery', to: 'pop-variation', type: 'indirect', label: 'Preservación de homogeneidad genómica' },
  { from: 'out-senescence', to: 'pop-selection', type: 'indirect', label: 'SASP modifica el estroma tisular' }
];

// Los 9 Hallmarks of Cancer según la revisión fundamental de Douglas Hanahan (Cell, 2026)
export const HALLMARKS_OF_CANCER: HallmarkOfCancer[] = [
  {
    id: 'hallmark-evading-suppressors',
    number: 1,
    title: 'Inactivación de supresores del crecimiento',
    classification: 'direct',
    description: 'Pérdida de mecanismos moleculares que frenan la progresión del ciclo celular (como p53, p21 o retinoblastoma Rb) ante daño o señales de hiperproliferación.',
    questions: {
      normalMechanism: 'Los puntos de control G1/S y G2/M dependientes de p53 y p21 imponen una pausa temporal para que los sistemas de reparación corrijan lesiones antes de replicar o segregar cromosomas.',
      alterationFavors: 'Mutaciones inactivadoras en TP53 o deleciones en CDKN1A/CDKN2A permiten continuar el ciclo celular con daño genotóxico persistente sin detener la división.',
      populationAdvantage: 'Las células mutadas se dividen más rápidamente en un tejido estresado sin esperar a completar la reparación de su genoma, ganando ventaja numérica a corto plazo.',
      experimentalProof: 'Demostración de fosforilación continua de Rb, incorporación activa de BrdU/EdU a pesar de radiación ionizante, o secuenciación de TP53 mutado.'
    }
  },
  {
    id: 'hallmark-resisting-death',
    number: 2,
    title: 'Resistencia a la muerte celular programada',
    classification: 'direct',
    description: 'Incapacidad de ejecutar apoptosis intrínseca (mitocondrial) o extrínseca frente a daño genotóxico masivo o señales inmunitarias citotóxicas.',
    questions: {
      normalMechanism: 'La activación sostenida de p53 induce la transcripción de efectores pro-apoptóticos (PUMA, NOXA, BAX), provocando MOMP, salida de citocromo c y activación de caspasas 9 y 3/7.',
      alterationFavors: 'Sobreexpresión del oncogén BCL-2, pérdida de BAX/BAK, mutaciones en TP53 o sobreexpresión de c-FLIP bloquean la activación de las caspasas efectoras.',
      populationAdvantage: 'Células con cromosomas gravemente alterados o bajo tratamiento quimioterápico evitan su propia eliminación y continúan poblando el microambiente tumoral.',
      experimentalProof: 'Ausencia de tinción para anexina V, resistencia a drogas inductoras de apoptosis (ej. venetoclax o cisplatino) y niveles basales elevados de BCL-2/MCL-1.'
    }
  },
  {
    id: 'hallmark-sustained-signaling',
    number: 3,
    title: 'Señalización proliferativa sostenida',
    classification: 'direct',
    description: 'Independencia de factores de crecimiento exógenos mediante mutaciones constitutivamente activadoras en vías de señalización intracelular (MAPK, PI3K/AKT).',
    questions: {
      normalMechanism: 'Las células quiescentes solo entran al ciclo cuando reciben ligandos mitógenos extracelulares específicos y controlados por receptores con actividad tirosina cinasa.',
      alterationFavors: 'Mutaciones puntuales no reparadas causadas por daño oxidativo, UV o químicos en protooncogenes clave como KRAS (G12D/V), BRAF (V600E) o EGFR.',
      populationAdvantage: 'Autosuficiencia en señales de crecimiento: las células proliferan en ausencia de estímulos homeostáticos normales del tejido huésped.',
      experimentalProof: 'Fosforilación constitutiva de ERK1/2 o AKT en medio sin suero, y formación de colonias independientes de anclaje en agar blando.'
    }
  },
  {
    id: 'hallmark-replicative-immortality',
    number: 4,
    title: 'Inmortalidad replicativa',
    classification: 'indirect',
    description: 'Capacidad de división celular ilimitada, principalmente mediante reactivación de la telomerasa (TERT) o el mecanismo alternativo de alargamiento de telómeros (ALT).',
    questions: {
      normalMechanism: 'El acortamiento progresivo de los telómeros en cada ciclo replicativo dispara una respuesta al daño del ADN en los extremos cromosómicos que culmina en senescencia replicativa (límite de Hayflick).',
      alterationFavors: 'Mutaciones en el promotor del gen TERT (generadas por daño UV o replicativo) o recombinación homóloga aberrante entre telómeros (vía ALT).',
      populationAdvantage: 'Evasión de la crisis telomérica y prevención del arresto proliferativo senescente a largo plazo.',
      experimentalProof: 'Ensayo TRAP (Telomeric Repeat Amplification Protocol) para actividad telomerasa y medición de longitud de telómeros por FISH.'
    }
  },
  {
    id: 'hallmark-inducing-vasculature',
    number: 5,
    title: 'Inducción o acceso a la vascularización',
    classification: 'indirect',
    description: 'Estímulo de la neoformación de vasos sanguíneos (angiogénesis) o cooptación vascular para asegurar el aporte de oxígeno y nutrientes a la masa celular en expansión.',
    questions: {
      normalMechanism: 'La vasculatura quiescente en tejidos adultos está controlada por un equilibrio estricto entre factores proangiogénicos (VEGF) y antiangiogénicos (trombospondina-1).',
      alterationFavors: 'La hipoxia tisular estabiliza HIF-1α; mutaciones en oncogenes o pérdida de p53 desregulan la secreción de VEGF y reducen inhibidores de la angiogénesis.',
      populationAdvantage: 'Supervivencia y crecimiento continuo de masas tumorales más allá del radio límite de difusión pasiva de oxígeno (~100–200 µm).',
      experimentalProof: 'Cuantificación de densidad microvascular con anticuerpos anti-CD31 o CD34 en cortes tisulares, y dosificación de VEGF en sobrenadante.'
    }
  },
  {
    id: 'hallmark-phenotypic-plasticity',
    number: 6,
    title: 'Plasticidad fenotípica',
    classification: 'indirect',
    description: 'Desdiferenciación retrógrada hacia estados cuasi-embrionarios o transdiferenciación aberrante que flexibiliza la identidad celular frente a presiones terapéuticas.',
    questions: {
      normalMechanism: 'Los programas epigenéticos de desarrollo canalizan y fijan la identidad y diferenciación terminal del linaje celular.',
      alterationFavors: 'Mutaciones o estrés genotóxico crónico que desestabilizan modificadores de cromatina, facilitando transición epitelio-mesénquima (EMT).',
      populationAdvantage: 'Flexibilidad para escapar a tratamientos dirigidos (ej. un adenocarcinoma que transdiferencia a carcinoma de células pequeñas neuroendocrino bajo inhibidores).',
      experimentalProof: 'Pérdida de marcadores epiteliales (E-cadherina) con ganancia concomitante de marcadores mesenquimales (vimentina, N-cadherina) y factores ZEB1/Snail.'
    }
  },
  {
    id: 'hallmark-invasion-metastasis',
    number: 7,
    title: 'Invasión tisular y metástasis',
    classification: 'indirect',
    description: 'Capacidad de las células neoplásicas para despegarse del tumor primario, invadir la matriz extracelular, diseminarse por vía hematógena/linfática y colonizar órganos distantes.',
    questions: {
      normalMechanism: 'La adhesión célula-célula (complejo E-cadherina/catenina) y las barreras de la membrana basal confinan estrictamente a las células epiteliales en su compartimento.',
      alterationFavors: 'Pérdida de cadherinas, secreción de metaloproteinasas (MMP-2, MMP-9) y motilidad ameboide facilitada por acumulación de mutaciones somáticas.',
      populationAdvantage: 'Colonización de nuevos nichos tisulares con mayor disponibilidad de recursos y menor competencia física local.',
      experimentalProof: 'Ensayos de migración en cámara de Boyden / transwell con Matrigel y modelos de metástasis in vivo en ratones.'
    }
  },
  {
    id: 'hallmark-immune-evasion',
    number: 8,
    title: 'Evasión de la destrucción inmunitaria',
    classification: 'indirect',
    description: 'Evasión activa del reconocimiento y lisis por parte de linfocitos T citotóxicos CD8+, células Natural Killer y macrófagos del sistema inmunitario.',
    questions: {
      normalMechanism: 'El sistema inmune detecta péptidos anómalos (neoantígenos derivados de mutaciones) presentados en moléculas MHC de clase I y destruye la célula alterada.',
      alterationFavors: 'Expresión elevada de puntos de control inmunitario como PD-L1, pérdida de beta-2 microglobulina (B2M) o secreción de factores inmunosupresores (TGF-β, IL-10).',
      populationAdvantage: 'Las células mutadas escapan a la vigilancia inmunológica a pesar de expresar múltiples neoantígenos resultantes de daño al ADN.',
      experimentalProof: 'Citometría para expresión de PD-L1 en membrana, cocultivos de linfocitos T específicos con células diana, y secuenciación de pérdida de heterocigocidad en HLA.'
    }
  },
  {
    id: 'hallmark-metabolic-deregulation',
    number: 9,
    title: 'Desregulación del metabolismo celular',
    classification: 'indirect',
    description: 'Reprogramación de las vías energéticas para favorecer la glucólisis aeróbica (efecto Warburg) y el desvío de intermediarios hacia la síntesis de biomasa (lípidos, nucleótidos).',
    questions: {
      normalMechanism: 'Las células diferenciadas en presencia de oxígeno acoplan la glucólisis citoplasmática a la fosforilación oxidativa mitocondrial para máxima eficiencia de ATP.',
      alterationFavors: 'Activación de oncogenes (MYC, AKT) y pérdida de p53 (que normalmente promueve SCO2 y fosforilación oxidativa mitocondrial).',
      populationAdvantage: 'Generación acelerada de precursores biosintéticos para duplicar lípidos, proteínas y ácidos nucleicos necesarios para soportar tasas de proliferación veloces.',
      experimentalProof: 'Medición de tasa de acidificación extracelular (ECAR) y consumo de oxígeno (OCR) en analizador Seahorse, o captación de ¹⁸F-FDG en PET.'
    }
  }
];

// Las 5 Características Facilitadoras de Douglas Hanahan (Cell, 2026)
export const ENABLING_CHARACTERISTICS: EnablingCharacteristic[] = [
  {
    id: 'enabler-genome-instability',
    title: 'Pérdida de la integridad genómica e inestabilidad mutacional',
    description: 'Es el puente conceptual central: la falla en los sistemas de detección, reparación o puntos de control no es en sí misma un hallmark de funcionalidad tumoral, sino la condición facilitadora que acelera la tasa de adquisición de mutaciones en genes clave.',
    relevanceToDnaDamage: 'Conexión primaria directa con la falla de BER, NER, MMR, HR y NHEJ. Sin esta característica facilitadora, la probabilidad estadística de que una sola célula acumule las mutaciones independientes necesarias para la transformación oncogénica es virtualmente nula.'
  },
  {
    id: 'enabler-epigenetic-reprogramming',
    title: 'Reprogramación epigenética no mutacional',
    description: 'Alteraciones profundas y heredables en los patrones de metilación del ADN (islas CpG), marcas de histonas y remodelado de cromatina que alteran la expresión génica sin cambiar la secuencia de nucleótidos.',
    relevanceToDnaDamage: 'El daño persistente recluta complejos de metilación y desacetilasas que pueden silenciar de forma aberrante promotores de genes de reparación (ej. hipermetilación del promotor de MLH1 en cáncer de colon o de MGMT en glioblastoma).'
  },
  {
    id: 'enabler-tumor-inflammation',
    title: 'Inflamación promotora de tumores',
    description: 'Infiltración leucocitaria crónica que, en lugar de erradicar el tejido anómalo, libera factores mitógenos, angiogénicos, enzimas remodeladoras de matriz y especies reactivas que perpetúan el daño genotóxico.',
    relevanceToDnaDamage: 'Los macrófagos y neutrófilos activados liberan de forma continua ROS y RNS (óxido nítrico), bombardeando a las células epiteliales vecinas con estrés oxidativo mutagénico.'
  },
  {
    id: 'enabler-polymorphic-microbiomes',
    title: 'Microbiomas polimórficos',
    description: 'Poblaciones microbianas locales (en colon, piel, mucosas) que interactúan con el epitelio y modulan la inflamación, la producción de toxinas genotóxicas y la respuesta a quimioterapia.',
    relevanceToDnaDamage: 'Ciertas cepas bacterianas (como E. coli pks+ productoras de colibactina) generan alquilación y roturas de doble cadena directas en el ADN del enterocito.'
  },
  {
    id: 'enabler-innervation',
    title: 'Inervación y señalización neuronal',
    description: 'Crecimiento de fibras nerviosas autonómicas dentro del estroma tumoral que liberan neurotransmisores (adrenalina, acetilcolina) promoviendo supervivencia celular y angiogénesis.',
    relevanceToDnaDamage: 'Modula la resistencia al estrés ambiental y la señalización adrenérgica que puede inhibir respuestas apoptóticas intrínsecas.'
  }
];
