import type { ArchetypeMeta, Tradition } from '../types/mythology';

export const ARCHETYPES: ArchetypeMeta[] = [
  {
    id: 'sky-sovereign',
    label: 'Sky & Thunder Sovereigns',
    shortLabel: 'Sky Sovereign',
    subtitle: 'Cosmic kingship, atmospheric oaths, and celestial order',
    scholarlyNote:
      'Comparative philology links Indo-European sky-fathers (*Dyēus ph₂tēr -> Zeus, Jupiter, Dyaus) while non-Indo-European traditions pair celestial sovereignty with divine mandate (Tian/Jade Emperor, Amun-Ra, Shango).',
  },
  {
    id: 'trickster-guide',
    label: 'Tricksters & Liminal Guides',
    shortLabel: 'Trickster & Guide',
    subtitle: 'Boundary-crossers, culture-bringers, and sacred disruptors',
    scholarlyNote:
      'Tricksters occupy thresholds—crossroads, doorways, and translations between gods and mortals. Figures like Hermes, Eshu, Loki, Enki, and Sun Wukong expose hubris while delivering vital cultural gifts.',
  },
  {
    id: 'underworld-ruler',
    label: 'Underworld & Afterlife Rulers',
    shortLabel: 'Underworld & Judgement',
    subtitle: 'Guardians of ancestral realms, moral reckoning, and rebirth',
    scholarlyNote:
      'Chthonic sovereigns reflect how each civilization imagined death: moral weighing of the heart (Osiris/Ma’at), karmic bureaucracy (Yama/Yanluo), shadowy kinship (Hel, Hades, Ereshkigal), or regenerative cycle (Mictlantecuhtli).',
  },
  {
    id: 'wisdom-order',
    label: 'Wisdom, Craft & Cosmic Law',
    shortLabel: 'Wisdom & Craft',
    subtitle: 'Scribes of destiny, weavers of civilization, and sacred measure',
    scholarlyNote:
      'Many pantheons distinguish raw force from measured wisdom (metis, ma’at, rta, ashe): Athena, Thoth, Saraswati, Enki, Quetzalcoatl, and Orunmila anchor literacy, divination, music, and just governance.',
  },
  {
    id: 'solar-renewal',
    label: 'Solar, Lunar & Cosmic Renewal',
    shortLabel: 'Solar & Renewal',
    subtitle: 'Light-bearers, agricultural seasons, and the daily triumph over night',
    scholarlyNote:
      'Solar and celestial deities dramatize impermanence and return—whether Amaterasu emerging from the rock cave, Ra sailing through the twelve hours of night, or Huitzilopochtli sustaining the Fifth Sun.',
  },
  {
    id: 'war-storm',
    label: 'Storm Champions & Chaos Slayers',
    shortLabel: 'Storm & Valor',
    subtitle: 'Defenders of the inhabited world against primordial monsters',
    scholarlyNote:
      'In the classic Chaoskampf motif, a dynamic storm or warrior deity—Thor, Indra, Marduk, Susanoo, Heracles, or Set aboard Ra’s solar barque—confronts an abyssal serpent to preserve cosmic order.',
  },
];

