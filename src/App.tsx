import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { BESTIARY_UI_STRINGS } from './bestiary/bestiaryUiStrings';
import { AtlasLayout } from './components/AtlasLayout';
import { SAGA_BY_TRADITION_ID } from './data/ascensionGame';
import { CANONICAL_BOOKS } from './data/books';
import { COMPARISON_PRESETS, DEITIES } from './data/deities';
import { MYTH_MOTIFS } from './data/motifs';
import { parseLocation, syncUrlQuery, useRouter } from './hooks/useRouter';
import { I18nProvider } from './i18n/I18nProvider';
import { UI_STRINGS } from './i18n/uiStrings';
import { HomePage } from './pages/HomePage';
import type { TraditionId } from './types/mythology';
import {
  loadCompareDeityIds,
  loadFavoriteIds,
  loadLocalePreference,
  loadPantheonFocus,
  loadRealmPreference,
  loadStudyProgress,
  loadThemePreference,
  saveCompareDeityIds,
  saveFavoriteIds,
  saveLocalePreference,
  savePantheonFocus,
  saveRealmPreference,
  saveStudyProgress,
  saveThemePreference,
  type Locale,
  type PantheonFocus,
  type RealmMode,
  type StudyProgressState,
  type ThemeMode,
} from './utils/storage';

const TraditionsPage = lazy(() =>
  import('./pages/TraditionsPage').then((m) => ({ default: m.TraditionsPage }))
);
const DeitiesPage = lazy(() =>
  import('./pages/DeitiesPage').then((m) => ({ default: m.DeitiesPage }))
);
const MotifsPage = lazy(() =>
  import('./pages/MotifsPage').then((m) => ({ default: m.MotifsPage }))
);
const ConnectionsPage = lazy(() =>
  import('./pages/ConnectionsPage').then((m) => ({ default: m.ConnectionsPage }))
);
const TextsPage = lazy(() =>
  import('./pages/TextsPage').then((m) => ({ default: m.TextsPage }))
);
const AscensionGamePage = lazy(() =>
  import('./pages/AscensionGamePage').then((m) => ({ default: m.AscensionGamePage }))
);
const LineagesPage = lazy(() =>
  import('./pages/LineagesPage').then((m) => ({ default: m.LineagesPage }))
);
const AtlasPage = lazy(() =>
  import('./pages/AtlasPage').then((m) => ({ default: m.AtlasPage }))
);
const LearnPage = lazy(() =>
  import('./pages/LearnPage').then((m) => ({ default: m.LearnPage }))
);

const DEFAULT_PANTHEON_COMPARE_IDS = COMPARISON_PRESETS[0].deityIds;
const DEFAULT_BESTIARY_COMPARE_IDS = [
  'mon-jormungandr',
  'mon-tiamat',
  'mon-vritra',
  'mon-oshumare',
];

