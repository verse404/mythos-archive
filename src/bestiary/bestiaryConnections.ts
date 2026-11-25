import type {
  AncestralRootFamily,
  InspirationEvent,
  PairwiseSimilarity,
} from '../data/connections';
import type { TraditionId } from '../types/mythology';

export const BESTIARY_ROOT_FAMILIES_EN: AncestralRootFamily[] = [
  {
    id: 'root-pie-dragons',
    name: 'Proto-Indo-European Dragon & Hell-Hound Lineage',
    originEra: 'c. 4000 – 2500 BCE',
    homeland: 'Pontic-Caspian Steppe (Eurasia)',
    platePath: '/plates/bestiary/connections/root-pie-dragons.webp',
    descendantTraditions: ['hindu', 'greek', 'celtic', 'norse'],
    summary:
      'Linguist Calvert Watkins (How to Kill a Dragon) demonstrated that Vedic India, Greece, Ireland, and Scandinavia inherited a single Bronze Age poetic formula (*éghan áhim, "he slew the serpent") alongside cognate spotted underworld gate-hounds and cosmic tree-eagles.',
    inheritedTraits: [
      {
        concept: 'Serpent-Slaying Formula (*éghan áhim)',
        manifestations: 'Indra vs. Vritra · Zeus vs. Typhon · Thor vs. Jörmungandr · Heracles vs. Hydra',
      },
      {
        concept: 'Spotted Underworld Hound (*Ḱérberos)',
        manifestations: 'Greek Cerberus · Vedic Śarvara & Śyāma (Yama’s hounds) · Norse Garmr',
      },
      {
        concept: 'Eagle vs. Root-Serpent Axis',
        manifestations: 'Indic Garuda vs. Nagas · Norse Yggdrasil Eagle vs. Níðhöggr',
      },
    ],
    compareDeityIds: ['mon-vritra', 'mon-typhon', 'mon-jormungandr', 'mon-balor'],
  },
  {
    id: 'root-ane-chimeras',
    name: 'Ancient Near Eastern Chaos-Dragon & Royal Chimera Sphere',
    originEra: 'c. 3500 – 500 BCE',
    homeland: 'Fertile Crescent & Nile Delta',
    platePath: '/plates/bestiary/connections/root-ane-chimeras.webp',
    descendantTraditions: ['mesopotamian', 'egyptian', 'greek'],
    summary:
      'Sumerian, Babylonian, and Egyptian workshops invented the visual grammar of composite monsters—seven-headed serpents on cylinder seals, winged human-headed bulls (Lamassu), and royal Sphinxes—which Phoenician trade transmitted directly into archaic Greece.',
    inheritedTraits: [
      {
        concept: 'Seven/Nine-Headed Cauterized Serpent',
        manifestations: 'Sumerian Mušmaḫḫū seal imagery → Hurrian Illuyanka → Greek Lernaean Hydra',
      },
      {
        concept: 'Royal Threshold Chimera',
        manifestations: 'Giza Solar Sphinx · Assyrian Five-Legged Lamassu → Inverted into Greek Theban Sphinx',
      },
      {
        concept: 'Primordial Sea-Dragon Mother',
        manifestations: 'Babylonian Tiamat & Eleven Monsters · Egyptian Apophis · Greek Echidna & Typhon',
      },
    ],
    compareDeityIds: ['mon-tiamat', 'mon-lamassu', 'mon-sphinx', 'mon-hydra'],
  },
  {
    id: 'root-east-asian-bestiary',
    name: 'Sino-Indic Nāga–Long & Shan Hai Jing Yōkai Sphere',
    originEra: 'c. 1300 BCE – 1780 CE',
    homeland: 'Yellow/Yangtze Basins, Gangetic Plain & Japan',
    platePath: '/plates/bestiary/connections/root-east-asian-bestiary.webp',
    descendantTraditions: ['hindu', 'chinese', 'japanese'],
    summary:
      'Across South and East Asia, two massive streams converged: Buddhist sutras wedded Indic Nāga serpent-kings and Garuda with indigenous Chinese rain-dragons (Long), while woodblock editions of the Shan Hai Jing seeded Japan’s Kitsune, Kirin, and Tengu.',
    inheritedTraits: [
      {
        concept: 'Rain-Giving Dragon Sovereignty',
        manifestations: 'Indic Vasuki/Nāgarājas + Chinese Winged Yinglong → East Asian Four Sea Dragon Kings',
      },
      {
        concept: 'Nine-Tailed Fox Metamorphosis',
        manifestations: 'Shan Hai Jing Mount Qingqiu Auspicious Fox → Courtly Tamamo-no-Mae & Inari Kitsune',
      },
      {
        concept: 'Winged Mountain Wardens',
        manifestations: 'Indic Solar Garuda (Karura) + Chinese Tiangou → Japanese Shugendō Daitengu',
      },
    ],
    compareDeityIds: ['mon-vasuki', 'mon-yinglong', 'mon-kitsune', 'mon-tengu'],
  },
  {
    id: 'root-atlantic-indigenous',
    name: 'Mesoamerican & West African Sacred Cosmic Ecologies',
    originEra: 'c. 1500 BCE – Present',
    homeland: 'Anahuac Highlands & West African Rainforest Belt',
    platePath: '/plates/bestiary/connections/root-atlantic-indigenous.webp',
    descendantTraditions: ['mesoamerican', 'yoruba'],
    summary:
      'Developing wholly outside Eurasian dragon-slaying dogma, Mesoamerican and Yoruba traditions articulated profound ecological philosophies where cosmic serpents bind or form the living Earth, royal predators model restraint, and awesome feminine night-powers guard birth and justice.',
    inheritedTraits: [
      {
        concept: 'World-Sustaining / World-Body Reptile',
        manifestations: 'Aztec Living Earth-Caiman Cipactli · Yoruba Earth-Binding Rainbow Python Oshumare',
      },
      {
        concept: 'Dual Protective-Fierce Night Mothers',
        manifestations: 'Aztec Midwife/Eclipse Tzitzimimeh · Yoruba Eleye Bird-Mothers Honored in Gẹ̀lẹ̀dẹ́',
      },
      {
        concept: 'Sovereign Apex Predator Ethic',
        manifestations: 'Yoruba Royal Leopard Ekun · Mesoamerican Jaguar & Emperor-Crest Ahuizotl',
      },
    ],
    compareDeityIds: ['mon-cipactli', 'mon-oshumare', 'mon-tzitzimitl', 'mon-ajogun'],
  },
];

const ROOT_ZH_OV: Record<
  string,
  Pick<AncestralRootFamily, 'name' | 'originEra' | 'homeland' | 'summary' | 'inheritedTraits'>
