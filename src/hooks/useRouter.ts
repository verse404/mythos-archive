import { useCallback, useEffect, useState } from 'react';
import { TRADITION_BY_ID } from '../data/traditions';
import type { PageId, RouteState, TraditionId } from '../types/mythology';
import type { Locale, RealmMode } from '../utils/storage';

const SAFE_SLUG_RE = /^[a-z0-9-]{2,64}$/;

function sanitizeSlug(val: string | null): string | undefined {
  if (!val) return undefined;
  const clean = val.trim().toLowerCase();
  return SAFE_SLUG_RE.test(clean) ? clean : undefined;
}

function sanitizeTradition(val: string | null): TraditionId | undefined {
  const clean = sanitizeSlug(val);
  if (clean && clean in TRADITION_BY_ID) {
    return clean as TraditionId;
  }
  return undefined;
}

function sanitizeLang(val: string | null): Locale | undefined {
  if (!val) return undefined;
  const clean = val.trim().toLowerCase();
  if (clean === 'zh' || clean === 'zh-cn') return 'zh';
  if (clean === 'en') return 'en';
  return undefined;
}

function sanitizeRealm(val: string | null): RealmMode | undefined {
  if (!val) return undefined;
  const clean = val.trim().toLowerCase();
  if (clean === 'bestiary' || clean === 'monsters') return 'bestiary';
  if (clean === 'pantheons' || clean === 'gods') return 'pantheons';
  return undefined;
}

const PANTHEON_SEO: Record<Locale, Record<PageId, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'MYTHOS ARCHIVE — Illuminated Atlas of World Mythologies',
      description:
        'Explore and compare ten major world mythologies across deities, universal narrative motifs, shared roots, sacred texts, D&D apotheosis quests, family lineages, and historical maps.',
    },
    traditions: {
      title: 'World Traditions Encyclopedia — MYTHOS ARCHIVE',
      description:
        'In-depth monographs on Greek, Norse, Egyptian, Hindu, Chinese, Japanese, Mesopotamian, Celtic, Mesoamerican, and Yoruba mythologies.',
    },
    deities: {
      title: 'Deity & Archetype Comparator (80 Gods) — MYTHOS ARCHIVE',
      description:
        'Compare 80 gods, tricksters, wisdom sages, and underworld sovereigns side-by-side across ten global pantheons.',
    },
    motifs: {
      title: 'Parallel Myth & Motif Explorer — MYTHOS ARCHIVE',
      description:
        'Examine creation myths, cosmic floods, underworld descents, fire thefts, dragon battles, and apocalypses across ten world traditions.',
    },
    connections: {
      title: 'Shared Roots, Religion Similarity & Inspiration Timeline — MYTHOS ARCHIVE',
      description:
        'Explore similarities across ten world religions, Proto-Indo-European ancestral mother roots, and a chronological timeline of how elder mythologies inspired later ones.',
    },
    texts: {
      title: 'Sacred Texts, Epics & Mythic References — MYTHOS ARCHIVE',
      description:
        'Explore twenty famous mythological books, epics, clay tablets, codices, and oral canons across ten world traditions.',
    },
    ascension: {
      title: 'Path of Apotheosis D&D Campaign — MYTHOS ARCHIVE',
      description:
        'Visual D&D-style branching d20 campaign across 10 deities and 30 illustrated endings—ascend to godhood or branch into alternate and fallen fates.',
    },
    lineages: {
      title: 'Pantheon Family Trees & Lineages — MYTHOS ARCHIVE',
      description:
        'Interactive multi-generational genealogy and divine relationship graphs for ten world pantheons.',
    },
    atlas: {
      title: 'World Atlas & Historical Timeline — MYTHOS ARCHIVE',
      description:
        'Cartographic explorer of mythological homelands, cultural diffusion pathways, and chronological milestones from 3500 BCE to the present.',
    },
    learn: {
      title: 'Active Learning Studio — MYTHOS ARCHIVE',
      description:
        'Master comparative mythology through structured curricula, archival flip-flashcards, and scholarly quizzes.',
    },
  },
  zh: {
    home: {
      title: '神话典藏馆 MYTHOS ARCHIVE — 世界比较神话图鉴',
      description:
        '探索并比较世界十大神话体系：众神图鉴、平行母题、同源谱系与传承时间线、经典圣典、D&D 封神之路冒险、神族世系树与历史地图。',
    },
    traditions: {
      title: '世界十大神话传统百科 — 神话典藏馆',
      description:
        '深入解读古希腊、北欧、古埃及、印度、中国、日本、美索不达米亚、凯尔特、中美洲与约鲁巴十大神话宇宙观。',
    },
    deities: {
      title: '众神与原型对照仪（80 位神祇） — 神话典藏馆',
      description: '跨十大神话谱系并排比较八十位诸神、诡计引导者、智慧贤者与冥界主宰。',
    },
    motifs: {
      title: '平行神话与母题探索 — 神话典藏馆',
      description: '对照创世神话、大洪水、冥界下行、盗火、屠龙与末世重生等世界共通母题。',
    },
    connections: {
      title: '同源根脉、宗教相似度与启发时间线 — 神话典藏馆',
      description:
        '探索世界十大宗教神话之间的相似度矩阵、原始印欧等共同母源，以及跨越五千年的历史传承与相互启发时间线。',
    },
    texts: {
      title: '神圣经典、史诗与抄本 — 神话典藏馆',
      description: '阅览二十部传世神话史诗、泥板文书、纸草卷、树皮折本与活态口传法典。',
    },
    ascension: {
      title: '封神之路 D&D 分支战役 — 神话典藏馆',
      description: '畅玩十大神话谱系 D&D 二十面骰分支冒险，解锁三十种插画结局。',
    },
    lineages: {
      title: '众神世系树与血脉图谱 — 神话典藏馆',
      description: '交互式四代神谱与亲缘、盟誓、宿敌关系网络图。',
    },
    atlas: {
      title: '世界神话地图与历史年表 — 神话典藏馆',
      description: '探索十大神话发源地、五大文化传播走廊与自公元前3500年至今的历史里程碑。',
    },
    learn: {
      title: '研习工坊与比较神话测验 — 神话典藏馆',
      description: '通过专题课程、翻转视觉闪卡与比较神话测验巩固所学。',
    },
  },
};

