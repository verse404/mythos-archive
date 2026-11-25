import { ATLAS_LANDMASSES } from '../data/atlas';
import type { AscensionSaga } from '../data/ascensionGame';
import type { LocalizedMythosData } from '../i18n/I18nContext';
import { ZH_LANDMASSES } from '../i18n/zh/zhTraditionsAndAtlas';
import type { Deity, Tradition, TraditionId } from '../types/mythology';
import type { Locale } from '../utils/storage';
import {
  BESTIARY_BOONS_EN,
  BESTIARY_BOONS_ZH,
  BESTIARY_SAGAS_1_EN,
  BESTIARY_SAGAS_1_ZH,
} from './bestiaryCampaignsPart1';
import { BESTIARY_SAGAS_2_EN, BESTIARY_SAGAS_2_ZH } from './bestiaryCampaignsPart2';
import {
  BESTIARY_FLASHCARDS_EN,
  BESTIARY_FLASHCARDS_ZH,
  BESTIARY_QUIZ_EN,
  BESTIARY_QUIZ_ZH,
  BESTIARY_ROOT_FAMILIES_EN,
  BESTIARY_ROOT_FAMILIES_ZH,
  BESTIARY_TIMELINE_EN,
  BESTIARY_TIMELINE_ZH,
  BESTIARY_TRACKS_EN,
  BESTIARY_TRACKS_ZH,
  getBestiaryPairwiseConnectionEn,
  getBestiaryPairwiseConnectionZh,
} from './bestiaryConnectionsAndLearning';
import { BESTIARY_LINEAGES_EN, BESTIARY_LINEAGES_ZH } from './bestiaryLineages';
import { BESTIARY_MONSTERS_EN } from './bestiaryMonstersAndLineages';
import {
  BESTIARY_MONSTERS_ZH,
  BESTIARY_PRESETS_EN,
  BESTIARY_PRESETS_ZH,
} from './bestiaryMonstersZhAndPresets';
import {
  BESTIARY_BOOKS_EN,
  BESTIARY_BOOKS_ZH,
  BESTIARY_MOTIFS_EN,
  BESTIARY_MOTIFS_ZH,
} from './bestiaryMotifsAndBooks';
import {
  BESTIARY_ARCHETYPES_EN,
  BESTIARY_ARCHETYPES_ZH,
  BESTIARY_HOOKS_EN,
  BESTIARY_HOOKS_ZH,
  BESTIARY_MILESTONES_EN,
  BESTIARY_MILESTONES_ZH,
  BESTIARY_ROUTES_EN,
  BESTIARY_ROUTES_ZH,
  BESTIARY_TRADITIONS_EN,
  BESTIARY_TRADITIONS_ZH,
} from './bestiaryTraditionsAndAtlas';

export { BESTIARY_CINEMA_SCENES_I18N, BESTIARY_UI_STRINGS } from './bestiaryUiStrings';

export function buildBestiaryData(locale: Locale): LocalizedMythosData {
  const isZh = locale === 'zh';

  const traditions = isZh ? BESTIARY_TRADITIONS_ZH : BESTIARY_TRADITIONS_EN;
  const traditionById = Object.fromEntries(traditions.map((t) => [t.id, t])) as Record<
    TraditionId,
    Tradition
  >;

  const deities = isZh ? BESTIARY_MONSTERS_ZH : BESTIARY_MONSTERS_EN;
  const deityById = Object.fromEntries(deities.map((d) => [d.id, d])) as Record<string, Deity>;

  const ascensionSagas: AscensionSaga[] = isZh
    ? [...BESTIARY_SAGAS_1_ZH, ...BESTIARY_SAGAS_2_ZH]
    : [...BESTIARY_SAGAS_1_EN, ...BESTIARY_SAGAS_2_EN];

  const sagaByTraditionId: Partial<Record<TraditionId, AscensionSaga>> = Object.fromEntries(
    ascensionSagas.map((s) => [s.traditionId, s])
  );

  const sagaByDeityId = Object.fromEntries(
    ascensionSagas.map((s) => [s.deityId, s])
  ) as Record<string, AscensionSaga>;

  const hooks = isZh ? BESTIARY_HOOKS_ZH : BESTIARY_HOOKS_EN;

  const atlasLandmasses = isZh
    ? ATLAS_LANDMASSES.map((lm) => ({ ...lm, label: ZH_LANDMASSES[lm.id] ?? lm.label }))
    : ATLAS_LANDMASSES;

  return {
    archetypes: isZh ? BESTIARY_ARCHETYPES_ZH : BESTIARY_ARCHETYPES_EN,
    traditions,
    traditionById,
    deities,
    deityById,
    comparisonPresets: isZh ? BESTIARY_PRESETS_ZH : BESTIARY_PRESETS_EN,
    mythMotifs: isZh ? BESTIARY_MOTIFS_ZH : BESTIARY_MOTIFS_EN,
    canonicalBooks: isZh ? BESTIARY_BOOKS_ZH : BESTIARY_BOOKS_EN,
    ancestralRootFamilies: isZh ? BESTIARY_ROOT_FAMILIES_ZH : BESTIARY_ROOT_FAMILIES_EN,
    inspirationTimeline: isZh ? BESTIARY_TIMELINE_ZH : BESTIARY_TIMELINE_EN,
    getPairwiseConnection: isZh
      ? getBestiaryPairwiseConnectionZh
      : getBestiaryPairwiseConnectionEn,
    pantheonLineages: isZh ? BESTIARY_LINEAGES_ZH : BESTIARY_LINEAGES_EN,
    atlasLandmasses,
    diffusionRoutes: isZh ? BESTIARY_ROUTES_ZH : BESTIARY_ROUTES_EN,
    chronoMilestones: isZh ? BESTIARY_MILESTONES_ZH : BESTIARY_MILESTONES_EN,
    studyTracks: isZh ? BESTIARY_TRACKS_ZH : BESTIARY_TRACKS_EN,
    flashcards: isZh ? BESTIARY_FLASHCARDS_ZH : BESTIARY_FLASHCARDS_EN,
    quizQuestions: isZh ? BESTIARY_QUIZ_ZH : BESTIARY_QUIZ_EN,
    ascensionSagas,
    sagaByTraditionId,
    sagaByDeityId,
    startingBoons: isZh ? BESTIARY_BOONS_ZH : BESTIARY_BOONS_EN,
    traditionShortHook: hooks.traditionShortHook,
    motifShortTagline: hooks.motifShortTagline,
    radarAxes: hooks.radarAxes,
  };
}