> = {
  'root-pie-dragons': {
    name: '原始印欧“屠龙古诗”与冥犬母源谱系',
    originEra: '约公元前4000 – 前2500年',
    homeland: '欧亚黑海—里海大草原',
    summary:
      '比较语言学家沃特金斯在《如何屠龙》中证实：印度、希腊、爱尔兰与北欧共享同一套青铜时代印欧古诗公式“*éghan áhim（他斩杀了巨蛇）”，并共同继承了斑点冥府守门犬与宇宙树鹰蛇对立母题。',
    inheritedTraits: [
      { concept: '雷神屠龙古诗公式 (*éghan áhim)', manifestations: '因陀罗斩弗栗多 · 宙斯镇提丰 · 索尔战耶梦加得 · 赫拉克勒斯烙许德拉' },
      { concept: '冥府守门犬同源词 (*Ḱérberos)', manifestations: '希腊三头犬刻耳柏洛斯 · 吠陀阎摩双犬沙尔瓦拉 · 北欧血胸冥犬加姆' },
      { concept: '宇宙树顶神鹰 vs. 树根毒龙', manifestations: '印度金翅大鹏迦楼罗斗那伽 · 北欧世界树顶鹰斗啮根黑龙尼德霍格' },
    ],
  },
  'root-ane-chimeras': {
    name: '古代近东混沌母龙与皇家奇美拉传播圈',
    originEra: '约公元前3500 – 前500年',
    homeland: '两河新月沃地与尼罗河三角洲',
    summary:
      '苏美尔、巴比伦与古埃及工匠率先创造了人类复合神兽的视觉语法——七首蛇滚筒印章、五足带翼人首牛拉玛苏与太阳斯芬克斯——并经腓尼基海贸直接输入古风时代希腊。',
    inheritedTraits: [
      { concept: '火烙多首水蛇图像链', manifestations: '苏美尔七首蛇穆什玛胡印章 → 胡里特巨蛇 → 希腊勒拿九头蛇许德拉' },
      { concept: '帝国门槛神圣奇美拉', manifestations: '埃及吉萨斯芬克斯 · 亚述拉玛苏 → 跨海反转为希腊底比斯谜语女妖' },
      { concept: '原初咸水万魔之母', manifestations: '巴比伦提阿玛特十一魔军 · 埃及阿波菲斯 · 希腊厄喀德那与提丰家族' },
    ],
  },
  'root-east-asian-bestiary': {
    name: '印汉“那伽—神龙”合流与《山海经》百鬼东传圈',
    originEra: '约公元前1300年 – 公元1780年',
    homeland: '黄河长江流域、恒河平原与日本列岛',
    summary:
      '亚洲东方汇聚两大壮阔潮流：佛经汉译令印度那伽龙王、迦楼罗与华夏本土行雨应龙融铸为东亚龙王护法体系；同时《山海经》图本东渡日本，直接孕育出九尾狐、麒麟与大天狗物语。',
    inheritedTraits: [
      { concept: '司雨护法神龙主权', manifestations: '印度那伽龙王婆苏吉/舍沙 + 华夏有翼应龙 → 东亚四海龙王与八大龙王' },
      { concept: '青丘九尾灵狐演变', manifestations: '《山海经》青丘瑞狐 → 唐宋狐仙传奇 → 日本稻荷白狐与玉藻前杀生石' },
      { concept: '深山双翼护法天狗', manifestations: '印度迦楼罗（迦楼罗炎/乌鸦天狗造型）+ 中国流星天狗 → 日本鞍马山大天狗' },
    ],
  },
  'root-atlantic-indigenous': {
    name: '中美洲与西非约鲁巴神圣生态宇宙观',
    originEra: '约公元前1500年 – 当今',
    homeland: '墨西哥高原盆地与西非几内亚湾雨林带',
    summary:
      '完全独立于欧亚“屠龙除恶”教条之外，中美洲与西非约鲁巴发展出精深的神圣生态哲学：巨鳄与彩虹蟒构成或箍紧活体大地，花豹诠释含威不露的王道，而暗夜女性超自然力量同时护佑分娩与公义。',
    inheritedTraits: [
      { concept: '化生或箍固大地的神圣巨爬行兽', manifestations: '阿兹特克十八口大地鳄母希帕克特利 · 约鲁巴箍世彩虹巨蟒奥舒马雷' },
      { concept: '兼具威严与护生的暗夜母神群', manifestations: '阿兹特克护产/蚀日星魔齐齐米梅 · 约鲁巴盖莱德假面礼赞的夜鸟圣母埃莱耶' },
      { concept: '内敛尊贵的丛林帝王猛兽', manifestations: '约鲁巴白布遮面的皇家花豹埃昆 · 阿兹特克皇徽水兽阿维索特尔与美洲虎' },
    ],
  },
};

export const BESTIARY_ROOT_FAMILIES_ZH: AncestralRootFamily[] = BESTIARY_ROOT_FAMILIES_EN.map(
  (r) => (ROOT_ZH_OV[r.id] ? { ...r, ...ROOT_ZH_OV[r.id] } : r)
);