const BESTIARY_SEO: Record<Locale, Record<PageId, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'MYTHOS BESTIARY — World Monsters & Mythological Creatures Atlas',
      description:
        'Explore 120 iconic dragons, chimeras, underworld hounds, sacred beasts, and yokai across ten world religions—with radar comparisons, origins, D&D monster hunts, and habitat maps.',
    },
    traditions: {
      title: '10 World Monster & Bestiary Traditions — MYTHOS BESTIARY',
      description:
        'Explore how ten civilizations imagined dragons, chaos serpents, auspicious beasts, demons, and shapeshifters across sky, wilderness, and underworld.',
    },
    deities: {
      title: 'Monster & Creature Comparator (120 Beasts) — MYTHOS BESTIARY',
      description:
        'Compare 120 legendary monsters, dragons, chimeras, and sacred beasts side-by-side with a five-axis threat & omen radar.',
    },
    motifs: {
      title: 'Parallel Monster & Creature Motifs — MYTHOS BESTIARY',
      description:
        'Compare world-serpents, nine-headed hydras, underworld hounds, sacred hybrids, fox-spirits, and apocalypse beasts across cultures.',
    },
    connections: {
      title: 'Monster Roots, Evolution & Similarity Timeline — MYTHOS BESTIARY',
      description:
        'Trace how dragon, sphinx, chimera, naga, and nine-tailed fox lore migrated and evolved across ancient civilizations.',
    },
    texts: {
      title: 'Bestiary Scrolls, Monster Epics & Grimoires — MYTHOS BESTIARY',
      description:
        'Inspect Shanhaijing, Enuma Elish, Astika Parva, Hesiod’s Monster Catalogue, and canonical bestiary texts.',
    },
    ascension: {
      title: 'D&D Monster Hunt & Beast-Pact Campaigns — MYTHOS BESTIARY',
      description:
        'Battle, bind, or forge forbidden pacts with 10 legendary monsters across 30 branching D&D d20 endings.',
    },
    lineages: {
      title: 'Monster Broods & Progenitor Trees — MYTHOS BESTIARY',
      description:
        'Interactive genealogy graphs of Echidna & Typhon’s brood, Loki’s children, Tiamat’s eleven monsters, and global creature lineages.',
    },
    atlas: {
      title: 'World Monster Habitat Map & Migration Corridors — MYTHOS BESTIARY',
      description:
        'Cartographic explorer of monster lairs, creature lore diffusion routes, and bestiary milestones.',
    },
    learn: {
      title: 'Monsterology & Bestiary Study Studio — MYTHOS BESTIARY',
      description:
        'Master world monsterology through comparative seminars, creature flashcards, and bestiary quizzes.',
    },
  },
  zh: {
    home: {
      title: '山海万象·神话异兽志 — 世界怪物与神兽比较图鉴',
      description:
        '跨越世界十大宗教神话，探索一百二十尊灭世巨龙、奇美拉、地狱恶犬、山海瑞兽与幻形大妖：五维战力雷达、同源演化、D&D 猎魔奇谭与栖息地图。',
    },
    traditions: {
      title: '世界十大异兽与精怪传统 — 神话异兽志',
      description: '深入解读希腊魔物、北欧末世巨兽、山海经瑞兽凶兽、日本百鬼妖灵等十大异兽生态谱系。',
    },
    deities: {
      title: '神怪异兽并排对照仪（120 尊异兽） — 神话异兽志',
      description: '并排比较一百二十尊世界著名巨龙、魔兽、冥犬与瑞兽，附五维凶煞与祥瑞雷达图。',
    },
    motifs: {
      title: '平行异兽母题探索 — 神话异兽志',
      description: '对照环世巨蛇、多头妖蛇、冥门恶犬、神圣奇美拉、九尾幻妖与末世灾兽六大母题。',
    },
    connections: {
      title: '异兽同源演化与跨文明传播时间线 — 神话异兽志',
      description: '追溯印欧屠龙母题、斯芬克斯与奇美拉海道传播、印度那伽化龙及山海经九尾狐东传日本的历史脉络。',
    },
    texts: {
      title: '传世异兽志、博物卷轴与降魔史诗 — 神话异兽志',
      description: '展阅《山海经》、赫西俄德魔物谱、提亚马特十一魔兽泥板等十部传世异兽原典。',
    },
    ascension: {
      title: 'D&D 猎魔讨伐与驭兽盟约战役 — 神话异兽志',
      description: '迎战九头蛇、芬里尔、八岐大蛇、饕餮与九尾狐，投掷 d20 解锁三十种讨伐、驭兽或吞噬结局。',
    },
    lineages: {
      title: '魔物血脉与异兽世系树 — 神话异兽志',
      description: '交互式探索堤丰与厄喀德那魔裔、洛基三魔子、提亚马特群魔等十大家族谱系。',
    },
    atlas: {
      title: '世界异兽栖息地图与传播走廊 — 神话异兽志',
      description: '探索十大异兽巢穴地理、五条神兽传说迁徙走廊与历史节点。',
    },
    learn: {
      title: '异兽学研习工坊与测验 — 神话异兽志',
      description: '通过异兽学专题课、神怪翻转闪卡与问答测验掌握全球神话生物谱系。',
    },
  },
};

