// Validated client-side storage helpers for non-sensitive UI preferences and study progress.
// TODO(security): Never store authentication tokens, session identifiers, or PII in localStorage.
// If user accounts are introduced in the future, migrate session state to HttpOnly, Secure, SameSite cookies.

import type { TraditionId } from '../types/mythology';

export type ThemeMode = 'light' | 'dark';
export type Locale = 'en' | 'zh';
export type RealmMode = 'pantheons' | 'bestiary';
export type PantheonFocus = TraditionId | 'all';

const THEME_STORAGE_KEY = 'mythos_archive_theme_v2';
const LOCALE_STORAGE_KEY = 'mythos_archive_locale_v1';
const REALM_STORAGE_KEY = 'mythos_archive_realm_v1';
const PANTHEON_FOCUS_KEY = 'mythos_archive_pantheon_focus_v1';
const COMPARE_STORAGE_KEY = 'mythos_archive_compare_ids_v1';
const BESTIARY_COMPARE_STORAGE_KEY = 'mythos_bestiary_compare_ids_v1';
const STUDY_STORAGE_KEY = 'mythos_archive_study_progress_v1';
const BESTIARY_STUDY_STORAGE_KEY = 'mythos_bestiary_study_progress_v1';
const FAVORITES_STORAGE_KEY = 'mythos_archive_favorites_v1';
const BESTIARY_FAVORITES_STORAGE_KEY = 'mythos_bestiary_favorites_v1';

const VALID_TRADITIONS = new Set<string>([
  'greek',
  'norse',
  'egyptian',
  'hindu',
  'chinese',
  'japanese',
  'mesopotamian',
  'celtic',
  'mesoamerican',
  'yoruba',
]);

const ID_PATTERN = /^[a-z0-9-]{2,64}$/;

export interface StudyProgressState {
  completedLessonIds: string[];
  masteredCardIds: string[];
  reviewCardIds: string[];
  bestQuizScore: number;
  bestQuizStreak: number;
  bestEndlessStreak: number;
  quizzesCompleted: number;
}

const DEFAULT_STUDY_PROGRESS: StudyProgressState = {
  completedLessonIds: [],
  masteredCardIds: [],
  reviewCardIds: [],
  bestQuizScore: 0,
  bestQuizStreak: 0,
  bestEndlessStreak: 0,
  quizzesCompleted: 0,
};

function sanitizeIdList(input: unknown, maxItems = 100): string[] {
  if (!Array.isArray(input)) return [];
  const result: string[] = [];
  for (const item of input) {
    if (typeof item === 'string' && ID_PATTERN.test(item) && !result.includes(item)) {
      result.push(item);
      if (result.length >= maxItems) break;
    }
  }
  return result;
}

function sanitizeNonNegativeInt(input: unknown, max = 10000): number {
  if (typeof input !== 'number' || !Number.isFinite(input) || input < 0) {
    return 0;
  }
  return Math.min(Math.floor(input), max);
}

export function loadThemePreference(): ThemeMode {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'dark' || raw === 'light') {
      return raw;
    }
  } catch {
    // Storage unavailable
  }
  // Default to commanding Obsidian & Molten Bronze Chiaroscuro theme
  return 'dark';
}

export function saveThemePreference(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore storage write errors
  }
}

export function loadLocalePreference(): Locale {
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw === 'en' || raw === 'zh') {
      return raw;
    }
  } catch {
    // Storage unavailable
  }
  return 'en';
}

export function saveLocalePreference(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage write errors
  }
}

export function loadRealmPreference(): RealmMode {
  try {
    const raw = window.localStorage.getItem(REALM_STORAGE_KEY);
    if (raw === 'pantheons' || raw === 'bestiary') {
      return raw;
    }
  } catch {
    // Storage unavailable
  }
  return 'pantheons';
}

export function saveRealmPreference(realm: RealmMode): void {
  try {
    window.localStorage.setItem(REALM_STORAGE_KEY, realm);
  } catch {
    // Ignore storage write errors
  }
}

export function loadPantheonFocus(): PantheonFocus {
  try {
    const raw = window.localStorage.getItem(PANTHEON_FOCUS_KEY);
    if (raw === 'all') return 'all';
    if (raw && VALID_TRADITIONS.has(raw)) {
      return raw as TraditionId;
    }
  } catch {
    // Storage unavailable
  }
  return 'all';
}

export function savePantheonFocus(focus: PantheonFocus): void {
  try {
    window.localStorage.setItem(PANTHEON_FOCUS_KEY, focus);
  } catch {
    // Ignore storage write errors
  }
}

export function loadCompareDeityIds(
  validIds: ReadonlySet<string>,
  fallback: string[],
  realm: RealmMode = 'pantheons'
): string[] {
  try {
    const key = realm === 'bestiary' ? BESTIARY_COMPARE_STORAGE_KEY : COMPARE_STORAGE_KEY;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    const cleaned = sanitizeIdList(parsed, 4).filter((id) => validIds.has(id));
    return cleaned.length >= 2 ? cleaned : fallback;
  } catch {
    return fallback;
  }
}

export function saveCompareDeityIds(ids: string[], realm: RealmMode = 'pantheons'): void {
  try {
    const key = realm === 'bestiary' ? BESTIARY_COMPARE_STORAGE_KEY : COMPARE_STORAGE_KEY;
    const cleaned = sanitizeIdList(ids, 4);
    window.localStorage.setItem(key, JSON.stringify(cleaned));
  } catch {
    // Ignore storage write errors
  }
}

export function loadStudyProgress(realm: RealmMode = 'pantheons'): StudyProgressState {
  try {
    const key = realm === 'bestiary' ? BESTIARY_STUDY_STORAGE_KEY : STUDY_STORAGE_KEY;
    const raw = window.localStorage.getItem(key);
    if (!raw) return DEFAULT_STUDY_PROGRESS;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return DEFAULT_STUDY_PROGRESS;
    }
    const record = parsed as Record<string, unknown>;
    return {
      completedLessonIds: sanitizeIdList(record.completedLessonIds, 200),
      masteredCardIds: sanitizeIdList(record.masteredCardIds, 200),
      reviewCardIds: sanitizeIdList(record.reviewCardIds, 200),
      bestQuizScore: sanitizeNonNegativeInt(record.bestQuizScore, 100),
      bestQuizStreak: sanitizeNonNegativeInt(record.bestQuizStreak, 100),
      bestEndlessStreak: sanitizeNonNegativeInt(record.bestEndlessStreak, 1000),
      quizzesCompleted: sanitizeNonNegativeInt(record.quizzesCompleted, 10000),
    };
  } catch {
    return DEFAULT_STUDY_PROGRESS;
  }
}

export function saveStudyProgress(
  state: StudyProgressState,
  realm: RealmMode = 'pantheons'
): void {
  try {
    const key = realm === 'bestiary' ? BESTIARY_STUDY_STORAGE_KEY : STUDY_STORAGE_KEY;
    window.localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage write errors
  }
}

export function loadFavoriteIds(realm: RealmMode = 'pantheons'): string[] {
  try {
    const key = realm === 'bestiary' ? BESTIARY_FAVORITES_STORAGE_KEY : FAVORITES_STORAGE_KEY;
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return sanitizeIdList(parsed, 200);
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids: string[], realm: RealmMode = 'pantheons'): void {
  try {
    const key = realm === 'bestiary' ? BESTIARY_FAVORITES_STORAGE_KEY : FAVORITES_STORAGE_KEY;
    window.localStorage.setItem(key, JSON.stringify(sanitizeIdList(ids, 200)));
  } catch {
    // Ignore storage write errors
  }
}
