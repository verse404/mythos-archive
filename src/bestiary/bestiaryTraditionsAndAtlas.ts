import type {
  ArchetypeMeta,
  ChronoMilestone,
  DiffusionRoute,
  Tradition,
  TraditionId,
} from '../types/mythology';

export const BESTIARY_ARCHETYPES_EN: ArchetypeMeta[] = [
  {
    id: 'sky-sovereign',
    label: 'Celestial & Sovereign Dragons',
    shortLabel: 'Sovereign Dragons',
    subtitle: 'Winged rain-givers, solar eagles, and world-supporting Nagas',
    scholarlyNote:
      'In Asian and West African traditions, dragons and cosmic serpents (Yinglong, Garuda, Shesha, Oshumare) uphold celestial hydraulics and royal order rather than opposing them.',
  },
  {
    id: 'war-storm',
    label: 'Primordial Chaos & Storm Titans',
    shortLabel: 'Chaos Leviathans',
    subtitle: 'Multi-headed serpents, volcanic giants, and deluge colossi',
    scholarlyNote:
      'Embodies the untamed violence of oceans, volcanoes, and droughts (Typhon, Tiamat, Jörmungandr, Vritra, Orochi) against which heroic cosmos-building is measured.',
  },
  {
    id: 'underworld-ruler',
    label: 'Abyssal & Underworld Devourers',
    shortLabel: 'Abyssal Wardens',
    subtitle: 'Gate-hounds, soul-eaters, and root-gnawing chthonic wyrms',
    scholarlyNote:
      'Patrols the irreversible threshold between the living and the dead (Cerberus, Ammit, Níðhöggr, Cipactli, Ajogun), enforcing moral law or cosmic entropy.',
  },
  {
    id: 'wisdom-order',
    label: 'Sacred Chimeras & Guardian Beasts',
    shortLabel: 'Sacred Chimeras',
    subtitle: 'Benevolent royal hybrids, palace colossi, and omen unicorns',
    scholarlyNote:
      'Unites the finest traits of lion, bull, eagle, stag, or monarch (Qilin, Lamassu, Sphinx, Ekun) to sanctify just sovereignty and repel chaos at temple gates.',
  },
  {
    id: 'trickster-guide',
    label: 'Liminal Shapeshifters & Spirits',
    shortLabel: 'Shapeshifters',
    subtitle: 'Nine-tailed foxes, loch water-horses, and mountain ascetics',
    scholarlyNote:
      'Inhabits mist-shrouded borders—forests, fords, and twilight courts (Kitsune, Tengu, Kelpie, Ahuizotl, Bean Sídhe)—testing human hubris, greed, and discernment.',
  },
  {
    id: 'solar-renewal',
    label: 'Apocalyptic & Eclipse Omen Beasts',
    shortLabel: 'Eclipse Beasts',
    subtitle: 'Sun-swallowing wolves, midnight serpents, and star-daemons',
    scholarlyNote:
      'Personifies the fragility of cosmic light during solar eclipses and world-ending cycles (Fenrir, Apophis, Tzitzimimeh, Balor, Taotie).',
  },
];

export const BESTIARY_ARCHETYPES_ZH: ArchetypeMeta[] = [
  {
    id: 'sky-sovereign',
    label: '天界神龙与皇权瑞兽',
    shortLabel: '天界神龙',
    subtitle: '呼风唤雨之真龙、金翅神鹰与承托宇宙的那伽圣王',
    scholarlyNote:
      '在东亚、南亚与西非宇宙观中，神龙与巨蟒（应龙、迦楼罗、舍沙、奥舒马雷）并非混乱化身，而是调燮风雨、稳固天地的水利与秩序之主。',
  },
  {
    id: 'war-storm',
    label: '太古混沌与风暴巨兽',
    shortLabel: '混沌巨兽',
    subtitle: '百首火山泰坦、原初咸水母龙与滔天洪流大蛇',
    scholarlyNote:
      '具象化火山、海啸与大旱的狂暴自然伟力（提丰、提阿玛特、耶梦加得、弗栗多、八岐大蛇），构成文明创世试炼的终极对手。',
  },
  {
    id: 'underworld-ruler',
    label: '冥渊噬魂与守门凶兽',
    shortLabel: '冥渊守卫',
    subtitle: '地狱三头犬、天平噬心兽与啮咬世界树根的冥龙',
    scholarlyNote:
      '镇守阴阳生死不可逾越的铁门（刻耳柏洛斯、阿米特、尼德霍格、希帕克特利、阿乔贡），执掌死后审判或宇宙熵增。',
  },
  {
    id: 'wisdom-order',
    label: '神圣奇美拉与护法瑞兽',
    shortLabel: '护法瑞兽',
    subtitle: '履草不折之仁麟、五足宫门神牛与太阳斯芬克斯',
    scholarlyNote:
      '集结狮、牛、鹰、鹿与帝王智慧于一体（麒麟、拉玛苏、斯芬克斯、皇家圣豹埃昆），辟除邪魔并昭示仁政王权。',
  },
  {
    id: 'trickster-guide',
    label: '阈限幻形与精怪妖灵',
    shortLabel: '幻形精怪',
    subtitle: '千年九尾灵狐、寒潭变形水马与鞍马山大天狗',
    scholarlyNote:
      '栖居深山、古渡与黄昏交界之地（九尾狐、大天狗、凯尔皮、阿维索特尔、报丧女妖），试探世人的贪念、傲慢与敬畏之心。',
  },
  {
    id: 'solar-renewal',
    label: '末劫蚀日与灾异凶兽',
    shortLabel: '末劫凶兽',
    subtitle: '吞日弑神魔狼、午夜虚无毒蟒与日食星辰骸骨女魔',
    scholarlyNote:
      '将日全食、纪元更替与无度贪欲化为震撼视觉的灾异凶兽（芬里尔、阿波菲斯、齐齐米梅、巴罗尔、饕餮）。',
  },
];