export const BESTIARY_TIMELINE_EN: InspirationEvent[] = [
  {
    id: 'insp-pie-dispersal',
    yearSort: -3000,
    eraLabel: 'c. 3500 – 1500 BCE',
    fromTradition: 'pie-steppe',
    fromLabel: 'Proto-Indo-European Steppe Bards',
    toTradition: 'hindu',
    toLabel: 'Vedic, Greek, Celtic & Norse Bestiaries',
    kind: 'shared-root',
    headline: 'Steppe Dispersal of the *éghan áhim Dragon-Slayer Formula & Spotted Hell-Hound',
    historicalChannel: 'Bronze Age Indo-European migrations carrying oral poetic meter from the Pontic Steppe to India, Greece, Ireland, and Scandinavia',
    platePath: '/plates/bestiary/connections/root-pie-dragons.webp',
    whatWasInspired: [
      { sourceElement: 'PIE *h₂éngʷʰis (water-blocking serpent)', inspiredOutcome: 'Vedic Ahi/Vritra, Greek Typhon/Hydra, Norse Jörmungandr' },
      { sourceElement: 'PIE *Ḱérberos ("spotted" death-hound)', inspiredOutcome: 'Greek three-headed Cerberus, Vedic Śarvara, Norse Garmr' },
      { sourceElement: 'Grandson Blight-Eye Prophecy', inspiredOutcome: 'Celtic Balor & Lugh parallel to Greek Medusa/Acrisius & Perseus' },
    ],
    scholarlySummary:
      'Explains why Rigveda 1.32, Hesiod’s Theogony, Cath Maige Tuired, and Völuspá share cognate dragon-combat verbs and underworld gate-hounds across four thousand miles.',
    compareDeityIds: ['mon-vritra', 'mon-typhon', 'mon-jormungandr', 'mon-cerberus'],
    linkedMotifId: 'sea-leviathan',
  },
  {
    id: 'insp-meso-greek',
    yearSort: -750,
    eraLabel: 'c. 850 – 650 BCE',
    fromTradition: 'mesopotamian',
    fromLabel: 'Mesopotamian & Hurrian-Levantine Seals',
    toTradition: 'greek',
    toLabel: 'Archaic Greek Monster Genealogy',
    kind: 'direct-inspiration',
    headline: 'Tiamat’s Brood & Seven-Headed Mušmaḫḫū Inspire Greece’s Typhon & Hydra',
    historicalChannel: 'Orientalizing-era Phoenician trade, Cypriot ports, and Mount Kasios (Mount Hazzi) bilingual sanctuaries',
    platePath: '/plates/bestiary/connections/insp-meso-greek.webp',
    whatWasInspired: [
      { sourceElement: 'Sumerian-Akkadian 7-headed serpent Mušmaḫḫū', inspiredOutcome: 'Greek regenerating multi-headed Lernaean Hydra' },
      { sourceElement: 'Tiamat’s 11-species monster army & Hurrian Ullikummi', inspiredOutcome: 'Hesiod’s Typhon & Echidna chthonic monster catalog at Mt. Kasios' },
    ],
    scholarlySummary:
      'Tell Asmar seals show heroes torching and hacking multi-headed serpents nearly two millennia before Heracles, proving direct Near Eastern artistic transmission into early Greece.',
    compareDeityIds: ['mon-tiamat', 'mon-typhon', 'mon-hydra', 'mon-lamassu'],
    linkedMotifId: 'multi-headed',
  },
  {
    id: 'insp-egypt-greece',
    yearSort: -600,
    eraLabel: 'c. 1400 – 500 BCE',
    fromTradition: 'egyptian',
    fromLabel: 'Egyptian Royal Sphinxes & Seth-Apophis Lore',
    toTradition: 'greek',
    toLabel: 'Theban Winged Sphinx & Typhon Flight Myth',
    kind: 'syncretic-exchange',
    headline: 'Benevolent Solar Sphinxes Reimagined as the Winged Riddle-Monster of Thebes',
    historicalChannel: 'Mycenaean ivory imports, Naukratis Nile port, and Herodotus/Plutarch Greco-Egyptian syncretism',
    platePath: '/plates/bestiary/connections/insp-egypt-greece.webp',
    whatWasInspired: [
      { sourceElement: 'Egyptian Hor-em-akhet (male royal guardian Sphinx)', inspiredOutcome: 'Greek winged female Sphinx of Mount Phikion posing mortal riddles' },
      { sourceElement: 'Egyptian Seth / chaos-serpent Apophis', inspiredOutcome: 'Greek myth of Olympians fleeing Typhon into Egypt in animal forms' },
    ],
    scholarlySummary:
      'Demonstrates one of history’s sharpest iconographic inversions: Egypt’s serene protector of pharaonic Ma’at became Greece’s tragic strangler at Thebes’ gates.',
    compareDeityIds: ['mon-sphinx', 'mon-typhon', 'mon-apophis', 'mon-ammit'],
    linkedMotifId: 'sacred-chimeras',
  },
  {
    id: 'insp-india-china',
    yearSort: 250,
    eraLabel: 'c. 100 – 700 CE',
    fromTradition: 'hindu',
    fromLabel: 'Indic Nāgarājas & Solar Garuda',
    toTradition: 'chinese',
    toLabel: 'Chinese Sea Dragon Kings & Peng Lore',
    kind: 'syncretic-exchange',
    headline: 'Silk Road Sutra Translators Render Indic Nāga Kings as Chinese Longwang',
    historicalChannel: 'Buddhist translation bureaus at Chang’an and Dunhuang merging Sanskrit Nāga/Garuda texts with Huaxia dragon lore',
    platePath: '/plates/bestiary/connections/insp-india-china.webp',
    whatWasInspired: [
      { sourceElement: 'Subterranean jewel-palace Nāga kings (Vasuki, Sagara)', inspiredOutcome: 'Submarine crystal palaces of the Four Sea Dragon Kings (Sihai Longwang)' },
      { sourceElement: 'Vishnu’s eagle Garuda (Jinchi Dapeng)', inspiredOutcome: 'Golden-Winged Great Peng in Tang literature and Journey to the West' },
    ],
    scholarlySummary:
      'When Kumarajiva and early translators chose the revered character 龍 (Long) to translate Sanskrit Nāga, Indic serpent palace mythology fused seamlessly with China’s winged rain-dragon Yinglong.',
    compareDeityIds: ['mon-vasuki', 'mon-yinglong', 'mon-garuda', 'mon-qilin'],
    linkedMotifId: 'sea-leviathan',
  },
  {
    id: 'insp-china-japan',
    yearSort: 800,
    eraLabel: 'c. 700 – 1776 CE',
    fromTradition: 'chinese',
    fromLabel: 'Shan Hai Jing Nine-Tailed Fox, Qilin & Tiangou',
    toTradition: 'japanese',
    toLabel: 'Japanese Kitsune, Kirin & Kurama Tengu',
    kind: 'direct-inspiration',
    headline: 'Shan Hai Jing Cosmography Evolves into Japan’s Tamamo-no-Mae, Tengu & Yōkai Canon',
    historicalChannel: 'Kentōshi envoys, Esoteric Buddhist Karura imagery, Onmyōdō lore, and Edo woodblock printing',
    platePath: '/plates/bestiary/connections/insp-china-japan.webp',
    whatWasInspired: [
      { sourceElement: 'Shan Hai Jing nine-tailed fox & Shang Daji legend', inspiredOutcome: 'Three-empire fox saga of Tamamo-no-Mae and Nasu’s Killing Stone' },
      { sourceElement: 'Chinese meteor-beast Tiangou + Indic winged Garuda/Karura', inspiredOutcome: 'Winged Shugendō swordmaster Daitengu & Karasu-tengu on Mount Kurama' },
    ],
    scholarlySummary:
      'Japan absorbed continental beast catalogs and transformed them into psychologically rich dramas of court illusion, shrine benevolence, and mountain swordsmanship.',
    compareDeityIds: ['mon-taotie', 'mon-qilin', 'mon-kitsune', 'mon-tengu'],
    linkedMotifId: 'shapeshifters',
  },
  {
    id: 'insp-mesoamerica-continuum',
    yearSort: 950,
    eraLabel: 'c. 1000 BCE – 1521 CE',
    fromTradition: 'mesoamerican',
    fromLabel: 'Olmec & Classic Maya Earth-Monster Art',
    toTradition: 'mesoamerican',
    toLabel: 'Aztec Cipactli, Tzitzimimeh & Ahuizotl',
    kind: 'direct-inspiration',
    headline: 'Olmec Caiman-Maws & Maya Star-Demons Culminate in Tenochtitlan’s Fifth Sun Bestiary',
    historicalChannel: 'Three millennia of Mesoamerican calendrical codices, ballcourt monuments, and highland-lowland trade',
    platePath: '/plates/bestiary/connections/insp-mesoamerica-continuum.webp',
    whatWasInspired: [
      { sourceElement: 'Olmec gaping caiman cave-portals & Maya Itzam Cab Ain', inspiredOutcome: 'Aztec 18-mouthed Cipactli / Tlaltecuhtli monolith and Day-1 calendar glyph' },
      { sourceElement: 'Classic Maya celestial eclipse sky-bands', inspiredOutcome: 'Nahua skeletal Tzitzimimeh descending if the 52-year New Fire fails' },
    ],
    scholarlySummary:
      'Across Mesoamerica, calendrical Day-1 ("Cipactli / Imix") anchored time itself in the body of the primordial crocodilian earth-monster.',
    compareDeityIds: ['mon-cipactli', 'mon-tzitzimitl', 'mon-ahuizotl', 'mon-tiamat'],
    linkedMotifId: 'apocalypse-beasts',
  },
  {
    id: 'insp-yoruba-atlantic',
    yearSort: 1650,
    eraLabel: 'c. 1500 CE – Present',
    fromTradition: 'yoruba',
    fromLabel: 'Yoruba & Fon Sacred Python, Ekun & Gẹ̀lẹ̀dẹ́',
    toTradition: 'yoruba',
    toLabel: 'Afro-Atlantic Oxumarê, Dan & Living Heritage',
    kind: 'direct-inspiration',
    headline: 'Oshumare’s Rainbow Coils & Gẹ̀lẹ̀dẹ́ Bird-Mothers Flourish Across the Atlantic',
    historicalChannel: 'Liturgical resilience across Brazil (Candomblé Oxumarê), Cuba (Lucumí), Benin, and Nigeria',
    platePath: '/plates/bestiary/connections/insp-yoruba-atlantic.webp',
    whatWasInspired: [
      { sourceElement: 'Yoruba Oshumare & Fon Dan Ayido-Hwedo rainbow python', inspiredOutcome: 'Afro-Brazilian Oxumarê and Caribbean Damballah cosmic serpent devotion' },
      { sourceElement: 'Odù Ọ̀sá Méjì Eleye bird-crown & Gẹ̀lẹ̀dẹ́ masquerades', inspiredOutcome: 'UNESCO-inscribed living West African & diasporic celebration of elder female power' },
    ],
    scholarlySummary:
      'Preserves an unbroken living tradition in which cosmic serpents and nocturnal bird-mothers uphold planetary balance and royal accountability.',
    compareDeityIds: ['mon-oshumare', 'mon-ekun', 'mon-ajogun', 'mon-vasuki'],
    linkedMotifId: 'sea-leviathan',
  },
];