const BESTIARY_MONSTERS_BY_TRADITION: Record<TraditionId, string[]> = {
  greek: [
    'mon-typhon', 'mon-hydra', 'mon-cerberus', 'mon-medusa', 'mon-minotaur', 'mon-chimera', 'mon-scylla',
    'mon-pegasus', 'mon-cyclops', 'mon-siren', 'mon-nemean-lion', 'mon-harpy',
  ],
  norse: [
    'mon-fenrir', 'mon-jormungandr', 'mon-nidhoggr', 'mon-fafnir', 'mon-sleipnir', 'mon-kraken', 'mon-draugr',
    'mon-skoll-hati', 'mon-garmr', 'mon-ratatoskr', 'mon-gullinbursti', 'mon-huldra',
  ],
  egyptian: [
    'mon-apophis', 'mon-ammit', 'mon-sphinx', 'mon-bennu', 'mon-serpopard', 'mon-uraeus', 'mon-babi',
    'mon-khepri-scarab', 'mon-griffin-axex', 'mon-sha-beast', 'mon-apet-hippo', 'mon-medjed',
  ],
  hindu: [
    'mon-vritra', 'mon-garuda', 'mon-vasuki', 'mon-makara', 'mon-airavata', 'mon-rakshasa', 'mon-yali',
    'mon-uchchaihshravas', 'mon-narasimha-sharabha', 'mon-kamadhenu', 'mon-kaliya', 'mon-vetala',
  ],
  chinese: [
    'mon-yinglong', 'mon-qilin', 'mon-taotie', 'mon-baize', 'mon-kunpeng', 'mon-hundun', 'mon-pixiu',
    'mon-zhulong', 'mon-jiuweihu-qingqiu', 'mon-xiangliu', 'mon-kui-ox', 'mon-xiezhi',
  ],
  japanese: [
    'mon-orochi', 'mon-kitsune', 'mon-tengu', 'mon-shuten-doji', 'mon-kappa', 'mon-nue', 'mon-namazu',
    'mon-jorogumo', 'mon-yuki-onna', 'mon-gashadokuro', 'mon-baku', 'mon-umibozu',
  ],
  mesopotamian: [
    'mon-tiamat', 'mon-humbaba', 'mon-lamassu', 'mon-anzu', 'mon-pazuzu', 'mon-mushhushshu', 'mon-gugalanna',
    'mon-lamashtu', 'mon-apkallu', 'mon-bashmu', 'mon-kusarikku', 'mon-asag',
  ],
  celtic: [
    'mon-balor', 'mon-kelpie', 'mon-banshee', 'mon-dullahan', 'mon-selkie', 'mon-cu-sith', 'mon-nuckelavee',
    'mon-salmon-of-knowledge', 'mon-questing-beast', 'mon-puca', 'mon-sith-cat', 'mon-caoranach',
  ],
  mesoamerican: [
    'mon-cipactli', 'mon-ahuizotl', 'mon-tzitzimitl', 'mon-camazotz', 'mon-xiuhcoatl', 'mon-nagual', 'mon-xolotl-beast',
    'mon-itzpapalotl', 'mon-vucub-caquix', 'mon-cihuateteo', 'mon-quinametzin', 'mon-kukulkan-vision',
  ],
  yoruba: [
    'mon-oshumare', 'mon-ekun', 'mon-ajogun', 'mon-aroni', 'mon-agemo', 'mon-iwin', 'mon-olokun-leviathan',
    'mon-ijapa', 'mon-inkin-eye-okanran', 'mon-egbere', 'mon-igun-messenger', 'mon-ere-igbo',
  ],
};

const BESTIARY_SAGA_BY_TRADITION_ID: Record<TraditionId, string> = {
  greek: 'saga-mon-hydra',
  norse: 'saga-mon-fenrir',
  egyptian: 'saga-mon-apophis',
  hindu: 'saga-mon-vritra',
  chinese: 'saga-mon-yinglong',
  japanese: 'saga-mon-orochi',
  mesopotamian: 'saga-mon-tiamat',
  celtic: 'saga-mon-balor',
  mesoamerican: 'saga-mon-cipactli',
  yoruba: 'saga-mon-oshumare',
};

const BESTIARY_BOOK_BY_TRADITION_ID: Record<TraditionId, string> = {
  greek: 'bst-theogony-monsters',
  norse: 'bst-edda-monsters',
  egyptian: 'bst-apophis-dead',
  hindu: 'bst-astika-parva',
  chinese: 'bst-shan-hai-jing',
  japanese: 'bst-kojiki-hyakki',
  mesopotamian: 'bst-enuma-monsters',
  celtic: 'bst-mag-tuired-folklore',
  mesoamerican: 'bst-florentine-cipactli',
  yoruba: 'bst-ifa-gelede',
};

const BESTIARY_MOTIF_RETELLINGS: { id: string; traditions: TraditionId[] }[] = [
  { id: 'sea-leviathan', traditions: ['norse', 'mesopotamian', 'hindu', 'chinese', 'yoruba'] },
  { id: 'multi-headed', traditions: ['greek', 'japanese', 'hindu', 'mesoamerican', 'chinese'] },
  { id: 'hell-hounds', traditions: ['greek', 'egyptian', 'norse', 'mesoamerican', 'celtic'] },
  { id: 'sacred-chimeras', traditions: ['egyptian', 'mesopotamian', 'chinese', 'hindu', 'yoruba'] },
  { id: 'shapeshifters', traditions: ['japanese', 'celtic', 'mesoamerican', 'yoruba', 'greek'] },
  { id: 'apocalypse-beasts', traditions: ['norse', 'egyptian', 'mesopotamian', 'celtic', 'japanese'] },
];