export const BESTIARY_TRADITIONS_EN: Tradition[] = [
  {
    id: 'greek',
    name: 'Greek Bestiary (Drakones & Terata)',
    subtitle: 'Chthonic Brood of Typhon & Echidna vs. Heroic Polis Order',
    folioCode: 'BST-I · HELLENIC',
    region: 'Aegean Basin, Peloponnese & Volcanic Sicily',
    culturalSphere: 'Eastern Mediterranean',
    eraLabel: 'c. 1600 BCE – 400 CE',
    startYear: -1600,
    endYear: 400,
    isLivingTradition: false,
    summary:
      'Greek monsterology (teratologia) casts hybrid beasts as a single chthonic bloodline birthed by Gaia, Tartarus, Typhon, and Echidna—stationed at marsh vents, sea straits, and Hades’ bronze threshold to test Olympian law and heroic kleos.',
    worldviewThesis:
      'Monsters mark the untamed geographic margins outside civic law (polis), conquered through heroic cunning, fire, and divine patronage rather than brute strength alone.',
    cosmicAxis: 'Mount Olympus — Lerna & Theban Passes — Bronze Gates of Tartarus',
    keyValues: ['Heroic Ordeal (Athlos)', 'Boundary Vigilance', 'Taming Wild Marshes', 'Tragic Hubris'],
    sacredSymbols: ['Hundred Viper Heads', 'Cauterizing Torch', 'Three-Headed Hound Collar', 'Theban Riddle Scroll'],
    realms: [
      { name: 'Volcanic Cilicia & Etna', tier: 'upper', description: 'Crater prison where Zeus pinned storm-giant Typhon beneath molten rock.' },
      { name: 'Karstic Marshes of Lerna', tier: 'middle', description: 'Bottomless Peloponnesian springs haunted by the regenerating Hydra.' },
      { name: 'Stygian Gate & Tartarus', tier: 'lower', description: 'Subterranean abyss guarded by Cerberus where conquered Titans groan.' },
    ],
    primaryTexts: [
      { title: 'Hesiod’s Theogony (270–336)', period: 'c. 700 BCE', description: 'Canonical genealogy of Phorcys, Keto, Echidna, Typhon, Cerberus, Hydra, and Chimera.' },
      { title: 'Apollodorus’s Bibliotheca', period: 'c. 1st–2nd c. CE', description: 'Complete dossier of Heracles’ monster labors and Typhon’s battle with Zeus.' },
    ],
    relatedTraditions: [
      { traditionId: 'mesopotamian', connectionType: 'Anatolian-Levantine Transmission', explanation: 'Typhon’s storm-battle and multi-headed Hydra echo Hurrian-Babylonian dragon combat.' },
      { traditionId: 'egyptian', connectionType: 'Iconographic Reversal', explanation: 'Benevolent Egyptian royal Sphinxes transformed into Greece’s winged Theban riddle-predator.' },
    ],
    mapCoords: { x: 548, y: 196 },
  },
  {
    id: 'norse',
    name: 'Norse Bestiary (Jötnar, Vargar & Ormar)',
    subtitle: 'Ironwood’s Apocalyptic Brood & the Gnawed World-Tree',
    folioCode: 'BST-II · BOREAL',
    region: 'Scandinavia, Iceland & the North Atlantic Deep',
    culturalSphere: 'Germanic North',
    eraLabel: 'c. 200 – 1150 CE',
    startYear: 200,
    endYear: 1150,
    isLivingTradition: false,
    summary:
      'Old Norse monster lore centers on existential inevitabilities: Fenrir bound on Lyngvi, Jörmungandr gripping the world-ocean, and Níðhöggr gnawing Yggdrasil’s deepest root—creatures whose containment by broken Æsir oaths precipitates Ragnarök.',
    worldviewThesis:
      'Every monster bound through deceit grows deadlier in fetters; courage lies in facing cosmic wolves and abyssal wyrms without illusion when the fetters snap.',
    cosmicAxis: 'Ironwood Forest — Outer Midgard Ocean — Hvergelmir Corpse-Spring',
    keyValues: ['Fated Reckoning (Ørlög)', 'Cost of Broken Oaths', 'Oceanic Dread', 'Ecological Entropy'],
    sacredSymbols: ['Gleipnir Silk Ribbon', 'Ouroboros Sea-Coil', 'Gnawed Ash Root', 'Týr’s Sacrificed Hand'],
    realms: [
      { name: 'Járnviðr (Ironwood)', tier: 'upper', description: 'Eastern troll-forest where Angrboða bred giant wolves to chase Sun and Moon.' },
      { name: 'Úthaf (Outer World-Sea)', tier: 'middle', description: 'Crushing sub-arctic ocean encircled tail-in-mouth by Jörmungandr.' },
      { name: 'Náströnd & Hvergelmir', tier: 'lower', description: 'Venom-dripping corpse-shore where Níðhöggr chews Yggdrasil’s root.' },
    ],
    primaryTexts: [
      { title: 'Poetic Edda (Völuspá & Hymiskviða)', period: 'c. 950–1270 CE', description: 'Visions of Níðhöggr, Fenrir’s jaws, and Thor fishing up the Midgard Serpent.' },
      { title: 'Snorri’s Gylfaginning (Ch. 34 & 51)', period: 'c. 1220 CE', description: 'Detailed narrative of Gleipnir’s forging and the mutual slaying of gods and monsters.' },
    ],
    relatedTraditions: [
      { traditionId: 'hindu', connectionType: 'PIE Dragon-Slayer Inheritance', explanation: 'Thor vs. Jörmungandr parallels Vedic Indra vs. Vritra (*éghan áhim).' },
      { traditionId: 'celtic', connectionType: 'North Atlantic Sea Lore', explanation: 'Viking-Gaelic maritime contact intertwined sea-serpent and prophetic battle-omen lore.' },
    ],
    mapCoords: { x: 515, y: 125 },
  },
  {
    id: 'egyptian',
    name: 'Egyptian Bestiary (Chaos Serpents & Ma’at Hybrids)',
    subtitle: 'Midnight Battles in the Duat & Sacred Chimera Guardians',
    folioCode: 'BST-III · KEMET',
    region: 'Nile Valley, Giza Plateau & Subterranean Duat',
    culturalSphere: 'Northeast Africa',
    eraLabel: 'c. 3100 BCE – 400 CE',
    startYear: -3100,
    endYear: 400,
    isLivingTradition: false,
    summary:
      'Ancient Egypt distinguished sharply between uncreated chaos (Apophis, coiled in the midnight Duat to swallow the sun) and composite sacred guardians (the Great Sphinx and heart-devouring Ammit) whose hybrid bodies enforced Ma’at.',
    worldviewThesis:
      'Hybridity in Egypt is sacred synthesis rather than deformity—combining crocodile, lion, falcon, and pharaoh to defend cosmic truth against the uncreated serpent of non-existence.',
    cosmicAxis: 'Giza Solar Horizon — Hall of Two Truths — Twelfth Hour of the Duat',
    keyValues: [' Cosmic Truth (Ma’at)', 'Solar Vigilance', 'Execration Magic', 'Moral Annihilation of Evil'],
    sacredSymbols: ['Speared Serpent Wax Effigy', 'Scales & Ostrich Feather', 'Nemes-Crowned Lion', 'Solar Barque Prow'],
    realms: [
      { name: 'Akhet (Solar Horizon)', tier: 'upper', description: 'Desert threshold guarded by monumental Sphinxes greeting the rising sun.' },
      { name: 'Hall of Two Truths', tier: 'middle', description: 'Judgment court where Ammit crouches beneath Anubis’s balance.' },
      { name: 'Sandbank of Mount Bakhu', tier: 'lower', description: 'Midnight Duat shoal where Apophis drinks the river dry to strand Ra’s barque.' },
    ],
    primaryTexts: [
      { title: 'Book of Overthrowing Apophis', period: 'c. 1500–300 BCE', description: 'Temple execration liturgy recited daily while burning wax serpent effigies.' },
      { title: 'Amduat & Book of the Dead (Spell 125)', period: 'c. 1550–1000 BCE', description: 'Illustrated maps of Ra’s serpent-guarded night voyage and Ammit’s tribunal.' },
    ],
    relatedTraditions: [
      { traditionId: 'greek', connectionType: 'Sphinx & Typhon Syncretism', explanation: 'Greeks equated Seth/Apophis with Typhon and reimagined the Sphinx at Thebes.' },
      { traditionId: 'mesopotamian', connectionType: 'Royal Gate Hybrids', explanation: 'Monumental Sphinxes and Assyrian Lamassu co-evolved across Near Eastern royal courts.' },
    ],
    mapCoords: { x: 572, y: 238 },
  },
  {
    id: 'hindu',
    name: 'Hindu Bestiary (Nāgas, Suparṇas & Asura Dragons)',
    subtitle: 'Drought-Coiling Vritra, Solar Garuda & World-Bearing Serpents',
    folioCode: 'BST-IV · DHARMA',
    region: 'South Asian Subcontinent & Subterranean Pātāla',
    culturalSphere: 'Indic Civilization',
    eraLabel: 'c. 1500 BCE – Present',
    startYear: -1500,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Indic tradition transforms monsterology into cosmic ecology: Vedic drought-dragon Vritra hoards the waters until cleft by Indra, while Puranic lore pairs golden-winged Garuda against his half-brothers Vasuki and thousand-headed Shesha—serpents revered as world-pillars.',
    worldviewThesis:
      'Even venomous serpents and fierce birds of prey occupy essential dharmic offices—churning the Ocean of Milk, bearing Vishnu’s slumber, and liberating captive waters.',
    cosmicAxis: 'Mount Meru Canopy — Churning Ocean of Milk — Jewel-Lit Pātāla',
    keyValues: ['Release of Cosmic Waters', 'Filial Devotion', 'Complementarity of Opposites', 'Sacred Vahana Service'],
    sacredSymbols: ['Hundred-Jointed Vajra', 'Thousand Gemmed Cobra Hoods', 'Golden Solar Wings', 'Mandara Churning Rope'],
    realms: [
      { name: 'Mount Meru & Vaikuntha', tier: 'upper', description: 'Radiant sky-perch of Garuda beside Lord Vishnu.' },
      { name: 'Kṣīrasāgara (Ocean of Milk)', tier: 'middle', description: 'Cosmic sea churned with Vasuki’s body to yield Amrita and Halahala poison.' },
      { name: 'Nāgaloka / Pātāla', tier: 'lower', description: 'Luminous subterranean jewel-palaces ruled by Vasuki and supported by Ananta-Shesha.' },
    ],
    primaryTexts: [
      { title: 'Rigveda 1.32 (Slaying of Vritra)', period: 'c. 1500–1200 BCE', description: 'Foundational Indo-European hymn celebrating Indra’s liberation of the Seven Rivers.' },
      { title: 'Mahabharata (Astika Parva, Adi 16–58)', period: 'c. 400 BCE – 300 CE', description: 'Epic cycle of Garuda’s birth, theft of Amrita, and the great snake-sacrifice.' },
    ],
    relatedTraditions: [
      { traditionId: 'chinese', connectionType: 'Buddhist Nāga–Long Synthesis', explanation: 'Translated Buddhist sutras merged Indic Nāga kings and Garuda (Jinchi Dapeng) into East Asian lore.' },
      { traditionId: 'norse', connectionType: 'PIE Serpent-Eagle Axis', explanation: 'Garuda vs. Nagas mirrors the treetop Eagle vs. root-dragon Níðhöggr on Yggdrasil.' },
    ],
    mapCoords: { x: 705, y: 252 },
  },
  {
    id: 'chinese',
    name: 'Chinese Bestiary (Shenshou, Long & Sixiong)',
    subtitle: 'Shan Hai Jing Cosmography, Auspicious Unicorns & Bronze Guardians',
    folioCode: 'BST-V · HUAXIA',
    region: 'Yellow & Yangtze Basins, Kunlun & Four Seas',
    culturalSphere: 'East Asian Sinosphere',
    eraLabel: 'c. 1600 BCE – Present',
    startYear: -1600,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Rooted in Shang ritual bronzes and the Classic of Mountains and Seas (Shan Hai Jing), Chinese teratology classifies creatures along an ethical-cosmological spectrum: rain-giving winged dragon Yinglong, sage-heralding Qilin, and cautionary bronze glutton Taotie.',
    worldviewThesis:
      'Miraculous beasts (ruishou) and perilous fiends (xiongshou) act as living barometers of human governance, ecological harmony, and ritual restraint.',
    cosmicAxis: 'Celestial Clouds — Nine Provinces & Sacred Peaks — Bronze Ancestral Altar',
    keyValues: ['Benevolent Governance (Ren)', 'Hydraulic Cooperation', 'Ritual Moderation', 'Cosmographic Mapping'],
    sacredSymbols: ['River-Carving Dragon Tail', 'Flesh-Tipped Unicorn Horn', 'Symmetrical Bronze Taotie Mask', 'Nine Tripod Cauldrons'],
    realms: [
      { name: 'Celestial Pool & Kunlun', tier: 'upper', description: 'Cloud sanctuary of winged Yinglong and auspicious Qilin.' },
      { name: 'Mountains & Seas of the Nine Provinces', tier: 'middle', description: 'Mapped wilderness of strange beasts cataloged in the Shan Hai Jing.' },
      { name: 'Turtle Mountain & Subterranean Springs', tier: 'lower', description: 'Deep riverine vaults where flood-spirits like Wuzhiqi lie chained in iron.' },
    ],
    primaryTexts: [
      { title: 'Shan Hai Jing (Classic of Mountains & Seas)', period: 'c. 4th–1st c. BCE', description: 'World’s oldest illustrated mythic geography cataloging over 400 hybrid beasts and spirits.' },
      { title: 'Huainanzi & Lüshi Chunqiu', period: 'c. 3rd–2nd c. BCE', description: 'Preserves Yinglong’s evolutionary tree of sacred beasts and the moral allegory of Taotie.' },
    ],
    relatedTraditions: [
      { traditionId: 'japanese', connectionType: 'Kanji & Yokai Cosmography', explanation: 'Shan Hai Jing woodblocks directly seeded Edo-period Japanese yōkai encyclopedias (Hyakki Yagyō).' },
      { traditionId: 'hindu', connectionType: 'Silk Road Dragon-King Lore', explanation: 'Indigenous rain-dragons blended with Indic Nāgarājas into the Four Sea Dragon Kings.' },
    ],
    mapCoords: { x: 785, y: 212 },
  },
  {
    id: 'japanese',
    name: 'Japanese Bestiary (Kami-Beasts, Daija & Yōkai)',
    subtitle: 'Eight-Forked Serpents, Nine-Tailed Foxes & Mountain Tengu',
    folioCode: 'BST-VI · YAMATO',
    region: 'Izumo Valleys, Mount Kurama & Nasu Volcanic Plains',
    culturalSphere: 'Japanese Archipelago',
    eraLabel: 'c. 700 CE – Present',
    startYear: 700,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Japanese monsterology is uniquely fluid: depending on ritual respect, the same supernatural entity shifts from wrathful calamity (araburu) to revered guardian (nigimitama)—spanning Izumo’s sword-bearing Orochi, dual-natured Kitsune, and swordmaster Daitengu.',
    worldviewThesis:
      'No sharp wall divides monster (yōkai) from spirit (kami); awe, etiquette, and spiritual sincerity determine whether a mountain or fox spirit destroys or protects.',
    cosmicAxis: 'Cedar Peaks of Kurama — Vermilion Torii Thresholds — Blood-Red Hiikawa River',
    keyValues: ['Dual Spirit Aspect (Ara/Nigi)', 'Humility Before Nature', 'Liminal Etiquette', 'Transformative Craft'],
    sacredSymbols: ['Kusanagi Tail-Blade', 'Nine Golden Fox Tails & Kitsunebi', 'Tengu Feather Fan (Hauchiwa)', 'Split Killing Stone'],
    realms: [
      { name: 'Misty Shugendō Peaks (Kurama & Atago)', tier: 'upper', description: 'Sacred cedar heights patrolled by winged Daitengu and crow-acolytes.' },
      { name: 'Torii Fox-Groves & Nasu Moor', tier: 'middle', description: 'Twilight borderlands of Inari white foxes and volcanic fumaroles.' },
      { name: 'Hiikawa Gorges of Izumo', tier: 'lower', description: 'Eight-valley watershed onceterrorized by Yamata-no-Orochi.' },
    ],
    primaryTexts: [
      { title: 'Kojiki & Nihon Shoki', period: '712 & 720 CE', description: 'Imperial chronicle of Susanoo slaying Yamata-no-Orochi and extracting Kusanagi-no-Tsurugi.' },
      { title: 'Konjaku Monogatarishū & Gazu Hyakki Yagyō', period: 'c. 1120 & 1776 CE', description: 'Heian tales of Tengu and Tamamo-no-Mae alongside Toriyama Sekien’s classic yōkai woodblocks.' },
    ],
    relatedTraditions: [
      { traditionId: 'chinese', connectionType: 'Continental Fox & Celestial Dog Lore', explanation: 'Reimagined Shan Hai Jing nine-tailed foxes and Tiangou meteors into court drama and mountain asceticism.' },
      { traditionId: 'celtic', connectionType: 'Parallel Liminal Folklore', explanation: 'Shares uncanny structural parallels between Kitsune/Tengu border-zones and Gaelic fairy mounds.' },
    ],
    mapCoords: { x: 856, y: 204 },
  },
  {
    id: 'mesopotamian',
    name: 'Mesopotamian Bestiary (Tiamat’s Brood & Apotropaic Colossi)',
    subtitle: 'The Oldest Cuneiform Monster Army & Five-Legged Palace Bulls',
    folioCode: 'BST-VII · SUMER-AKKAD',
    region: 'Tigris-Euphrates Plain, Nineveh & Cedar Mountains',
    culturalSphere: 'Ancient Near East',
    eraLabel: 'c. 3500 – 500 BCE',
    startYear: -3500,
    endYear: -500,
    isLivingTradition: false,
    summary:
      'Cuneiform tablets preserve humanity’s earliest monster catalog: salt-sea dragon Tiamat birthing eleven venomous chimeras, seven-aura forest guardian Humbaba mourning felled cedars, and benevolent thirty-ton winged Lamassu bulls guarding imperial gates.',
    worldviewThesis:
      'Wilderness monsters possess radiant cosmic terror (melammu); civilization endures by inscribing conquered chaos dragons onto city walls alongside protective Lamassu guardians.',
    cosmicAxis: 'Assyrian Citadel Gates — Cedar Forest of Enlil — Salt Abyss of Tiamat',
    keyValues: ['Radiant Terror (Melammu)', 'Threshold Protection', 'Civic Order vs. Salt Chaos', 'Ecological Reckoning'],
    sacredSymbols: ['Glazed Brick Mušḫuššu Dragon', 'Five-Legged Winged Bull', 'Sevenfold Aura Cloak', 'Tablet of Destinies'],
    realms: [
      { name: 'Royal Citadels of Nineveh & Babylon', tier: 'upper', description: 'Monumental stone and glazed-brick gates guarded by Lamassu and Marduk’s dragon.' },
      { name: 'Sacred Cedar Mountain', tier: 'middle', description: 'Fragrant highland forest defended by Humbaba’s flood-roar.' },
      { name: 'Primeval Salt-Sea of Tiamat', tier: 'lower', description: 'Womb of scorpion-men, mad lions, and horned serpents prior to cosmos-splitting.' },
    ],
    primaryTexts: [
      { title: 'Enuma Elish (Tablets I–V)', period: 'c. 12th c. BCE', description: 'Enumerates Tiamat’s eleven monster species and the forging of heaven and earth from her ribs.' },
      { title: 'Epic of Gilgamesh (Tablet V)', period: 'c. 2100–1200 BCE', description: 'Tragic expedition to slay Cedar Forest warden Humbaba.' },
    ],
    relatedTraditions: [
      { traditionId: 'greek', connectionType: 'Foundational Chaoskampf Prototype', explanation: 'Tiamat’s monster brood directly prefigures Hesiod’s catalog of Echidna’s offspring.' },
      { traditionId: 'egyptian', connectionType: 'Imperial Hybrid Guardianship', explanation: 'Assyrian Lamassu and Egyptian Sphinxes established the visual grammar of royal chimeras.' },
    ],
    mapCoords: { x: 608, y: 218 },
  },
  {
    id: 'celtic',
    name: 'Celtic Bestiary (Fomorians, Aos Sí & Loch Beasts)',
    subtitle: 'Evil-Eyed Sea Tyrants, Barrow-Mound Heralds & Water-Horses',
    folioCode: 'BST-VIII · GAEL',
    region: 'Ireland, Scottish Highlands & Atlantic Skerries',
    culturalSphere: 'Insular Celtic West',
    eraLabel: 'c. 800 BCE – Present Folklore',
    startYear: -800,
    endYear: 2026,
    isLivingTradition: false,
    summary:
      'Gaelic monster lore bridges mythic sea-tyrants and haunting landscape spirits: Balor’s army-scorching eye on storm-lashed Tory Island, adhesive Kelpies lurking in Highland lochs, and ancestral Bean Sídhe singing laments beside prehistoric mounds.',
    worldviewThesis:
      'Land, sea, and ancestral bloodlines remember every trespass; monsters and Otherworld heralds enforce sovereignty over mist-bound waters and ancient barrows.',
    cosmicAxis: 'Tory Island Sea-Tower — Hollow Sídhe Barrows — Highland Loch Fords',
    keyValues: ['Sovereignty of the Land', 'Ancestral Lamentation', 'Respect for Wild Waters', 'Prophetic Fate'],
    sacredSymbols: ['Hook-Lifted Blight Eye', 'Silver Fairy Comb', 'Enchanted Iron Bridle', 'Bloodstained Ford Tunic'],
    realms: [
      { name: 'Glass Tower of Tory Island', tier: 'upper', description: 'Atlantic cliff stronghold of Fomorian blight-king Balor.' },
      { name: 'Hollow Sídhe Barrows', tier: 'middle', description: 'Neolithic passage-mounds whence Bean Sídhe emerge before noble deaths.' },
      { name: 'Peat-Dark Highland Lochs', tier: 'lower', description: 'Bottomless glacial waters haunted by shapeshifting Kelpies and Each-Uisce.' },
    ],
    primaryTexts: [
      { title: 'Cath Maige Tuired (Second Battle of Mag Tuired)', period: 'c. 9th–11th c. CE MS', description: 'Chronicles Lugh’s sling-shot shattering Balor’s poisonous eye.' },
      { title: 'Scottish & Irish Oral Folklore Archives', period: 'c. 12th–19th c. CE', description: 'Preserves centuries of Bean Sídhe keening accounts and Kelpie bridle legends.' },
    ],
    relatedTraditions: [
      { traditionId: 'greek', connectionType: 'Grandson-Prophecy Cognate', explanation: 'Balor/Ethniu/Lugh shares exact structural DNA with Acrisius/Danaë/Perseus and Medusa’s gaze.' },
      { traditionId: 'yoruba', connectionType: 'Revered Night-Women Omen Parallel', explanation: 'Bean Sídhe and Yoruba Eleye both honor potent feminine supernatural authority.' },
    ],
    mapCoords: { x: 468, y: 158 },
  },
  {
    id: 'mesoamerican',
    name: 'Mesoamerican Bestiary (Cipactli, Tzitzimimeh & Lake Beasts)',
    subtitle: 'Living Earth-Caiman, Eclipse Star-Goddesses & Tlaloc’s Servant',
    folioCode: 'BST-IX · ANAHUAC',
    region: 'Basin of Mexico, Lake Texcoco & Highland Valleys',
    culturalSphere: 'Nahua & Maya Mesoamerica',
    eraLabel: 'c. 1500 BCE – 1521 CE (Living Nahua Echoes)',
    startYear: -1500,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'In Mesoamerican thought, humanity walks directly upon the torn yet living back of joint-mouthed caiman Cipactli, beneath starry skies patrolled by skeletal Tzitzimimeh, beside reed-lined lakes prowled by tail-handed Ahuizotl.',
    worldviewThesis:
      'Monstrous ferocity and life-giving fertility are inseparable: the earth-beast that devours corpses also sprouts maize, and eclipse star-daemons protect mothers in childbirth.',
    cosmicAxis: 'Starry Eclipse Firmament — Reed Shores of Lake Texcoco — Living Earth-Maw',
    keyValues: ['Cosmic Debt & Reciprocity', 'Duality of Terror & Nurture', 'Calendrical Vigilance', 'Sacred Aquatic Election'],
    sacredSymbols: ['Joint-Mouthed Caiman Glyph', 'Tail-Tip Human Hand', 'Skeletal Heart-Collar', 'New Fire Drill'],
    realms: [
      { name: 'Nocturnal Starry Heavens', tier: 'upper', description: 'Watchpost of skeletal Tzitzimimeh waiting for solar eclipses or the 52-year New Fire test.' },
      { name: 'Whirlpools of Lake Texcoco', tier: 'middle', description: 'Submerged caverns where the Ahuizotl claims chosen mortals for Tlalocan.' },
      { name: 'Tlaltecuhtli’s Hungry Back', tier: 'lower', description: 'The torn earth-crocodile forming mountains, springs, and every grave.' },
    ],
    primaryTexts: [
      { title: 'Histoyre du Mechique & Codex Borgia', period: 'Pre-1521 / 16th c.', description: 'Vivid paintings and Nahuatl accounts of Cipactli’s dismemberment and Tzitzimimeh.' },
      { title: 'Florentine Codex (Book XI: Earthly Things)', period: 'c. 1577 CE', description: 'Sahagún and Nahua elders’ illustrated natural-supernatural dossier on the Ahuizotl.' },
    ],
    relatedTraditions: [
      { traditionId: 'mesopotamian', connectionType: 'Convergent World-Body Myth', explanation: 'Cipactli and Tiamat both form heaven and earth from a cleft primordial water-monster.' },
      { traditionId: 'celtic', connectionType: 'Parallel Aquatic Lure Folklore', explanation: 'Ahuizotl and Kelpie independently warn travelers against deceptive waterside encounters.' },
    ],
    mapCoords: { x: 238, y: 274 },
  },
  {
    id: 'yoruba',
    name: 'Yoruba Bestiary (Cosmic Python, Royal Ekun & Night Powers)',
    subtitle: 'World-Binding Oshumare, Sacred Leopard Kingship & Eleye Covenant',
    folioCode: 'BST-X · ÀṢẸ',
    region: 'Yorubaland, Benin Forest Belt & Atlantic Diaspora',
    culturalSphere: 'West Africa & Afro-Atlantic',
    eraLabel: 'c. 500 BCE – Present',
    startYear: -500,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Yoruba philosophy weaves sacred animals and awesome nocturnal beings into a balanced moral cosmos: rainbow python Oshumare binds the Earth’s foundations, royal leopard Ekun models composed sovereignty, and Eleye night-mothers coexist alongside the eight Ajogun afflictions.',
    worldviewThesis:
      'Awesome powers cannot be annihilated by brute force—they are harmonized through *ìwà pẹ̀lẹ́* (gentle character), ẹbọ offerings, Ifá wisdom, and *Gẹ̀lẹ̀dẹ́* celebratory art.',
    cosmicAxis: 'Rainbow Arch of Ọ̀run — Sacred Iroko Canopy — Forest Palace & Ocean Coils',
    keyValues: ['Composed Power (Ìwà Pẹ̀lẹ́)', 'Diplomatic Reciprocity (Ẹbọ)', 'Reverence for Elder Mothers', 'World-Sustaining Motion'],
    sacredSymbols: ['Rainbow Serpent Brass Coil', 'Royal Spotted Leopard Pelt', 'Beaded Crown Bird (Adé)', 'Iron Bird Staff (Ọ̀pá Ọ̀rẹrẹ)'],
    realms: [
      { name: 'Rainbow Vault of Ọ̀run', tier: 'upper', description: 'Sky-bridge traveled by Oshumare carrying moisture and fortune between worlds.' },
      { name: 'Midnight Iroko Canopy & Crossroads', tier: 'middle', description: 'Sacred council tree of Àwọn Ìyá Wa (Eleye) and Eshu’s ritual diplomacy.' },
      { name: 'High Forest Sanctuary & Deep Coils', tier: 'lower', description: 'Domain of royal leopard Ekun and the oceanic serpent coils steadying Earth.' },
    ],
    primaryTexts: [
      { title: 'Odù Ifá Corpus (esp. Ọ̀sá Méjì & Òṣé Túrúpọ̀n)', period: 'Ancient Oral – Living Canon', description: 'Foundational verses on Orunmila’s covenant with Eleye, Ekun’s spots, and Oshumare.' },
      { title: 'Gẹ̀lẹ̀dẹ́ Oríkì & Ife-Benin Brass Corpus', period: 'c. 12th c. CE – Present', description: 'UNESCO-recognized masquerade liturgy and royal cast-brass leopards and pythons.' },
    ],
    relatedTraditions: [
      { traditionId: 'hindu', connectionType: 'World-Sustaining Serpent Philosophy', explanation: 'Oshumare and Ananta-Shesha both revere cosmic pythons/cobras as structural pillars of Earth.' },
      { traditionId: 'chinese', connectionType: 'Sacred Sovereignty Beasts', explanation: 'Ekun and Qilin anchor royal legitimacy in composed restraint rather than wanton slaughter.' },
    ],
    mapCoords: { x: 504, y: 312 },
  },
];

