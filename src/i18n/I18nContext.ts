import { createContext, useContext } from 'react';
import {
  ASCENSION_SAGAS,
  SAGA_BY_DEITY_ID,
  SAGA_BY_TRADITION_ID,
  STARTING_BOONS,
  type AscensionSaga,
  type CampaignNode,
  type StartingBoon,
} from '../data/ascensionGame';
import {
  ATLAS_LANDMASSES,
  CHRONO_MILESTONES,
  DIFFUSION_ROUTES,
  type AtlasContinentPath,
} from '../data/atlas';
import { CANONICAL_BOOKS } from '../data/books';
import {
  ANCESTRAL_ROOT_FAMILIES,
  CURATED_PAIRWISE_CONNECTIONS,
  INSPIRATION_TIMELINE,
  getPairwiseConnection as getEnPairwiseConnection,
  type AncestralRootFamily,
  type InspirationEvent,
  type PairwiseSimilarity,
} from '../data/connections';
import { COMPARISON_PRESETS, DEITIES, DEITY_BY_ID, type ComparisonPreset } from '../data/deities';
import { FLASHCARDS, QUIZ_QUESTIONS, STUDY_TRACKS } from '../data/learning';
import { PANTHEON_LINEAGES } from '../data/lineages';
import { MYTH_MOTIFS } from '../data/motifs';
import { ARCHETYPES, TRADITIONS, TRADITION_BY_ID } from '../data/traditions';
import { MOTIF_SHORT_TAGLINE, RADAR_AXES, TRADITION_SHORT_HOOK } from '../data/visuals';
import type {
  ArchetypeMeta,
  CanonicalBook,
  ChronoMilestone,
  Deity,
  DiffusionRoute,
  FlashcardItem,
  MythMotif,
  PantheonLineage,
  QuizQuestion,
  StudyTrack,
  Tradition,
  TraditionId,
} from '../types/mythology';
import type { Locale, RealmMode } from '../utils/storage';
import type { CinemaSceneText, UiMessages } from './uiStrings';

export type ZhCatalogModule = typeof import('./zh/index');
export type BestiaryCatalogModule = typeof import('../bestiary/index');

export interface LocalizedMythosData {
  archetypes: ArchetypeMeta[];
  traditions: Tradition[];
  traditionById: Record<TraditionId, Tradition>;
  deities: Deity[];
  deityById: Record<string, Deity>;
  comparisonPresets: ComparisonPreset[];
  mythMotifs: MythMotif[];
  canonicalBooks: CanonicalBook[];
  ancestralRootFamilies: AncestralRootFamily[];
  inspirationTimeline: InspirationEvent[];
  getPairwiseConnection: (a: TraditionId, b: TraditionId) => PairwiseSimilarity;
  pantheonLineages: PantheonLineage[];
  atlasLandmasses: AtlasContinentPath[];
  diffusionRoutes: DiffusionRoute[];
  chronoMilestones: ChronoMilestone[];
  studyTracks: StudyTrack[];
  flashcards: FlashcardItem[];
  quizQuestions: QuizQuestion[];
  ascensionSagas: AscensionSaga[];
  sagaByTraditionId: Partial<Record<TraditionId, AscensionSaga>>;
  sagaByDeityId: Record<string, AscensionSaga>;
  startingBoons: StartingBoon[];
  traditionShortHook: Record<TraditionId, string>;
  motifShortTagline: Record<string, string>;
  radarAxes: readonly [string, string, string, string, string];
}