const TIMELINE_ZH_OV: Record<
  string,
  Pick<
    InspirationEvent,
    'eraLabel' | 'fromLabel' | 'toLabel' | 'headline' | 'historicalChannel' | 'whatWasInspired' | 'scholarlySummary'
  >
> = {
  'insp-pie-dispersal': {
    eraLabel: '约公元前3500 – 前1500年',
    fromLabel: '原始印欧草原吟游传统',
    toLabel: '印度、希腊、凯尔特与北欧异兽志',
    headline: '草原迁徙播撒“*éghan áhim 屠龙公式”与同源冥府守门犬',
    historicalChannel: '青铜时代印欧语族自黑海草原向南亚、爱琴海、爱尔兰与斯堪的纳维亚迁徙，携同源格律口传四方',
    whatWasInspired: [
      { sourceElement: '原始印欧闭水巨蛇 (*h₂éngʷʰis)', inspiredOutcome: '吠陀旱龙弗栗多、希腊提丰/许德拉、北欧尘世巨蟒耶梦加得' },
      { sourceElement: '斑点冥界守门犬 (*Ḱérberos)', inspiredOutcome: '希腊三头犬刻耳柏洛斯、印度阎摩双犬沙尔瓦拉、北欧冥犬加姆' },
      { sourceElement: '外孙破除魔眼预言母题', inspiredOutcome: '凯尔特巴罗尔与外孙鲁格，对应希腊阿克里西俄斯/美杜莎与珀尔修斯' },
    ],
    scholarlySummary:
      '解释了为何相隔万里的《梨俱吠陀》、《神谱》、《摩伊图拉战役》与《女巫的预言》共享一致的屠龙动词与冥犬原型。',
  },
  'insp-meso-greek': {
    eraLabel: '约公元前850 – 前650年',
    fromLabel: '两河流域与胡里特—黎凡特印章',
    toLabel: '古风时期希腊万妖谱系',
    headline: '提阿玛特魔军与苏美尔七首蛇直接启发希腊提丰与九头蛇',
    historicalChannel: '“东方化时期”腓尼基海贸、塞浦路斯口岸与卡西奥斯山（哈齐山）双语圣所交流',
    whatWasInspired: [
      { sourceElement: '苏美尔—阿卡德七首蛇穆什玛胡火烙印章', inspiredOutcome: '赫拉克勒斯与伊俄拉俄斯持火炬灼烧勒拿九头蛇再生颈' },
      { sourceElement: '提阿玛特十一魔军与胡里特石怪神话', inspiredOutcome: '赫西俄德《神谱》提丰与厄喀德那的地底怪兽家谱' },
    ],
    scholarlySummary:
      '阿斯马尔出土滚筒印章比赫拉克勒斯神话早近两千年便刻画出火烙多头水蛇，确证近东怪兽艺术向早期希腊的直接传播。',
  },
  'insp-egypt-greece': {
    eraLabel: '约公元前1400 – 前500年',
    fromLabel: '古埃及皇家斯芬克斯与阿波菲斯神话',
    toLabel: '希腊底比斯带翼谜语斯芬克斯',
    headline: '尼罗河仁慈护法的太阳斯芬克斯跨海反转为底比斯食人谜语女妖',
    historicalChannel: '迈锡尼象牙贸易、尼罗河口希腊商埠瑙克拉提斯及希罗多德/普鲁塔克神话互译',
    whatWasInspired: [
      { sourceElement: '埃及地平线荷鲁斯（男性法老护法狮身像）', inspiredOutcome: '希腊菲基翁山人面狮身鹰翼、以人生三步谜绞杀旅人的女妖' },
      { sourceElement: '埃及风暴神赛特与噬日巨蛇阿波菲斯', inspiredOutcome: '希腊众神因畏惧百首提丰而化作动物逃入埃及的神话' },
    ],
    scholarlySummary:
      '展现了世界艺术史上最戏剧性的跨文化反转：埃及捍卫玛阿特秩序的圣像，进入希腊悲剧语境后化作了宿命迷局的守门怪。',
  },
  'insp-india-china': {
    eraLabel: '约公元100 – 700年',
    fromLabel: '印度那伽龙王与金翅大鹏迦楼罗',
    toLabel: '中华四海龙王与金翅大鹏传说',
    headline: '丝路佛经汉译将印度那伽（Nāga）译作“龙”，催生水下水晶龙宫体系',
    historicalChannel: '长安、敦煌译经院将梵文天龙八部经典与先秦应龙行雨传统深度融汇',
    whatWasInspired: [
      { sourceElement: '地底帕塔拉宝石宫殿那伽诸王（婆苏吉、娑竭罗）', inspiredOutcome: '统御江海、坐拥海底水晶宫的四海龙王信仰' },
      { sourceElement: '专食毒龙的金翅神鹰迦楼罗', inspiredOutcome: '唐宋变文与《西游记》中神通广大的金翅大鹏雕' },
    ],
    scholarlySummary:
      '鸠摩罗什等高僧以华夏至高瑞兽“龙”对译梵语“那伽”，令印度护法蛇王的珠宫贝阙与中国呼风唤雨的应龙浑然一体。',
  },
  'insp-china-japan': {
    eraLabel: '约公元700 – 1776年',
    fromLabel: '《山海经》九尾狐、麒麟与天狗汉籍',
    toLabel: '日本玉藻前、麒麟与鞍马山大天狗',
    headline: '《山海经》神兽东渡日本，蜕变为平安宫廷妖狐、修验天狗与百鬼夜行',
    historicalChannel: '遣唐使典籍输入、密教迦楼罗图像、阴阳道祭仪与江户木版画刊刻',
    whatWasInspired: [
      { sourceElement: '《山海经》青丘九尾狐与商周狐妖叙事', inspiredOutcome: '横跨三国倾覆鸟羽宫廷的玉藻前与那须野杀生石物语' },
      { sourceElement: '汉籍流星“天狗” + 密教有翼迦楼罗王', inspiredOutcome: '红颜高鼻或鸦喙双翼、夜授源义经剑术的鞍马山大天狗' },
    ],
    scholarlySummary:
      '日本列岛吸纳大陆博物图谱，将其锤炼为兼具神道神社护佑（稻荷白狐）与武家物哀张力的独特妖怪美学。',
  },
  'insp-mesoamerica-continuum': {
    eraLabel: '约公元前1000 – 公元1521年',
    fromLabel: '奥尔梅克与古典玛雅大地鳄怪艺术',
    toLabel: '阿兹特克希帕克特利、齐齐米梅与尾手水怪',
    headline: '三千年奥尔梅克—玛雅凯门鳄创世传统汇聚为阿兹特克第五太阳纪异兽志',
    historicalChannel: '中美洲260天神圣历法折叠古卷、石碑浮雕与高原—低地贸易网',
    whatWasInspired: [
      { sourceElement: '奥尔梅克巨鳄洞口浮雕与玛雅大地鳄伊察姆·卡布·艾因', inspiredOutcome: '阿兹特克十八关节利口希帕克特利创世神话及历法首日符徽' },
      { sourceElement: '古典玛雅日食天带星辰恶魔图像', inspiredOutcome: '五十二年新火庆典午夜严阵防范的星辰骸骨女神齐齐米梅' },
    ],
    scholarlySummary:
      '整个中美洲文明圈都将神圣历法的第一天（Cipactli / Imix）锚定于原初大地鳄怪之躯，确立独特的献祭生态观。',
  },
  'insp-yoruba-atlantic': {
    eraLabel: '约公元1500年 – 当今',
    fromLabel: '西非约鲁巴与丰族彩虹蟒、圣豹与盖莱德',
    toLabel: '跨大西洋Oxumarê彩虹神蟒与当代非遗',
    headline: '箍世彩虹巨蟒奥舒马雷与礼赞夜鸟圣母的盖莱德艺术跨越重洋生生不息',
    historicalChannel: '尼日利亚、贝宁本土传承及巴西Candomblé、古巴Lucumí跨洋口传圣礼',
    whatWasInspired: [
      { sourceElement: '约鲁巴奥舒马雷与达荷美丹·阿伊多-韦多白蟒', inspiredOutcome: '巴西Oxumarê与加勒比Damballah维系天海循环的彩虹巨蟒崇拜' },
      { sourceElement: '《奥萨梅吉》王冠神鸟与盖莱德假面舞', inspiredOutcome: '荣膺联合国人类非遗、彰显女性长老尊严的跨洋活态艺术' },
    ],
    scholarlySummary:
      '在跨大西洋文化长河中保存了一脉活态智慧：不以暴戾屠戮异灵，而以礼敬、音乐与伦理维系宇宙均衡。',
  },
};

