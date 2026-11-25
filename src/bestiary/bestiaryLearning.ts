import type { FlashcardItem, QuizQuestion, StudyTrack } from '../types/mythology';

export const BESTIARY_TRACKS_EN: StudyTrack[] = [
  {
    id: 'bst-track-dragons',
    folioCode: 'SEMINAR I · DRACONIC COSMOLOGY',
    title: 'Dragons of Chaos vs. Dragons of Order',
    subtitle: 'Why Western Heroes Slay Serpents While Asian & African Traditions Revere Them',
    difficulty: 'Foundational',
    estimatedMinutes: 25,
    lessons: [
      {
        id: 'bst-les-1',
        title: 'The Indo-European & Babylonian Chaoskampf Dragon',
        durationMinutes: 8,
        summary: 'Traces how Tiamat, Vritra, Typhon, and Jörmungandr cast the serpent as cosmic adversary.',
        coreReading:
          'In Enuma Elish and Indo-European poetry (*éghan áhim), creation or cosmic survival depends on a storm-champion shattering an enclosing dragon. Whether Marduk splits salt-sea Tiamat or Indra cleaves drought-coiling Vritra, the dragon personifies raw natural force blocking civic or seasonal life.',
        keyTakeaways: [
          'Tiamat’s eleven monster species form literature’s earliest organized bestiary',
          'Vritra ("The Encloser") hoards cosmic waters until liberated by Indra’s Vajra',
          'Norse Jörmungandr turns containment into tragic mutual doom at Ragnarök',
        ],
        linkedDeityIds: ['mon-tiamat', 'mon-vritra', 'mon-typhon', 'mon-jormungandr'],
        linkedMotifId: 'sea-leviathan',
      },
      {
        id: 'bst-les-2',
        title: 'Hydraulic Partners & World-Binding Serpents',
        durationMinutes: 9,
        summary: 'Examines Yinglong, Vasuki/Shesha, and Yoruba Oshumare as indispensable pillars of Earth.',
        coreReading:
          'Step outside Mediterranean dragon-slaying and the serpent’s meaning flips completely. In China, winged Yinglong carves river channels ahead of Yu the Great; in India, thousand-hooded Shesha balances Earth while Vasuki churns the Milk Ocean; in Yorubaland, rainbow python Oshumare binds the planet so it will not fracture.',
        keyTakeaways: [
          'Yu the Great succeeds by cooperating with Yinglong rather than slaying dragons',
          'Buddhist translators merged Indic Nāga kings with Chinese Long into Sea Dragon Kings',
          'Oshumare links deep ocean and sky vault in continuous life-giving circulation',
        ],
        linkedDeityIds: ['mon-yinglong', 'mon-vasuki', 'mon-oshumare'],
        linkedMotifId: 'sea-leviathan',
      },
      {
        id: 'bst-les-3',
        title: 'Living Earth-Bodies: Cipactli & Tiamat Compared',
        durationMinutes: 8,
        summary: 'Contrasts Babylon’s slain sea-mother against Mesoamerica’s living, eighteen-mouthed earth-caiman.',
        coreReading:
          'Both Babylonians and Aztecs walked upon the body of a cleft water-monster—yet whereas Tiamat is permanently dead architecture, Aztec Cipactli remains alive beneath every cornfield, snapping eighteen joint-mouths in nightly hunger unless repaid through sacred reciprocity.',
        keyTakeaways: [
          'Tezcatlipoca sacrificed his own foot as bait to draw Cipactli from primeval waters',
          'Cipactli’s hair, skin, and eyes became trees, meadows, and springs',
          'Explains why Mesoamerican cosmic ecology viewed agriculture as a sacred debt',
        ],
        linkedDeityIds: ['mon-cipactli', 'mon-tiamat'],
        linkedMotifId: 'multi-headed',
      },
    ],
  },
  {
    id: 'bst-track-chimeras',
    folioCode: 'SEMINAR II · HYBRID ANATOMY',
    title: 'Decoding Chimeric Anatomy & Royal Guardians',
    subtitle: 'Reading Multi-Species Bodies as Visual Philosophy',
    difficulty: 'Intermediate',
    estimatedMinutes: 28,
    lessons: [
      {
        id: 'bst-les-4',
        title: 'Palace Gate Colossi: Sphinx, Lamassu & Qilin',
        durationMinutes: 10,
        summary: 'Compares royal hybrid guardians from Giza and Nineveh to Qufu and Benin.',
        coreReading:
          'Ancient sculptors did not combine animal parts at random: Assyrian Lamassu unite human wisdom, bull strength, and eagle swiftness (carved with five legs so they stand firm frontally yet stride laterally). Contrast this monumental deterrence with China’s Qilin—whose horn is wrapped in soft flesh so sovereign power never harms the innocent—and Benin/Yoruba royal leopard Ekun.',
        keyTakeaways: [
          'Egyptian male royal Sphinxes inverted into female riddle-monsters upon reaching Greece',
          'Assyrian five-legged Lamassu guard thresholds by turning demonic malice back on itself',
          'Qilin and Ekun anchor kingship in composed moral restraint',
        ],
        linkedDeityIds: ['mon-sphinx', 'mon-lamassu', 'mon-qilin', 'mon-ekun'],
        linkedMotifId: 'sacred-chimeras',
      },
      {
        id: 'bst-les-5',
        title: 'Multi-Headed Tactics: Hydra, Orochi & Cerberus',
        durationMinutes: 9,
        summary: 'Why brute force fails against regenerating marsh-serpents and three-headed gatekeepers.',
        coreReading:
          'Multi-headedness signals a systemic crisis that multiplies when struck blindly. Heracles defeats the Lernaean Hydra only by pairing club with Iolaus’s cauterizing torch; Susanoo subdues eight-headed Yamata-no-Orochi with eight vats of refined sake; and Heracles brings Cerberus up bare-handed only to return Hades’ sentinel respectfully.',
        keyTakeaways: [
          'Tell Asmar Sumerian seals prefigure the Hydra by nearly 1,800 years',
          'Orochi’s blood-red belly and tail-born Kusanagi blade encode Izumo ironworking',
          'Cerberus enforces the ontological boundary between dead shades and living mortals',
        ],
        linkedDeityIds: ['mon-hydra', 'mon-orochi', 'mon-cerberus'],
        linkedMotifId: 'multi-headed',
      },
      {
        id: 'bst-les-6',
        title: 'Moral Executioners & Cautionary Masks: Ammit & Taotie',
        durationMinutes: 9,
        summary: 'How Egyptian papyri and Zhou bronzes turned devouring jaws into ethical mirrors.',
        coreReading:
          'Egypt’s Ammit fuses the Nile’s three deadliest animals (crocodile, lion, hippo) yet harms no righteous soul—devouring only hearts heavier than Ma’at’s feather. Similarly, China’s Shang bronze Taotie mask evolved in Warring States philosophy into a bodiless glutton that devours its own torso as an eternal warning against elite greed.',
        keyTakeaways: [
          'Ammit administers the "Second Death"—complete erasure from cosmic memory',
          'Taotie bridges sacred Shang shamanic communion and Zhou anti-avarice ethics',
        ],
        linkedDeityIds: ['mon-ammit', 'mon-taotie'],
        linkedMotifId: 'hell-hounds',
      },
    ],
  },
  {
    id: 'bst-track-liminal',
    folioCode: 'SEMINAR III · LIMINAL & END-TIME SPIRITS',
    title: 'Shapeshifters, Forest Wardens & Eclipse Terrors',
    subtitle: 'Ecological Trespass, Ambiguous Spirits & Cosmic Nightfall',
    difficulty: 'Comparative Seminar',
    estimatedMinutes: 30,
    lessons: [
      {
        id: 'bst-les-7',
        title: 'Ecological Hubris: Humbaba & Kurama’s Daitengu',
        durationMinutes: 10,
        summary: 'When the "monster" in the sacred cedar forest is nature’s legitimate guardian.',
        coreReading:
          'Newly recovered lines of Gilgamesh Tablet V underscore that Humbaba was no evil fiend, but Enlil’s appointed ranger of the Cedar Mountain; slaying him brings glory paired with grief and mortality. In medieval Japan, winged Daitengu similarly guard ancient cedar peaks—humbling arrogant clerics while mentoring humble warriors.',
        keyTakeaways: [
          'Humbaba’s seven radiant melammu auras belong to sacred divine majesty',
          'Daitengu expose spiritual vanity (gaman) while rewarding sincere discipline',
        ],
        linkedDeityIds: ['mon-humbaba', 'mon-tengu'],
        linkedMotifId: 'apocalypse-beasts',
      },
      {
        id: 'bst-les-8',
        title: 'Waterside Lures & Court Metamorphs: Kitsune, Kelpie & Ahuizotl',
        durationMinutes: 10,
        summary: 'Cross-cultural folklore of shapeshifting foxes, adhesive water-horses, and tail-handed lake beasts.',
        coreReading:
          'Across Japan, Scotland, and Aztec Mexico, liminal spirits test solitary travelers at dusk: nine-tailed Kitsune span Inari harvest blessings and Tamamo-no-Mae’s Killing Stone; Highland Kelpies fuse riders’ hands to their hide unless bridled with cold iron; and Lake Texcoco’s Ahuizotl claims souls for Rain-God Tlaloc’s paradise.',
        keyTakeaways: [
          'Kitsune exemplify dual spirit potential (benevolent Zenko vs. chaotic Yako)',
          'Ahuizotl deaths required special Tlalocan funerary honor rather than cremation',
        ],
        linkedDeityIds: ['mon-kitsune', 'mon-kelpie', 'mon-ahuizotl'],
        linkedMotifId: 'shapeshifters',
      },
      {
        id: 'bst-les-9',
        title: 'Revered Night-Women & Eclipse Beasts: Eleye, Bean Sídhe & Fenrir',
        durationMinutes: 10,
        summary: 'Moving beyond demonization—how traditions honor or confront awesome nocturnal and end-time powers.',
        coreReading:
          'Popular simplifications often misread complex figures: Ireland’s Bean Sídhe never kills, singing ancestral laments for Gaelic kin; Aztec skeletal Tzitzimimeh threaten the world during eclipses yet guard mothers in childbirth; and Yoruba Odù Ọ̀sá Méjì teaches that the veiled Eleye bird-mothers cannot be fought with weapons, only honored through Ifá diplomacy and Gẹ̀lẹ̀dẹ́ art—unlike Norse Æsir deceit, which turned Fenrir into Odin’s doom.',
        keyTakeaways: [
          'Every sacred Yoruba Oba’s beaded crown carries the Eleye bird at its apex',
          'Broken Æsir oaths (Týr’s lost hand) directly seal Asgard’s fate against Fenrir',
          'Solar eclipses unite Fenrir, Apophis, and Tzitzimimeh in global astronomical myth',
        ],
        linkedDeityIds: ['mon-ajogun', 'mon-banshee', 'mon-tzitzimitl', 'mon-fenrir'],
        linkedMotifId: 'apocalypse-beasts',
      },
    ],
  },
];

