import type { ArchetypeId, Deity, LineageNode, PageId, TraditionId } from '../types/mythology';
import type { RealmMode } from '../utils/storage';

export const TRADITION_PLATE: Record<TraditionId, string> = {
  greek: '/plates/trad-greek.webp',
  norse: '/plates/trad-norse.webp',
  egyptian: '/plates/trad-egyptian.webp',
  hindu: '/plates/trad-hindu.webp',
  chinese: '/plates/trad-chinese.webp',
  japanese: '/plates/trad-japanese.webp',
  mesopotamian: '/plates/trad-mesopotamian.webp',
  celtic: '/plates/trad-celtic.webp',
  mesoamerican: '/plates/trad-mesoamerican.webp',
  yoruba: '/plates/trad-yoruba.webp',
};

export const PORTAL_PLATE: Record<Exclude<PageId, 'home'>, string> = {
  traditions: '/plates/portals/portal-traditions.webp',
  deities: '/plates/portals/portal-deities.webp',
  motifs: '/plates/portals/portal-motifs.webp',
  connections: '/plates/portals/portal-connections.webp',
  texts: '/plates/portals/portal-texts.webp',
  ascension: '/plates/portals/portal-ascension.webp',
  lineages: '/plates/portals/portal-lineages.webp',
  atlas: '/plates/portals/portal-atlas.webp',
  learn: '/plates/portals/portal-learn.webp',
};

export function getBrandEmblem(realm: RealmMode = 'pantheons'): string {
  return realm === 'bestiary'
    ? '/plates/bestiary/bestiary-emblem.webp'
    : '/plates/celestial-compass.webp';
}

export function getTraditionPlate(tradId: TraditionId, realm: RealmMode = 'pantheons'): string {
  if (realm === 'bestiary') {
    return `/plates/bestiary/traditions/trad-${tradId}.webp`;
  }
  return TRADITION_PLATE[tradId];
}

export function getPortalPlate(
  pageId: Exclude<PageId, 'home'>,
  realm: RealmMode = 'pantheons'
): string {
  if (realm === 'bestiary') {
    return `/plates/bestiary/portals/portal-${pageId}.webp`;
  }
  return PORTAL_PLATE[pageId];
}

// Dedicated 4:5 (800x1000) portrait for every deity or monster
export function getDeityPortrait(deityId: string): string {
  return `/plates/deities/${deityId}.webp`;
}

// Dedicated 4:5 (800x1000) portrait for every single lineage node across all 10 trees
export function getLineageNodePortrait(
  node: LineageNode,
  realm: RealmMode = 'pantheons'
): string {
  if (node.deityId) {
    return `/plates/deities/${node.deityId}.webp`;
  }
  if (realm === 'bestiary') {
    return `/plates/bestiary/lineage/${node.id}.webp`;
  }
  return `/plates/lineage/${node.id}.webp`;
}

const BESTIARY_MOTIF_IDS = new Set([
  'sea-leviathan',
  'multi-headed',
  'hell-hounds',
  'sacred-chimeras',
  'shapeshifters',
  'apocalypse-beasts',
]);

// Dedicated 16:10 (960x600) scene plate for every specific cultural retelling of a motif
export function getRetellingPlate(motifId: string, traditionId: TraditionId): string {
  if (BESTIARY_MOTIF_IDS.has(motifId)) {
    return `/plates/bestiary/retellings/${motifId}-${traditionId}.webp`;
  }
  return `/plates/retellings/${motifId}-${traditionId}.webp`;
}

// Dedicated 16:10 (960x600) plate for every diffusion route and historical milestone
export function getAtlasPlate(id: string, realm: RealmMode = 'pantheons'): string {
  if (realm === 'bestiary') {
    return `/plates/bestiary/atlas/${id}.webp`;
  }
  return `/plates/atlas/${id}.webp`;
}