export const BESTIARY_TIMELINE_ZH: InspirationEvent[] = BESTIARY_TIMELINE_EN.map((ev) =>
  TIMELINE_ZH_OV[ev.id] ? { ...ev, ...TIMELINE_ZH_OV[ev.id] } : ev
);

const CURATED_BESTIARY_PAIRS: PairwiseSimilarity[] = [
  {
    pair: ['greek', 'mesopotamian'],
    similarityScore: 91,
    kind: 'direct-inspiration',
    badgeLabel: 'Direct Near Eastern Prototype',
    sharedMotherOrVector: 'Phoenician-Syrian Seal & Mt. Kasios Conduit',
    keySimilarities: [
      'Tiamat’s eleven chimeric monsters directly anticipate Hesiod’s chthonic brood of Echidna and Typhon',
      'Sumerian cylinder seals show seven-headed serpents torched with fire centuries before Heracles’ Hydra',
      'Zeus battling volcanic Typhon at Mt. Kasios echoes Hurrian-Babylonian storm-dragon combat',
    ],
    keyDifference: 'Marduk builds the physical sky and rivers out of Tiamat’s corpse, whereas Zeus imprisons Typhon alive beneath Mt. Etna.',
    compareDeityIds: ['mon-typhon', 'mon-tiamat', 'mon-hydra', 'mon-lamassu'],
  },
  {
    pair: ['greek', 'egyptian'],
    similarityScore: 84,
    kind: 'syncretic-exchange',
    badgeLabel: 'Iconographic Inversion',
    sharedMotherOrVector: 'Aegean–Nile Maritime Trade & Mythography',
    keySimilarities: [
      'Both traditions feature monumental human-headed lion Sphinxes guarding sacred thresholds',
      'Cerberus and Ammit both police the subterranean realm of the dead alongside divine judges',
      'Greeks explicitly linked Typhon’s storm-assault with Egyptian Seth/Apophis',
    ],
    keyDifference: 'Egypt’s Sphinx is a benevolent solar king guardian, whereas Greece’s Theban Sphinx became a winged, riddle-strangling predator.',
    compareDeityIds: ['mon-sphinx', 'mon-cerberus', 'mon-ammit', 'mon-apophis'],
  },
  {
    pair: ['hindu', 'chinese'],
    similarityScore: 88,
    kind: 'syncretic-exchange',
    badgeLabel: 'Silk Road Nāga–Long Fusion',
    sharedMotherOrVector: 'Buddhist Sutra Translation & Monsoon Dragon Lore',
    keySimilarities: [
      'Both revere dragons/Nagas (Yinglong, Vasuki, Shesha) as rain-givers and cosmic stabilizers rather than western fiends',
      'Garuda and Qilin embody supreme ethical self-restraint paired with celestial majesty',
    ],
    keyDifference: 'Vedic Indra slays drought-serpent Vritra, whereas Yu the Great partners cooperatively with winged Yinglong to channel floods.',
    compareDeityIds: ['mon-vasuki', 'mon-yinglong', 'mon-garuda', 'mon-qilin'],
  },
  {
    pair: ['chinese', 'japanese'],
    similarityScore: 93,
    kind: 'direct-inspiration',
    badgeLabel: 'Shan Hai Jing → Yōkai Lineage',
    sharedMotherOrVector: 'Tang-Song Texts & Edo Woodblock Bestiaries',
    keySimilarities: [
      'Shan Hai Jing’s nine-tailed fox directly inspired Japan’s Tamamo-no-Mae and Kitsune folklore',
      'Chinese Qilin and Tiangou evolved into Japanese Kirin and winged Shugendō Daitengu',
      'Multi-headed flood serpents (Xiangliu and Yamata-no-Orochi) both threaten river basins',
    ],
    keyDifference: 'Japanese lore emphasizes fluid kami/yōkai duality—honoring white Kitsune at Inari shrines and Tengu as samurai swordmasters.',
    compareDeityIds: ['mon-qilin', 'mon-taotie', 'mon-kitsune', 'mon-tengu'],
  },
  {
    pair: ['norse', 'hindu'],
    similarityScore: 83,
    kind: 'shared-root',
    badgeLabel: 'PIE Dragon & Eagle Axis',
    sharedMotherOrVector: 'Proto-Indo-European Steppe Poetics',
    keySimilarities: [
      'Thor vs. Jörmungandr and Indra vs. Vritra preserve the ancient PIE storm-god vs. serpent duel',
      'Yggdrasil’s eagle vs. root-dragon Níðhöggr mirrors solar Garuda vs. subterranean Nagas',
    ],
    keyDifference: 'Indra triumphs cleanly to renew cosmic rivers, while Thor and Jörmungandr slay each other at Ragnarök.',
    compareDeityIds: ['mon-jormungandr', 'mon-vritra', 'mon-nidhoggr', 'mon-garuda'],
  },
  {
    pair: ['greek', 'celtic'],
    similarityScore: 82,
    kind: 'shared-root',
    badgeLabel: 'PIE Blight-Eye Sibling',
    sharedMotherOrVector: 'Western Indo-European Heroic Cycle',
    keySimilarities: [
      'Balor locked daughter Ethniu in a tower over a grandson-prophecy, matching Acrisius/Danaë/Perseus and Medusa’s lethal gaze',
      'Both pair heroic monster-slaying with haunting female threshold figures',
    ],
    keyDifference: 'Celtic lore centers on island sea-tyrants and sympathetic ancestral Bean Sídhe rather than a single Echidna brood.',
    compareDeityIds: ['mon-typhon', 'mon-balor', 'mon-cerberus', 'mon-banshee'],
  },
  {
    pair: ['mesopotamian', 'mesoamerican'],
    similarityScore: 76,
    kind: 'independent-parallel',
    badgeLabel: 'Uncanny World-Body Parallel',
    sharedMotherOrVector: 'Independent Convergence Across Oceans',
    keySimilarities: [
      'Both Tiamat and eighteen-mouthed Cipactli are primordial water-reptiles torn in half by gods to fashion sky and earth',
      'Both civilizations carved colossal stone monster reliefs at the heart of imperial temple precincts',
    ],
    keyDifference: 'Tiamat is slain permanently, whereas Cipactli remains alive underfoot, weeping nightly for sacrificial reciprocity.',
    compareDeityIds: ['mon-tiamat', 'mon-cipactli', 'mon-humbaba', 'mon-tzitzimitl'],
  },
  {
    pair: ['yoruba', 'hindu'],
    similarityScore: 79,
    kind: 'independent-parallel',
    badgeLabel: 'Sacred World-Serpent Affinity',
    sharedMotherOrVector: 'Convergent Cosmic Serpent Theology',
    keySimilarities: [
      'Yoruba rainbow python Oshumare and Hindu thousand-headed Shesha both hold the Earth steady from beneath',
      'Both integrate fierce non-human powers into cosmic harmony through ritual offering rather than extermination',
    ],
    keyDifference: 'Yoruba tradition pairs Oshumare with royal leopard sovereignty (Ekun) and Gẹ̀lẹ̀dẹ́ covenants with night-mothers.',
    compareDeityIds: ['mon-oshumare', 'mon-vasuki', 'mon-ekun', 'mon-garuda'],
  },
  {
    pair: ['celtic', 'mesoamerican'],
    similarityScore: 74,
    kind: 'independent-parallel',
    badgeLabel: 'Parallel Waterside Lures',
    sharedMotherOrVector: 'Convergent Liminal Lake Folklore',
    keySimilarities: [
      'Scottish Kelpie and Aztec Ahuizotl both haunt dark lakes/streams, using deceptive allure or cries to drag victims underwater',
      'Both pair solar/seasonal vulnerability with formidable female supernatural hosts (Bean Sídhe / Tzitzimimeh)',
    ],
    keyDifference: 'Victims of the Ahuizotl are honored as chosen guests of Rain-God Tlaloc’s paradise rather than mourned as lost.',
    compareDeityIds: ['mon-kelpie', 'mon-ahuizotl', 'mon-balor', 'mon-tzitzimitl'],
  },
];