const TRAD_ZH_OV: Record<
  TraditionId,
  {
    name: string;
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
> = {
  greek: {
    name: '古希腊异兽志（龙蛇与奇美拉）',
    subtitle: '提丰与厄喀德那的地底万妖血脉 vs. 城邦英雄秩序',
    folioCode: '异兽卷一 · 希腊',
    region: '爱琴海盆地、伯罗奔尼撒与西西里火山',
    culturalSphere: '东地中海文明圈',
    eraLabel: '约公元前1600 – 公元400年',
    summary:
      '希腊怪兽学将绝大多数凶兽归入盖亚、塔耳塔罗斯、提丰与厄喀德那繁衍的同一支地底世系——盘踞于毒沼、海峡与冥府青铜门前，考验奥林匹斯律法与英雄智勇。',
    worldviewThesis:
      '怪兽标志着城邦礼法之外尚未驯服的自然边疆；唯有凭借烈火巧智与神明襄助而非匹夫蛮力，方能平定荒原。',
    cosmicAxis: '奥林匹斯山 — 勒拿毒沼与底比斯隘口 — 塔耳塔罗斯青铜门',
    keyValues: ['英雄试炼（Athlos）', '阴阳边界铁律', '沼泽水患治理', '悲剧傲慢警示'],
    sacredSymbols: ['百颗喷火蛇首', '烙印创口的火炬', '地狱三头犬颈链', '底比斯生死谜卷'],
    realms: [
      { name: '埃特纳火山熔岩狱', description: '宙斯以雷霆轰落百首风暴巨怪提丰并压上整座西西里火山之地。' },
      { name: '勒拿无底毒泉沼泽', description: '九头蛇许德拉栖居的瘴气深潭，古人视为直通冥界的裂隙。' },
      { name: '斯堤克斯冥河青铜门', description: '三头犬刻耳柏洛斯镇守的亡灵关隘，严防生人擅入与死魂外逃。' },
    ],
    primaryTexts: [
      { title: '赫西俄德《神谱》（第270–336行）', period: '约公元前700年', description: '系统谱写厄喀德那、提丰、三头犬、九头蛇与奇美拉的万妖家谱。' },
      { title: '阿波罗多罗斯《书库》', period: '约公元1–2世纪', description: '详载赫拉克勒斯讨伐诸兽伟业及宙斯与提丰惊天决战。' },
    ],
    relatedTraditions: [
      { connectionType: '安纳托利亚—近东传播链', explanation: '提丰神战与多头水蛇许德拉直接承袭胡里特与巴比伦屠龙母题。' },
      { connectionType: '神圣图像学反转', explanation: '埃及仁慈护法的法老斯芬克斯传入希腊后演变为底比斯食人谜语女妖。' },
    ],
  },
  norse: {
    name: '北欧异兽志（灭世巨狼与深海毒蟒）',
    subtitle: '铁森林末劫三魔嗣与被啃噬的世界树根',
    folioCode: '异兽卷二 · 北欧',
    region: '斯堪的纳维亚、冰岛与北大西洋深海',
    culturalSphere: '日耳曼北方文化圈',
    eraLabel: '约公元200 – 1150年',
    summary:
      '北欧怪兽观聚焦于不可逃避的宿命终局：孤岛魔链锁住的巨狼芬里尔、咬尾环抱尘世的耶梦加得，以及地底啃咬世界树根的黑龙尼德霍格——诸神背誓设下的枷锁终将在诸神黄昏崩裂。',
    worldviewThesis:
      '靠诡计与背誓捆绑的巨兽只会在枷锁中愈发狂暴；真正的勇毅是在末日降临时直面吞日魔狼与滔天毒蟒。',
    cosmicAxis: '铁森林（Járnviðr） — 环世外海 — 赫瓦格密尔尸毒泉',
    keyValues: ['宿命必偿（Ørlög）', '背誓断腕之痛', '极北深海敬畏', '世界树动态熵增'],
    sacredSymbols: ['丝带魔链格莱普尼尔', '首尾相衔海蟒环', '被啃噬的梣木主根', '战神提尔断手'],
    realms: [
      { name: '东方铁森林', description: '女巨人安格尔伯达养育追日逐月魔狼群的幽暗枯林。' },
      { name: '米德加尔特外海深渊', description: '耶梦加得盘绕整个人间、掀起滔天冰海风暴的无底汪洋。' },
      { name: '纳斯特隆德（尸海岸）', description: '黑龙尼德霍格与万千毒蛇啃咬世界树根并惩戒背誓者的极寒冥渊。' },
    ],
    primaryTexts: [
      { title: '《诗体埃达》（女巫的预言·希米尔之歌）', period: '约950–1270年', description: '吟诵尼德霍格黑翼、芬里尔吞日及索尔牛首钓巨蟒的壮歌。' },
      { title: '斯诺里《散文埃达·欺骗古鲁菲》', period: '约1220年', description: '完整记载铸造魔链格莱普尼尔与诸神黄昏人魔同归于尽始末。' },
    ],
    relatedTraditions: [
      { connectionType: '原始印欧屠龙同源', explanation: '索尔大战耶梦加得与吠陀因陀罗斩弗栗多同出印欧古诗公式。' },
      { connectionType: '北大西洋海怪交融', explanation: '维京与盖尔航海传统在海怪与战前亡魂预兆上深度互渗。' },
    ],
  },
  egyptian: {
    name: '古埃及异兽志（杜阿特毒蟒与护法奇美拉）',
    subtitle: '太阳夜航船午夜护卫战与玛阿特审判圣兽',
    folioCode: '异兽卷三 · 埃及',
    region: '尼罗河流域、吉萨高原与地下冥界杜阿特',
    culturalSphere: '东北非尼罗河文明圈',
    eraLabel: '约公元前3100 – 公元400年',
    summary:
      '古埃及严格区分“反创造虚无魔怪”（每夜在冥界伏击太阳船的巨蛇阿波菲斯）与“神圣合成护法兽”（吉萨斯芬克斯与双真理大厅天平下的噬心兽阿米特）。',
    worldviewThesis:
      '在埃及，异兽合体并非畸变，而是集结雄狮、鳄鱼、猎隼与法老神威的神圣综合体，用以抵御原初黑暗并执行道德铁律。',
    cosmicAxis: '吉萨太阳地平线 — 双真理审判大厅 — 杜阿特午夜第十二时区',
    keyValues: ['宇宙真理（Ma’at）', '昼夜护日不怠', '神庙诅咒焚蜡仪轨', '罪恶灵魂终极湮灭'],
    sacredSymbols: ['被刺穿焚毁的绿蜡蛇像', '心脏与真理羽毛天平', '法老头巾狮身像', '太阳夜航船首铜矛'],
    realms: [
      { name: '阿赫特（太阳地平线）', description: '巨型斯芬克斯迎候朝阳重升、镇守王陵圣域的沙漠门户。' },
      { name: '双真理审判大厅', description: '阿米特蹲伏于阿努比斯天平之下静候不义者心脏的冥庭。' },
      { name: '巴库山午夜暗河浅滩', description: '阿波菲斯喝干冥河企图截停拉神夜航船的至暗险境。' },
    ],
    primaryTexts: [
      { title: '《推翻阿波菲斯之书》', period: '约前1500–前300年', description: '神庙祭司每日诵读并配合斩碎焚烧阿波菲斯蜡像的护日秘典。' },
      { title: '《冥界书》与《亡灵书》第125章', period: '约前1550–前1000年', description: '彩绘记录夜航十二时区斩蛇图景与阿米特天平审判现场。' },
    ],
    relatedTraditions: [
      { connectionType: '斯芬克斯与提丰互鉴', explanation: '希腊人将赛特/阿波菲斯比附提丰，并将斯芬克斯重构为底比斯谜语怪兽。' },
      { connectionType: '帝国门阙守护兽共鸣', explanation: '埃及斯芬克斯与亚述拉玛苏共同确立了近东王宫神圣奇美拉范式。' },
    ],
  },
  hindu: {
    name: '印度异兽志（那伽龙王、金翅大鹏与旱魔）',
    subtitle: '锁水巨龙弗栗多、夺甘露神鹰迦楼罗与千首承世圣蛇',
    folioCode: '异兽卷四 · 印度',
    region: '南亚次大陆、须弥山与地底帕塔拉龙宫',
    culturalSphere: '印度正法文明圈',
    eraLabel: '约公元前1500年 – 当今（活态传承）',
    summary:
      '印度神话将怪兽学升华为恢弘的宇宙生态：吠陀旱龙弗栗多封锁圣河被因陀罗劈开，而往世书与史诗则让金翅大鹏迦楼罗与异母兄弟那伽龙王（婆苏吉、千首舍沙）共同成为护持三界的神圣支柱。',
    worldviewThesis:
      '即便剧毒巨蛇与猛禽亦各司神圣正法（Dharma）——或化作搅动乳海的绳索，或以千首稳托地球，或展金翼破除奴役。',
    cosmicAxis: '须弥山天顶 — 原初乳海曼陀罗山 — 地底宝石龙宫帕塔拉',
    keyValues: ['破塞释水泽被苍生', '至孝救母无私守诺', '鹰蛇对立与宇宙调和', '神圣坐骑护法精神'],
    sacredSymbols: ['百节金刚雷杵', '千首嵌宝眼镜蛇冠', '遮日黄金鹏翼', '曼陀罗山搅海蛇绳'],
    realms: [
      { name: '须弥山巅与维昆塔神宫', description: '金翅大鹏王迦楼罗侍奉毗湿奴、俯瞰三界的云端圣境。' },
      { name: '原初乳海（Kṣīrasāgara）', description: '诸神与阿修罗以龙王婆苏吉为绳搅出不死甘露的创世之海。' },
      { name: '帕塔拉（那伽宝石地宫）', description: '千首圣龙阿难陀舍沙稳托大地、龙族繁衍生息的璀璨地底王国。' },
    ],
    primaryTexts: [
      { title: '《梨俱吠陀》第1卷第32首（斩弗栗多歌）', period: '约前1500–前1200年', description: '印欧语系最古老壮丽的雷神屠龙释水赞歌。' },
      { title: '《摩诃婆罗多·初篇》（阿斯蒂卡篇）', period: '约前400–公元300年', description: '详述迦楼罗降生、勇夺甘露救母及蛇祭和解的宏篇史诗。' },
    ],
    relatedTraditions: [
      { connectionType: '佛教天龙八部东传', explanation: '那伽（龙王）与迦楼罗随佛经汉译深度融入中、日四海龙王与护法信仰。' },
      { connectionType: '印欧鹰蛇宇宙树轴', explanation: '迦楼罗斗那伽与北欧世界树顶神鹰斗树根黑龙尼德霍格同构。' },
    ],
  },
  chinese: {
    name: '中华山海瑞兽与四凶志（神龙·仁麟·青铜神煞）',
    subtitle: '《山海经》博物宇宙、应龙导洪与周鼎饕餮之诫',
    folioCode: '异兽卷五 · 华夏',
    region: '黄河长江流域、昆仑山系与四海九州',
    culturalSphere: '东亚汉字文化圈',
    eraLabel: '约公元前1600年 – 当今（活态传承）',
    summary:
      '植根于商周青铜礼器与奇书《山海经》，中华异兽体系构建起独特的“德性—自然”光谱：以尾画江助大禹治水的有翼应龙、履草不折贺圣王的麒麟，以及铸于鼎彝警醒贪婪的饕餮。',
    worldviewThesis:
      '瑞兽与凶兽皆是人间德政与山川秩序的感应镜鉴：顺天导水则应龙翔集，仁政爱民则麒麟现世，横敛无度则饕餮自噬。',
    cosmicAxis: '九天风雷云渊 — 九州名山大川 — 宗庙青铜九鼎祭坛',
    keyValues: ['含仁怀义（王道仁政）', '人龙协同治水', '知止戒贪礼制', '山海博物志精神'],
    sacredSymbols: ['画地成江的应龙之尾', '裹肉不伤生的麒麟独角', '商周对称青铜饕餮纹', '摹写百物的镇国九鼎'],
    realms: [
      { name: '昆仑悬圃与九霄云渊', description: '应龙蓄水行雨、麒麟翔集栖息的仙山云境。' },
      { name: '《山海经》五藏山经与海外荒原', description: '记载四百余种奇禽异兽、山神精怪的壮阔博物版图。' },
      { name: '淮阴龟山深渊与大泽', description: '应龙协助大禹以铁索镇压淮水水怪无支祁的水底幽府。' },
    ],
    primaryTexts: [
      { title: '《山海经》（山经·海经·大荒经）', period: '战国至西汉（约前4–前1世纪）', description: '世界最古老系统的神怪地理博物总集，详载应龙、饕餮与诸山异兽。' },
      { title: '《淮南子·墬形训》与《吕氏春秋》', period: '公元前3–前2世纪', description: '确立“毛犊—应龙—麒麟”瑞兽演化谱系及周鼎饕餮自噬训诫。' },
    ],
    relatedTraditions: [
      { connectionType: '《山海经》东传与百鬼夜行', explanation: '《山海经》图本传入日本后直接催生江户时代鸟山石燕《画图百鬼夜行》图谱。' },
      { connectionType: '丝路那伽与华夏神龙合流', explanation: '本土呼风唤雨的应龙与印度佛教那伽龙王融合成东亚四海龙王体系。' },
    ],
  },
  japanese: {
    name: '日本百鬼与神兽志（大蛇·灵狐·大天狗）',
    subtitle: '出云八岐大蛇、稻荷/那须九尾狐与鞍马山修验天狗',
    folioCode: '异兽卷六 · 大和',
    region: '出云斐伊川、京都鞍马山与那须火山原',
    culturalSphere: '日本列岛文化圈',
    eraLabel: '约公元700年 – 当今（活态传承）',
    summary:
      '日本异兽观最迷人处在于“神妖一线”的流动性：同一灵体依人心敬畏可现“荒魂（灾厄）”或“和魂（护法）”——涵盖尾藏草薙神剑的八岐大蛇、亦圣亦妖的九尾狐，以及深山剑圣大天狗。',
    worldviewThesis:
      '妖怪（Yōkai）与神明（Kami）并无绝对高墙；对山川万物怀具诚敬与谦卑，狂暴山妖亦可化作传剑护法的尊神。',
    cosmicAxis: '鞍马山古杉灵峰 — 伏见千本鸟居阈限 — 出云斐伊川血色溪谷',
    keyValues: ['荒魂与和魂转化', '戒除傲慢（破天狗道）', '山林鸟居礼敬', '幻形物哀美学'],
    sacredSymbols: ['蛇尾剖出的天丛云剑', '九尾金毛与幽蓝狐火', '大天狗羽团扇与高木屐', '那须野劈裂杀生石'],
    realms: [
      { name: '鞍马山与爱宕山云杉峰', description: '大天狗僧正坊统领鸦天狗巡护灵山、夜授剑术的秘境。' },
      { name: '稻荷鸟居狐冢与那须毒原', description: '白狐神使护佑丰收与九尾狐杀生石喷吐硫磺毒雾的双面疆域。' },
      { name: '出云斐伊川八谷深渊', description: '八岐大蛇盘踞饮酒、须佐之男挥剑斩妖取神剑的古老河谷。' },
    ],
    primaryTexts: [
      { title: '《古事记》与《日本书纪》', period: '公元712年与720年', description: '详载须佐之男命以八盐折酒醉斩八岐大蛇并献草薙剑的神代正典。' },
      { title: '《今昔物语集》与鸟山石燕《画图百鬼夜行》', period: '约1120年与1776年', description: '汇集天狗挫僧、玉藻前宫廷斗法及日本妖怪视觉定型图谱。' },
    ],
    relatedTraditions: [
      { connectionType: '汉籍瑞狐与天狗本土重塑', explanation: '吸收《山海经》九尾狐与流星天狗概念，结合神道与修验道演化出独具一格的物语。' },
      { connectionType: '跨大陆阈限精怪共鸣', explanation: '狐火、天狗山林与凯尔特仙丘水妖同样守护自然边界、试探凡人贪嗔。' },
    ],
  },
  mesopotamian: {
    name: '美索不达米亚异兽志（提阿玛特魔军与拉玛苏）',
    subtitle: '楔形文字最古老十一类魔兽谱与亚述五足护门神牛',
    folioCode: '异兽卷七 · 两河',
    region: '底格里斯—幼发拉底平原、尼尼微与黎巴嫩雪松林',
    culturalSphere: '古代近东文明圈',
    eraLabel: '约公元前3500 – 前500年',
    summary:
      '两河泥板保存了人类历史上最古老的怪兽总目：咸水母龙提阿玛特诞下怒蛇、蝎人等十一类毒兽，披七重恐怖灵光的胡姆巴巴守护雪松圣林，而三十吨重的带翼人首牛拉玛苏则镇守帝国王门。',
    worldviewThesis:
      '荒原巨兽身披令人敬畏的神圣灵光（Melammu）；文明通过将驯服的怒蛇与仁慈的拉玛苏镌刻于城门之上，维系王都与宇宙的安宁。',
    cosmicAxis: '亚述与巴比伦琉璃城门 — 恩利尔雪松圣山 — 提阿玛特原初咸水渊',
    keyValues: ['神圣怖畏灵光（Melammu）', '王城门槛辟邪', '甜咸二水创世秩序', '砍伐神林的生态悲剧'],
    sacredSymbols: ['伊什塔尔门蓝砖怒蛇', '五足带翼人首牛石雕', '胡姆巴巴七重光环', '胸前命运泥板'],
    realms: [
      { name: '尼尼微王门与伊什塔尔城门', description: '成对矗立巨型拉玛苏与琉璃砖怒蛇穆什胡什的帝国神圣门户。' },
      { name: '黎巴嫩万里雪松圣林', description: '胡姆巴巴奉恩利尔之命以烈火洪水咆哮守护的众神禁林。' },
      { name: '原初苦涩咸水深渊', description: '提阿玛特孕育十一支奇美拉魔军、最终被劈作天地两河的母体汪洋。' },
    ],
    primaryTexts: [
      { title: '《埃努玛·埃利什》（巴比伦创世史诗）', period: '约公元前12世纪定型', description: '详列提阿玛特十一类怪兽名录及裂龙躯造天地神话。' },
      { title: '《吉尔伽美什史诗》第五块泥板', period: '约前2100–前1200年', description: '近年新出土残片补全胡姆巴巴哀求护林与恩奇都促杀招谴的悲壮篇章。' },
    ],
    relatedTraditions: [
      { connectionType: '比较神话屠龙创世鼻祖', explanation: '提阿玛特万魔谱直接启发了赫西俄德《神谱》厄喀德那怪兽家族。' },
      { connectionType: '近东皇家护法奇美拉互动', explanation: '拉玛苏与埃及斯芬克斯、希伯来基路伯共享近东带翼圣兽艺术语汇。' },
    ],
  },
  celtic: {
    name: '凯尔特异兽志（荒海魔眼·仙丘挽歌·寒潭水马）',
    subtitle: '托里岛独眼魔王巴罗尔、报丧女妖与高地变形水马',
    folioCode: '异兽卷八 · 凯尔特',
    region: '爱尔兰、苏格兰高地与大西洋风暴孤岛',
    culturalSphere: '海岛凯尔特文化圈',
    eraLabel: '约公元前800年 – 近代民间活态传说',
    summary:
      '盖尔语世界的超自然生灵横跨神话史诗与荒原溪谷：一瞥焚灭千军的弗摩族魔王巴罗尔、皮毛黏死骑乘者的苏格兰水马凯尔皮，以及在史前仙丘旁为古老家族泣唱挽歌的报丧女妖（班西）。',
    worldviewThesis:
      '荒海、寒潭与古冢皆有灵性记忆；异兽与仙丘使者守护着土地主权、血脉尊严以及凡人不可轻慢的自然险境。',
    cosmicAxis: '托里岛风暴水晶塔 — 史前石冢仙丘（Sídhe） — 高地黑水寒潭渡口',
    keyValues: ['神圣土地主权', '家族血脉挽歌哀荣', '险水边界敬畏', '宿命预言必验'],
    sacredSymbols: ['四钩掀开的剧毒魔眼', '月下白银发梳', '刻咒冷铁水马笼头', '荒溪洗涤的染血战袍'],
    realms: [
      { name: '托里岛悬崖水晶塔', description: '魔王巴罗尔幽禁独女却仍难逃外孙鲁格飞石穿瞳的大西洋孤堡。' },
      { name: '史前通道石冢仙丘', description: '达努神族退隐地底化作仙丘贵族、报丧女妖夜出梳发的彼世门户。' },
      { name: '苏格兰高地泥炭深湖（Lochs）', description: '变形水马凯尔皮与水妖马潜伏诱捕冒失旅人的冰冷深渊。' },
    ],
    primaryTexts: [
      { title: '《摩伊图拉战役》（Cath Maige Tuired）', period: '约9–11世纪古爱尔兰抄本', description: '完整记载鲁格投石击穿巴罗尔毁灭魔眼反噬弗摩大军的决战。' },
      { title: '苏格兰与爱尔兰盖尔民间口传档案', period: '12–19世纪采录', description: '保存数百年来报丧女妖家族哀歌与智夺凯尔皮笼头的经典传说。' },
    ],
    relatedTraditions: [
      { connectionType: '印欧外孙弑祖与魔眼同源', explanation: '巴罗尔—艾思林—鲁格与希腊阿克里西俄斯—达那厄—珀尔修斯斩美杜莎同出一源。' },
      { connectionType: '母系超自然守望共鸣', explanation: '报丧女妖与约鲁巴夜鸟圣母埃莱耶皆突破世俗偏见，尊崇女性预知与守护威权。' },
    ],
  },
  mesoamerican: {
    name: '中美洲异兽志（大地鳄母·蚀日星魔·尾手水怪）',
    subtitle: '十八关节噬血巨鳄、日食骸骨女神军与雨神特拉洛克捞魂兽',
    folioCode: '异兽卷九 · 美洲',
    region: '墨西哥谷地、特斯科科湖与高原盆地',
    culturalSphere: '纳瓦（阿兹特克）与玛雅文明圈',
    eraLabel: '约公元前1500 – 1521年（当代纳瓦活态余韵）',
    summary:
      '在中美洲宇宙生态中，人类直接行走于关节长满饥饿巨口的活体大地鳄怪希帕克特利背上，头顶潜伏着日食时俯冲的星辰骸骨女神齐齐米梅，芦苇湖渊则游弋着尾尖长人手的阿维索特尔。',
    worldviewThesis:
      '恐怖吞噬与生命滋养一体两面：索要心血的大地巨鳄正是孕育玉米的慈母，而可怖的蚀日星魔在平日恰恰是守护产妇分娩的护法神。',
    cosmicAxis: '繁星蚀日天幕 — 特斯科科湖芦苇漩涡 — 啼哭索血的大地鳄背',
    keyValues: ['宇宙血债互惠（Nextlahualli）', '毁灭与护生辩证合一', '五十二年历法圣火守望', '溺水升入雨神乐园之拣选'],
    sacredSymbols: ['全身关节利齿凯门鳄纹', '卷尾末端握物人手', '骷髅与人心祭司项圈', '五十二年新火钻木台'],
    realms: [
      { name: '繁星暗夜天穹', description: '齐齐米梅星魔军团潜伏守望、等待日全食或新火熄灭的夜空防线。' },
      { name: '特斯科科湖水底洞窟', description: '阿维索特尔拟婴啼诱捕渔人、将灵魂送入雨神常春乐园特拉洛坎的深渊。' },
      { name: '特拉尔特库赫特利活体大地', description: '被羽蛇神与烟镜神撕裂化作山川草木却仍每夜饥渴咆哮的大地母体。' },
    ],
    primaryTexts: [
      { title: '《墨西哥人历史》与《博尔吉亚手抄本》', period: '前哥伦布时期 / 16世纪初', description: '生动彩绘并记录双神撕裂巨鳄创世与星辰女魔齐齐米梅图像。' },
      { title: '《佛罗伦萨手抄本》第十一卷（地上万物）', period: '约1577年', description: '萨阿贡与纳瓦长老图文并茂详录尾手水怪阿维索特尔习性与葬仪。' },
    ],
    relatedTraditions: [
      { connectionType: '跨洋独立演化的裂兽创世', explanation: '希帕克特利与巴比伦提阿玛特在不相往来的两半球各自演化出撕裂水怪化生天地神话。' },
      { connectionType: '水域拟态诱捕民俗平行', explanation: '阿维索特尔与苏格兰凯尔皮共同警示水畔险境，却赋予独特的乐园升天慰藉。' },
    ],
  },
  yoruba: {
    name: '约鲁巴神圣生态与异灵志（彩虹蟒·圣豹·夜鸟圣母）',
    subtitle: '盘固地球的彩虹巨蟒奥舒马雷、奥巴王权花豹与伊罗科树夜灵',
    folioCode: '异兽卷十 · 西非',
    region: '西非约鲁巴兰、贝宁雨林带与跨大西洋散居圈',
    culturalSphere: '西非与非裔美洲活态传统',
    eraLabel: '约公元前500年 – 当今（活态传承）',
    summary:
      '约鲁巴哲学将神圣巨兽与暗夜异灵编织进精密的宇宙制衡网络：彩虹巨蟒奥舒马雷在深海与天穹间盘固地球，皇家圣豹埃昆以沉静威仪诠释王道，而伊罗科树顶的夜鸟圣母埃莱耶则与八大灾厄魔将阿乔贡形成庄严张力。',
    worldviewThesis:
      '深不可测的超自然力量绝不能靠狂妄武力剿灭，唯有凭借温雅品格（Ìwà Pẹ̀lẹ́）、献祭调停（Ẹbọ）、伊法智慧与盖莱德艺术方能达成宇宙和谐。',
    cosmicAxis: '奥润天界七彩虹桥 — 午夜伊罗科神树树冠 — 雨林王廷与深海盘蛇柱',
    keyValues: ['沉静威仪（Ìwà Pẹ̀lẹ́）', '献祭与协商外交（Ẹbọ）', '尊奉母系长老权柄（Àjé）', '周流不息的生命律动'],
    sacredSymbols: ['首尾相衔黄铜彩虹蟒环', '白布覆面的皇家花豹皮', '串珠王冠顶端神鸟（Adé）', '锻铁十六鸟首法杖'],
    realms: [
      { name: '横跨天海的七彩虹穹', description: '奥舒马雷连接天界奥润与深海、输导甘霖与福祉的光明通道。' },
      { name: '午夜伊罗科神树与十字路口', description: '夜鸟圣母埃莱耶集会监督人间公义、埃舒传递祭品化解八苦的阈限圣地。' },
      { name: '神圣雨林禁苑与海底蛇盘', description: '丛林真王花豹埃昆巡行与巨蟒稳托大地根基的深邃疆域。' },
    ],
    primaryTexts: [
      { title: '《伊法圣典》（Odù Ifá：奥萨梅吉等章）', period: '远古口传至当代活态圣典', description: '详载奥伦米拉同夜鸟圣母结盟、花豹受赐斑纹与彩虹巨蟒神话。' },
      { title: '盖莱德（Gẹ̀lẹ̀dẹ́）赞歌与伊费—贝宁宫廷铜雕', period: '约12世纪 – 当今', description: '联合国非遗假面舞诗篇与举世闻名的皇家失蜡法黄铜双豹及巨蟒雕像。' },
    ],
    relatedTraditions: [
      { connectionType: '承托宇宙的神圣巨蛇观', explanation: '奥舒马雷与印度千首那伽舍沙同样将巨蟒奉为防止大地崩解的宇宙栋梁。' },
      { connectionType: '内圣外王的帝王瑞兽观', explanation: '圣豹埃昆与中华麒麟皆强调君主“含威不露、慎用雷霆”的至高修养。' },
    ],
  },
};

export const BESTIARY_TRADITIONS_ZH: Tradition[] = BESTIARY_TRADITIONS_EN.map((t) => {
  const ov = TRAD_ZH_OV[t.id];
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
    realms: t.realms.map((r, i) => ({
      ...r,
      name: ov.realms[i]?.name ?? r.name,
      description: ov.realms[i]?.description ?? r.description,
    })),
    primaryTexts: t.primaryTexts.map((pt, i) => ({
      ...pt,
      title: ov.primaryTexts[i]?.title ?? pt.title,
      period: ov.primaryTexts[i]?.period ?? pt.period,
      description: ov.primaryTexts[i]?.description ?? pt.description,
    })),
    relatedTraditions: t.relatedTraditions.map((rt, i) => ({
      ...rt,
      connectionType: ov.relatedTraditions[i]?.connectionType ?? rt.connectionType,
      explanation: ov.relatedTraditions[i]?.explanation ?? rt.explanation,
    })),
  };
});

