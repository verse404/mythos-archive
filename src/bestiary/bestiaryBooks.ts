import type { CanonicalBook } from '../types/mythology';

export const BESTIARY_BOOKS_EN: CanonicalBook[] = [
  {
    id: 'bst-shan-hai-jing',
    title: 'Shan Hai Jing (Classic of Mountains and Seas)',
    nativeTitle: '山海經',
    traditionId: 'chinese',
    dateComposed: 'c. 4th – 1st century BCE',
    medium: 'Bamboo & Woodblock',
    authorOrCompiler: 'Warring States–Han Cosmographers (ed. Liu Xiang & Guo Pu)',
    platePath: '/plates/bestiary/books/bst-shan-hai-jing.webp',
    tagline: 'Humanity’s oldest systematic illustrated geography of strange beasts, dragons, and spirits.',
    synopsis:
      'Spanning eighteen chapters of cardinal mountain ranges, outer seas, and great wildernesses, the Shan Hai Jing catalogs over four hundred hybrid creatures—noting each beast’s anatomy, cry, habitat, and whether its appearance portends flood, drought, war, or auspicious peace.',
    famousPassage:
      '“On Mount Gouwu... there is a beast with a羊-body and human face, eyes beneath its armpits, tiger teeth and human claws; its cry is like an infant, its name is Paoxiao [Taotie], and it devours people.”',
    famousPassageCitation: 'Shan Hai Jing, Beishan Jing (Classic of the Northern Mountains)',
    keyMythsIncluded: [
      'Winged dragon Yinglong gathering waters against Chiyou and carving rivers for Yu',
      'Mount Qingqiu’s nine-tailed fox and Mount Gouwu’s voracious Taotie',
      'Yu the Great slaying nine-headed serpent Xiangliu and raising sacred terraces',
    ],
    recommendedTranslation: 'Richard E. Strassberg, A Chinese Bestiary: Strange Creatures from the Guideways Through Mountains and Seas (Univ. of California Press)',
    linkedDeityIds: ['mon-yinglong', 'mon-qilin', 'mon-taotie'],
    linkedMotifId: 'sea-leviathan',
  },
  {
    id: 'bst-theogony-monsters',
    title: 'Hesiod’s Theogony (The Echidna & Typhon Catalog)',
    nativeTitle: 'Θεογονία (270–336, 820–880)',
    traditionId: 'greek',
    dateComposed: 'c. 700 BCE',
    medium: 'Vellum Codex',
    authorOrCompiler: 'Hesiod of Ascra',
    platePath: '/plates/bestiary/books/bst-theogony-monsters.webp',
    tagline: 'The foundational family tree of Echidna, Cerberus, the Hydra, Chimera, and hundred-headed Typhon.',
    synopsis:
      'Embedded within Hesiod’s cosmic hymn is the canonical genealogy of Greek monsters—tracing every multi-headed hound, marsh dragon, and riddle-beast to Phorcys, Keto, Echidna, and Zeus’s earth-shattering duel with volcanic Typhon.',
    famousPassage:
      '“From Typhon’s shoulders grew a hundred heads of a snake, a fearful dragon, with dark, flickering tongues, and from under the brows of his eyes in his marvelous heads flashed fire.”',
    famousPassageCitation: 'Hesiod, Theogony, lines 824–828',
    keyMythsIncluded: [
      'Subterranean union of Echidna and Typhon birthing Cerberus, Lernaean Hydra, and Chimera',
      'Hera nurturing the Hydra at Lerna to test Heracles',
      'Zeus’s thunderbolt victory pinning Typhon under volcanic Etna',
    ],
    recommendedTranslation: ' Glenn W. Most, Hesiod: Theogony, Works and Days, Testimonia (Loeb Classical Library)',
    linkedDeityIds: ['mon-typhon', 'mon-hydra', 'mon-cerberus'],
    linkedMotifId: 'multi-headed',
  },
  {
    id: 'bst-enuma-monsters',
    title: 'Enuma Elish & Gilgamesh Tablet V (Cuneiform Bestiary)',
    nativeTitle: 'Enūma Eliš & Ša naqba īmuru',
    traditionId: 'mesopotamian',
    dateComposed: 'c. 1800 – 1100 BCE',
    medium: 'Clay Tablets',
    authorOrCompiler: 'Babylonian & Assyrian Temple Scribes (Sin-liqe-unninni)',
    platePath: '/plates/bestiary/books/bst-enuma-monsters.webp',
    tagline: 'Tiamat’s eleven venomous monster species and Humbaba’s tragic defense of the Cedar Forest.',
    synopsis:
      'Excavated from Nineveh’s royal library, these tablets preserve the earliest monster army in world literature—horned Mušḫuššu dragons, scorpion-men, and mad lions—alongside Gilgamesh’s fateful encounter with forest-warden Humbaba.',
    famousPassage:
      '“Mother Hubur [Tiamat], who fashions all things, supplied irresistible weapons, giving birth to giant serpents, sharp of tooth and unsparing of fang; with venom instead of blood she filled their bodies.”',
    famousPassageCitation: 'Enuma Elish, Tablet I, lines 133–136',
    keyMythsIncluded: [
      'Tiamat spawning eleven chimeric species and crowning Qingu with the Tablet of Destinies',
      'Humbaba clothed in seven radiant terrors (melammu) pleading for the Cedar Forest',
      'Apotropaic consecration of palace gate guardians (Lamassu)',
    ],
    recommendedTranslation: 'Benjamin R. Foster, Before the Muses & Andrew George, The Epic of Gilgamesh (Penguin Classics)',
    linkedDeityIds: ['mon-tiamat', 'mon-humbaba', 'mon-lamassu'],
    linkedMotifId: 'sea-leviathan',
  },
  {
    id: 'bst-edda-monsters',
    title: 'Gylfaginning & Völuspá (The Ironwood Monster Dossier)',
    nativeTitle: 'Snorra Edda & Konungsbók',
    traditionId: 'norse',
    dateComposed: 'c. 950 – 1225 CE',
    medium: 'Vellum Codex',
    authorOrCompiler: 'Snorri Sturluson & Anonymous Icelandic Skalds',
    platePath: '/plates/bestiary/books/bst-edda-monsters.webp',
    tagline: 'Gleipnir’s impossible forging, Thor’s ox-head fishing line, and Níðhöggr’s dark wings.',
    synopsis:
      'Icelandic vellum codices preserve unforgettable portraits of Fenrir, Jörmungandr, and Níðhöggr—revealing how the gods’ own broken pledges turned bound beasts into the unstoppable catalysts of Ragnarök.',
    famousPassage:
      '“The wolf Fenrir shall advance with gaping mouth: his upper jaw reaches to heaven and his lower jaw to the earth; he would gape wider still if there were room.”',
    famousPassageCitation: 'Snorri Sturluson, Gylfaginning, Chapter 51',
    keyMythsIncluded: [
      'Týr placing his right hand inside Fenrir’s jaws to secure the silken fetter Gleipnir',
      'Thor hauling Jörmungandr from the ocean floor aboard Hymir’s boat',
      'Níðhöggr gnawing Yggdrasil’s root above Náströnd’s corpse-shore',
    ],
    recommendedTranslation: 'Anthony Faulkes, Edda (Everyman) & Carolyne Larrington, The Poetic Edda (Oxford World’s Classics)',
    linkedDeityIds: ['mon-fenrir', 'mon-jormungandr', 'mon-nidhoggr'],
    linkedMotifId: 'apocalypse-beasts',
  },
  {
    id: 'bst-apophis-dead',
    title: 'Book of Overthrowing Apophis & Spell 125 Papyrus',
    nativeTitle: 'Šꜥt nt sḫr ꜥꜣpp · Rw nw prt m hrw',
    traditionId: 'egyptian',
    dateComposed: 'c. 1550 – 300 BCE',
    medium: 'Papyrus & Tomb Stone',
    authorOrCompiler: 'Theban Priests of Amun-Ra (Bremner-Rhind & Ani Papyri)',
    platePath: '/plates/bestiary/books/bst-apophis-dead.webp',
    tagline: 'Execration spells against the midnight chaos-serpent and illuminated judgment before Ammit.',
    synopsis:
      'Combines temple ritual manuals instructing priests how to draw, spear, trample, and burn wax effigies of chaos-serpent Apophis with illuminated funerary papyri showing hybrid devourer Ammit beneath Anubis’s balance.',
    famousPassage:
      '“Fall upon your face, Apophis, enemy of Ra! Retreat, recede from his barque; the harpoon of Seth is fixed in your head and your coils are given to the flame!”',
    famousPassageCitation: 'Papyrus Bremner-Rhind (Book of Overthrowing Apophis, 23.6)',
    keyMythsIncluded: [
      'Midnight Duat battle where Seth spears Apophis at Mount Bakhu’s sandbank',
      'Ammit ("Devourer of the Dead") awaiting unjust hearts in the Hall of Two Truths',
      'Solar Sphinx guardianship recorded on the Giza Dream Stela',
    ],
    recommendedTranslation: 'Raymond O. Faulkner, The Ancient Egyptian Book of the Dead & Erik Hornung, The Ancient Egyptian Books of the Afterlife',
    linkedDeityIds: ['mon-apophis', 'mon-ammit', 'mon-sphinx'],
    linkedMotifId: 'hell-hounds',
  },
  {
    id: 'bst-astika-parva',
    title: 'Astika Parva & Rigveda 1.32 (Garuda, Nagas & Vritra)',
    nativeTitle: 'आस्तीकपर्व (महाभारत) · ऋग्वेद १.३२',
    traditionId: 'hindu',
    dateComposed: 'c. 1200 BCE – 200 CE',
    medium: 'Oral & Palm-Leaf',
    authorOrCompiler: 'Vedic Rishis & Vyasa Tradition',
    platePath: '/plates/bestiary/books/bst-astika-parva.webp',
    tagline: 'Indra’s slaying of drought-dragon Vritra and the cosmic saga of solar Garuda and the Naga kings.',
    synopsis:
      'Unites Rigveda’s foundational dragon-slaying hymn with Mahabharata’s opening Astika Parva—chronicling Garuda’s dazzling theft of Amrita, Vasuki’s churning of the Milk Ocean, and thousand-hooded Shesha balancing the Earth.',
    famousPassage:
      '“Now I shall proclaim the heroic deeds of Indra, which the wielder of the Vajra performed first: he slew the serpent [Ahi/Vritra], drilled open the waters, and split the bellies of the mountains!”',
    famousPassageCitation: 'Rigveda 1.32.1',
    keyMythsIncluded: [
      'Indra cleaving Vritra with foam-infused Vajra to free the Seven Rivers',
      'Garuda darting through whirling razor-spokes to ransom his mother with Amrita',
      'Vasuki serving as churning rope around Mount Mandara while Shesha upholds Earth',
    ],
    recommendedTranslation: 'J.A.B. van Buitenen, The Mahabharata, Vol. 1: Book of the Beginning (Univ. of Chicago Press)',
    linkedDeityIds: ['mon-vritra', 'mon-garuda', 'mon-vasuki'],
    linkedMotifId: 'sacred-chimeras',
  },
  {
    id: 'bst-kojiki-hyakki',
    title: 'Kojiki Izumo Cycle & Gazu Hyakki Yagyō (Yōkai Canon)',
    nativeTitle: '古事記 · 画図百鬼夜行',
    traditionId: 'japanese',
    dateComposed: '712 CE & 1776 CE',
    medium: 'Bamboo & Woodblock',
    authorOrCompiler: 'Ō no Yasumaro & Toriyama Sekien',
    platePath: '/plates/bestiary/books/bst-kojiki-hyakki.webp',
    tagline: 'From Izumo’s eight-forked sword-serpent to Edo woodblock codices of Kitsune and Tengu.',
    synopsis:
      'Pairs Japan’s oldest imperial myth of Susanoo slaying Yamata-no-Orochi with medieval Otogizōshi tales and Toriyama Sekien’s landmark illustrated Night Parade of One Hundred Demons, which crystallized Kitsune and Tengu iconography.',
    famousPassage:
      '“Its eyes are like red winter-cherries; it has one body with eight heads and eight tails. Moreover, on its body grows moss, and also chamaecyparis and cryptomeria trees, spanning eight valleys and eight hills.”',
    famousPassageCitation: 'Kojiki, Book I, Chapter 19',
    keyMythsIncluded: [
      'Susanoo’s eight-vat sake ambush of Yamata-no-Orochi and discovery of Kusanagi',
      'Court unmasking of nine-tailed Tamamo-no-Mae and Nasu’s volcanic Killing Stone',
      'Mount Kurama’s Daitengu Sōjōbō training young Yoshitsune beneath ancient cedars',
    ],
    recommendedTranslation: 'Gustav Heldt, The Kojiki & Hiroko Yoda / Matt Alt, Japandemonium Illustrated: The Yokai Encyclopedias of Toriyama Sekien',
    linkedDeityIds: ['mon-orochi', 'mon-kitsune', 'mon-tengu'],
    linkedMotifId: 'shapeshifters',
  },
  {
    id: 'bst-mag-tuired-folklore',
    title: 'Cath Maige Tuired & Gaelic Fairy-Loch Lore',
    nativeTitle: 'Cath Maige Tuired · Béaloideas',
    traditionId: 'celtic',
    dateComposed: 'c. 9th – 11th c. CE (Oral Archive to 19th c.)',
    medium: 'Vellum Codex',
    authorOrCompiler: 'Medieval Irish Monastic Scribes & Highland Seanchaithe',
    platePath: '/plates/bestiary/books/bst-mag-tuired-folklore.webp',
    tagline: 'Balor’s army-withering Evil Eye alongside centuries of Highland Kelpie and Bean Sídhe lore.',
    synopsis:
      'Preserves the dramatic Fomorian war-epic where Lugh shatters Balor’s poisonous eye on the battlefield, complemented by Irish and Scottish Gaelic oral archives documenting ancestral Bean Sídhe keening and loch Kelpies.',
    famousPassage:
      '“Balor had a destructive eye which was never opened save only on a battlefield. Four men used to lift up the lid of the eye by a polished ring-handle through its lid; a host of thousands could not resist that gaze.”',
    famousPassageCitation: 'Cath Maige Tuired, §133',
    keyMythsIncluded: [
      'Lugh’s sling-stone driving Balor’s open eye backward onto the Fomorian ranks',
      'Highland lairds seizing a Kelpie’s enchanted bridle with cold iron',
      'Fairy-woman Aoibheall singing lamentations before Clontarf',
    ],
    recommendedTranslation: 'Elizabeth A. Gray, Cath Maige Tuired: The Second Battle of Mag Tuired & Patricia Lysaght, The Banshee',
    linkedDeityIds: ['mon-balor', 'mon-kelpie', 'mon-banshee'],
    linkedMotifId: 'apocalypse-beasts',
  },
  {
    id: 'bst-florentine-cipactli',
    title: 'Florentine Codex Book XI & Histoyre du Mechique',
    nativeTitle: 'Historia general de las cosas de Nueva España',
    traditionId: 'mesoamerican',
    dateComposed: 'c. 1543 – 1577 CE (from Pre-Conquest Codices)',
    medium: 'Screenfold Codex',
    authorOrCompiler: 'Nahua Tlacuiloque & Elders with Bernardino de Sahagún',
    platePath: '/plates/bestiary/books/bst-florentine-cipactli.webp',
    tagline: 'Indigenous Nahuatl natural-supernatural dossier on Cipactli, the Ahuizotl, and eclipse Tzitzimimeh.',
    synopsis:
      'Written bilingually in Nahuatl and Spanish with indigenous painters, Book XI ("Earthly Things") and pre-Hispanic screenfolds preserve eyewitness Nahua accounts of Lake Texcoco’s tail-handed Ahuizotl, living earth-monster Cipactli, and star-daemons Tzitzimimeh.',
    famousPassage:
      '“The Ahuizotl is the size of a small dog; its pelt is smooth and gleaming black, its hands and feet like a monkey’s, and at the tip of its long tail grows a human hand wherewith it seizes whoever draws near the water’s edge.”',
    famousPassageCitation: 'Florentine Codex, Book XI, Chapter 4, Paragraph 2',
    keyMythsIncluded: [
      'Quetzalcoatl and Tezcatlipoca tearing eighteen-mouthed Cipactli into heaven and earth',
      'Ahuizotl weeping like a baby to draw souls into Tlaloc’s paradise',
      'Tzitzimimeh descending during solar eclipses if the 52-year New Fire fails',
    ],
    recommendedTranslation: 'Charles E. Dibble & Arthur J.O. Anderson, Florentine Codex, Book 11: Earthly Things (Univ. of Utah Press)',
    linkedDeityIds: ['mon-cipactli', 'mon-ahuizotl', 'mon-tzitzimitl'],
    linkedMotifId: 'shapeshifters',
  },
  {
    id: 'bst-ifa-gelede',
    title: 'Odù Ifá (Ọ̀sá Méjì) & Royal Gẹ̀lẹ̀dẹ́ Oríkì Canon',
    nativeTitle: 'Odù Ifá · Oríkì Ìyá Nlá & Ekun',
    traditionId: 'yoruba',
    dateComposed: 'Ancient Living Oral Canon',
    medium: 'Living Oral Canon',
    authorOrCompiler: 'Babalawo Diviners, Iyanifa & Gẹ̀lẹ̀dẹ́ Master Poets',
    platePath: '/plates/bestiary/books/bst-ifa-gelede.webp',
    tagline: 'Sacred verses of the rainbow python, the Oba’s royal leopard, and covenants with Night-Mothers.',
    synopsis:
      'Transmitted across centuries of memorized Ifá divination poetry and UNESCO-honored *Gẹ̀lẹ̀dẹ́* songs, this living canon reveals how Yoruba wisdom harmonizes cosmic serpents, forest predators, and veiled nocturnal powers through ẹbọ and respect.',
    famousPassage:
      '“Gentle is the stride of Ekun the leopard through the bush, yet woe betide the hunter who treads upon its tail; without honoring the Birds of the Mother atop the crown, no Oba commands the palace.”',
    famousPassageCitation: 'Traditional Yoruba Royal Oríkì & Odù Ọ̀sá Méjì Tradition',
    keyMythsIncluded: [
      'Oshumare binding Earth’s foundations and bridging deep sea with sky',
      'Ekun receiving sunlit spots of composed sovereignty through Ifá sacrifice',
      'Orunmila’s cotton-and-palm-oil covenant with the Eleye bird-mothers and warding of Ajogun',
    ],
    recommendedTranslation: 'Wande Abimbola, Ifá: An Exposition of Ifá Literary Corpus & Henry John Drewal / Margaret Thompson Drewal, Gẹ̀lẹ̀dẹ́: Art and Female Power among the Yoruba',
    linkedDeityIds: ['mon-oshumare', 'mon-ekun', 'mon-ajogun'],
    linkedMotifId: 'sacred-chimeras',
  },
];