const FIRST_MONSTER_BY_TRAD: Record<TraditionId, [string, string]> = {
  greek: ['mon-typhon', 'mon-hydra'],
  norse: ['mon-fenrir', 'mon-jormungandr'],
  egyptian: ['mon-apophis', 'mon-sphinx'],
  hindu: ['mon-vritra', 'mon-garuda'],
  chinese: ['mon-yinglong', 'mon-qilin'],
  japanese: ['mon-orochi', 'mon-kitsune'],
  mesopotamian: ['mon-tiamat', 'mon-lamassu'],
  celtic: ['mon-balor', 'mon-kelpie'],
  mesoamerican: ['mon-cipactli', 'mon-ahuizotl'],
  yoruba: ['mon-oshumare', 'mon-ekun'],
};

const PIE_SET = new Set<TraditionId>(['greek', 'norse', 'hindu', 'celtic']);

export function getBestiaryPairwiseConnectionEn(a: TraditionId, b: TraditionId): PairwiseSimilarity {
  if (a === b) {
    const [m1, m2] = FIRST_MONSTER_BY_TRAD[a];
    return {
      pair: [a, b],
      similarityScore: 100,
      kind: 'shared-root',
      badgeLabel: 'Same Bestiary Tradition',
      sharedMotherOrVector: 'Internal Mythic Ecology',
      keySimilarities: [
        'Shares unified cosmological habitats, primary bestiary scrolls, and ritual safeguards',
        'Balances chaotic or liminal beasts against sacred royal or cosmic guardians within one tradition',
      ],
      keyDifference: 'Select two distinct traditions on the matrix to inspect cross-cultural monster transmission.',
      compareDeityIds: [m1, m2],
    };
  }
  const found = CURATED_BESTIARY_PAIRS.find(
    (item) => (item.pair[0] === a && item.pair[1] === b) || (item.pair[0] === b && item.pair[1] === a)
  );
  if (found) return { ...found, pair: [a, b] };

  const compareDeityIds = [...FIRST_MONSTER_BY_TRAD[a], ...FIRST_MONSTER_BY_TRAD[b]];
  if (PIE_SET.has(a) && PIE_SET.has(b)) {
    return {
      pair: [a, b],
      similarityScore: 80,
      kind: 'shared-root',
      badgeLabel: 'PIE Steppe Cousins',
      sharedMotherOrVector: 'Proto-Indo-European *éghan áhim Dragon Lineage',
      keySimilarities: [
        'Both inherited Bronze Age steppe dragon-combat formulas and underworld boundary guardians',
        'Heroic or divine champions confront water/storm monsters to defend cosmic order',
      ],
      keyDifference: 'Adapted to distinct local landscapes—from Mediterranean volcanoes and Highland skerries to sub-arctic seas.',
      compareDeityIds,
    };
  }

  const independent = a === 'mesoamerican' || b === 'mesoamerican' || a === 'yoruba' || b === 'yoruba';
  if (independent) {
    return {
      pair: [a, b],
      similarityScore: 68,
      kind: 'independent-parallel',
      badgeLabel: 'Archetypal Convergence',
      sharedMotherOrVector: 'Independent Ecological & Symbolic Imagination',
      keySimilarities: [
        'Both traditions encode natural perils—floods, eclipses, night forests, and mortality—into vivid hybrid anatomy',
        'Both pair awe-inspiring predators with ethical rules governing human restraint and sacrifice',
      ],
      keyDifference: 'Evolved across separate continents with contrasting views on whether cosmic serpents are slain or revered.',
      compareDeityIds,
    };
  }

  return {
    pair: [a, b],
    similarityScore: 73,
    kind: 'syncretic-exchange',
    badgeLabel: 'Eurasian Corridor',
    sharedMotherOrVector: 'Trans-Eurasian Silk Road & Maritime Trade',
    keySimilarities: [
      'Connected indirectly across ancient Afro-Eurasian trade routes carrying winged chimeras and dragon motifs',
      'Contrasts chaotic wilderness beasts against sacred palace and temple guardians',
    ],
    keyDifference: 'Diverges between western hero-slaying quests and eastern/southern cosmic integration of dragons.',
    compareDeityIds,
  };
}