const TRACK_ZH_OV: Record<
  string,
  {
    folioCode: string;
    title: string;
    subtitle: string;
    lessons: Record<
      string,
      { title: string; summary: string; coreReading: string; keyTakeaways: string[] }
    >;
  }
> = {
  'bst-track-dragons': {
    folioCode: '研习卷一 · 宇宙龙蛇哲学',
    title: '混沌恶龙 vs. 护世真龙',
    subtitle: '为何西方史诗热衷屠龙，而东亚、南亚与西非传统尊龙护世？',
    lessons: {
      'bst-les-1': {
        title: '印欧与巴比伦“屠龙创世（Chaoskampf）”范式',
        summary: '追踪提阿玛特、弗栗多、提丰与耶梦加得如何将巨龙塑造成宇宙大敌。',
        coreReading:
          '在巴比伦《埃努玛·埃利什》与印欧古诗公式（*éghan áhim）中，宇宙开辟端赖风暴战神击碎盘锁大水的巨蛇：马尔杜克劈裂咸水母龙提阿玛特铸造苍穹，因陀罗劈开旱龙弗栗多释放七条圣河，巨龙在此象征阻碍季节循环与城邦秩序的狂暴自然力。',
        keyTakeaways: [
          '提阿玛特诞下的十一类毒兽构成世界文学最早的系统怪兽军团',
          '弗栗多（意为“围困者”）锁闭宇宙水源，直至被百节金刚杵劈开',
          '北欧耶梦加得将强行放逐推向雷神与巨蟒同归于尽的悲剧终局',
        ],
      },
      'bst-les-2': {
        title: '治水功臣与箍世巨蟒：应龙、那伽与奥舒马雷',
        summary: '剖析中华应龙、印度舍沙/婆苏吉与约鲁巴彩虹蟒如何化作天地栋梁。',
        coreReading:
          '走出地中海屠龙叙事，龙蛇的哲学意涵彻底反转：在中国，有翼应龙以尾画地助大禹疏导江河；在印度，千首那伽王舍沙稳托地球，婆苏吉献躯搅动乳海；在西非约鲁巴，七彩巨蟒奥舒马雷盘绕海底箍紧大地免其崩裂。',
        keyTakeaways: [
          '大禹治水成功的关键在于与神龙应龙协同导水而非斩杀对抗',
          '丝路佛经汉译令印度那伽龙王与华夏神龙融合为四海龙王体系',
          '奥舒马雷贯通深海与天穹，维系雨水与生命能量周流不息',
        ],
      },
      'bst-les-3': {
        title: '活体大地巨兽：希帕克特利与提阿玛特跨洋对读',
        summary: '对比巴比伦死后化生天地的母龙与阿兹特克十八口活体大地鳄母。',
        coreReading:
          '巴比伦人与阿兹特克人同样认为人类踏在被撕裂的水怪之躯上生活——但提阿玛特已彻底死去化为建筑材料，而希帕克特利在每一片玉米田下依然活着，十八处关节巨口每夜饥渴啼哭，唯有神圣献祭互惠方能安抚。',
        keyTakeaways: [
          '特斯卡特利波卡献出自身左足为饵将希帕克特利诱出原初暗水',
          '鳄怪的发肤眼鼻化作森林、草原、泉池与山洞',
          '揭示中美洲生态观将农耕丰收视为人类对活体大地的神圣还债',
        ],
      },
    },
  },
  'bst-track-chimeras': {
    folioCode: '研习卷二 · 合成神兽图像学',
    title: '解码奇美拉解剖学与王城护法瑞兽',
    subtitle: '将“多兽合体”读作古代政治伦理与宇宙视觉哲学',
    lessons: {
      'bst-les-4': {
        title: '帝都门槛圣兽：斯芬克斯、拉玛苏、麒麟与圣豹',
        summary: '横跨吉萨、尼尼微、曲阜与贝宁宫廷比较帝王护法神兽。',
        coreReading:
          '古人绝非随意拼凑动物肢体：亚述拉玛苏集结人冠智慧、公牛巨力与雄鹰双翼，并以精妙“五足透视”兼顾正面镇守与侧面行进；而中华麒麟虽具龙鳞鹿角却以柔肉裹角、履草不折；约鲁巴花豹埃昆则以静默涵养诠释王道威仪。',
        keyTakeaways: [
          '古埃及仁慈的男性法老斯芬克斯传入希腊后反转为底比斯带翼谜语女妖',
          '亚述三十吨五足拉玛苏镇守王门，将恶灵诅咒弹回荒漠',
          '麒麟与圣豹埃昆共同将最高王权锚定于“慎用武力、含仁怀义”',
        ],
      },
      'bst-les-5': {
        title: '多首怪兽破局策：许德拉、八岐大蛇与刻耳柏洛斯',
        summary: '为何匹夫蛮力在再生毒蛇与冥府守门犬面前注定失效？',
        coreReading:
          '多首解剖结构象征越锤打越扩散的系统性灾祸：赫拉克勒斯唯有配合伊俄拉俄斯的火炬烙印方能阻止许德拉断首再生；须佐之男设八槽烈酒方能智取八岐大蛇并剖出草薙剑；面对冥犬刻耳柏洛斯，英雄更须徒手生擒后恭敬归还冥府。',
        keyTakeaways: [
          '苏美尔阿斯马尔七首蛇印章比希腊九头蛇神话早近一千八百年',
          '八岐大蛇赤血溃腹与尾出宝剑凝聚出云斐伊川水患与砂铁冶炼史',
          '刻耳柏洛斯守护的是生与死不可混淆的宇宙铁律',
        ],
      },
      'bst-les-6': {
        title: '道德行刑兽与青铜警世钟：阿米特与饕餮',
        summary: '古埃及纸草与商周鼎彝如何将吞噬巨口升华为良知镜鉴。',
        coreReading:
          '埃及噬心兽阿米特融合尼罗河三大猛兽（鳄、狮、河马），却从不伤害清白亡魂，仅吞噬重于真理羽毛的罪恶心脏；中国商周青铜重器上的神圣兽面纹“饕餮”，亦在先秦哲人笔下化作有首无身、吞食害己的戒贪警钟。',
        keyTakeaways: [
          '阿米特执行的“第二次死亡”意味着不义灵魂彻底归于虚无',
          '饕餮兼具商代巫王通神威仪与周鼎“戒贪止欲”双重文化厚度',
        ],
      },
    },
  },
  'bst-track-liminal': {
    folioCode: '研习卷三 · 阈限精怪与末劫天兆',
    title: '幻形灵妖、神林守卫与蚀日凶兽',
    subtitle: '生态越界反思、神妖双面转化与宇宙黑夜守望',
    lessons: {
      'bst-les-7': {
        title: '生态狂妄的代价：胡姆巴巴与鞍马山大天狗',
        summary: '当原始雪松森林里的“怪兽”其实是众神钦定的自然守护官。',
        coreReading:
          '近年新破译的《吉尔伽美什》泥板五残片凸显胡姆巴巴绝非恶魔，而是风神恩利尔任命的雪松圣林护林官；斩杀他并砍伐神松虽赢来凡间虚名，却直接招致恩奇都陨命的天谴。在日本，双翼大天狗同样镇守深山古杉，专门惩戒我慢狂僧而护持谦逊英杰。',
        keyTakeaways: [
          '胡姆巴巴身披的七重恐怖灵光（Melammu）本属神圣威权',
          '鞍马山大天狗鉴照人心傲慢（我慢），体现山岳信仰的生态敬畏',
        ],
      },
      'bst-les-8': {
        title: '水畔迷音与宫廷幻形：九尾狐、凯尔皮与阿维索特尔',
        summary: '跨越日本、苏格兰与墨西哥谷地的变形精怪与水域禁忌比较。',
        coreReading:
          '在黄昏水岸与宫廷帷幕间，变形精怪试探着世人贪嗔：九尾狐横跨伏见稻荷善狐与那须杀生石玉藻前；苏格兰水马凯尔皮皮毛黏死贪马旅人，唯冷铁夺笼头可破；特斯科科湖尾手兽阿维索特尔则以婴啼为雨神乐园选魂。',
        keyTakeaways: [
          '九尾狐完美诠释东亚“善狐护世 vs. 妖狐覆国”的一体双面性',
          '遭阿维索特尔溺亡者在阿兹特克礼制中享有升入特拉洛坎仙境的殊荣',
        ],
      },
      'bst-les-9': {
        title: '超越妖魔化：夜鸟圣母埃莱耶、报丧女妖与吞日魔狼',
        summary: '审视各大文明如何以礼敬或背誓回应暗夜女性神威与日食末劫。',
        coreReading:
          '世俗偏见常误读深邃异灵：爱尔兰报丧女妖从不杀人，只为古族泣唱挽歌；阿兹特克星魔齐齐米梅在日食降劫却在日常守护产妇；约鲁巴《奥萨梅吉》更教导世人，面对伊罗科树顶的夜鸟圣母埃莱耶，刀剑雷霆皆败，唯有如奥伦米拉般献礼结盟并饰神鸟于王冠之巅方得太平——反观北欧诸神以断腕假誓欺骗芬里尔，终招致诸神黄昏吞日弑神之祸。',
        keyTakeaways: [
          '每位约鲁巴神圣国王的串珠王冠顶端皆缀有象征埃莱耶的神鸟',
          '北欧诸神因恐惧而违背誓言，亲手将芬里尔推向毁灭阿斯加德的宿命',
          '芬里尔、阿波菲斯与齐齐米梅共同构成人类日全食天象神话巅峰',
        ],
      },
    },
  },
};

