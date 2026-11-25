import type { TraditionId } from '../types/mythology';

export type ConnectionKind =
  | 'shared-root'
  | 'direct-inspiration'
  | 'syncretic-exchange'
  | 'independent-parallel';

export interface AncestralRootFamily {
  id: string;
  name: string;
  originEra: string;
  homeland: string;
  platePath: string;
  descendantTraditions: TraditionId[];
  summary: string;
  inheritedTraits: {
    concept: string;
    manifestations: string;
  }[];
  compareDeityIds: string[];
}

export interface InspirationEvent {
  id: string;
  yearSort: number;
  eraLabel: string;
  fromTradition: TraditionId | 'pie-steppe';
  fromLabel: string;
  toTradition: TraditionId;
  toLabel: string;
  kind: 'shared-root' | 'direct-inspiration' | 'syncretic-exchange';
  headline: string;
  historicalChannel: string;
  platePath: string;
  whatWasInspired: {
    sourceElement: string;
    inspiredOutcome: string;
  }[];
  scholarlySummary: string;
  compareDeityIds: string[];
  linkedMotifId: string;
}

export interface PairwiseSimilarity {
  pair: [TraditionId, TraditionId];
  similarityScore: number; // 0..100
  kind: ConnectionKind;
  badgeLabel: string;
  sharedMotherOrVector: string;
  keySimilarities: string[];
  keyDifference: string;
  compareDeityIds: string[];
}