const PAIR_ZH_OV: Record<
  string,
  Pick<PairwiseSimilarity, 'badgeLabel' | 'sharedMotherOrVector' | 'keySimilarities' | 'keyDifference'>
> = {
  'greek:mesopotamian': {
    badgeLabel: '近东直接原型传承',
    sharedMotherOrVector: '腓尼基—叙利亚印章与卡西奥斯山圣所走廊',
    keySimilarities: [
      '提阿玛特诞育的十一类毒兽军团直接开启赫西俄德《神谱》厄喀德那与提丰万妖家族',
      '苏美尔滚筒印章比希腊早逾千年已刻画持火炬灼斩七首水蛇图像',
      '宙斯在卡西奥斯山决战百首提丰直接承袭胡里特—巴比伦风暴屠龙神话',
    ],
    keyDifference: '马尔杜克劈开提阿玛特尸身铸造天地两河，而宙斯将不死的提丰活压于埃特纳火山地底。',
  },
  'greek:egyptian': {
    badgeLabel: '神圣图像跨海反转',
    sharedMotherOrVector: '爱琴海—尼罗河海贸与希腊化神话互鉴',
    keySimilarities: [
      '两大文明皆拥有著名的人面狮身斯芬克斯与镇守冥界的威严异兽（三头犬与噬心兽阿米特）',
      '古希腊作家明确将提丰之乱与埃及赛特/阿波菲斯神话相互比附',
    ],
    keyDifference: '埃及斯芬克斯是仁慈庄严的太阳法老守护兽，传入希腊后反转为底比斯带翼食人谜语女妖。',
  },
  'hindu:chinese': {
    badgeLabel: '丝路“那伽—神龙”合流',
    sharedMotherOrVector: '佛经汉译与亚洲季风护法龙王体系',
    keySimilarities: [
      '中印皆尊奉神龙/那伽（应龙、婆苏吉、舍沙）为司雨护世的宇宙支柱而非西方恶魔',
      '迦楼罗与麒麟皆体现“神威盖世却克己守仁”的东方神兽最高境界',
    ],
    keyDifference: '吠陀因陀罗以金刚杵劈杀旱龙弗栗多释水，而大禹则与有翼应龙结盟画地疏导洪流。',
  },
  'chinese:japanese': {
    badgeLabel: '《山海经》→ 百鬼夜行源流',
    sharedMotherOrVector: '遣唐使汉籍输入与江户木刻妖怪图鉴',
    keySimilarities: [
      '《山海经》青丘九尾狐东传演化为日本稻荷白狐与倾国妖狐玉藻前传说',
      '华夏瑞兽麒麟与流星天狗分别演变为日本麒麟与鞍马山修验道大天狗',
      '九首蛇相柳与八首八岐大蛇共同折射东亚古代治水记忆',
    ],
    keyDifference: '日本传统格外凸显“神妖一体转换”——善狐供奉于稻荷神社，大天狗化作传授名将剑法的山神。',
  },
  'norse:hindu': {
    badgeLabel: '印欧鹰蛇宇宙轴同源',
    sharedMotherOrVector: '原始印欧草原古诗母本',
    keySimilarities: [
      '索尔战耶梦加得与因陀罗斩弗栗多同源继承印欧风暴雷神屠蛇公式',
      '世界树顶神鹰对峙树根黑龙尼德霍格，与金翅大鹏迦楼罗对峙那伽结构高度一致',
    ],
    keyDifference: '因陀罗凯旋重开七河生机，而索尔与耶梦加得在诸神黄昏同归于尽。',
  },
  'greek:celtic': {
    badgeLabel: '印欧魔眼预言同源双生',
    sharedMotherOrVector: '西印欧英雄屠怪叙事链',
    keySimilarities: [
      '巴罗尔因外孙弑祖预言将女儿锁入高塔并具石化毁灭魔眼，与珀尔修斯/阿克里西俄斯/美杜莎如出一辙',
      '皆将岛屿海疆巨怪与幽冥预兆女灵交织进英雄史诗',
    ],
    keyDifference: '凯尔特报丧女妖是悲悯守望古老家族的仙丘女灵，而非嗜血食人恶妖。',
  },
  'mesopotamian:mesoamerican': {
    badgeLabel: '跨洋独立“裂兽创世”奇观',
    sharedMotherOrVector: '东西半球独立演化出的创世同构',
    keySimilarities: [
      '巴比伦提阿玛特与阿兹特克十八口鳄怪希帕克特利皆为被神明撕成两半化作苍穹与大地的原初水怪',
      '两大帝国都在首都核心神庙镌刻巨型怪兽石雕以震慑四方',
    ],
    keyDifference: '提阿玛特死后化作静止山河，而希帕克特利在人类脚下依然活着啼哭索要心血回馈。',
  },
  'yoruba:hindu': {
    badgeLabel: '承托地球的神圣巨蛇共鸣',
    sharedMotherOrVector: '跨大陆神圣巨蟒宇宙观共鸣',
    keySimilarities: [
      '约鲁巴彩虹巨蟒奥舒马雷与印度千首那伽舍沙同样在深渊底部盘托稳固地球',
      '两大活态传统皆主张以献祭与正法调和磅礴异灵，而非赶尽杀绝',
    ],
    keyDifference: '约鲁巴传统同时以皇家圣豹埃昆诠释君王涵养，并以盖莱德假面礼敬夜鸟圣母。',
  },
  'celtic:mesoamerican': {
    badgeLabel: '寒潭与大湖诱捕水怪平行',
    sharedMotherOrVector: '跨洋湖泊险境民俗趋同',
    keySimilarities: [
      '苏格兰水马凯尔皮与特斯科科湖尾手兽阿维索特尔皆潜伏水畔，以俊美伪装或婴啼将旅人拖入水底',
      '皆拥有震撼人心的女性超自然群体（报丧女妖与星辰女魔齐齐米梅）',
    ],
    keyDifference: '被阿维索特尔溺毙者在阿兹特克信仰中被尊为升入雨神常春乐园的幸运儿。',
  },
};

