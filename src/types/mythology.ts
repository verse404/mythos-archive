export type TraditionId =
  | 'greek'
  | 'norse'
  | 'egyptian'
  | 'hindu'
  | 'chinese'
  | 'japanese'
  | 'mesopotamian'
  | 'celtic'
  | 'mesoamerican'
  | 'yoruba';

export type ArchetypeId =
  | 'sky-sovereign'
  | 'trickster-guide'
  | 'underworld-ruler'
  | 'wisdom-order'
  | 'solar-renewal'
  | 'war-storm';

export interface ArchetypeMeta {
  id: ArchetypeId;
  label: string;
  shortLabel: string;
  subtitle: string;
  scholarlyNote: string;
}

export interface SacredText {
  title: string;
  period: string;
  description: string;
}

export interface CosmicRealm {
  name: string;
  tier: 'upper' | 'middle' | 'lower';
  description: string;
}

export interface Tradition {
  id: TraditionId;
  name: string;
  subtitle: string;
  folioCode: string;
  region: string;
  culturalSphere: string;
  eraLabel: string;
  startYear: number; // negative for BCE, positive for CE
  endYear: number; // 2026 for living continuous traditions
  isLivingTradition: boolean;
  summary: string;
  worldviewThesis: string;
  cosmicAxis: string;
  keyValues: string[];
  sacredSymbols: string[];
  realms: CosmicRealm[];
  primaryTexts: SacredText[];
  relatedTraditions: {
    traditionId: TraditionId;
    connectionType: string;
    explanation: string;
  }[];
  mapCoords: {
    x: number; // 0..1000 SVG equirectangular-inspired atlas space
    y: number; // 0..520
  };
}

export interface Deity {
  id: string;
  name: string;
  alternateNames: string[];
  epithet: string;
  traditionId: TraditionId;
  archetypeId: ArchetypeId;
  secondaryArchetypeId?: ArchetypeId;
  domains: string[];
  symbols: string[];
  sacredAnimals: string[];
  consortOrKin: string;
  dwelling: string;
  originSummary: string;
  signatureMythTitle: string;
  signatureMyth: string;
  culturalRole: string;
  comparativeInsight: string;
  counterpartIds: string[];
}

export interface MotifRetelling {
  traditionId: TraditionId;
  title: string;
  keyFigures: string[];
  primarySource: string;
  catalyst: string;
  ordeal: string;
  climax: string;
  cosmicLegacy: string;
  philosophicalTheme: string;
}

export interface MythMotif {
  id: string;
  folioNumber: string;
  title: string;
  subtitle: string;
  category: string;
  comparativeThesis: string;
  sharedElements: string[];
  keyDivergences: string[];
  retellings: MotifRetelling[];
}

export type LineageTier = 'primordial' | 'elder' | 'sovereign' | 'offspring';
export type RelationType = 'parent' | 'consort' | 'sibling' | 'rival';

export interface LineageNode {
  id: string;
  label: string;
  role: string;
  tier: LineageTier;
  column: number; // 0..4 horizontal slot within tier
  deityId?: string; // links to Deity catalog if present
  bio: string;
}

export interface LineageEdge {
  from: string;
  to: string;
  type: RelationType;
  note?: string;
}

export interface PantheonLineage {
  traditionId: TraditionId;
  title: string;
  cosmologicalNote: string;
  nodes: LineageNode[];
  edges: LineageEdge[];
}

export interface DiffusionRoute {
  id: string;
  name: string;
  eraLabel: string;
  startYear: number;
  endYear: number;
  summary: string;
  scholarlyMechanism: string;
  traditionIds: TraditionId[];
  svgPath: string;
}

export interface ChronoMilestone {
  id: string;
  year: number;
  yearLabel: string;
  traditionId: TraditionId;
  title: string;
  category: 'text' | 'ritual' | 'syncretism' | 'cosmology';
  description: string;
}

export interface StudyLesson {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  coreReading: string;
  keyTakeaways: string[];
  linkedDeityIds: string[];
  linkedMotifId?: string;
}

export interface StudyTrack {
  id: string;
  folioCode: string;
  title: string;
  subtitle: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Comparative Seminar';
  estimatedMinutes: number;
  lessons: StudyLesson[];
}

export interface FlashcardItem {
  id: string;
  traditionId: TraditionId | 'comparative';
  archetypeId?: ArchetypeId;
  promptCategory: string;
  frontPrompt: string;
  backAnswer: string;
  comparativeHint: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Initiate' | 'Scholar' | 'Archivist';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedTraditionIds: TraditionId[];
}

export interface CanonicalBook {
  id: string;
  title: string;
  nativeTitle: string;
  traditionId: TraditionId;
  dateComposed: string;
  medium:
    | 'Clay Tablets'
    | 'Papyrus & Tomb Stone'
    | 'Vellum Codex'
    | 'Oral & Palm-Leaf'
    | 'Bamboo & Woodblock'
    | 'Screenfold Codex'
    | 'Living Oral Canon';
  authorOrCompiler: string;
  platePath: string;
  tagline: string;
  synopsis: string;
  famousPassage: string;
  famousPassageCitation: string;
  keyMythsIncluded: string[];
  recommendedTranslation: string;
  linkedDeityIds: string[];
  linkedMotifId: string;
}

export type PageId =
  | 'home'
  | 'traditions'
  | 'deities'
  | 'motifs'
  | 'connections'
  | 'texts'
  | 'ascension'
  | 'lineages'
  | 'atlas'
  | 'learn';

export interface RouteState {
  page: PageId;
  realm?: 'pantheons' | 'bestiary';
  lang?: 'en' | 'zh';
  traditionSlug?: TraditionId;
  pantheonFocus?: TraditionId;
  compareIds?: string[];
  motifId?: string;
  connectionPair?: [TraditionId, TraditionId];
  connectionEventId?: string;
  bookId?: string;
  textsTradition?: TraditionId;
  sagaId?: string;
  lineageTradition?: TraditionId;
}