export const ANCESTRAL_ROOT_FAMILIES: AncestralRootFamily[] = [
  {
    id: 'root-pie',
    name: 'Proto-Indo-European (PIE) Mother Tradition',
    originEra: 'c. 4000 – 2500 BCE',
    homeland: 'Pontic-Caspian Steppe (Eurasia)',
    platePath: '/plates/connections/root-pie.webp',
    descendantTraditions: ['hindu', 'greek', 'celtic', 'norse'],
    summary:
      'Comparative linguistics and mythology proved that Vedic India, Greece, Ireland, and Scandinavia did not invent their pantheons in isolation—all four branched from a single Bronze Age Proto-Indo-European ancestral religion, carrying cognate god-names, poetic meters, and dragon-slaying myths thousands of miles apart.',
    inheritedTraits: [
      {
        concept: 'Sky-Father (*Dyēus ph₂tēr)',
        manifestations:
          'Vedic Dyaus Pitar · Greek Zeus Patēr · Roman Iuppiter · Germanic *Tiwaz (Norse Týr)',
      },
      {
        concept: 'Storm-God Slays Serpent (*éghan áhim)',
        manifestations:
          'Indra vs. Vritra · Zeus vs. Typhon · Thor vs. Jörmungandr · Lugh vs. Balor',
      },
      {
        concept: 'Immortal Sacred Draught',
        manifestations:
          'Vedic Soma · Greek Ambrosia & Nectar · Norse Mead of Poetry · Celtic Ale of Goibniu',
      },
      {
        concept: 'Primordial Twin / Giant Dismemberment',
        manifestations:
          'Vedic Purusha / Yama · Norse Ymir · Cosmic Axis Pillar',
      },
    ],
    compareDeityIds: ['indra', 'zeus', 'thor', 'lugh'],
  },
  {
    id: 'root-ane-med',
    name: 'Ancient Near Eastern & East Mediterranean Continuum',
    originEra: 'c. 3500 – 300 BCE',
    homeland: 'Fertile Crescent, Nile Valley & Aegean Sea',
    platePath: '/plates/connections/chain-mesopotamia-greece.webp',
    descendantTraditions: ['mesopotamian', 'egyptian', 'greek'],
    summary:
      'Linked by Levantine trade ports (Ugarit, Byblos, Cyprus, Naukratis) and cuneiform diplomacy, Mesopotamia’s elder urban myths directly seeded Archaic Greek epic and theogony, while Egypt and Greece fused gods in Hellenistic Alexandria.',
    inheritedTraits: [
      {
        concept: 'Three-Generation Sky Succession Myth',
        manifestations:
          'Babylonian/Hurrian Anu → Kumarbi/Enlil → Marduk/Teshub directly inspires Hesiod’s Uranus → Cronus → Zeus',
      },
      {
        concept: 'Queen of Heaven & Dying Consort',
        manifestations:
          'Sumerian Inanna & Dumuzi (Akkadian Ishtar & Tammuz) inspires Phoenician Astarte & Greek Aphrodite & Adonis',
      },
      {
        concept: 'Graeco-Egyptian Hermetic Synthesis',
        manifestations:
          'Egyptian Thoth + Greek Hermes → Hermes Trismegistus; Osiris + Apis → Serapis',
      },
    ],
    compareDeityIds: ['marduk', 'zeus', 'inanna', 'thoth'],
  },
  {
    id: 'root-indo-sinic',
    name: 'Indo-Sinic Silk Road & East Asian Scriptural Sphere',
    originEra: 'c. 100 BCE – 900 CE',
    homeland: ' Oasis Silk Road, Chang’an & Nara Sea-Lanes',
    platePath: '/plates/connections/chain-india-china-japan.webp',
    descendantTraditions: ['hindu', 'chinese', 'japanese'],
    summary:
      'While China and Japan possessed deep indigenous traditions (Shenhua/Daoism and Kami/Shinto), Buddhist transmission carried Indian Vedic deities overland into China and across the sea into Japan—creating a three-civilization chain of transformed gods, hell-judges, and cosmic dragons.',
    inheritedTraits: [
      {
        concept: 'Judge of the Underworld Dead',
        manifestations:
          'Rigvedic Yama → Chinese Yanluo Wang (Ten Courts of Diyu) → Japanese Enma-ō',
      },
      {
        concept: 'Goddess of Eloquence, Rivers & Music',
        manifestations:
          'Vedic Saraswati → Chinese Biancaitian → Japanese Benzaiten (with biwa lute)',
      },
      {
        concept: 'Cosmic Egg & Yin-Yang Opening',
        manifestations:
          'Chinese Pangu (Sanwu Liji) quoted directly at the opening of Japan’s Nihon Shoki (720 CE)',
      },
    ],
    compareDeityIds: ['yama', 'yanluo-wang', 'saraswati', 'sun-wukong'],
  },
  {
    id: 'root-autonomous-continents',
    name: 'Autonomous Mesoamerican & West African Cradle Traditions',
    originEra: 'c. 1500 BCE – Present',
    homeland: 'Anahuac / Maya Lowlands & Yorubaland / Atlantic World',
    platePath: '/plates/connections/chain-yoruba-atlantic.webp',
    descendantTraditions: ['mesoamerican', 'yoruba'],
    summary:
      'Developed completely independently of Eurasian Bronze Age empires, Mesoamerica (Olmec → Maya → Teotihuacan → Aztec) and West Africa (Ilé-Ifẹ̀ → Oyo → Trans-Atlantic Orisha diaspora) prove both powerful internal regional inheritance AND astonishing human psychological convergence with Old World myths.',
    inheritedTraits: [
      {
        concept: 'Internal Mesoamerican Inheritance',
        manifestations:
          'Classic Maya Q’uq’umatz / Kukulkan & Teotihuacan’s Feathered Serpent inspire Aztec Quetzalcoatl',
      },
      {
        concept: 'Living Atlantic Orisha Lineage',
        manifestations:
          'Ilé-Ifẹ̀ & Oyo Orishas (Shango, Oshun, Oya, Eshu) inspire Cuban Lucumí, Brazilian Candomblé, and Trinidad Shango',
      },
      {
        concept: 'Independent Archetypal Convergence',
        manifestations:
          'Zero pre-1492 contact with Eurasia, yet shared Cosmic Floods, Underworld Twin Trials, and Four-Quarter World Trees',
      },
    ],
    compareDeityIds: ['quetzalcoatl', 'shango', 'eshu', 'hermes'],
  },
];