export const BESTIARY_TRACKS_ZH: StudyTrack[] = BESTIARY_TRACKS_EN.map((tr) => {
  const ov = TRACK_ZH_OV[tr.id];
  if (!ov) return tr;
  return {
    ...tr,
    folioCode: ov.folioCode,
    title: ov.title,
    subtitle: ov.subtitle,
    lessons: tr.lessons.map((l) => (ov.lessons[l.id] ? { ...l, ...ov.lessons[l.id] } : l)),
  };
});

export const BESTIARY_FLASHCARDS_EN: FlashcardItem[] = [
  { id: 'fc-01', traditionId: 'comparative', archetypeId: 'war-storm', promptCategory: 'PIE Poetics', frontPrompt: 'What Bronze Age Indo-European poetic formula links Indra vs. Vritra, Zeus vs. Typhon, and Thor vs. Jörmungandr?', backAnswer: '*éghan áhim ("he slew the serpent") — reconstructed by linguist Calvert Watkins across Vedic, Greek, Celtic, and Germanic dragon-slaying hymns.', comparativeHint: 'Contrast with East Asian and Yoruba traditions where cosmic serpents are allied with or revered.' },
  { id: 'fc-02', traditionId: 'egyptian', archetypeId: 'underworld-ruler', promptCategory: 'Hybrid Anatomy', frontPrompt: 'Which three Nile animals compose Ammit ("Devourer of the Dead"), and whose hearts does she consume?', backAnswer: 'Crocodile head, lion forequarters, and hippopotamus hindquarters; she devours only hearts heavier than Ma’at’s feather of truth.', comparativeHint: 'Inflicts the "Second Death" (permanent non-existence) in Spell 125.' },
  { id: 'fc-03', traditionId: 'japanese', archetypeId: 'war-storm', promptCategory: 'Sacred Regalia', frontPrompt: 'What imperial treasure did Susanoo discover inside the fourth tail of eight-headed Yamata-no-Orochi?', backAnswer: 'The sacred sword Kusanagi-no-Tsurugi (Ame-no-Murakumo-no-Tsurugi), presented to Amaterasu as one of Japan’s Three Imperial Regalia.', comparativeHint: 'Reflects ancient Hiikawa river flood control and Izumo iron-sand swordsmithing.' },
  { id: 'fc-04', traditionId: 'yoruba', archetypeId: 'sky-sovereign', promptCategory: 'Cosmic Serpent', frontPrompt: 'How does Yoruba rainbow python Oshumare differ fundamentally from Norse world-serpent Jörmungandr?', backAnswer: 'Both coil around Earth beneath the sea, but Oshumare stabilizes the planet from cracking and circulates life-giving rain, whereas Jörmungandr’s release triggers Ragnarök.', comparativeHint: 'Continued across the Atlantic as Afro-Brazilian Oxumarê.' },
  { id: 'fc-05', traditionId: 'chinese', archetypeId: 'sky-sovereign', promptCategory: 'Flood Mythology', frontPrompt: 'How did winged dragon Yinglong aid Yu the Great during the Great Flood?', backAnswer: 'Yinglong swept its tail across the saturated earth to carve river channels guiding floodwaters to the sea and chained flood-ape Wuzhiqi beneath Turtle Mountain.', comparativeHint: 'Exemplifies hydraulic cooperation with dragons rather than Western dragon-slaying.' },
  { id: 'fc-06', traditionId: 'mesopotamian', archetypeId: 'wisdom-order', promptCategory: 'Royal Architecture', frontPrompt: 'Why were Assyrian winged human-headed bulls (Lamassu) sculpted with five legs?', backAnswer: 'So the guardian colossus appears planted firmly on two front legs when viewed head-on at the threshold, yet striding powerfully on four legs when passed from the side.', comparativeHint: 'Combines human intellect, bull might, and eagle swiftness.' },
  { id: 'fc-07', traditionId: 'norse', archetypeId: 'solar-renewal', promptCategory: 'Oaths & Doom', frontPrompt: 'What price did war-god Týr pay to bind the wolf Fenrir with the silken ribbon Gleipnir?', backAnswer: 'Týr placed his right hand inside Fenrir’s jaws as a pledge of good faith and lost it at the wrist when the gods refused to release the wolf.', comparativeHint: 'Highlights how broken Æsir oaths precipitate Ragnarök.' },
  { id: 'fc-08', traditionId: 'mesoamerican', archetypeId: 'underworld-ruler', promptCategory: 'Living Cosmos', frontPrompt: 'What distinctive anatomical feature marks Aztec primeval earth-crocodile Cipactli?', backAnswer: 'Snapping, hungry mouths at every single joint of her knees, elbows, and body—still alive beneath human feet and demanding sacrificial reciprocity to grow maize.', comparativeHint: 'Tezcatlipoca used his own foot as bait to draw her from the primeval waters.' },
  { id: 'fc-09', traditionId: 'celtic', archetypeId: 'trickster-guide', promptCategory: 'Gaelic Lore', frontPrompt: 'Does the traditional Irish Bean Sídhe (Banshee) harm mortals with her cry?', backAnswer: 'Never—she is an ancestral Otherworld fairy-mound herald who combs her hair and sings a sorrowful lament (caoineadh) to honor ancient Gaelic families before a death.', comparativeHint: 'Descends from Tuatha Dé Danann mound traditions and land-sovereignty goddesses.' },
  { id: 'fc-10', traditionId: 'hindu', archetypeId: 'sky-sovereign', promptCategory: 'Epic Virtue', frontPrompt: 'Why did Lord Vishnu grant golden-winged Garuda immortality without Garuda ever drinking the stolen Amrita?', backAnswer: 'Because Garuda conquered the heavens to ransom his enslaved mother Vinata yet exercised supreme dharmic self-restraint, refusing to taste a single drop himself.', comparativeHint: 'Garuda became Vishnu’s celestial mount (vahana) and emblem across Asia.' },
  { id: 'fc-11', traditionId: 'japanese', archetypeId: 'trickster-guide', promptCategory: 'Dual Spirit', frontPrompt: 'What are the two contrasting faces of Kitsune (fox spirits) in Japanese tradition?', backAnswer: 'Benevolent white Zenko messengers serving rice-deity Inari at vermilion torii shrines versus nine-tailed court shapeshifter Tamamo-no-Mae petrified into Nasu’s Killing Stone.', comparativeHint: 'Derived from Shan Hai Jing’s nine-tailed fox of Mount Qingqiu.' },
  { id: 'fc-12', traditionId: 'egyptian', archetypeId: 'solar-renewal', promptCategory: 'Temple Ritual', frontPrompt: 'How did Egyptian priests actively assist Ra and Seth against chaos-serpent Apophis every day?', backAnswer: 'By reciting the Book of Overthrowing Apophis while molding green wax or papyrus serpent effigies, spearing them with flint knives, and burning them in temple braziers.', comparativeHint: 'Apophis is never permanently slain—order must be defended every midnight.' },
  { id: 'fc-13', traditionId: 'yoruba', archetypeId: 'wisdom-order', promptCategory: 'Sacred Kingship', frontPrompt: 'Why does every sacred Yoruba king’s beaded crown (adé) feature a bird perched at its very apex?', backAnswer: 'To honor the covenant in Odù Ọ̀sá Méjì with Àwọn Ìyá Wa (Eleye, elder female bird-mothers), signifying no sovereign rules legitimately without respecting female spiritual power.', comparativeHint: 'Celebrated publicly in UNESCO-inscribed Gẹ̀lẹ̀dẹ́ masquerades.' },
  { id: 'fc-14', traditionId: 'chinese', archetypeId: 'wisdom-order', promptCategory: 'Moral Chimera', frontPrompt: 'Why is the Chinese Qilin’s single horn covered in soft flesh?', backAnswer: 'To signify martial majesty tempered by supreme benevolence (ren)—the Qilin refuses even to tread on living insects or snap growing grass.', comparativeHint: 'Appeared before Confucius’s birth; its wounding in 481 BCE ended the Spring and Autumn Annals.' },
  { id: 'fc-15', traditionId: 'mesoamerican', archetypeId: 'trickster-guide', promptCategory: 'Aquatic Beast', frontPrompt: 'Why were Aztecs drowned by the tail-handed Ahuizotl given special priestly burial rather than ordinary cremation?', backAnswer: 'Missing eyes, teeth, and nails proved Rain-God Tlaloc had personally chosen their souls through his servant Ahuizotl to enter the lush paradise of Tlalocan.', comparativeHint: 'Recorded in eyewitness Nahuatl detail in Florentine Codex Book XI.' },
  { id: 'fc-16', traditionId: 'celtic', archetypeId: 'solar-renewal', promptCategory: 'Battle Saga', frontPrompt: 'How did Lugh turn Fomorian giant Balor’s army-destroying Evil Eye against his own host at Mag Tuired?', backAnswer: 'The instant four attendants hooked open Balor’s venomous eyelid, Lugh slung a sacred stone straight through the eye and out the back of Balor’s skull onto the Fomorian ranks.', comparativeHint: 'Shares exact grandson-prophecy structure with Greek Perseus.' },
];