export const BESTIARY_ROUTES_EN: DiffusionRoute[] = [
  {
    id: 'pie-continuum',
    name: 'Proto-Indo-European Dragon-Slayer & Hell-Hound Continuum',
    eraLabel: 'c. 3500 – 800 BCE',
    startYear: -3500,
    endYear: -800,
    summary:
      'Steppe bards carried the formula *éghan áhim ("he slew the serpent") and spotted underworld gate-hounds (*Ḱérberos) across Eurasia—yielding Vedic Vritra, Greek Typhon/Hydra & Cerberus, Norse Jörmungandr & Garmr, and Celtic Balor.',
    scholarlyMechanism: 'Inherited oral meter (Caland Calvert Watkins’s "How to Kill a Dragon") & cognate monster epithets',
    traditionIds: ['celtic', 'norse', 'greek', 'hindu'],
    svgPath: 'M 468 158 Q 492 132 515 125 T 548 196 Q 630 192 705 252',
  },
  {
    id: 'fertile-crescent-aegean',
    name: 'Near Eastern Chimera & Multi-Headed Serpent Conduit',
    eraLabel: 'c. 2200 – 600 BCE',
    startYear: -2200,
    endYear: -600,
    summary:
      'Mesopotamian cylinder seals of seven-headed serpents (Mušmaḫḫū), winged gate-lions (Lamassu), and Hurrian-Babylonian dragon wars traveled via Syria and Phoenician ivory trade directly into Orientalizing Greece’s Hydra, Chimera, and Typhon.',
    scholarlyMechanism: 'Cylinder-seal iconography, carved Levantine ivories, and bilingual Hurrian-Hittite ports',
    traditionIds: ['mesopotamian', 'egyptian', 'greek'],
    svgPath: 'M 608 218 Q 590 234 572 238 M 608 218 Q 578 198 548 196',
  },
  {
    id: 'hellenistic-nile',
    name: 'Nile–Aegean Sphinx & Typhon-Seth Reinterpretation',
    eraLabel: 'c. 1400 BCE – 300 CE',
    startYear: -1400,
    endYear: 300,
    summary:
      'Royal Egyptian male Sphinxes entered Mycenaean and archaic Greek art and morphed into the winged female riddler of Thebes, while Greek travelers identified Typhon’s flight with Egypt’s chaos-serpent Apophis and storm-god Seth.',
    scholarlyMechanism: 'Maritime trade in Naukratis/Crete and Greco-Egyptian mythographic syncretism',
    traditionIds: ['egyptian', 'greek'],
    svgPath: 'M 572 238 Q 554 220 548 196',
  },
  {
    id: 'silk-road-east-asia',
    name: 'Nāga–Long Synthesis & Shan Hai Jing Yōkai Transmission',
    eraLabel: 'c. 100 – 1780 CE',
    startYear: 100,
    endYear: 1780,
    summary:
      'Buddhist translators fused Indic Nāga kings and solar Garuda with Chinese rain-dragons (Long), while woodblock editions of China’s Shan Hai Jing carried nine-tailed foxes, Qilin, and Tiangou across the sea into Japan’s Kitsune, Kirin, and Tengu.',
    scholarlyMechanism: 'Sutra translation, Tang-Song maritime envoys, and Edo woodblock bestiary encyclopedias',
    traditionIds: ['hindu', 'chinese', 'japanese'],
    svgPath: 'M 705 252 Q 742 208 785 212 Q 822 206 856 204',
  },
  {
    id: 'atlantic-orisha-diaspora',
    name: 'Afro-Atlantic Rainbow Serpent & Sacred Ecology Corridor',
    eraLabel: 'c. 1500 CE – Present',
    startYear: 1500,
    endYear: 2026,
    summary:
      'Yoruba and Fon initiates carried sacred traditions of rainbow python Oshumare/Dan, royal leopard Ekun, and revered night-mothers across the Atlantic to Brazil, Cuba, and Haiti, conversing in the Americas with indigenous feathered and caiman serpent cosmologies.',
    scholarlyMechanism: 'Diasporic Ifá/Candomblé/Vodou liturgical continuity, beadwork, and rhythmic invocation',
    traditionIds: ['yoruba', 'mesoamerican'],
    svgPath: 'M 504 312 Q 368 332 238 274',
  },
];