export const ENGLISH_DATA: LocalizedMythosData = {
  archetypes: ARCHETYPES,
  traditions: TRADITIONS,
  traditionById: TRADITION_BY_ID,
  deities: DEITIES,
  deityById: DEITY_BY_ID,
  comparisonPresets: COMPARISON_PRESETS,
  mythMotifs: MYTH_MOTIFS,
  canonicalBooks: CANONICAL_BOOKS,
  ancestralRootFamilies: ANCESTRAL_ROOT_FAMILIES,
  inspirationTimeline: INSPIRATION_TIMELINE,
  getPairwiseConnection: getEnPairwiseConnection,
  pantheonLineages: PANTHEON_LINEAGES,
  atlasLandmasses: ATLAS_LANDMASSES,
  diffusionRoutes: DIFFUSION_ROUTES,
  chronoMilestones: CHRONO_MILESTONES,
  studyTracks: STUDY_TRACKS,
  flashcards: FLASHCARDS,
  quizQuestions: QUIZ_QUESTIONS,
  ascensionSagas: ASCENSION_SAGAS,
  sagaByTraditionId: SAGA_BY_TRADITION_ID,
  sagaByDeityId: SAGA_BY_DEITY_ID,
  startingBoons: STARTING_BOONS,
  traditionShortHook: TRADITION_SHORT_HOOK,
  motifShortTagline: MOTIF_SHORT_TAGLINE,
  radarAxes: RADAR_AXES,
};