const FC_ZH_OV: Record<string, Pick<FlashcardItem, 'promptCategory' | 'frontPrompt' | 'backAnswer' | 'comparativeHint'>> = {
  'fc-01': { promptCategory: '印欧古诗学', frontPrompt: '哪句青铜时代原始印欧古诗公式串联起吠陀因陀罗斩弗栗多、宙斯镇提丰与索尔战耶梦加得？', backAnswer: '“*éghan áhim（他斩杀了巨蛇）”——由比较语言学家沃特金斯重构，贯穿梵语、古希腊语、古爱尔兰语与古诺斯语屠龙赞歌。', comparativeHint: '对比东亚与西非约鲁巴“尊龙导水/箍世”传统。' },
  'fc-02': { promptCategory: '合成兽解剖', frontPrompt: '古埃及“噬亡者”阿米特由尼罗河哪三种猛兽合体而成？它吞食谁的心脏？', backAnswer: '尼罗鳄头颅、雄狮前躯与河马臀部；它蹲守双真理大厅天平之下，仅吞食重于玛阿特真理羽毛的罪恶心脏。', comparativeHint: '被吞食者遭受“第二次死亡”，彻底魂飞魄散。' },
  'fc-03': { promptCategory: '三神器起源', frontPrompt: '须佐之男命在八岐大蛇第四条尾巴中剖出了哪件日本皇室至宝？', backAnswer: '天丛云剑（后称草薙剑），献予天照大御神后成为日本皇室三大神器之一。', comparativeHint: '凝聚出云斐伊川水患治理与砂铁锻剑历史记忆。' },
  'fc-04': { promptCategory: '宇宙巨蛇对比', frontPrompt: '约鲁巴彩虹巨蟒奥舒马雷与北欧尘世巨蟒耶梦加得在宇宙职能上有何根本相反？', backAnswer: '二者皆在深海盘绕地球，但奥舒马雷以蛇躯稳稳箍住大地防其崩裂并输导甘霖；耶梦加得松尾则掀起毁灭世界的诸神黄昏海啸。', comparativeHint: '随跨大西洋散居传统在巴西延续为Oxumarê信仰。' },
  'fc-05': { promptCategory: '神龙治水', frontPrompt: '有翼神龙“应龙”在大禹治水时发挥了怎样的关键神功？', backAnswer: '应龙在前方以千钧龙尾犁地画出江淮水道引洪入海，并生擒淮水暴猿水怪无支祁锁于龟山脚下。', comparativeHint: '彰显中华“人龙协同疏导自然”的治水智慧。' },
  'fc-06': { promptCategory: '帝王建筑奇观', frontPrompt: '为什么亚述王宫城门的带翼人首牛守护兽“拉玛苏”被雕刻成五条腿？', backAnswer: '为了兼顾双重视角：从城门正面仰望，双前腿并立稳如泰山镇守门槛；从侧面走过，则见四腿迈步威严前行。', comparativeHint: '集人类理性冠冕、公牛巨力与苍鹰双翼于一体。' },
  'fc-07': { promptCategory: '背誓与末劫', frontPrompt: '北欧战神提尔付出什么惨痛代价，才让诸神用魔带格莱普尼尔锁住巨狼芬里尔？', backAnswer: '提尔毅然将右手伸入芬里尔口中充当不欺骗的信物，当魔链收紧诸神拒不放狼时，芬里尔咬断了提尔的右腕。', comparativeHint: '揭示诸神背誓之举如何亲手埋下诸神黄昏祸根。' },
  'fc-08': { promptCategory: '活体大地观', frontPrompt: '阿兹特克创世大地鳄怪“希帕克特利”最骇人的身体特征是什么？', backAnswer: '全身十八处膝肘关节皆长满永不饱足的利齿巨口——被撕成天地后依然活着在人类脚下啼哭索血，以此换取玉米生长。', comparativeHint: '烟镜神特斯卡特利波卡以自身左足为饵将其诱出水面。' },
  'fc-09': { promptCategory: '盖尔仙丘民俗', frontPrompt: '正统爱尔兰传统中的报丧女妖（Bean Sídhe / 班西）会用哭声害死活人吗？', backAnswer: '绝不害人——她是源自史前仙丘（Sídhe）的家族守护女灵，仅在古老盖尔血脉成员将逝前夜执银梳泣唱悲悯挽歌。', comparativeHint: '源出达努神族仙丘贵族与本土土地主权女神信仰。' },
  'fc-10': { promptCategory: '神兽至孝守信', frontPrompt: '金翅大鹏王迦楼罗夺得不死甘露却一滴未饮，为何仍获毗湿奴赐予永恒不朽？', backAnswer: '因迦楼罗力克天军只为赎回受奴役的母亲毗娜达，得宝后严守正法毫无私贪，毗湿奴钦佩其高洁而赐其永生并尊为天界坐骑。', comparativeHint: '化作南亚与东南亚各国神庙及国徽至高图腾。' },
  'fc-11': { promptCategory: '神妖一体双面', frontPrompt: '日本文化中的狐灵（Kitsune）展现出哪两副截然不同的经典面孔？', backAnswer: '一面是伏见稻荷大社口衔谷仓宝钥护佑丰收的神圣白狐（善狐）；另一面是魅惑宫廷、死后化为那须毒石“杀生石”的九尾妖狐玉藻前。', comparativeHint: '直接渊源于中国《山海经》青丘九尾狐。' },
  'fc-12': { promptCategory: '神庙护日巫术', frontPrompt: '古埃及神庙祭司每天如何用仪式协助拉神与赛特击退混沌巨蛇阿波菲斯？', backAnswer: '每日诵读《推翻阿波菲斯之书》，用绿蜡或纸草塑出阿波菲斯蛇像，以燧石刀刺穿斩碎并投入火盆焚毁。', comparativeHint: '阿波菲斯永不死绝，故宇宙光明须每夜重新捍卫。' },
  'fc-13': { promptCategory: '王冠神鸟盟约', frontPrompt: '为何每位约鲁巴神圣国王（Oba）的串珠王冠最顶端都停驻着一只灵鸟？', backAnswer: '纪念《伊法圣典·奥萨梅吉》中奥伦米拉同夜鸟圣母“埃莱耶（我们的母亲）”缔结的和解盟约，昭示不敬重母系灵威者无权称王。', comparativeHint: '这一理念亦化作联合国非遗“盖莱德”假面舞盛典。' },
  'fc-14': { promptCategory: '王道仁兽', frontPrompt: '为什么中华瑞兽麒麟头顶的独角被柔和的肉质包裹（肉角）？', backAnswer: '象征“有武备而不伤生”的至高仁德——麒麟足踏祥云，连活虫与嫩草都不忍踩折，唯太平仁政之世方才现身。', comparativeHint: '孔子诞前吐玉书，鲁哀公十四年西狩获麟绝笔。' },
  'fc-15': { promptCategory: '特斯科科湖异兽', frontPrompt: '被尾尖长人手的阿维索特尔拖入湖底溺亡者，为何在阿兹特克享有特殊隆重水葬？', backAnswer: '遗体三日后浮出且唯独失去眼珠、牙齿与指甲，证明雨神特拉洛克亲自通过阿维索特尔选中其灵魂升入常春乐园“特拉洛坎”。', comparativeHint: '详载于16世纪纳瓦语图文巨著《佛罗伦萨手抄本》卷十一。' },
  'fc-16': { promptCategory: '摩伊图拉决战', frontPrompt: '光神鲁格如何令弗摩族独眼魔王巴罗尔的毁灭魔眼反噬其自家大军？', backAnswer: '趁四名侍卫刚用铁钩掀开巴罗尔沉重眼睑的瞬间，外孙鲁格挥投石索射出一石正穿魔眼自后脑飞出，毒光瞬间焚毁后方弗摩主力。', comparativeHint: '与希腊珀尔修斯外孙弑祖预言同出一源。' },
};

