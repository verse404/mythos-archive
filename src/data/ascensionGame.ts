import type { TraditionId } from '../types/mythology';

export type DndAbility = 'might' | 'wisdom' | 'dominion';

export type EndingTier = 'deity' | 'alternate' | 'failure';

export interface DndSkillCheck {
  ability: DndAbility;
  dc: number;
}

export interface DndChoice {
  id: string;
  title: string;
  subtitle: string;
  flavorTag: string;
  tone: 'check' | 'pact' | 'hubris';
  check?: DndSkillCheck;
  /** Target node ID if check succeeds (or immediately when no check is required) */
  nextNodeId: string;
  /** Target node ID if the D20 skill check fails */
  failNodeId?: string;
  successNarrative: string;
  failNarrative?: string;
  mythicNote: string;
  statDelta?: Partial<Record<DndAbility, number>>;
  resolveDelta?: number;
  failResolveDelta?: number;
  unlockedRelic?: {
    name: string;
    bonusAbility: DndAbility;
    bonusValue: number;
  };
}

export interface DndEncounterNode {
  id: string;
  kind: 'encounter';
  chapterLabel: string;
  rankTitle: string;
  title: string;
  location: string;
  platePath: string;
  mapX: number;
  mapY: number;
  dmPrompt: string;
  choices: DndChoice[];
}

export interface DndEndingNode {
  id: string;
  kind: 'ending';
  endingTier: EndingTier;
  badgeLabel: string;
  title: string;
  subtitle: string;
  location: string;
  platePath: string;
  mapX: number;
  mapY: number;
  epilogue: string;
  mythicComparison: string;
}

export type CampaignNode = DndEncounterNode | DndEndingNode;

export interface MapEdge {
  from: string;
  to: string;
  style: 'canonical' | 'branch' | 'doom';
}

export interface AscensionSaga {
  id: string;
  deityId: string;
  traditionId: TraditionId;
  dndClass: string;
  mortalOrOriginName: string;
  ascendedTitle: string;
  subtitle: string;
  startingStats: Record<DndAbility, number>;
  startingResolve: number;
  startNodeId: string;
  nodes: Record<string, CampaignNode>;
  mapEdges: MapEdge[];
}

export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export interface StartingBoon {
  id: string;
  label: string;
  bonusAbility: DndAbility;
  description: string;
}

export const STARTING_BOONS: StartingBoon[] = [
  {
    id: 'boon-wisdom',
    label: 'Oracle-Touched Seer',
    bonusAbility: 'wisdom',
    description: '+1 Wisdom · Attuned to riddles, omens, and hidden gates',
  },
  {
    id: 'boon-might',
    label: 'Crucible-Tempered Champion',
    bonusAbility: 'might',
    description: '+1 Might · Unflinching before fire, serpents, and ordeal',
  },
  {
    id: 'boon-dominion',
    label: 'Star-Crowned Sovereign',
    bonusAbility: 'dominion',
    description: '+1 Dominion · Commanding presence in divine & mortal courts',
  },
];