export function parseLocation(pathname: string, search = ''): RouteState {
  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);

  const params = new URLSearchParams(search);
  const pantheonFocus = sanitizeTradition(params.get('pantheon'));
  const lang = sanitizeLang(params.get('lang'));
  const realm = sanitizeRealm(params.get('realm'));

  if (segments.length === 0) {
    return { page: 'home', realm, lang, pantheonFocus };
  }

  const first = segments[0].toLowerCase();
  if (first === 'traditions') {
    const maybeSlug = sanitizeTradition(segments[1] ?? null);
    return maybeSlug
      ? { page: 'traditions', realm, lang, traditionSlug: maybeSlug, pantheonFocus }
      : { page: 'traditions', realm, lang, pantheonFocus };
  }

  if (first === 'deities') {
    const rawCompare = params.get('compare');
    const compareIds = rawCompare
      ? rawCompare
          .split(',')
          .map((s) => sanitizeSlug(s))
          .filter((s): s is string => Boolean(s))
          .slice(0, 4)
      : undefined;
    return {
      page: 'deities',
      realm,
      lang,
      pantheonFocus,
      compareIds: compareIds && compareIds.length >= 2 ? compareIds : undefined,
    };
  }

  if (first === 'motifs') {
    return {
      page: 'motifs',
      realm,
      lang,
      pantheonFocus,
      motifId: sanitizeSlug(params.get('motif')),
    };
  }

  if (first === 'connections') {
    const rawPair = params.get('pair');
    let connectionPair: [TraditionId, TraditionId] | undefined;
    if (rawPair) {
      const parts = rawPair.split(',');
      const a = sanitizeTradition(parts[0] ?? null);
      const b = sanitizeTradition(parts[1] ?? null);
      if (a && b && a !== b) {
        connectionPair = [a, b];
      }
    }
    return {
      page: 'connections',
      realm,
      lang,
      pantheonFocus,
      connectionPair,
      connectionEventId: sanitizeSlug(params.get('event')),
    };
  }

  if (first === 'texts') {
    return {
      page: 'texts',
      realm,
      lang,
      pantheonFocus,
      bookId: sanitizeSlug(params.get('book')),
      textsTradition: sanitizeTradition(params.get('tradition')),
    };
  }

  if (first === 'ascension') {
    return {
      page: 'ascension',
      realm,
      lang,
      pantheonFocus,
      sagaId: sanitizeSlug(params.get('saga')),
    };
  }

  if (first === 'lineages') {
    return {
      page: 'lineages',
      realm,
      lang,
      pantheonFocus,
      lineageTradition: sanitizeTradition(params.get('tradition')),
    };
  }

  if (first === 'atlas') return { page: 'atlas', realm, lang, pantheonFocus };
  if (first === 'learn') return { page: 'learn', realm, lang, pantheonFocus };

  return { page: 'home', realm, lang, pantheonFocus };
}