export function buildChineseData(zh: ZhCatalogModule): LocalizedMythosData {
  const archetypes: ArchetypeMeta[] = ARCHETYPES.map((a) => {
    const ov = zh.ZH_ARCHETYPES[a.id];
    return ov ? { ...a, ...ov } : a;
  });

  const traditions: Tradition[] = TRADITIONS.map((t) => {
    const ov = zh.ZH_TRADITIONS[t.id];
    if (!ov) return t;
    return {
      ...t,
      name: ov.name,
      subtitle: ov.subtitle,
      folioCode: ov.folioCode,
      region: ov.region,
      culturalSphere: ov.culturalSphere,
      eraLabel: ov.eraLabel,
      summary: ov.summary,
      worldviewThesis: ov.worldviewThesis,
      cosmicAxis: ov.cosmicAxis,
      keyValues: ov.keyValues,
      sacredSymbols: ov.sacredSymbols,
      realms: t.realms.map((r, idx) => ({
        ...r,
        name: ov.realms[idx]?.name ?? r.name,
        description: ov.realms[idx]?.description ?? r.description,
      })),
      primaryTexts: t.primaryTexts.map((pt, idx) => ({
        ...pt,
        title: ov.primaryTexts[idx]?.title ?? pt.title,
        period: ov.primaryTexts[idx]?.period ?? pt.period,
        description: ov.primaryTexts[idx]?.description ?? pt.description,
      })),
      relatedTraditions: t.relatedTraditions.map((rt, idx) => ({
        ...rt,
        connectionType: ov.relatedTraditions[idx]?.connectionType ?? rt.connectionType,
        explanation: ov.relatedTraditions[idx]?.explanation ?? rt.explanation,
      })),
    };
  });

  const traditionById = Object.fromEntries(traditions.map((t) => [t.id, t])) as Record<
    TraditionId,
    Tradition
  >;

  const deities: Deity[] = DEITIES.map((d) => {
    const ov = zh.ZH_DEITIES[d.id];
    return ov ? { ...d, ...ov } : d;
  });

  const deityById = Object.fromEntries(deities.map((d) => [d.id, d])) as Record<string, Deity>;

  const comparisonPresets: ComparisonPreset[] = COMPARISON_PRESETS.map((p) => {
    const ov = zh.ZH_COMPARISON_PRESETS[p.id];
    return ov ? { ...p, ...ov } : p;
  });

  const mythMotifs: MythMotif[] = MYTH_MOTIFS.map((m) => {
    const ov = zh.ZH_MYTH_MOTIFS[m.id];
    if (!ov) return m;
    return {
      ...m,
      folioNumber: ov.folioNumber,
      title: ov.title,
      subtitle: ov.subtitle,
      category: ov.category,
      comparativeThesis: ov.comparativeThesis,
      sharedElements: ov.sharedElements,
      keyDivergences: ov.keyDivergences,
      retellings: m.retellings.map((r) => {
        const rov = ov.retellings[r.traditionId];
        return rov ? { ...r, ...rov } : r;
      }),
    };
  });

  const canonicalBooks: CanonicalBook[] = CANONICAL_BOOKS.map((b) => {
    const ov = zh.ZH_CANONICAL_BOOKS[b.id];
    return ov ? { ...b, ...ov } : b;
  });

  const ancestralRootFamilies: AncestralRootFamily[] = ANCESTRAL_ROOT_FAMILIES.map((rf) => {
    const ov = zh.ZH_ANCESTRAL_ROOT_FAMILIES[rf.id];
    return ov ? { ...rf, ...ov } : rf;
  });

  const inspirationTimeline: InspirationEvent[] = INSPIRATION_TIMELINE.map((ev) => {
    const ov = zh.ZH_INSPIRATION_TIMELINE[ev.id];
    return ov ? { ...ev, ...ov } : ev;
  });

  const getPairwiseConnection = (a: TraditionId, b: TraditionId): PairwiseSimilarity => {
    const base = getEnPairwiseConnection(a, b);
    if (a === b) {
      return { ...base, ...zh.ZH_DYNAMIC_PAIRWISE_TEMPLATES.identical };
    }
    const directCurated = CURATED_PAIRWISE_CONNECTIONS.find(
      (item) =>
        (item.pair[0] === a && item.pair[1] === b) ||
        (item.pair[0] === b && item.pair[1] === a)
    );
    if (directCurated) {
      const key = `${directCurated.pair[0]}:${directCurated.pair[1]}`;
      const revKey = `${directCurated.pair[1]}:${directCurated.pair[0]}`;
      const ov = zh.ZH_CURATED_PAIRWISE[key] ?? zh.ZH_CURATED_PAIRWISE[revKey];
      if (ov) return { ...base, ...ov };
    }
    const pieSet = new Set<TraditionId>(['greek', 'norse', 'hindu', 'celtic']);
    if (pieSet.has(a) && pieSet.has(b)) {
      return { ...base, ...zh.ZH_DYNAMIC_PAIRWISE_TEMPLATES.pie };
    }
    const disconnected =
      a === 'mesoamerican' || b === 'mesoamerican' || a === 'yoruba' || b === 'yoruba';
    return {
      ...base,
      ...(disconnected
        ? zh.ZH_DYNAMIC_PAIRWISE_TEMPLATES.independent
        : zh.ZH_DYNAMIC_PAIRWISE_TEMPLATES.eurasian),
    };
  };

  const pantheonLineages: PantheonLineage[] = PANTHEON_LINEAGES.map((lin) => {
    const ov = zh.ZH_PANTHEON_LINEAGES[lin.traditionId];
    if (!ov) return lin;
    return {
      ...lin,
      title: ov.title,
      cosmologicalNote: ov.cosmologicalNote,
      nodes: lin.nodes.map((n) => {
        const nov = ov.nodes[n.id];
        return nov ? { ...n, ...nov } : n;
      }),
      edges: lin.edges.map((e) => {
        const edgeKey = `${e.from}->${e.to}`;
        const noteOv = ov.edgeNotes?.[edgeKey];
        return noteOv ? { ...e, note: noteOv } : e;
      }),
    };
  });

  const atlasLandmasses: AtlasContinentPath[] = ATLAS_LANDMASSES.map((lm) => ({
    ...lm,
    label: zh.ZH_LANDMASSES[lm.id] ?? lm.label,
  }));

  const diffusionRoutes: DiffusionRoute[] = DIFFUSION_ROUTES.map((dr) => {
    const ov = zh.ZH_DIFFUSION_ROUTES[dr.id];
    return ov ? { ...dr, ...ov } : dr;
  });

  const chronoMilestones: ChronoMilestone[] = CHRONO_MILESTONES.map((ms) => {
    const ov = zh.ZH_CHRONO_MILESTONES[ms.id];
    return ov ? { ...ms, ...ov } : ms;
  });

  const studyTracks: StudyTrack[] = STUDY_TRACKS.map((tr) => {
    const ov = zh.ZH_STUDY_TRACKS[tr.id];
    if (!ov) return tr;
    return {
      ...tr,
      folioCode: ov.folioCode,
      title: ov.title,
      subtitle: ov.subtitle,
      lessons: tr.lessons.map((les) => {
        const lov = ov.lessons[les.id];
        return lov ? { ...les, ...lov } : les;
      }),
    };
  });

  const flashcards: FlashcardItem[] = FLASHCARDS.map((fc) => {
    const ov = zh.ZH_FLASHCARDS[fc.id];
    return ov ? { ...fc, ...ov } : fc;
  });

  const quizQuestions: QuizQuestion[] = QUIZ_QUESTIONS.map((qq) => {
    const ov = zh.ZH_QUIZ_QUESTIONS[qq.id];
    return ov ? { ...qq, ...ov } : qq;
  });

  const startingBoons: StartingBoon[] = STARTING_BOONS.map((b) => {
    const ov = zh.ZH_STARTING_BOONS[b.id];
    return ov ? { ...b, ...ov } : b;
  });

  const allZhSagas = { ...zh.ZH_ASCENSION_PART_1, ...zh.ZH_ASCENSION_PART_2 };
  const ascensionSagas: AscensionSaga[] = ASCENSION_SAGAS.map((sg) => {
    const sov = allZhSagas[sg.id];
    if (!sov) return sg;

    const localizedNodes: Record<string, CampaignNode> = {};
    for (const [nid, node] of Object.entries(sg.nodes)) {
      if (node.kind === 'encounter') {
        const eov = sov.encounters[nid];
        if (!eov) {
          localizedNodes[nid] = node;
        } else {
          localizedNodes[nid] = {
            ...node,
            chapterLabel: eov.chapterLabel,
            rankTitle: eov.rankTitle,
            title: eov.title,
            location: eov.location,
            dmPrompt: eov.dmPrompt,
            choices: node.choices.map((ch) => {
              const cov = eov.choices[ch.id];
              if (!cov) return ch;
              return {
                ...ch,
                title: cov.title,
                subtitle: cov.subtitle,
                flavorTag: cov.flavorTag,
                successNarrative: cov.successNarrative,
                failNarrative: cov.failNarrative ?? ch.failNarrative,
                mythicNote: cov.mythicNote,
                unlockedRelic:
                  ch.unlockedRelic && cov.unlockedRelicName
                    ? { ...ch.unlockedRelic, name: cov.unlockedRelicName }
                    : ch.unlockedRelic,
              };
            }),
          };
        }
      } else {
        const endOv = sov.endings[nid];
        localizedNodes[nid] = endOv ? { ...node, ...endOv } : node;
      }
    }

    return {
      ...sg,
      dndClass: sov.dndClass,
      mortalOrOriginName: sov.mortalOrOriginName,
      ascendedTitle: sov.ascendedTitle,
      subtitle: sov.subtitle,
      nodes: localizedNodes,
    };
  });

  const sagaByTraditionId: Partial<Record<TraditionId, AscensionSaga>> = Object.fromEntries(
    ascensionSagas.map((s) => [s.traditionId, s])
  );

  const sagaByDeityId = Object.fromEntries(
    ascensionSagas.map((s) => [s.deityId, s])
  ) as Record<string, AscensionSaga>;

  return {
    archetypes,
    traditions,
    traditionById,
    deities,
    deityById,
    comparisonPresets,
    mythMotifs,
    canonicalBooks,
    ancestralRootFamilies,
    inspirationTimeline,
    getPairwiseConnection,
    pantheonLineages,
    atlasLandmasses,
    diffusionRoutes,
    chronoMilestones,
    studyTracks,
    flashcards,
    quizQuestions,
    ascensionSagas,
    sagaByTraditionId,
    sagaByDeityId,
    startingBoons,
    traditionShortHook: zh.ZH_VISUAL_HOOKS.traditionShortHook,
    motifShortTagline: zh.ZH_VISUAL_HOOKS.motifShortTagline,
    radarAxes: zh.ZH_VISUAL_HOOKS.radarAxes,
  };
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  realm: RealmMode;
  setRealm: (next: RealmMode) => void;
  ui: UiMessages;
  cinemaScenes: Record<string, CinemaSceneText>;
  data: LocalizedMythosData;
  shortTraditionName: (tid: TraditionId) => string;
  formatPercent: (scoreOutOf100: number) => string;
  formatNumber: (value: number) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