export const BESTIARY_FLASHCARDS_ZH: FlashcardItem[] = BESTIARY_FLASHCARDS_EN.map((fc) =>
  FC_ZH_OV[fc.id] ? { ...fc, ...FC_ZH_OV[fc.id] } : fc
);

export const BESTIARY_QUIZ_EN: QuizQuestion[] = [
  {
    id: 'qz-01',
    category: 'Cosmic Serpents',
    difficulty: 'Initiate',
    prompt: 'Which sacred rainbow python coils beneath the sea to keep the Earth from fracturing while bridging Ọ̀run and Ayé?',
    options: ['Jörmungandr', 'Oshumare', 'Apophis', 'Lernaean Hydra'],
    correctIndex: 1,
    explanation: 'In Yoruba cosmology, rainbow python Oshumare stabilizes Earth’s foundations and carries life-giving moisture between ocean and sky.',
    relatedTraditionIds: ['yoruba', 'norse'],
  },
  {
    id: 'qz-02',
    category: 'Flood & Dragon Lore',
    difficulty: 'Initiate',
    prompt: 'How did Chinese winged dragon Yinglong help Yu the Great conquer the Great Deluge?',
    options: ['Swallowed the ocean whole', 'Used its tail to carve river channels to the sea', 'Turned into a stone dam', 'Froze the Yellow River'],
    correctIndex: 1,
    explanation: 'Shan Hai Jing and Chu Ci record that Yinglong drew channels across the saturated land with its tail while Yu dredged the waterways.',
    relatedTraditionIds: ['chinese'],
  },
  {
    id: 'qz-03',
    category: 'Norse Eschatology',
    difficulty: 'Initiate',
    prompt: 'Which dragon gnaws the deepest root of Yggdrasil above Náströnd’s corpse-shore?',
    options: ['Fafnir', 'Jörmungandr', 'Níðhöggr', 'Typhon'],
    correctIndex: 2,
    explanation: 'Níðhöggr ("Malice-Striker") chews Yggdrasil’s root in Niflheim and still flies bearing corpses in the closing stanza of Völuspá.',
    relatedTraditionIds: ['norse'],
  },
  {
    id: 'qz-04',
    category: 'Heroic Stratagem',
    difficulty: 'Initiate',
    prompt: 'How did Susanoo incapacitate the eight-headed serpent Yamata-no-Orochi in the Kojiki?',
    options: ['Cauterizing torches', 'A mirrored bronze shield', 'Eight vats of eightfold-refined sake', 'Music from an ivory flute'],
    correctIndex: 2,
    explanation: 'Susanoo built an eight-gated fence holding eight vats of potent sake; when all eight heads drank and slept, he hewed the serpent apart and found Kusanagi in its tail.',
    relatedTraditionIds: ['japanese', 'greek'],
  },
  {
    id: 'qz-05',
    category: 'Underworld Law',
    difficulty: 'Scholar',
    prompt: 'What happens in Egyptian Spell 125 if a deceased person’s heart weighs more than Ma’at’s ostrich feather?',
    options: ['Cerberus blocks their return', 'Hybrid devourer Ammit eats the heart, causing the Second Death', 'They become a desert Sphinx', 'Seth chains them to Ra’s barque'],
    correctIndex: 1,
    explanation: 'Crocodile-lion-hippo Ammit devours unjust hearts beneath Anubis’s balance, permanently erasing the soul from existence.',
    relatedTraditionIds: ['egyptian'],
  },
  {
    id: 'qz-06',
    category: 'Cross-Cultural Transmission',
    difficulty: 'Scholar',
    prompt: 'Which ancient Chinese cosmography directly seeded Japanese Edo-period encyclopedias of nine-tailed Kitsune and strange beasts?',
    options: ['Shan Hai Jing (Classic of Mountains and Seas)', 'Art of War', 'Zhuangzi Inner Chapters', 'Tao Te Ching'],
    correctIndex: 0,
    explanation: 'Illustrated editions of the Shan Hai Jing cataloged Mount Qingqiu’s nine-tailed fox, Yinglong, and Taotie, inspiring Japanese yōkai compendia.',
    relatedTraditionIds: ['chinese', 'japanese'],
  },
  {
    id: 'qz-07',
    category: 'Mesoamerican Cosmology',
    difficulty: 'Scholar',
    prompt: 'What bait did smoking-mirror god Tezcatlipoca use to lure eighteen-mouthed Cipactli from the primeval waters?',
    options: ['A golden maize cob', 'An obsidian knife', 'His own foot', 'A sacred quetzal bird'],
    correctIndex: 2,
    explanation: 'Tezcatlipoca lowered his foot into the water; Cipactli bit it off, allowing Tezcatlipoca and Quetzalcoatl to seize her and fashion Earth from her body.',
    relatedTraditionIds: ['mesoamerican'],
  },
  {
    id: 'qz-08',
    category: 'Japanese Mountain Lore',
    difficulty: 'Scholar',
    prompt: 'According to medieval Japanese tales, which legendary young warrior learned swordsmanship from Daitengu Sōjōbō on Mount Kurama?',
    options: ['Miyamoto Musashi', 'Ushiwakamaru (Minamoto no Yoshitsune)', 'Oda Nobunaga', 'Abe no Seimei'],
    correctIndex: 1,
    explanation: 'Exiled as a child to Kurama Temple, Ushiwakamaru trained nightly under the winged Tengu lord Sōjōbō before defeating Benkei and the Taira clan.',
    relatedTraditionIds: ['japanese'],
  },
  {
    id: 'qz-09',
    category: 'Celtic Saga',
    difficulty: 'Scholar',
    prompt: 'Why had Fomorian giant Balor locked his daughter Ethniu inside a crystal tower on Tory Island?',
    options: ['To guard a cauldron of gold', 'A druid prophesied Balor would be slain by his own grandson', 'To hide her from Kelpies', 'As tribute to Rome'],
    correctIndex: 1,
    explanation: 'Despite the crystal tower, Ethniu bore Lugh, who fulfilled the prophecy at Mag Tuired by slinging a stone through Balor’s Evil Eye.',
    relatedTraditionIds: ['celtic', 'greek'],
  },
  {
    id: 'qz-10',
    category: 'Sacred Kingship',
    difficulty: 'Archivist',
    prompt: 'In Yoruba royal law, why was the face of any slain leopard (Ekun) veiled with white cloth when presented to the Oba?',
    options: ['To trap forest rain', 'Because Ekun is the sacred forest counterpart of the Oba, whose royal gaze must be honored', 'To ward off river spirits', 'To dye palace textiles'],
    correctIndex: 1,
    explanation: 'Ekun embodies the Oba’s composed dignity (*ìwà pẹ̀lẹ́*) and decisive authority; veiling its eyes honored royal majesty.',
    relatedTraditionIds: ['yoruba'],
  },
  {
    id: 'qz-11',
    category: 'Ecological Tragedy',
    difficulty: 'Archivist',
    prompt: 'Who appointed seven-aura Humbaba to guard the sacred Cedar Forest before Gilgamesh and Enkidu slew him?',
    options: ['Salt-dragon Tiamat', 'Chief storm/sky-god Enlil', 'Underworld queen Ereshkigal', 'Babylon’s king Hammurabi'],
    correctIndex: 1,
    explanation: 'Enlil personally stationed Humbaba to protect the gods’ Cedar Forest; slaying him and felling the cedars brought divine retribution upon Enkidu.',
    relatedTraditionIds: ['mesopotamian'],
  },
  {
    id: 'qz-12',
    category: 'Comparative Iconography',
    difficulty: 'Archivist',
    prompt: 'Which Mesopotamian monster—birthed by Tiamat and conquered by Marduk—adorns Babylon’s blue glazed-brick Ishtar Gate?',
    options: ['Mušḫuššu (horned snake-dragon)', 'Lernaean Hydra', 'Ahuizotl', 'Ammit'],
    correctIndex: 0,
    explanation: 'The scaly, horned, lion-forelegged, eagle-taloned Mušḫuššu comes straight from Tiamat’s elevenfold brood and became Marduk’s sacred emblem on the Ishtar Gate.',
    relatedTraditionIds: ['mesopotamian', 'greek'],
  },
];