const ROUTE_ZH_OV: Record<string, { name: string; eraLabel: string; summary: string; scholarlyMechanism: string }> = {
  'pie-continuum': {
    name: '原始印欧“屠龙公式”与冥府守门犬传播带',
    eraLabel: '约公元前3500 – 前800年',
    summary: '欧亚草原吟游诗人将“*éghan áhim（斩杀巨蛇）”古诗公式与冥府守门犬词根传向四方，演化出吠陀弗栗多、希腊提丰/许德拉与刻耳柏洛斯、北欧耶梦加得及凯尔特巴罗尔。',
    scholarlyMechanism: '印欧同源诗歌格律（沃特金斯《如何屠龙》研究）与怪兽同源名号',
  },
  'fertile-crescent-aegean': {
    name: '近东七首蛇印章与带翼奇美拉西传走廊',
    eraLabel: '约公元前2200 – 前600年',
    summary: '美索不达米亚滚筒印章上的七首水蛇、带翼护门兽拉玛苏及创世屠龙神话，经叙利亚与腓尼基象牙贸易传入“东方化时期”希腊，直接催生九头蛇与奇美拉图像。',
    scholarlyMechanism: '楔形印章图像、黎凡特象牙浮雕与安纳托利亚双语口岸',
  },
  'hellenistic-nile': {
    name: '尼罗河—爱琴海斯芬克斯蜕变与提丰叠合线',
    eraLabel: '约公元前1400 – 公元300年',
    summary: '埃及仁慈庄严的法老斯芬克斯跨海进入迈锡尼与古风希腊，演变为带翼食人的底比斯谜语女妖；同时希腊学者将提丰之乱与埃及混沌神赛特/阿波菲斯相互比附。',
    scholarlyMechanism: '克里特—瑙克拉提斯海贸及希腊化时期神怪谱系互译',
  },
  'silk-road-east-asia': {
    name: '那伽—神龙合流与《山海经》百鬼东传之路',
    eraLabel: '约公元100 – 1780年',
    summary: '佛经翻译将印度那伽龙王与迦楼罗融入中华龙族信仰；同时《山海经》刻本东渡日本，令青丘九尾狐、麒麟与天狗演化为稻荷灵狐/玉藻前、麒麟与鞍马大天狗。',
    scholarlyMechanism: '译经院、遣唐使典籍交流与江户时代木刻妖怪百科图谱',
  },
  'atlantic-orisha-diaspora': {
    name: '跨大西洋彩虹巨蟒与神圣森林生态走廊',
    eraLabel: '约公元1500年 – 当今',
    summary: '西非约鲁巴与丰族信众跨越重洋，将彩虹巨蟒奥舒马雷、皇家圣豹埃昆与夜鸟圣母传统保存于巴西Candomblé与加勒比信仰中，并与美洲本土巨蟒鳄怪宇宙观遥相呼应。',
    scholarlyMechanism: '跨洋口传伊法圣诗、串珠铁艺圣物与神圣鼓乐仪轨',
  },
};