export const ASCENSION_SAGAS: AscensionSaga[] = [
  // =========================================================================
  // CAMPAIGN 1: SUN WUKONG (CHINESE MYTHOLOGY — JOURNEY TO THE WEST)
  // =========================================================================
  {
    id: 'wukong',
    deityId: 'sun-wukong',
    traditionId: 'chinese',
    dndClass: 'Stone-Born Mystic Rebel',
    mortalOrOriginName: 'Stone Monkey of Mount Huaguo',
    ascendedTitle: 'Sun Wukong — Victorious Fighting Buddha',
    subtitle: 'Roll fate from mortal mountain monkey to rebel Great Sage or Victorious Buddha',
    startingStats: { might: 15, wisdom: 12, dominion: 13 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · THE MORTAL THRESHOLD',
        rankTitle: 'Stone-Born King',
        title: 'The Waterfall Curtain & Yama’s Shadow',
        location: 'Mount of Flowers and Fruit (Huaguoshan)',
        platePath: '/plates/game/wukong-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Hatched from an immortal crag stone, you rule Water-Curtain Cave in joy—until an elder monkey dies before your eyes and you learn Hell’s King Yama still holds your mortal soul in his ledger.',
        choices: [
          {
            id: 'wk-1-raft',
            title: 'Sail the Southern Ocean Alone for a Daoist Master',
            subtitle: 'Brave storms on a bamboo raft to conquer mortality at its root',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Steering by starlight across ten years of tempests, you hear a woodcutter singing in the Western Continent’s pines and find Patriarch Subodhi’s hidden mountain gate!',
            failNarrative:
              'Tempests smash your raft onto Demon-King islands; hardened by sea-battles instead of quiet Daoist teaching, you drift toward the warlord path!',
            mythicNote: 'Journey to the West Ch. 1: true apotheosis begins by renouncing mortal comfort.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Name "Sun Wukong" (Awakened)',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'wk-1-warlord',
            title: 'Forge Demon-King Alliances & Arm Mount Huaguo',
            subtitle: 'Skip spiritual cultivation and prepare to storm Heaven by raw force',
            flavorTag: 'DIVERGENT WARLORD PACT',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Swearing brotherhood with the Bull Demon King, you drill forty-seven thousand monster-troops—choosing raw rebellion without inner Daoist mastery.',
            mythicNote: 'Power without cultivation leads straight toward Celestial confrontation.',
            statDelta: { might: 2 },
          },
          {
            id: 'wk-1-feast',
            title: 'Ignore Death & Feast Forever Inside the Cave',
            subtitle: 'Drown existential dread in wine and mortal kingship',
            flavorTag: 'FATAL COMPLACENCY',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'In the three-hundredth drunken banquet, two Ghost-Wardens rattle iron chains into your dream and drag your uncultivated soul into Diyu before dawn.',
            mythicNote: 'Without transcending the Five Phases, even a stone-born king falls to Yama’s ledger.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · ESOTERIC RIDDLE',
        rankTitle: 'Disciple of Emptiness',
        title: 'The Three Midnight Strikes of Patriarch Subodhi',
        location: 'Cave of the Slanting Moon & Three Stars',
        platePath: '/plates/game/wukong-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'When you refuse lesser arts that cannot outlast death, Patriarch Subodhi scolds you publicly, strikes your head three times with his ruler, walks inside with hands clasped behind his back, and bolts the front door.',
        choices: [
          {
            id: 'wk-2-riddle',
            title: 'Slip Through the Back Door at the Third Watch of Midnight',
            subtitle: 'Decode the silent Zen-Daoist gesture in total secrecy',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Subodhi smiles beside his lamp! Whispering the 72 Earthly Transformations and the 108,000-li Somersault Cloud into your ear, your body becomes deathless diamond!',
            failNarrative:
              'Arriving loudly at dawn instead of midnight, you learn only fragments of combat magic before being expelled from the mountain in disgrace!',
            mythicNote: 'Journey to the West Ch. 2: esoteric truth rewards silent discernment over pride.',
            statDelta: { wisdom: 2, might: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Jindouyun (Somersault Cloud)',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'wk-2-boast',
            title: 'Show Off Pine-Tree Shapeshifting to Senior Disciples',
            subtitle: 'Master basic magic quickly, then boast in the courtyard',
            flavorTag: 'HUBRIS SHORTCUT',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Subodhi sighs—"You will surely invite calamity!"—and banishes you back to the Eastern Sea with untamed arrogance burning in your chest.',
            mythicNote: 'Subodhi’s prophetic warning foreshadows Wukong’s war against Heaven.',
            statDelta: { might: 1 },
          },
          {
            id: 'wk-2-stormout',
            title: 'Shatter the Monastery Gate in Wounded Pride',
            subtitle: 'Refuse the master’s rebuke and challenge the mountain wardens',
            flavorTag: 'MIGHT CHECK · DC 16 (RECKLESS)',
            tone: 'check',
            check: { ability: 'might', dc: 16 },
            nextNodeId: 'branch-shadow',
            failNodeId: 'end-fail',
            successNarrative:
              'Barely surviving the guardian thunder-wards, you flee down the mountain with scorched fur and rogue fury.',
            failNarrative:
              'Celestial Dharma-bolts strike down your uninitiated mortal body on the temple steps.',
            mythicNote: 'Attacking an immortal sanctuary before awakening invites swift ruin.',
            failResolveDelta: -3,
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · CELESTIAL CRUCIBLE',
        rankTitle: 'Great Sage Equal to Heaven',
        title: 'Uproar in Heaven & Laozi’s Eight-Trigram Furnace',
        location: 'Dragon Palace of Ao Guang → Jade Palace Furnace',
        platePath: '/plates/game/wukong-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Wielding the 13,500-jin Ruyi Jingu Bang pillar from the Eastern Sea, you rout 100,000 Heavenly soldiers—until Erlang Shen’s snare seals you for forty-nine days inside Laozi’s roaring Samadhi-fire furnace!',
        choices: [
          {
            id: 'wk-3-xun',
            title: 'Crouch Under the "Xun" (Wind) Trigram Corner',
            subtitle: 'Use Eight-Trigram cosmology: where there is Wind, there is smoke but no flame',
            flavorTag: 'MIGHT CHECK · DC 14',
            tone: 'check',
            check: { ability: 'might', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'On the forty-ninth dawn you kick open the lid stronger than ever—smoke-tempered with Huoyan Jinjing (Fiery Golden Eyes that pierce every illusion)!',
            failNarrative:
              'Scorched half-blind by Samadhi fire, you burst out in uncontrolled berserk rage straight into Tathagata Buddha’s waiting palm!',
            mythicNote: 'Journey to the West Ch. 7: Daoist Bagua knowledge turns execution into alchemical tempering.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Ruyi Jingu Bang & Fiery Eyes',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'wk-3-smash',
            title: 'Usurp the Jade Emperor’s Throne by Pure Rampage',
            subtitle: 'Shatter the furnace and claim tyranny over the Three Realms',
            flavorTag: 'ROGUE USURPER PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Toppling the furnace in blinding fury, you scatter the Star-Lords—provoking Western Heaven to summon Tathagata Buddha himself!',
            mythicNote: 'Raw power shakes Heaven, yet cannot outleap cosmic interdependence.',
            statDelta: { might: 2 },
          },
          {
            id: 'wk-3-surrender',
            title: 'Extinguish Your Inner Qi & Surrender to the Elixir Flame',
            subtitle: 'Let Laozi’s alchemical fire dissolve your immortal essence',
            flavorTag: 'FATAL SURRENDER',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Yielding your breath inside the bronze cauldron, your spirit melts back into inert Kunlun cinder-ash.',
            mythicNote: 'In neidan alchemy, slackening intent inside the furnace dissolves the spirit.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · THE REBEL’S GAMBIT',
        rankTitle: 'Unfettered Demon Sovereign',
        title: 'The Wager on Tathagata Buddha’s Palm',
        location: 'Pillars of the World’s Edge / Five-Elements Crag',
        platePath: '/plates/retellings/theft-of-fire-chinese.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Your untamed path has brought all Heaven to a standstill! Tathagata Buddha extends one serene golden hand: "Leap off my palm and rule the skies; fail, and accept five centuries of penance—or strike now in eternal defiance."',
        choices: [
          {
            id: 'wk-sh-redeem',
            title: 'Humble Your Pride & Accept Bodhisattva Guanyin’s Vow',
            subtitle: 'Endure Five-Elements Mountain willingly to walk the Western Pilgrimage',
            flavorTag: 'DOMINION CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'dominion', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Swallowing bitter pride beneath the mountain until Tang Sanzang arrives, you rise tempered in patience—rejoining the sacred road to Vulture Peak!',
            failNarrative:
              'Refusing Guanyin’s golden fillet even beneath crushing stone, the six-syllable Sanskrit talisman binds you permanently under Five-Elements Mountain!',
            mythicNote: 'Guanyin’s compassion bridges Wukong’s rebellion and his eventual Buddhahood.',
            statDelta: { wisdom: 2, dominion: 2 },
          },
          {
            id: 'wk-sh-seal',
            title: 'Roar Defiance Forever Beneath Five-Elements Mountain',
            subtitle: 'Refuse Heaven and Buddhism alike—remain an unbroken rebel legend',
            flavorTag: 'ALTERNATE ENDING PACT',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Fed iron pellets and molten copper yet never bowing your head, poets sing forever of the Unvanquished Great Sage sealed beneath the crag.',
            mythicNote: 'Divergent Fate: eternal rebel immortality without enlightenment.',
          },
          {
            id: 'wk-sh-attack',
            title: 'Swing Full-Force at Tathagata’s Crown Unprepared',
            subtitle: 'Bet your last spark of life against infinite cosmic law',
            flavorTag: 'MIGHT CHECK · DC 19 (LETHAL)',
            tone: 'check',
            check: { ability: 'might', dc: 19 },
            nextNodeId: 'end-alt',
            failNodeId: 'end-fail',
            successNarrative:
              'Your staff cracks the clouds before five mountain peaks slam down—sealing you alive in legend rather than death!',
            failNarrative:
              'Rebounding off infinite Dharma-light, your shattered stone essence scatters across the void.',
            mythicNote: 'Finite force shatters when hurled blindly against boundless emptiness (Śūnyatā).',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · APOTHEOSIS AT VULTURE PEAK',
        rankTitle: 'Guardian of the Sutras',
        title: 'The Bottomless Boat & Eighty-First Tribulation',
        location: 'Cloud-Crossing River → Spirit Mountain (Lingjiu Shan)',
        platePath: '/plates/game/wukong-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'After 108,000 miles guarding mortal monk Tang Sanzang through eighty-one demon trials, a bottomless ferryboat glides to Spirit Mountain’s shore while Sanzang’s discarded mortal corpse floats downstream!',
        choices: [
          {
            id: 'wk-4-ascend',
            title: 'Step Into the Bottomless Boat & Cast Off Ego',
            subtitle: '"Look! That floating shell was our old bondage—now we cross truly free!"',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'As the tightening golden headband vanishes by itself from your brow—because wisdom now needs no external restraint—Buddha enthrones you as Douzhanshengfo!',
            failNarrative:
              'Clinging to your war-pride on the threshold of Spirit Mountain, you turn back at the shore to reign instead as wild Immortal Sovereign of Mount Huaguo.',
            mythicNote: 'Journey to the West Ch. 98–100: when inner discipline is complete, the golden fillet disappears.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'wk-4-return',
            title: 'Leave the Sutras & Return to Rule Mount Huaguo Alone',
            subtitle: 'Decline Buddhahood to reign as carefree Earthly Immortal King',
            flavorTag: 'ALTERNATE IMMORTAL ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Bowing once to Sanzang, you somersault back across the clouds—never becoming a Buddha, yet reigning untamed over waterfalls and demon-kings.',
            mythicNote: 'Divergent Ending: Xian (Earthly Immortal) freedom rather than universal Buddhahood.',
          },
          {
            id: 'wk-4-seize',
            title: 'Steal the Palm-Leaf Scriptures by Force for Yourself',
            subtitle: 'Betray the pilgrimage at the very steps of Thunder Monastery',
            flavorTag: 'CORRUPTED FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'The Tightening-Crown Mantra blazes white-hot as Diamond Guardians cast your broken spirit back into the Six Mortal Realms.',
            mythicNote: 'Sutra wisdom stolen for ego turns instantly to ash.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Douzhanshengfo — Victorious Fighting Buddha',
        subtitle: 'Enthroned on Golden Lotus at Vulture Peak',
        location: 'Thunder Monastery, Spirit Mountain',
        platePath: '/plates/game/wukong-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You walked the true canonical path of Journey to the West! Having leaped the waterfall, decoded Patriarch Subodhi’s midnight riddle, tempered Fiery Golden Eyes in Laozi’s furnace, and transformed rebel strength into fearless compassion across eighty-one trials, the golden fillet vanishes from your brow forever.',
        mythicComparison:
          'In Chinese religious synthesis, Sun Wukong’s apotheosis unites Daoist inner alchemy (neidan), folk heroism, and Mahayana Buddhist awakening—proving the restless monkey-mind itself becomes enlightenment when harnessed to compassion.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · THE UNBOUND REBEL',
        title: 'Sealed Beneath Five-Elements Mountain',
        subtitle: 'Immortal Great Sage Who Never Bowed to Heaven',
        location: 'Jagged Crags of Wuxing Shan',
        platePath: '/plates/game/wukong-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your story diverged from Buddhahood into eternal defiance! Deathless yet unyielding, you remain the terrifying, folk-sung Great Sage Equal to Heaven—either sealed beneath Buddha’s golden six-syllable talisman or reigning wild over monster-kings outside Celestial law.',
        mythicComparison:
          'To reach Sun Wukong’s true canonical godhood (Douzhanshengfo), pair his raw Daoist invulnerability with Subodhi’s quiet midnight wisdom and compassionate service on the Western Pilgrimage.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · CLAIMED BY DIYU',
        title: 'Soul-Ledger #1,350 — Bound in Yama’s Underworld',
        subtitle: 'Mortal Flame Extinguished Before True Awakening',
        location: 'Palace of Darkness (Youdu), Diyu',
        platePath: '/plates/game/wukong-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your journey ended in tragic defeat. Without mastering the Dao of Immortality or surviving Heaven’s alchemical fire, King Yama’s iron chains claimed Entry #1,350 in the Book of Life and Death—turning a wondrous stone-born spark back to dust.',
        mythicComparison:
          'In Wu Cheng’en’s epic, Wukong’s entire quest begins precisely to escape this underworld fate through disciplined cultivation rather than complacency or blind recklessness.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 2: SHANGO (YORUBA MYTHOLOGY — ALAAFIN OF OYO TO ORISHA)
  // =========================================================================
  {
    id: 'shango',
    deityId: 'shango',
    traditionId: 'yoruba',
    dndClass: 'Thunder-Crowned Warrior King',
    mortalOrOriginName: 'Alaafin Shango of Royal Oyo',
    ascendedTitle: 'Orisha Shango — Lord of Thunder & Double-Axe Justice',
    subtitle: 'Balance royal fire, Oya’s tempest wind, and sacred accountability to ascend Ọ̀run',
    startingStats: { might: 15, wisdom: 13, dominion: 14 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · THE ROYAL THRONE OF OYO',
        rankTitle: 'Fourth Alaafin of Oyo',
        title: 'Fire on the Tongue & Counsel of Ifá',
        location: 'Royal Palace of Old Oyo (Ọ̀yọ́-Ilé)',
        platePath: '/plates/game/shango-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Smoke curls from your lips as you claim your ancestor Oranyan’s throne over Oyo. Rival warlords Timi and Gbonka eye your crown while Babalawo diviners hold out Orunmila’s sacred palm-nuts.',
        choices: [
          {
            id: 'sh-1-ifa',
            title: 'Consult Odu Ifá & Honor Eshu at the Crossroads',
            subtitle: 'Temper fiery royal charisma (ase) with cool divinatory wisdom',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Bata drums thunder in unison across Oyo! Elders bless your reign with the sacred Sere rattle, uniting fierce courage with impartial royal justice.',
            failNarrative:
              'Impatient during the ritual casting, you misread the Odu omen—sowing quiet rivalry among Oyo’s war-chiefs!',
            mythicNote: 'In Yoruba governance, fiery power (gbigbona) thrives only when balanced by cool wisdom (itutu).',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Sere (Sacred Invocation Rattle)',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'sh-1-iron',
            title: 'Dismiss the Diviners & Rule by Iron Intimidation',
            subtitle: 'Crush dissent with war-drums alone, answering to no council',
            flavorTag: 'TYRANT WARLORD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Border kingdoms tremble before your cavalry, yet Oyo’s own elders whisper behind closed doors that uncooled fire burns its own roof.',
            mythicNote: 'Unchecked royal heat invites the constitutional crisis of the Oyo Mesi.',
            statDelta: { might: 2 },
          },
          {
            id: 'sh-1-yield',
            title: 'Surrender Command of the Army to Rival General Gbonka',
            subtitle: 'Retreat into palace luxury while warlords seize the realm',
            flavorTag: 'FATAL ABDICATION',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Within a single dry season Gbonka’s sorcery-backed legions overthrow your court, erasing your royal name into forgotten ash.',
            mythicNote: 'An Alaafin who surrenders sacred agency loses both crown and destiny (Ori).',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · COVENANT OF WIND & LIGHTNING',
        rankTitle: 'Seeker of Celestial Fire',
        title: 'Oya of the Whirlwind & the Thunderstones',
        location: 'Storm-Swept Banks of the River Niger (Odo Oya)',
        platePath: '/plates/game/shango-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Seeking the primordial charm of Edun Ara that calls lightning from heaven, you meet regal, fearless Oya—mistress of the tearing whirlwind without whom no storm can cross the sky.',
        choices: [
          {
            id: 'sh-2-oya',
            title: 'Swear Co-Equal Partnership with Oya of the Tempest',
            subtitle: 'Unite her rushing wind ahead of your lightning strike',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Oya’s tornado parts the dark clouds as glowing Edun Ara thunderstones answer your call—binding Wind and Thunder in sacred harmony!',
            failNarrative:
              'Attempting to command Oya as a subordinate rather than an equal, volatile sky-fire recoils dangerously across the hills!',
            mythicNote: 'Canonical Yoruba lore: Oya’s wind always sweeps the sky before Shango’s bolt falls.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Edun Ara (Celestial Thunderstone)',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'sh-2-solo',
            title: 'Seize the Volatile Lightning Charm Alone in Secret',
            subtitle: 'Wield raw sky-fire without Oya’s balancing wind',
            flavorTag: 'RECKLESS HUBRIS',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Jagged crimson bolts crackle from your bare hands, terrifying allies and foes alike with unstable tempest energy.',
            mythicNote: 'Ashe wielded in isolation risks catastrophic backfire.',
            statDelta: { might: 2 },
          },
          {
            id: 'sh-2-testself',
            title: 'Swallow the Raw Thunder-Powder Unprepared',
            subtitle: 'Force celestial voltage directly through mortal veins',
            flavorTag: 'MIGHT CHECK · DC 17 (LETHAL)',
            tone: 'check',
            check: { ability: 'might', dc: 17 },
            nextNodeId: 'branch-shadow',
            failNodeId: 'end-fail',
            successNarrative:
              'Your heart survives the blinding shock, leaving your eyes blazing with perilous, half-controlled storm-fire!',
            failNarrative:
              'Unchanneled lightning shatters your mortal frame atop the riverbank cliff.',
            mythicNote: 'Even royal blood requires ritual preparation to house cosmic fire.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · THE TRAGEDY OF THE PALACE',
        rankTitle: 'Tested Sovereign',
        title: 'When the Bolt Strikes Your Own Roof',
        location: 'Storm Hill Overlooking Burning Oyo',
        platePath: '/plates/game/shango-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Testing the sky-invocation from a hilltop during court strife with Gbonka, a blinding thunderbolt strikes your own royal compound below! Through pouring rain, detractors gather in the streets.',
        choices: [
          {
            id: 'sh-3-accountable',
            title: 'Accept Full Moral Reckoning & Walk with Oya to Koso',
            subtitle: 'Refuse civil war against your people; lay down earthly politics with dignity',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Holding your head high in profound grief and accountability, loyal Mogba devotees follow your solemn procession to the sacred grove of Koso.',
            failNarrative:
              'Torn between grief and royal wrath, you unleash warning bolts across the horizon—scattering court and kin in terror!',
            mythicNote: 'Shango’s greatness lies in transforming mortal tragedy into eternal cosmic justice.',
            statDelta: { wisdom: 3, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Oshe Shango (Twin-Bladed Axe)',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'sh-3-wrath',
            title: 'Scorch Every Rebel Quarter of Oyo with Storm-Wrath',
            subtitle: 'Crush your critics by terror and rule the ashes as Tempest Tyrant',
            flavorTag: 'DIVERGENT WRATH PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Lightning levels Gbonka’s banners, yet Oyo’s compounds fall silent in dread rather than sacred love.',
            mythicNote: 'True Orisha justice strikes only falsehood and theft—never indiscriminate vengeance.',
          },
          {
            id: 'sh-3-despair',
            title: 'Succumb to Mortal Despair Under the Ayan Tree',
            subtitle: 'Let your enemies’ bitter rumor become your final earthly end',
            flavorTag: 'TRAGIC SURRENDER',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Letting the sacred thunderstones fall cold into the mud, your spirit fades without answering the call of Ọ̀run.',
            mythicNote: 'The historic cry "Ọba Kò So!" explicitly repudiates mortal despair.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · THE UNCOOLED STORM',
        rankTitle: 'Lord of Wild Lightning',
        title: 'The Reckoning of Obatala’s White Cloth',
        location: 'Scorched Crossroads Outside Koso Grove',
        platePath: '/plates/retellings/theft-of-fire-yoruba.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Elder Orisha Obatala—clothed in cool, spotless white—stands calmly across your storm-scorched path: "Power without balanced justice is mere wildfire, Shango. Will you balance the twin blades of the axe, or wander alone as a feared tempest?"',
        choices: [
          {
            id: 'sh-sh-balance',
            title: 'Bow to Obatala’s Cool Wisdom & Balance the Twin Axe',
            subtitle: 'Bind your lightning strictly to truth, courage, and cosmic law',
            flavorTag: 'WISDOM CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Red and white beads intertwine upon your wrist! Cooled by Obatala’s blessing, you step onto the radiant threshold of Koso!',
            failNarrative:
              'Your storm-heat refuses all restraint—rising into the clouds as an untamed, solitary spirit of wild tempests!',
            mythicNote: 'Shango’s red-and-white ritual beads honor Obatala’s cool composure alongside Shango’s fire.',
            statDelta: { wisdom: 2, dominion: 2 },
          },
          {
            id: 'sh-sh-tempest',
            title: 'Reject Court & Shrine Alike — Become the Untamed Storm',
            subtitle: 'Roam the skies alone as raw elemental thunder without mortal covenant',
            flavorTag: 'ALTERNATE ENDING PACT',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Turning away from cities and temples, your voice becomes the wild savanna lightning that answers to none.',
            mythicNote: 'Divergent Ending: elemental storm force divorced from communal Orisha reciprocity.',
          },
          {
            id: 'sh-sh-strike',
            title: 'Hurl Lightning Against Obatala’s Sacred White Staff',
            subtitle: 'Defy the Father of Cool Creation in blind fury',
            flavorTag: 'FATAL HUBRIS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Your bolt shatters harmlessly against cool primordial light, exhausting your mortal life-force in the dust.',
            mythicNote: 'In Yoruba cosmology, patience (suuru) outlasts unbridled wrath.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · APOTHEOSIS AT KOSO',
        rankTitle: 'Threshold of Ọ̀run',
        title: 'Ọba Kò So! ("The King Did Not Hang!")',
        location: 'Blazing Sky-Chain Above Koso Shrine',
        platePath: '/plates/game/shango-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Mockers whisper in Oyo’s market that Shango perished in disgrace—until noon turns midnight-black and a blazing brass chain drops from Ọ̀run into Koso grove!',
        choices: [
          {
            id: 'sh-4-ascend',
            title: 'Ascend the Sky-Chain Wielding the Twin-Bladed Oshe Axe',
            subtitle: 'Split the heavens in rolling thunder as eternal guardian of truth',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Golden lightning illuminates every compound without harming the innocent! All Oyo drops to its knees crying "Ọba Kò So—The King Did Not Hang!" as you take your immortal seat in Ọ̀run!',
            failNarrative:
              'Ascending in silent, aloof fury without answering your devotees’ Oriki chants, you remain a distant storm-emperor beyond reach.',
            mythicNote: 'Canonical Apotheosis: Shango rises from Koso as Orisha of thunder, drums, and swift moral justice.',
            statDelta: { dominion: 3, might: 2 },
          },
          {
            id: 'sh-4-reclaim',
            title: 'Refuse the Sky-Chain & March Back as Mortal Conqueror',
            subtitle: 'Choose a temporary earthly empire over immortal Orishahood',
            flavorTag: 'ALTERNATE MORTAL EMPIRE',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Reclaiming Old Oyo’s throne by iron spear, you rule forty fierce years as a feared mortal emperor—never ascending to Ọ̀run.',
            mythicNote: 'Divergent Ending: earthly imperial power instead of cosmic transfiguration.',
          },
          {
            id: 'sh-4-sever',
            title: 'Shatter the Sky-Chain Between Earth and Heaven',
            subtitle: 'Cut off Oyo from Ọ̀run in final bitterness',
            flavorTag: 'CATASTROPHIC FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Severing the sacred conduit traps you in grey twilight while rain forsakes the parched kingdom below.',
            mythicNote: 'Yoruba religion centers on unbroken communion between Aye (Earth) and Ọ̀run (Heaven).',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Orisha Shango — Lord of Thunder & Balanced Justice',
        subtitle: 'Ọba Kò So! Sovereign of Bata Drums & Red-and-White Beads',
        location: 'Celestial Court of Ọ̀run & Shrines Across the Atlantic',
        platePath: '/plates/game/shango-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You achieved Shango’s true canonical apotheosis! By pairing royal courage with Ifá wisdom, honoring Oya’s whirlwind as co-equal partner, and turning mortal tragedy into supreme moral accountability, your twin-bladed Oshe axe endures from Yorubaland across the Americas.',
        mythicComparison:
          'Shango exemplifies historical-mythic apotheosis: a real fourth Alaafin of Oyo elevated into a universal cosmic principle of truth, courage, and righteous accountability.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · UNTAMED TEMPEST SOVEREIGN',
        title: 'The Solitary Emperor of Wildfire & Storm',
        subtitle: 'Feared Across the Savanna, Unbound by Shrine or Covenant',
        location: 'Scorched Basalt Frontier Above the Niger',
        platePath: '/plates/game/shango-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your choices forged a divergent legend! Wielding raw lightning without Obatala’s cool balance or Koso’s communal covenant, you live on either as an iron mortal conqueror or a solitary, feared tempest-spirit rather than beloved protector of justice.',
        mythicComparison:
          'In canonical Yoruba philosophy, Shango becomes worthy of eternal veneration precisely because his fiery ase is balanced by Oya’s partnership and Obatala’s cool moral order.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · ASHES OF OLD OYO',
        title: 'The Crown Consumed by Its Own Flame',
        subtitle: 'Uncooled Fire Brought Ruin Before Transcendence',
        location: 'Smoldering Courtyard of Ọ̀yọ́-Ilé',
        platePath: '/plates/game/shango-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your campaign ended in tragedy. Overwhelmed by courtly intrigue, unchanneled sky-fire, or mortal despair, the royal compound fell to silent embers before your name could rise from Koso.',
        mythicComparison:
          'Yoruba proverbs warn that fire without cool water consumes its bearer—making wisdom (ogbon) and composure (itutu) essential to survival and godhood.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 3: ODIN (NORSE MYTHOLOGY — POETIC & PROSE EDDA)
  // =========================================================================
  {
    id: 'odin',
    deityId: 'odin',
    traditionId: 'norse',
    dndClass: 'Runic Seeker & Allfather',
    mortalOrOriginName: 'Young Son of Borr in Ginnungagap',
    ascendedTitle: 'Allfather Odin — Lord of Runes, Poetic Mead & Asgard',
    subtitle: 'Pay the supreme price at Mímir’s Well and windy Yggdrasil—or rule blind to Ragnarök',
    startingStats: { might: 13, wisdom: 15, dominion: 14 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · DAWN OF MIDGARD',
        rankTitle: 'Young Shaper of Realms',
        title: 'Driftwood Upon the Sea-Shore of Newly Raised Earth',
        location: 'Misty Coast of Newly Fashioned Midgard',
        platePath: '/plates/game/odin-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Having raised Midgard from slain frost-giant Ymir, you find two fate-empty ash and elm trunks—Ask and Embla—washed ashore beneath grey clouds while Jötunheimr giants watch from afar.',
        choices: [
          {
            id: 'od-1-breath',
            title: 'Breathe Your Own Spirit (Önd) Into Ask & Embla',
            subtitle: 'Share divine breath, free mind, and speech with mortal kind',
            flavorTag: 'DOMINION CHECK · DC 11',
            tone: 'check',
            check: { ability: 'dominion', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Warm life floods the ash and elm pair! Humanity awakens with free courage—forging the sacred bond between Midgard heroes and Asgard’s halls.',
            failNarrative:
              'Holding back half your breath out of caution, mortals wake fearful and mute—leaving Asgard isolated in the gathering cold!',
            mythicNote: 'Völuspá 17–18: Odin’s foundational gift is önd (vital breath and ecstatic spirit).',
            statDelta: { dominion: 2, wisdom: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Ravens Huginn & Muninn',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'od-1-stone',
            title: 'Carve Obedient Stone Garrison-Thralls Instead',
            subtitle: 'Refuse free-willed mortals; fortify Midgard as a cold military wall',
            flavorTag: 'IRON WARLORD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Silent stone sentinels patrol an empty world devoid of skaldic song, memory, or Valhalla’s chosen brave.',
            mythicNote: 'Without free mortal valor, Valhalla cannot gather Einherjar for the final battle.',
            statDelta: { might: 2 },
          },
          {
            id: 'od-1-void',
            title: 'Descend Alone Back Into Freezing Niflheim Unarmed',
            subtitle: 'Hunt ancient frost-wyrms before establishing Asgard’s wards',
            flavorTag: 'FATAL RECKLESSNESS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Venomous rime-rivers of Élivágar freeze your young spirit beneath the black world-root before Asgard’s walls are ever raised.',
            mythicNote: 'Even the sons of Borr required cosmic order to survive Ginnungagap’s void.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · THE PRICE OF FORESIGHT',
        rankTitle: 'Seeker Beneath the Root',
        title: 'Mímir’s Dark Well & the Irreversible Pledge',
        location: 'Beneath Yggdrasil’s Jötunheimr Root',
        platePath: '/plates/game/odin-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Shadowy Norns weave dark threads ahead. At the gleaming Well of Mímir where primordial cosmic memory pools, guardian Mímir holds out the Gjallarhorn: "One draught costs one of your eyes, forever."',
        choices: [
          {
            id: 'od-2-eye',
            title: 'Pluck Out Your Own Eye & Sink It in Mímir’s Waters',
            subtitle: 'Sacrifice half your outward sight to behold all nine realms’ fate',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Drinking deep through searing pain, past and future blaze clear before your single eye—revealing Ragnarök’s wolf-age and how Asgard must prepare!',
            failNarrative:
              'Flinching at the blade’s edge, you spill half the horn upon the stones—glimpsing only fragmentary nightmares of fire!',
            mythicNote: 'Völuspá 28: supreme Norse sovereignty demands irreversible self-sacrifice.',
            statDelta: { wisdom: 3, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Pledge of Mímir’s Sight',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'od-2-keep',
            title: 'Keep Both Eyes & Threaten Mímir with Your War-Spear',
            subtitle: 'Refuse mutilation; trust martial strength over tragic prophecy',
            flavorTag: 'BLIND WARLORD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Mímir sinks silently beneath black water; you return to Asgard whole in body yet utterly blind to Loki’s snares and Fenrir’s growth.',
            mythicNote: 'Wisdom seized by force yields nothing in Eddic myth.',
            statDelta: { might: 2 },
          },
          {
            id: 'od-2-leapwell',
            title: 'Plunge Headfirst Into the Bottomless Well Unpledged',
            subtitle: 'Attempt to steal all primordial memory without Mímir’s horn',
            flavorTag: 'FATAL HUBRIS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Crushing black currents of infinite memory drown your mind beneath the frost-giant root.',
            mythicNote: 'Mímir’s Gjallarhorn measures what a mind can survive drinking.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · NINE NIGHTS ON THE GALLOWS-TREE',
        rankTitle: 'Lord of the Spear-Wound',
        title: '"Myself Offered Unto Myself" Upon Windy Yggdrasil',
        location: 'Storm-Lashed Boughs Over the Abyss',
        platePath: '/plates/game/odin-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Foresight alone cannot reshape fate: down in the roaring dark beneath Yggdrasil sleep the twenty-four Elder Runes, answering neither gold nor royal decree—only ultimate shamanic ordeal.',
        choices: [
          {
            id: 'od-3-hang',
            title: 'Pierce Your Side with Gungnir & Hang Nine Full Nights',
            subtitle: 'Endure wind, thirst, and death’s threshold with neither bread nor horn',
            flavorTag: 'MIGHT CHECK · DC 14',
            tone: 'check',
            check: { ability: 'might', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'At the ninth midnight on the edge of death, the abyss blazes gold! With a roaring cry you seize the living Runes and fall back reborn in sovereign power!',
            failNarrative:
              'Cutting yourself free on the sixth night before death’s threshold opens, the Runes vanish back into the dark abyss!',
            mythicNote: 'Hávamál 138–141: Odin wins cosmic magic by dying unto his lesser self.',
            statDelta: { wisdom: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Twenty-Four Elder Runes & Gungnir',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'od-3-dwarves',
            title: 'Command Dwarven Smiths to Forge Iron War-Engines Instead',
            subtitle: 'Skip the nine-night ordeal; rely on cold steel over runic mysteries',
            flavorTag: 'RUNE-LESS IRON PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Asgard bristles with heavy iron spears, yet lacks a single healing chant, fetter-breaking Galdr, or rune of wardship.',
            mythicNote: 'Dwarves forge weapons, but Runes belong solely to inner initiation.',
            statDelta: { might: 1 },
          },
          {
            id: 'od-3-letgo',
            title: 'Let Go of the Bough & Fall Into Niflheim’s Maw',
            subtitle: 'Surrender your life-thread to Níðhöggr’s coiled roots',
            flavorTag: 'LETHAL DESCENT',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Plunging past the roots into freezing venom-mist, your spear embeds forever in Niflheim’s silent ice.',
            mythicNote: 'Shamanic ordeal walks the razor’s edge between sacrifice and annihilation.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · THE RUNE-LESS THRONE',
        rankTitle: 'Unseeing War-Chief',
        title: 'The Völva’s Warning at Helheim’s Gate',
        location: 'Mist-Shrouded Eastern Door of Hel',
        platePath: '/plates/retellings/katabasis-norse.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Riding down to Hel’s misty threshold, an ancient dead seeress (Völva) rises from frost: "You wear Asgard’s helm yet shunned the price of wisdom! When Surtr’s fire and Fenrir’s jaws come, what will you answer?"',
        choices: [
          {
            id: 'od-sh-redeem',
            title: 'Humble Your Pride & Seek Kvasir’s Mead of Inspiration',
            subtitle: 'Risk shapeshifting peril inside Hnitbjörg Mountain to awaken gods and poets',
            flavorTag: 'WISDOM CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Heeding the Völva’s stern truth, you Bore through solid mountain stone as a serpent—reclaiming the path of cunning Allfather!',
            failNarrative:
              'Turning your steed away in grim pride, you fortify a silent, joyless iron citadel awaiting winter!',
            mythicNote: 'Baldrs Draumar & Völuspá: Odin repeatedly seeks out harsh prophetic truth from the Völva.',
            statDelta: { wisdom: 2, dominion: 1 },
          },
          {
            id: 'od-sh-ironking',
            title: 'Bar Asgard’s Gates & Rule as Grim Two-Eyed Iron Tyrant',
            subtitle: 'Banish poetry, mortals, and prophecy—await doom behind locked walls',
            flavorTag: 'ALTERNATE ENDING PACT',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Bifrost is shattered by your own decree; you sit unbroken yet blind to fate in a silent iron hall.',
            mythicNote: 'Divergent Ending: survivalist tyranny stripped of Odin’s ecstatic wisdom (óðr).',
          },
          {
            id: 'od-sh-hound',
            title: 'Duel the Blood-Stained Hellhound Garmr Alone in the Dark',
            subtitle: 'Force Hel’s inner gate by raw steel before your destined hour',
            flavorTag: 'MIGHT CHECK · DC 18 (LETHAL)',
            tone: 'check',
            check: { ability: 'might', dc: 18 },
            nextNodeId: 'end-alt',
            failNodeId: 'end-fail',
            successNarrative:
              'Wounded deep, you drive Garmr back into the cavern—retreating scarred to an isolated iron throne.',
            failNarrative:
              'Garmr’s jaws drag you down beneath Hel’s threshold long before Ragnarök’s horn ever sounds.',
            mythicNote: 'Even gods who challenge Hel’s deep laws prematurely perish.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · FLIGHT OF THE EAGLE',
        rankTitle: 'Bearer of Óðrerir',
        title: 'The Theft of the Mead of Poetry & Walls of Asgard',
        location: 'Cavern of Hnitbjörg → Golden Ramparts of Asgard',
        platePath: '/plates/game/odin-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Having won three draughts of sacred Poetic Mead from giantess Gunnlöð inside solid rock, you burst into the sky in eagle-skin while giant Suttungr’s eagle claws slash inches behind your tailfeathers!',
        choices: [
          {
            id: 'od-4-share',
            title: 'Outfly Suttungr & Pour the Mead for Gods and Mortal Skalds',
            subtitle: 'Gift divine inspiration so heroic memory outlives even Ragnarök',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Sweeping over Asgard’s blazing bonfires, you fill the golden vats and ascend Hliðskjálf as Allfather of Gods, Runes, and Poets!',
            failNarrative:
              'Dropping the vats in the mountain pass, you survive as a feared war-god—yet Midgard and Asgard remain songless!',
            mythicNote: 'Skáldskaparmál: sharing poetic inspiration crowns Odin’s sovereignty over mind and memory.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'od-4-hoard',
            title: 'Hide All Three Mead Vats Alone in a Secret Cavern',
            subtitle: 'Hoard cosmic inspiration exclusively for yourself, sharing with none',
            flavorTag: 'ALTERNATE SOLITARY ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'You grow vast in solitary sorcery, yet without shared song or fellowship, Valhalla’s benches stand half-empty.',
            mythicNote: 'Divergent Ending: Odin becomes a reclusive sorcerer rather than Allfather.',
          },
          {
            id: 'od-4-turnfight',
            title: 'Turn Mid-Air with Full Throat to Grapple Giant Suttungr',
            subtitle: 'Abandon eagle speed while weighed down with the sacred Mead',
            flavorTag: 'FATAL GAMBIT',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Locked talon-to-talon in the upper gale, both eagles plummet into the crushing northern sea.',
            mythicNote: 'Odin’s triumph over Suttungr relies on cunning flight and Aesir teamwork at the wall.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Allfather Odin — Sovereign of Runes, Mead & Nine Realms',
        subtitle: 'Enthroned Upon Hliðskjálf Beside Huginn & Muninn',
        location: 'High Seat of Hliðskjálf, Asgard',
        platePath: '/plates/game/odin-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You completed Odin’s true Eddic apotheosis! One-eyed from Mímir’s Well, spear-scarred from nine nights on Yggdrasil, and generous bearer of the Mead of Poetry, you behold all Nine Realms clearly—gathering heroes so courage and song endure even beyond Ragnarök into the reborn emerald world.',
        mythicComparison:
          'Norse myth defines supreme godhood not as effortless omnipotence, but as relentless self-offering for wisdom, magic, and poetic memory.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · TWO-EYED IRON TYRANT',
        title: 'The Blind Sovereign of a Songless Asgard',
        subtitle: 'Unscarred in Body, Unprepared for the Twilight of the Gods',
        location: 'Locked Iron Hall of Barred Asgard',
        platePath: '/plates/game/odin-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'By sparing yourself Mímir’s pledge, Yggdrasil’s nine nights, or the fellowship of poets, you forged a grim alternate fate! You sit whole-eyed upon an iron throne—feared in battle, yet devoid of Runes, skaldic song, and the foresight needed when Fimbulwinter cracks the horizon.',
        mythicComparison:
          'In the Poetic Edda, an Odin who refuses sacrifice remains merely a chieftain; only through loss does he become Allfather.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · LOST BENEATH NIFLHEIM',
        title: 'The Frozen Spear Under Yggdrasil’s Black Root',
        subtitle: 'Swallowed by the Primordial Rime Before Asgard’s Noon',
        location: 'Venom-Rivers of Élivágar, Niflheim',
        platePath: '/plates/game/odin-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your quest perished in the northern dark. Claimed by Niflheim’s rime, Mímir’s crushing depths, or Hel’s hound before mastering the Runes, Midgard was left unguarded beneath a frozen sky.',
        mythicComparison:
          'Norse cosmology surrounds every sacred well and root with lethal peril—magnifying the awe of Odin’s canonical survival.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 4: NANAHUATZIN -> FIFTH SUN (MESOAMERICAN / NAHUA MYTH)
  // =========================================================================
  {
    id: 'fifthsun',
    deityId: 'huitzilopochtli',
    traditionId: 'mesoamerican',
    dndClass: 'Humble Penitent of Dawn',
    mortalOrOriginName: 'Sore-Covered Nanahuatzin at Teotihuacan',
    ascendedTitle: 'Nahui Ollin — The Blazing Fifth Sun of Motion',
    subtitle: 'Outshine arrogant jade-clad wealth at the cosmic brazier—or rise only as pale ash',
    startingStats: { might: 12, wisdom: 15, dominion: 15 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · COUNCIL IN PITCH DARKNESS',
        rankTitle: 'Overlooked Outcast',
        title: 'When Four Worlds Have Fallen Into Night',
        location: 'Unlit Pyramids of Teotihuacan ("Where One Becomes a God")',
        platePath: '/plates/game/fifthsun-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Four past Suns have perished; earth shivers in starless night. Jade-draped lord Tecuciztecatl boasts four times "I shall be the Sun!"—then Quetzalcoatl turns quietly to you, frail Nanahuatzin sitting in the shadows.',
        choices: [
          {
            id: 'fs-1-accept',
            title: 'Bow Quietly & Accept the Heavy Burden Without Boasting',
            subtitle: '"You have shown me honor, O gods; let it be so"',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Your composed, unassuming courage stirs deep reverence in Quetzalcoatl and Tlaloc, who bind your brow with sacred bark-paper vestments!',
            failNarrative:
              'Stung by Tecuciztecatl’s jeers, you answer with an angry boast—clouding your quiet heart before penance begins!',
            mythicNote: 'Florentine Codex Book VII: Nahua nobility of spirit speaks softly and acts wholly.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Bark-Paper Stole of Penance',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'fs-1-boast',
            title: 'Drape Yourself in Borrowed Gold & Out-Boast Tecuciztecatl',
            subtitle: 'Compete in loud display and luxury rather than inner resolve',
            flavorTag: 'VANITY PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Glittering shells clatter on your shoulders, yet beneath the borrowed finery your heart grows anxious at the distant roar of fire.',
            mythicNote: 'Performative pride masks hesitation when true sacrifice arrives.',
            statDelta: { dominion: 1 },
          },
          {
            id: 'fs-1-flee',
            title: 'Slip Away Into Mictlan’s Caverns & Refuse the Call',
            subtitle: 'Abandon the freezing earth to eternal darkness',
            flavorTag: 'FATAL ABANDONMENT',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Retreating into pitch-black obsidian caves while the hearth dies unlit, night freezes forever across the fifth world.',
            mythicNote: 'Without willing self-giving (nextlahualli), neither dawn nor maize can awaken.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · FOUR NIGHTS OF VIGIL',
        rankTitle: 'Keeper of the Pure Offering',
        title: 'Green River-Reeds Against Glittering Quetzal Plumes',
        location: 'Twin Penance Mounds Above the Great Hearth',
        platePath: '/plates/game/fifthsun-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'For four nights the divine hearth roars ever hotter. Across the plaza, Tecuciztecatl offers painless gold balls and coral spines instead of real penance. What offering do you raise to the thirteenth heaven?',
        choices: [
          {
            id: 'fs-2-reeds',
            title: 'Offer Simple Green Reeds, Pure Copal & Sincere Self-Giving',
            subtitle: 'Steel your spirit through authentic four-night vigil',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Fragrant white copal spirals straight to Omeyocan! Your frail frame fills with quiet, unbreakable solar resolve!',
            failNarrative:
              'Exhausted on the fourth vigil night, doubt creeps in as you stare down into the four-story furnace below!',
            mythicNote: 'Florentine Codex: genuine heart-offering outweighs all Tecuciztecatl’s turquoise and gold.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Sacred Copal & Green Reed Bundle',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'fs-2-coral',
            title: 'Substitute Red Coral & Jade Gems to Spare Yourself Pain',
            subtitle: 'Imitate Tecuciztecatl’s painless aristocratic offerings',
            flavorTag: 'HESITANT IMITATION',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Cold gems clink upon the stone altar without rising smoke—leaving your spirit untested for the white-hot leap.',
            mythicNote: 'Painless luxury leaves Tecuciztecatl unprepared for the furnace heat.',
          },
          {
            id: 'fs-2-quench',
            title: 'Pour Dark Floodwater Into the Sacred Hearth at Midnight',
            subtitle: 'Try to bank down the divine furnace before tomorrow’s trial',
            flavorTag: 'SACRILEGIOUS FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Hissing black steam blinds the plaza as the sacred fire dies—condemning Teotihuacan to starless frost.',
            mythicNote: 'Extinguishing Teotexcalli snuffs out the seed of cosmic dawn.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · THE DIVINE HEARTH-ROCK',
        rankTitle: 'Challenger of the Flame',
        title: 'When Proud Wealth Flinches Four Times',
        location: 'Brink of Teotexcalli (The Blazing Brazier)',
        platePath: '/plates/game/fifthsun-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Four times proud Tecuciztecatl charges toward the roaring white-hot furnace—and four times he recoils in terror from the searing blast! Every god turns in breathless silence: "Onward, O Nanahuatzin! Now try!"',
        choices: [
          {
            id: 'fs-3-leap',
            title: 'Close Your Eyes, Steel Your Heart & Leap Straight Into the Blaze',
            subtitle: 'Zero hesitation—hurl your whole being into the white-hot core on the first run',
            flavorTag: 'MIGHT CHECK · DC 13',
            tone: 'check',
            check: { ability: 'might', dc: 13 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Golden solar fire roars skyward as your mortal shell dissolves into blinding light—while a diving eagle scorches its wingtips gold-black in homage and ashamed Tecuciztecatl leaps too late into grey ashes!',
            failNarrative:
              'Flinching half a step at the roaring rim, you stumble in only after the brightest flames subside into cooling grey embers!',
            mythicNote: 'Canonical climax: explains why the Sun blazes bright, eagles have dark wings, and the late-leaping Moon is dim.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Scorched Golden Eagle Plume',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'fs-3-wait',
            title: 'Wait Until the Fiercest Flames Die Down to Grey Embers',
            subtitle: 'Jump safely into cooler ashes rather than white-hot fire',
            flavorTag: 'PALE MOON PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Landing in cooling grey ash instead of living flame, your light rises pale and silver rather than golden!',
            mythicNote: 'In Nahua myth, leaping into cooling ashes births the dimmer Moon rather than the Sun.',
          },
          {
            id: 'fs-3-refuse',
            title: 'Step Back From the Rim Beside Frightened Tecuciztecatl',
            subtitle: 'Refuse the leap altogether; let the four-night furnace burn out empty',
            flavorTag: 'EXTINGUISHED DAWN',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Neither candidate dares the fire; the great hearth sinks into black cinder while Tzitzimime star-demons descend through eternal night.',
            mythicNote: 'In Aztec cosmology, without a Sun the skeletal Tzitzimime devour the darkened earth.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · TWILIGHT OF ASH',
        rankTitle: 'Pale Luminary in Shadow',
        title: 'The Rabbit Cast Across Dim Silver Light',
        location: 'Misty Eastern Horizon Above Teotihuacan',
        platePath: '/plates/retellings/katabasis-mesoamerican.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Because hesitation or borrowed pride cooled your leap, you rise pale above the dark pyramids while the fire-gods prepare to hurl a shadowy rabbit across your face to dim your rival glare!',
        choices: [
          {
            id: 'fs-sh-reignite',
            title: 'Call Upon Ehecatl-Quetzalcoatl’s Breath to Re-Kindle Your Core',
            subtitle: 'Surrender all remaining pride so sacred wind fans pale ember into true gold',
            flavorTag: 'DOMINION CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'dominion', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Feathered-Serpent Quetzalcoatl breathes mighty cosmic wind into your heart—fanning dim silver into the roaring gold of Dawn!',
            failNarrative:
              'The celestial rabbit strikes your brow, dimming your disk permanently into the quiet, silver Moon of Night!',
            mythicNote: 'Ehecatl-Quetzalcoatl’s sacred breath sets celestial bodies into living motion.',
            statDelta: { dominion: 2, wisdom: 1 },
          },
          {
            id: 'fs-sh-moon',
            title: 'Accept the Rabbit’s Mark & Reign Quietly as the Pale Moon',
            subtitle: 'Yield the golden noon and watch gently over night-blooming earth',
            flavorTag: 'ALTERNATE LUNAR ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Bearing the rabbit’s silhouette across your cool silver face, you become Metztli’s lunar mirror in twilight.',
            mythicNote: 'Divergent Ending: you fulfill Tecuciztecatl’s canonical lunar fate rather than becoming the Fifth Sun.',
          },
          {
            id: 'fs-sh-eclipse',
            title: 'Plunge Back Into Mictlan’s Abyss to Escape the Gods’ Judgment',
            subtitle: 'Quench even your silver light in underworld obsidian water',
            flavorTag: 'FATAL ECLIPSE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Sinking beneath the ninth underworld river, your last ember hisses out in Mictlantecuhtli’s dark realm.',
            mythicNote: 'Flight into Mictlan surrenders celestial transformation.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · SETTING THE COSMOS IN MOTION',
        rankTitle: 'Risen Dawn in the East',
        title: 'Nahui Ollin & the Covenant of Ehecatl’s Wind',
        location: 'Crimson Sky Vault Above the Pyramid of the Sun',
        platePath: '/plates/game/fifthsun-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'All four quarters of heaven flush vermilion as you rise in blinding golden splendor in the East! Yet at first you sway motionless above the horizon—threatening to scorch the earth unless cosmic reciprocity sets time moving.',
        choices: [
          {
            id: 'fs-4-ollin',
            title: 'Seal the Covenant of Reciprocity & Soar on Quetzalcoatl’s Wind',
            subtitle: 'Move westward as Nahui Ollin—giving daily dawn, seasons, and golden maize',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Propelled by Ehecatl-Quetzalcoatl’s mighty gust, you sweep majestically across the sky vault as Nahui Ollin—The Fifth Sun of Living Motion!',
            failNarrative:
              'Hanging hesitant near the horizon, your light dims into perpetual twilight mist rather than vibrant noon!',
            mythicNote: 'Florentine Codex: Ollin ("motion/heartbeat") defines our present Fifth World.',
            statDelta: { dominion: 3, might: 2 },
          },
          {
            id: 'fs-4-halt',
            title: 'Refuse to Move & Hang Motionless Forever at Zenith',
            subtitle: 'Rule as a static, unyielding solar tyrant without night or seasons',
            flavorTag: 'ALTERNATE STATIC ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Hanging frozen above the pyramids without sunset or rain, time itself halts in eerie amber stillness.',
            mythicNote: 'Divergent Ending: without cosmic motion (ollin), neither calendars nor agriculture can live.',
          },
          {
            id: 'fs-4-burnout',
            title: 'Unleash All Solar Fire in a Single Cataclysmic Flare',
            subtitle: 'Consume the Fifth Age on its very first morning',
            flavorTag: 'APOCALYPTIC FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Exploding in unmeasured fury, the young Fifth Sun collapses into dark ash like the four lost ages before it.',
            mythicNote: 'Each of the four previous Suns fell precisely from elemental imbalance.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Nahui Ollin — The Blazing Fifth Sun of Living Motion',
        subtitle: 'Lord of Dawn, Turquoise Fire & the Calendar Stone’s Center',
        location: 'Zenith of the Celestial Vault Above Anahuac',
        platePath: '/plates/game/fifthsun-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You fulfilled the true sacred myth of Teotihuacan—"The Place Where One Becomes a God"! Where loud, jade-clad wealth flinched four times from the flames, your quiet humility leaped once without hesitation, birthing the living Sun that warms maize, eagles, and humanity every dawn.',
        mythicComparison:
          'Nahua apotheosis teaches one of world mythology’s deepest paradoxes: supreme cosmic radiance belongs not to boastful privilege, but to whole-hearted, selfless courage.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · THE ASH-BORN RABBIT MOON',
        title: 'Pale Luminary of Eternal Teotihuacan Twilight',
        subtitle: 'Dimmed by Hesitation & Marked by the Celestial Rabbit',
        location: 'Misty Night Sky Above the Avenue of the Dead',
        platePath: '/plates/game/fifthsun-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your choices led away from the blazing Fifth Sun into an eerie alternate destiny! By hesitating at the brazier, imitating Tecuciztecatl’s painless jade, or refusing cosmic motion, you shine only as a pale, rabbit-marked Moon over a world awaiting true dawn.',
        mythicComparison:
          'In the Florentine Codex, this exact fate befalls proud Tecuciztecatl—who jumped late into cooling grey ashes and had his face dimmed by a flung rabbit.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · EXTINGUISHED IN ETERNAL NIGHT',
        title: 'Cold Ashes in the Darkened Hearth of Teotihuacan',
        subtitle: 'No Dawn Rose; the Star-Demons of Night Claimed the Fifth Age',
        location: 'Darkened Summit of Teotexcalli',
        platePath: '/plates/game/fifthsun-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your campaign ended in cosmic darkness. With the divine brazier quenched or abandoned, no Fifth Sun rose in the East—leaving the cold pyramids shrouded under starless night.',
        mythicComparison:
          'Aztec ritual drama treated sunrise never as an automatic guarantee, but as a fragile miracle won through courage at the fire’s edge.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 5: HERMES (GREEK MYTHOLOGY — HOMERIC HYMN TO HERMES)
  // =========================================================================
  {
    id: 'hermes',
    deityId: 'hermes',
    traditionId: 'greek',
    dndClass: 'Silver-Tongued Liminal Rogue',
    mortalOrOriginName: 'Newborn Cave-Child of Mount Cyllene',
    ascendedTitle: 'Hermes — Twelfth Olympian & Psychopomp of Souls',
    subtitle: 'Outwit Apollo on your very first midnight to claim a seat on Mount Olympus',
    startingStats: { might: 12, wisdom: 15, dominion: 15 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · BORN AT DAWN, SCHEMING BY NOON',
        rankTitle: 'Cave-Born Infant of Maia',
        title: 'The Tortoise at Cyllene’s Threshold',
        location: 'Shadowed Cavern of Mount Cyllene, Arcadia',
        platePath: '/plates/game/hermes-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Born in a hidden Arcadian cave far from Olympus’s golden banquets, your nymph mother Maia warns we remain obscure cave-spirits unless Zeus recognizes your worth. Outside crawls a mountain tortoise!',
        choices: [
          {
            id: 'hm-1-lyre',
            title: 'Fashion the First Seven-Stringed Tortoiseshell Lyre',
            subtitle: 'Craft divine music at noon before slipping toward Pieria by nightfall',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Stretching seven sheep-gut strings across reed arms, sweet music echoes through the cave—arming you with an instrument able to charm gods themselves!',
            failNarrative:
              'Rushing the craft in haste, the strings snap discordantly—leaving you only raw theft without art as night falls!',
            mythicNote: 'Homeric Hymn to Hermes: born at dawn, playing the lyre by midday, stealing cattle by dusk.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Chelys (First Tortoiseshell Lyre)',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'hm-1-raid',
            title: 'Skip Craft & Rustle Apollo’s Herd as a Brigand',
            subtitle: 'Seek wealth in Arcadia’s hills without Olympian diplomacy',
            flavorTag: 'OUTLAW TRICKSTER PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Driving fifty snow-white heifers into misty ravines, you revel in outlaw spoils while Apollo’s wrath gathers overhead.',
            mythicNote: 'Theft without sacred reciprocity marks a bandit rather than an Olympian mediator.',
            statDelta: { might: 2 },
          },
          {
            id: 'hm-1-sleep',
            title: 'Stay Swaddled Forever in Maia’s Hidden Cave',
            subtitle: 'Accept obscurity and never test the gates of Olympus',
            flavorTag: 'FORGOTTEN DAIMON END',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Remaining asleep in Arcadian shadow, neither mortals nor Olympians ever learn your name.',
            mythicNote: 'In the Homeric Hymn, Hermes explicitly rejects obscure cave-slumber for Olympian honor (timē).',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · MIDNIGHT IN PIERIA',
        rankTitle: 'Clever Cattle-Rustler',
        title: 'Backward Hoofprints & Twelve Equal Portions',
        location: 'Misty Banks of the Alpheus River',
        platePath: '/plates/game/hermes-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Spiriting fifty of Apollo’s immortal cattle away under moonlight, how do you disguise your tracks and divide the riverside fire-offering?',
        choices: [
          {
            id: 'hm-2-twelve',
            title: 'Walk the Herd Backward & Carve Twelve Equal Divine Portions',
            subtitle: 'Include yourself humbly as the Twelfth Olympian—yet refrain from eating meat!',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Inventing fire-sticks on the spot, you lay out twelve equal portions for the Twelve Gods—resisting mortal hunger for the roast meat so your divine nature stays pure!',
            failNarrative:
              'Tempted by the savory aroma, you devour the meat like a mortal—clouding your claim to Olympian rank when Apollo arrives!',
            mythicNote: 'Canonical Hymn insight: Hermes smells the roast meat longingly yet abstains, proving he belongs among immortals who feast on ambrosia.',
            statDelta: { wisdom: 2, might: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Winged Tamarisk Sandals',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'hm-2-eatall',
            title: 'Slaughter & Feast on the Herd Exclusively for Yourself',
            subtitle: 'Mock the Olympian council and hoard the sacred hides',
            flavorTag: 'DEFIANT BANDIT PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Feasting alone beside the river, blazing sun-god Apollo tracks you down by augury before dawn with drawn silver bow!',
            mythicNote: 'Refusing shared sacrifice severs communion with Olympus.',
          },
          {
            id: 'hm-2-shoot',
            title: 'Ambush Blazing Apollo Head-On with Stones',
            subtitle: 'Challenge the Far-Shooter in open combat on day one',
            flavorTag: 'MIGHT CHECK · DC 17 (LETHAL)',
            tone: 'check',
            check: { ability: 'might', dc: 17 },
            nextNodeId: 'branch-shadow',
            failNodeId: 'end-fail',
            successNarrative:
              'Dodging a blinding solar arrow by a hair’s breadth, you scramble into the crags under Apollo’s fury!',
            failNarrative:
              'Apollo’s golden shaft pins you down and hurls you bound into deep Tartarus.',
            mythicNote: 'Hermes triumphs through metis (wit and charm), never brute force against Apollo.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · TRIAL BEFORE ZEUS',
        rankTitle: 'Defendant on Olympus',
        title: 'Witty Defense & the Lyre’s Enchantment',
        location: 'Brazen-Floored Hall of Mount Olympus',
        platePath: '/plates/game/hermes-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Furious Apollo drags you before thunder-browed Zeus! All Olympus listens as Apollo accuses you of grand cattle theft.',
        choices: [
          {
            id: 'hm-3-charm',
            title: 'Win Zeus’s Laughter with Audacious Wit, Then Strike Up the Lyre',
            subtitle: '"Father Zeus, how could a newborn babe born yesterday drive fifty cattle?"',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Zeus bursts into thunderous laughter at your fearless eloquence! And when you sweep the tortoiseshell lyre, enchanted Apollo trades anger for brotherhood on the spot!',
            failNarrative:
              'Overplaying insolence without music, Zeus frowns darkly and orders you stripped of the herd under stern probation!',
            mythicNote: 'Homeric Hymn: Zeus’s laughter ratifies Hermes’ brilliance, and the lyre turns rivalry into eternal alliance.',
            statDelta: { dominion: 3, wisdom: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Golden Caduceus (Herald’s Wand)',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'hm-3-flee',
            title: 'Pickpocket Poseidon’s Trident & Bolt Off Olympus',
            subtitle: 'Choose eternal prankster infamy over lawful Olympian office',
            flavorTag: 'ROGUE EXILE PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Olympus erupts in uproar as you dive back into Arcadian mist—clever, free, yet barred from the golden council.',
            mythicNote: 'Unchecked trickery without reciprocity isolates the trickster.',
          },
          {
            id: 'hm-3-perjure',
            title: 'Swear a False Oath Upon the Dread Waters of River Styx',
            subtitle: 'Break the one oath that paralyzes even immortal gods',
            flavorTag: 'FATAL STYGIAN CURSE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Noticeably in the canonical Hymn, Hermes swears cleverly by Zeus’s porch—never the Styx! Perjuring on Styx freezes you breathless in Tartarus.',
            mythicNote: 'Hesiod Theogony 793: swearing falsely by Styx casts even a god into nine years of deathlike coma.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · ARCADIAN TWILIGHT',
        rankTitle: 'Wandering Border-Thief',
        title: 'Apollo’s Golden Wand at the Crossroads',
        location: 'Windy Mountain Pass Between Arcadia & Delphi',
        platePath: '/plates/retellings/theft-of-fire-greek.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Cornered at a three-way crossroads by blazing Apollo, he demands restitution: "Yield your stolen craft in honest exchange for my Herald’s Staff, or remain a hunted mountain bandit forever!"',
        choices: [
          {
            id: 'hm-sh-trade',
            title: 'Gift Your Lyre Generously to Seal Sacred Brotherhood',
            subtitle: 'Transform rivalry into reciprocal harmony between music and commerce',
            flavorTag: 'DOMINION CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'dominion', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Apollo clasps your hand in delight, placing the shining golden Caduceus in your palm and escorting you back up Olympus!',
            failNarrative:
              'Haggling bitterly until sundown, Apollo departs alone—leaving you unharmed yet forever outside Olympus’s inner circle.',
            mythicNote: 'Greek charis (reciprocal grace) elevates cleverness into divine office.',
            statDelta: { dominion: 2, wisdom: 1 },
          },
          {
            id: 'hm-sh-outlaw',
            title: 'Keep Both Cattle & Lyre as King of Highway Outlaws',
            subtitle: 'Spurn Olympus’s rules to roam mortal crossroads untamed',
            flavorTag: 'ALTERNATE OUTLAW PACT',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Slipping into twilight mist, rustlers and night-travelers whisper prayers to the Uncrowned Thief of Cyllene.',
            mythicNote: 'Divergent Ending: rustic trickster daimon rather than Twelfth Olympian.',
          },
          {
            id: 'hm-sh-stealtripod',
            title: 'Raid Delphi’s Sacred Prophetic Tripod by Force',
            subtitle: 'Cross Zeus’s absolute boundary over Delphic prophecy',
            flavorTag: 'FATAL HUBRIS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Zeus’s white-hot thunderbolt shatters your stolen prize and seals you beneath Tartarus’s brazen anvil.',
            mythicNote: 'In the Hymn, Apollo shares bee-divination with Hermes, but Delphic prophecy belongs to Zeus’s decree alone.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · SOVEREIGN OF ALL BOUNDARIES',
        rankTitle: 'Herald of Zeus',
        title: 'The Covenant Between Olympus, Earth & Hades',
        location: 'Golden Gates of Olympus → Banks of River Styx',
        platePath: '/plates/game/hermes-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Zeus offers you a supreme charter: become the sole deity permitted to cross freely between high Olympus, mortal marketplaces, and dread Hades’ underworld!',
        choices: [
          {
            id: 'hm-4-psychopomp',
            title: 'Accept the Dual Charter: Herald of Heaven & Gentle Guide of Souls',
            subtitle: 'Bridge every boundary with the twin-serpent Caduceus and winged sandals',
            flavorTag: 'WISDOM CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Crowned Twelfth Olympian! From Zeus’s throne to Persephone’s meadow, every traveler, merchant, diplomat, and departing soul walks under your swift, kindly wing!',
            failNarrative:
              'Refusing the solemn duty of guiding mortal shades to Hades, you remain a minor pastoral spirit of Arcadian flocks.',
            mythicNote: 'Canonical Apotheosis: Hermes Psychopompos unites sky, earth, and underworld.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'hm-4-pastoral',
            title: 'Decline Hades & Remain Rustic Patron of Arcadian Shepherds',
            subtitle: 'Prefer quiet mountain pastures and pan-pipes over cosmic diplomacy',
            flavorTag: 'ALTERNATE PASTORAL ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Playing reed-pipes on sunlit crags, you live peacefully among flocks—leaving Olympus’s grand errands to Iris alone.',
            mythicNote: 'Divergent Ending: local Arcadian deity rather than universal Psychopomp.',
          },
          {
            id: 'hm-4-sellsecrets',
            title: 'Auction Zeus’s Confidential Decrees to Titan Prisoners',
            subtitle: 'Betray Olympus’s trust on your very first embassy below',
            flavorTag: 'TREASONOUS FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Caught at Tartarus’s bronze gate by Hundred-Handed Briareus, your winged sandals are stripped and cast into magma.',
            mythicNote: 'Even the god of cunning honors his sworn pact with Father Zeus.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Hermes Psychopompos — Twelfth Olympian & Master of Crossroads',
        subtitle: 'Bearer of the Golden Caduceus Across Sky, Earth & Underworld',
        location: 'Mount Olympus & Every Threshold of the Cosmos',
        platePath: '/plates/game/hermes-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You fulfilled the joyous apotheosis of the Homeric Hymn to Hermes! Born an outsider in a dark cave, your invention of the lyre, restraint at the twelve-fold sacrifice, fearless wit before Zeus, and generous exchange with Apollo elevated you into the beloved mediator connecting gods, mortals, and the dead.',
        mythicComparison:
          'Hermes demonstrates how Greek myth incorporates disruptive trickster intelligence directly into cosmic order through music, reciprocity, and boundary-keeping.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · UNCROWNED TRICKSTER OF ARCADIA',
        title: 'The Hooded Outlaw Spirit of Misty Mountain Passes',
        subtitle: 'Free of Olympus, Patron of Rustlers & Wandering Flocks',
        location: ' Crags of Mount Cyllene, Arcadia',
        platePath: '/plates/game/hermes-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your story diverged from the Twelve Olympians! Choosing outlaw spoils or rustic solitude over Apollo’s covenant and Hades’ threshold, you remain a clever, elusive mountain spirit sung around shepherds’ campfires rather than Herald of the Cosmos.',
        mythicComparison:
          'Without the reciprocal exchange of lyre and Caduceus, Hermes remains an archaic local trickster rather than pan-Hellenic Olympian.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · BOUND IN DEEP TARTARUS',
        title: 'Shattered Strings Beneath the Brazen Anvil',
        subtitle: 'Undone by Stygian Perjury or Reckless Hubris',
        location: 'Abyss of Tartarus Below Hades',
        platePath: '/plates/game/hermes-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your ascent ended in darkness. Challenging solar power head-on without craft or breaking the dread oath of Styx cast your young spirit beneath Tartarus’s bronze gates before Olympus ever welcomed you.',
        mythicComparison:
          'Greek myth draws a razor-sharp line between metis (resourceful wit that respects cosmic bounds) and fatal hubris.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 6: OSIRIS (EGYPTIAN MYTHOLOGY — PYRAMID TEXTS & PLUTARCH)
  // =========================================================================
  {
    id: 'osiris',
    deityId: 'osiris',
    traditionId: 'egyptian',
    dndClass: 'Risen Sovereign of Ma’at',
    mortalOrOriginName: 'Earthly Pharaoh Osiris of Kemet',
    ascendedTitle: 'Osiris Wennefer — Eternal Lord of the Duat & Renewal',
    subtitle: 'Endure Set’s betrayal and Isis’s resurrection to enthrone eternal justice in the Duat',
    startingStats: { might: 13, wisdom: 15, dominion: 14 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · THE BANQUET OF RED DESERT SET',
        rankTitle: 'Beloved King of the Black Land',
        title: 'The Jeweled Cedar Chest of Seventy-Two Conspirators',
        location: 'Torchlit Royal Hall of Memphis',
        platePath: '/plates/game/osiris-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Having taught mortals agriculture, barley, and gentle Ma’at, your envious brother Set brings an exquisite cedar-and-gold chest into the royal feast—promising it as a gift to whomever fits inside it exactly!',
        choices: [
          {
            id: 'os-1-isis',
            title: 'Whisper a Protective Heka Bond with Isis Before Testing Fate',
            subtitle: 'Entrust your royal Ka-ring to Isis’s vigilance even as tragic destiny unfolds',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Though Set’s seventy-two conspirators slam the lid shut with molten lead and cast the chest into the Nile, Isis’s unbroken Heka tether guides your vessel safely to a sacred tamarisk tree at Byblos!',
            failNarrative:
              'Stepping into Set’s trap unwarded, your sealed chest drifts lost in turbulent Mediterranean currents while Set seizes Egypt unchecked!',
            mythicNote: 'Pyramid Texts & Isis cycle: Isis’s devoted magic (Heka) anchors Osiris’s soul through betrayal.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Tyet Knot of Isis (Heka Ward)',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'os-1-strike',
            title: 'Draw Bronze Blades & Slaughter Set’s Entourage at the Feast',
            subtitle: 'Break sacred banquet hospitality with preemptive bloodshed',
            flavorTag: 'WRATHFUL PHARAOH PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Blood stains the lotus-tiled hall! Civil war tears Upper and Lower Egypt apart, tainting your gentle reign of Ma’at with desert violence.',
            mythicNote: 'Fighting Set with Set’s own chaos blurs the moral distinction of Ma’at.',
            statDelta: { might: 2 },
          },
          {
            id: 'os-1-renounce',
            title: 'Surrender the Crook & Flail Voluntarily to Set’s Chaos',
            subtitle: 'Flee Egypt without contest and dissolve into the primeval waters',
            flavorTag: 'FATAL DISSOLUTION',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Unopposed Isfet (disorder) swallows the Nile valley as your forgotten name sinks into dark Nun.',
            mythicNote: 'Abandoning Ma’at unravels both kingship and cosmos.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · THE PAPYRUS MARSHES OF KHEMMIS',
        rankTitle: 'Shattered Spirit in the Reeds',
        title: 'Reassembling the Fourteen Scattered Shards',
        location: 'Moonlit Delta Marshes of Khemmis',
        platePath: '/plates/game/osiris-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Hunting by moonlight, Set discovers your body and tears it into fourteen pieces across Egypt! Winged Isis and Nephthys gather every fragment amid papyrus reeds while jackal-headed Anubis kneels with linen bands.',
        choices: [
          {
            id: 'os-2-mummy',
            title: 'Unite Your Ka Through Isis’s Wings & Anubis’s First Mummification',
            subtitle: 'Kindle the golden falcon-spark of young Horus before entering the Duat',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Golden breath stirs beneath Isis’s beating kite-wings! Rejoined in sacred linen as the very first mummy, you bequeath righteous kingship to Horus and awaken in immortal green-skinned vigor!',
            failNarrative:
              'Awakening in restless, incomplete fury among the reeds, bitter thirst for personal vengeance threatens your serene transfiguration!',
            mythicNote: 'Canonical Osirian mystery: death itself is transformed into the prototype of eternal resurrection.',
            statDelta: { dominion: 2, wisdom: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Djed Pillar of Stability',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'os-2-revenant',
            title: 'Refuse Embalming Peace & Rise as a Vengeful Desert Revenant',
            subtitle: 'Stalk the living world personally to hunt Set with storm-curses',
            flavorTag: 'DIVERGENT REVENANT PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Scorning quiet renewal, your terrifying spectral form haunts the Nile banks—feared by mortals and gods alike.',
            mythicNote: 'In canonical myth, Horus champions earthly kingship while Osiris sanctifies the eternal afterlife.',
          },
          {
            id: 'os-2-scatter',
            title: 'Let Your Ba-Soul Drift Apart Across the Dark Nile Silt',
            subtitle: 'Release consciousness before Isis’s chant completes',
            flavorTag: 'LOST IN NUN',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Your separated Ka and Ba scatter irretrievably into dark river silt, leaving the underworld throne empty.',
            mythicNote: 'Egyptian immortality requires the sacred union of Ka, Ba, and preserved form (Akh).',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · THE HALL OF TWO TRUTHS',
        rankTitle: 'First of the Westerners',
        title: 'Establishing the Scales of the Ostrich Feather',
        location: 'Subterranean Sanctuary of Ma’at in the Duat',
        platePath: '/plates/game/osiris-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Descending into the vast dark caverns of the Duat where departed kings and humble farmers alike arrive trembling, ibis-headed Thoth unrolls his papyrus beside the Golden Scales!',
        choices: [
          {
            id: 'os-3-feather',
            title: 'Decree Impartial Judgment by Ma’at’s Feather Alone',
            subtitle: 'Weigh Pharaoh and peasant alike strictly by truth and kindness of heart',
            flavorTag: 'WISDOM CHECK · DC 14',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Every soul across Egypt rejoices in hope! Neither gold tombs nor royal titles can bribe the Feather—only a heart lighter than truth enters the Field of Reeds!',
            failNarrative:
              'Tilting the scales harshly in lingering bitterness over Set’s crime, terror grips the caverns as Ammit snarls unchecked!',
            mythicNote: 'Book of the Dead Spell 125: Osiris democratizes eternity through ethical judgment.',
            statDelta: { wisdom: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Crook, Flail & White Atef Crown',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'os-3-kingsonly',
            title: 'Reserve Eternity Exclusively for Royal Pharaohs & Nobles',
            subtitle: 'Bar common farmers and artisans from the Field of Reeds',
            flavorTag: 'ELITIST UNDERWORLD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Lonely golden barges drift across silent waters while millions of mortal shades weep outside locked obsidian gates.',
            mythicNote: 'Historically, Osiris’s cult flourished precisely because it opened eternal life beyond royal tombs to all ethical souls.',
          },
          {
            id: 'os-3-ammit',
            title: 'Shatter the Scales & Unleash Ammit Upon All Souls',
            subtitle: 'Declare every mortal heart corrupt beyond redemption',
            flavorTag: 'NIHILISTIC COLLAPSE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Without Ma’at’s balance, the Duat’s caverns collapse into uncreated Nun, snuffing out your own throne.',
            mythicNote: 'Even the Lord of the Duat rules by Ma’at, never against her.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · THE SIXTH CAVERN',
        rankTitle: 'Restless Lord in Darkness',
        title: 'Midnight Approach of Ra’s Solar Night-Barque',
        location: 'Deepest Cavern of the Amduat',
        platePath: '/plates/retellings/katabasis-egyptian.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'At dead of midnight, aged sun-god Ra’s barque glides through your shadowed cavern pursued by chaos-serpent Apophis: "Unite your underworld renewal with my dawn light, Osiris—or rule a sunless realm in bitter isolation!"',
        choices: [
          {
            id: 'os-sh-unite',
            title: 'Embrace Ra’s Ba-Soul in Sacred Midnight Union',
            subtitle: 'Rekindle the dying Sun each night so life and dawn renew together',
            flavorTag: 'WISDOM CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Blinding gold-and-emerald light fuses Osiris and Ra for one sacred instant—restoring peace to your spirit and opening the Field of Reeds!',
            failNarrative:
              'Turning away from Ra’s solar barque, you march back toward the upper desert as a dread spectral conqueror!',
            mythicNote: 'New Kingdom theology’s deepest mystery: "Ra rests in Osiris, and Osiris rests in Ra."',
            statDelta: { wisdom: 2, dominion: 2 },
          },
          {
            id: 'os-sh-specter',
            title: 'March Out of the Duat to Rule Living Egypt by Spectral Dread',
            subtitle: 'Usurp young Horus’s sunlit throne as an undying ghost-emperor',
            flavorTag: 'ALTERNATE SPECTRAL ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Red sandstorms part before your spectral standard as living cities bow in cold fear rather than hope.',
            mythicNote: 'Divergent Ending: refusing the boundary between Duat and sunlit Kemet.',
          },
          {
            id: 'os-sh-apophis',
            title: 'Open the Seventh Gate to Uncreated Serpent Apophis',
            subtitle: 'Use primordial chaos as a weapon against the upper gods',
            flavorTag: 'COSMIC ANNIHILATION',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Apophis drinks the subterranean Nile dry and swallows both barque and throne into pitch-black non-existence.',
            mythicNote: 'Apophis is pure non-being—an enemy to Set, Ra, and Osiris alike.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · SOVEREIGN OF ETERNITY',
        rankTitle: 'Wennefer ("Eternally Good")',
        title: 'Verdict of the Ennead & Dawn Over the Field of Reeds',
        location: 'Obsidian Throne of the Duat → Golden Aaru',
        platePath: '/plates/game/osiris-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Above on earth, Horus triumphs over Set before the Great Ennead; below in the Duat, green barley sprouts from your sacred bier as starry Nut arches overhead!',
        choices: [
          {
            id: 'os-4-aaru',
            title: 'Bless Horus Upon Earth & Open the Golden Field of Reeds Forever',
            subtitle: 'Reign as Wennefer—eternal guarantor of sprouting grain, Ma’at, and resurrection',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Enthroned in radiant white linen with Crook and Flail, every sprouting harvest along the Nile and every justified soul in eternity sings hymn to Osiris Wennefer!',
            failNarrative:
              'Refusing reconciliation in the cosmic division of realms, you seal the Duat behind cold iron silence.',
            mythicNote: 'Canonical Apotheosis: Osiris unites agricultural rebirth, ethical judgment, and eternal peace.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'os-4-seal',
            title: 'Bar All Living Prayers & Rule a Silent, Sealed Underworld',
            subtitle: 'Sever Kemet’s annual Nile flood from your subterranean blessing',
            flavorTag: 'ALTERNATE SILENT ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'You reign unchallenged in hushed obsidian halls while the upper Nile shrinks into parched dust.',
            mythicNote: 'Divergent Ending: severing Osiris’s life-giving vegetative power from Egypt.',
          },
          {
            id: 'os-4-floodall',
            title: 'Unleash the Subterranean Cavern Waters to Drown All Egypt',
            subtitle: 'Wash away Set’s deserts and Horus’s cities together',
            flavorTag: 'CATACLYSMIC FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Returning the Black Land back to primeval Nun erases temples, offerings, and memory alike.',
            mythicNote: 'Balance between inundation and dry land is the heartbeat of Kemet.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Osiris Wennefer — Sovereign of the Duat & Field of Reeds',
        subtitle: 'Lord of Ma’at’s Scales, Sprouting Grain & Eternal Life',
        location: 'Hall of Two Truths & Golden Aaru',
        platePath: '/plates/game/osiris-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You achieved Osiris’s canonical Egyptian apotheosis! Betrayed and dismembered as an earthly king, you rose through Isis’s love and Anubis’s sacred craft not for petty vengeance, but to establish impartial ethical judgment by Ma’at’s Feather—promising eternal renewal to every just heart.',
        mythicComparison:
          'Osiris represents world mythology’s archetype of the dying-and-rising sovereign whose suffering transforms death itself from terror into hopeful rebirth.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · SPECTRAL PHARAOH OF WRATH',
        title: 'The Dread Undying Sovereign of Red Sandstorms',
        subtitle: 'Feared Across the Nile, Unreconciled with Dawn',
        location: 'Storm-Swept Obelisks of the Western Desert',
        platePath: '/plates/game/osiris-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your path diverged from serene Wennefer! Choosing vengeance, elitist exclusion, or spectral rule over Horus’s living kingdom and Ra’s midnight union, you endure as a feared revenant-king rather than beloved guarantor of the Field of Reeds.',
        mythicComparison:
          'In Egyptian theology, Osiris’s greatness rests on leaving earthly combat to Horus while embodying merciful, universal Ma’at below.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · SWALLOWED BY DARK NUN',
        title: 'The Sunken Sarcophagus at the Bottom of the Abyss',
        subtitle: 'Scattered Beyond Isis’s Song Before the Scales Were Raised',
        location: 'Lightless Depths Below the Nile',
        platePath: '/plates/game/osiris-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your soul dissolved into primordial silence. Without Isis’s Heka ward or Ma’at’s balance, the shattered cedar chest sank forever into uncreated Nun, leaving mortals without hope beyond the grave.',
        mythicComparison:
          'The Pyramid Texts frame every funerary rite around rescuing the soul from this exact dissolution.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 7: INANNA (MESOPOTAMIAN MYTHOLOGY — DESCENT OF INANNA)
  // =========================================================================
  {
    id: 'inanna',
    deityId: 'inanna',
    traditionId: 'mesopotamian',
    dndClass: 'Star-Crowned Queen of Heaven & Kur',
    mortalOrOriginName: 'Young Goddess of Uruk’s Eanna Temple',
    ascendedTitle: 'Inanna-Ishtar — Sovereign of Morning Star, Love & Rebirth',
    subtitle: 'Dare the Seven Bolted Gates of the Great Below and return alive from death’s hook',
    startingStats: { might: 14, wisdom: 14, dominion: 14 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · FROM THE GREAT ABOVE TO GREAT BELOW',
        rankTitle: 'Lady of Eanna Ziggurat',
        title: 'Arraying the Seven Sacred Me & Warning Ninshubur',
        location: 'Lapis-Stepped Ziggurat of Uruk',
        platePath: '/plates/game/inanna-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Already Queen of Sky, you turn your ear toward the Great Below—domain of your grieving sister Ereshkigal—where no god descends and returns unchanged. Loyal vizier Ninshubur awaits your orders.',
        choices: [
          {
            id: 'in-1-plan',
            title: 'Don All Seven Sacred Me & Instruct Ninshubur to Petition Enki',
            subtitle: 'Prepare a three-day rescue pact with wise Enki in Eridu before descending',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Binding the Shugurra crown, lapis measuring rod, and royal robe, you leave airtight instructions with faithful Ninshubur—securing your lifeline before knocking on Kur’s outer gate!',
            failNarrative:
              'Descending in impulsive haste before briefing Ninshubur clearly, no one above knows which god to petition if Ereshkigal locks the gates!',
            mythicNote: 'Sumerian Descent of Inanna (c. 1900 BCE): foresight through Ninshubur saves Inanna when Enlil and Nanna refuse.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Pact of Faithful Ninshubur',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'in-1-army',
            title: 'March Down With Storm-Lions to Conquer Kur by Siege',
            subtitle: 'Attempt to overthrow Ereshkigal’s ancient realm by military force',
            flavorTag: 'IMPERIAL HUBRIS PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Even celestial lions cower before the Land of No Return’s ancient bronze bolts, trapping you in a bitter standoff in the dark.',
            mythicNote: 'Even sky sovereignty cannot repeal the ancient laws of Irkalla by force.',
            statDelta: { might: 2 },
          },
          {
            id: 'in-1-alone',
            title: 'Dismiss Ninshubur & Leap Unprepared Into the Abyss',
            subtitle: 'Tell no living soul where you are descending',
            flavorTag: 'FATAL ISOLATION',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'With no herald beating the drum for you in Eridu after three days, Kur’s seven bolts close behind you forever.',
            mythicNote: 'In Sumerian myth, without Ninshubur’s loyal lament, Inanna never rises.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · THE SEVEN BOLTED GATES',
        rankTitle: 'Stripped Pilgrim of Kur',
        title: '"Hush, Inanna, the Ways of the Underworld Are Perfect"',
        location: 'Seven Subterranean Gates of Ganzir',
        platePath: '/plates/game/inanna-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'At each of the seven bronze gates, chief gatekeeper Neti demands you surrender one piece of your divine regalia—crown, lapis beads, twin-ringed rod, royal garment—until you stand stripped of all sky-privilege!',
        choices: [
          {
            id: 'in-2-yield',
            title: 'Surrender Every Regalia With Unbroken Dignity & Face Your Sister',
            subtitle: 'Accept utter vulnerability to witness death’s truth firsthand',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Bowed yet fearless before the Seven Anunnaki Judges, you endure death’s gaze itself—unlocking the deepest mystery no sheltered sky-god ever knew!',
            failNarrative:
              'Fighting Neti at the fifth gate in panicked pride, galla-demons drag you bruised into dark corridors!',
            mythicNote: 'Canonical Descent: every earthly and heavenly pretension must be laid down at death’s threshold.',
            statDelta: { dominion: 2, might: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Lapis Measuring Rod of Kur',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'in-2-bribe',
            title: 'Offer to Co-Rule the Dead Forever Beside Ereshkigal',
            subtitle: 'Abandon Uruk and sunlight to become Twin Queen of Dust',
            flavorTag: 'UNDERWORLD PACT PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Ereshkigal pauses on her obsidian throne, intrigued by your dark proposal as earth above grows barren without love!',
            mythicNote: 'When Inanna/Ishtar remains below, all fertility on earth halts.',
          },
          {
            id: 'in-2-smashgate',
            title: 'Threaten to Shatter the Gates so the Dead Devour the Living',
            subtitle: 'Unleash premature necromantic chaos at Ganzir’s threshold',
            flavorTag: 'MIGHT CHECK · DC 17 (RECKLESS)',
            tone: 'check',
            check: { ability: 'might', dc: 17 },
            nextNodeId: 'branch-shadow',
            failNodeId: 'end-fail',
            successNarrative:
              'Bronze hinges groan under your fury before the Anunnaki bind you in heavy shadow-wards!',
            failNarrative:
              'Sixty underworld maladies strike you down before the seventh gate.',
            mythicNote: 'Akkadian Ishtar threatens to raise the dead—provoking Ereshkigal’s fiercest curse.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · WATER OF LIFE IN THE HOUSE OF DUST',
        rankTitle: 'Reborn From the Hook',
        title: 'Enki’s Two Clay Mourners & Ereshkigal’s Grief',
        location: 'Obsidian Throne Room of Irkalla',
        platePath: '/plates/game/inanna-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'After three days hung lifeless in Kur, wise Enki’s tiny clay-born kurgarra and galatur slip past the gates! Ereshkigal groans in lonely anguish upon her throne—how do you awaken through their empathy?',
        choices: [
          {
            id: 'in-3-empathy',
            title: 'Echo Ereshkigal’s Lament in True Compassion & Receive the Water of Life',
            subtitle: '"Oh, your heart! Oh, your interior!" — heal the rift through shared sorrow',
            flavorTag: 'WISDOM CHECK · DC 14',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Moved to tears that someone finally grieves WITH her instead of demanding tribute, Ereshkigal yields your body! Sprinkled sixty times with Food and Water of Life, you rise!',
            failNarrative:
              'Demanding release coldly without honoring Ereshkigal’s grief, the Anunnaki refuse passage unless you surrender half your divine Me forever!',
            mythicNote: 'Canonical masterstroke: neither weapons nor threats open Kur—only radical empathy.',
            statDelta: { wisdom: 3, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Eight-Pointed Star of Venus',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'in-3-stay',
            title: 'Refuse Revival to Sunlit Uruk & Claim Half of Irkalla’s Crown',
            subtitle: 'Stay below forever as co-sovereign of shadows',
            flavorTag: 'DIVERGENT QUEEN OF DUST',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Taking a dark seat beside Ereshkigal, stars dim over Mesopotamia as spring refuses to return.',
            mythicNote: 'Without Inanna’s ascent, blossoms and desire wither across the Tigris and Euphrates.',
          },
          {
            id: 'in-3-spill',
            title: 'Spurn Enki’s Humble Clay Emissaries in Royal Disdain',
            subtitle: 'Refuse aid fashioned from lowly fingernail dirt',
            flavorTag: 'FATAL PRIDE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'The Water of Life spills into grey dust, leaving your crown abandoned in eternal night.',
            mythicNote: 'Enki’s humblest creations succeed precisely because great war-gods could not.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · THE DARK COVENANT',
        rankTitle: 'Liminal Prisoner of Kur',
        title: 'Galla-Demons at the Cleft of Ascent',
        location: 'Subterranean Stairway Below Uruk',
        platePath: '/plates/retellings/katabasis-mesopotamian.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Pitiless galla-demons surround your ascent: "No one leaves the Great Below without honoring cosmic reciprocity! Will you restore seasonal balance above, or remain chained to underworld shadow?"',
        choices: [
          {
            id: 'in-sh-ascend',
            title: 'Reclaim All Seven Me & Swear the Seasonal Covenant of Renewal',
            subtitle: 'Balance winter descent and spring return between sky and earth',
            flavorTag: 'DOMINION CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'dominion', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Re-clothing yourself in robe, beads, and horned crown at each rising gate, you burst back toward Uruk’s starlit sky!',
            failNarrative:
              'Bound by Ereshkigal’s iron decree, you remain enthroned below in permanent subterranean twilight!',
            mythicNote: 'Inanna’s re-robing through the seven gates mirrors Venus’s astronomical reappearance after conjunction.',
            statDelta: { dominion: 2, might: 1 },
          },
          {
            id: 'in-sh-twinqueen',
            title: 'Embrace the Obsidian Crown Beside Sister Ereshkigal Forever',
            subtitle: 'Rule the silent dead as Twin Queen of Irkalla',
            flavorTag: 'ALTERNATE CHTHONIC ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Two sisters reign together in unbroken shadow while mortal cities mourn the vanished Morning Star.',
            mythicNote: 'Divergent Ending: permanent underworld sovereignty instead of celestial-earthly renewal.',
          },
          {
            id: 'in-sh-fightgalla',
            title: 'Fight All Seven Galla-Demons Barehanded Without Your Me',
            subtitle: 'Defy the Anunnaki’s substitution law by raw force',
            flavorTag: 'MIGHT CHECK · DC 18 (LETHAL)',
            tone: 'check',
            check: { ability: 'might', dc: 18 },
            nextNodeId: 'end-alt',
            failNodeId: 'end-fail',
            successNarrative:
              'Breaking free only into shadowed caverns, you rule as a solitary subterranean spirit.',
            failNarrative:
              'Galla-claws drag you back down beneath the seventh bronze bolt forever.',
            mythicNote: 'Sumerian texts describe galla-demons as immune to bribes, weapons, and flattery alike.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · JUDGMENT OF THE SEASONAL CYCLE',
        rankTitle: 'Risen Morning & Evening Star',
        title: 'Mercy for Faithful Ninshubur & Geshtinanna’s Half-Year',
        location: 'Apple-Tree Throne of Uruk',
        platePath: '/plates/game/inanna-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Rising into blazing daylight accompanied by galla-demons demanding a substitute, they try first to seize loyal Ninshubur clothed in sackcloth—then find proud Dumuzi feasting unbothered on your throne while his sister Geshtinanna weeps to share his fate!',
        choices: [
          {
            id: 'in-4-seasons',
            title: 'Protect Loyal Ninshubur & Ordain the Sacred Half-Year Cycle',
            subtitle: 'Honor loyalty and establish Dumuzi & Geshtinanna’s seasonal alternation',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              '"Never shall I yield my faithful Ninshubur who mourned for me!" Decreeing half-year seasons of grain and wine, you blaze across heaven and underworld alike—greater than any god who feared to descend!',
            failNarrative:
              'Refusing Geshtinanna’s compassionate plea in cold wrath, Uruk withers in permanent summer drought.',
            mythicNote: 'Canonical Apotheosis: Inanna honors loyalty, humbles hubris, and tempers justice with seasonal renewal.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'in-4-waronly',
            title: 'Cast Off Love & Reign Solely as Pitiless War-Empress',
            subtitle: 'Banish Dumuzi permanently and rule Mesopotamia by storm and lion alone',
            flavorTag: 'ALTERNATE WAR-EMPRESS ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Chariots thunder beneath your eight-pointed star, yet Eanna’s sacred gardens never bloom again.',
            mythicNote: 'Divergent Ending: stripping Inanna’s life-giving love to leave only martial fury.',
          },
          {
            id: 'in-4-betraynin',
            title: 'Hand Faithful Vizier Ninshubur Over to the Galla-Demons',
            subtitle: 'Betray the one servant whose loyalty saved your life',
            flavorTag: 'DISHONORED FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Breaking sacred reciprocity shatters your divine Me; Enki revokes his blessing and Kur’s shadow reclaims you.',
            mythicNote: 'Three times in the Sumerian poem Inanna fiercely refuses to betray loyal mourners.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Inanna-Ishtar — Queen of Heaven, Earth & the Conquered Threshold',
        subtitle: 'Blazing Eight-Pointed Star Who Died & Rose Wiser Than All Sky',
        location: 'Eanna Sanctuary of Uruk & the Celestial Horizon',
        platePath: '/plates/game/inanna-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You completed the oldest recorded descent-and-return apotheosis in human literature! By daring the Seven Gates of Kur, facing your shadow sister Ereshkigal in empathy, fiercely protecting loyal Ninshubur, and ordaining the seasonal cycle, you reign supreme across sky, earth, and death’s threshold.',
        mythicComparison:
          'Composed nearly four thousand years ago in Sumerian cuneiform, Inanna’s journey establishes the foundational archetype of initiation through vulnerability and rebirth.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · TWIN QUEEN OF THE HOUSE OF DUST',
        title: 'Co-Sovereign of Eternal Subterranean Twilight',
        subtitle: 'Enthroned Beside Ereshkigal Beneath a Starless Mesopotamia',
        location: 'Obsidian Palace of Irkalla',
        platePath: '/plates/game/inanna-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your story diverged from the Morning Star! Remaining below beside Ereshkigal or severing love from your crown, you rule in solemn chthonic majesty while the upper world longs in vain for spring’s return.',
        mythicComparison:
          'In Mesopotamian myth, Inanna’s completeness requires bridging both worlds—just as planet Venus rises as both Evening and Morning Star.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · LOST BEHIND SEVEN BRONZE BOLTS',
        title: 'The Fallen Horned Crown in the Dust of Ganzir',
        subtitle: 'Unmourned Above, Unrevived Below',
        location: 'Seventh Locked Gate of Kur',
        platePath: '/plates/game/inanna-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your descent ended in irreversible silence. Without Ninshubur’s lifeline, Enki’s humble clay mourners, or sacred reciprocity, the Land of No Return kept its ancient vow.',
        mythicComparison:
          'Cuneiform hymns marvel at Inanna’s survival precisely because Kur claimed every lesser challenger forever.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 8: SUSANOO (JAPANESE MYTHOLOGY — KOJIKI & NIHON SHOKI)
  // =========================================================================
  {
    id: 'susanoo',
    deityId: 'susanoo',
    traditionId: 'japanese',
    dndClass: 'Exiled Tempest Dragon-Slayer',
    mortalOrOriginName: 'Banished Storm-Outcast at Hi-kawa River',
    ascendedTitle: 'Susanoo-no-Mikoto — Hero of Izumo & Bearer of Kusanagi',
    subtitle: 'Redeem wild tempest exile by slaying the Eight-Forked Serpent and reconciling Heaven',
    startingStats: { might: 16, wisdom: 12, dominion: 13 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · EXILE BY THE HI RIVER',
        rankTitle: 'Banished Storm-Kami',
        title: 'Chopsticks Floating Down the Weeping Valley',
        location: 'Upper Reaches of Hi-kawa River, Izumo',
        platePath: '/plates/game/susanoo-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Cast out of High Heaven (Takamagahara) after your wild storm-tantrums drove sister Amaterasu into the Rock Cave, you walk Izumo’s misty valley—and find elderly earthly kami weeping beside their last surviving daughter Kushinadahime!',
        choices: [
          {
            id: 'su-1-protect',
            title: 'Pledge to Save Kushinadahime & Transform Her Safely Into a Sacred Comb',
            subtitle: 'Turn destructive storm-energy into protective earthly guardianship',
            flavorTag: 'DOMINION CHECK · DC 11',
            tone: 'check',
            check: { ability: 'dominion', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Tucking Kushinadahime safely as a sacred comb into your topknot, your wild grief finds noble purpose as protector of Izumo’s land!',
            failNarrative:
              'Barking arrogant demands at the terrified elders without protecting the maiden first, panic scatters the valley!',
            mythicNote: 'Kojiki Book I: exile transforms Susanoo from unruly sky-troublemaker into compassionate earthly hero.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Sacred Comb of Kushinadahime',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'su-1-storm',
            title: 'Ignore Their Tears & Claim Izumo’s Coast as Typhoon Warlord',
            subtitle: 'Nurse bitter resentment against Heaven from volcanic sea-cliffs',
            flavorTag: 'WRATHFUL OUTCAST PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Black gale-winds lash the coast around your solitary crag while Yamata-no-Orochi devours the inland valleys unchecked.',
            mythicNote: 'Unredeemed storm-rage leaves both hero and land in desolation.',
            statDelta: { might: 2 },
          },
          {
            id: 'su-1-stormheaven',
            title: 'Charge Back Up to Storm Heaven’s Eight-Hundred Guarded Gates',
            subtitle: 'Assault Takamagahara’s assembled Kami single-handedly in exile',
            flavorTag: 'FATAL DEFIANCE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Heavenly thunder-archers cast your unredeemed spirit down into dark Ne-no-Kuni’s deepest chasm.',
            mythicNote: 'Reconciliation with Amaterasu comes through honorable deeds, never brute rebellion.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · STRATEGY AGAINST MONSTROUS FORCE',
        rankTitle: 'Architect of the Eight Gates',
        title: 'Brewing the Eight-Fold Refined Sake',
        location: 'Cedar Palisade Overlooking Izumo Valley',
        platePath: '/plates/game/susanoo-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Mountains tremble as Yamata-no-Orochi approaches—eight heads, eight tails, red-bellied with blood, spanning eight valleys with moss and cypresses growing upon its back!',
        choices: [
          {
            id: 'su-2-sake',
            title: 'Erect Eight Palisade Gates With Eight Vats of Eight-Fold Sake',
            subtitle: 'Pair cunning patience with storm-strength before drawing Totsuka-no-Tsurugi',
            flavorTag: 'WISDOM CHECK · DC 13',
            tone: 'check',
            check: { ability: 'wisdom', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Unable to resist the fragrant amber brew, all eight dragon heads plunge deep into the vats and sink into thunderous drunken slumber!',
            failNarrative:
              'Springing from ambush too early before three of the heads drink, venomous jaws smash through the cedar palisade!',
            mythicNote: 'Canonical Kojiki tactic: true martial mastery marries chie (strategy) with courage.',
            statDelta: { wisdom: 2, might: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Totsuka Ten-Span Blade',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'su-2-frontal',
            title: 'Spurn Strategy & Charge All Eight Awake Dragon Heads Head-On',
            subtitle: 'Bet sheer berserker storm-fury against a mountain-sized leviathan',
            flavorTag: 'RECKLESS BERSERKER PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Lightning clashes against venom-fangs across smashed pines—leaving the valley half-ruined in a desperate war of attrition!',
            mythicNote: 'Pure rage without cunning mirrors Susanoo’s unrefined celestial past.',
          },
          {
            id: 'su-2-drinkself',
            title: 'Empty the Eight-Fold Sake Vats Yourself Before Battle',
            subtitle: 'Meet the eight-headed serpent while staggering drunk',
            flavorTag: 'FATAL FOLLY',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Asleep beside overturned cedar vats, Orochi’s mountain-heavy coils crush the palisade in black rain.',
            mythicNote: 'The trap meant to fell chaos destroys the careless warrior who indulges in it.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · BLADE IN THE FOURTH TAIL',
        rankTitle: 'Slayer of Orochi',
        title: 'Slashing the Serpent & Uncovering Kusanagi-no-Tsurugi',
        location: 'Blood-Red Waters of the Hi River',
        platePath: '/plates/game/susanoo-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Hacking fiercely through Orochi’s coils until the Hi River runs crimson, your ten-span blade suddenly chips with a ringing metallic flash against something hidden deep inside the middle tail!',
        choices: [
          {
            id: 'su-3-kusanagi',
            title: 'Slice Open the Tail Carefully & Draw Forth Radiant Kusanagi',
            subtitle: 'Recognize the cloud-wreathed divine sword as a sacred gift above personal greed',
            flavorTag: 'MIGHT CHECK · DC 14',
            tone: 'check',
            check: { ability: 'might', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Out gleams Ame-no-Murakumo-no-Tsurugi (Sword of the Gathering Clouds of Heaven—Kusanagi)! Recognizing its celestial aura immediately, your heart turns toward healing your bond with Amaterasu!',
            failNarrative:
              'Seizing the dazzling blade in possessive battle-lust, storm-clouds gather darkly around your fists as pride whispers to keep it for war!',
            mythicNote: 'Kojiki & Nihon Shoki: discovering Kusanagi becomes the pivot of cosmic reconciliation.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Kusanagi-no-Tsurugi (Cloud-Gathering Sword)',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'su-3-hoardblade',
            title: 'Claim Kusanagi Exclusively to Rival Amaterasu’s Sun-Throne',
            subtitle: 'Found a rival storm-empire in Izumo armed with the dragon-sword',
            flavorTag: 'RIVAL WARLORD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Holding Kusanagi aloft in defiance, thunderheads split Heaven and Earth into permanent armed suspicion.',
            mythicNote: 'Hoarding the regalia perpetuates the cosmic rift between Sun and Storm.',
          },
          {
            id: 'su-3-venom',
            title: 'Wrestle the Dying Eighth Head Barehanded in Venomous Floodwater',
            subtitle: 'Throw aside your blade before the final head falls',
            flavorTag: 'LETHAL VENOM',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Orochi’s dying fangs sink burning poison into your chest beneath the churning red torrent.',
            mythicNote: 'Even Thor fell nine paces from serpent venom—never drop your guard before the eighth head stills.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · TEMPEST OVER IZUMO',
        rankTitle: 'Unreconciled Storm-Lord',
        title: 'Amaterasu’s Sunlight Piercing the Storm-Clouds',
        location: 'Volcanic Sea-Cliffs of Suga, Izumo',
        platePath: '/plates/retellings/chaoskampf-japanese.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Standing atop black sea-cliffs while typhoons churn the coast, a single warm shaft of Amaterasu’s sunlight pierces the clouds—reminding you of your shared birth from father Izanagi’s purified eyes!',
        choices: [
          {
            id: 'su-sh-reconcile',
            title: 'Still the Tempest & Present Kusanagi in Sincere Reconciliation',
            subtitle: 'Bridge Takamagahara (Heaven) and Ashihara (Earth) in harmony',
            flavorTag: 'DOMINION CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'dominion', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Cooling your storm-wrath into refreshing rain over green rice-fields, Heaven accepts your noble offering in joy!',
            failNarrative:
              'Turning your back on the sunbeam, you grip the dragon-blade tightly atop solitary black cliffs!',
            mythicNote: 'In Shinto sensibility, makoto (sincere heart) purifies past transgression.',
            statDelta: { dominion: 2, wisdom: 1 },
          },
          {
            id: 'su-sh-typhoon',
            title: 'Keep Kusanagi & Reign Forever as Solitary Lord of Typhoons',
            subtitle: 'Rule the untamed outer seas apart from Heaven and Shrine alike',
            flavorTag: 'ALTERNATE TYPHOON ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Sailors bow in dread whenever black clouds gather above your volcanic headland.',
            mythicNote: 'Divergent Ending: elemental storm-warlord rather than Culture-Hero Ancestor of Izumo.',
          },
          {
            id: 'su-sh-abyss',
            title: 'Plunge With the Dragon-Corpse Into the Crushing Sea Trench',
            subtitle: 'Let tempest fury drag you beneath the ocean floor',
            flavorTag: 'SWALLOWED BY THE DEEP',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Whirlpools close above your helm as sword and warrior vanish into lightless ocean silt.',
            mythicNote: 'Unbounded chaos consumes itself in the deep.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · PALACE OF EIGHTFOLD CLOUDS',
        rankTitle: 'Founder of Suga',
        title: 'Presenting Kusanagi & Composing the First Waka Poem',
        location: 'Radiant Cloud-Wrapped Palace of Suga, Izumo',
        platePath: '/plates/game/susanoo-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Having offered Kusanagi to Amaterasu—uniting Imperial Regalia of Mirror, Jewel, and Sword—fresh luminous clouds rise where you build a wedding palace with rescued Kushinadahime!',
        choices: [
          {
            id: 'su-4-waka',
            title: 'Sing the First Thirty-One-Syllable Waka Poem & Bless Ōkuninushi’s Line',
            subtitle: '"Eightfold rising clouds build an eightfold fence..." — unite valor, love, and poetry',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Exile becomes apotheosis! Revered across Izumo and all Japan as dragon-slayer, first poet of Waka verse, and revered ancestor of nation-builder Ōkuninushi!',
            failNarrative:
              'Retreating wordlessly into shadowy Ne-no-Kuni without blessing Izumo’s lineage, your palace stands unfinished.',
            mythicNote: 'Kojiki Book I: Susanoo’s "Yakumo tatsu" song is celebrated in Japanese tradition as the very first Waka poem.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'su-4-hermit',
            title: 'Leave Izumo Immediately to Dwell Alone in Shadowy Ne-no-Kuni',
            subtitle: 'Forsake earthly poetry and family for stern subterranean solitude',
            flavorTag: 'ALTERNATE ROOT-REALM ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Passing silently beneath mountain roots, you rule distant Ne-no-Kuni in stern austerity.',
            mythicNote: 'Divergent Ending: skipping Izumo’s cultural flowering and poetic legacy.',
          },
          {
            id: 'su-4-reclaim',
            title: 'Snatch Kusanagi Back From Heaven’s Envoy at the Altar',
            subtitle: 'Shatter the newly sealed peace at the final instant',
            flavorTag: 'BROKEN OATH FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Violating sacred purification (harai) calls down eight-hundred heavenly spears upon Suga’s unfinished eaves.',
            mythicNote: 'Sincerity of offering seals Shinto harmony between Heaven and Earth.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Susanoo-no-Mikoto — Dragon-Slayer, First Poet & Guardian of Izumo',
        subtitle: 'Redeemed Tempest-Kami Who Gifted Kusanagi & Founded Suga’s Lineage',
        location: 'Grand Shrine Precincts of Izumo & Suga',
        platePath: '/plates/game/susanoo-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You fulfilled Susanoo’s canonical Kojiki transformation! Cast out of Heaven as an untamed tempest, you protected Kushinadahime, outsmarted the eight-headed Yamata-no-Orochi, gifted sacred Kusanagi to Amaterasu in reconciliation, and sang Japan’s first Waka poem beneath rising eightfold clouds.',
        mythicComparison:
          'Susanoo’s arc illustrates how Shinto myth redeems raw, unruly nature (aramitama) into protective culture, marriage, and poetry (nigimitama).',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · WARLORD OF UNENDING TYPHOONS',
        title: 'The Solitary Bearer of Kusanagi Upon Storm-Lashed Cliffs',
        subtitle: 'Unreconciled With Heaven, Feared Across Turbulent Seas',
        location: 'Black Volcanic Headland Over the Sea of Japan',
        platePath: '/plates/game/susanoo-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your path diverged from Suga’s peaceful clouds! Hoarding Kusanagi or nursing exile’s wrath over reconciliation with Amaterasu, you endure as a fierce, solitary storm-warlord rather than founder of Izumo’s poetic lineage.',
        mythicComparison:
          'In the Kojiki, gifting Kusanagi to Amaterasu is the indispensable gesture that unites celestial light with earthly valor.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · CRUSHED BENEATH EIGHT SERPENT HEADS',
        title: 'Shattered Palisades in the Flooded Valley of Hi-kawa',
        subtitle: 'Overwhelmed by Yamata-no-Orochi Before Dawn Broke',
        location: 'Ruined Mountain Valley of Izumo',
        platePath: '/plates/game/susanoo-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your campaign perished in black rain. Without patient eight-fold strategy or protective resolve, Yamata-no-Orochi’s coils overwhelmed the valley and Kusanagi remained buried forever in darkness.',
        mythicComparison:
          'Japanese Chaoskampf emphasizes that raw storm-might succeeds only when guided by protective care and strategic craft.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 9: INDRA (HINDU & VEDIC MYTHOLOGY — RIGVEDA 1.32)
  // =========================================================================
  {
    id: 'indra',
    deityId: 'indra',
    traditionId: 'hindu',
    dndClass: 'Vedic Storm-Charioteer of Dharma',
    mortalOrOriginName: 'Young Deva Challenger Before Locked Mountains',
    ascendedTitle: 'Indra Maghavan — Liberator of the Seven Rivers & King of Svarga',
    subtitle: 'Honor Sage Dadhichi’s selfless Vajra to shatter Vritra and free the cosmic waters',
    startingStats: { might: 16, wisdom: 13, dominion: 13 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · DROUGHT ACROSS THE THREE WORLDS',
        rankTitle: 'Young Deva Champion',
        title: 'Vritra’s Ninety-Nine Coils Blocking the Sky-Waters',
        location: 'Parched Himalayan Foothills Beneath Dark Coils',
        platePath: '/plates/game/indra-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Colossal dragon Vritra ("The Encloser") coils across the mountains, hoarding every river and raincloud until earth cracks and elder Devas shrink back in dread—For no ordinary bronze weapon can pierce Vritra’s hide!',
        choices: [
          {
            id: 'id-1-counsel',
            title: 'Seek Vishnu’s Counsel & Journey Humbly to Sage Dadhichi’s Ashram',
            subtitle: 'Learn that only selfless ascetic tapas can forge a weapon strong enough',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Bowing before forest-sage Dadhichi, you witness supreme dharma as the sage enters yoga-samadhi to gift his luminous spine for the Three Worlds’ salvation!',
            failNarrative:
              'Charging into Dadhichi’s grove with royal impatience rather than reverence, the rishis rebuke your pride!',
            mythicNote: 'Mahabharata & Bhagavata Purana: martial might fails against Vritra until joined with ascetic self-sacrifice.',
            statDelta: { wisdom: 2, dominion: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Three Soma Vats of Trikadruka',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'id-1-hoard',
            title: 'Retreat Into Svarga’s Clouds & Hoard the Last Rain for Devas Alone',
            subtitle: 'Abandon parched earth below to protect your own heavenly garden',
            flavorTag: 'ALOOF INDULGENCE PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Locking Amaravati’s gates while Vedic fire-altars starve below, your own celestial strength begins to wane.',
            mythicNote: 'In Vedic reciprocity (yajña), gods and mortals nourish one another.',
          },
          {
            id: 'id-1-bare',
            title: 'Charge Vritra’s Jaws Alone With Ordinary Bronze Arrows',
            subtitle: 'Attack the invulnerable dragon before the Vajra is forged',
            flavorTag: 'FATAL RECKLESSNESS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Your mundane arrows shatter like dry reeds as Vritra’s coils crush your chariot into the parched canyon.',
            mythicNote: 'Vritra’s boon renders all wood, stone, and ordinary metal powerless against him.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · FORGING THE HUNDRED-JOINTED VAJRA',
        rankTitle: 'Bearer of Sacred Tapas',
        title: 'Tvashtar’s Celestial Forge & the Maruts’ Storm-Oath',
        location: 'Sacred Hermitage on the Sarasvati Bank',
        platePath: '/plates/game/indra-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Divine artificer Tvashtar shapes Dadhichi’s radiant bones into the hundred-pronged thunderbolt Vajra while the turbulent storm-troop Maruts test whether you will share glory or claim credit alone!',
        choices: [
          {
            id: 'id-2-maruts',
            title: 'Honor the Maruts as Sworn Storm-Brothers & Lift the Blazing Vajra',
            subtitle: 'Unite wind, thunder, and sacred hymn before mounting your golden chariot',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Forty-nine howling Marut storm-spirits rally around your golden axle as the Vajra hums with blinding solar lightning in your grip!',
            failNarrative:
              'Quarreling with the Maruts over sacrificial shares, they abandon your flanks just as Vritra’s tempest darkens the sky!',
            mythicNote: 'Rigveda 1.165: Indra’s dialogue and reconciliation with the Maruts strengthens heaven’s storm-host.',
            statDelta: { might: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Hundred-Jointed Vajra Thunderbolt',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'id-2-boast',
            title: 'Dismiss the Maruts & Drink All Sacrificial Soma in Solitary Pride',
            subtitle: 'Refuse allies and revel in intoxicating arrogance',
            flavorTag: 'INTOXICATED HUBRIS PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Riding alone in haughty splendor, you overlook the subtle karmic flaw of Brahma-hatya awaiting careless wrath.',
            mythicNote: 'Later Puranas repeatedly test Indra whenever royal pride (mada) eclipses dharma.',
          },
          {
            id: 'id-2-dropvajra',
            title: 'Hurl the Unfinished Vajra Prematurely at Tvashtar’s Forge',
            subtitle: 'Test celestial lightning recklessly inside the hermitage',
            flavorTag: 'CATASTROPHIC BACKFIRE',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Unbound thunder-fire shatters the sacred anvil and consumes your chariot before Vritra is ever met.',
            mythicNote: 'Sacred weapons demand disciplined Vedic consecration.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · CLASH ABOVE THE LOCKED PEAKS',
        rankTitle: 'Vritrahan ("Dragon-Slayer")',
        title: 'Twilight Foam & the Thunderbolt Strike',
        location: 'Storm-Cloven Summit of the Locked Waters',
        platePath: '/plates/game/indra-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Lightning and hail roar as Vritra wraps ninety-nine coils around the peaks—protected by a riddle: neither by day nor by night, neither with dry nor with wet may he be slain! Dusk falls as sea-foam surges nearby.',
        choices: [
          {
            id: 'id-3-twilight',
            title: 'Strike at Twilight With Vajra Cloaked in Luminous Sea-Foam',
            subtitle: 'Fulfill cosmic law precisely—shattering Vritra’s shoulders to free the waters!',
            flavorTag: 'MIGHT CHECK · DC 14',
            tone: 'check',
            check: { ability: 'might', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Like felled mountain pines Vritra crashes down! Seven pent-up rivers burst forth like joyous cattle rushing to the sea as sunlight floods the cosmos!',
            failNarrative:
              'Striking in blind fury before dusk without honoring cosmic law, dark shadow of transgression (*पाप*) clings to your hands—driving you to hide inside a lotus stem!',
            mythicNote: 'Rigveda 1.32 & Shatapatha Brahmana: Indra slays Vritra at sandhya (twilight) with foam-wrapped Vajra.',
            statDelta: { might: 2, wisdom: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Airavata’s White Cloud-Crown',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'id-3-claimwaters',
            title: 'Dam the Freed Rivers Again as Private Tribute for Svarga',
            subtitle: 'Replace Vritra’s hoarding with your own royal toll over rain',
            flavorTag: 'HOARDER KING PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Mortals cry out below as you ration monsoon clouds from behind golden palace walls!',
            mythicNote: 'Becoming a hoarder repeats Vritra’s exact adharmic sin.',
          },
          {
            id: 'id-3-swallowed',
            title: 'Leap Unarmed Into Vritra’s Cavernous Fangs',
            subtitle: 'Abandon both chariot and Vajra mid-tempest',
            flavorTag: 'SWALLOWED IN DARKNESS',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Crushed inside Vritra’s dark coils without the Vajra, drought freezes the Three Worlds forever.',
            mythicNote: 'Only Dadhichi’s Vajra can cleave the Encloser from without or within.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · EXILE IN THE LOTUS STEM',
        rankTitle: 'Humbled King of Amaravati',
        title: 'Brihaspati’s Counsel Over Pride & Penance',
        location: 'Misty Lake Manasarovar Beneath Mount Meru',
        platePath: '/plates/retellings/chaoskampf-hindu.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Because royal pride or rash transgression clouded your victory, your radiance dims! Divine preceptor Brihaspati stands beside the lotus lake: "True Maghavan ("Bountiful Lord") rules to give rain freely, never to hoard glory!"',
        choices: [
          {
            id: 'id-sh-atone',
            title: 'Perform Sacred Ashvamedha Penance & Release Every Raincloud Freely',
            subtitle: 'Cleanse royal pride so dharma and monsoon abundance flow unchecked',
            flavorTag: 'WISDOM CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Purified in sacred waters and blessed by Brihaspati, golden luster returns tenfold as the Seven Rivers sing your praise!',
            failNarrative:
              'Clinging stubbornly to isolated palace luxury, you reign anxiously behind locked cloud-gates!',
            mythicNote: 'Puranic Indra repeatedly recovers his throne only when humility replaces royal ahamkara (ego).',
            statDelta: { wisdom: 2, dominion: 2 },
          },
          {
            id: 'id-sh-palace',
            title: 'Lock Svarga’s Gates & Reign in Anxious Opulence Alone',
            subtitle: 'Guard your Soma chalices jealously against sages and mortals alike',
            flavorTag: 'ALTERNATE HOARDER ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Feasting anxiously in Amaravati, you fear every rising sage’s tapas while earth below prays to other gods.',
            mythicNote: 'Divergent Ending: the insecure Puranic Indra rather than heroic Rigvedic Maghavan.',
          },
          {
            id: 'id-sh-curse',
            title: 'Insult Sage Durvasas & Trample His Sacred Garland Underfoot',
            subtitle: 'Compound pride with open contempt for Vedic wisdom',
            flavorTag: 'CURSED RUIN',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Durvasas’s righteous curse drains all fortune (Shri) from the Three Worlds, toppling your throne into dark ocean.',
            mythicNote: 'Vishnu Purana: trampling Durvasas’s garland strips Svarga of all prosperity.',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · ENTHRONEMENT OF MAGHAVAN',
        rankTitle: 'Liberator of the Waters',
        title: 'Raising the Sun & Pouring Out the Seven Rivers',
        location: 'Golden Summit of Mount Meru Above Flowing Valleys',
        platePath: '/plates/game/indra-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'With Vritra vanquished, seven mighty rivers gleam below while Dawn (Ushas) and the Sun await your sovereign hand to set the cosmic order (Rita) flowing!',
        choices: [
          {
            id: 'id-4-maghavan',
            title: 'Raise the Sun High & Rule as Open-Handed Maghavan ("The Bountiful")',
            subtitle: 'Circulate rain, light, and generosity freely across all living beings',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              '"I will proclaim the heroic deeds of Indra!" Crowned King of Devas on Mount Meru, 250 Rigvedic hymns immortalize your generous thunder forever!',
            failNarrative:
              'Retreating into courtly pleasure once the battle ends, your heroic fire fades into gilded complacency.',
            mythicNote: 'Rigveda 1.32: Indra not only frees the waters—he generates Sun, Sky, and Dawn anew.',
            statDelta: { dominion: 3, might: 2 },
          },
          {
            id: 'id-4-pleasure',
            title: 'Retire Permanently Into Celestial Pleasure-Groves',
            subtitle: 'Leave cosmic order unattended once Vritra lies slain',
            flavorTag: 'ALTERNATE GILDED ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Lulled by celestial music in Nandana grove, other cosmic guardians step forward as your thunder grows distant.',
            mythicNote: 'Divergent Ending: resting on past laurels rather than sustaining Rita.',
          },
          {
            id: 'id-4-tyrant',
            title: 'Drown Mortal Kingdoms With Endless Monsoon Floods to Demand Worship',
            subtitle: 'Turn liberated life-water into coercive destruction',
            flavorTag: 'HUBRISTIC FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Mountains themselves rise to shelter earth from your arrogance, shattering your storm-authority.',
            mythicNote: 'Foreshadows Govardhana: storm-power used for wounded vanity always fails.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Indra Maghavan — Wielder of the Vajra & Sovereign of Svarga',
        subtitle: 'Liberator of the Seven Rivers & Champion of Cosmic Rita',
        location: 'Golden Throne of Amaravati Atop Mount Meru',
        platePath: '/plates/game/indra-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You fulfilled the supreme Rigvedic apotheosis! Honoring Sage Dadhichi’s selfless sacrifice, rallying the Marut storm-brotherhood, and cleaving Vritra at twilight to liberate life-giving waters for all beings, you shine as Maghavan—the Bountiful Storm-King praised in quarter of all Rigvedic hymns.',
        mythicComparison:
          'Indra’s battle against Vritra ("The Encloser") frames divinity as generous circulation against hoarding stagnation.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · JEALOUS LORD OF LOCKED CLOUDS',
        title: 'The Anxious Monarch of Isolated Amaravati',
        subtitle: 'Gilded in Soma-Splendor, Guarding a Fragile Throne',
        location: 'Cloud-Walled Palace of Svarga',
        platePath: '/plates/game/indra-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your choices led from Rigvedic heroism into gilded isolation! Hoarding Soma and cloud-tribute behind palace walls rather than sharing bounty freely, you rule anxiously over heaven while mortal hearts turn elsewhere.',
        mythicComparison:
          'Indian mythology itself explores this exact arc—contrasting the bold Rigvedic liberator with the later Puranic monarch tested by pride.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · CRUSHED BENEATH THE ENCLOSER',
        title: 'Shattered Chariot in the Parched Canyon of Vritra',
        subtitle: 'The Seven Rivers Remained Locked in Stone & Drought',
        location: 'Dry Gorge Under Vritra’s Ninety-Nine Coils',
        platePath: '/plates/game/indra-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your quest perished in parched darkness. Without Dadhichi’s selfless Vajra or Brihaspati’s dharmic counsel, Vritra’s coils kept the cosmic waters imprisoned forever.',
        mythicComparison:
          'Vedic myth stresses that brute force without sacred sacrifice (yajña) and dharma shatters against primordial chaos.',
      },
    },
  },

  // =========================================================================
  // CAMPAIGN 10: LUGH (CELTIC MYTHOLOGY — CATH MAIGE TUIRED)
  // =========================================================================
  {
    id: 'lugh',
    deityId: 'lugh',
    traditionId: 'celtic',
    dndClass: 'Samildánach (Master of All Arts)',
    mortalOrOriginName: 'Half-Fomorian Outsider at the Gates of Tara',
    ascendedTitle: 'Lugh Lámhfhada — Sovereign of Every Craft & Slayer of Balor',
    subtitle: 'Prove mastery of every art at Tara and shatter Balor’s Poisonous Eye at Moytura',
    startingStats: { might: 14, wisdom: 15, dominion: 14 },
    startingResolve: 3,
    startNodeId: 'act-1',
    mapEdges: [
      { from: 'act-1', to: 'act-2', style: 'canonical' },
      { from: 'act-1', to: 'branch-shadow', style: 'branch' },
      { from: 'act-1', to: 'end-fail', style: 'doom' },
      { from: 'act-2', to: 'act-3', style: 'canonical' },
      { from: 'act-2', to: 'branch-shadow', style: 'branch' },
      { from: 'act-2', to: 'end-fail', style: 'doom' },
      { from: 'act-3', to: 'act-4', style: 'canonical' },
      { from: 'act-3', to: 'branch-shadow', style: 'branch' },
      { from: 'act-3', to: 'end-fail', style: 'doom' },
      { from: 'branch-shadow', to: 'act-4', style: 'canonical' },
      { from: 'branch-shadow', to: 'end-alt', style: 'branch' },
      { from: 'branch-shadow', to: 'end-fail', style: 'doom' },
      { from: 'act-4', to: 'end-deity', style: 'canonical' },
      { from: 'act-4', to: 'end-alt', style: 'branch' },
      { from: 'act-4', to: 'end-fail', style: 'doom' },
    ],
    nodes: {
      'act-1': {
        id: 'act-1',
        kind: 'encounter',
        chapterLabel: 'ACT I · THE GATEKEEPER’S RIDDLE AT TARA',
        rankTitle: 'Young Foster-Son of Manannán',
        title: '"No One Enters Tara Without a Unique Art"',
        location: 'Torchlit Bronze Ramparts of Royal Tara',
        platePath: '/plates/game/lugh-1.webp',
        mapX: 85,
        mapY: 108,
        dmPrompt:
          'Groaning under Fomorian tyranny, Tara’s gatekeeper bars your path: "We already have a smith, a champion, a harper, a poet, a physician, and a cupbearer!" How do you win admission?',
        choices: [
          {
            id: 'lg-1-allarts',
            title: 'Answer: "Ask Your King Whether He Has ONE Man Who Masters ALL Arts Together!"',
            subtitle: 'Win fidchell chess, play the three harp-strains, and awe King Nuada',
            flavorTag: 'WISDOM CHECK · DC 11',
            tone: 'check',
            check: { ability: 'wisdom', dc: 11 },
            nextNodeId: 'act-2',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Playing the strains of sorrow, joy, and sleep upon Dagda’s harp after sweeping every fidchell board, King Nuada rises from his own silver-handed throne to seat you for thirteen days as Sage of All Arts!',
            failNarrative:
              'Battering the gate with your spear instead of answering with polymathic wit, the Tuatha Dé Danann distrust your Fomorian bloodline!',
            mythicNote: 'Cath Maige Tuired §§53–74: Lugh earns sovereignty by uniting warrior, artisan, healer, and bard in one mind.',
            statDelta: { wisdom: 2, dominion: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Spear of Assal & Fidchell Crown',
              bonusAbility: 'wisdom',
              bonusValue: 2,
            },
          },
          {
            id: 'lg-1-mercenary',
            title: 'Offer Only Brutal Spear-Work as a Hired Warlord',
            subtitle: 'Hide poetry, healing, and smithcraft behind grim iron force',
            flavorTag: 'GRIM WARLORD PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Admitted merely as a border guard rather than counselor, Ireland’s artisans remain uncoordinated as Fomorian fleets gather.',
            mythicNote: 'Without Lugh’s synthesis of all crafts, weapons alone cannot match Balor’s host.',
            statDelta: { might: 2 },
          },
          {
            id: 'lg-1-joinfomor',
            title: 'Sail Out to Tory Island & Pledge Fealty to Grandfather Balor',
            subtitle: 'Betray your mother Ethniu’s imprisonment for Fomorian gold',
            flavorTag: 'FATAL BETRAYAL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Remembering the prophecy that his grandson will slay him, suspicious Balor casts you bound into the churning Atlantic abyss on sight.',
            mythicNote: 'Balor locked his own daughter Ethniu in a crystal tower precisely to prevent Lugh’s birth.',
          },
        ],
      },

      'act-2': {
        id: 'act-2',
        kind: 'encounter',
        chapterLabel: 'ACT II · THE THREE STRIKES OF THE ARTISANS',
        rankTitle: 'Marshal of the Tuatha Dé',
        title: 'Coordinating Goibniu’s Forge & Dian Cécht’s Healing Well',
        location: 'Hidden Forge-Caverns Below Magh Tuiredh',
        platePath: '/plates/game/lugh-2.webp',
        mapX: 265,
        mapY: 66,
        dmPrompt:
          'Seven years of secret preparation culminate before battle! Every god of the Tuatha Dé Danann awaits your question: "And you—what power will you wield for Ireland in the battle?"',
        choices: [
          {
            id: 'lg-2-unite',
            title: 'Orchestrate Smith, Wright, Brazier & Healer Into Unbreakable Harmony',
            subtitle: 'Empower Goibniu’s three-blow spears and Sláine’s Well of Rebirth',
            flavorTag: 'DOMINION CHECK · DC 13',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'act-3',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Every spearhead leaps forged in three strikes while Dian Cécht’s herbal well revives fallen champions by dawn—turning artists and healers into the backbone of victory!',
            failNarrative:
              'Neglecting the smiths and healers to drill front-line swordsmen alone, Fomorian spy Ruadán sabotages Goibniu’s forge!',
            mythicNote: 'Cath Maige Tuired §§95–123: Celtic sovereignty harmonizes every social craft rather than exalting war alone.',
            statDelta: { dominion: 2, might: 1 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Tathlum (Forbidding Sling-Stone)',
              bonusAbility: 'might',
              bonusValue: 2,
            },
          },
          {
            id: 'lg-2-conscript',
            title: 'Force Bards & Physicians Onto the Shield-Wall as Foot-Soldiers',
            subtitle: 'Treat every sacred art as disposable infantry',
            flavorTag: 'IRON CONSCRIPTION PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Harp-strings snap and healing herbs go ungathered as grim resentment chills the Tuatha Dé camp.',
            mythicNote: 'Erasing specialized craft weakens the sacred Triad of Ireland.',
          },
          {
            id: 'lg-2-duelnuada',
            title: 'Overthrow Silver-Handed King Nuada in Camp Before the Battle',
            subtitle: 'Shatter Tuatha Dé unity on the eve of the Fomorian landing',
            flavorTag: 'FRATRICIDAL RUIN',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Divided in civil bloodshed on the plain, Balor’s landing legions sweep away both factions before noon.',
            mythicNote: 'Nuada willingly yields command to Lugh out of mutual honor, never coup.',
          },
        ],
      },

      'act-3': {
        id: 'act-3',
        kind: 'encounter',
        chapterLabel: 'ACT III · BALOR OF THE POISONOUS EYE',
        rankTitle: 'Champion of Moytura',
        title: 'Four Men Lifting the Eyelid of Destruction',
        location: 'Storm-Lashed Plain of Magh Tuiredh',
        platePath: '/plates/game/lugh-3.webp',
        mapX: 455,
        mapY: 62,
        dmPrompt:
          'Colossal Balor strides onto the field and fells King Nuada! Four Fomorian giants hook a polished ring into Balor’s brow to haul open his venomous lid whose single glance petrifies thousands!',
        choices: [
          {
            id: 'lg-3-sling',
            title: 'Chant the Corrguinecht Crane-Stance & Hurl Your Sling-Stone First',
            subtitle: 'Strike the split-second the lid parts—driving the Eye out through Balor’s own ranks!',
            flavorTag: 'MIGHT CHECK · DC 14',
            tone: 'check',
            check: { ability: 'might', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'branch-shadow',
            successNarrative:
              'Blazing like a meteor, your Tathlum stone drives Balor’s venomous eye straight through the back of his skull—turning its own lethal gaze onto thrice-nine Fomorian hosts behind him!',
            failNarrative:
              'Grazed by the edge of Balor’s scorching gaze before your stone flies, half the plain turns to blackened ash in a pyrrhic rout!',
            mythicNote: 'Canonical Cath Maige Tuired §135: precision from afar defeats monstrous tyranny’s own weapon.',
            statDelta: { might: 2, wisdom: 2 },
            failResolveDelta: -1,
            unlockedRelic: {
              name: 'Cloak of Manannán’s Sea-Mist',
              bonusAbility: 'dominion',
              bonusValue: 2,
            },
          },
          {
            id: 'lg-3-charge',
            title: 'Charge Straight Into Balor’s Gaze With Drawn Sword',
            subtitle: 'Scorn the sling for close-quarters glory',
            flavorTag: 'SCORCHED VICTORY PATH',
            tone: 'hubris',
            nextNodeId: 'branch-shadow',
            successNarrative:
              'Shield melting white-hot in your hand, you survive scarred while Ireland’s fertile meadows wither under Balor’s sweep!',
            mythicNote: 'Lugh ("Long-Armed") triumphs specifically through ranged mastery.',
          },
          {
            id: 'lg-3-stare',
            title: 'Lock Eyes Unshielded With Balor’s Raised Lid',
            subtitle: 'Try to out-stare the cauldron-poisoned Eye of Ruin',
            flavorTag: 'WITHERED TO ASH',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Drained of every ounce of strength in a single heartbeat, your spear and harp crumble on the scorched plain.',
            mythicNote: 'Brewed from venomous druid-smoke in youth, Balor’s open eye spares none who stare directly.',
          },
        ],
      },

      'branch-shadow': {
        id: 'branch-shadow',
        kind: 'encounter',
        chapterLabel: 'SHADOW CROSSROADS · BLIGHT OVER ERIN',
        rankTitle: 'Scarred Victor in Grey Mist',
        title: 'Half-Fomorian Bres Pleading Beneath Your Blade',
        location: 'Ash-Strewn Ridge Above Moytura',
        platePath: '/plates/retellings/chaoskampf-celtic.webp',
        mapX: 380,
        mapY: 158,
        dmPrompt:
          'Defeated ex-king Bres kneels captive amid scorched fields: "Spare me, Lugh, and I will reveal the sacred secrets of Ireland’s ploughing, sowing, and reaping—slay me in wrath, and rule barren stone!"',
        choices: [
          {
            id: 'lg-sh-harvest',
            title: 'Extract the Sacred Agricultural Calendar to Heal the Land',
            subtitle: '"Plough on Tuesday, sow on Tuesday, reap on Tuesday!" — choose fertility over blood',
            flavorTag: 'WISDOM CHECK · DC 14 (REDEMPTION)',
            tone: 'check',
            check: { ability: 'wisdom', dc: 14 },
            nextNodeId: 'act-4',
            failNodeId: 'end-alt',
            successNarrative:
              'Securing the Fomorians’ deep agricultural lore while banishing tyranny forever, green shoots burst across the healed hills toward Lughnasadh!',
            failNarrative:
              'Executing Bres before hearing the harvest calendar, Ireland remains locked in austere iron winter!',
            mythicNote: 'Cath Maige Tuired §§149–161: Lugh converts defeated Fomorian power into agricultural abundance.',
            statDelta: { wisdom: 2, dominion: 2 },
          },
          {
            id: 'lg-sh-iron',
            title: 'Slay Bres Instantly & Rule a Songless Iron Fortress',
            subtitle: 'Prioritize harsh military tribute over harvest festivals and bards',
            flavorTag: 'ALTERNATE IRON ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'You become the very image of stern Bres before you—unchallenged in arms, yet ruling milkless kine and silent halls.',
            mythicNote: 'Divergent Ending: repeating Bres’s ungenerous kingship rather than true Celtic fír flathemon.',
          },
          {
            id: 'lg-sh-ransom',
            title: 'Accept Bres’s Empty Promise That Cows Will Always Give Milk Without Grass',
            subtitle: 'Fall for his first deceptive riddle',
            flavorTag: 'DECEIVED RUIN',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'Tricked by Bres’s hollow riddle while Fomorian raiders regroup offshore, famine and second invasion overwhelm Tara.',
            mythicNote: 'In the saga, druids warn Lugh explicitly against Bres’s first two trick-offers!',
          },
        ],
      },

      'act-4': {
        id: 'act-4',
        kind: 'encounter',
        chapterLabel: 'ACT IV · FIRST HARVEST OF LUGHNASADH',
        rankTitle: 'High King of Tara',
        title: 'Founding the Sacred Games of Tailtiu & Sovereign Peace',
        location: 'Emerald Assembly Plain of Tailtiu & Tara',
        platePath: '/plates/game/lugh-4.webp',
        mapX: 625,
        mapY: 66,
        dmPrompt:
          'Fomorian ships vanish beyond the horizon as the Morrígan chants peace from earth to sky! Foster-mother Tailtiu cleared Ireland’s plains for grain with her last breath—how do you seal your High Kingship?',
        choices: [
          {
            id: 'lg-4-lughnasadh',
            title: 'Institute the Festival of Lughnasadh: Games, Poetry, Crafts & Shared Harvest',
            subtitle: 'Unite Fir Flathemon (Ruler’s Truth) so land and people flourish as one',
            flavorTag: 'DOMINION CHECK · DC 13 (APOTHEOSIS)',
            tone: 'check',
            check: { ability: 'dominion', dc: 13 },
            nextNodeId: 'end-deity',
            failNodeId: 'end-alt',
            successNarrative:
              'Orchards bend heavy with fruit, salmon leap in every estuary, and from Ireland to Lugdunum (Lyon) across Gaul, Lugh Samildánach shines as radiant sovereign of every art!',
            failNarrative:
              'Canceling the assembly of bards and games for heavy war-taxes, clouds dim over Tailtiu’s plain.',
            mythicNote: 'Canonical Apotheosis: Lughnasadh (August 1) celebrates Lugh’s union of skill, harvest, and just rule.',
            statDelta: { dominion: 3, wisdom: 2 },
          },
          {
            id: 'lg-4-depart',
            title: 'Sail West Immediately to Manannán’s Misty Island & Leave Tara Kingless',
            subtitle: 'Prefer solitary immortal craft in Emain Ablach over earthly sovereignty',
            flavorTag: 'ALTERNATE OTHERWORLD ENDING',
            tone: 'pact',
            nextNodeId: 'end-alt',
            successNarrative:
              'Vanishing into silver sea-mist aboard Wave-Sweeper, poets remember a mysterious visitor who saved Erin and departed.',
            mythicNote: 'Divergent Ending: Otherworld retreat rather than forty-year High Kingship.',
          },
          {
            id: 'lg-4-falsejudge',
            title: 'Deliver False Royal Judgments to Seize the Dagda’s Cauldron',
            subtitle: 'Break fír flathemon (Sovereign Truth) on your coronation day',
            flavorTag: 'BLIGHTED CROWN FALL',
            tone: 'hubris',
            nextNodeId: 'end-fail',
            successNarrative:
              'In Celtic sacred law, a king’s false judgment blights soil and topples Tara’s stones overnight.',
            mythicNote: 'Audacht Morainn: the land itself rejects an unjust Celtic sovereign.',
          },
        ],
      },

      'end-deity': {
        id: 'end-deity',
        kind: 'ending',
        endingTier: 'deity',
        badgeLabel: 'TRUE DEITY ENDING · CANONICAL APOTHEOSIS',
        title: 'Lugh Lámhfhada Samildánach — Sovereign of All Arts & Harvest Light',
        subtitle: 'Slayer of Balor, High King of Tara & Patron of Lughnasadh',
        location: 'Royal Mound of Tara & Sacred Plain of Tailtiu',
        platePath: '/plates/game/lugh-4.webp',
        mapX: 785,
        mapY: 48,
        epilogue:
          'You fulfilled Lugh’s canonical Celtic apotheosis! Entering Tara as a polymath of every art, harmonizing smiths, healers, and poets, shattering Balor’s poisonous eye, winning Ireland’s agricultural secrets, and founding Lughnasadh, your name endures across Ireland, Wales (Lleu), and Gaul (Lugus).',
        mythicComparison:
          'Lugh embodies the uniquely Celtic ideal that true sovereignty belongs not to narrow brute force, but to balanced mastery of every creative and protective art.',
      },

      'end-alt': {
        id: 'end-alt',
        kind: 'ending',
        endingTier: 'alternate',
        badgeLabel: 'ALTERNATE ENDING · GRIM WARDEN OF ATLANTIC CLIFFS',
        title: 'The Songless Iron Sovereign of Storm-Battered Erin',
        subtitle: 'Victorious in Arms, Barren of Harvest & Bardic Grace',
        location: 'Grey Basalt Ramparts Over the Western Sea',
        platePath: '/plates/game/lugh-alt.webp',
        mapX: 785,
        mapY: 115,
        epilogue:
          'Your story diverged from Samildánach! Relying on cold iron conscription without bards, healers, or Bres’s harvest secrets, you hold the coast against Fomorians yet preside over a joyless, austere realm devoid of Lughnasadh’s golden abundance.',
        mythicComparison:
          'Celtic myth warns through King Bres that martial power divorced from generosity and art turns victory hollow.',
      },

      'end-fail': {
        id: 'end-fail',
        kind: 'ending',
        endingTier: 'failure',
        badgeLabel: 'FALLEN ENDING · WITHERED BENEATH BALOR’S BALEFUL EYE',
        title: 'Scorched Plain & Silent Harp at Ruined Moytura',
        subtitle: 'Fomorian Winter Claimed the Emerald Isle',
        location: 'Blackened Crags of Magh Tuiredh',
        platePath: '/plates/game/lugh-fail.webp',
        mapX: 785,
        mapY: 182,
        epilogue:
          'Your campaign ended in ash and mist. Undone by division, Fomorian trickery, or Balor’s petrifying gaze, the Tuatha Dé Danann fell beneath endless ocean tribute.',
        mythicComparison:
          'The Second Battle of Moytura hinges on Lugh’s synthesis of wit, unity, and ranged precision to overcome overwhelming Fomorian dread.',
      },
    },
  },
];

export const SAGA_BY_DEITY_ID: Record<string, AscensionSaga> = Object.fromEntries(
  ASCENSION_SAGAS.map((s) => [s.deityId, s])
);

export const SAGA_BY_TRADITION_ID: Partial<Record<TraditionId, AscensionSaga>> =
  Object.fromEntries(ASCENSION_SAGAS.map((s) => [s.traditionId, s]));