// Exact subject-matched 16:10 scene plate for every Flashcard
export const FLASHCARD_PLATE: Record<string, string> = {
  'fc-01': '/plates/atlas/pie-continuum.webp',
  'fc-02': '/plates/atlas/ms-book-dead.webp',
  'fc-03': '/plates/trad-japanese.webp',
  'fc-04': '/plates/atlas/atlantic-orisha-diaspora.webp',
  'fc-05': '/plates/retellings/great-deluge-chinese.webp',
  'fc-06': '/plates/retellings/theft-of-fire-mesopotamian.webp',
  'fc-07': '/plates/retellings/theft-of-fire-norse.webp',
  'fc-08': '/plates/retellings/cosmogony-mesoamerican.webp',
  'fc-09': '/plates/trad-celtic.webp',
  'fc-10': '/plates/retellings/chaoskampf-hindu.webp',
  'fc-11': '/plates/retellings/katabasis-japanese.webp',
  'fc-12': '/plates/retellings/chaoskampf-egyptian.webp',
  'fc-13': '/plates/atlas/ms-ile-ife.webp',
  'fc-14': '/plates/trad-chinese.webp',
  'fc-15': '/plates/retellings/eschatology-mesoamerican.webp',
  'fc-16': '/plates/atlas/ms-irish-mss.webp',
};

export const BESTIARY_FLASHCARD_PLATE: Record<string, string> = {
  'fc-01': '/plates/bestiary/connections/root-pie-dragons.webp',
  'fc-02': '/plates/bestiary/retellings/hell-hounds-egyptian.webp',
  'fc-03': '/plates/bestiary/game/orochi-tail-sword.webp',
  'fc-04': '/plates/bestiary/retellings/sea-leviathan-yoruba.webp',
  'fc-05': '/plates/bestiary/retellings/sea-leviathan-chinese.webp',
  'fc-06': '/plates/bestiary/retellings/sacred-chimeras-mesopotamian.webp',
  'fc-07': '/plates/bestiary/game/fenrir-gleipnir.webp',
  'fc-08': '/plates/bestiary/retellings/multi-headed-mesoamerican.webp',
  'fc-09': '/plates/bestiary/retellings/hell-hounds-celtic.webp',
  'fc-10': '/plates/bestiary/retellings/sacred-chimeras-hindu.webp',
  'fc-11': '/plates/bestiary/retellings/shapeshifters-japanese.webp',
  'fc-12': '/plates/bestiary/retellings/apocalypse-beasts-egyptian.webp',
  'fc-13': '/plates/bestiary/game/oshumare-crown.webp',
  'fc-14': '/plates/bestiary/retellings/sacred-chimeras-chinese.webp',
  'fc-15': '/plates/bestiary/retellings/hell-hounds-mesoamerican.webp',
  'fc-16': '/plates/bestiary/retellings/apocalypse-beasts-celtic.webp',
};

// Exact subject-matched 16:10 scene plate for every Quiz Question
export const QUIZ_PLATE: Record<string, string> = {
  'qz-01': '/plates/atlas/atlantic-orisha-diaspora.webp',
  'qz-02': '/plates/retellings/great-deluge-chinese.webp',
  'qz-03': '/plates/retellings/cosmogony-norse.webp',
  'qz-04': '/plates/retellings/katabasis-japanese.webp',
  'qz-05': '/plates/retellings/chaoskampf-egyptian.webp',
  'qz-06': '/plates/atlas/silk-road-east-asia.webp',
  'qz-07': '/plates/retellings/cosmogony-mesoamerican.webp',
  'qz-08': '/plates/trad-japanese.webp',
  'qz-09': '/plates/retellings/eschatology-celtic.webp',
  'qz-10': '/plates/retellings/cosmogony-yoruba.webp',
  'qz-11': '/plates/retellings/katabasis-mesopotamian.webp',
  'qz-12': '/plates/retellings/eschatology-norse.webp',
};

export const BESTIARY_QUIZ_PLATE: Record<string, string> = {
  'qz-01': '/plates/bestiary/retellings/sea-leviathan-yoruba.webp',
  'qz-02': '/plates/bestiary/retellings/sea-leviathan-chinese.webp',
  'qz-03': '/plates/bestiary/retellings/hell-hounds-norse.webp',
  'qz-04': '/plates/bestiary/retellings/multi-headed-japanese.webp',
  'qz-05': '/plates/bestiary/retellings/hell-hounds-egyptian.webp',
  'qz-06': '/plates/bestiary/books/bst-shan-hai-jing.webp',
  'qz-07': '/plates/bestiary/retellings/multi-headed-mesoamerican.webp',
  'qz-08': '/plates/bestiary/retellings/apocalypse-beasts-japanese.webp',
  'qz-09': '/plates/bestiary/retellings/apocalypse-beasts-celtic.webp',
  'qz-10': '/plates/bestiary/retellings/sacred-chimeras-yoruba.webp',
  'qz-11': '/plates/bestiary/retellings/apocalypse-beasts-mesopotamian.webp',
  'qz-12': '/plates/bestiary/game/tiamat-ishtar.webp',
};