export const INSPIRATION_TIMELINE: InspirationEvent[] = [
  {
    id: 'insp-pie-dispersal',
    yearSort: -3300,
    eraLabel: 'c. 3500 – 2000 BCE',
    fromTradition: 'pie-steppe',
    fromLabel: 'Proto-Indo-European Steppe',
    toTradition: 'hindu',
    toLabel: 'Vedic, Greek, Celtic & Norse Branches',
    kind: 'shared-root',
    headline: 'One Steppe Mother Tongue Splits Into Four Mythologies',
    historicalChannel: 'Bronze Age chariot & pastoralist migrations into India, Aegean, Gaul & Scandinavia',
    platePath: '/plates/connections/root-pie.webp',
    whatWasInspired: [
      {
        sourceElement: '*Dyēus ph₂tēr ("Daylight-Sky Father")',
        inspiredOutcome: 'Vedic Dyaus Pitar, Greek Zeus Patēr, and Germanic Týr',
      },
      {
        sourceElement: 'Heroic Dragon-Slaying Formula (*éghan áhim)',
        inspiredOutcome: 'Indra slaying Vritra, Thor battling Jörmungandr, and Lugh felling Balor',
      },
    ],
    scholarlySummary:
      'Explains why a Norse skald in Iceland and a Vedic rishi on the Sarasvati both sang of a thunder-wielding champion battling a world-encircling serpent and gods drinking an immortalizing fermented draught.',
    compareDeityIds: ['indra', 'zeus', 'thor', 'lugh'],
    linkedMotifId: 'chaoskampf',
  },
  {
    id: 'insp-meso-greek',
    yearSort: -750,
    eraLabel: 'c. 800 – 700 BCE (Orientalizing Era)',
    fromTradition: 'mesopotamian',
    fromLabel: 'Mesopotamian (Babylon & Levant)',
    toTradition: 'greek',
    toLabel: 'Archaic Greek (Hesiod & Homer)',
    kind: 'direct-inspiration',
    headline: 'Mesopotamian Ziggurat Epics Inspire Hesiod’s Greek Theogony',
    historicalChannel: 'Phoenician & Cypriot maritime trade + Hurrian-Hittite Anatolian intermediaries',
    platePath: '/plates/connections/chain-mesopotamia-greece.webp',
    whatWasInspired: [
      {
        sourceElement: 'Anu → Kumarbi/Enlil → Storm-God / Marduk succession',
        inspiredOutcome: 'Hesiod’s Uranus → Cronus → Zeus sky-kingship succession in Theogony',
      },
      {
        sourceElement: 'Inanna-Ishtar (Queen of Love & War) & Dumuzi',
        inspiredOutcome: 'Cyprus-born Aphrodite & the annual mourning of Adonis; Flood Ark of Utnapishtim → Deucalion',
      },
    ],
    scholarlySummary:
      'Walter Burkert and Martin West demonstrated that Archaic Greece underwent an "Orientalizing Revolution": Greek poets adapted Near Eastern kingship-in-heaven and deluge narratives into hexameter verse.',
    compareDeityIds: ['marduk', 'zeus', 'inanna', 'ereshkigal'],
    linkedMotifId: 'great-deluge',
  },
  {
    id: 'insp-egypt-greek',
    yearSort: -320,
    eraLabel: 'c. 650 – 30 BCE (Naukratis to Alexandria)',
    fromTradition: 'egyptian',
    fromLabel: 'Ancient Egyptian',
    toTradition: 'greek',
    toLabel: 'Classical & Hellenistic Greek',
    kind: 'syncretic-exchange',
    headline: 'Egyptian Temple Wisdom & Greek Gods Fuse Along the Nile',
    historicalChannel: 'Greek trading port at Naukratis, Herodotus Book II & Ptolemaic Alexandria',
    platePath: '/plates/connections/chain-egypt-greece.webp',
    whatWasInspired: [
      {
        sourceElement: 'Thoth (Ibis Scribe of Sacred Magic) + Greek Hermes',
        inspiredOutcome: 'Hermes Trismegistus ("Thrice-Great Hermes") & the Hermetic philosophical corpus',
      },
      {
        sourceElement: 'Osiris & Isis Mysteries of Resurrection',
        inspiredOutcome: 'Pan-Mediterranean Isis temples from Athens and Delos to Pompeii and Londinium',
      },
    ],
    scholarlySummary:
      'Greeks revered Egypt as humanity’s eldest sanctuary of sacred memory, equating Amun with Zeus, Osiris with Dionysus/Hades, and Thoth with Hermes in active two-way temple syncretism.',
    compareDeityIds: ['thoth', 'hermes', 'osiris', 'hades'],
    linkedMotifId: 'katabasis',
  },
  {
    id: 'insp-india-china',
    yearSort: 250,
    eraLabel: 'c. 100 – 700 CE (Han to Tang Silk Road)',
    fromTradition: 'hindu',
    fromLabel: 'Indian Vedic & Buddhist Lore',
    toTradition: 'chinese',
    toLabel: 'Chinese (Shenhua & Daoist-Buddhist)',
    kind: 'direct-inspiration',
    headline: 'Silk Road Caravans Transform Vedic Yama & Nāgas in China',
    historicalChannel: 'Dunhuang & Tarim Basin Buddhist translators (Kumārajīva, Xuanzang) & Journey to the West',
    platePath: '/plates/connections/chain-india-china-japan.webp',
    whatWasInspired: [
      {
        sourceElement: 'Rigvedic Yama (First Mortal & Lord of Ancestors)',
        inspiredOutcome: 'Chinese Yanluo Wang presiding over bureaucratic Ten Courts of Diyu',
      },
      {
        sourceElement: 'Indian Nāga Serpent-Kings & Vanara Hero Hanuman',
        inspiredOutcome: 'Ocean Dragon-Kings (Ao Guang) & cross-pollination into Wu Cheng’en’s Sun Wukong',
      },
    ],
    scholarlySummary:
      'Rather than erasing indigenous Chinese Daoist deities like the Jade Emperor or Nuwa, Indian Buddhist cosmology merged seamlessly with Chinese imperial bureaucracy—creating East Asia’s richest literary mythology.',
    compareDeityIds: ['yama', 'yanluo-wang', 'indra', 'sun-wukong'],
    linkedMotifId: 'theft-of-fire',
  },
  {
    id: 'insp-china-japan',
    yearSort: 712,
    eraLabel: 'c. 550 – 800 CE (Asuka & Nara Periods)',
    fromTradition: 'chinese',
    fromLabel: 'Chinese (and Indian via Tang China)',
    toTradition: 'japanese',
    toLabel: 'Japanese (Kojiki, Nihon Shoki & Kami-Buddha)',
    kind: 'direct-inspiration',
    headline: 'Chinese Script, Yin-Yang Cosmogony & Dharma Shape Early Japan',
    historicalChannel: 'Sui/Tang embassies, Korean Paekche scribes & Imperial Court compilation (712–720 CE)',
    platePath: '/plates/connections/chain-india-china-japan.webp',
    whatWasInspired: [
      {
        sourceElement: 'Chinese Pangu Cosmic-Egg & Clear/Turbid Qi separation',
        inspiredOutcome: 'Quoted verbatim in the opening lines of Japan’s Nihon Shoki (720 CE)',
      },
      {
        sourceElement: 'Chinese Yanluo Wang & Indian Saraswati / Indra',
        inspiredOutcome: 'Japanese Enma-ō (Judge of Jigoku), Benzaiten, and Taishakuten alongside native Kami',
      },
    ],
    scholarlySummary:
      'Japan preserved fierce devotion to indigenous Shinto Kami (Amaterasu, Susanoo, Izanami) while adopting Chinese writing and Shinbutsu-shūgō (Kami-Buddha harmonization) for over a millennium.',
    compareDeityIds: ['nuwa', 'amaterasu', 'yanluo-wang', 'izanami'],
    linkedMotifId: 'cosmogony',
  },
  {
    id: 'insp-maya-aztec',
    yearSort: 1325,
    eraLabel: 'c. 200 – 1521 CE (Classic to Postclassic)',
    fromTradition: 'mesoamerican',
    fromLabel: 'Olmec, Classic Maya & Teotihuacan',
    toTradition: 'mesoamerican',
    toLabel: 'Postclassic Nahua / Aztec Synthesis',
    kind: 'direct-inspiration',
    headline: 'Teotihuacan Ruins & Maya Plumed Serpent Inspire Aztec Tenochtitlan',
    historicalChannel: 'Toltec & Gulf Coast trade corridors + Aztec royal pilgrimages to ancient Teotihuacan',
    platePath: '/plates/connections/chain-mesoamerica-continuum.webp',
    whatWasInspired: [
      {
        sourceElement: 'Classic Teotihuacan & Maya Q’uq’umatz / Kukulkan',
        inspiredOutcome: 'Aztec Quetzalcoatl (Feathered Serpent of Wind, Maize & Learning)',
      },
      {
        sourceElement: 'Abandoned Giant Pyramids of Teotihuacan (c. 100–600 CE)',
        inspiredOutcome: 'Named by later Aztecs "Where One Becomes a God"—setting of the Fifth Sun myth',
      },
    ],
    scholarlySummary:
      'When the Mexica arrived in the Valley of Mexico centuries after Teotihuacan’s fall, they revered its monumental ruins as the literal birthplace of the Sun and wove earlier Maya-Toltec calendar cycles into their own state myth.',
    compareDeityIds: ['quetzalcoatl', 'tezcatlipoca', 'huitzilopochtli', 'mictlantecuhtli'],
    linkedMotifId: 'eschatology',
  },
  {
    id: 'insp-yoruba-diaspora',
    yearSort: 1700,
    eraLabel: 'c. 1650 – Present (Atlantic Continuity)',
    fromTradition: 'yoruba',
    fromLabel: 'West African Yoruba (Ilé-Ifẹ̀ & Oyo)',
    toTradition: 'yoruba',
    toLabel: 'Global Atlantic Orisha Traditions',
    kind: 'direct-inspiration',
    headline: 'Yoruba Orishas & Ifá Cross the Ocean to Inspire Living New World Religions',
    historicalChannel: 'Unbroken oral memory of Odu Ifá, Oriki praise-poetry, bata rhythms & sacred syncretism',
    platePath: '/plates/connections/chain-yoruba-atlantic.webp',
    whatWasInspired: [
      {
        sourceElement: 'Shango, Oshun, Oya, Obatala, Eshu & Orunmila of Yorubaland',
        inspiredOutcome: 'Cuban Regla de Ocha (Lucumí/Santería), Brazilian Candomblé Ketu & Trinidad Shango',
      },
      {
        sourceElement: '256 Odu Ifá Binary Geomantic Corpus',
        inspiredOutcome: 'UNESCO-recognized living divinatory & philosophical canon practiced across four continents',
      },
    ],
    scholarlySummary:
      'Despite the immense trauma of the Middle Passage, Yoruba practitioners preserved intricate cosmological theology, rhythms, and ethics intact—creating one of modern history’s most vibrant global religious lineages.',
    compareDeityIds: ['shango', 'oya', 'oshun', 'orunmila'],
    linkedMotifId: 'cosmogony',
  },
];