export const BESTIARY_ROUTES_ZH: DiffusionRoute[] = BESTIARY_ROUTES_EN.map((r) => ({
  ...r,
  ...(ROUTE_ZH_OV[r.id] ?? {}),
}));

export const BESTIARY_MILESTONES_EN: ChronoMilestone[] = [
  { id: 'ms-sumer-tablets', year: -2500, yearLabel: 'c. 2500 BCE', traditionId: 'mesopotamian', title: 'Sumerian Seven-Headed Serpent Seals', category: 'cosmology', description: 'Early Dynastic cylinder seals from Tell Asmar depict a hero cauterizing/slaying the seven-headed serpent Mušmaḫḫū—centuries before Greece’s Hydra.' },
  { id: 'ms-pyramid-texts', year: -2500, yearLabel: 'c. 2500 BCE', traditionId: 'egyptian', title: 'Carving of the Great Sphinx of Giza', category: 'ritual', description: 'Old Kingdom sculptors carve the 73-meter limestone Sphinx beside Khafre’s causeway as solar guardian of the necropolis.' },
  { id: 'ms-gilgamesh-ob', year: -1800, yearLabel: 'c. 1800 BCE', traditionId: 'mesopotamian', title: 'Old Babylonian Humbaba Tablets', category: 'text', description: 'Cuneiform tablets record Huwawa/Humbaba clothed in seven radiant terrors guarding the sacred Cedar Forest.' },
  { id: 'ms-shang-oracle', year: -1300, yearLabel: 'c. 1300 BCE', traditionId: 'chinese', title: 'Anyang Shang Ritual Taotie Bronzes', category: 'ritual', description: 'Master bronze-casters at Yinxu cast symmetrical Taotie animal masks and Kui dragons onto royal ding cauldrons.' },
  { id: 'ms-rigveda', year: -1200, yearLabel: 'c. 1200 BCE', traditionId: 'hindu', title: 'Rigveda 1.32: Indra Slays Vritra', category: 'text', description: 'Vedic rishis compose the classic hymn of Indra cleaving drought-serpent Vritra to free the Seven Rivers.' },
  { id: 'ms-book-dead', year: -1250, yearLabel: 'c. 1250 BCE', traditionId: 'egyptian', title: 'Papyrus of Ani Depicts Ammit & Apophis', category: 'cosmology', description: 'New Kingdom illuminated papyri vividly paint hybrid devourer Ammit beneath Anubis’s scales and solar cat slaying Apophis.' },
  { id: 'ms-olmec-feathered', year: -900, yearLabel: 'c. 900 BCE', traditionId: 'mesoamerican', title: 'Olmec Earth-Caiman & Plumed Serpent Reliefs', category: 'cosmology', description: 'La Venta and Chalcatzingo monuments carve gaping earth-monster jaws that prefigure Aztec Cipactli.' },
  { id: 'ms-homer-hesiod', year: -700, yearLabel: 'c. 700 BCE', traditionId: 'greek', title: 'Hesiod’s Monster Genealogy in Theogony', category: 'text', description: 'Hesiod unifies Typhon, Echidna, Cerberus, Hydra, and Chimera into one subterranean family tree.' },
  { id: 'ms-shan-hai-jing', year: -300, yearLabel: 'c. 300 BCE', traditionId: 'chinese', title: 'Compilation of Shan Hai Jing Bestiary', category: 'text', description: 'Warring States–Han cosmographers compile the Classic of Mountains and Seas describing Yinglong, Nine-Tailed Foxes, and strange beasts.' },
  { id: 'ms-sanskrit-epics', year: 100, yearLabel: 'c. 100 CE', traditionId: 'hindu', title: 'Mahabharata Astika Parva: Garuda & Nagas', category: 'syncretism', description: 'Sanskrit epic canonizes Garuda’s seizure of Amrita and Vasuki’s churning of the Ocean of Milk.' },
  { id: 'ms-kojiki', year: 712, yearLabel: '712 CE', traditionId: 'japanese', title: 'Kojiki Records Yamata-no-Orochi', category: 'text', description: 'Court chronicler Ō no Yasumaro records Susanoo’s eight-vat stratagem against the eight-forked Izumo serpent.' },
  { id: 'ms-irish-mss', year: 1050, yearLabel: 'c. 1050 CE', traditionId: 'celtic', title: 'Cath Maige Tuired: Balor of the Evil Eye', category: 'text', description: 'Middle Irish scribes preserve the battle saga of Lugh shattering Fomorian giant Balor’s venomous eye.' },
  { id: 'ms-eddas', year: 1220, yearLabel: 'c. 1220 CE', traditionId: 'norse', title: 'Eddas Codify Fenrir, Jörmungandr & Níðhöggr', category: 'text', description: 'Icelandic manuscripts preserve Völuspá and Snorri’s account of Loki’s monstrous brood at Ragnarök.' },
  { id: 'ms-ile-ife', year: 1350, yearLabel: 'c. 1350 CE', traditionId: 'yoruba', title: 'Ife & Benin Royal Brass Leopards & Pythons', category: 'ritual', description: 'West African master casters create lost-wax brass leopards (Ekun) and palace roof pythons honoring Oba sovereignty.' },
  { id: 'ms-templo-popol', year: 1502, yearLabel: '1502 CE', traditionId: 'mesoamerican', title: 'Tlaltecuhtli Monolith & Ahuizotl Imperial Crest', category: 'ritual', description: 'Tenochtitlan sculptors carve the colossal earth-monster monolith at Templo Mayor during Emperor Ahuizotl’s era.' },
  { id: 'ms-unesco-living', year: 2008, yearLabel: '2008 CE', traditionId: 'yoruba', title: 'UNESCO Inscribes Gẹ̀lẹ̀dẹ́ Heritage Honoring Ìyá Nlá', category: 'ritual', description: 'Global recognition of Yoruba Gẹ̀lẹ̀dẹ́ masquerades honoring elder female bird-mothers (Eleye / Àwọn Ìyá Wa).' },
];