export function getBestiaryPairwiseConnectionZh(a: TraditionId, b: TraditionId): PairwiseSimilarity {
  const base = getBestiaryPairwiseConnectionEn(a, b);
  if (a === b) {
    return {
      ...base,
      badgeLabel: '同一异兽传统',
      sharedMotherOrVector: '本源神话生态体系',
      keySimilarities: [
        '共享统一的宇宙栖息地、核心异兽典籍与仪式护法传统',
        '在同一传统内部实现混沌凶兽与护法瑞兽的哲学平衡',
      ],
      keyDifference: '请在矩阵中点击两个不同传统以检视跨文化怪兽演变与同源关系。',
    };
  }
  const ov = PAIR_ZH_OV[`${a}:${b}`] ?? PAIR_ZH_OV[`${b}:${a}`];
  if (ov) return { ...base, ...ov };

  if (base.kind === 'shared-root') {
    return {
      ...base,
      badgeLabel: '印欧屠龙同源近亲',
      sharedMotherOrVector: '原始印欧“*éghan áhim”屠龙谱系',
      keySimilarities: [
        '共同继承青铜时代草原雷神斩蛇古诗公式与冥府守门兽母题',
        '英雄或主神通过迎战风暴/水域巨兽确立宇宙秩序',
      ],
      keyDifference: '随迁徙融入地中海火山、大西洋孤岛与极北冰海等不同地貌。',
    };
  }
  if (base.kind === 'independent-parallel') {
    return {
      ...base,
      badgeLabel: '跨大陆独立原型共鸣',
      sharedMotherOrVector: '人类面对自然伟力的独立象征创造',
      keySimilarities: [
        '不约而同将洪水、日食、暗夜密林与死亡边界编码为震撼的合成异兽形象',
        '皆借神兽与凶兽确立人类戒贪守礼的生态边界',
      ],
      keyDifference: '在互不往来的大陆各自独立演化，对“屠龙对抗”与“尊蛇护世”给出了截然不同的解答。',
    };
  }
  return {
    ...base,
    badgeLabel: '欧亚丝路海贸互鉴',
    sharedMotherOrVector: '古欧亚大陆丝路与海洋贸易网',
    keySimilarities: [
      '借由古代印章、丝绸与经典翻译间接共享带翼奇美拉与神龙图像元素',
      '均在荒野凶兽与王城护法圣兽之间构建空间秩序',
    ],
    keyDifference: '西方偏重英雄斩妖除魔，东方与南亚偏重神龙护法与宇宙调和。',
  };
}