export function getFlashcardPlate(cardId: string, realm: RealmMode = 'pantheons'): string | undefined {
  return realm === 'bestiary' ? BESTIARY_FLASHCARD_PLATE[cardId] : FLASHCARD_PLATE[cardId];
}

export function getQuizPlate(questionId: string, realm: RealmMode = 'pantheons'): string | undefined {
  return realm === 'bestiary' ? BESTIARY_QUIZ_PLATE[questionId] : QUIZ_PLATE[questionId];
}

export const TRADITION_SHORT_HOOK: Record<TraditionId, string> = {
  greek: 'Olympian thunder, tragic hubris, and Delphic fate across the Aegean.',
  norse: 'Nine realms of Yggdrasil, blood-won runes, and valor before Ragnarök.',
  egyptian: 'Ra’s nocturnal barque and hearts weighed in the shadowed Duat.',
  hindu: 'Vast cosmic dissolutions, Dharmic fire, and avatars across Yugas.',
  chinese: 'Pangu’s cleaved abyss, storm-dragons, and Yu’s conquered deluge.',
  japanese: 'Sacred rock-cave dawn, tempest blades, and the sealed pass of Yomi.',
  mesopotamian: 'Abyssal dragon Tiamat, seven underworld gates, and cuneiform decrees.',
  celtic: 'Hollow Otherworld mounds, prophetic battle-crows, and sovereign land.',
  mesoamerican: 'Five cataclysmic Suns, obsidian mirrors, and blood-quickened maize.',
  yoruba: 'Ilé-Ifẹ̀’s golden chain, lightning double-axes, and crossroads Ashe.',
};

export const MOTIF_PLATE: Record<string, string> = {
  cosmogony: '/plates/motif-cosmogony.webp',
  'great-deluge': '/plates/motif-deluge.webp',
  katabasis: '/plates/motif-katabasis.webp',
  'theft-of-fire': '/plates/motif-fire.webp',
  chaoskampf: '/plates/motif-chaoskampf.webp',
  eschatology: '/plates/motif-eschatology.webp',
  'sea-leviathan': '/plates/motif-sea-leviathan.webp',
  'multi-headed': '/plates/motif-multi-headed.webp',
  'hell-hounds': '/plates/motif-hell-hounds.webp',
  'sacred-chimeras': '/plates/motif-sacred-chimeras.webp',
  shapeshifters: '/plates/motif-shapeshifters.webp',
  'apocalypse-beasts': '/plates/motif-apocalypse-beasts.webp',
};

export const MOTIF_SHORT_TAGLINE: Record<string, string> = {
  cosmogony: 'Shattered cosmic eggs, dark waters, and slain giants forged into worlds.',
  'great-deluge': 'Storm-battered arks versus dragon-carved channels when seas swallow earth.',
  katabasis: 'Seven bolted gates, underworld pomegranates, and the fatal backward glance.',
  'theft-of-fire': 'Stolen celestial flame, nine nights on the ash tree, and red-hot iron.',
  chaoskampf: 'Blinding thunderbolts and war-hammers crashing into the abyssal serpent.',
  eschatology: 'Black solar eclipses and world-fire yielding to a reborn emerald shore.',
};

const ARCHETYPE_BASE_PROFILE: Record<ArchetypeId, [number, number, number, number, number]> = {
  'sky-sovereign': [5, 4, 4, 2, 2],
  'wisdom-order': [3, 5, 2, 3, 3],
  'war-storm': [3, 2, 5, 2, 2],
  'trickster-guide': [2, 4, 3, 5, 3],
  'underworld-ruler': [4, 4, 2, 2, 5],
  'solar-renewal': [4, 3, 3, 2, 5],
};

export const RADAR_AXES = [
  'Sovereignty',
  'Wisdom & Law',
  'Storm & Valor',
  'Liminal Cunning',
  'Renewal & Afterlife',
] as const;

export function getDeityRadarScores(deity: Deity): number[] {
  const base = [...ARCHETYPE_BASE_PROFILE[deity.archetypeId]];
  if (deity.secondaryArchetypeId) {
    const sec = ARCHETYPE_BASE_PROFILE[deity.secondaryArchetypeId];
    for (let i = 0; i < 5; i++) {
      base[i] = Math.min(5, Math.round((base[i] * 0.65 + sec[i] * 0.45) * 10) / 10);
    }
  }
  return base;
}