const MS_ZH_OV: Record<string, { yearLabel: string; title: string; description: string }> = {
  'ms-sumer-tablets': { yearLabel: '约前2500年', title: '苏美尔滚筒印章首现七首蛇图像', description: '阿斯马尔遗址早王朝滚筒印章刻画英雄斩杀火烙七首水蛇穆什玛胡，比希腊九头蛇早逾千年。' },
  'ms-pyramid-texts': { yearLabel: '约前2500年', title: '吉萨大狮身人面像（斯芬克斯）落成', description: '古王国工匠在哈夫拉金字塔神道旁由整块巨岩雕出73米长的太阳王权守护兽。' },
  'ms-gilgamesh-ob': { yearLabel: '约前1800年', title: '古巴比伦泥板记载雪松林守护兽胡姆巴巴', description: '楔形泥板详述身披七重恐怖灵光（Melammu）镇守众神森林的巨灵胡瓦瓦。' },
  'ms-shang-oracle': { yearLabel: '约前1300年', title: '殷墟商代青铜鼎彝铸造巅峰饕餮纹', description: '安阳殷墟青铜铸师在王室重器上铸就庄严对称的兽面饕餮纹与夔龙纹。' },
  'ms-rigveda': { yearLabel: '约前1200年', title: '《梨俱吠陀》颂唱因陀罗斩旱龙弗栗多', description: '吠陀诗仙谱写第1卷第32首赞歌，传唱金刚杵劈开盘山巨蛇释放七条圣河。' },
  'ms-book-dead': { yearLabel: '约前1250年', title: '《阿尼纸草书》彩绘噬心兽阿米特与斩蛇图', description: '新王国彩绘亡灵书定格阿米特蹲守真理天平及太阳猫斩阿波菲斯的经典图像。' },
  'ms-olmec-feathered': { yearLabel: '约前900年', title: '奥尔梅克大地鳄怪巨口浮雕诞生', description: '拉文塔与查尔卡钦戈石雕展现吞吐云雨的大地凯门鳄巨口，开启希帕克特利先声。' },
  'ms-homer-hesiod': { yearLabel: '约前700年', title: '赫西俄德《神谱》确立希腊万妖谱系', description: '将提丰、厄喀德那、三头犬刻耳柏洛斯、九头蛇与奇美拉整合为地底怪物家族树。' },
  'ms-shan-hai-jing': { yearLabel: '约前300年', title: '奇书《山海经》汇纂华夏百兽神怪图志', description: '战国至汉代方士学者编定山海博物总集，收录应龙、青丘九尾狐与钩吾饕餮。' },
  'ms-sanskrit-epics': { yearLabel: '约公元100年', title: '《摩诃婆罗多》定型迦楼罗与那伽龙王史诗', description: '梵文史诗完整叙述金翅大鹏夺甘露救母及龙王婆苏吉搅动乳海神话。' },
  'ms-kojiki': { yearLabel: '公元712年', title: '《古事记》记载八岐大蛇与草薙神剑', description: '太安万侣笔录须佐之男设八槽烈酒醉斩八首大蛇、剖尾得天丛云剑始末。' },
  'ms-irish-mss': { yearLabel: '约1050年', title: '《摩伊图拉战役》抄本记录邪眼魔王巴罗尔', description: '中古爱尔兰修士抄录光神鲁格投石击穿弗摩族巨人巴罗尔剧毒魔眼的史诗。' },
  'ms-eddas': { yearLabel: '约1220年', title: '冰岛《埃达》编纂芬里尔、耶梦加得与黑龙', description: '羊皮古卷完整保存洛基末日三魔嗣及诸神黄昏人兽同归于尽的悲歌。' },
  'ms-ile-ife': { yearLabel: '约1350年', title: '伊费与贝宁宫廷失蜡法铸造黄铜圣豹与巨蟒', description: '西非王室铸铜巨匠创作精妙绝伦的皇家花豹（Ekun）与宫殿屋脊守护巨蟒。' },
  'ms-templo-popol': { yearLabel: '公元1502年', title: '大神庙雕成大地巨兽石雕与阿维索特尔皇徽', description: '特诺奇蒂特兰阿维索特尔皇帝时期雕成重达12吨的大地鳄母特拉尔特库赫特利巨石。' },
  'ms-unesco-living': { yearLabel: '公元2008年', title: '礼赞夜鸟圣母的约鲁巴“盖莱德”列入非遗', description: '联合国教科文组织将尊奉母系超自然力量（埃莱耶）的盖莱德假面舞列入人类非遗代表作。' },
};