export function buildUrl(route: RouteState): string {
  const params = new URLSearchParams();
  if (route.realm === 'bestiary') {
    params.set('realm', 'bestiary');
  }
  if (route.lang === 'zh') {
    params.set('lang', 'zh');
  }
  if (route.pantheonFocus) {
    params.set('pantheon', route.pantheonFocus);
  }

  let basePath = route.page === 'home' ? '/' : `/${route.page}`;
  if (route.page === 'traditions' && route.traditionSlug) {
    basePath = `/traditions/${route.traditionSlug}`;
  }

  if (route.page === 'deities' && route.compareIds && route.compareIds.length >= 2) {
    params.set('compare', route.compareIds.slice(0, 4).join(','));
  } else if (route.page === 'motifs' && route.motifId) {
    params.set('motif', route.motifId);
  } else if (route.page === 'connections') {
    if (route.connectionPair && route.connectionPair[0] !== route.connectionPair[1]) {
      params.set('pair', `${route.connectionPair[0]},${route.connectionPair[1]}`);
    }
    if (route.connectionEventId) {
      params.set('event', route.connectionEventId);
    }
  } else if (route.page === 'texts') {
    if (route.bookId) params.set('book', route.bookId);
    if (route.textsTradition) params.set('tradition', route.textsTradition);
  } else if (route.page === 'ascension' && route.sagaId) {
    params.set('saga', route.sagaId);
  } else if (route.page === 'lineages' && route.lineageTradition) {
    params.set('tradition', route.lineageTradition);
  }

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function syncUrlQuery(route: RouteState): void {
  const nextUrl = buildUrl(route);
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
}

export async function copyShareableUrl(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}

export function useRouter(locale: Locale = 'en', realm: RealmMode = 'pantheons') {
  const [route, setRoute] = useState<RouteState>(() =>
    parseLocation(window.location.pathname, window.location.search)
  );

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseLocation(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const seoCatalog = realm === 'bestiary' ? BESTIARY_SEO : PANTHEON_SEO;
    const seo = seoCatalog[locale][route.page];
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', seo.description);
    }
  }, [locale, realm, route]);

  const navigate = useCallback((next: RouteState) => {
    const nextUrl = buildUrl(next);
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (currentUrl !== nextUrl) {
      window.history.pushState(null, '', nextUrl);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}