export const CURATED_PAIRWISE_CONNECTIONS: PairwiseSimilarity[] = [
  {
    pair: ['greek', 'hindu'],
    similarityScore: 86,
    kind: 'shared-root',
    badgeLabel: 'Same Mother Religion (Proto-Indo-European)',
    sharedMotherOrVector: 'Descended from Proto-Indo-European Steppe Religion (c. 3500 BCE) + Hellenistic Indo-Greek contact',
    keySimilarities: [
      'Cognate Sky-Father names: Greek Zeus Patēr = Vedic Dyaus Pitar (*Dyēus ph₂tēr)',
      'Thunderbolt-wielding Storm King slaying a monstrous serpent (Zeus vs. Typhon / Indra vs. Vritra)',
      'Immortalizing divine elixir (Ambrosia vs. Soma/Amrita) guarded from rival titans/Asuras',
    ],
    keyDifference:
      'Greek myth operates along a linear generational timeline culminating in Zeus’s permanent rule, whereas Hindu myth unfolds across vast cyclical Mahayugas and Kalpas of dissolution and rebirth.',
    compareDeityIds: ['zeus', 'indra', 'hades', 'yama'],
  },
  {
    pair: ['norse', 'hindu'],
    similarityScore: 81,
    kind: 'shared-root',
    badgeLabel: 'Same Mother Religion (Proto-Indo-European)',
    sharedMotherOrVector: 'Shared Proto-Indo-European Steppe Ancestry',
    keySimilarities: [
      'Cosmos fashioned by dismembering a primordial giant (Norse Ymir = Vedic Purusha)',
      'Storm champion battling the world-serpent (Thor vs. Jörmungandr = Indra vs. Vritra)',
      'Cyclical world-destruction by fire and flood followed by a renewed earth (Ragnarök vs. Pralaya)',
    ],
    keyDifference:
      'Norse gods themselves are mortal and perish heroically at Ragnarök, whereas Brahman/Vishnu/Shiva transcend cosmic dissolutions eternally.',
    compareDeityIds: ['thor', 'indra', 'odin', 'shiva'],
  },
  {
    pair: ['norse', 'celtic'],
    similarityScore: 84,
    kind: 'shared-root',
    badgeLabel: 'Indo-European Sisters + Viking/Insular Contact',
    sharedMotherOrVector: 'Shared Indo-European heritage + 9th–11th c. CE Norse-Irish Sea interaction',
    keySimilarities: [
      'Battlefield goddesses associated with ravens, prophecy, and fate (Celtic Morrígan vs. Norse Valkyries/Freyja)',
      'Climactic cosmic war between divine tribe and chaotic giant-kin (Tuatha Dé vs. Fomorians / Aesir vs. Jötnar)',
      'Sacred cauldrons/wells restoring slain warriors and gifting poetic inspiration',
    ],
    keyDifference:
      'Celtic Otherworld (Tir na nÓg / Annwn) shimmers parallel to green earth inside mounds and western islands rather than ending in a single fiery Götterdämmerung.',
    compareDeityIds: ['lugh', 'odin', 'morrigan', 'thor'],
  },
  {
    pair: ['greek', 'norse'],
    similarityScore: 83,
    kind: 'shared-root',
    badgeLabel: 'Same Mother Religion (Proto-Indo-European)',
    sharedMotherOrVector: 'Shared Proto-Indo-European root + Classical influence on medieval Icelandic scribes',
    keySimilarities: [
      'Three-generation overthrow of elder giants/Titans (Uranus/Cronus/Zeus vs. Ymir/Borr/Odin)',
      'Three fate-weaving sisters whom even sovereign gods cannot overrule (Moirai vs. Norns)',
      'Cunning boundary-crossing trickster testing the court of gods (Hermes/Prometheus vs. Loki)',
    ],
    keyDifference:
      'Zeus secures unassailable immortal order atop sunlit Olympus, whereas Odin sacrifices his eye preparing anxiously for inevitable winter and Ragnarök.',
    compareDeityIds: ['zeus', 'odin', 'hermes', 'loki'],
  },
  {
    pair: ['mesopotamian', 'greek'],
    similarityScore: 85,
    kind: 'direct-inspiration',
    badgeLabel: 'Direct Historical Inspiration (Mesopotamia ➔ Greece)',
    sharedMotherOrVector: '8th–7th c. BCE Phoenician, Cypriot & Anatolian transmission into Hesiod & Homer',
    keySimilarities: [
      'Sky-succession epic: Anu → Enlil/Kumarbi → Marduk directly inspires Uranus → Cronus → Zeus',
      'Great Flood sent by divine council with one forewarned ark-builder (Utnapishtim → Deucalion)',
      'Goddess of passionate love & war mourning a seasonal youth (Inanna/Ishtar → Aphrodite & Adonis)',
    ],
    keyDifference:
      'Mesopotamian myth defines humans as clay laborers fashioned to relieve gods of canal-work, while Greek heroic epic centers intense individual kleos (undying glory).',
    compareDeityIds: ['marduk', 'zeus', 'inanna', 'ereshkigal'],
  },
  {
    pair: ['egyptian', 'greek'],
    similarityScore: 79,
    kind: 'syncretic-exchange',
    badgeLabel: 'Centuries of Direct Mediterranean Syncretism',
    sharedMotherOrVector: 'Naukratis trade (650 BCE) through Ptolemaic Alexandria (305–30 BCE)',
    keySimilarities: [
      'Scribe/messenger guide of souls & sacred letters fused directly into Hermes Trismegistus (Thoth + Hermes)',
      'Underworld judgment of moral conduct determining blessed afterlife (Field of Reeds vs. Elysium)',
      'Mystery cults of death and rebirth (Osiris/Isis alongside Eleusinian Demeter/Persephone)',
    ],
    keyDifference:
      'Egyptian gods frequently manifest in zoomorphic (ibis, falcon, jackal) icons upholding unchanging Ma’at, whereas Greek gods are strictly anthropomorphic and dramatic.',
    compareDeityIds: ['thoth', 'hermes', 'osiris', 'hades'],
  },
  {
    pair: ['hindu', 'chinese'],
    similarityScore: 78,
    kind: 'direct-inspiration',
    badgeLabel: 'Direct Silk Road Transmission (India ➔ China)',
    sharedMotherOrVector: '1st–8th c. CE Buddhist Silk Road translations fusing with Daoist & folk Shenhua',
    keySimilarities: [
      'Vedic Yama directly inspired Chinese Yanluo Wang as supreme judge of the dead',
      'Indian Nāga rain-serpent lore blended with Chinese Long Dragon-Kings of the Four Seas',
      'Cosmic mountain axis (Mount Meru / Mount Kunlun) and Sun Wukong’s journey to India',
    ],
    keyDifference:
      'Chinese cosmology organizes heaven as a harmonious Celestial Bureaucracy mirroring earthly governance and hydraulic engineering, rather than caste/varna metaphysics.',
    compareDeityIds: ['yama', 'yanluo-wang', 'indra', 'sun-wukong'],
  },
  {
    pair: ['chinese', 'japanese'],
    similarityScore: 88,
    kind: 'direct-inspiration',
    badgeLabel: 'Direct Scriptural & Cultural Inspiration (China ➔ Japan)',
    sharedMotherOrVector: '6th–9th c. CE Asuka/Nara adoption of Chinese script, Daoist Yin-Yang & Buddhism',
    keySimilarities: [
      'Nihon Shoki (720 CE) opens with a Chinese cosmic-egg Yin-Yang cosmogony akin to Pangu',
      'Shared underworld judiciary (Chinese Yanluo Wang → Japanese Enma-ō) and celestial dragons',
      'Reverence for ancestral harmony, nature spirits, and sacred regalia',
    ],
    keyDifference:
      'Japanese Shinto centers a solar ancestress (Amaterasu) and ritual purification (misogi) of localized kami, whereas Chinese myth emphasizes cosmic sages (Nuwa, Yu) and celestial ministries.',
    compareDeityIds: ['nuwa', 'amaterasu', 'yanluo-wang', 'izanami'],
  },
  {
    pair: ['mesopotamian', 'egyptian'],
    similarityScore: 72,
    kind: 'syncretic-exchange',
    badgeLabel: 'Sister River-Valley Cradles & Bronze Age Diplomacy',
    sharedMotherOrVector: 'Neighboring Nile & Tigris-Euphrates civilizations (3300–1100 BCE Amarna diplomacy)',
    keySimilarities: [
      'Creation emerging from dark, boundless primordial waters (Egyptian Nun vs. Sumerian Abzu/Nammu)',
      'Sacred divine kingship mediating directly between celestial order and riverine agriculture',
      'Earliest written funerary and mythological literatures on earth (Pyramid Texts & Sumerian tablets)',
    ],
    keyDifference:
      'Predictable Nile floods fostered Egypt’s optimistic confidence in Ma’at and blessed immortality, while erratic Tigris-Euphrates floods fostered Mesopotamia’s somber view of gloomy Irkalla.',
    compareDeityIds: ['ra', 'marduk', 'osiris', 'ereshkigal'],
  },
  {
    pair: ['yoruba', 'greek'],
    similarityScore: 68,
    kind: 'independent-parallel',
    badgeLabel: 'Striking Archetypal Parallel (Polytheistic Specialization)',
    sharedMotherOrVector: 'Independent development with striking structural parallels across vibrant city-state cultures',
    keySimilarities: [
      'Urban networks of specialized city-patron deities (Ilé-Ifẹ̀/Oyo Orishas vs. Greek Polis Olympians)',
      'Indispensable crossroads trickster-translator who mediates all offerings (Eshu vs. Hermes)',
      'Charismatic thunder-lord enforcing oaths alongside iron-working forge-god (Shango & Ogun vs. Zeus & Hephaestus)',
    ],
    keyDifference:
      'Yoruba Orisha tradition remains a continuous living religion centered on personal destiny (Ori), divination (Ifá), and dynamic life-force (Ashe).',
    compareDeityIds: ['eshu', 'hermes', 'shango', 'zeus'],
  },
  {
    pair: ['mesoamerican', 'norse'],
    similarityScore: 64,
    kind: 'independent-parallel',
    badgeLabel: 'Independent Convergence (Zero Historical Contact)',
    sharedMotherOrVector: 'Zero pre-1492 contact — pure human convergence around fragile cosmos & heroic sacrifice',
    keySimilarities: [
      'Both envision multiple worlds/eras ending in cataclysmic fire and flood (Five Suns vs. Ragnarök)',
      'World created by dismembering a primordial monster floating in the void (Cipactli vs. Ymir)',
      'Gods themselves perform painful blood/self-sacrifice to sustain cosmic wisdom or motion (Nanahuatzin/Quetzalcoatl vs. Odin)',
    ],
    keyDifference:
      'Mesoamerican ritual actively nourished the Fifth Sun daily through reciprocal offering and 260/365-day calendar mathematics, whereas Norse fate (örlög) could not postpone Ragnarök.',
    compareDeityIds: ['quetzalcoatl', 'odin', 'huitzilopochtli', 'thor'],
  },
];