export const TRADITIONS: Tradition[] = [
  {
    id: 'greek',
    name: 'Greek & Classical',
    subtitle: 'Olympian Tragedy, Heroic Kleos & Civic Cult',
    folioCode: 'FOLIO I · MEDITERRANEAN',
    region: 'Aegean Sea, Mainland Greece & Magna Graecia',
    culturalSphere: 'Hellenic & Greco-Roman Mediterranean',
    eraLabel: 'c. 1600 BCE – 400 CE',
    startYear: -1600,
    endYear: 400,
    isLivingTradition: false,
    summary:
      'Rooted in Mycenaean oral song and crystallized by Hesiod, Homer, and Athenian tragedy, Greek mythology stages cosmos-shaping succession wars and probes mortal limits against fate (Moira) and hubris.',
    worldviewThesis:
      'Order (Kosmos) is wrested from primordial Chaos through generational succession, civic oaths, and hard-won self-knowledge ("Know Thyself") rather than human immortality.',
    cosmicAxis: 'Mount Olympus, Delphi (the Omphalos navel-stone), and subterranean Tartarus',
    keyValues: ['Xenia (Sacred Hospitality)', 'Sophrosyne (Moderation)', 'Kleos (Undying Renown)', 'Hubris & Nemesis'],
    sacredSymbols: ['Aegis & Thunderbolt', 'Laurel Wreath', 'Caduceus', 'Owl of Wisdom'],
    realms: [
      {
        name: 'Mount Olympus & Aether',
        tier: 'upper',
        description: 'Cloud-crowned seat of the Twelve Olympians where ambrosia and divine counsel govern sky and polis.',
      },
      {
        name: 'Oikoumene & Sacred Sanctuaries',
        tier: 'middle',
        description: 'The mortal Mediterranean ring-sea anchored by panhellenic shrines at Delphi, Eleusis, and Olympia.',
      },
      {
        name: 'Hades, Elysium & Tartarus',
        tier: 'lower',
        description: 'Bounded by Styx and Acheron: Asphodel Meadows for ordinary shades, Elysium for the blessed, Tartarus for cosmic rebels.',
      },
    ],
    primaryTexts: [
      {
        title: 'Hesiod’s Theogony & Works and Days',
        period: 'c. 700 BCE',
        description: 'Genealogical hymn tracing creation from Chaos and Gaia to Zeus’s victory over the Titans and Prometheus’s fire.',
      },
      {
        title: 'Homer’s Iliad & Odyssey',
        period: 'c. 750–700 BCE',
        description: 'Monumental epic hexameter poems of the Trojan War, divine intervention, nostos (homecoming), and heroic mortality.',
      },
      {
        title: 'Homeric Hymns & Attic Tragedies',
        period: 'c. 650–405 BCE',
        description: 'Cultic hymns to Demeter, Apollo, and Hermes alongside Aeschylus, Sophocles, and Euripides’ dramatic reinterpretations.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'mesopotamian',
        connectionType: 'Near Eastern Transmission',
        explanation: 'Hesiod’s succession myth (Ouranos–Kronos–Zeus) closely parallels Hurrian-Hittite Kumarbi and Babylonian Enuma Elish.',
      },
      {
        traditionId: 'hindu',
        connectionType: 'Proto-Indo-European Cognates',
        explanation: 'Zeus Pater and Vedic Dyaus Pita share linguistic ancestry, as do dawn-goddesses Eos and Ushas.',
      },
      {
        traditionId: 'egyptian',
        connectionType: 'Hellenistic Syncretism',
        explanation: 'From Herodotus to Ptolemaic Alexandria, Greeks identified Hermes with Thoth (Hermes Trismegistus) and Isis with Demeter.',
      },
    ],
    mapCoords: { x: 548, y: 196 },
  },
  {
    id: 'norse',
    name: 'Norse & Germanic',
    subtitle: 'Nine Realms of Yggdrasil, Wyrd & Ragnarök',
    folioCode: 'FOLIO II · BOREAL NORTH',
    region: 'Scandinavia, Iceland & the North Atlantic',
    culturalSphere: 'North Germanic & Viking Age',
    eraLabel: 'c. 200 – 1300 CE',
    startYear: 200,
    endYear: 1300,
    isLivingTradition: false,
    summary:
      'Preserved in Icelandic Eddic poetry, skaldic verse, and runestones, Norse myth envisions a cosmos suspended in the branches of the ash tree Yggdrasil—where even the gods know their doom at Ragnarök yet meet it with unflinching courage.',
    worldviewThesis:
      'Even divine fortifications are mortal; meaning lies in honor, wisdom paid through sacrifice, hospitality in harsh winters, and steadfastness against inevitable twilight.',
    cosmicAxis: 'Yggdrasil, the World Ash watered by the Norns at Urðarbrunnr',
    keyValues: ['Wyrd / Örlög (Woven Fate)', 'Drengskapr (Honorable Resolve)', 'Frith (Kinship Peace)', 'Sacrifice for Wisdom'],
    sacredSymbols: ['Yggdrasil World Ash', 'Mjölnir Hammer', 'Valknut & Runes', 'Huginn & Muninn Ravens'],
    realms: [
      {
        name: 'Asgard, Vanaheim & Alfheim',
        tier: 'upper',
        description: 'Fortified halls of the Aesir linked by the Bifröst rainbow bridge, alongside Vanir fertility realms and Light Elves.',
      },
      {
        name: 'Midgard & Jötunheimr',
        tier: 'middle',
        description: 'Mortal enclosure encircled by the World Serpent Jörmungandr, bordered by untamed wilderness of the Jötnar.',
      },
      {
        name: 'Niflheim, Helheim & Muspelheim',
        tier: 'lower',
        description: 'Primordial mist and ice beneath Yggdrasil’s roots, Hel’s quiet hall of the unslain dead, and primordial southern fire.',
      },
    ],
    primaryTexts: [
      {
        title: 'The Poetic Edda (Codex Regius)',
        period: 'Oral roots c. 800–1000 CE; MS c. 1270 CE',
        description: 'Anonymous alliterative poems including Völuspá (Prophecy of the Seeress) and Hávamál (Sayings of the High One).',
      },
      {
        title: 'Snorri Sturluson’s Prose Edda',
        period: 'c. 1220 CE',
        description: 'Handbook of skaldic poetics and narrative synthesis (Gylfaginning) preserving creation, Loki’s tricks, and Ragnarök.',
      },
      {
        title: 'Völsunga Saga & Skaldic Kennings',
        period: 'c. 900–1300 CE',
        description: 'Heroic dragon-slaying cycles of Sigurd and Odinic court poetry from Norway and Iceland.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'celtic',
        connectionType: 'North Atlantic Contact',
        explanation: 'Viking-Gaelic contact across Ireland and Scotland cross-pollinated heroic sagas, cauldron lore, and Otherworld voyages.',
      },
      {
        traditionId: 'hindu',
        connectionType: 'Indo-European Mythèmes',
        explanation: 'Ymir’s dismemberment to form earth and sky mirrors Vedic Purusha; Thor vs. Jörmungandr echoes Indra vs. Vritra.',
      },
    ],
    mapCoords: { x: 515, y: 125 },
  },
  {
    id: 'egyptian',
    name: 'Ancient Egyptian',
    subtitle: 'Solar Barques, Sacred Ma’at & the Weighing of the Heart',
    folioCode: 'FOLIO III · NILE VALLEY',
    region: 'Upper & Lower Nile Valley (Kemet)',
    culturalSphere: 'Northeast African & Nilotic',
    eraLabel: 'c. 3100 BCE – 400 CE',
    startYear: -3100,
    endYear: 400,
    isLivingTradition: false,
    summary:
      'Spanning over three millennia of temple inscriptions and funerary papyri along the Nile, Kemetic myth revolves around the daily solar renewal of Ra, the death and resurrection of Osiris, and the preservation of cosmic harmony (Ma’at) against uncreated chaos (Isfet).',
    worldviewThesis:
      'Creation is a fragile island raised from primordial waters (Nun) that must be ritually renewed every dawn through truth, balance, reciprocity, and remembrance of names.',
    cosmicAxis: 'The Primeval Mound (Benben), the Nile’s annual inundation, and the Duat',
    keyValues: ['Ma’at (Truth, Balance & Cosmic Order)', 'Heka (Sacred Creative Speech)', 'Filial Piety (Horus & Isis)', 'Eternal Remembrance'],
    sacredSymbols: ['Ankh (Breath of Life)', 'Eye of Horus (Wedjat)', 'Feather of Ma’at', 'Scarab (Khepri)'],
    realms: [
      {
        name: 'Nut (Celestial Vault) & Solar Barque',
        tier: 'upper',
        description: 'Star-studded body of sky-goddess Nut arched above earth-god Geb, traversed daily by Ra’s barque.',
      },
      {
        name: 'Kemet (The Black Land) & Deshret',
        tier: 'middle',
        description: 'Fertile Nile floodplain of ordered temple cities contrasted with the red desert margins ruled by Set.',
      },
      {
        name: 'The Duat & Field of Reeds (Aaru)',
        tier: 'lower',
        description: 'Twelve nocturnal cavern-hours navigated by Ra and the dead, culminating in the Hall of Two Truths and Osiris’s paradise.',
      },
    ],
    primaryTexts: [
      {
        title: 'Pyramid Texts & Coffin Texts',
        period: 'c. 2400–2000 BCE',
        description: 'Among humanity’s oldest religious corpora, carved in Old Kingdom royal tombs at Saqqara to guide solar and stellar ascent.',
      },
      {
        title: 'Book of Coming Forth by Day (Book of the Dead)',
        period: 'c. 1550–50 BCE',
        description: 'Illustrated New Kingdom papyri containing Spell 125—the Negative Confession and Weighing of the Heart against Ma’at’s feather.',
      },
      {
        title: 'Contendings of Horus and Seth & Memphite Theology',
        period: 'c. 1300–700 BCE',
        description: 'Philosophical creation through Ptah’s heart and tongue alongside the dynastic tribunal between Horus and Set.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'mesopotamian',
        connectionType: 'Bronze Age Royal Exchange',
        explanation: 'Twin riverine civilizations of the Fertile Crescent sharing primordial water cosmogonies (Nun / Abzu) and temple kingship.',
      },
      {
        traditionId: 'greek',
        connectionType: 'Mediterranean Cult Diffusion',
        explanation: 'Mysteries of Isis and Serapis spread throughout Greece and Rome, shaping Mediterranean afterlife soteriology.',
      },
    ],
    mapCoords: { x: 572, y: 238 },
  },
  {
    id: 'hindu',
    name: 'Hindu & Vedic',
    subtitle: 'Cosmic Cycles (Yugas), Dharma & Divine Avatars',
    folioCode: 'FOLIO IV · SOUTH ASIA',
    region: 'Indus–Sarasvati & Gangetic Subcontinent',
    culturalSphere: 'Vedic, Epic & Puranic Indic',
    eraLabel: 'c. 1500 BCE – Present',
    startYear: -1500,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'One of the world’s oldest continuous living mythic traditions, uniting Vedic fire-hymns, Upanishadic metaphysics, the vast Sanskrit epics (Mahabharata and Ramayana), and Puranic lore into a universe of infinite cyclical creations, dissolutions, and divine descents (avatara).',
    worldviewThesis:
      'Multiplicity is the luminous play (Lila) of ultimate reality (Brahman); cosmic and moral equilibrium (Rta / Dharma) unfolds across vast breathing cycles of creation, preservation, and regenerative dissolution.',
    cosmicAxis: 'Mount Meru at the center of Jambudvipa, bridging Triloka (Three Worlds)',
    keyValues: ['Dharma (Cosmic & Moral Duty)', 'Karma & Samsara', 'Bhakti & Jnana (Devotion & Insight)', 'Ahimsa & Liberation (Moksha)'],
    sacredSymbols: ['Sacred Lotus (Padma)', 'Sudarshana Chakra', 'Trishula & Damaru Drum', 'Om Syllable'],
    realms: [
      {
        name: 'Svarga, Vaikuntha & Kailasha',
        tier: 'upper',
        description: 'Indra’s celestial paradise atop Mount Meru alongside the transcendent abodes of Vishnu, Devi, and Shiva.',
      },
      {
        name: 'Bhurloka (Mortal Earth)',
        tier: 'middle',
        description: 'The karmic arena where human choices, ethical dilemmas, and divine avatars restore Dharma across four Yugas.',
      },
      {
        name: 'Patala & Naraka (Yamaloka)',
        tier: 'lower',
        description: 'Jeweled subterranean realms of the Nagas alongside Yama’s court of temporary karmic reckoning before rebirth.',
      },
    ],
    primaryTexts: [
      {
        title: 'The Rigveda & Upanishads',
        period: 'c. 1500–500 BCE',
        description: 'Ten mandalas of Sanskrit hymns to Indra, Agni, Ushas, and Varuna, culminating in the skeptical Nasadiya Sukta creation hymn.',
      },
      {
        title: 'Valmiki’s Ramayana & Vyasa’s Mahabharata',
        period: 'c. 400 BCE – 300 CE',
        description: 'Monumental epics of Rama, Sita, the Pandavas, Draupadi, and Krishna’s Bhagavad Gita discourse on Dharma.',
      },
      {
        title: 'Bhagavata Purana & Devi Mahatmya',
        period: 'c. 400–900 CE',
        description: 'Rich narratives of Vishnu’s Dashavatara (ten avatars), cosmic churning of the Ocean of Milk, and Goddess Durga’s triumph.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'chinese',
        connectionType: 'Silk Road & Buddhist Synthesis',
        explanation: 'Indic cosmology, Naga dragon-kings, Yama (Yanluo), and monkey-hero motifs traveled along Silk Road routes into East Asia.',
      },
      {
        traditionId: 'japanese',
        connectionType: 'Pan-Asian Deity Transmission',
        explanation: 'Vedic-Hindu Saraswati, Indra, and Kubera entered Japan via Buddhism as Benzaiten, Taishakuten, and Bishamon.',
      },
      {
        traditionId: 'greek',
        connectionType: 'Indo-European Heritage',
        explanation: 'Shared poetic formulas ("undying fame": sravas akshitam / kleos aphthiton) and cognate sky/dawn deities.',
      },
    ],
    mapCoords: { x: 705, y: 252 },
  },
  {
    id: 'chinese',
    name: 'Chinese (Shenhua)',
    subtitle: 'Mandate of Heaven, Primordial Shapers & Celestial Bureaucracy',
    folioCode: 'FOLIO V · EAST ASIA',
    region: 'Yellow River, Yangtze Basin & Central Plains',
    culturalSphere: 'Sinitic (Archaic Myth, Daoist & Folk Synthesis)',
    eraLabel: 'c. 1600 BCE – Present',
    startYear: -1600,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Weaving together archaic shamanic geography (Shan Hai Jing), Daoist alchemical immortals, Confucian culture-heroes, and Buddhist cosmology, Chinese myth celebrates self-sacrificing creators, flood-tamers who engineer harmony with nature, and a vast celestial mirror of earthly governance.',
    worldviewThesis:
      'Cosmos emerges organically from undifferentiated Qi dividing into complementary Yin and Yang; human and divine virtue harmonize Heaven (Tian), Earth (Di), and Humanity (Ren).',
    cosmicAxis: 'Mount Kunlun (Western Axis of the Queen Mother) & Mount Buzhou',
    keyValues: ['Yin–Yang Dynamic Balance', 'Minben (Devotion to the People)', 'Xiao (Ancestral Reverence)', 'Self-Cultivation & Ingenuity'],
    sacredSymbols: ['Azure Dragon (Long)', 'Five-Colored Sky Stones', 'Ruyi Jingu Bang', 'Kunlun Peach of Immortality'],
    realms: [
      {
        name: 'Tianting (Celestial Court) & Mount Kunlun',
        tier: 'upper',
        description: 'Jade palaces of the Jade Emperor, Xiwangmu’s peach orchards, and stellar ministries governing wind, rain, and destiny.',
      },
      {
        name: 'Shenzhou (Nine Provinces & Four Seas)',
        tier: 'middle',
        description: 'Sacred mountains (Wuyue), great rivers tamed by Yu the Great, and Dragon King palaces beneath the Four Seas.',
      },
      {
        name: 'Youdu & Diyu (Ten Courts of Earth-Prison)',
        tier: 'lower',
        description: 'Subterranean ancestral Springs (Yellow Springs) integrated with Yanluo Wang’s Ten Courts and Meng Po’s pavilion of forgetfulness.',
      },
    ],
    primaryTexts: [
      {
        title: 'Shan Hai Jing (Classic of Mountains and Seas)',
        period: 'c. 400 BCE – 100 CE',
        description: 'Mythic geography cataloging sacred peaks, Nuwa, Hou Yi, Xiwangmu, Jingwei, and hundreds of chimeric spirits.',
      },
      {
        title: 'Huainanzi & Chu Ci (Songs of the South)',
        period: 'c. 300–139 BCE',
        description: 'Preserves Qu Yuan’s "Heavenly Questions" (Tianwen) and classic narratives of Nuwa repairing the sky and Chang’e’s flight.',
      },
      {
        title: 'Journey to the West (Xiyouji) & Fengshen Yanyi',
        period: '16th Century CE (Ming Dynasty)',
        description: 'Masterpieces uniting Daoist, Buddhist, and folk pantheons around Sun Wukong, Nezha, Erlang Shen, and the Celestial Court.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'japanese',
        connectionType: 'East Asian Literary & Ritual Exchange',
        explanation: 'Chinese writing, Yin-Yang cosmology (Onmyōdō), lunar lore, and fox/dragon motifs profoundly interacted with native Japanese kami lore.',
      },
      {
        traditionId: 'hindu',
        connectionType: 'Trans-Himalayan Exchange',
        explanation: 'Tang-era pilgrimage and translation fused Indic Naga kings, Yama, and Hanuman-like vitality into Chinese mythic literature.',
      },
    ],
    mapCoords: { x: 785, y: 212 },
  },
  {
    id: 'japanese',
    name: 'Japanese (Kami & Kojiki)',
    subtitle: 'Eight Million Kami, Sacred Purity & Living Nature',
    folioCode: 'FOLIO VI · ARCHIPELAGO',
    region: 'Japanese Archipelago (Yamato, Izumo & Kyushu)',
    culturalSphere: 'Shinto, Imperial Chronicle & Syncretic Folklore',
    eraLabel: 'c. 300 BCE – Present',
    startYear: -300,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Anchored in the court chronicles Kojiki and Nihon Shoki alongside local shrine traditions, Japanese mythology perceives awe-inspiring sacred presence (kami) in waterfalls, ancient cedars, storms, mirrors, and ancestors—emphasizing ritual purification (harae) over absolute good-versus-evil dualism.',
    worldviewThesis:
      'Divinity permeates the natural world as myriad kami (Yaoyorozu no Kami); harmony is restored not by annihilating turbulent forces, but by purifying pollution (kegare) and channeling wild spirit into communal renewal.',
    cosmicAxis: 'Ama-no-ukihashi (Floating Bridge of Heaven) & Sacred Mount Fuji / Izumo',
    keyValues: ['Makoto (Sincere Heart)', 'Harae & Misogi (Purification)', 'Musubi (Generative Interconnectedness)', 'Reverence for Nature'],
    sacredSymbols: ['Yata no Kagami (Sacred Mirror)', 'Torii Threshold Gate', 'Magatama Jade Jewel', 'Shimenawa Sacred Rope'],
    realms: [
      {
        name: 'Takamagahara (High Plain of Heaven)',
        tier: 'upper',
        description: 'Luminous celestial rice-fields and weaving halls presided over by solar sovereign Amaterasu Omikami.',
      },
      {
        name: 'Ashihara no Nakatsukuni (Central Land of Reed Plains)',
        tier: 'middle',
        description: 'The volcanic archipelago stirred from ocean brine by Izanagi and Izanami’s jeweled spear, inhabited by mortals and earthly kami.',
      },
      {
        name: 'Yomi-no-Kuni & Ne-no-Kuni',
        tier: 'lower',
        description: 'Shadowy subterranean land of the dead sealed by a massive boulder at Yomotsu Hirasaka after Izanagi’s flight.',
      },
    ],
    primaryTexts: [
      {
        title: 'Kojiki (Records of Ancient Matters)',
        period: '712 CE',
        description: 'Oldest extant Japanese chronicle compiled by Ō no Yasumaro, narrating creation, Yomi, the Rock Cave of Heaven, and Izumo.',
      },
      {
        title: 'Nihon Shoki (Chronicles of Japan)',
        period: '720 CE',
        description: 'Court history preserving multiple variant oral versions ("in one book it is said...") of cosmogonic and divine episodes.',
      },
      {
        title: 'Fudoki & Engishiki Norito',
        period: '8th–10th Century CE',
        description: 'Provincial gazetteers of local shrine folklore alongside classical liturgical purification prayers.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'chinese',
        connectionType: 'Sinosphere Cosmology',
        explanation: 'Early Kojiki cosmogony frames primordial emergence using classical Chinese philosophical vocabulary alongside indigenous kami myth.',
      },
      {
        traditionId: 'greek',
        connectionType: 'Typological Katabasis Parallel',
        explanation: 'Izanagi’s forbidden backward glance at Izanami in Yomi offers one of world mythology’s most striking parallels to Orpheus and Eurydice.',
      },
    ],
    mapCoords: { x: 856, y: 204 },
  },
  {
    id: 'mesopotamian',
    name: 'Mesopotamian',
    subtitle: 'Cuneiform Tablets, Divine Decrees (Me) & Gilgamesh’s Quest',
    folioCode: 'FOLIO VII · CRADLE OF RIVERS',
    region: 'Tigris & Euphrates Alluvial Plain (Sumer, Akkad & Babylon)',
    culturalSphere: 'Ancient Near Eastern (Sumerian, Akkadian, Babylonian)',
    eraLabel: 'c. 3500 – 500 BCE',
    startYear: -3500,
    endYear: -500,
    isLivingTradition: false,
    summary:
      'Inscribed in wedge-shaped cuneiform on clay tablets millennia before Homer, Mesopotamian myth laid humanity’s earliest literary foundations: ziggurats linking heaven and earth, the cosmic Flood, Inanna’s descent into the Netherworld, and Gilgamesh’s confrontation with grief and mortality.',
    worldviewThesis:
      'Humanity was fashioned to bear the labor of maintaining canals, temples, and cities alongside capricious cosmic powers; wisdom lies in cherishing mortal companionship, bread, and enduring cultural works.',
    cosmicAxis: 'Etemenanki / Sacred Ziggurat ("House of the Foundation of Heaven and Earth")',
    keyValues: ['Me (Sacred Ordinances of Civilization)', 'Urban Stewardship', 'Loyal Friendship (Gilgamesh & Enkidu)', 'Acceptance of Mortality'],
    sacredSymbols: ['Horned Crown of Divinity', 'Spade of Marduk', 'Eight-Pointed Star of Inanna', 'Tablet of Destinies'],
    realms: [
      {
        name: 'An (Heavenly Vault)',
        tier: 'upper',
        description: 'Lapis-lazuli heavens ruled initially by sky-father Anu and celestial luminaries Sin, Shamash, and Ishtar.',
      },
      {
        name: 'Ki (Earth) & Abzu (Subterranean Sweet Waters)',
        tier: 'middle',
        description: 'Walled temple-cities nourished by Enki’s life-giving subterranean freshwater ocean beneath Eridu.',
      },
      {
        name: 'Kur / Irkalla ("The Land of No Return")',
        tier: 'lower',
        description: 'Seven-gated dust-shrouded palace governed by Queen Ereshkigal, where kings and commoners alike dwell as feathered shades.',
      },
    ],
    primaryTexts: [
      {
        title: 'The Epic of Gilgamesh (Standard Babylonian & Old Babylonian)',
        period: 'c. 2100–1100 BCE',
        description: 'World literature’s earliest masterpiece: King Gilgamesh of Uruk, wild-man Enkidu, the Flood survivor Utnapishtim, and mortal finitude.',
      },
      {
        title: 'Enuma Elish (Babylonian Epic of Creation)',
        period: 'c. 1200 BCE',
        description: 'Recited at the New Year Akitu festival, recounting Marduk’s battle against primordial salt-sea Tiamat and the fashioning of cosmos.',
      },
      {
        title: 'Descent of Inanna & Atrahasis',
        period: 'c. 1900–1650 BCE',
        description: 'Sumerian hymn of Inanna passing seven underworld gates and the Akkadian epic of human creation and the Great Flood.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'greek',
        connectionType: 'Westward Levant–Aegean Conduit',
        explanation: 'Succession wars, flood narratives, and heroic monster-slaying traveled via Hurrian, Hittite, and Phoenician intermediaries to early Greece.',
      },
      {
        traditionId: 'egyptian',
        connectionType: 'Fertile Crescent Dialogue',
        explanation: 'Diplomatic cuneiform archives (even found at Amarna in Egypt!) carried Mesopotamian mythic texts like Nergal and Ereshkigal abroad.',
      },
    ],
    mapCoords: { x: 608, y: 218 },
  },
  {
    id: 'celtic',
    name: 'Celtic (Irish & Brythonic)',
    subtitle: 'Tuatha Dé Danann, Thin Places & Sovereign Land',
    folioCode: 'FOLIO VIII · ATLANTIC ISLES',
    region: 'Ireland, Britain, Gaul & Atlantic Europe',
    culturalSphere: 'Insular Gaelic & Welsh / Continental Celtic',
    eraLabel: 'c. 600 BCE – 1100 CE',
    startYear: -600,
    endYear: 1100,
    isLivingTradition: false,
    summary:
      'Transmitted orally by druids and filid poets before being recorded in medieval Irish and Welsh manuscripts, Celtic mythology blurs the boundary between history, landscape, and the ever-present Otherworld—celebrating polymathic skill, sacred sovereignty of the land, and binding personal taboos (geasa).',
    worldviewThesis:
      'The Otherworld is not a distant hereafter above the clouds, but coexists immediately alongside mortal hills, lakes, and mist—accessible at liminal seasons (Samhain, Beltane) and demanding reciprocity with the living land.',
    cosmicAxis: 'Sacred Mound of Tara, Uisneach & Sídhe Portals to Tír na nÓg',
    keyValues: ['Fír Flathemon (Ruler’s Truth)', 'Ildánach (Mastery of Many Arts)', 'Geis (Sacred Personal Taboo)', 'Generosity & Poetic Eloquence'],
    sacredSymbols: ['Cauldron of the Dagda', 'Triskelion Spiral', 'Silver Branch of Apple Blossoms', 'Salmon of Knowledge'],
    realms: [
      {
        name: 'Mag Mell & Tír na nÓg (Plains of Delight / Youth)',
        tier: 'upper',
        description: 'Timeless western islands and luminous feasts free of sickness and winter, reached by sea-voyage (immram) or fairy invitation.',
      },
      {
        name: 'Ériu & Prydain (Sacred Island Landscapes)',
        tier: 'middle',
        description: 'Every river, ford, and hill carries a dindshenchas (place-lore) naming the goddess or hero whose deeds shaped it.',
      },
      {
        name: 'Aos Sí Mounds & Annwn',
        tier: 'lower',
        description: 'Hollow Neolithic passage-tombs (Brú na Bóinne) and the Welsh Otherworld of Annwn ruled by Arawn and Gwyn ap Nudd.',
      },
    ],
    primaryTexts: [
      {
        title: 'Cath Maige Tuired & Lebor Gabála Érenn',
        period: 'Oral roots pre-Christian; MSS 9th–12th Century CE',
        description: 'Mythological Cycle chronicling the Tuatha Dé Danann, Lugh’s arrival at Tara, and the cosmic battle against the Fomorians.',
      },
      {
        title: 'Táin Bó Cúailnge (The Cattle Raid of Cooley)',
        period: 'c. 8th–12th Century CE',
        description: 'Central epic of the Ulster Cycle featuring Queen Medb, Cú Chulainn, and the battlefield prophecies of the Morrígan.',
      },
      {
        title: 'The Four Branches of the Mabinogi',
        period: 'c. 1060–1200 CE',
        description: 'Middle Welsh prose masterpieces of Pwyll, Rhiannon, Branwen, Manawydan, and Lleu Llaw Gyffes.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'norse',
        connectionType: 'Hiberno-Norse Cultural Weave',
        explanation: 'Shared North Atlantic motifs of magical cauldrons of rebirth/mead, warrior frenzy, and sea-voyages to wondrous islands.',
      },
      {
        traditionId: 'hindu',
        connectionType: 'Archaic Indo-European Sacred Kingship',
        explanation: 'Celtic rí and Vedic rajan preserve archaic Indo-European rituals tying a ruler’s moral truth directly to agricultural fertility.',
      },
    ],
    mapCoords: { x: 468, y: 158 },
  },
  {
    id: 'mesoamerican',
    name: 'Mesoamerican (Aztec & Maya)',
    subtitle: 'Five Cosmic Suns, Sacred Calendars & Reciprocal Debt',
    folioCode: 'FOLIO IX · ANAHUAC & MAYAB',
    region: 'Valley of Mexico, Oaxaca & Yucatán–Guatemalan Highlands',
    culturalSphere: 'Nahua (Mexica/Aztec) & Classic/K’iche’ Maya',
    eraLabel: 'c. 1200 BCE – 1521 CE (with living Indigenous continuity)',
    startYear: -1200,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Uniting K’iche’ Maya narrative artistry (Popol Vuh) and Nahua/Mexica cosmology, Mesoamerican mythology envisions time as interlocking ritual calendars across successive eras ("Suns")—where gods sacrificed themselves first at Teotihuacan to set the sun in motion and humans reciprocate to sustain terrestrial life.',
    worldviewThesis:
      'Existence is woven from dynamic dualities—fire and rain, life and skeletal regeneration, eagle and serpent—sustained through calendrical mindfulness and mutual cosmic reciprocity (nextlahualli).',
    cosmicAxis: 'Ceiba World Tree (Yaxche) & Coatepec / Templo Mayor joining Four Cardinal Colors',
    keyValues: ['Cosmic Reciprocity', 'Calendrical Harmony (Tonalpohualli / Tzolk’in)', 'In Xochitl In Cuicatl ("Flower & Song" Poetry)', 'Communal Maize Sustenance'],
    sacredSymbols: ['Feathered Serpent (Quetzalcoatl / K’uk’ulkan)', 'Ollin (Fifth Sun Motion Glyph)', 'Ceiba Sacred Tree', 'Smoking Obsidian Mirror'],
    realms: [
      {
        name: 'Thirteen Heavens (Ilhuicatl & Omeyocan)',
        tier: 'upper',
        description: 'Layered celestial spheres of stars, storms, sun-warriors, and Omeyocan ("Place of Duality"), source of generative breath.',
      },
      {
        name: 'Tlalticpac ("On the Earth’s Surface")',
        tier: 'middle',
        description: 'Slippery, sacred middle earth shaped from the primordial caiman Cipactli, oriented toward color-coded cardinal quarters.',
      },
      {
        name: 'Mictlan (Nine Underworld Levels) & Xibalba',
        tier: 'lower',
        description: 'Maya ballgame courts of the Lords of Xibalba and Nahua Mictlan, where bones become seeds for new humanity.',
      },
    ],
    primaryTexts: [
      {
        title: 'Popol Vuh ("Book of the Community" of the K’iche’ Maya)',
        period: 'Pre-Columbian hieroglyphic roots; alphabetic MS c. 1550 CE',
        description: 'Recounts the creation of humans from yellow and white maize, the defeat of Vucub Caquix, and the Hero Twins’ triumph in Xibalba.',
      },
      {
        title: 'Codex Borgia & Legend of the Suns (Codex Chimalpopoca)',
        period: '15th–16th Century CE',
        description: 'Ritual screenfold divinatory almanacs and Nahua chronicles of the Four Past Suns, Teotihuacan’s Fifth Sun, and Quetzalcoatl in Mictlan.',
      },
      {
        title: 'Florentine Codex (Historia General)',
        period: 'c. 1545–1590 CE',
        description: 'Encyclopedic Nahuatl corpus recorded with Indigenous elders preserving hymns, cosmology, and deity attributes.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'chinese',
        connectionType: 'Comparative Cardinal Cosmology',
        explanation: 'Both Mesoamerican and Chinese cosmologies independently developed four color-coded directional guardians around a sacred fifth center.',
      },
      {
        traditionId: 'hindu',
        connectionType: 'Cyclical World-Ages Parallel',
        explanation: 'The Mexica Five Suns and Hindu Four Yugas represent humanity’s two most elaborate pre-modern systems of cyclical cosmic epochs.',
      },
    ],
    mapCoords: { x: 238, y: 274 },
  },
  {
    id: 'yoruba',
    name: 'West African (Yoruba)',
    subtitle: 'Ilé-Ifẹ̀ Creation, Ashe Vital Force & the Orisha Pantheon',
    folioCode: 'FOLIO X · WEST AFRICA & DIASPORA',
    region: 'Yorubaland (Nigeria, Benin, Togo) & Atlantic Diaspora',
    culturalSphere: 'Yoruba, Edo & Afro-Atlantic Orisha Traditions',
    eraLabel: 'c. 1000 CE – Present',
    startYear: 1000,
    endYear: 2026,
    isLivingTradition: true,
    summary:
      'Centered on the sacred city of Ilé-Ifẹ̀ and encoded in the vast oral literary corpus of Odu Ifá (256 divinatory chapters), Yoruba mythology honors Olodumare (Supreme Source) and the Orishas—radiant personifications of thunder, rivers, iron, wind, and wisdom—celebrating destiny (Ori), cool-headed character (Iwa-pele), and dynamic vital force (Ashe).',
    worldviewThesis:
      'Every being chooses an inner destiny (Ori) before birth; alignment between Heaven (Orun) and Marketplace Earth (Aye) depends on gentle character (Iwa-pele), crossroads communication via Eshu, and balanced Ashe.',
    cosmicAxis: 'Ilé-Ifẹ̀ (where Obatala/Oduduwa descended by golden chain) & the Crossroads',
    keyValues: ['Iwa-Pele (Gentle, Noble Character)', 'Ashe (Performative Life-Force)', 'Ori (Personal Destiny & Consciousness)', 'Reciprocity at the Crossroads'],
    sacredSymbols: ['Oshe Shango (Double-Headed Axe)', 'Opon Ifá (Divination Tray)', 'Golden Chain of Ifẹ̀', 'Brass Mirror & Cowrie Shells'],
    realms: [
      {
        name: 'Ọ̀run (The Invisible Spiritual Realm)',
        tier: 'upper',
        description: 'Home of Olodumare, the Irunmole/Orishas, and the Egungun ancestors who remain actively connected to living lineages.',
      },
      {
        name: 'Ayé (The Visible World as Sacred Marketplace)',
        tier: 'middle',
        description: 'The tangible world of cities, forests, rivers, and human communities—"The world is a marketplace; heaven is home."',
      },
      {
        name: 'Crossroads & Ancestral Earth (Ilẹ̀ / Onílẹ̀)',
        tier: 'lower',
        description: 'Sacred earth witnessing covenants and crossroads governed by Eshu Elegbara where messages traverse between Ayé and Ọ̀run.',
      },
    ],
    primaryTexts: [
      {
        title: 'Odu Ifá Literary Corpus (Ese Ifá)',
        period: 'Centuries-old oral canon; UNESCO Masterpiece of Oral Heritage',
        description: '256 Odu chapters containing thousands of poetic verses, parables, and mythic precedents chanted by Babalawo and Iyanifa diviners.',
      },
      {
        title: 'Oriki (Orisha & Lineage Praise Poetry)',
        period: 'Living Oral Tradition',
        description: 'Performative tonal poetry invoking the histories, temperaments, and deeds of Shango, Oshun, Ogun, Oya, Obatala, and Yemoja.',
      },
      {
        title: 'Ilé-Ifẹ̀ Royal & Bronzecasting Chronicles',
        period: 'c. 1100–1500 CE onward',
        description: 'Sacred traditions of Oduduwa, Obatala, Moremi, and the terracotta/bronze masterpieces of classical Ifẹ̀.',
      },
    ],
    relatedTraditions: [
      {
        traditionId: 'greek',
        connectionType: 'Crossroads & Forge Parallels',
        explanation: 'Eshu and Hermes both preside over crossroads, interpretation, and divine messages; Ogun and Hephaestus/Ares unite metallurgy and civilization.',
      },
      {
        traditionId: 'mesoamerican',
        connectionType: 'Living Atlantic Resilience',
        explanation: 'Across the Americas (Cuba, Brazil, Trinidad, US), Yoruba Orisha cosmology endured and flourished alongside Indigenous and Atlantic traditions.',
      },
    ],
    mapCoords: { x: 504, y: 312 },
  },
];

export const TRADITION_BY_ID: Record<string, Tradition> = Object.fromEntries(
  TRADITIONS.map((t) => [t.id, t])
);
