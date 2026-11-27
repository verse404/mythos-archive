import React, { useCallback, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  HelpCircle,
  Layers,
  RotateCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import {
  MOTIF_PLATE,
  assetUrl,
  getDeityPortrait,
  getFlashcardPlate,
  getQuizPlate,
  getTraditionPlate,
} from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import {
  QUIZ_DIFFICULTY_LABEL,
  STUDY_DIFFICULTY_LABEL,
  compactTraditionName,
} from '../i18n/uiStrings';
import type { Deity, RouteState } from '../types/mythology';
import type { PantheonFocus, RealmMode, StudyProgressState } from '../utils/storage';

interface LearnPageProps {
  pantheonFocus: PantheonFocus;
  studyProgress: StudyProgressState;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  onToggleLessonComplete: (lessonId: string) => void;
  onMarkFlashcard: (cardId: string, status: 'mastered' | 'review') => void;
  onRecordQuizFinish: (score: number, maxStreak: number) => void;
  onRecordEndlessStreak: (streak: number) => void;
  onJumpToCompareDeities: (deityIds: string[]) => void;
  onJumpToMotif: (motifId: string) => void;
  onJumpToSaga: (sagaId: string) => void;
  navigate: (next: RouteState) => void;
}

type LearnSubTab = 'curricula' | 'flashcards' | 'quiz' | 'endless';
type EndlessKind = 'portrait' | 'tradition' | 'symbols' | 'dwelling';

interface DynamicChallengeQuestion {
  kind: EndlessKind;
  target: Deity;
  prompt: string;
  clue?: string;
  showPortrait: boolean;
  hidePortraitName: boolean;
  options: { id: string; label: string }[];
  correctId: string;
  explanation: string;
}

function cryptoRandInt(max: number): number {
  if (max <= 1) return 0;
  const buf = new Uint32Array(1);
  window.crypto.getRandomValues(buf);
  return buf[0] % max;
}

function cryptoShuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = cryptoRandInt(i + 1);
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

const TRACK_PLATES: Record<string, string> = {
  'track-foundations': assetUrl('/plates/portals/portal-traditions.webp'),
  'track-storm-serpent': assetUrl('/plates/motif-chaoskampf.webp'),
  'track-underworld': assetUrl('/plates/motif-katabasis.webp'),
  'track-tricksters-wisdom': assetUrl('/plates/motif-fire.webp'),
  'bst-track-dragons': assetUrl('/plates/bestiary/learn/bst-track-dragons.webp'),
  'bst-track-chimeras': assetUrl('/plates/bestiary/learn/bst-track-chimeras.webp'),
  'bst-track-liminal': assetUrl('/plates/bestiary/learn/bst-track-liminal.webp'),
};

export const LearnPage: React.FC<LearnPageProps> = ({
  pantheonFocus,
  studyProgress,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  onToggleLessonComplete,
  onMarkFlashcard,
  onRecordQuizFinish,
  onRecordEndlessStreak,
  onJumpToCompareDeities,
  onJumpToMotif,
  onJumpToSaga,
  navigate,
}) => {
  const { locale, realm, ui, data } = useI18n();
  const isZh = locale === 'zh';
  const isBestiary = realm === 'bestiary';
  const [subTab, setSubTab] = useState<LearnSubTab>('curricula');
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);

  const [deckFilter, setDeckFilter] = useState<'all' | 'unmastered' | 'review'>('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxSessionStreak, setMaxSessionStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Feature #2: Unlimited Dynamic Portrait & Lore Challenge State
  const [endlessMode, setEndlessMode] = useState<'mixed' | 'portrait'>('mixed');
  const [endlessAnsweredId, setEndlessAnsweredId] = useState<string | null>(null);
  const [endlessScore, setEndlessScore] = useState(0);
  const [endlessTotal, setEndlessTotal] = useState(0);
  const [endlessStreak, setEndlessStreak] = useState(0);

  const endlessPool = useMemo(() => {
    const scoped =
      pantheonFocus === 'all'
        ? data.deities
        : data.deities.filter((d) => d.traditionId === pantheonFocus);
    return scoped.length >= 4 ? scoped : data.deities;
  }, [data.deities, pantheonFocus]);

  const buildEndlessQuestion = useCallback(
    (mode: 'mixed' | 'portrait', excludeId?: string): DynamicChallengeQuestion => {
      const candidates = endlessPool.filter((d) => d.id !== excludeId);
      const target = candidates[cryptoRandInt(candidates.length)] ?? endlessPool[0];
      const kinds: EndlessKind[] =
        mode === 'portrait'
          ? ['portrait']
          : pantheonFocus === 'all'
            ? ['portrait', 'tradition', 'symbols', 'dwelling']
            : ['portrait', 'symbols', 'dwelling'];
      const kind = kinds[cryptoRandInt(kinds.length)];
      const tradName = compactTraditionName(data.traditionById[target.traditionId]?.name);

      if (kind === 'tradition') {
        const distractors = cryptoShuffle(
          data.traditions.filter((t) => t.id !== target.traditionId)
        ).slice(0, 3);
        const options = cryptoShuffle([
          { id: target.traditionId, label: tradName },
          ...distractors.map((t) => ({ id: t.id, label: compactTraditionName(t.name) })),
        ]);
        return {
          kind,
          target,
          prompt: isZh
            ? `“${target.name}”属于哪一神话传统？`
            : `Which mythological tradition does ${target.name} belong to?`,
          clue: target.epithet,
          showPortrait: true,
          hidePortraitName: false,
          options,
          correctId: target.traditionId,
          explanation: `${target.name} (${tradName}) — ${target.originSummary}`,
        };
      }

      const distractors = cryptoShuffle(
        endlessPool.filter((d) => d.id !== target.id)
      ).slice(0, 3);
      const options = cryptoShuffle([
        { id: target.id, label: target.name },
        ...distractors.map((d) => ({ id: d.id, label: d.name })),
      ]);

      if (kind === 'symbols') {
        return {
          kind,
          target,
          prompt: isZh
            ? isBestiary
              ? '以下特征与神通对应哪一尊神话异兽？'
              : '以下圣物与神职对应哪一位神祇？'
            : isBestiary
              ? 'Which mythological creature matches these signs and powers?'
              : 'Which deity bears these sacred symbols and domains?',
          clue: `${target.symbols.slice(0, 3).join(' · ')} — ${target.domains.slice(0, 3).join(' / ')}`,
          showPortrait: false,
          hidePortraitName: true,
          options,
          correctId: target.id,
          explanation: `${target.name} (${tradName}): ${target.epithet}`,
        };
      }

      if (kind === 'dwelling') {
        return {
          kind,
          target,
          prompt: isZh
            ? isBestiary
              ? '以下巢穴与血统线索指向哪一尊神话异兽？'
              : '以下神域与居所属于哪一位神祇？'
            : isBestiary
              ? 'Which creature dwells in this mythic lair?'
              : 'Which deity dwells in this sacred realm?',
          clue: target.dwelling,
          showPortrait: false,
          hidePortraitName: true,
          options,
          correctId: target.id,
          explanation: `${target.name} (${tradName}): ${target.dwelling}. ${target.originSummary}`,
        };
      }

      return {
        kind: 'portrait',
        target,
        prompt: isZh
          ? isBestiary
            ? '辨识这幅油画立绘中描绘的是哪一尊神话异兽？'
            : '辨识这幅立绘中描绘的是哪一位神祇？'
          : isBestiary
            ? 'Identify the mythological creature depicted in this portrait:'
            : 'Identify the deity depicted in this portrait:',
        clue: target.domains.slice(0, 2).join(' · '),
        showPortrait: true,
        hidePortraitName: true,
        options,
        correctId: target.id,
        explanation: `${target.name} (${tradName}) — ${target.epithet}`,
      };
    },
    [data.traditionById, data.traditions, endlessPool, isBestiary, isZh, pantheonFocus]
  );

  const [endlessQ, setEndlessQ] = useState<DynamicChallengeQuestion>(() =>
    buildEndlessQuestion('mixed')
  );

  const handleAnswerEndless = (optionId: string) => {
    if (endlessAnsweredId !== null) return;
    setEndlessAnsweredId(optionId);
    setEndlessTotal((n) => n + 1);
    if (optionId === endlessQ.correctId) {
      const nextStreak = endlessStreak + 1;
      setEndlessScore((s) => s + 1);
      setEndlessStreak(nextStreak);
      onRecordEndlessStreak(nextStreak);
    } else {
      setEndlessStreak(0);
    }
  };

  const handleNextEndless = (nextMode: 'mixed' | 'portrait' = endlessMode) => {
    setEndlessAnsweredId(null);
    setEndlessQ(buildEndlessQuestion(nextMode, endlessQ.target.id));
  };

  const scopedTracks = useMemo(() => {
    if (pantheonFocus === 'all') return data.studyTracks;
    const filtered = data.studyTracks
      .map((tr) => ({
        ...tr,
        lessons: tr.lessons.filter((l) =>
          l.linkedDeityIds.some((did) => data.deityById[did]?.traditionId === pantheonFocus)
        ),
      }))
      .filter((tr) => tr.lessons.length > 0);
    return filtered.length > 0 ? filtered : data.studyTracks.slice(0, 1);
  }, [data.deityById, data.studyTracks, pantheonFocus]);

  const scopedFlashcards = useMemo(() => {
    if (pantheonFocus === 'all') return data.flashcards;
    const exact = data.flashcards.filter(
      (c) => c.traditionId === pantheonFocus || c.traditionId === 'comparative'
    );
    return exact.length > 0 ? exact : data.flashcards;
  }, [data.flashcards, pantheonFocus]);

  const scopedQuestions = useMemo(() => {
    if (pantheonFocus === 'all') return data.quizQuestions;
    const exact = data.quizQuestions.filter((q) =>
      q.relatedTraditionIds.includes(pantheonFocus)
    );
    return exact.length > 0 ? exact : data.quizQuestions;
  }, [data.quizQuestions, pantheonFocus]);

  const totalLessons = scopedTracks.reduce((sum, t) => sum + t.lessons.length, 0);
  const scopedCompletedLessonsCount = scopedTracks.reduce(
    (sum, tr) =>
      sum + tr.lessons.filter((l) => studyProgress.completedLessonIds.includes(l.id)).length,
    0
  );
  const scopedMasteredCount = scopedFlashcards.filter((c) =>
    studyProgress.masteredCardIds.includes(c.id)
  ).length;
  const scopedReviewCount = scopedFlashcards.filter((c) =>
    studyProgress.reviewCardIds.includes(c.id)
  ).length;

  const filteredDeck = useMemo(() => {
    if (deckFilter === 'unmastered') {
      return scopedFlashcards.filter((c) => !studyProgress.masteredCardIds.includes(c.id));
    }
    if (deckFilter === 'review') {
      return scopedFlashcards.filter((c) => studyProgress.reviewCardIds.includes(c.id));
    }
    return scopedFlashcards;
  }, [deckFilter, scopedFlashcards, studyProgress.masteredCardIds, studyProgress.reviewCardIds]);

  const activeCard =
    filteredDeck.length > 0 ? filteredDeck[cardIndex % filteredDeck.length] : undefined;

  const activeQuestion =
    scopedQuestions[quizIndex % scopedQuestions.length] ?? data.quizQuestions[0];

  const handleSelectQuizOption = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    if (optionIdx === activeQuestion.correctIndex) {
      const nextStreak = currentStreak + 1;
      setQuizScore((s) => s + 1);
      setCurrentStreak(nextStreak);
      setMaxSessionStreak((m) => Math.max(m, nextStreak));
    } else {
      setCurrentStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 >= scopedQuestions.length) {
      onRecordQuizFinish(quizScore, maxSessionStreak);
      setQuizFinished(true);
    } else {
      setQuizIndex((i) => i + 1);
      setSelectedOption(null);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setCurrentStreak(0);
    setMaxSessionStreak(0);
    setQuizFinished(false);
  };

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.learn.kicker}</span>
          <h1>{ui.learn.heading}</h1>
          <p className="page-lead">{ui.learn.lead}</p>
        </div>

        <div className="row-wrap">
          <span className="tag-pill verdigris">
            {ui.learn.lessonsBadge(scopedCompletedLessonsCount, totalLessons)}
          </span>
          <span className="tag-pill ochre">
            {ui.learn.cardsBadge(scopedMasteredCount, scopedFlashcards.length)}
          </span>
          <span className="tag-pill rubric">
            {ui.learn.bestQuizBadge(studyProgress.bestQuizScore, data.quizQuestions.length)}
          </span>
        </div>
      </header>

      <div className="filter-bar" role="tablist" aria-label={ui.learn.heading}>
        <button
          id="learn-tab-curricula"
          type="button"
          role="tab"
          aria-selected={subTab === 'curricula'}
          className={subTab === 'curricula' ? 'chip-btn active' : 'chip-btn'}
          onClick={() => setSubTab('curricula')}
        >
          <BookOpen size={14} /> {ui.learn.tabCurricula(scopedTracks.length)}
        </button>
        <button
          id="learn-tab-flashcards"
          type="button"
          role="tab"
          aria-selected={subTab === 'flashcards'}
          className={subTab === 'flashcards' ? 'chip-btn active' : 'chip-btn'}
          onClick={() => setSubTab('flashcards')}
        >
          <Layers size={14} /> {ui.learn.tabFlashcards(scopedFlashcards.length)}
        </button>
        <button
          id="learn-tab-quiz"
          type="button"
          role="tab"
          aria-selected={subTab === 'quiz'}
          className={subTab === 'quiz' ? 'chip-btn active' : 'chip-btn'}
          onClick={() => setSubTab('quiz')}
        >
          <HelpCircle size={14} /> {ui.learn.tabQuiz(scopedQuestions.length)}
        </button>
        <button
          id="learn-tab-endless"
          type="button"
          role="tab"
          aria-selected={subTab === 'endless'}
          className={subTab === 'endless' ? 'chip-btn active' : 'chip-btn'}
          onClick={() => setSubTab('endless')}
        >
          <Zap size={14} />{' '}
          {isZh
            ? `4 · 无尽图文挑战（${endlessPool.length} 题池）`
            : `4 · Endless Visual Challenge (${endlessPool.length})`}
        </button>
      </div>

      {subTab === 'curricula' && (
        <div className="stack-md">
          {scopedTracks.map((track) => {
            const doneCount = track.lessons.filter((l) =>
              studyProgress.completedLessonIds.includes(l.id)
            ).length;

            return (
              <section key={track.id} className="monograph-banner">
                <div className="atlas-plaque-grid">
                  <img
                    src={
                      TRACK_PLATES[track.id] ??
                      assetUrl(
                        realm === 'bestiary'
                          ? '/plates/bestiary/cinema-leviathans.webp'
                          : '/plates/cosmic-tree-hero.webp'
                      )
                    }
                    alt={track.title}
                    className="atlas-plaque-img"
                  />
                  <div>
                    <span className="folio-kicker">
                      {track.folioCode} · {STUDY_DIFFICULTY_LABEL[locale][track.difficulty]}
                    </span>
                    <h2 className="mt-sm">{track.title}</h2>
                    <p className="text-muted mt-sm">{track.subtitle}</p>
                  </div>
                  <span className="mono-meta">
                    {ui.learn.readProgress(
                      doneCount,
                      track.lessons.length,
                      track.estimatedMinutes
                    )}
                  </span>
                </div>

                <progress
                  className="archival-progress mt-md"
                  value={doneCount}
                  max={track.lessons.length}
                />

                <div className="folio-grid-2 mt-md">
                  {track.lessons.map((lesson) => {
                    const completed = studyProgress.completedLessonIds.includes(lesson.id);
                    return (
                      <article key={lesson.id} className="folio-card">
                        <div className="row-between">
                          <span className="mono-meta">
                            {ui.learn.minRead(lesson.durationMinutes)}
                          </span>
                          <button
                            id={`toggle-lesson-${lesson.id}`}
                            type="button"
                            className={completed ? 'btn-ghost selected' : 'btn-ghost'}
                            onClick={() => onToggleLessonComplete(lesson.id)}
                          >
                            {completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                            <span>{completed ? ui.learn.completed : ui.learn.markRead}</span>
                          </button>
                        </div>

                        <h3>{lesson.title}</h3>
                        <p className="folio-card-body">{lesson.coreReading}</p>

                        <div>
                          <span className="folio-kicker">{ui.learn.keyTakeaways}</span>
                          <ul className="motif-list">
                            {lesson.keyTakeaways.map((tk) => (
                              <li key={tk}>{tk}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="folio-card-footer">
                          <button
                            id={`lesson-compare-${lesson.id}`}
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                              onJumpToCompareDeities(lesson.linkedDeityIds.slice(0, 4));
                              navigate({ page: 'deities' });
                            }}
                          >
                            <span>
                              {ui.learn.comparePrefix(
                                lesson.linkedDeityIds
                                  .slice(0, 3)
                                  .map((id) => data.deityById[id]?.name)
                                  .filter(Boolean)
                                  .join(' / ')
                              )}
                            </span>
                          </button>

                          {lesson.linkedMotifId && (
                            <button
                              id={`lesson-motif-${lesson.id}`}
                              type="button"
                              className="btn-ghost"
                              onClick={() => {
                                if (lesson.linkedMotifId) {
                                  onJumpToMotif(lesson.linkedMotifId);
                                  navigate({ page: 'motifs' });
                                }
                              }}
                            >
                              <span>{ui.learn.openMotif}</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {subTab === 'flashcards' && (
        <div>
          <div className="filter-bar">
            <button
              id="deck-filter-all"
              type="button"
              className={deckFilter === 'all' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setDeckFilter('all');
                setCardIndex(0);
                setIsFlipped(false);
              }}
            >
              {ui.learn.allCards(scopedFlashcards.length)}
            </button>
            <button
              id="deck-filter-unmastered"
              type="button"
              className={deckFilter === 'unmastered' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setDeckFilter('unmastered');
                setCardIndex(0);
                setIsFlipped(false);
              }}
            >
              {ui.learn.remainingCards(
                scopedFlashcards.filter((c) => !studyProgress.masteredCardIds.includes(c.id))
                  .length
              )}
            </button>
            <button
              id="deck-filter-review"
              type="button"
              className={deckFilter === 'review' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setDeckFilter('review');
                setCardIndex(0);
                setIsFlipped(false);
              }}
            >
              {ui.learn.reviewQueue(scopedReviewCount)}
            </button>
          </div>

          {activeCard ? (
            <div className="flashcard-stage">
              <button
                id="flashcard-flip-surface"
                type="button"
                className="flashcard-surface"
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                <img
                  src={
                    getFlashcardPlate(activeCard.id, realm) ??
                    (activeCard.traditionId === 'comparative'
                      ? realm === 'bestiary'
                        ? MOTIF_PLATE['sea-leviathan']
                        : MOTIF_PLATE.cosmogony
                      : getTraditionPlate(activeCard.traditionId, realm))
                  }
                  alt={activeCard.promptCategory}
                  className="compare-header-thumb"
                />

                <div className="row-between">
                  <span className="folio-kicker">
                    {activeCard.traditionId === 'comparative'
                      ? ui.learn.crossCulturalSynthesis
                      : data.traditionById[activeCard.traditionId]?.name}{' '}
                    · {activeCard.promptCategory}
                  </span>
                  <span className="mono-meta">
                    {ui.learn.cardOf((cardIndex % filteredDeck.length) + 1, filteredDeck.length)}
                  </span>
                </div>

                {!isFlipped ? (
                  <div>
                    <p className="flashcard-question">{activeCard.frontPrompt}</p>
                    <p className="text-muted mt-md">
                      {ui.learn.hintPrefix} {activeCard.comparativeHint}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="tag-pill verdigris">{ui.learn.archivalAnswer}</span>
                    <p className="flashcard-answer mt-sm">{activeCard.backAnswer}</p>
                  </div>
                )}

                <div className="row-between mono-meta">
                  <span>
                    <RotateCw size={13} />{' '}
                    {isFlipped ? ui.learn.flipToPrompt : ui.learn.flipToAnswer}
                  </span>
                  {studyProgress.masteredCardIds.includes(activeCard.id) && (
                    <span className="tag-pill verdigris">{ui.learn.mastered}</span>
                  )}
                </div>
              </button>

              <div className="row-between mt-md">
                <button
                  id="flashcard-prev-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setCardIndex((i) => (i - 1 + filteredDeck.length) % filteredDeck.length);
                    setIsFlipped(false);
                  }}
                >
                  {ui.learn.previous}
                </button>

                <div className="row-wrap">
                  <button
                    id="flashcard-mark-review-btn"
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      onMarkFlashcard(activeCard.id, 'review');
                      setCardIndex((i) => (i + 1) % filteredDeck.length);
                      setIsFlipped(false);
                    }}
                  >
                    {ui.learn.reviewAgain}
                  </button>
                  <button
                    id="flashcard-mark-mastered-btn"
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      onMarkFlashcard(activeCard.id, 'mastered');
                      if (deckFilter !== 'unmastered') {
                        setCardIndex((i) => i + 1);
                      }
                      setIsFlipped(false);
                    }}
                  >
                    {ui.learn.markMastered}
                  </button>
                </div>

                <button
                  id="flashcard-next-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setCardIndex((i) => (i + 1) % filteredDeck.length);
                    setIsFlipped(false);
                  }}
                >
                  {ui.learn.next}
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-card">
              <h2>{ui.learn.deckComplete}</h2>
              <p className="mt-sm">{ui.learn.deckCompleteSub}</p>
              <button
                id="reset-deck-filter-btn"
                type="button"
                className="btn-primary mt-md"
                onClick={() => setDeckFilter('all')}
              >
                {ui.learn.showAllCards}
              </button>
            </div>
          )}
        </div>
      )}

      {subTab === 'quiz' && (
        <div>
          {!quizFinished ? (
            <div className="quiz-card">
              <img
                src={
                  getQuizPlate(activeQuestion.id, realm) ??
                  getTraditionPlate(activeQuestion.relatedTraditionIds[0] ?? 'greek', realm)
                }
                alt={activeQuestion.category}
                className="compare-header-thumb"
              />
              <div className="row-between">
                <span className="folio-kicker">
                  {ui.learn.questionOf(
                    (quizIndex % scopedQuestions.length) + 1,
                    scopedQuestions.length
                  )}{' '}
                  · {activeQuestion.category}
                </span>
                <div className="row-wrap">
                  <span className="tag-pill ochre">
                    {QUIZ_DIFFICULTY_LABEL[locale][activeQuestion.difficulty]}
                  </span>
                  <span className="mono-meta">
                    {ui.learn.scoreStreak(quizScore, currentStreak)}
                  </span>
                </div>
              </div>

              <h2 className="mt-md">{activeQuestion.prompt}</h2>

              <div className="mt-md">
                {activeQuestion.options.map((opt, idx) => {
                  let cls = 'quiz-option-btn';
                  if (selectedOption !== null) {
                    if (idx === activeQuestion.correctIndex) {
                      cls = 'quiz-option-btn correct';
                    } else if (idx === selectedOption) {
                      cls = 'quiz-option-btn wrong';
                    }
                  }
                  return (
                    <button
                      key={`${activeQuestion.id}-${idx}`}
                      id={`quiz-opt-${idx}`}
                      type="button"
                      className={cls}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectQuizOption(idx)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="synthesis-banner mt-md">
                  <span className="folio-kicker">
                    {selectedOption === activeQuestion.correctIndex
                      ? ui.learn.correctNote
                      : ui.learn.scholarlyExplanation}
                  </span>
                  <p className="mt-sm">{activeQuestion.explanation}</p>
                  <div className="row-between mt-md">
                    <div className="row-wrap">
                      {activeQuestion.relatedTraditionIds.map((tid) => (
                        <button
                          key={tid}
                          id={`quiz-trad-link-${tid}`}
                          type="button"
                          className="btn-ghost"
                          onClick={() => navigate({ page: 'traditions', traditionSlug: tid })}
                        >
                          {compactTraditionName(data.traditionById[tid]?.name)}
                        </button>
                      ))}
                    </div>

                    <button
                      id="quiz-next-btn"
                      type="button"
                      className="btn-primary"
                      onClick={handleNextQuestion}
                    >
                      {quizIndex + 1 >= scopedQuestions.length
                        ? ui.learn.finishQuiz
                        : ui.learn.nextQuestion}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-card">
              <div className="row-wrap">
                <Award size={22} />
                <span className="folio-kicker">{ui.learn.assessmentComplete}</span>
              </div>
              <h2 className="mt-sm">{ui.learn.youScored(quizScore, scopedQuestions.length)}</h2>
              <p className="mt-sm">
                {ui.learn.sessionBest} <strong>{maxSessionStreak}</strong> ·{' '}
                {ui.learn.allTimeBest}{' '}
                <strong>
                  {Math.max(quizScore, studyProgress.bestQuizScore)}/{data.quizQuestions.length}
                </strong>
              </p>

              <div className="row-wrap mt-md">
                <button
                  id="quiz-restart-btn"
                  type="button"
                  className="btn-primary"
                  onClick={handleRestartQuiz}
                >
                  {ui.learn.retakeQuiz}
                </button>
                <button
                  id="quiz-go-comparator-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate({ page: 'deities' })}
                >
                  {ui.learn.exploreComparator}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {subTab === 'endless' && (
        <div>
          <div className="filter-bar">
            <button
              id="endless-mode-mixed"
              type="button"
              className={endlessMode === 'mixed' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setEndlessMode('mixed');
                handleNextEndless('mixed');
              }}
            >
              <Sparkles size={14} />{' '}
              {isZh ? '综合挑战（立绘 / 传统 / 圣物 / 巢穴）' : 'All Formats (Portrait, Lore & Lairs)'}
            </button>
            <button
              id="endless-mode-portrait"
              type="button"
              className={endlessMode === 'portrait' ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setEndlessMode('portrait');
                handleNextEndless('portrait');
              }}
            >
              <Zap size={14} /> {isZh ? '纯立绘盲猜挑战' : 'Portrait Identification Only'}
            </button>
            <span className="tag-pill verdigris">
              {isZh
                ? `本次：${endlessScore}/${endlessTotal} · 连胜 ${endlessStreak}`
                : `Session: ${endlessScore}/${endlessTotal} · Streak ${endlessStreak}`}
            </span>
            <span className="tag-pill rubric">
              {isZh
                ? `历史最高连胜：${Math.max(endlessStreak, studyProgress.bestEndlessStreak)}`
                : `Best Streak: ${Math.max(endlessStreak, studyProgress.bestEndlessStreak)}`}
            </span>
          </div>

          <div className="quiz-card endless-quiz-card">
            <div className="endless-stage-grid">
              {(endlessQ.showPortrait || endlessAnsweredId !== null) && (
                <div className="endless-portrait-frame">
                  <img
                    src={getDeityPortrait(endlessQ.target.id)}
                    alt={
                      endlessQ.hidePortraitName && endlessAnsweredId === null
                        ? isZh
                          ? '神秘神话立绘'
                          : 'Mystery mythological portrait'
                        : endlessQ.target.name
                    }
                    className="endless-portrait-img"
                  />
                </div>
              )}

              <div className="endless-question-col">
                <span className="folio-kicker">
                  {isZh ? '无尽动态挑战' : 'DYNAMIC CHALLENGE'} ·{' '}
                  {endlessQ.kind === 'portrait'
                    ? isZh
                      ? '立绘辨识'
                      : 'PORTRAIT ID'
                    : endlessQ.kind === 'tradition'
                      ? isZh
                        ? '所属神话传统'
                        : 'TRADITION MATCH'
                      : endlessQ.kind === 'symbols'
                        ? isZh
                          ? '特征与神通'
                          : 'SYMBOLS & DOMAINS'
                        : isZh
                          ? '神域与巢穴'
                          : 'REALM & LAIR'}
                </span>

                <h2 className="mt-sm">{endlessQ.prompt}</h2>
                {endlessQ.clue && <p className="deity-epithet-prose mt-sm">{endlessQ.clue}</p>}

                <div className="mt-md">
                  {endlessQ.options.map((opt, idx) => {
                    let cls = 'quiz-option-btn';
                    if (endlessAnsweredId !== null) {
                      if (opt.id === endlessQ.correctId) cls = 'quiz-option-btn correct';
                      else if (opt.id === endlessAnsweredId) cls = 'quiz-option-btn wrong';
                    }
                    return (
                      <button
                        key={`${endlessQ.target.id}-${opt.id}`}
                        id={`endless-opt-${idx}`}
                        type="button"
                        className={cls}
                        disabled={endlessAnsweredId !== null}
                        onClick={() => handleAnswerEndless(opt.id)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {endlessAnsweredId !== null && (
                  <div className="synthesis-banner mt-md">
                    <span className="folio-kicker">
                      {endlessAnsweredId === endlessQ.correctId
                        ? ui.learn.correctNote
                        : ui.learn.scholarlyExplanation}
                    </span>
                    <p className="mt-sm">{endlessQ.explanation}</p>
                    <div className="row-between mt-md">
                      <button
                        id="endless-read-profile-btn"
                        type="button"
                        className="btn-secondary"
                        onClick={() => setReaderDeityId(endlessQ.target.id)}
                      >
                        <BookOpen size={14} />
                        <span>
                          {isZh
                            ? `阅读详传：${endlessQ.target.name}`
                            : `Quick Read: ${endlessQ.target.name}`}
                        </span>
                      </button>

                      <button
                        id="endless-next-btn"
                        type="button"
                        className="btn-primary"
                        onClick={() => handleNextEndless()}
                      >
                        {isZh ? '下一道随机挑战 →' : 'Next Random Challenge →'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <DeityReaderDrawer
        deity={readerDeityId ? (data.deityById[readerDeityId] ?? null) : null}
        roster={endlessPool}
        compareIds={compareIds}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        onJumpCrossRealm={onJumpCrossRealm}
        onClose={() => setReaderDeityId(null)}
        onSelectDeity={(id) => setReaderDeityId(id)}
        onToggleCompareDeity={onToggleCompareDeity}
        navigate={navigate}
        onJumpToSaga={onJumpToSaga}
      />
    </div>
  );
};
