import type { ArchetypeId, TraditionId } from '../../types/mythology';

export interface ZhArchetypeOverlay {
  label: string;
  shortLabel: string;
  subtitle: string;
  scholarlyNote: string;
}

export interface ZhTraditionOverlay {
  name: string;
  shortName: string;
  subtitle: string;
  folioCode: string;
  region: string;
  culturalSphere: string;
  eraLabel: string;
  summary: string;
  worldviewThesis: string;
  cosmicAxis: string;
  keyValues: string[];
  sacredSymbols: string[];
  realms: { name: string; description: string }[];
  primaryTexts: { title: string; period: string; description: string }[];
  relatedTraditions: { connectionType: string; explanation: string }[];
}

export interface ZhDiffusionRouteOverlay {
  name: string;
  eraLabel: string;
  summary: string;
  scholarlyMechanism: string;
}

export interface ZhChronoMilestoneOverlay {
  yearLabel: string;
  title: string;
  description: string;
}

export interface ZhVisualHooksOverlay {
  traditionShortHook: Record<TraditionId, string>;
  motifShortTagline: Record<string, string>;
  radarAxes: readonly [string, string, string, string, string];
}

export interface ZhDeityOverlay {
  name: string;
  alternateNames: string[];
  epithet: string;
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
}

export interface ZhComparisonPresetOverlay {
  title: string;
  subtitle: string;
  synthesisNote: string;
}

export interface ZhLineageOverlay {
  title: string;
  cosmologicalNote: string;
  nodes: Record<string, { label: string; role: string; bio: string }>;
  edgeNotes?: Record<string, string>;
}

export interface ZhMotifRetellingOverlay {
  title: string;
  keyFigures: string[];
  primarySource: string;
  catalyst: string;
  ordeal: string;
  climax: string;
  cosmicLegacy: string;
  philosophicalTheme: string;
}

export interface ZhMotifOverlay {
  folioNumber: string;
  title: string;
  subtitle: string;
  category: string;
  comparativeThesis: string;
  sharedElements: string[];
  keyDivergences: string[];
  retellings: Partial<Record<TraditionId, ZhMotifRetellingOverlay>>;
}

export interface ZhBookOverlay {
  title: string;
  dateComposed: string;
  authorOrCompiler: string;
  tagline: string;
  synopsis: string;
  famousPassage: string;
  famousPassageCitation: string;
  keyMythsIncluded: string[];
  recommendedTranslation: string;
}

export interface ZhRootFamilyOverlay {
  name: string;
  originEra: string;
  homeland: string;
  summary: string;
  inheritedTraits: { concept: string; manifestations: string }[];
}

export interface ZhInspirationEventOverlay {
  eraLabel: string;
  fromLabel: string;
  toLabel: string;
  headline: string;
  historicalChannel: string;
  whatWasInspired: { sourceElement: string; inspiredOutcome: string }[];
  scholarlySummary: string;
}

export interface ZhPairwiseOverlay {
  badgeLabel: string;
  sharedMotherOrVector: string;
  keySimilarities: string[];
  keyDifference: string;
}

export interface ZhStudyTrackOverlay {
  folioCode: string;
  title: string;
  subtitle: string;
  lessons: Record<
    string,
    {
      title: string;
      summary: string;
      coreReading: string;
      keyTakeaways: string[];
    }
  >;
}

export interface ZhFlashcardOverlay {
  promptCategory: string;
  frontPrompt: string;
  backAnswer: string;
  comparativeHint: string;
}

export interface ZhQuizQuestionOverlay {
  category: string;
  prompt: string;
  options: string[];
  explanation: string;
}

export interface ZhChoiceOverlay {
  title: string;
  subtitle: string;
  flavorTag: string;
  successNarrative: string;
  failNarrative?: string;
  mythicNote: string;
  unlockedRelicName?: string;
}

export interface ZhEncounterNodeOverlay {
  chapterLabel: string;
  rankTitle: string;
  title: string;
  location: string;
  dmPrompt: string;
  choices: Record<string, ZhChoiceOverlay>;
}

export interface ZhEndingNodeOverlay {
  badgeLabel: string;
  title: string;
  subtitle: string;
  location: string;
  epilogue: string;
  mythicComparison: string;
}

export interface ZhSagaOverlay {
  dndClass: string;
  mortalOrOriginName: string;
  ascendedTitle: string;
  subtitle: string;
  encounters: Record<string, ZhEncounterNodeOverlay>;
  endings: Record<string, ZhEndingNodeOverlay>;
}

export type ZhArchetypesMap = Record<ArchetypeId, ZhArchetypeOverlay>;
export type ZhTraditionsMap = Record<TraditionId, ZhTraditionOverlay>;
export type ZhLineagesMap = Record<TraditionId, ZhLineageOverlay>;