export const App: React.FC = () => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initialFromUrl = parseLocation(window.location.pathname, window.location.search).lang;
    return initialFromUrl ?? loadLocalePreference();
  });

  const [realm, setRealmState] = useState<RealmMode>(() => {
    const initialFromUrl = parseLocation(window.location.pathname, window.location.search).realm;
    return initialFromUrl ?? loadRealmPreference();
  });

  const { route, navigate } = useRouter(locale, realm);

  const validPantheonDeityIds = useMemo(() => new Set(DEITIES.map((d) => d.id)), []);
  const validBestiaryMonsterIds = useMemo(
    () => new Set(Object.values(BESTIARY_MONSTERS_BY_TRADITION).flat()),
    []
  );

  const [theme, setTheme] = useState<ThemeMode>(() => loadThemePreference());
  const [pantheonFocus, setPantheonFocus] = useState<PantheonFocus>(
    () => route.pantheonFocus ?? loadPantheonFocus()
  );

  const [pantheonCompareIds, setPantheonCompareIds] = useState<string[]>(() => {
    if (realm === 'pantheons' && route.compareIds) {
      const validFromUrl = route.compareIds.filter((id) => validPantheonDeityIds.has(id));
      if (validFromUrl.length >= 2) return validFromUrl;
    }
    const initialFocus = route.pantheonFocus ?? loadPantheonFocus();
    if (initialFocus !== 'all') {
      const pDeities = DEITIES.filter((d) => d.traditionId === initialFocus)
        .slice(0, 4)
        .map((d) => d.id);
      if (pDeities.length >= 2) return pDeities;
    }
    return loadCompareDeityIds(validPantheonDeityIds, DEFAULT_PANTHEON_COMPARE_IDS, 'pantheons');
  });

  const [bestiaryCompareIds, setBestiaryCompareIds] = useState<string[]>(() => {
    if (realm === 'bestiary' && route.compareIds) {
      const validFromUrl = route.compareIds.filter((id) => validBestiaryMonsterIds.has(id));
      if (validFromUrl.length >= 2) return validFromUrl;
    }
    const initialFocus = route.pantheonFocus ?? loadPantheonFocus();
    if (initialFocus !== 'all') {
      const mIds = BESTIARY_MONSTERS_BY_TRADITION[initialFocus]?.slice(0, 4);
      if (mIds && mIds.length >= 2) return mIds;
    }
    return loadCompareDeityIds(validBestiaryMonsterIds, DEFAULT_BESTIARY_COMPARE_IDS, 'bestiary');
  });

  const compareIds = realm === 'bestiary' ? bestiaryCompareIds : pantheonCompareIds;

  const [activeMotifId, setActiveMotifId] = useState<string>(() => {
    if (realm === 'bestiary') {
      return route.motifId && BESTIARY_MOTIF_RETELLINGS.some((m) => m.id === route.motifId)
        ? route.motifId
        : BESTIARY_MOTIF_RETELLINGS[0].id;
    }
    return route.motifId && MYTH_MOTIFS.some((m) => m.id === route.motifId)
      ? route.motifId
      : MYTH_MOTIFS[0].id;
  });

  const [connectionPair, setConnectionPair] = useState<[TraditionId, TraditionId] | undefined>(
    route.connectionPair
  );
  const [connectionEventId, setConnectionEventId] = useState<string | undefined>(
    route.connectionEventId
  );
  const [lineageTraditionId, setLineageTraditionId] = useState<TraditionId>(
    route.lineageTradition ?? (pantheonFocus !== 'all' ? pantheonFocus : 'greek')
  );
  const [textsTraditionFilter, setTextsTraditionFilter] = useState<TraditionId | undefined>(
    route.textsTradition ?? (pantheonFocus !== 'all' ? pantheonFocus : undefined)
  );
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>(route.bookId);
  const [selectedSagaId, setSelectedSagaId] = useState<string | undefined>(() => {
    if (route.sagaId) return route.sagaId;
    if (pantheonFocus !== 'all') {
      return realm === 'bestiary'
        ? BESTIARY_SAGA_BY_TRADITION_ID[pantheonFocus]
        : SAGA_BY_TRADITION_ID[pantheonFocus]?.id;
    }
    return undefined;
  });

  const [pantheonStudyProgress, setPantheonStudyProgress] = useState<StudyProgressState>(() =>
    loadStudyProgress('pantheons')
  );
  const [bestiaryStudyProgress, setBestiaryStudyProgress] = useState<StudyProgressState>(() =>
    loadStudyProgress('bestiary')
  );
  const studyProgress = realm === 'bestiary' ? bestiaryStudyProgress : pantheonStudyProgress;

  const [pantheonFavoriteIds, setPantheonFavoriteIds] = useState<string[]>(() =>
    loadFavoriteIds('pantheons')
  );
  const [bestiaryFavoriteIds, setBestiaryFavoriteIds] = useState<string[]>(() =>
    loadFavoriteIds('bestiary')
  );
  const favoriteIds = realm === 'bestiary' ? bestiaryFavoriteIds : pantheonFavoriteIds;

  const [pendingReaderDeityId, setPendingReaderDeityId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveThemePreference(theme);
  }, [theme]);

  const handleChangeLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    saveLocalePreference(nextLocale);
  }, []);

  const handleChangeRealm = useCallback(
    (nextRealm: RealmMode) => {
      if (nextRealm === realm) return;
      setRealmState(nextRealm);
      saveRealmPreference(nextRealm);

      if (nextRealm === 'bestiary') {
        const nextMotif =
          pantheonFocus === 'all'
            ? BESTIARY_MOTIF_RETELLINGS[0].id
            : (BESTIARY_MOTIF_RETELLINGS.find((m) => m.traditions.includes(pantheonFocus))?.id ??
              BESTIARY_MOTIF_RETELLINGS[0].id);
        setActiveMotifId(nextMotif);
        setSelectedBookId(
          pantheonFocus !== 'all' ? BESTIARY_BOOK_BY_TRADITION_ID[pantheonFocus] : undefined
        );
        setSelectedSagaId(
          pantheonFocus !== 'all' ? BESTIARY_SAGA_BY_TRADITION_ID[pantheonFocus] : undefined
        );
        if (pantheonFocus !== 'all') {
          setBestiaryCompareIds(BESTIARY_MONSTERS_BY_TRADITION[pantheonFocus].slice(0, 4));
        }
      } else {
        const nextMotif =
          pantheonFocus === 'all'
            ? MYTH_MOTIFS[0].id
            : (MYTH_MOTIFS.find((m) => m.retellings.some((r) => r.traditionId === pantheonFocus))
                ?.id ?? MYTH_MOTIFS[0].id);
        setActiveMotifId(nextMotif);
        const firstBook =
          pantheonFocus !== 'all'
            ? CANONICAL_BOOKS.find((b) => b.traditionId === pantheonFocus)?.id
            : undefined;
        setSelectedBookId(firstBook);
        setSelectedSagaId(
          pantheonFocus !== 'all' ? SAGA_BY_TRADITION_ID[pantheonFocus]?.id : undefined
        );
        if (pantheonFocus !== 'all') {
          const pDeities = DEITIES.filter((d) => d.traditionId === pantheonFocus)
            .slice(0, 4)
            .map((d) => d.id);
          if (pDeities.length >= 2) setPantheonCompareIds(pDeities);
        }
      }
    },
    [pantheonFocus, realm]
  );

  const handleChangePantheonFocus = useCallback(
    (nextFocus: PantheonFocus) => {
      setPantheonFocus(nextFocus);
      savePantheonFocus(nextFocus);

      if (nextFocus === 'all') {
        setTextsTraditionFilter(undefined);
        if (route.page === 'traditions' && route.traditionSlug) {
          navigate({ page: 'traditions', realm, lang: locale });
        }
        return;
      }

      const pantheonDeities = DEITIES.filter((d) => d.traditionId === nextFocus)
        .slice(0, 4)
        .map((d) => d.id);
      if (pantheonDeities.length >= 2) {
        setPantheonCompareIds(pantheonDeities);
      }
      setBestiaryCompareIds(BESTIARY_MONSTERS_BY_TRADITION[nextFocus].slice(0, 4));

      setLineageTraditionId(nextFocus);
      setTextsTraditionFilter(nextFocus);

      if (realm === 'bestiary') {
        setSelectedBookId(BESTIARY_BOOK_BY_TRADITION_ID[nextFocus]);
        setSelectedSagaId(BESTIARY_SAGA_BY_TRADITION_ID[nextFocus]);
        const matchingBstMotif = BESTIARY_MOTIF_RETELLINGS.find((m) =>
          m.traditions.includes(nextFocus)
        );
        if (matchingBstMotif) {
          setActiveMotifId(matchingBstMotif.id);
        }
      } else {
        const firstBook = CANONICAL_BOOKS.find((b) => b.traditionId === nextFocus);
        if (firstBook) {
          setSelectedBookId(firstBook.id);
        }
        const matchingSaga = SAGA_BY_TRADITION_ID[nextFocus];
        if (matchingSaga) {
          setSelectedSagaId(matchingSaga.id);
        }
        const matchingMotif = MYTH_MOTIFS.find((m) =>
          m.retellings.some((r) => r.traditionId === nextFocus)
        );
        if (matchingMotif) {
          setActiveMotifId(matchingMotif.id);
        }
      }

      if (route.page === 'traditions') {
        navigate({
          page: 'traditions',
          realm,
          lang: locale,
          traditionSlug: nextFocus,
          pantheonFocus: nextFocus,
        });
      }
    },
    [locale, navigate, realm, route.page, route.traditionSlug]
  );

  const effectiveSagaId = useMemo(() => {
    if (pantheonFocus !== 'all') {
      return realm === 'bestiary'
        ? BESTIARY_SAGA_BY_TRADITION_ID[pantheonFocus]
        : SAGA_BY_TRADITION_ID[pantheonFocus]?.id;
    }
    return selectedSagaId;
  }, [pantheonFocus, realm, selectedSagaId]);

  useEffect(() => {
    const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
    if (route.page === 'home') {
      syncUrlQuery({ page: 'home', realm, lang: locale, pantheonFocus: focusParam });
    } else if (route.page === 'traditions') {
      syncUrlQuery({
        page: 'traditions',
        realm,
        lang: locale,
        traditionSlug: route.traditionSlug ?? focusParam,
        pantheonFocus: focusParam,
      });
    } else if (route.page === 'deities') {
      syncUrlQuery({
        page: 'deities',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        compareIds,
      });
    } else if (route.page === 'motifs') {
      syncUrlQuery({
        page: 'motifs',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        motifId: activeMotifId,
      });
    } else if (route.page === 'connections') {
      syncUrlQuery({
        page: 'connections',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        connectionPair,
        connectionEventId,
      });
    } else if (route.page === 'texts') {
      syncUrlQuery({
        page: 'texts',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        bookId: selectedBookId,
        textsTradition: focusParam ?? textsTraditionFilter,
      });
    } else if (route.page === 'ascension') {
      syncUrlQuery({
        page: 'ascension',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        sagaId: effectiveSagaId,
      });
    } else if (route.page === 'lineages') {
      syncUrlQuery({
        page: 'lineages',
        realm,
        lang: locale,
        pantheonFocus: focusParam,
        lineageTradition: focusParam ?? lineageTraditionId,
      });
    } else if (route.page === 'atlas') {
      syncUrlQuery({ page: 'atlas', realm, lang: locale, pantheonFocus: focusParam });
    } else if (route.page === 'learn') {
      syncUrlQuery({ page: 'learn', realm, lang: locale, pantheonFocus: focusParam });
    }
  }, [
    route.page,
    route.traditionSlug,
    realm,
    locale,
    pantheonFocus,
    compareIds,
    activeMotifId,
    connectionPair,
    connectionEventId,
    selectedBookId,
    textsTraditionFilter,
    effectiveSagaId,
    lineageTraditionId,
  ]);

  const handleNavigate = useCallback(
    (next: Parameters<typeof navigate>[0]) => {
      const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
      if (next.page === 'texts' && !next.bookId && !next.textsTradition && !focusParam) {
        setTextsTraditionFilter(undefined);
        setSelectedBookId(undefined);
      }
      if (next.sagaId) {
        setSelectedSagaId(next.sagaId);
      }
      if (next.connectionPair) {
        setConnectionPair(next.connectionPair);
      }
      if (next.connectionEventId) {
        setConnectionEventId(next.connectionEventId);
      }
      navigate({ ...next, realm: next.realm ?? realm, lang: locale, pantheonFocus: focusParam });
    },
    [locale, navigate, pantheonFocus, realm]
  );

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleSetCompareIds = useCallback(
    (nextIds: string[]) => {
      if (realm === 'bestiary') {
        setBestiaryCompareIds(nextIds);
        saveCompareDeityIds(nextIds, 'bestiary');
      } else {
        setPantheonCompareIds(nextIds);
        saveCompareDeityIds(nextIds, 'pantheons');
      }
    },
    [realm]
  );

  const handleToggleCompareDeity = useCallback(
    (deityId: string) => {
      const updater = (prev: string[]) => {
        let next: string[];
        if (prev.includes(deityId)) {
          if (prev.length <= 2) return prev;
          next = prev.filter((id) => id !== deityId);
        } else if (prev.length >= 4) {
          next = [...prev.slice(1), deityId];
        } else {
          next = [...prev, deityId];
        }
        saveCompareDeityIds(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryCompareIds(updater);
      } else {
        setPantheonCompareIds(updater);
      }
    },
    [realm]
  );

  const handleJumpToCompareDeity = useCallback(
    (deityId: string) => {
      const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
      const updater = (prev: string[]) => {
        const next = prev.includes(deityId)
          ? prev
          : prev.length >= 4
            ? [deityId, ...prev.slice(0, 3)]
            : [deityId, ...prev];
        saveCompareDeityIds(next, realm);
        navigate({
          page: 'deities',
          realm,
          lang: locale,
          pantheonFocus: focusParam,
          compareIds: next,
        });
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryCompareIds(updater);
      } else {
        setPantheonCompareIds(updater);
      }
    },
    [locale, navigate, pantheonFocus, realm]
  );

  const handleJumpToMotif = useCallback(
    (motifId: string) => {
      const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
      setActiveMotifId(motifId);
      navigate({ page: 'motifs', realm, lang: locale, pantheonFocus: focusParam, motifId });
    },
    [locale, navigate, pantheonFocus, realm]
  );

  const handleJumpToSaga = useCallback(
    (sagaId: string) => {
      const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
      setSelectedSagaId(sagaId);
      navigate({ page: 'ascension', realm, lang: locale, pantheonFocus: focusParam, sagaId });
    },
    [locale, navigate, pantheonFocus, realm]
  );

  const handleToggleLessonComplete = useCallback(
    (lessonId: string) => {
      const updater = (prev: StudyProgressState) => {
        const exists = prev.completedLessonIds.includes(lessonId);
        const completedLessonIds = exists
          ? prev.completedLessonIds.filter((id) => id !== lessonId)
          : [...prev.completedLessonIds, lessonId];
        const next = { ...prev, completedLessonIds };
        saveStudyProgress(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryStudyProgress(updater);
      } else {
        setPantheonStudyProgress(updater);
      }
    },
    [realm]
  );

  const handleMarkFlashcard = useCallback(
    (cardId: string, status: 'mastered' | 'review') => {
      const updater = (prev: StudyProgressState) => {
        const masteredCardIds =
          status === 'mastered'
            ? Array.from(new Set([...prev.masteredCardIds, cardId]))
            : prev.masteredCardIds.filter((id) => id !== cardId);
        const reviewCardIds =
          status === 'review'
            ? Array.from(new Set([...prev.reviewCardIds, cardId]))
            : prev.reviewCardIds.filter((id) => id !== cardId);
        const next = { ...prev, masteredCardIds, reviewCardIds };
        saveStudyProgress(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryStudyProgress(updater);
      } else {
        setPantheonStudyProgress(updater);
      }
    },
    [realm]
  );

  const handleRecordQuizFinish = useCallback(
    (score: number, maxStreak: number) => {
      const updater = (prev: StudyProgressState) => {
        const next: StudyProgressState = {
          ...prev,
          bestQuizScore: Math.max(prev.bestQuizScore, score),
          bestQuizStreak: Math.max(prev.bestQuizStreak, maxStreak),
          quizzesCompleted: prev.quizzesCompleted + 1,
        };
        saveStudyProgress(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryStudyProgress(updater);
      } else {
        setPantheonStudyProgress(updater);
      }
    },
    [realm]
  );

  const handleRecordEndlessStreak = useCallback(
    (streak: number) => {
      const updater = (prev: StudyProgressState) => {
        if (streak <= prev.bestEndlessStreak) return prev;
        const next: StudyProgressState = {
          ...prev,
          bestEndlessStreak: streak,
        };
        saveStudyProgress(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryStudyProgress(updater);
      } else {
        setPantheonStudyProgress(updater);
      }
    },
    [realm]
  );

  const handleToggleFavorite = useCallback(
    (deityId: string) => {
      const updater = (prev: string[]) => {
        const next = prev.includes(deityId)
          ? prev.filter((id) => id !== deityId)
          : [deityId, ...prev];
        saveFavoriteIds(next, realm);
        return next;
      };
      if (realm === 'bestiary') {
        setBestiaryFavoriteIds(updater);
      } else {
        setPantheonFavoriteIds(updater);
      }
    },
    [realm]
  );

  const handleJumpCrossRealm = useCallback(
    (targetRealm: RealmMode, targetDeityId: string) => {
      if (targetRealm !== realm) {
        handleChangeRealm(targetRealm);
      }
      setPendingReaderDeityId(targetDeityId);
      const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
      navigate({
        page: 'deities',
        realm: targetRealm,
        lang: locale,
        pantheonFocus: focusParam,
      });
    },
    [handleChangeRealm, locale, navigate, pantheonFocus, realm]
  );

  const loadingText =
    realm === 'bestiary'
      ? BESTIARY_UI_STRINGS[locale].brand.loadingFolio
      : UI_STRINGS[locale].brand.loadingFolio;

  return (
    <I18nProvider
      locale={locale}
      onChangeLocale={handleChangeLocale}
      realm={realm}
      onChangeRealm={handleChangeRealm}
    >
      <AtlasLayout
        route={route}
        navigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        pantheonFocus={pantheonFocus}
        onChangePantheonFocus={handleChangePantheonFocus}
        compareIds={compareIds}
        onJumpToCompareDeity={handleJumpToCompareDeity}
        onJumpCrossRealm={handleJumpCrossRealm}
        onJumpToMotif={handleJumpToMotif}
        onJumpToBook={(bookId) => {
          const focusParam = pantheonFocus !== 'all' ? pantheonFocus : undefined;
          setTextsTraditionFilter(focusParam);
          setSelectedBookId(bookId);
          navigate({ page: 'texts', realm, lang: locale, pantheonFocus: focusParam, bookId });
        }}
        onJumpToSaga={handleJumpToSaga}
      >
        {route.page === 'home' && (
          <HomePage
            key={`home-${realm}`}
            pantheonFocus={pantheonFocus}
            onChangePantheonFocus={handleChangePantheonFocus}
            compareIds={compareIds}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onJumpCrossRealm={handleJumpCrossRealm}
            onToggleCompareDeity={handleToggleCompareDeity}
            navigate={handleNavigate}
            onApplyPreset={handleSetCompareIds}
            onSelectMotif={setActiveMotifId}
            onJumpToSaga={handleJumpToSaga}
          />
        )}

        <Suspense
          fallback={
            <div className="synthesis-banner mt-lg">
              <span className="folio-kicker">{loadingText}</span>
            </div>
          }
        >
          {route.page === 'traditions' && (
            <TraditionsPage
              key={`traditions-${realm}`}
              selectedSlug={
                pantheonFocus !== 'all' ? pantheonFocus : route.traditionSlug
              }
              pantheonFocus={pantheonFocus}
              onChangePantheonFocus={handleChangePantheonFocus}
              navigate={handleNavigate}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              onToggleCompareDeity={handleToggleCompareDeity}
              onSelectLineageTradition={setLineageTraditionId}
              onOpenTraditionTexts={(tid) => {
                setSelectedBookId(undefined);
                setTextsTraditionFilter(tid);
                navigate({
                  page: 'texts',
                  realm,
                  lang: locale,
                  pantheonFocus: pantheonFocus !== 'all' ? pantheonFocus : undefined,
                  textsTradition: tid,
                });
              }}
              onJumpToSaga={handleJumpToSaga}
            />
          )}

          {route.page === 'deities' && (
            <DeitiesPage
              key={`deities-${realm}`}
              pantheonFocus={pantheonFocus}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              initialReaderDeityId={pendingReaderDeityId}
              onClearInitialReader={() => setPendingReaderDeityId(null)}
              onSetCompareIds={handleSetCompareIds}
              onToggleCompareDeity={handleToggleCompareDeity}
              navigate={handleNavigate}
              onJumpToSaga={handleJumpToSaga}
            />
          )}

          {route.page === 'motifs' && (
            <MotifsPage
              key={`motifs-${realm}`}
              pantheonFocus={pantheonFocus}
              activeMotifId={activeMotifId}
              onSelectMotif={setActiveMotifId}
              navigate={handleNavigate}
            />
          )}

          {route.page === 'connections' && (
            <ConnectionsPage
              key={`conn-${realm}-${pantheonFocus}-${connectionEventId ?? 'default'}`}
              pantheonFocus={pantheonFocus}
              onChangePantheonFocus={handleChangePantheonFocus}
              initialPair={connectionPair}
              initialEventId={connectionEventId}
              onSelectPair={setConnectionPair}
              onSelectEventId={setConnectionEventId}
              onJumpToCompareDeities={handleSetCompareIds}
              onJumpToMotif={handleJumpToMotif}
              navigate={handleNavigate}
            />
          )}

          {route.page === 'texts' && (
            <TextsPage
              key={`texts-${realm}-${pantheonFocus}-${textsTraditionFilter ?? 'all'}-${selectedBookId ?? 'default'}`}
              pantheonFocus={pantheonFocus}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              onToggleCompareDeity={handleToggleCompareDeity}
              initialTraditionFilter={
                pantheonFocus !== 'all' ? pantheonFocus : textsTraditionFilter
              }
              initialBookId={selectedBookId}
              onSelectBookId={setSelectedBookId}
              onSelectTraditionFilter={(tid) =>
                setTextsTraditionFilter(tid === 'all' ? undefined : tid)
              }
              navigate={handleNavigate}
              onJumpToCompareDeities={handleSetCompareIds}
              onJumpToMotif={setActiveMotifId}
              onJumpToSaga={handleJumpToSaga}
            />
          )}

          {route.page === 'ascension' && (
            <AscensionGamePage
              key={`game-${realm}-${pantheonFocus}-${effectiveSagaId ?? 'default'}`}
              pantheonFocus={pantheonFocus}
              initialSagaId={effectiveSagaId}
              onSelectSagaId={setSelectedSagaId}
              navigate={handleNavigate}
              onJumpToCompareDeity={handleJumpToCompareDeity}
            />
          )}

          {route.page === 'lineages' && (
            <LineagesPage
              key={`lin-${realm}`}
              pantheonFocus={pantheonFocus}
              selectedTraditionId={
                pantheonFocus !== 'all' ? pantheonFocus : lineageTraditionId
              }
              onSelectTradition={setLineageTraditionId}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              onToggleCompareDeity={handleToggleCompareDeity}
              navigate={handleNavigate}
              onJumpToSaga={handleJumpToSaga}
            />
          )}

          {route.page === 'atlas' && (
            <AtlasPage
              key={`atlas-${realm}-${pantheonFocus}`}
              pantheonFocus={pantheonFocus}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              onToggleCompareDeity={handleToggleCompareDeity}
              onJumpToSaga={handleJumpToSaga}
              navigate={handleNavigate}
            />
          )}

          {route.page === 'learn' && (
            <LearnPage
              key={`learn-${realm}-${pantheonFocus}`}
              pantheonFocus={pantheonFocus}
              studyProgress={studyProgress}
              compareIds={compareIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onJumpCrossRealm={handleJumpCrossRealm}
              onToggleCompareDeity={handleToggleCompareDeity}
              onToggleLessonComplete={handleToggleLessonComplete}
              onMarkFlashcard={handleMarkFlashcard}
              onRecordQuizFinish={handleRecordQuizFinish}
              onRecordEndlessStreak={handleRecordEndlessStreak}
              onJumpToCompareDeities={handleSetCompareIds}
              onJumpToMotif={setActiveMotifId}
              onJumpToSaga={handleJumpToSaga}
              navigate={handleNavigate}
            />
          )}
        </Suspense>
      </AtlasLayout>
    </I18nProvider>
  );
};

export default App;