export function getPairwiseConnection(a: TraditionId, b: TraditionId): PairwiseSimilarity {
  if (a === b) {
    return {
      pair: [a, b],
      similarityScore: 100,
      kind: 'shared-root',
      badgeLabel: 'Identical Tradition',
      sharedMotherOrVector: 'Select two distinct traditions above to inspect shared roots or historical inspiration.',
      keySimilarities: ['All cosmologies, texts, and deities belong to the same canon.'],
      keyDifference: 'Choose a second pantheon to contrast worldviews.',
      compareDeityIds: [],
    };
  }

  const found = CURATED_PAIRWISE_CONNECTIONS.find(
    (item) =>
      (item.pair[0] === a && item.pair[1] === b) ||
      (item.pair[0] === b && item.pair[1] === a)
  );
  if (found) return found;

  // Dynamic scholarly synthesis for any other pair of the 45 combinations!
  const pieSet = new Set<TraditionId>(['greek', 'norse', 'hindu', 'celtic']);
  if (pieSet.has(a) && pieSet.has(b)) {
    return {
      pair: [a, b],
      similarityScore: 80,
      kind: 'shared-root',
      badgeLabel: 'Same Mother Religion (Proto-Indo-European)',
      sharedMotherOrVector:
        'Both traditions descend directly from the Bronze Age Proto-Indo-European steppe pantheon (c. 3500 BCE).',
      keySimilarities: [
        'Inherited cognate sky/thunder sovereignty and storm-champion vs. chaos-monster myth (*éghan áhim)',
        'Tripartite sacred order uniting sovereign law, martial valor, and agricultural fertility',
        'Sacred fermented draught of immortality and poetic inspiration',
      ],
      keyDifference:
        'Separated by thousands of miles over millennia, each adapted steppe inheritance to local Mediterranean, Atlantic, Nordic, or South Asian landscapes.',
      compareDeityIds: ['zeus', 'odin', 'indra', 'lugh'],
    };
  }

  const disconnectedContinents =
    a === 'mesoamerican' || b === 'mesoamerican' || a === 'yoruba' || b === 'yoruba';

  return {
    pair: [a, b],
    similarityScore: disconnectedContinents ? 58 : 66,
    kind: disconnectedContinents ? 'independent-parallel' : 'syncretic-exchange',
    badgeLabel: disconnectedContinents
      ? 'Independent Human Convergence (No Common Ancestor)'
      : 'Indirect Eurasian Trade & Archetypal Parallels',
    sharedMotherOrVector: disconnectedContinents
      ? 'Developed autonomously without shared mother-religion—demonstrating universal human mythic archetypes.'
      : 'Connected indirectly across ancient Afro-Eurasian trade corridors without sharing a single mother tongue.',
    keySimilarities: [
      'Three-tiered vertical cosmos (Sky, Mortal Earth, and Underworld) linked by a sacred axis',
      'Shared universal motifs: Creation from primordial waters, threshold tricksters, and underworld bargains',
      'Specialized divine domains governing storm, solar renewal, wisdom, and death',
    ],
    keyDifference:
      'Because they arose from independent linguistic and ecological roots, their divine names, sacred calendars, and ethical priorities evolved along distinct paths.',
    compareDeityIds: [],
  };
}
