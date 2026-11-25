import type { PantheonLineage, TraditionId } from '../types/mythology';

export const BESTIARY_LINEAGES_EN: PantheonLineage[] = [
  {
    traditionId: 'greek',
    title: 'The Brood of Typhon & Echidna',
    cosmologicalNote:
      'In Hesiod’s Theogony (lines 295–336), nearly every great monster confronted by Greek heroes descends from a single chthonic union: storm-giant Typhon (born of Gaia and Tartarus) wedded to half-nymph, half-serpent Echidna beneath hollow Arima.',
    nodes: [
      { id: 'gr-chaos', label: 'Gaia & Tartarus', role: 'Earth & Abyssal Pit', tier: 'primordial', column: 2, bio: 'After Zeus imprisoned the Titans, Earth (Gaia) mated with deep Tartarus to birth one final challenger to Olympian sky-rule.' },
      { id: 'mon-typhon', label: 'Typhon', role: '100-Headed Storm Father', tier: 'elder', column: 1, deityId: 'mon-typhon', bio: 'Volcanic serpent-giant whose hundred dragon heads breathed fire and hurricane gales against Zeus.' },
      { id: 'gr-kronos', label: 'Echidna', role: 'Mother of All Monsters', tier: 'elder', column: 3, bio: 'Immortal half-maiden, half-speckled serpent dwelling in a deep Cilician cave far from gods and mortals.' },
      { id: 'mon-hydra', label: 'Lernaean Hydra', role: 'Regenerating Marsh Serpent', tier: 'sovereign', column: 1, deityId: 'mon-hydra', bio: 'Venomous multi-headed water dragon raised by Hera at the bottomless springs of Lerna.' },
      { id: 'mon-cerberus', label: 'Cerberus', role: 'Hound of Hades', tier: 'sovereign', column: 2, deityId: 'mon-cerberus', bio: 'Three-headed, serpent-tailed guardian of the bronze gates of the Underworld.' },
      { id: 'gr-poseidon', label: 'Chimera & Orthrus', role: 'Fire-Beast & Two-Headed Hound', tier: 'offspring', column: 1, deityId: 'mon-chimera', bio: 'Sibling monsters of the brood: lion-goat-serpent Chimera slain by Bellerophon and two-headed cattle-hound Orthrus.' },
      { id: 'gr-persephone', label: 'Heracles (Slayer)', role: 'Twelve-Labors Hero', tier: 'offspring', column: 3, bio: 'Olympian mortal champion who cauterized the Hydra and wrestled Cerberus bare-handed from Hades.' },
    ],
    edges: [
      { from: 'gr-chaos', to: 'mon-typhon', type: 'parent', note: 'Last titanic birth' },
      { from: 'mon-typhon', to: 'gr-kronos', type: 'consort', note: 'Chthonic monster union' },
      { from: 'mon-typhon', to: 'mon-hydra', type: 'parent' },
      { from: 'gr-kronos', to: 'mon-hydra', type: 'parent' },
      { from: 'mon-typhon', to: 'mon-cerberus', type: 'parent' },
      { from: 'gr-kronos', to: 'mon-cerberus', type: 'parent' },
      { from: 'mon-hydra', to: 'gr-poseidon', type: 'sibling' },
      { from: 'mon-hydra', to: 'gr-persephone', type: 'rival', note: 'Second Labor' },
      { from: 'mon-cerberus', to: 'gr-persephone', type: 'rival', note: 'Twelfth Labor' },
    ],
  },
  {
    traditionId: 'norse',
    title: 'Angrboða’s Ironwood Brood & Corpse-Shore',
    cosmologicalNote:
      'Snorri’s Gylfaginning 34 and Völuspá trace the monsters of Ragnarök to Járnviðr (Ironwood), where giantess Angrboða bore Loki three apocalyptic children—bound by the Æsir across land, sea, and underworld, while Níðhöggr gnaws Yggdrasil’s deepest root.',
    nodes: [
      { id: 'no-ymir', label: 'Ymir & Hvergelmir', role: 'Frost-Giant & Boiling Spring', tier: 'primordial', column: 2, bio: 'Primordial rime-giant and the seething Niflheim cauldron teeming with countless serpents.' },
      { id: 'no-farbauti', label: 'Loki & Angrboða', role: 'Trickster & Hag of Ironwood', tier: 'elder', column: 1, bio: 'Secret union in Jotunheim that birthed the three existential threats to Asgard.' },
      { id: 'mon-nidhoggr', label: 'Níðhöggr', role: 'Root-Gnawing Corpse Dragon', tier: 'elder', column: 3, deityId: 'mon-nidhoggr', bio: 'Malice-striker chewing Yggdrasil’s third root from below while trading insults with the treetop eagle.' },
      { id: 'mon-fenrir', label: 'Fenrir', role: 'Gleipnir-Bound Apocalypse Wolf', tier: 'sovereign', column: 1, deityId: 'mon-fenrir', bio: 'Great wolf bound at the cost of Týr’s right hand; fated to swallow Odin at Ragnarök.' },
      { id: 'mon-jormungandr', label: 'Jörmungandr', role: 'World-Encircling Sea Serpent', tier: 'sovereign', column: 2, deityId: 'mon-jormungandr', bio: 'Cast into the outer ocean until its coils gripped Midgard tail-in-mouth.' },
      { id: 'no-baldr', label: 'Sköll & Hati', role: 'Sun- & Moon-Chasing Wolves', tier: 'offspring', column: 1, deityId: 'mon-skoll-hati', bio: 'Offspring of Fenrir’s Ironwood pack who pursue Sol and Mani across the heavens until swallowing them.' },
      { id: 'no-borr', label: 'Thor & Víðarr', role: 'Æsir Dragon- & Wolf-Slayers', tier: 'offspring', column: 3, bio: 'Thor slays Jörmungandr (dying nine paces later from its venom), while Víðarr avenges Odin by rending Fenrir’s jaw.' },
    ],
    edges: [
      { from: 'no-ymir', to: 'mon-nidhoggr', type: 'parent', note: 'Niflheim abyss' },
      { from: 'no-ymir', to: 'no-farbauti', type: 'parent' },
      { from: 'no-farbauti', to: 'mon-fenrir', type: 'parent' },
      { from: 'no-farbauti', to: 'mon-jormungandr', type: 'parent' },
      { from: 'mon-fenrir', to: 'mon-jormungandr', type: 'sibling' },
      { from: 'mon-fenrir', to: 'no-baldr', type: 'parent', note: 'Ironwood pack' },
      { from: 'mon-jormungandr', to: 'no-borr', type: 'rival', note: 'Mutual doom' },
      { from: 'mon-fenrir', to: 'no-borr', type: 'rival', note: 'Ragnarök vengeance' },
    ],
  },
  {
    traditionId: 'egyptian',
    title: 'Nun’s Uncreated Shadow & Wardens of Ma’at',
    cosmologicalNote:
      'Egyptian teratology divides sharply between anti-cosmic chaos (Apophis, born from Nun’s dark saliva/umbilical cord to undo creation) and sacred hybrid guardians (Ammit and the Sphinx) who enforce solar sovereignty and Ma’at’s moral scales.',
    nodes: [
      { id: 'eg-shu', label: 'Nun (Dark Waters)', role: 'Pre-Creation Abyss', tier: 'primordial', column: 2, bio: 'Inert boundless primeval ocean from which Ra’s solar mound rose—and whose unformed shadow spawned Apophis.' },
      { id: 'mon-apophis', label: 'Apophis (Apep)', role: 'Serpent of Non-Existence', tier: 'elder', column: 1, deityId: 'mon-apophis', bio: 'Giant Duat serpent coiled at Mount Bakhu seeking nightly to swallow Ra’s solar barque.' },
      { id: 'eg-horus', label: 'Ra & Solar Ma’at', role: 'Sun-Creator & Cosmic Truth', tier: 'elder', column: 3, bio: 'Solar sovereign whose nightly survival and moral law structure Egyptian existence.' },
      { id: 'mon-sphinx', label: 'Great Sphinx', role: 'Horus-in-the-Horizon Guardian', tier: 'sovereign', column: 3, deityId: 'mon-sphinx', bio: 'Leonine solar guardian uniting pharaonic intellect with desert lion might.' },
      { id: 'mon-ammit', label: 'Ammit', role: 'Devourer Beneath the Scales', tier: 'sovereign', column: 2, deityId: 'mon-ammit', bio: 'Crocodile-lion-hippopotamus executioner who consumes hearts heavier than Ma’at’s feather.' },
      { id: 'eg-geb', label: 'Seth & Bastet', role: 'Prow Defenders of the Barque', tier: 'offspring', column: 1, bio: 'Seth spears Apophis from the solar prow while Solar Cat Bastet/Ra decapitates the serpent beside the Persea tree.' },
      { id: 'eg-anubis', label: 'Anubis (Scale Master)', role: 'Weigher of Hearts', tier: 'offspring', column: 3, bio: 'Jackal-headed embalmer who steadies the plummet beside Ammit in the Hall of Two Truths.' },
    ],
    edges: [
      { from: 'eg-shu', to: 'mon-apophis', type: 'parent', note: 'Uncreated shadow' },
      { from: 'eg-shu', to: 'eg-horus', type: 'parent', note: 'First sunrise' },
      { from: 'eg-horus', to: 'mon-sphinx', type: 'parent', note: 'Solar kingship image' },
      { from: 'eg-horus', to: 'mon-ammit', type: 'parent', note: 'Agent of Ma’at' },
      { from: 'mon-apophis', to: 'eg-horus', type: 'rival', note: '12th Hour of Night' },
      { from: 'mon-apophis', to: 'eg-geb', type: 'rival', note: 'Speared nightly' },
      { from: 'mon-ammit', to: 'eg-anubis', type: 'sibling', note: 'Tribunal partners' },
    ],
  },
  {
    traditionId: 'hindu',
    title: 'Kashyapa’s Divided Wives: Garuda vs. the Nagas',
    cosmologicalNote:
      'Mahabharata (Adi Parva 16–34) explains cosmic avian-serpent rivalry through sage Kashyapa’s two wives: Kadru (mother of a thousand Nagas including Vasuki and Shesha) and Vinata (mother of solar eagle Garuda), set beside Vedic drought-dragon Vritra.',
    nodes: [
      { id: 'hi-brahman', label: 'Sage Kashyapa & Tvashtri', role: 'Progenitor Rishi & Artisan', tier: 'primordial', column: 2, bio: 'Vedic-Puranic progenitors of celestial birds, Nagas, Devas, and cosmic adversaries.' },
      { id: 'mon-vritra', label: 'Vritra (Ahi)', role: 'Vedic Drought-Dragon', tier: 'elder', column: 0, deityId: 'mon-vritra', bio: 'Coiled serpent-fortress blocking the Seven Rivers until cleft by Indra’s hundred-jointed Vajra.' },
      { id: 'hi-surya', label: 'Vinata & Kadru', role: 'Rival Sister-Mothers', tier: 'elder', column: 2, bio: 'Daughters of Daksha whose wager over Uchchaihshravas’s tail enslaved Vinata and sparked Garuda’s quest.' },
      { id: 'mon-garuda', label: 'Garuda', role: 'Golden-Winged Naga-Bane', tier: 'sovereign', column: 1, deityId: 'mon-garuda', bio: 'Solar eagle king who seized the Amrita chalice to free his mother and became Vishnu’s mount.' },
      { id: 'mon-vasuki', label: 'Vasuki & Shesha', role: 'Churning Rope & Cosmic Couch', tier: 'sovereign', column: 3, deityId: 'mon-vasuki', bio: 'Sacred Naga kings serving Shiva’s neck and supporting Vishnu’s cosmic slumber upon a thousand hoods.' },
      { id: 'hi-vishnu', label: 'Vishnu & Shiva', role: 'Preserver & Blue-Throated Lord', tier: 'offspring', column: 2, bio: 'Divine調和: Vishnu rides Garuda while resting upon Shesha, and Shiva wears Vasuki as garland.' },
    ],
    edges: [
      { from: 'hi-brahman', to: 'mon-vritra', type: 'parent', note: 'Forged to challenge Indra' },
      { from: 'hi-brahman', to: 'hi-surya', type: 'consort' },
      { from: 'hi-surya', to: 'mon-garuda', type: 'parent', note: 'Born of Vinata' },
      { from: 'hi-surya', to: 'mon-vasuki', type: 'parent', note: 'Born of Kadru' },
      { from: 'mon-garuda', to: 'mon-vasuki', type: 'rival', note: 'Half-brother feud' },
      { from: 'mon-garuda', to: 'hi-vishnu', type: 'sibling', note: 'Sacred Vahana' },
      { from: 'mon-vasuki', to: 'hi-vishnu', type: 'sibling', note: 'Ananta couch & churning rope' },
    ],
  },
  {
    traditionId: 'chinese',
    title: 'Huainanzi Evolution of Dragons, Auspicious Beasts & Four Perils',
    cosmologicalNote:
      'Huainanzi (Chapter 4) preserves an explicit mythic evolutionary genealogy—from primordial winged dragon Yinglong descending all quadruped auspicious beasts culminating in the Qilin—contrasted against the Classic of Mountains and Seas’ cautionary Taotie.',
    nodes: [
      { id: 'cn-hundun', label: 'Maodu & Primordial Qi', role: 'Ancestral Hairy/Scaly Progenitors', tier: 'primordial', column: 2, bio: 'In Huainanzi cosmology, yin-yang essences condense into ancestral progenitors of feathered, scaly, and furred sacred beasts.' },
      { id: 'mon-yinglong', label: 'Yinglong', role: 'Winged Storm & Flood Dragon', tier: 'elder', column: 1, deityId: 'mon-yinglong', bio: 'Millennial winged dragon who slew Chiyou for Huangdi and carved Yangtze channels with its tail for Yu.' },
      { id: 'mon-taotie', label: 'Taotie (Four Perils)', role: 'Bronze Mask & Insatiable Maw', tier: 'elder', column: 3, deityId: 'mon-taotie', bio: 'Ritual Shang bronze guardian reinterpreted in Zuo Zhuan and Lüshi Chunqiu as bodiless self-devouring greed.' },
      { id: 'mon-qilin', label: 'Qilin', role: 'Benevolent Unicorn Sovereign', tier: 'sovereign', column: 1, deityId: 'mon-qilin', bio: 'Descendant of Yinglong via Jianma; supreme gentle beast appearing only under sage governance.' },
      { id: 'cn-yu', label: 'Yu the Great', role: 'Tamer of the Nine Provinces', tier: 'offspring', column: 1, bio: 'Partnered with Yinglong to dredge rivers and cast the Nine Tripod Cauldrons bearing regional beast forms.' },
      { id: 'cn-xiwangmu', label: 'Wuzhiqi & Four Perils', role: 'Chained River Ape & Banished Fiends', tier: 'offspring', column: 3, bio: 'Rampaging Huai River ape spirit Wuzhiqi chained beneath Turtle Mountain by Yinglong.' },
    ],
    edges: [
      { from: 'cn-hundun', to: 'mon-yinglong', type: 'parent', note: 'Huainanzi lineage' },
      { from: 'cn-hundun', to: 'mon-taotie', type: 'parent', note: 'Four Perils (Sixiong)' },
      { from: 'mon-yinglong', to: 'mon-qilin', type: 'parent', note: 'Yinglong → Jianma → Qilin' },
      { from: 'mon-yinglong', to: 'cn-yu', type: 'sibling', note: 'Flood-control alliance' },
      { from: 'mon-yinglong', to: 'cn-xiwangmu', type: 'rival', note: 'Chained under Turtle Mt.' },
      { from: 'mon-taotie', to: 'cn-yu', type: 'rival', note: 'Cast on ritual tripods as warning' },
    ],
  },
  {
    traditionId: 'japanese',
    title: 'Izumo Serpent, Inari Foxes & Mountain Tengu',
    cosmologicalNote:
      'Japanese monsterology (Bakemono / Yōkai / Shinju) bridges Kojiki’s untamed nature colossi (Yamata-no-Orochi) with ambivalent liminal spirits capable of shifting between wrathful calamity and revered shrine guardianship (Kitsune and Daitengu).',
    nodes: [
      { id: 'jp-ame', label: 'Myriad Yaoyorozu Spirits', role: 'Untamed Peaks, Rivers & Winds', tier: 'primordial', column: 2, bio: 'Animist landscape of misty mountains, iron-rich rivers, and threshold shrines where kami and yōkai interpenetrate.' },
      { id: 'mon-orochi', label: 'Yamata-no-Orochi', role: 'Eight-Forked Izumo Serpent', tier: 'elder', column: 1, deityId: 'mon-orochi', bio: 'Colossal eight-headed river serpent carrying the Kusanagi sword inside its fourth tail.' },
      { id: 'mon-tengu', label: 'Daitengu (Sōjōbō)', role: 'Winged Lord of Mount Kurama', tier: 'sovereign', column: 2, deityId: 'mon-tengu', bio: 'Red-visaged winged swordmaster and Shugendō mountain guardian who humbles arrogant clergy.' },
      { id: 'mon-kitsune', label: 'Kyūbi no Kitsune', role: 'Nine-Tailed Fox / Tamamo-no-Mae', tier: 'sovereign', column: 3, deityId: 'mon-kitsune', bio: 'Millennial shapeshifting fox manifesting both as sacred Inari messenger and court-toppling Sesshō-seki spirit.' },
      { id: 'jp-okuninushi', label: 'Susanoo & Kusanagi', role: 'Storm Slayer & Imperial Blade', tier: 'offspring', column: 1, bio: 'Brewed eightfold sake to slay Orochi and presented the tail-born sword to Amaterasu.' },
      { id: 'jp-ninigi', label: 'Ushiwakamaru & Abe', role: 'Samurai Disciple & Onmyōji', tier: 'offspring', column: 3, bio: 'Minamoto no Yoshitsune trained under Kurama’s Tengu, while court diviner Abe no Yasunari unmasked Tamamo-no-Mae.' },
    ],
    edges: [
      { from: 'jp-ame', to: 'mon-orochi', type: 'parent', note: 'Hiikawa river fury' },
      { from: 'jp-ame', to: 'mon-tengu', type: 'parent', note: 'Sacred mountain ascetics' },
      { from: 'jp-ame', to: 'mon-kitsune', type: 'parent', note: 'Fox spirit metamorphosis' },
      { from: 'mon-orochi', to: 'jp-okuninushi', type: 'rival', note: 'Slain via eight sake vats' },
      { from: 'mon-tengu', to: 'jp-ninigi', type: 'parent', note: 'Taught swordcraft' },
      { from: 'mon-kitsune', to: 'jp-ninigi', type: 'rival', note: 'Unmasked at court' },
    ],
  },
  {
    traditionId: 'mesopotamian',
    title: 'Tiamat’s Elevenfold Brood & Sacred Threshold Guardians',
    cosmologicalNote:
      'Enuma Elish Tablet I lines 133–146 record the oldest monster army in literature—eleven chimeric species birthed by salt-sea Tiamat—balanced in Assyrian royal art by benevolent winged Lamassu colossi and Enlil’s tragic forest warden Humbaba.',
    nodes: [
      { id: 'me-apsu', label: 'Apsu & Primordial Waters', role: 'Mingled Sweet & Salt Abyss', tier: 'primordial', column: 2, bio: 'Before heaven and earth were named, sweet Apsu and salt Tiamat mingled waters in undifferentiated stillness.' },
      { id: 'mon-tiamat', label: 'Tiamat (Ummu-Hubur)', role: 'Salt-Sea Dragon Mother', tier: 'elder', column: 1, deityId: 'mon-tiamat', bio: 'Primordial sea dragon who spawned eleven monster species and bestowed the Tablet of Destinies.' },
      { id: 'me-anu', label: 'Enlil & Sky Council', role: 'Decreeing High Gods', tier: 'elder', column: 3, bio: 'Mesopotamian sky-assembly who appointed Humbaba over the Cedar Forest and commissioned palace apotropaic guardians.' },
      { id: 'mon-humbaba', label: 'Humbaba', role: 'Seven-Aura Cedar Warden', tier: 'sovereign', column: 2, deityId: 'mon-humbaba', bio: 'Terrifying forest guardian robed in seven radiant melammu-terrors whose breath is fire and flood.' },
      { id: 'mon-lamassu', label: 'Lamassu (Šēdu)', role: 'Five-Legged Winged Gate Bull', tier: 'sovereign', column: 3, deityId: 'mon-lamassu', bio: 'Benevolent human-headed winged bull/lion repelling chaos demons at Nineveh and Persepolis.' },
      { id: 'me-gilgamesh', label: 'Mušḫuššu & Scorpion-Men', role: 'Tiamat’s Conquered Vanguard', tier: 'offspring', column: 1, deityId: 'mon-mushhushshu', bio: 'Horned snake-dragon Mušḫuššu—born of Tiamat, conquered by Marduk, and immortalized in blue glazed brick on Babylon’s Ishtar Gate.' },
    ],
    edges: [
      { from: 'me-apsu', to: 'mon-tiamat', type: 'consort', note: 'Sweet & salt waters' },
      { from: 'mon-tiamat', to: 'me-gilgamesh', type: 'parent', note: '11-species monster brood' },
      { from: 'me-anu', to: 'mon-humbaba', type: 'parent', note: 'Appointed Cedar guardian' },
      { from: 'me-anu', to: 'mon-lamassu', type: 'parent', note: 'Royal threshold protector' },
      { from: 'mon-tiamat', to: 'mon-lamassu', type: 'rival', note: 'Chaos vs. civic threshold' },
    ],
  },
  {
    traditionId: 'celtic',
    title: 'Fomorian Abyss, Fairy Mounds & Loch Spirits',
    cosmologicalNote:
      'Irish and Scottish lore organizes supernatural beings across three zones: sea-raiding Fomorian blight-lords of Tory Island (Balor), noble Barrow-Mound heralds (Bean Sídhe), and perilous shapeshifting loch horses (Kelpie).',
    nodes: [
      { id: 'ce-danu', label: 'Domnu & Sídhe Mounds', role: 'Deep Sea & Hollow Hills', tier: 'primordial', column: 2, bio: 'Twin realms bordering mortal Ireland: the wild Atlantic Fomorian deep and timeless hollow fairy barrows.' },
      { id: 'mon-balor', label: 'Balor of the Evil Eye', role: 'Fomorian Tyrant of Tory Island', tier: 'elder', column: 1, deityId: 'mon-balor', bio: 'One-eyed giant whose lifted eyelid scorched whole armies to ash at Mag Tuired.' },
      { id: 'mon-banshee', label: 'Bean Sídhe', role: 'Keening Woman of the Mounds', tier: 'sovereign', column: 3, deityId: 'mon-banshee', bio: 'Ancestral fairy-mound herald singing lamentations before the passing of ancient Gaelic kin.' },
      { id: 'mon-kelpie', label: 'Kelpie (Each-Uisce)', role: 'Adhesive Loch Water-Horse', tier: 'sovereign', column: 2, deityId: 'mon-kelpie', bio: 'Shapeshifting black or white steed haunting Highland rivers and lochs.' },
      { id: 'ce-aengus', label: 'Ethniu & Lugh', role: 'Crystal-Tower Daughter & Grandson', tier: 'offspring', column: 1, bio: 'Balor’s imprisoned daughter Ethniu bore Lugh Lámhfhada, whose sling-stone drove Balor’s eye backward through his skull.' },
      { id: 'ce-cuchulainn', label: 'Bean Nighe (Washer)', role: 'Ford Omen of Fallen Warriors', tier: 'offspring', column: 3, bio: 'Scottish sister-form washing bloodstained tunics at river fords on the eve of battle.' },
    ],
    edges: [
      { from: 'ce-danu', to: 'mon-balor', type: 'parent', note: 'Fomorian sea-lineage' },
      { from: 'ce-danu', to: 'mon-banshee', type: 'parent', note: 'Aos Sí barrow realm' },
      { from: 'ce-danu', to: 'mon-kelpie', type: 'parent', note: 'Loch & river spirits' },
      { from: 'mon-balor', to: 'ce-aengus', type: 'parent', note: 'Grandfather prophecy' },
      { from: 'mon-balor', to: 'ce-aengus', type: 'rival', note: 'Slain at Mag Tuired' },
      { from: 'mon-banshee', to: 'ce-cuchulainn', type: 'sibling', note: 'Omen sisters' },
    ],
  },
  {
    traditionId: 'mesoamerican',
    title: 'Monsters of the Fifth Sun: Earth-Crocodile, Star-Daemons & Lake Beast',
    cosmologicalNote:
      'Nahua cosmic ecology places humanity between two hungry jaws: below lies living earth-caiman Cipactli demanding sacrificial reciprocity for maize; above wait skeletal star-daemons Tzitzimimeh poised to dive if the Fifth Sun falters; in the lakes lurks Tlaloc’s Ahuizotl.',
    nodes: [
      { id: 'ma-ometeotl', label: 'Primeval Waters & Night Sky', role: 'Before the Fifth Sun', tier: 'primordial', column: 2, bio: 'Dark primordial sea and starry firmament preceding the self-sacrifice of the gods at Teotihuacan.' },
      { id: 'mon-cipactli', label: 'Cipactli (Tlaltecuhtli)', role: 'Many-Mouthed Earth Crocodile', tier: 'elder', column: 1, deityId: 'mon-cipactli', bio: 'Spiny caiman with hungry mouths at every joint, torn in half to form sky and fertile earth.' },
      { id: 'mon-tzitzimitl', label: 'Tzitzimimeh', role: 'Skeletal Eclipse Star-Goddesses', tier: 'sovereign', column: 3, deityId: 'mon-tzitzimitl', bio: 'Fierce celestial females held back by daylight—guardians of midwives yet apocalyptic devourers during eclipses.' },
      { id: 'mon-ahuizotl', label: 'Ahuizotl', role: 'Tail-Handed Beast of Lake Texcoco', tier: 'sovereign', column: 2, deityId: 'mon-ahuizotl', bio: 'Otter-dog creature mimicking a crying infant to claim souls for Tlaloc’s paradise.' },
      { id: 'ma-twins', label: 'Quetzalcoatl & Tezcatlipoca', role: 'Serpent-Twinned World-Shapers', tier: 'offspring', column: 1, bio: 'Tezcatlipoca used his own foot as bait to lure Cipactli before both gods wrestled her into earth and sky.' },
      { id: 'ma-tlaloc', label: 'Tlaloc & Itzpapalotl', role: 'Rain Lord & Obsidian Butterfly', tier: 'offspring', column: 3, bio: 'Tlaloc commands the Ahuizotl in Lake Texcoco while Itzpapalotl leads the nocturnal Tzitzimimeh host.' },
    ],
    edges: [
      { from: 'ma-ometeotl', to: 'mon-cipactli', type: 'parent', note: 'Swam primeval sea' },
      { from: 'ma-ometeotl', to: 'mon-tzitzimitl', type: 'parent', note: 'Starry firmament' },
      { from: 'mon-cipactli', to: 'ma-twins', type: 'rival', note: 'Foot-bait & world-tearing' },
      { from: 'ma-tlaloc', to: 'mon-ahuizotl', type: 'parent', note: 'Servant of Tlalocan' },
      { from: 'ma-tlaloc', to: 'mon-tzitzimitl', type: 'sibling', note: 'Led by Itzpapalotl' },
    ],
  },
  {
    traditionId: 'yoruba',
    title: 'Cosmic Serpent, Royal Leopard & Nocturnal Powers of Àṣẹ',
    cosmologicalNote:
      'Yoruba sacred thought situates potent zoomorphic and nocturnal powers across three domains: celestial-oceanic rainbow python Oshumare binding the world, royal forest sovereign Ekun embodying Oba kingship, and the dual balance of Eleye night-mothers and Ajogun warlords.',
    nodes: [
      { id: 'yo-olodumare', label: 'Olodumare & Primordial Àṣẹ', role: 'Supreme Source of Vital Force', tier: 'primordial', column: 2, bio: 'Supreme creator entrusting cosmic stability, royal composure, and concealed accountability across Ọ̀run and Ayé.' },
      { id: 'mon-oshumare', label: 'Oshumare', role: 'World-Binding Rainbow Python', tier: 'elder', column: 1, deityId: 'mon-oshumare', bio: 'Androgynous rainbow serpent linking sky and deep ocean while stabilizing the Earth in its coils.' },
      { id: 'mon-ajogun', label: 'Eleye & Ajogun', role: 'Night-Birds & Eight Afflictions', tier: 'sovereign', column: 3, deityId: 'mon-ajogun', bio: 'Autonomous Àwọn Ìyá Wa perched in midnight iroko trees alongside the eight anti-cosmic Ajogun warlords.' },
      { id: 'mon-ekun', label: 'Ekun (Royal Leopard)', role: 'Spotted Sovereign of the Forest', tier: 'sovereign', column: 2, deityId: 'mon-ekun', bio: 'composed yet lethal forest monarch mirrored in sacred Oba kingship and Benin/Ife bronzes.' },
      { id: 'yo-ogun', label: 'Orunmila, Eshu & Sacred Oba', role: 'Ifá Diplomacy, Ebo & Beaded Crown', tier: 'offspring', column: 2, bio: 'Orunmila negotiates covenants with Eleye, Eshu carries ebo offerings to ward off Ajogun, and the Oba wears the Eleye bird atop his beaded crown.' },
    ],
    edges: [
      { from: 'yo-olodumare', to: 'mon-oshumare', type: 'parent', note: 'Celestial-oceanic retainer' },
      { from: 'yo-olodumare', to: 'mon-ekun', type: 'parent', note: 'Covenant of royal grace' },
      { from: 'yo-olodumare', to: 'mon-ajogun', type: 'parent', note: 'Entrusted Àjé balance' },
      { from: 'mon-ekun', to: 'yo-ogun', type: 'sibling', note: 'Sacred Oba emblem' },
      { from: 'mon-ajogun', to: 'yo-ogun', type: 'rival', note: 'Harmonized via Ifá & Gẹ̀lẹ̀dẹ́' },
      { from: 'mon-oshumare', to: 'yo-ogun', type: 'sibling', note: 'Allied with Orunmila' },
    ],
  },
];

