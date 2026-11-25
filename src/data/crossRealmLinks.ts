import type { TraditionId } from '../types/mythology';
import type { RealmMode } from '../utils/storage';

export type CrossRealmRelationKind = 'nemesis' | 'mount' | 'guardian' | 'companion' | 'kin';

export interface CrossRealmLink {
  targetId: string;
  targetRealm: RealmMode;
  traditionId: TraditionId;
  targetNameEn: string;
  targetNameZh: string;
  relationKind: CrossRealmRelationKind;
  relationEn: string;
  relationZh: string;
}

interface RawCrossRealmPair {
  deityId: string;
  deityNameEn: string;
  deityNameZh: string;
  monsterId: string;
  monsterNameEn: string;
  monsterNameZh: string;
  traditionId: TraditionId;
  relationKind: CrossRealmRelationKind;
  deityToMonsterEn: string;
  deityToMonsterZh: string;
  monsterToDeityEn: string;
  monsterToDeityZh: string;
}

const CURATED_PAIRS: RawCrossRealmPair[] = [
  // GREEK
  {
    deityId: 'zeus', deityNameEn: 'Zeus', deityNameZh: '宙斯',
    monsterId: 'mon-typhon', monsterNameEn: 'Typhon', monsterNameZh: '提丰',
    traditionId: 'greek', relationKind: 'nemesis',
    deityToMonsterEn: 'Storm-Slayer vs. Hundred-Headed Nemesis', deityToMonsterZh: '雷霆主神讨伐的百首宿敌',
    monsterToDeityEn: 'Rival Sovereign Who Buried Him Under Mount Etna', monsterToDeityZh: '将其镇压于埃特纳火山之下的雷神宿敌',
  },
  {
    deityId: 'zeus', deityNameEn: 'Zeus', deityNameZh: '宙斯',
    monsterId: 'mon-pegasus', monsterNameEn: 'Pegasus', monsterNameZh: '珀伽索斯',
    traditionId: 'greek', relationKind: 'companion',
    deityToMonsterEn: 'Winged Bearer of Olympian Thunderbolts', deityToMonsterZh: '驮负奥林匹斯雷霆的天马',
    monsterToDeityEn: 'Sky-King Whose Lightning Bolts Pegasus Carries', monsterToDeityZh: '委任天马运载雷霆的天穹主宰',
  },
  {
    deityId: 'athena', deityNameEn: 'Athena', deityNameZh: '雅典娜',
    monsterId: 'mon-medusa', monsterNameEn: 'Medusa', monsterNameZh: '美杜莎',
    traditionId: 'greek', relationKind: 'nemesis',
    deityToMonsterEn: 'Gorgon Whose Visage Crowns Athena’s Aegis', deityToMonsterZh: '其蛇发头颅嵌于雅典娜神盾之上',
    monsterToDeityEn: 'Goddess Who Cursed Medusa & Claimed the Gorgoneion', monsterToDeityZh: '施下蛇发诅咒并执掌戈耳工神盾的女神',
  },
  {
    deityId: 'hades', deityNameEn: 'Hades', deityNameZh: '哈迪斯',
    monsterId: 'mon-cerberus', monsterNameEn: 'Cerberus', monsterNameZh: '刻耳柏洛斯',
    traditionId: 'greek', relationKind: 'guardian',
    deityToMonsterEn: 'Three-Headed Hound Guarding the Gates of Tartarus', deityToMonsterZh: '守卫冥府大门的三头地狱犬',
    monsterToDeityEn: 'Underworld Sovereign Whom Cerberus Serves', monsterToDeityZh: '刻耳柏洛斯效忠的冥界之王',
  },
  {
    deityId: 'poseidon', deityNameEn: 'Poseidon', deityNameZh: '波塞冬',
    monsterId: 'mon-cyclops', monsterNameEn: 'Polyphemus & the Cyclopes', monsterNameZh: '波吕斐摩斯与独眼巨人',
    traditionId: 'greek', relationKind: 'kin',
    deityToMonsterEn: 'Sea-God Father of Polyphemus', deityToMonsterZh: '独眼巨人波吕斐摩斯之海神生父',
    monsterToDeityEn: 'Earth-Shaker Father Who Avenged Polyphemus', monsterToDeityZh: '为其复仇诅咒奥德修斯的生父海神',
  },
  {
    deityId: 'poseidon', deityNameEn: 'Poseidon', deityNameZh: '波塞冬',
    monsterId: 'mon-minotaur', monsterNameEn: 'Minotaur', monsterNameZh: '弥诺陶洛斯',
    traditionId: 'greek', relationKind: 'kin',
    deityToMonsterEn: 'Labyrinth Beast Born of Poseidon’s Cretan Bull', deityToMonsterZh: '因波塞冬赐下的克里特神牛诅咒而生',
    monsterToDeityEn: 'Sea-God Whose Sacred Bull Triggered Minos’s Curse', monsterToDeityZh: '降下神牛之怒引发迷宫灾祸的海神',
  },
  {
    deityId: 'poseidon', deityNameEn: 'Poseidon', deityNameZh: '波塞冬',
    monsterId: 'mon-scylla', monsterNameEn: 'Scylla', monsterNameZh: '斯库拉',
    traditionId: 'greek', relationKind: 'nemesis',
    deityToMonsterEn: 'Six-Headed Strait Terror of the Sea', deityToMonsterZh: '盘踞海峡吞噬水手的六首海怪',
    monsterToDeityEn: 'Ruler of the Seas Where Scylla Hunts', monsterToDeityZh: '主宰斯库拉盘踞海峡的海界之主',
  },
  {
    deityId: 'apollo', deityNameEn: 'Apollo', deityNameZh: '阿波罗',
    monsterId: 'mon-hydra', monsterNameEn: 'Lernaean Hydra', monsterNameZh: '勒拿九头蛇',
    traditionId: 'greek', relationKind: 'nemesis',
    deityToMonsterEn: 'Chthonic Serpent-Brood Echoing Delphic Python', deityToMonsterZh: '与阿波罗斩杀的德尔斐巨蟒同属大地毒蛇裔',
    monsterToDeityEn: 'Solar Dragon-Slayer of Delphi', monsterToDeityZh: '德尔斐屠龙太阳神',
  },

  // NORSE
  {
    deityId: 'thor', deityNameEn: 'Thor', deityNameZh: '托尔',
    monsterId: 'mon-jormungandr', monsterNameEn: 'Jörmungandr', monsterNameZh: '耶梦加得',
    traditionId: 'norse', relationKind: 'nemesis',
    deityToMonsterEn: 'Fated Ragnarök Rival Caught on Hymir’s Hook', deityToMonsterZh: '诸神黄昏宿命同归于尽的环世巨蛇',
    monsterToDeityEn: 'Thunder-God Bound in Mutual Slaying at Ragnarök', monsterToDeityZh: '注定在诸神黄昏同归于尽的雷神宿敌',
  },
  {
    deityId: 'odin', deityNameEn: 'Odin', deityNameZh: '奥丁',
    monsterId: 'mon-fenrir', monsterNameEn: 'Fenrir', monsterNameZh: '芬里尔',
    traditionId: 'norse', relationKind: 'nemesis',
    deityToMonsterEn: 'Prophesied Devourer of the Allfather at Ragnarök', deityToMonsterZh: '预言在诸神黄昏吞噬众神之父的巨狼',
    monsterToDeityEn: 'Allfather Fated to Fall to Fenrir’s Jaws', monsterToDeityZh: '注定葬身狼口的阿斯加德众神之父',
  },
  {
    deityId: 'odin', deityNameEn: 'Odin', deityNameZh: '奥丁',
    monsterId: 'mon-sleipnir', monsterNameEn: 'Sleipnir', monsterNameZh: '斯莱普尼尔',
    traditionId: 'norse', relationKind: 'mount',
    deityToMonsterEn: 'Eight-Legged Steed Spanning All Nine Worlds', deityToMonsterZh: '踏遍九界的八足神驹坐骑',
    monsterToDeityEn: 'Allfather Who Rides Sleipnir Into Helheim', monsterToDeityZh: '策马驰骋九界的坐骑之主奥丁',
  },
  {
    deityId: 'loki', deityNameEn: 'Loki', deityNameZh: '洛基',
    monsterId: 'mon-fenrir', monsterNameEn: 'Fenrir', monsterNameZh: '芬里尔',
    traditionId: 'norse', relationKind: 'kin',
    deityToMonsterEn: 'Firstborn Wolf Son With Angrboða', deityToMonsterZh: '洛基与女巨人安格尔伯达所生的长子魔狼',
    monsterToDeityEn: 'Trickster Father of the Three Apocalypse Beasts', monsterToDeityZh: '诞下北欧三大末世巨兽的诡计生父',
  },
  {
    deityId: 'loki', deityNameEn: 'Loki', deityNameZh: '洛基',
    monsterId: 'mon-jormungandr', monsterNameEn: 'Jörmungandr', monsterNameZh: '耶梦加得',
    traditionId: 'norse', relationKind: 'kin',
    deityToMonsterEn: 'Middle Serpent Child Cast Into Midgard’s Sea', deityToMonsterZh: '洛基次子，被投入中庭深海化为尘世巨蟒',
    monsterToDeityEn: 'Trickster Father Who Leads the Ship Naglfar', monsterToDeityZh: '率领末世死灵船出征的生父洛基',
  },
  {
    deityId: 'tyr', deityNameEn: 'Týr', deityNameZh: '提尔',
    monsterId: 'mon-fenrir', monsterNameEn: 'Fenrir', monsterNameZh: '芬里尔',
    traditionId: 'norse', relationKind: 'nemesis',
    deityToMonsterEn: 'Wolf That Bit Off Týr’s Oath-Pledged Right Hand', deityToMonsterZh: '在格莱普尼尔誓约中咬断提尔右手的巨狼',
    monsterToDeityEn: 'War-God Who Sacrificed His Hand to Bind Fenrir', monsterToDeityZh: '以右手为誓将芬里尔捆缚的战神',
  },
  {
    deityId: 'tyr', deityNameEn: 'Týr', deityNameZh: '提尔',
    monsterId: 'mon-garmr', monsterNameEn: 'Garmr', monsterNameZh: '加姆',
    traditionId: 'norse', relationKind: 'nemesis',
    deityToMonsterEn: 'Blood-Chested Hel-Hound Fated to Slay Týr', deityToMonsterZh: '诸神黄昏与提尔同归于尽的冥门恶犬',
    monsterToDeityEn: 'One-Handed War-God Locked in Mutual Combat', monsterToDeityZh: '注定与加姆决死的独臂战神',
  },
  {
    deityId: 'hel', deityNameEn: 'Hel', deityNameZh: '赫尔',
    monsterId: 'mon-nidhoggr', monsterNameEn: 'Níðhöggr', monsterNameZh: '尼德霍格',
    traditionId: 'norse', relationKind: 'guardian',
    deityToMonsterEn: 'Corpse-Gnawing Dragon Beneath Hel’s Domain', deityToMonsterZh: '盘踞于冥国树根之下啃噬尸骸的毒龙',
    monsterToDeityEn: 'Ruler of Helheim & Niflheim’s Dead', monsterToDeityZh: '统御冥界与尼福尔海姆的死亡女王',
  },
  {
    deityId: 'freya', deityNameEn: 'Freyja', deityNameZh: '弗蕾亚',
    monsterId: 'mon-gullinbursti', monsterNameEn: 'Gullinbursti & Sæhrímnir', monsterNameZh: '古林博斯帝与塞赫里姆尼尔',
    traditionId: 'norse', relationKind: 'companion',
    deityToMonsterEn: 'Golden-Bristled Boar of the Vanir Siblings', deityToMonsterZh: '华纳神族兄妹的黄金鬃毛神猪',
    monsterToDeityEn: 'Vanir Goddess of Battle-Boar Hildisvíni', monsterToDeityZh: '同样拥有神猪坐骑的华纳女神',
  },

  // EGYPTIAN
  {
    deityId: 'ra', deityNameEn: 'Ra', deityNameZh: '拉',
    monsterId: 'mon-apophis', monsterNameEn: 'Apophis', monsterNameZh: '阿波菲斯',
    traditionId: 'egyptian', relationKind: 'nemesis',
    deityToMonsterEn: 'Nightly Chaos-Serpent Ambushing the Solar Barque', deityToMonsterZh: '每夜在冥河伏击太阳船的混沌大蛇',
    monsterToDeityEn: 'Solar Sovereign Whose Dawn Barque Apophis Seeks to Swallow', monsterToDeityZh: '阿波菲斯永世企图吞噬的太阳主神',
  },
  {
    deityId: 'ra', deityNameEn: 'Ra', deityNameZh: '拉',
    monsterId: 'mon-uraeus', monsterNameEn: 'Uraeus (Wadjet)', monsterNameZh: '乌赖乌斯圣蛇',
    traditionId: 'egyptian', relationKind: 'guardian',
    deityToMonsterEn: 'Fiery Cobra Crown Spitting Flame at Ra’s Foes', deityToMonsterZh: '盘踞太阳神额前喷吐圣火的护卫灵蛇',
    monsterToDeityEn: 'Sun-King Whose Brow the Sacred Cobra Crowns', monsterToDeityZh: '额佩乌赖乌斯圣蛇的太阳之王',
  },
  {
    deityId: 'ra', deityNameEn: 'Ra', deityNameZh: '拉',
    monsterId: 'mon-bennu', monsterNameEn: 'Bennu', monsterNameZh: '本努鸟',
    traditionId: 'egyptian', relationKind: 'companion',
    deityToMonsterEn: 'Solar Heron-Ba of Heliopolis & Eternal Rebirth', deityToMonsterZh: '赫利奥波利斯象征太阳重生的不死圣鸟',
    monsterToDeityEn: 'Solar Creator Whose Living Soul (Ba) Bennu Embodies', monsterToDeityZh: '本努圣鸟所化现的太阳造物主',
  },
  {
    deityId: 'set', deityNameEn: 'Set', deityNameZh: '塞特',
    monsterId: 'mon-apophis', monsterNameEn: 'Apophis', monsterNameZh: '阿波菲斯',
    traditionId: 'egyptian', relationKind: 'nemesis',
    deityToMonsterEn: 'Serpent Speared Nightly by Set From the Solar Prow', deityToMonsterZh: '每夜在太阳船船头被塞特长矛刺退的魔蛇',
    monsterToDeityEn: 'Storm-Champion Defending Ra’s Barque Against Chaos', monsterToDeityZh: '镇守太阳船船头抵御混沌的风暴战神',
  },
  {
    deityId: 'set', deityNameEn: 'Set', deityNameZh: '塞特',
    monsterId: 'mon-sha-beast', monsterNameEn: 'Sha (Set-Animal)', monsterNameZh: '沙兽 / 赛特圣兽',
    traditionId: 'egyptian', relationKind: 'companion',
    deityToMonsterEn: 'Enigmatic Totemic Chimera of Set’s Own Head', deityToMonsterZh: '塞特神首与神徽所化现的神秘沙漠异兽',
    monsterToDeityEn: 'Desert Storm-God Embodied by the Sha-Beast', monsterToDeityZh: '以沙兽为圣像化身的沙漠风暴之神',
  },
  {
    deityId: 'anubis', deityNameEn: 'Anubis', deityNameZh: '阿努比斯',
    monsterId: 'mon-ammit', monsterNameEn: 'Ammit', monsterNameZh: '阿米特',
    traditionId: 'egyptian', relationKind: 'guardian',
    deityToMonsterEn: 'Heart-Devourer Waiting Beneath Anubis’s Scales', deityToMonsterZh: '蹲伏于阿努比斯称心天平之下的噬心巨兽',
    monsterToDeityEn: 'Jackal-Headed Weigher of Souls Beside Ammit', monsterToDeityZh: '在旁司掌心脏秤量审判的胡狼头神',
  },
  {
    deityId: 'osiris', deityNameEn: 'Osiris', deityNameZh: '奥西里斯',
    monsterId: 'mon-medjed', monsterNameEn: 'Medjed ("The Smiter")', monsterNameZh: '梅杰德',
    traditionId: 'egyptian', relationKind: 'guardian',
    deityToMonsterEn: 'Invisible Eye-Beam Guardian of Osiris’s House', deityToMonsterZh: '护卫奥西里斯冥殿的无形目射圣灵',
    monsterToDeityEn: 'Lord of the Duat Whose House Medjed Protects', monsterToDeityZh: '梅杰德在《亡灵书》中誓守的冥王',
  },
  {
    deityId: 'thoth', deityNameEn: 'Thoth', deityNameZh: '托特',
    monsterId: 'mon-babi', monsterNameEn: 'Babi', monsterNameZh: '巴比神狒',
    traditionId: 'egyptian', relationKind: 'companion',
    deityToMonsterEn: 'Fierce Underworld Baboon Counterpart of Moon-Wisdom', deityToMonsterZh: '与托特圣狒相对的冥界凶猛狒狒神兽',
    monsterToDeityEn: 'Ibis & Baboon Scribe Recording the Soul’s Verdict', monsterToDeityZh: '同样以狒狒为圣像的智慧书记神',
  },
  {
    deityId: 'horus', deityNameEn: 'Horus', deityNameZh: '荷鲁斯',
    monsterId: 'mon-sphinx', monsterNameEn: 'Great Sphinx', monsterNameZh: '斯芬克斯',
    traditionId: 'egyptian', relationKind: 'guardian',
    deityToMonsterEn: 'Solar Lion-King Monument (Harmachis / Horus-in-Horizon)', deityToMonsterZh: '化作“地平线上的荷鲁斯”的狮身人面圣像',
    monsterToDeityEn: 'Falcon Sky-King Revered as Harmachis at Giza', monsterToDeityZh: '吉萨巨像所奉祀的苍穹鹰神荷鲁斯',
  },

  // HINDU
  {
    deityId: 'indra', deityNameEn: 'Indra', deityNameZh: '因陀罗',
    monsterId: 'mon-vritra', monsterNameEn: 'Vritra', monsterNameZh: '弗栗多',
    traditionId: 'hindu', relationKind: 'nemesis',
    deityToMonsterEn: 'Drought-Dragon Slain by Indra’s Vajra to Free the Rivers', deityToMonsterZh: '被因陀罗金刚杵斩杀以释放七河的旱灾魔龙',
    monsterToDeityEn: 'Vedic Storm-King (Vritrahan — Slayer of Vritra)', monsterToDeityZh: '以“弗栗多斩杀者”著称的吠陀雷神',
  },
  {
    deityId: 'indra', deityNameEn: 'Indra', deityNameZh: '因陀罗',
    monsterId: 'mon-airavata', monsterNameEn: 'Airavata', monsterNameZh: '艾拉瓦塔',
    traditionId: 'hindu', relationKind: 'mount',
    deityToMonsterEn: 'Four-Tusked Cloud-Elephant Mount Born of the Churning Ocean', deityToMonsterZh: '搅乳海诞生的四牙白云神象坐骑',
    monsterToDeityEn: 'King of Heaven Who Rides Airavata Through Monsoon Skies', monsterToDeityZh: '乘云象行雨的天界雷王',
  },
  {
    deityId: 'vishnu', deityNameEn: 'Vishnu', deityNameZh: '毗湿奴',
    monsterId: 'mon-garuda', monsterNameEn: 'Garuda', monsterNameZh: '迦楼罗',
    traditionId: 'hindu', relationKind: 'mount',
    deityToMonsterEn: 'Golden Solar Eagle-Mount & Enemy of Serpents', deityToMonsterZh: '金色大鹏金翅鸟坐骑与那伽天敌',
    monsterToDeityEn: 'Cosmic Preserver Whose Vahana Garuda Is', monsterToDeityZh: '迦楼罗誓为坐骑的宇宙守护神',
  },
  {
    deityId: 'vishnu', deityNameEn: 'Vishnu', deityNameZh: '毗湿奴',
    monsterId: 'mon-vasuki', monsterNameEn: 'Vasuki & Shesha', monsterNameZh: '婆苏吉与舍沙',
    traditionId: 'hindu', relationKind: 'companion',
    deityToMonsterEn: 'Thousand-Hooded Cosmic Serpent Couch (Ananta-Shesha)', deityToMonsterZh: '承载毗湿奴安眠宇宙之海的千首龙床',
    monsterToDeityEn: 'Preserver Resting Upon Shesha Between Yugas', monsterToDeityZh: '安卧于无尽龙王之上的维护主神',
  },
  {
    deityId: 'shiva', deityNameEn: 'Shiva', deityNameZh: '湿婆',
    monsterId: 'mon-vasuki', monsterNameEn: 'Vasuki & Shesha', monsterNameZh: '婆苏吉与舍沙',
    traditionId: 'hindu', relationKind: 'companion',
    deityToMonsterEn: 'Naga-King Coiled Around Shiva’s Blue Throat', deityToMonsterZh: '盘绕湿婆青喉的龙王颈饰',
    monsterToDeityEn: 'Lord Who Drank Halahala Venom & Wears Vasuki', monsterToDeityZh: '饮尽剧毒并佩戴龙王的毁灭与再生之神',
  },
  {
    deityId: 'shiva', deityNameEn: 'Shiva', deityNameZh: '湿婆',
    monsterId: 'mon-narasimha-sharabha', monsterNameEn: 'Sharabha & Gandaberunda', monsterNameZh: '舍罗婆与甘达贝伦达',
    traditionId: 'hindu', relationKind: 'companion',
    deityToMonsterEn: 'Eight-Legged Winged Lion-Bird Incarnation of Shiva', deityToMonsterZh: '湿婆为平息狮面化身狂怒所显化的八足神兽',
    monsterToDeityEn: 'Ascetic Lord Who Manifested as Sharabha', monsterToDeityZh: '化现舍罗婆神兽的大神湿婆',
  },
  {
    deityId: 'durga', deityNameEn: 'Durga', deityNameZh: '杜尔迦',
    monsterId: 'mon-rakshasa', monsterNameEn: 'Rakshasa', monsterNameZh: '罗刹',
    traditionId: 'hindu', relationKind: 'nemesis',
    deityToMonsterEn: 'Shapeshifting Asura & Rakshasa Armies Vanquished by Durga', deityToMonsterZh: '遭杜尔迦女神十臂神兵荡平的幻形魔众',
    monsterToDeityEn: 'Invincible Warrior Goddess Slayer of Demon Kings', monsterToDeityZh: '降伏无数阿修罗与罗刹的无敌战女神',
  },

  // CHINESE
  {
    deityId: 'nuwa', deityNameEn: 'Nuwa', deityNameZh: '女娲',
    monsterId: 'mon-yinglong', monsterNameEn: 'Yinglong', monsterNameZh: '应龙',
    traditionId: 'chinese', relationKind: 'companion',
    deityToMonsterEn: 'Winged Primeval Dragon Assisting Flood-Taming Order', deityToMonsterZh: '助大禹画地成川、镇服水患的上古翼龙',
    monsterToDeityEn: 'Sky-Mending Serpent Mother of High Antiquity', monsterToDeityZh: '炼石补天、造人定序的创世母神',
  },
  {
    deityId: 'jade-emperor', deityNameEn: 'Jade Emperor', deityNameZh: '玉皇大帝',
    monsterId: 'mon-qilin', monsterNameEn: 'Qilin', monsterNameZh: '麒麟',
    traditionId: 'chinese', relationKind: 'guardian',
    deityToMonsterEn: 'Auspicious Beast Signaling Heaven’s Righteous Mandate', deityToMonsterZh: '彰显天道仁德与圣主临世的祥瑞神兽',
    monsterToDeityEn: 'Celestial Bureaucracy Sovereign of Moral Harmony', monsterToDeityZh: '执掌天庭秩序的至高天帝',
  },
  {
    deityId: 'sun-wukong', deityNameEn: 'Sun Wukong', deityNameZh: '孙悟空',
    monsterId: 'mon-jiuweihu-qingqiu', monsterNameEn: 'Qingqiu Fox & Fenghuang', monsterNameZh: '青丘九尾狐与凤凰',
    traditionId: 'chinese', relationKind: 'companion',
    deityToMonsterEn: 'Classic Shapeshifting Spirit-Lineage of Mountain & Sea', deityToMonsterZh: '同属华夏山海幻形精怪传说的九尾灵狐',
    monsterToDeityEn: 'Great Sage of 72 Earthly Transformations', monsterToDeityZh: '精通七十二变幻形神通的齐天大圣',
  },
  {
    deityId: 'xiwangmu', deityNameEn: 'Xiwangmu', deityNameZh: '西王母',
    monsterId: 'mon-baize', monsterNameEn: 'Baize (White Marsh)', monsterNameZh: '白泽',
    traditionId: 'chinese', relationKind: 'companion',
    deityToMonsterEn: 'Omniscient Kunlun-Era Spirit Cataloger of 11,520 Beasts', deityToMonsterZh: '通晓天下万一千五百二十种精怪名录的祥瑞神兽',
    monsterToDeityEn: 'Queen Mother of Kunlun & Guardian of Immortality', monsterToDeityZh: '坐镇昆仑瑶池、司掌长生与天厉的西王母',
  },
  {
    deityId: 'erlang-shen', deityNameEn: 'Erlang Shen', deityNameZh: '二郎神',
    monsterId: 'mon-taotie', monsterNameEn: 'Taotie', monsterNameZh: '饕餮',
    traditionId: 'chinese', relationKind: 'nemesis',
    deityToMonsterEn: 'Gluttonous Chaos Fiend Guarded Against by Celestial Law', deityToMonsterZh: '象征贪婪失序、为天界战神所镇压的四凶之首',
    monsterToDeityEn: 'Three-Eyed Heavenly Enforcer & Monster-Subduer', monsterToDeityZh: '执三尖两刃刀降妖除魔的显圣真君',
  },

  // JAPANESE
  {
    deityId: 'susanoo', deityNameEn: 'Susanoo', deityNameZh: '素盏呜尊',
    monsterId: 'mon-orochi', monsterNameEn: 'Yamata-no-Orochi', monsterNameZh: '八岐大蛇',
    traditionId: 'japanese', relationKind: 'nemesis',
    deityToMonsterEn: 'Eight-Headed River Dragon Slain for Kusanagi Sword', deityToMonsterZh: '被八盐折酒灌醉斩杀并得草薙剑的八首妖蛇',
    monsterToDeityEn: 'Storm-God Who Slew Orochi Along the Hi River', monsterToDeityZh: '在斐伊川智斩八岐大蛇的风暴之神',
  },
  {
    deityId: 'inari', deityNameEn: 'Inari Ōkami', deityNameZh: '稻荷大神',
    monsterId: 'mon-kitsune', monsterNameEn: 'Kyūbi no Kitsune', monsterNameZh: '九尾狐',
    traditionId: 'japanese', relationKind: 'companion',
    deityToMonsterEn: 'Fox-Spirit Messengers & Nine-Tailed Shapeshifter Lore', deityToMonsterZh: '既为稻荷神使、亦化九尾妖狐的灵狐谱系',
    monsterToDeityEn: 'Shinto Patron of Rice, Forges & White Fox Messengers', monsterToDeityZh: '以白狐为神使的丰穰与商贸大神',
  },
  {
    deityId: 'raijin-fujin', deityNameEn: 'Raijin & Fūjin', deityNameZh: '雷神与风神',
    monsterId: 'mon-nue', monsterNameEn: 'Nue', monsterNameZh: '鵺',
    traditionId: 'japanese', relationKind: 'nemesis',
    deityToMonsterEn: 'Black Storm-Cloud Chimera Roaring Over the Imperial Roof', deityToMonsterZh: '乘黑云降临皇宫上空、声如雷鸣的妖兽鵺',
    monsterToDeityEn: 'Tempest Deities Governing Thunderheads & Gale Winds', monsterToDeityZh: '执掌雷云飓风的日本风雷二神',
  },
  {
    deityId: 'izanami', deityNameEn: 'Izanami', deityNameZh: '伊邪那美',
    monsterId: 'mon-gashadokuro', monsterNameEn: 'Gashadokuro', monsterNameZh: '饿者髑髅',
    traditionId: 'japanese', relationKind: 'kin',
    deityToMonsterEn: 'Towering Starvation-Skeleton Ghost of Unburied Dead', deityToMonsterZh: '由战死荒野无主白骨汇聚而成的巨型骷髅妖',
    monsterToDeityEn: 'Empress of Yomi-no-Kuni & Queen of the Dead', monsterToDeityZh: '坐镇黄泉国度、统领死者的幽冥女王',
  },
  {
    deityId: 'amaterasu', deityNameEn: 'Amaterasu', deityNameZh: '天照大神',
    monsterId: 'mon-tengu', monsterNameEn: 'Daitengu', monsterNameZh: '大天狗',
    traditionId: 'japanese', relationKind: 'guardian',
    deityToMonsterEn: 'Mountain-Peak Martial Spirits Bridging Shinto & Shugendō', deityToMonsterZh: '盘踞灵峰、兼护神佛圣域的山岳大天狗',
    monsterToDeityEn: 'Solar Sovereign of Takamagahara', monsterToDeityZh: '高天原太阳主神天照大神',
  },

  // MESOPOTAMIAN
  {
    deityId: 'marduk', deityNameEn: 'Marduk', deityNameZh: '马尔杜克',
    monsterId: 'mon-tiamat', monsterNameEn: 'Tiamat', monsterNameZh: '提阿玛特',
    traditionId: 'mesopotamian', relationKind: 'nemesis',
    deityToMonsterEn: 'Primordial Salt-Sea Dragon Cloven to Form Sky & Earth', deityToMonsterZh: '被风暴之箭剖开躯壳以化天地的太初咸水母龙',
    monsterToDeityEn: 'Babylonian Storm-Champion Who Slayed Tiamat', monsterToDeityZh: '率四风讨伐提阿玛特登基的巴比伦主神',
  },
  {
    deityId: 'marduk', deityNameEn: 'Marduk', deityNameZh: '马尔杜克',
    monsterId: 'mon-mushhushshu', monsterNameEn: 'Mušḫuššu', monsterNameZh: '穆什胡什',
    traditionId: 'mesopotamian', relationKind: 'mount',
    deityToMonsterEn: 'Scaled Horned Dragon Familiar Adorning the Ishtar Gate', deityToMonsterZh: '镌刻于伊什塔尔门上的马尔杜克圣龙坐骑',
    monsterToDeityEn: 'Patron God of Babylon Riding the Sacred Mushhushshu', monsterToDeityZh: '驾驭穆什胡什圣龙的巴比伦主神',
  },
  {
    deityId: 'ninurta', deityNameEn: 'Ninurta', deityNameZh: '尼努尔塔',
    monsterId: 'mon-anzu', monsterNameEn: 'Anzû (Imdugud)', monsterNameZh: '安祖鸟',
    traditionId: 'mesopotamian', relationKind: 'nemesis',
    deityToMonsterEn: 'Lion-Headed Storm-Bird Thief of the Tablet of Destinies', deityToMonsterZh: '盗走命运泥板的狮首风暴魔鸟',
    monsterToDeityEn: 'Warrior-God Who Clipped Anzû’s Pinions in Mid-Flight', monsterToDeityZh: '凌空斩翼夺回命运泥板的战神',
  },
  {
    deityId: 'ninurta', deityNameEn: 'Ninurta', deityNameZh: '尼努尔塔',
    monsterId: 'mon-asag', monsterNameEn: 'Asag (Azag)', monsterNameZh: '阿萨格石魔',
    traditionId: 'mesopotamian', relationKind: 'nemesis',
    deityToMonsterEn: 'Mountain Stone-Demon Whose Heat Boiled Rivers Alive', deityToMonsterZh: '酷热煮沸山川河鱼的巨石瘟魔',
    monsterToDeityEn: 'Hero-God Who Shattered Asag With His Talking Mace Sharur', monsterToDeityZh: '持神锤沙鲁尔粉碎阿萨格的苏美尔战神',
  },
  {
    deityId: 'enki', deityNameEn: 'Enki', deityNameZh: '恩基',
    monsterId: 'mon-apkallu', monsterNameEn: 'Apkallu (Seven Fish-Sages)', monsterNameZh: '阿普卡鲁七鱼圣',
    traditionId: 'mesopotamian', relationKind: 'companion',
    deityToMonsterEn: 'Seven Fish-Cloaked Culture Sages Sent From the Abzu', deityToMonsterZh: '由淡水深渊阿勃祖派往人间传授文明的七位鱼衣圣贤',
    monsterToDeityEn: 'Wisdom-God of Eridu Who Dispatched the Seven Sages', monsterToDeityZh: '派遣七鱼圣教化人类的埃里都智慧之神',
  },
  {
    deityId: 'inanna', deityNameEn: 'Inanna', deityNameZh: '伊南娜',
    monsterId: 'mon-gugalanna', monsterNameEn: 'Gugalanna & Girtablilu', monsterNameZh: '古伽兰那与蝎子人',
    traditionId: 'mesopotamian', relationKind: 'companion',
    deityToMonsterEn: 'Bull of Heaven Unleashed Upon Uruk Against Gilgamesh', deityToMonsterZh: '被伊南娜怒遣下凡践踏乌鲁克的天之神牛',
    monsterToDeityEn: 'Queen of Heaven Who Demanded the Bull From Anu', monsterToDeityZh: '向天神安努索借天牛降罚的天界女王',
  },
  {
    deityId: 'shamash', deityNameEn: 'Shamash', deityNameZh: '沙马什',
    monsterId: 'mon-humbaba', monsterNameEn: 'Humbaba', monsterNameZh: '胡姆巴巴',
    traditionId: 'mesopotamian', relationKind: 'nemesis',
    deityToMonsterEn: 'Cedar-Forest Giant Blinded by Shamash’s Thirteen Winds', deityToMonsterZh: '被沙马什十三狂风吹盲的雪松林巨守卫',
    monsterToDeityEn: 'Sun-God of Justice Who Aided Gilgamesh Against Humbaba', monsterToDeityZh: '召来狂风助吉尔伽美什破敌的正义太阳神',
  },

  // CELTIC
  {
    deityId: 'lugh', deityNameEn: 'Lugh', deityNameZh: '卢格',
    monsterId: 'mon-balor', monsterNameEn: 'Balor', monsterNameZh: '巴罗尔',
    traditionId: 'celtic', relationKind: 'nemesis',
    deityToMonsterEn: 'Fomorian Grandfather Slain by Lugh’s Sling-Stone', deityToMonsterZh: '被外孙卢格以投石击穿死眼的弗莫尔独眼巨王',
    monsterToDeityEn: 'Multi-Skilled Grandson Who Fulfilled the Prophecy', monsterToDeityZh: '应验宿命预言亲手弑祖的全能光神',
  },
  {
    deityId: 'morrigan', deityNameEn: 'The Morrígan', deityNameZh: '摩莉甘',
    monsterId: 'mon-banshee', monsterNameEn: 'Bean Sídhe', monsterNameZh: '报丧女妖',
    traditionId: 'celtic', relationKind: 'kin',
    deityToMonsterEn: 'Keening Death-Herald Echoing the Morrígan’s Battlefield Omen', deityToMonsterZh: '承袭摩莉甘战场哀号与预言死讯的凯尔特哭丧灵',
    monsterToDeityEn: 'Sovereign War-Crow & Washer at the Ford', monsterToDeityZh: '化作渡口洗衣妇与战鸦预兆生死的战争女神',
  },
  {
    deityId: 'dagda', deityNameEn: 'The Dagda', deityNameZh: '达格达',
    monsterId: 'mon-salmon-of-knowledge', monsterNameEn: 'Bradán Feasa (Salmon of Knowledge)', monsterNameZh: '智慧鲑鱼布拉丹·费萨',
    traditionId: 'celtic', relationKind: 'companion',
    deityToMonsterEn: 'Boyne-River Salmon Fed on Nine Hazel-Nuts of Wisdom', deityToMonsterZh: '吞食博因河九颗智慧榛果的通灵神鲑',
    monsterToDeityEn: 'Lord of Brú na Bóinne Along the Sacred Boyne', monsterToDeityZh: '坐镇神圣博因河谷的凯尔特全善父神',
  },
  {
    deityId: 'manannan', deityNameEn: 'Manannán mac Lir', deityNameZh: '马纳南·麦克·利尔',
    monsterId: 'mon-kelpie', monsterNameEn: 'Kelpie', monsterNameZh: '凯尔皮',
    traditionId: 'celtic', relationKind: 'companion',
    deityToMonsterEn: 'Dark Aquatic Steed Echoing Manannán’s Wave-Riding Horses', deityToMonsterZh: '与海神白浪奔马遥相呼应的苏格兰水妖骏马',
    monsterToDeityEn: 'Sea-God Whose Chariot Skims the Irish Sea', monsterToDeityZh: '驾驭踏浪神驹纵横爱尔兰海的凯尔特海神',
  },

  // MESOAMERICAN
  {
    deityId: 'quetzalcoatl', deityNameEn: 'Quetzalcoatl', deityNameZh: '羽蛇神魁札尔科亚特尔',
    monsterId: 'mon-cipactli', monsterNameEn: 'Cipactli', monsterNameZh: '希帕克特利',
    traditionId: 'mesoamerican', relationKind: 'nemesis',
    deityToMonsterEn: 'Primeval Caiman Torn in Two to Build Heaven & Earth', deityToMonsterZh: '与特斯卡特利波卡联手撕裂化为天地的太初鳄怪',
    monsterToDeityEn: 'Feathered-Serpent Co-Creator Who Split Cipactli', monsterToDeityZh: '撕裂希帕克特利开创天地的羽蛇创世神',
  },
  {
    deityId: 'quetzalcoatl', deityNameEn: 'Quetzalcoatl', deityNameZh: '羽蛇神魁札尔科亚特尔',
    monsterId: 'mon-xolotl-beast', monsterNameEn: 'Xolotl Hound & Vision Serpent', monsterNameZh: '索洛特尔引魂犬与幻象神蛇',
    traditionId: 'mesoamerican', relationKind: 'kin',
    deityToMonsterEn: 'Canine Evening-Star Twin & Underworld Guide', deityToMonsterZh: '羽蛇神司掌昏星与冥途接引的双生犬首孪生弟',
    monsterToDeityEn: 'Morning-Star Feathered Serpent Twin Brother', monsterToDeityZh: '司掌晨星与风息的羽蛇孪生兄长',
  },
  {
    deityId: 'tezcatlipoca', deityNameEn: 'Tezcatlipoca', deityNameZh: '特斯卡特利波卡',
    monsterId: 'mon-cipactli', monsterNameEn: 'Cipactli', monsterNameZh: '希帕克特利',
    traditionId: 'mesoamerican', relationKind: 'nemesis',
    deityToMonsterEn: 'Earth-Monster That Bit Off Tezcatlipoca’s Foot as Bait', deityToMonsterZh: '咬断烟雾镜神右足作诱饵的太初鳄兽',
    monsterToDeityEn: 'Smoking-Mirror God Who Baited Cipactli With His Foot', monsterToDeityZh: '舍足为饵诱捕希帕克特利的黑曜石镜神',
  },
  {
    deityId: 'tezcatlipoca', deityNameEn: 'Tezcatlipoca', deityNameZh: '特斯卡特利波卡',
    monsterId: 'mon-nagual', monsterNameEn: 'Tepeyollotl & Nagual Jaguar', monsterNameZh: '特佩约洛特尔与纳瓦尔灵豹',
    traditionId: 'mesoamerican', relationKind: 'companion',
    deityToMonsterEn: 'Night-Jaguar Avatar & Mountain-Heart Shapeshifter', deityToMonsterZh: '烟雾镜神化身的山心美洲豹与灵豹幻形',
    monsterToDeityEn: 'Lord of the Night Sky & Jaguar Sorcery', monsterToDeityZh: '执掌黑夜星空与美洲豹秘术的主神',
  },
  {
    deityId: 'huitzilopochtli', deityNameEn: 'Huitzilopochtli', deityNameZh: '维齐洛波奇特利',
    monsterId: 'mon-xiuhcoatl', monsterNameEn: 'Xiuhcoatl', monsterNameZh: '希乌科亚特尔',
    traditionId: 'mesoamerican', relationKind: 'companion',
    deityToMonsterEn: 'Turquoise Fire-Serpent Wielded as a Living Solar Weapon', deityToMonsterZh: '化作太阳战神手中炽焰神兵的绿松石火蛇',
    monsterToDeityEn: 'Solar War-God Wielding Xiuhcoatl at Coatepec', monsterToDeityZh: '在蛇山挥舞火蛇斩灭群星的阿兹特克太阳神',
  },
  {
    deityId: 'tlaloc', deityNameEn: 'Tlaloc', deityNameZh: '特拉洛克',
    monsterId: 'mon-ahuizotl', monsterNameEn: 'Ahuizotl', monsterNameZh: '阿维索特尔',
    traditionId: 'mesoamerican', relationKind: 'guardian',
    deityToMonsterEn: 'Hand-Tailed Lake Beast Collecting Souls for Tlalocan', deityToMonsterZh: '尾生人手、替雨神水国搜寻溺者魂魄的湖怪',
    monsterToDeityEn: 'Rain-Lord Whose Paradise Tlalocan Receives Ahuizotl’s Chosen', monsterToDeityZh: '遣派阿维索特尔司掌湖泽的雨神',
  },
  {
    deityId: 'mictlantecuhtli', deityNameEn: 'Mictlantecuhtli', deityNameZh: '米克特兰特库特利',
    monsterId: 'mon-camazotz', monsterNameEn: 'Camazotz', monsterNameZh: '卡玛佐兹',
    traditionId: 'mesoamerican', relationKind: 'guardian',
    deityToMonsterEn: 'Blade-Nosed Death-Bat of the Underworld Cavern Trials', deityToMonsterZh: '盘踞幽冥洞窟、斩首试炼英雄的吸血死神蝠',
    monsterToDeityEn: 'Skeletal Sovereign of the Ninth Underworld Tier', monsterToDeityZh: '统御九层幽冥密克特兰的骸骨死神',
  },

  // YORUBA
  {
    deityId: 'shango', deityNameEn: 'Shango', deityNameZh: '珊戈',
    monsterId: 'mon-oshumare', monsterNameEn: 'Oshumare', monsterNameZh: '奥舒马雷',
    traditionId: 'yoruba', relationKind: 'companion',
    deityToMonsterEn: 'Rainbow-Python Herald Spanning Heaven After Shango’s Storms', deityToMonsterZh: '在珊戈雷雨之后架起彩虹天桥的巨蟒神使',
    monsterToDeityEn: 'Thunder-King Whose Storms Oshumare Crowns With Rainbows', monsterToDeityZh: '每逢雷霆骤雨后与彩虹巨蟒呼应的雷王',
  },
  {
    deityId: 'shango', deityNameEn: 'Shango', deityNameZh: '珊戈',
    monsterId: 'mon-ekun', monsterNameEn: 'Ekun', monsterNameZh: '皇家圣豹埃昆',
    traditionId: 'yoruba', relationKind: 'companion',
    deityToMonsterEn: 'Royal Leopard Emblem of Aláàfin Kingship & Thunder', deityToMonsterZh: '象征奥约王权与雷王威仪的皇家圣豹',
    monsterToDeityEn: 'Deified Fourth Aláàfin of Ọ̀yọ́ & Thunder Orisha', monsterToDeityZh: '以圣豹为王权图腾的雷霆奥里沙',
  },
  {
    deityId: 'eshu', deityNameEn: 'Eshu', deityNameZh: '埃舒',
    monsterId: 'mon-ijapa', monsterNameEn: 'Ìjàpá Tìrókò (Tortoise Trickster)', monsterNameZh: '伊贾帕诡计陆龟',
    traditionId: 'yoruba', relationKind: 'companion',
    deityToMonsterEn: 'Folkloric Trickster-Tortoise Echoing Crossroads Wit', deityToMonsterZh: '与十字路口诡计神遥相呼应的约鲁巴机智陆龟',
    monsterToDeityEn: 'Crossroads Orisha & Master of Cosmic Irony', monsterToDeityZh: '司掌十字路口与机锋考验的奥里沙',
  },
  {
    deityId: 'orunmila', deityNameEn: 'Orunmila', deityNameZh: '奥伦米拉',
    monsterId: 'mon-agemo', monsterNameEn: 'Agemo', monsterNameZh: '阿格莫创世变色龙',
    traditionId: 'yoruba', relationKind: 'companion',
    deityToMonsterEn: 'Creation Chameleon Testing Primeval Earth’s Firmness', deityToMonsterZh: '步履轻盈检验初生大地坚实度的创世变色龙',
    monsterToDeityEn: 'Witness of Destiny & Master of Ifá Divination', monsterToDeityZh: '见证创世天命的伊法占卜智慧之神',
  },
  {
    deityId: 'ogun', deityNameEn: 'Ogun', deityNameZh: '奥贡',
    monsterId: 'mon-ajogun', monsterNameEn: 'Eleye & Ajogun', monsterNameZh: '埃莱耶与阿乔贡',
    traditionId: 'yoruba', relationKind: 'nemesis',
    deityToMonsterEn: 'Eight Cosmic Adversaries Held Back by Iron & Ritual', deityToMonsterZh: '被铁神威严与祭仪挡在人间之外的八大灾厄灵',
    monsterToDeityEn: 'Iron-Forger & Clearing-Path Guardian Against Affliction', monsterToDeityZh: '以玄铁辟路、镇御灾厄的战与铁之神',
  },
  {
    deityId: 'yemoja', deityNameEn: 'Yemoja', deityNameZh: '耶莫贾',
    monsterId: 'mon-olokun-leviathan', monsterNameEn: 'Olokun’s Abyssal Python', monsterNameZh: '奥洛坤深渊海蟒',
    traditionId: 'yoruba', relationKind: 'guardian',
    deityToMonsterEn: 'Abyssal Deep-Sea Serpent Guarding Ocean Treasures', deityToMonsterZh: '守护无尽海渊珍宝与潮汐律动的深海巨蟒',
    monsterToDeityEn: 'Ocean-Mother Protecting Voyagers & Coastal Waters', monsterToDeityZh: '庇佑生灵与海岸潮汐的海洋母神',
  },
];

const LINKS_BY_ID: Record<string, CrossRealmLink[]> = {};

for (const p of CURATED_PAIRS) {
  if (!LINKS_BY_ID[p.deityId]) LINKS_BY_ID[p.deityId] = [];
  LINKS_BY_ID[p.deityId].push({
    targetId: p.monsterId,
    targetRealm: 'bestiary',
    traditionId: p.traditionId,
    targetNameEn: p.monsterNameEn,
    targetNameZh: p.monsterNameZh,
    relationKind: p.relationKind,
    relationEn: p.deityToMonsterEn,
    relationZh: p.deityToMonsterZh,
  });

  if (!LINKS_BY_ID[p.monsterId]) LINKS_BY_ID[p.monsterId] = [];
  LINKS_BY_ID[p.monsterId].push({
    targetId: p.deityId,
    targetRealm: 'pantheons',
    traditionId: p.traditionId,
    targetNameEn: p.deityNameEn,
    targetNameZh: p.deityNameZh,
    relationKind: p.relationKind,
    relationEn: p.monsterToDeityEn,
    relationZh: p.monsterToDeityZh,
  });
}

export function getCrossRealmLinks(id: string): CrossRealmLink[] {
  return LINKS_BY_ID[id] ?? [];
}