const QUIZ_ZH_OV: Record<
  string,
  Pick<QuizQuestion, 'category' | 'prompt' | 'options' | 'explanation'>
> = {
  'qz-01': {
    category: '宇宙神圣巨蛇',
    prompt: '哪条神圣七彩巨蟒潜居深海盘固地球防其崩裂，并横跨苍穹连接天界奥润与人间？',
    options: ['耶梦加得 (Jörmungandr)', '奥舒马雷 (Oshumare)', '阿波菲斯 (Apophis)', '勒拿九头蛇 (Hydra)'],
    explanation: '在约鲁巴宇宙观中，彩虹巨蟒奥舒马雷箍紧大地根基，并在深海与天穹间循环输导甘霖与福祉。',
  },
  'qz-02': {
    category: '华夏治水神话',
    prompt: '有翼创世神龙“应龙”是如何协助大禹平定九州大洪水的？',
    options: ['一口吞干四海洪水', '在前方以龙尾犁地画出江河水道引入大海', '化身巨石堵死黄河源头', '冰封万里泽国'],
    explanation: '《山海经》与《楚辞·天问》记载“应龙何画？河海何历”，应龙以尾画地成江引导大禹疏通水系。',
  },
  'qz-03': {
    category: '北欧末世神话',
    prompt: '盘踞尸海岸毒泉之上、日夜啃噬世界之树最深树根的冥渊黑龙是谁？',
    options: ['法夫纳 (Fafnir)', '耶梦加得 (Jörmungandr)', '尼德霍格 (Níðhöggr)', '提丰 (Typhon)'],
    explanation: '绝望黑龙尼德霍格与万千毒蛇啃咬世界树根，甚至在《女巫的预言》终章仍展翼掠过劫后天空。',
  },
  'qz-04': {
    category: '英雄智略',
    prompt: '在《古事记》中，须佐之男命用什么妙计制服了八首八尾的八岐大蛇？',
    options: ['松脂火炬烙印', '青铜八咫镜强光反射', '八道门垣内摆满八槽八盐折烈酒', '天界竹笛催眠曲'],
    explanation: '八岐大蛇八颗头颅齐入酒槽痛饮醉倒，须佐之男遂拔十拳剑将其斩碎，并从尾中剖出天丛云剑。',
  },
  'qz-05': {
    category: '冥界法则审判',
    prompt: '在古埃及《亡灵书》第125章中，若死者心脏重于玛阿特的真理鸵鸟羽，将遭遇什么结局？',
    options: ['被三头犬挡在冥河对岸', '被天平下的合体噬心兽阿米特一口吞下，遭受“第二次死亡”', '化作沙漠石雕斯芬克斯', '被赛特锁在太阳船底'],
    explanation: '鳄首狮身河马臀的阿米特会立即吞噬不义心脏，令亡魂彻底湮灭、永失芦苇原来世。',
  },
  'qz-06': {
    category: '跨文化典籍传播',
    prompt: '哪部中国上古奇书直接启发了日本九尾狐物语及江户时代《画图百鬼夜行》等妖怪图鉴？',
    options: ['《山海经》', '《孙子兵法》', '《庄子·内篇》', '《道德经》'],
    explanation: '《山海经》详细著录青丘九尾狐、应龙与饕餮，其刻本图谱东传日本后深远塑造了日本妖怪文化。',
  },
  'qz-07': {
    category: '中美洲创世神话',
    prompt: '烟镜神特斯卡特利波卡用什么作为鱼饵，将全身十八关节长满巨口的大地鳄怪希帕克特利诱出水面？',
    options: ['黄金玉米棒', '黑曜石祭刀', '他自己的一只脚', '神圣绿咬鹃'],
    explanation: '特斯卡特利波卡伸足入水被巨鳄咬断脚掌，随后与羽蛇神合力将希帕克特利撕塑成天地山川。',
  },
  'qz-08': {
    category: '日本灵山传说',
    prompt: '相传哪位日本传奇少年名将在京都鞍马山获大天狗僧正坊夜授绝世剑法？',
    options: ['宫本武藏', '牛若丸（源义经）', '织田信长', '安倍晴明'],
    explanation: '年幼避祸鞍马寺的牛若丸（源义经）每夜向大天狗习练身法剑术，日后击败弁庆并推翻平氏政权。',
  },
  'qz-09': {
    category: '凯尔特史诗',
    prompt: '弗摩族独眼魔王巴罗尔为何将独女艾思林幽禁在托里岛的水晶高塔之中？',
    options: ['看守聚宝神釜', '德鲁伊预言巴罗尔必死于亲外孙之手', '躲避寒潭水马凯尔皮', '逃避罗马军团征讨'],
    explanation: '巴罗尔锁女避祸仍未能阻止外孙光神鲁格降生；鲁格最终在摩伊图拉决战一石射穿巴罗尔毁灭魔眼。',
  },
  'qz-10': {
    category: '神圣王权礼法',
    prompt: '按约鲁巴古老礼法，凡猎获花豹（Ekun）敬献神圣国王奥巴时，为何必须以洁白布帛遮住豹面？',
    options: ['留存雨林湿气', '因花豹是丛林君王与奥巴王权的化身，白布覆面以示臣民敬畏王室威严目光', '驱赶河神恶灵', '染制宫廷锦缎'],
    explanation: '埃昆集沉静优雅与雷霆决断于一身，直接对应神圣奥巴的帝王品格。',
  },
  'qz-11': {
    category: '古老生态悲剧',
    prompt: '在吉尔伽美什与恩奇都远征砍伐雪松林之前，是谁亲自任命七重灵光巨怪胡姆巴巴守护这片圣林的？',
    options: ['咸水母龙提阿玛特', '最高风与天空主神恩利尔 (Enlil)', '冥界女王埃列什基伽尔', '巴比伦王汉谟拉比'],
    explanation: '胡姆巴巴乃恩利尔钦定的神圣森林守护官；吉尔伽美什与恩奇都杀兽毁林之举直接招致恩奇都暴亡的天谴。',
  },
  'qz-12': {
    category: '近东怪兽图像学',
    prompt: '巴比伦著名的蓝琉璃砖“伊什塔尔城门”上浮雕着哪尊源自提阿玛特十一魔军、后被马尔杜克收服的异兽？',
    options: ['穆什胡什怒蛇龙 (Mušḫuššu)', '勒拿九头蛇', '尾手水怪阿维索特尔', '噬心兽阿米特'],
    explanation: '角首蛇鳞、狮前足鹰后爪的怒蛇穆什胡什原为提阿玛特所生先锋，马尔杜克胜后收为专属神圣坐骑铸上城门。',
  },
};

export const BESTIARY_QUIZ_ZH: QuizQuestion[] = BESTIARY_QUIZ_EN.map((q) =>
  QUIZ_ZH_OV[q.id] ? { ...q, ...QUIZ_ZH_OV[q.id] } : q
);