const LINEAGE_ZH_OV: Record<
  TraditionId,
  {
    title: string;
    cosmologicalNote: string;
    nodes: Record<string, { label: string; role: string; bio: string }>;
    edgeNotes?: Record<string, string>;
  }
> = {
  greek: {
    title: '提丰与厄喀德那的万妖血脉谱',
    cosmologicalNote:
      '赫西俄德《神谱》（第295–336行）记载，希腊英雄讨伐的绝大多数凶兽皆出自同一桩地底联姻：盖亚与深渊塔耳塔罗斯所生的风暴巨怪提丰，在幽暗洞窟中迎娶半人半蛇女妖厄喀德那。',
    nodes: {
      'gr-chaos': { label: '盖亚与塔耳塔罗斯', role: '大地母神与无底深渊', bio: '宙斯囚禁泰坦后，震怒的盖亚与冥渊结合，诞下挑战奥林匹斯王权的终极巨怪。' },
      'mon-typhon': { label: '提丰', role: '百首风暴万妖之父', bio: '肩生百颗喷火龙蛇首的火山风暴巨怪，曾令奥林匹斯众神化兽奔逃。' },
      'gr-kronos': { label: '厄喀德那', role: '半蛇半女万妖之母', bio: '隐居奇里乞亚深洞的不老蛇尾女妖，与提丰繁衍出希腊诸大魔兽。' },
      'mon-hydra': { label: '勒拿九头蛇', role: '断首再生的毒沼水龙', bio: '赫拉饲育于勒拿无底泉眼的剧毒多头蛇，中央一首永生不死。' },
      'mon-cerberus': { label: '刻耳柏洛斯', role: '冥府三首守门巨犬', bio: '蛇尾狮爪的哈迪斯青铜门守卫，严防生人擅闯与亡魂外逃。' },
      'gr-poseidon': { label: '奇美拉与双头犬', role: '喷火合成兽与牧牛魔犬', bio: '同胞兄妹：狮首羊身蛇尾的喷火兽奇美拉与双头犬奥尔特罗斯。' },
      'gr-persephone': { label: '赫拉克勒斯（讨伐英雄）', role: '十二伟业半神英雄', bio: '以火炬烙断许德拉再生颈，并徒手将三头犬生擒出冥府。' },
    },
    edgeNotes: {
      'gr-chaos->mon-typhon': '挑战宙斯的终极诞育',
      'mon-typhon->gr-kronos': '地底万妖联姻',
      'mon-hydra->gr-persephone': '第二项伟业',
      'mon-cerberus->gr-persephone': '第十二项伟业',
    },
  },
  norse: {
    title: '铁森林三魔嗣与尸海岸黑龙谱系',
    cosmologicalNote:
      '《散文埃达》与《女巫的预言》将诸神黄昏的主力巨兽追溯至铁森林（Járnviðr）：女巨人安格尔伯达为洛基诞下三名末劫子嗣，分别被诸神放逐或囚禁于陆、海、冥三界，而黑龙尼德霍格则在地底日夜啮咬世界树根。',
    nodes: {
      'no-ymir': { label: '伊米尔与沸腾毒泉', role: '霜巨人始祖与冥渊泉眼', bio: '原初霜巨人与尼福尔海姆涌动万千毒蛇的赫瓦格密尔泉。' },
      'no-farbauti': { label: '洛基与安格尔伯达', role: '诡计之神与铁森林女巨人', bio: '在约顿海姆秘密结合，诞下令阿斯加德众神寝食难安的三大末日灾星。' },
      'mon-nidhoggr': { label: '尼德霍格', role: '啮咬世界树根的冥渊黑龙', bio: '盘踞尸海岸啃食树根与背誓者亡骸，与树顶神鹰隔树敌对。' },
      'mon-fenrir': { label: '芬里尔', role: '魔链束缚的吞神巨狼', bio: '提尔献出右手方用丝带魔链缚住的巨狼，注定在诸神黄昏吞噬奥丁。' },
      'mon-jormungandr': { label: '耶梦加得', role: '咬尾环抱尘世的深海毒蟒', bio: '被掷入外海后长成环绕人间的巨蟒，与雷神索尔宿命同归于尽。' },
      'no-baldr': { label: '斯库尔与哈提', role: '追日逐月双魔狼', bio: '芬里尔在铁森林繁衍的狼裔，昼夜追逐日月战车直至末日将其吞没。' },
      'no-borr': { label: '索尔与维达', role: '屠龙雷神与裂狼复仇神', bio: '索尔轰碎巨蟒头颅后毒发身亡，沉默神维达则踏裂芬里尔巨颚为父报仇。' },
    },
    edgeNotes: {
      'no-ymir->mon-nidhoggr': '极寒冥渊化生',
      'mon-fenrir->no-baldr': '铁森林狼群',
      'mon-jormungandr->no-borr': '雷蛇同归于尽',
      'mon-fenrir->no-borr': '弑父与裂颚复仇',
    },
  },
  egyptian: {
    title: '努恩暗影毒蟒与玛阿特护法圣兽谱',
    cosmologicalNote:
      '古埃及怪兽学泾渭分明：一端是源自创世前暗水努恩残影、妄图吞没太阳的混沌巨蛇阿波菲斯；另一端则是捍卫王权与玛阿特天平的神圣奇美拉（斯芬克斯与噬心兽阿米特）。',
    nodes: {
      'eg-shu': { label: '努恩（原初暗水）', role: '创世前的无边死寂深渊', bio: '拉神从中升起的原初暗水，其抗拒创世秩序的残余阴影化生出阿波菲斯。' },
      'mon-apophis': { label: '阿波菲斯（阿佩普）', role: '虚无与暗夜噬日巨蛇', bio: '每夜在冥界杜阿特伏击太阳夜航船、喝干冥河的不死混沌毒蟒。' },
      'eg-horus': { label: '太阳神拉与玛阿特', role: '创世太阳主神与宇宙真理', bio: '维系昼夜更替与死后公义审判的埃及宇宙中枢。' },
      'mon-sphinx': { label: '吉萨斯芬克斯', role: '地平线荷鲁斯护法狮身像', bio: '融汇法老睿智与雄狮神威的陵庙与地平线守护圣兽。' },
      'mon-ammit': { label: '阿米特', role: '双真理天平下的噬心兽', bio: '集鳄首、狮躯、河马臀于一身，吞噬重于真理羽毛的罪恶心脏。' },
      'eg-geb': { label: '赛特与太阳猫巴斯特', role: '夜航船首护卫双神', bio: '赛特立于船头抵抗催眠魔瞳并以铜矛刺穿蛇腹，太阳猫则斩断蛇颈。' },
      'eg-anubis': { label: '阿努比斯（司秤神）', role: '冥界天平执掌者', bio: '在阿米特身旁校准心脏与羽毛重量的胡狼首冥神。' },
    },
    edgeNotes: {
      'eg-shu->mon-apophis': '反创造虚无暗影',
      'eg-shu->eg-horus': '创世第一缕朝阳',
      'eg-horus->mon-sphinx': '太阳王权圣像',
      'eg-horus->mon-ammit': '玛阿特法则行刑官',
      'mon-apophis->eg-horus': '午夜第十二时死战',
      'mon-apophis->eg-geb': '每夜船首刺蛇',
      'mon-ammit->eg-anubis': '审判厅搭档',
    },
  },
  hindu: {
    title: '迦叶波仙人双妻世系：金翅鹏王与那伽龙族',
    cosmologicalNote:
      '《摩诃婆罗多·初篇》揭示了天界大鹏与水下毒龙宿怨的根源：仙人迦叶波的两位妻子毗娜达（诞下迦楼罗）与卡德鲁（诞下婆苏吉、舍沙等千条那伽）因打赌结怨，外加吠陀时代的封水旱龙弗栗多。',
    nodes: {
      'hi-brahman': { label: '迦叶波仙人与陀湿多', role: '生主大仙与天界巧匠', bio: '孕育神鸟、那伽龙族及吠陀敌手的远古始祖。' },
      'mon-vritra': { label: '弗栗多（阿修罗旱龙）', role: '盘山锁河的吠陀巨蛇', bio: '封锁宇宙七大圣河的原初旱魔，终被因陀罗金刚杵劈开释放甘霖。' },
      'hi-surya': { label: '毗娜达与卡德鲁', role: '对赌结怨的同胞姐妹母神', bio: '因赌神马尾色使毗娜达沦为蛇母奴隶，引出迦楼罗夺取甘露救母壮举。' },
      'mon-garuda': { label: '迦楼罗（金翅大鹏）', role: '夺甘露救母的那伽克星', bio: '力挫天军夺得不死甘露却滴酒不沾，成为毗湿奴神圣坐骑。' },
      'mon-vasuki': { label: '婆苏吉与舍沙', role: '搅乳海龙绳与千首承世龙王', bio: '侍奉湿婆与毗湿奴的神圣那伽双王，支撑地球并化生不死甘露。' },
      'hi-vishnu': { label: '毗湿奴与湿婆', role: '宇宙护持神与青颈毁灭神', bio: '至高神圣调和：毗湿奴既乘迦楼罗又眠于舍沙蛇床，湿婆则佩婆苏吉于颈间。' },
    },
    edgeNotes: {
      'hi-brahman->mon-vritra': '铸造挑战因陀罗',
      'hi-surya->mon-garuda': '毗娜达所生',
      'hi-surya->mon-vasuki': '卡德鲁所生',
      'mon-garuda->mon-vasuki': '异母兄弟天敌',
      'mon-garuda->hi-vishnu': '天界坐骑（Vahana）',
      'mon-vasuki->hi-vishnu': '千首蛇床与搅海绳',
    },
  },
  chinese: {
    title: '《淮南子》应龙化生瑞兽谱与四凶青铜诫',
    cosmologicalNote:
      '《淮南子·墬形训》保存了清晰的神兽演化世系——由创世有翼真龙“应龙”繁衍出建马、麒麟乃至天下走兽；与《山海经》《左传》中铸于周鼎诫贪的“四凶”饕餮形成仁瑞与贪煞的对照。',
    nodes: {
      'cn-hundun': { label: '毛犊与天地阴阳精气', role: '羽鳞毛介万兽始祖', bio: '《淮南子》载天地精气凝为毛犊、羽嘉、介鳞，化生世间瑞兽神龙。' },
      'mon-yinglong': { label: '应龙', role: '生翼行雨导洪的创世神龙', bio: '助轩辕斩蚩尤、佐大禹以尾画地疏导江河的有翼龙祖。' },
      'mon-taotie': { label: '饕餮（四凶之一）', role: '青铜兽面神徽与自噬贪兽', bio: '商周鼎彝通神威严纹饰，后凝练为有首无身、吞食害己的贪欲警钟。' },
      'mon-qilin': { label: '麒麟', role: '含仁怀义的四灵瑞首', bio: '“应龙生建马，建马生麒麟”，履草不折、唯太平圣世方出的至仁神兽。' },
      'cn-yu': { label: '大禹王', role: '平水土铸九鼎的华夏共主', bio: '与应龙协同疏浚九州洪流，并铸九鼎摹写百物魑魅以安黎民。' },
      'cn-xiwangmu': { label: '淮水无支祁与四凶', role: '龟山锁猿与流放凶煞', bio: '兴风作浪的淮涡水怪无支祁，终被应龙生擒锁于淮阴龟山足下。' },
    },
    edgeNotes: {
      'cn-hundun->mon-yinglong': '毛犊生应龙',
      'cn-hundun->mon-taotie': '上古四凶谱系',
      'mon-yinglong->mon-qilin': '应龙→建马→麒麟',
      'mon-yinglong->cn-yu': '治水同盟',
      'mon-yinglong->cn-xiwangmu': '擒锁龟山之下',
      'mon-taotie->cn-yu': '周鼎著饕餮诫贪',
    },
  },
  japanese: {
    title: '出云大蛇、稻荷灵狐与鞍马天狗谱系',
    cosmologicalNote:
      '日本异兽观融合了《古事记》荒ぶる自然巨怪（八岐大蛇）与“和魂/荒魂”一体两面的精怪哲学——九尾狐与大天狗既可掀起覆国风波，亦可转化为稻荷神社与修验道灵山的尊贵护法。',
    nodes: {
      'jp-ame': { label: '八百万山川草木精魂', role: '灵峰溪谷与鸟居阈限', bio: '云雾杉林、含铁血河与千本鸟居交织的万物有灵之境。' },
      'mon-orochi': { label: '八岐大蛇', role: '八首八尾藏剑洪流巨蟒', bio: '盘跨出云八谷八峰的巨蛇，第四尾内孕育皇室神器天丛云剑。' },
      'mon-tengu': { label: '大天狗（鞍马僧正坊）', role: '红颜双翼深山剑圣护法', bio: '统领鸦天狗镇守鞍马山，挫败傲慢僧侣并秘授源义经兵法。' },
      'mon-kitsune': { label: '九尾狐（玉藻前/稻荷使）', role: '千年幻形天狐与杀生石', bio: '一面是衔谷仓宝钥的稻荷白狐，一面是震动平安京的金毛九尾妖狐。' },
      'jp-okuninushi': { label: '须佐之男与草薙剑', role: '醉蛇斩妖神与三神器之剑', bio: '设八槽烈酒醉斩大蛇，剖尾得神剑献予天照大御神。' },
      'jp-ninigi': { label: '牛若丸与阴阳师安倍氏', role: '天狗高徒与破妖阴阳师', bio: '源义经夜习天狗剑术成一代名将，安倍泰成则当廷识破玉藻前真身。' },
    },
    edgeNotes: {
      'jp-ame->mon-orochi': '斐伊川山洪铁砂',
      'jp-ame->mon-tengu': '灵山修验道化现',
      'jp-ame->mon-kitsune': '千年狐灵通变',
      'mon-orochi->jp-okuninushi': '八盐折酒醉斩',
      'mon-tengu->jp-ninigi': '夜授兵法剑术',
      'mon-kitsune->jp-ninigi': '宫廷显形斗法',
    },
  },
  mesopotamian: {
    title: '提阿玛特十一魔军与王宫门槛护法谱',
    cosmologicalNote:
      '巴比伦《埃努玛·埃利什》泥板一记载了人类文学史上最早的“十一类合成怪兽军团”（由咸水母龙提阿玛特孕育），与亚述城门仁慈庄严的五足带翼牛拉玛苏及雪松林守护者胡姆巴巴构成壮阔对照。',
    nodes: {
      'me-apsu': { label: '阿普苏与原初混水', role: '天地未分前的甜咸合流深渊', bio: '创世之初甜水始祖阿普苏与咸水母神提阿玛特静默交融。' },
      'mon-tiamat': { label: '提阿玛特（乌姆·胡布尔）', role: '诞育万魔的原初咸水母龙', bio: '盛怒下凭一己之力创造怒蛇、蝎人等十一类毒兽，死后身躯化作天地两河。' },
      'me-anu': { label: '恩利尔与天界神议会', role: '颁布神圣天命的至高诸神', bio: '委任胡姆巴巴看守黎巴嫩雪松圣林，并赐予王城门槛护法神兽。' },
      'mon-humbaba': { label: '胡姆巴巴', role: '披七重恐怖灵光的雪松林守护者', bio: '口吐烈火洪水的神林守卫，被吉尔伽美什借风致盲斩杀而降下天谴。' },
      'mon-lamassu': { label: '拉玛苏（舍杜）', role: '五足带翼人首牛宫门护法', bio: '集人智、牛力、鹰翼于一身，镇守尼尼微与波斯波利斯城门弹回恶灵。' },
      'me-gilgamesh': { label: '怒蛇穆什胡什与蝎人军', role: '提阿玛特被收服的先锋魔兽', bio: '提阿玛特诞下的角龙怒蛇，马尔杜克胜后收为坐骑并铸上巴比伦伊什塔尔城门蓝砖。' },
    },
    edgeNotes: {
      'me-apsu->mon-tiamat': '甜水与咸水交融',
      'mon-tiamat->me-gilgamesh': '孕育十一类魔兽',
      'me-anu->mon-humbaba': '钦定看守雪松林',
      'me-anu->mon-lamassu': '帝都门阙辟邪',
      'mon-tiamat->mon-lamassu': '混沌反扑 vs 王城护法',
    },
  },
  celtic: {
    title: '荒海弗摩魔眼、仙丘挽歌与寒潭水马谱',
    cosmologicalNote:
      '爱尔兰与苏格兰精怪传统横跨三重秘境：西北荒海托里岛的弗摩族独眼暴君（巴罗尔）、地下古冢仙丘的古老家族守望女灵（报丧女妖），以及高地黑水湖泊的变形水马（凯尔皮）。',
    nodes: {
      'ce-danu': { label: '深海弗摩渊与仙丘古冢', role: '大西洋怒海与地下彼世', bio: '环抱凯尔特人间的两大超自然疆域：苦寒外海与时间凝滞的史前石冢。' },
      'mon-balor': { label: '邪眼魔王巴罗尔', role: '托里岛弗摩族独眼暴君', bio: '眼睑掀开即焚毁千军的巨人魔王，终被亲外孙鲁格飞石穿瞳反灭魔军。' },
      'mon-banshee': { label: '报丧女妖（班西）', role: '仙丘银梳哀歌守护女灵', bio: '源自仙丘贵族与土地女神，在盖尔古族将逝前夜泣唱悲悯挽歌。' },
      'mon-kelpie': { label: '凯尔皮（高地水马）', role: '皮毛黏死猎物的寒潭幻骏', bio: '潜伏暴涨溪湖的十倍马力水怪，唯夺其魔法笼头者可暂役其力。' },
      'ce-aengus': { label: '水晶塔女艾思林与鲁格', role: '幽禁独女与弑祖外孙光神', bio: '巴罗尔锁女避祸反促成光神鲁格降生，应验摩伊图拉弑祖预言。' },
      'ce-cuchulainn': { label: '溪畔浣血衣女（Bean Nighe）', role: '浅滩预示战死的同源女灵', bio: '苏格兰高地溪边洗涤将死武士血衣的预言女仙。' },
    },
    edgeNotes: {
      'ce-danu->mon-balor': '弗摩深海魔裔',
      'ce-danu->mon-banshee': '仙丘（Aos Sí）世系',
      'ce-danu->mon-kelpie': '寒潭水灵',
      'mon-balor->ce-aengus': '外孙弑祖预言',
      'mon-banshee->ce-cuchulainn': '预兆姐妹形态',
    },
  },
  mesoamerican: {
    title: '第五太阳纪异兽谱：大地巨鳄、蚀日星魔与湖底尾手兽',
    cosmologicalNote:
      '阿兹特克生态宇宙观将人类置于上下双重巨口之间：脚下是十八关节皆长满饥口的大地鳄怪希帕克特利，头顶是日食时随时俯冲的星辰骸骨女神齐齐米梅，湖中则潜伏着为雨神选魂的尾手水兽阿维索特尔。',
    nodes: {
      'ma-ometeotl': { label: '原初暗水与繁星夜空', role: '第五太阳诞生前的混沌疆域', bio: '特奥蒂瓦坎众神投火创日之前，无边暗水与潜伏星魔主宰宇宙。' },
      'mon-cipactli': { label: '希帕克特利', role: '关节布满巨口的大地鳄鱼母体', bio: '被双神撕成天地却依然活着啼哭索血、赐予人类玉米的原初凯门鳄巨怪。' },
      'mon-tzitzimitl': { label: '齐齐米梅', role: '日食俯冲的星辰骸骨女神军', bio: '平日护佑产妇分娩，一旦日全食或52年圣火熄灭便从天而降吞噬世人。' },
      'mon-ahuizotl': { label: '阿维索特尔', role: '尾生人手的特斯科科湖异兽', bio: '学婴儿啼哭将渔人拖入湖渊，把被选中的灵魂送往雨神花卉乐园。' },
      'ma-twins': { label: '羽蛇神与烟镜神', role: '化蟒撕裂巨鳄的创世宿敌双神', bio: '特斯卡特利波卡断足诱出巨鳄，与羽蛇神合力将其重塑为山川大地。' },
      'ma-tlaloc': { label: '雨神特拉洛克与黑曜石蝶', role: '乐园水主与星魔统帅', bio: '特拉洛克役使阿维索特尔巡守湖泊，伊茨帕帕洛特尔则统率夜空齐齐米梅。' },
    },
    edgeNotes: {
      'ma-ometeotl->mon-cipactli': '游弋原初暗水',
      'ma-ometeotl->mon-tzitzimitl': '潜伏繁星天幕',
      'mon-cipactli->ma-twins': '断足诱捕与裂躯创世',
      'ma-tlaloc->mon-ahuizotl': '特拉洛坎捞魂仆从',
      'ma-tlaloc->mon-tzitzimitl': '黑曜石蝴蝶统领',
    },
  },
  yoruba: {
    title: '约鲁巴神圣生态谱：箍世彩虹蟒、皇家花豹与夜树双灵',
    cosmologicalNote:
      '约鲁巴宇宙哲学将超自然异兽与灵力分布于天地林夜三重维度：连接天海稳固地球的彩虹巨蟒奥舒马雷、象征奥巴君王威仪的雨林花豹埃昆，以及伊罗科树顶夜鸟圣母埃莱耶与八大灾厄魔将阿乔贡的动态制衡。',
    nodes: {
      'yo-olodumare': { label: '奥洛杜马雷与原初阿谢（Àṣẹ）', role: '宇宙生命能量至高源泉', bio: '将维系天地、君王涵养与隐秘监督权赋予天界与人间的神圣存在。' },
      'mon-oshumare': { label: '奥舒马雷', role: '盘固大地的阴阳彩虹巨蟒', bio: '往返深海与九霄的七彩巨蟒，以蛇躯箍紧地球免其崩解并赐予丰饶。' },
      'mon-ajogun': { label: '埃莱耶与阿乔贡', role: '夜鸟圣母与八大灾厄魔将', bio: '栖于伊罗科树顶执掌Àjé的女性长老灵体，以及需靠献祭化解的死病八魔将。' },
      'mon-ekun': { label: '皇家圣豹埃昆', role: '温雅沉静而一击雷霆的雨林真王', bio: '获伊法赐予璀璨豹纹的百兽之长，直接映射奥巴神圣王权与贝宁铜雕。' },
      'yo-ogun': { label: '奥伦米拉、埃舒与神圣奥巴', role: '伊法盟约、献祭调停与鸟顶王冠', bio: '奥伦米拉以礼敬同夜鸟圣母结盟，埃舒传递祭品平息阿乔贡，国王王冠顶端高立神鸟。' },
    },
    edgeNotes: {
      'yo-olodumare->mon-oshumare': '天廷与深海彩虹使臣',
      'yo-olodumare->mon-ekun': '赐予沉静王道斑纹',
      'yo-olodumare->mon-ajogun': '托付隐秘制衡权柄',
      'mon-ekun->yo-ogun': '神圣国王专属象征',
      'mon-ajogun->yo-ogun': '伊法礼敬与盖莱德假面调和',
      'mon-oshumare->yo-ogun': '占卜与丰饶盟友',
    },
  },
};

export const BESTIARY_LINEAGES_ZH: PantheonLineage[] = BESTIARY_LINEAGES_EN.map((lin) => {
  const ov = LINEAGE_ZH_OV[lin.traditionId];
  if (!ov) return lin;
  return {
    ...lin,
    title: ov.title,
    cosmologicalNote: ov.cosmologicalNote,
    nodes: lin.nodes.map((n) => (ov.nodes[n.id] ? { ...n, ...ov.nodes[n.id] } : n)),
    edges: lin.edges.map((e) => {
      const note = ov.edgeNotes?.[`${e.from}->${e.to}`];
      return note ? { ...e, note } : e;
    }),
  };
});