export const BESTIARY_MILESTONES_ZH: ChronoMilestone[] = BESTIARY_MILESTONES_EN.map((m) => ({
  ...m,
  ...(MS_ZH_OV[m.id] ?? {}),
}));

export const BESTIARY_HOOKS_EN = {
  traditionShortHook: {
    greek: 'Typhon’s volcanic brood, regenerating Hydra heads, and Hades’ three-headed hound.',
    norse: 'Gleipnir-bound Fenrir, world-coiling Jörmungandr, and root-gnawing Níðhöggr.',
    egyptian: 'Apophis in the midnight Duat, heart-eating Ammit, and solar Giza Sphinxes.',
    hindu: 'Drought-coiling Vritra, golden-winged Garuda, and thousand-hooded Naga kings.',
    chinese: 'River-carving winged Yinglong, gentle sage-unicorn Qilin, and bronze Taotie.',
    japanese: 'Sword-bearing Yamata-no-Orochi, nine-tailed Kitsune, and winged Kurama Tengu.',
    mesopotamian: 'Salt-dragon Tiamat’s eleven monsters, Cedar-warden Humbaba, and winged Lamassu.',
    celtic: 'Balor’s army-scorching Evil Eye, Highland loch Kelpies, and keening Bean Sídhe.',
    mesoamerican: 'Joint-mouthed earth-caiman Cipactli, tail-handed Ahuizotl, and eclipse Tzitzimimeh.',
    yoruba: 'World-binding rainbow python Oshumare, royal leopard Ekun, and midnight Eleye birds.',
  } as Record<TraditionId, string>,
  motifShortTagline: {
    'sea-leviathan': 'World-encircling serpents and salt-sea dragons holding or shattering the ocean rim.',
    'multi-headed': 'Regenerating venom necks, eightfold river gorges, and thousand-hooded cobra crowns.',
    'hell-hounds': 'Three-headed gatekeepers, heart-devouring scales, and hungry earth-jaws below.',
    'sacred-chimeras': 'Benevolent unicorns, five-legged winged bulls, and royal leopards guarding just rule.',
    shapeshifters: 'Nine-tailed fox illusions, adhesive water-steeds, and infant-mimicking lake lures.',
    'apocalypse-beasts': 'Fetter-snapping wolves, eclipse star-daemons, and midnight sun-swallowers.',
  } as Record<string, string>,
  radarAxes: [
    'Cataclysmic Scale',
    'Arcane & Omen Lore',
    'Ferocity & Venom',
    'Shapeshifting Guile',
    'Abyssal Dread',
  ] as const,
};

export const BESTIARY_HOOKS_ZH = {
  traditionShortHook: {
    greek: '百首火山巨怪提丰、断首再生九头蛇与哈迪斯三头冥犬。',
    norse: '魔链困锁的吞神魔狼芬里尔、环世海蟒耶梦加得与啮根黑龙。',
    egyptian: '午夜杜阿特噬日毒蟒阿波菲斯、天平噬心兽阿米特与吉萨狮身像。',
    hindu: '盘山锁水旱龙弗栗多、夺甘露金翅大鹏与千首承世那伽龙王。',
    chinese: '以尾画江的有翼应龙、履草不折之仁兽麒麟与商周青铜饕餮。',
    japanese: '尾藏草薙剑的八岐大蛇、亦圣亦妖九尾狐与鞍马山剑圣大天狗。',
    mesopotamian: '诞十一魔军的咸水母龙提阿玛特、雪松林胡姆巴巴与五足拉玛苏。',
    celtic: '托里岛毁灭魔眼巴罗尔、黏肤沉渊水马凯尔皮与仙丘报丧女妖。',
    mesoamerican: '全身关节噬血的大地鳄母、尾生人手的湖怪与日食星辰女魔。',
    yoruba: '箍紧地球的彩虹巨蟒奥舒马雷、奥巴皇家花豹与伊罗科树夜鸟圣母。',
  } as Record<TraditionId, string>,
  motifShortTagline: {
    'sea-leviathan': '盘绕深海或箍紧大地的宇宙巨蟒与太古咸水创世母龙。',
    'multi-headed': '火烙方绝的再生毒颈、横跨八谷的酒槽大蛇与千首护法蛇冠。',
    'hell-hounds': '镇守冥河青铜门的三首魔犬、天平下的鳄首噬心兽与饥渴大地之口。',
    'sacred-chimeras': '肉角裹锋的仁麟、五足带翼护门神牛与不怒自威的皇家花豹。',
    shapeshifters: '千年九尾狐火幻术、诱人跨乘的高地水马与学婴啼的深湖异兽。',
    'apocalypse-beasts': '挣断魔链吞日的巨狼、日全食俯冲的骸骨星魔与午夜虚无大蛇。',
  } as Record<string, string>,
  radarAxes: [
    '灭世威能',
    '天兆与秘法',
    '凶煞与剧毒',
    '幻形与诡谲',
    '深渊怖畏',
  ] as const,
};