const BOOK_ZH_OV: Record<
  string,
  Pick<
    CanonicalBook,
    | 'title'
    | 'dateComposed'
    | 'authorOrCompiler'
    | 'tagline'
    | 'synopsis'
    | 'famousPassage'
    | 'famousPassageCitation'
    | 'keyMythsIncluded'
    | 'recommendedTranslation'
  >
> = {
  'bst-shan-hai-jing': {
    title: '《山海经》（五藏山经·海外大荒异兽总志）',
    dateComposed: '战国至西汉（约公元前4–前1世纪）',
    authorOrCompiler: '先秦方士学者汇编 · 刘向校订 · 郭璞作注',
    tagline: '人类文明史上最古老宏大的山川神怪与奇禽异兽博物总集。',
    synopsis:
      '全书十八卷横跨五藏山经、海外经与大荒经，系统著录四百余种异兽神灵的形貌、鸣声、栖息地及吉凶征兆——从导洪有翼神龙应龙、青丘九尾瑞狐到钩吾山饕餮，奠定了整个东亚奇幻与怪兽美学的源头。',
    famousPassage: '“钩吾之山……有兽焉，其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮（饕餮），是食人。”',
    famousPassageCitation: '《山海经·北山经》',
    keyMythsIncluded: [
      '应龙冀州蓄水战蚩尤，并佐大禹画地导江',
      '青丘之山九尾灵狐与钩吾山贪食凶兽饕餮',
      '大禹诛杀九首蛇臣相柳并三掘毒土筑众帝之台',
    ],
    recommendedTranslation: '袁珂《山海经校注》（巴蜀书社 / 北京联合出版公司）',
  },
  'bst-theogony-monsters': {
    title: '赫西俄德《神谱》（万妖世系与提丰之战篇）',
    dateComposed: '约公元前700年',
    authorOrCompiler: '阿斯克拉的赫西俄德（Hesiod）',
    tagline: '确立厄喀德那、刻耳柏洛斯、九头蛇与百首提丰血脉的西方怪兽母本。',
    synopsis:
      '赫西俄德在创世史诗中专辟恢弘章节，将希腊英雄遭遇的冥犬、毒沼九头蛇、喷火奇美拉与斯芬克斯悉数归入半蛇女妖厄喀德那与百首风暴巨怪提丰的地底家族树。',
    famousPassage: '“从提丰双肩窜出百颗可怖的龙蛇头颅，幽黑分叉的信子吞吐不息，百颗奇异巨首的眉骨下迸射出熊熊烈火。”',
    famousPassageCitation: '赫西俄德《神谱》第824–828行',
    keyMythsIncluded: [
      '提丰与厄喀德那在地底洞窟繁衍三头犬、勒拿九头蛇与奇美拉',
      '天后赫拉饲育九头蛇以考验赫拉克勒斯',
      '宙斯以雷霆击溃提丰并将其镇压于埃特纳火山之下',
    ],
    recommendedTranslation: '吴雅凌译《神谱笺释》（华夏出版社）',
  },
  'bst-enuma-monsters': {
    title: '《埃努玛·埃利什》与《吉尔伽美什》泥板五（两河怪兽志）',
    dateComposed: '约公元前1800 – 前1100年',
    authorOrCompiler: '巴比伦与亚述神庙书吏（辛·利奇·乌宁尼编订）',
    tagline: '世界文学最古老的十一类合成毒兽大军与雪松林守护兽悲歌。',
    synopsis:
      '出土于尼尼微亚述巴尼拔皇家图书馆的楔形泥板，完整记录了咸水母龙提阿玛特凭空诞育怒蛇、狂狮、蝎人等十一支怪兽军团，以及吉尔伽美什斩杀雪松林守护神胡姆巴巴招致天谴的千古绝唱。',
    famousPassage: '“造化万物之母胡布尔（提阿玛特）铸造无敌凶兵，诞下利齿无情的大蛇，以致命剧毒取代鲜血灌满它们的身躯。”',
    famousPassageCitation: '《埃努玛·埃利什》第一块泥板第133–136行',
    keyMythsIncluded: [
      '提阿玛特孕育十一类奇美拉毒兽并以命运泥板加冕统帅',
      '身披七重恐怖灵光的胡姆巴巴泣血守护黎巴嫩雪松林',
      '王城大门拉玛苏五足带翼神牛的辟邪仪轨',
    ],
    recommendedTranslation: '拱玉书《埃努玛·埃利什》译注；赵乐甡译《吉尔伽美什》（译林出版社）',
  },
  'bst-edda-monsters': {
    title: '《散文埃达》与《女巫的预言》（北欧末日巨兽档案）',
    dateComposed: '约公元950 – 1225年',
    authorOrCompiler: '斯诺里·斯图鲁松与冰岛无名吟游诗人',
    tagline: '六种虚无锻造的缚狼魔带、牛首垂钓尘世巨蟒与尸海岸黑龙。',
    synopsis:
      '冰岛羊皮古卷以冷峻悲壮的笔触刻画了芬里尔、耶梦加得与尼德霍格三大末劫巨兽，深刻揭示众神为防备预言而立下的背信枷锁如何一步步引爆诸神黄昏。',
    famousPassage: '“魔狼芬里尔张开血盆巨口奔袭而来：它的上颚顶住苍穹，下颚擦过大地——若天地尚有余隙，它必张得更阔。”',
    famousPassageCitation: '斯诺里《散文埃达·欺骗古鲁菲》第51章',
    keyMythsIncluded: [
      '战神提尔将右手伸入狼口作保，助诸神以格莱普尼尔锁住芬里尔',
      '索尔乘希米尔小船以巨牛头从海底钓起耶梦加得',
      '黑龙尼德霍格在尸海岸啃噬世界树根并掠过劫后新世界天际',
    ],
    recommendedTranslation: '石琴娥、斯文译《埃达》（译林出版社）',
  },
  'bst-apophis-dead': {
    title: '《推翻阿波菲斯之书》与《亡灵书》第125章纸草卷',
    dateComposed: '约公元前1550 – 前300年',
    authorOrCompiler: '底比斯阿蒙—拉神庙祭司团',
    tagline: '每夜焚烧绿蜡蛇像的护日秘咒与双真理大厅天平下的噬心审判。',
    synopsis:
      '汇集古埃及神庙每日施行的“斩碎焚烧混沌巨蛇阿波菲斯蜡像”护航仪轨，以及新王国彩绘纸草卷中阿米特蹲守真理天平、准备吞噬罪人心脏的不朽图像。',
    famousPassage: '“扑倒受死吧，阿波菲斯，拉神的死敌！速从太阳圣船前退散——赛特的铜叉已钉穿你的头颅，你的蛇躯已投进烈焰！”',
    famousPassageCitation: '《布雷姆纳-莱因德纸草书·推翻阿波菲斯之书》23.6',
    keyMythsIncluded: [
      '午夜杜阿特巴库山浅滩赛特挥矛刺穿阿波菲斯腹腔',
      '鳄首狮身河马臀阿米特在羽毛天平下执行“第二次死亡”',
      '吉萨《梦碑》所载地平线斯芬克斯护佑王权神谕',
    ],
    recommendedTranslation: '蒲慕州《追寻一己之福：中国古代的信仰世界与古埃及对比》及《古埃及亡灵书》汉译本',
  },
  'bst-astika-parva': {
    title: '《摩诃婆罗多·阿斯蒂卡篇》与《梨俱吠陀》屠龙歌',
    dateComposed: '约公元前1200年 – 公元200年',
    authorOrCompiler: '吠陀诗仙与毗耶娑（广博仙人）史诗传统',
    tagline: '金刚杵劈裂旱龙弗栗多，以及金翅大鹏迦楼罗与那伽龙王的三界传奇。',
    synopsis:
      '贯通吠陀时代因陀罗斩龙释水的开篇赞歌与《摩诃婆罗多》卷首蛇祭史诗，展现金翅大鹏勇闯火轮夺甘露救母、婆苏吉献躯搅动乳海及千首舍沙稳托地球的恢弘画卷。',
    famousPassage: '“如今我要高歌因陀罗的英雄伟业——执金刚杵者首建奇功：他斩杀了巨蛇弗栗多，凿通甘泉，劈开了群山的胸膛！”',
    famousPassageCitation: '《梨俱吠陀》1.32.1',
    keyMythsIncluded: [
      '因陀罗以海沫雷杵击杀旱龙弗栗多释放七条圣河',
      '迦楼罗穿过飞转利刃轮夺取甘露赎母且滴酒不沾',
      '龙王婆苏吉化作搅乳海绳索，千首阿难陀舍沙承托大地',
    ],
    recommendedTranslation: '金克木、黄宝生等译《摩诃婆罗多·初篇》（中国社会科学出版社）；巫白慧《梨俱吠陀神曲选》',
  },
  'bst-kojiki-hyakki': {
    title: '《古事记》出云神话与《画图百鬼夜行》图谱',
    dateComposed: '公元712年与1776年',
    authorOrCompiler: '太安万侣编录 · 鸟山石燕绘纂',
    tagline: '从尾藏草薙神剑的八岐大蛇，到定型九尾狐与大天狗美学的妖怪百科。',
    synopsis:
      '将日本最古老神代史诗中须佐之男智斩八岐大蛇的篇章，与平安中世《玉藻前草子》及江户时代鸟山石燕集大成的木刻妖怪图鉴《画图百鬼夜行》相融合。',
    famousPassage: '“彼目如赤酸酱，一身有八头八尾，亦其身生萝及桧、榟，其长度谿八谷峡八尾，而见其腹，悉常血烂也。”',
    famousPassageCitation: '《古事记》上卷·八岐大蛇章',
    keyMythsIncluded: [
      '须佐之男设八槽八盐折酒醉斩大蛇并剖尾献天丛云剑',
      '阴阳师识破九尾妖狐玉藻前及那须野杀生石传说',
      '鞍马山大天狗僧正坊夜授牛若丸剑术并惩戒我慢僧人',
    ],
    recommendedTranslation: '周作人译《古事记》（中国对外翻译出版公司）；鸟山石燕《画图百鬼夜行全画集》',
  },
  'bst-mag-tuired-folklore': {
    title: '《摩伊图拉战役》与盖尔仙丘寒潭口传档案',
    dateComposed: '约9–11世纪古抄本（口传延续至19世纪）',
    authorOrCompiler: '中古爱尔兰修道院书吏与高地传统说书人（Seanchaithe）',
    tagline: '四人铁钩掀开的巴罗尔毁灭魔眼，以及百年流传的凯尔皮与报丧女妖秘闻。',
    synopsis:
      '收录达努神族光神鲁格在战场上击穿外祖父巴罗尔剧毒独眼的凯尔特史诗，辅以爱尔兰民俗委员会与苏格兰高地采录的报丧女妖挽歌与水马笼头故事。',
    famousPassage: '“巴罗尔生有一只毁灭魔眼，唯临战阵方才开启；须四名壮汉握住光滑环柄合力掀起眼睑，纵有千军万马亦难抵其一瞥。”',
    famousPassageCitation: '《摩伊图拉战役》（Cath Maige Tuired）第133节',
    keyMythsIncluded: [
      '鲁格飞石射穿巴罗尔魔眼，令毒光反灭弗摩大军二十七阵',
      '苏格兰领主以冷铁智夺寒潭水马凯尔皮的魔法笼头',
      '仙丘女灵奥伊贝尔在克朗塔夫大战前夜为布赖恩王泣唱挽歌',
    ],
    recommendedTranslation: '帕特里夏·莱萨特《报丧女妖研究》及爱尔兰神话故事汉译选集',
  },
  'bst-florentine-cipactli': {
    title: '《佛罗伦萨手抄本》卷十一与《墨西哥人历史》',
    dateComposed: '约1543 – 1577年（源出前哥伦布彩绘古卷）',
    authorOrCompiler: '纳瓦原住民画师长老与萨阿贡合编',
    tagline: '纳瓦语与彩绘插图原汁原味记录的大地鳄怪、尾手水怪与蚀日星魔档案。',
    synopsis:
      '由阿兹特克幸存智者以母语纳瓦特尔语口述并亲手绘制插图，第11卷《地上万物》详实描绘了特斯科科湖尾尖长人手的阿维索特尔，并与创世古卷中全身长嘴的希帕克特利及星魔齐齐米梅互证。',
    famousPassage: '“阿维索特尔体型如小犬，皮毛乌黑光滑如胶，四爪似猴；最奇者其长尾末端生有一只人手，凡临水岸者皆被此手拽入深渊。”',
    famousPassageCitation: '《佛罗伦萨手抄本》第十一卷第四章第二段',
    keyMythsIncluded: [
      '羽蛇神与烟镜神断足诱捕十八口大地鳄怪希帕克特利化生天地',
      '阿维索特尔学婴啼引人为雨神特拉洛克常春乐园选魂',
      '五十二年新火庆典午夜防范齐齐米梅星魔俯冲人间',
    ],
    recommendedTranslation: '萨阿贡《新西班牙事物通史（佛罗伦萨手抄本）》英汉选译',
  },
  'bst-ifa-gelede': {
    title: '《伊法圣典·奥萨梅吉》与皇家盖莱德赞歌集',
    dateComposed: '远古口传至当代活态圣典',
    authorOrCompiler: '约鲁巴伊法祭司（Babalawo）与盖莱德假面诗师',
    tagline: '传唱盘世彩虹巨蟒、奥巴神圣花豹与夜鸟圣母盟约的西非活态经典。',
    synopsis:
      '凝聚世代背诵的伊法占卜诗篇与联合国非遗“盖莱德”假面庆典圣歌，展现约鲁巴文明如何以温雅品格、献祭外交与雕塑艺术调和深海巨蟒、丛林猛豹与暗夜母系权柄。',
    famousPassage: '“花豹埃昆穿林步履轻柔温雅，然误踏其尾者祸不旋踵；若王冠之巅不奉圣母神鸟，纵系君王亦难号令宫廷。”',
    famousPassageCitation: '约鲁巴皇家赞美诗（Oríkì）与《奥萨梅吉》圣传',
    keyMythsIncluded: [
      '彩虹巨蟒奥舒马雷盘固大地根基、贯通深海与天界',
      '皇家花豹埃昆谦敬献祭获赐金斑，确立白布覆面献王律法',
      '奥伦米拉献白棉棕油同夜鸟圣母立盟，并以献祭化解八大灾厄阿乔贡',
    ],
    recommendedTranslation: '万德·阿比姆博拉《伊法文学文库阐释》及德鲁尔《盖莱德：约鲁巴艺术与女性力量》',
  },
};

export const BESTIARY_BOOKS_ZH: CanonicalBook[] = BESTIARY_BOOKS_EN.map((b) => {
  const ov = BOOK_ZH_OV[b.id];
  return ov ? { ...b, ...ov } : b;
});
