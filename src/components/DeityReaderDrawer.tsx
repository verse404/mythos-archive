import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Crown,
  Flame,
  Gamepad2,
  MapPin,
  Plus,
  Sparkles,
  Star,
  Volume2,
  X,
} from 'lucide-react';
import { getCrossRealmLinks, type CrossRealmRelationKind } from '../data/crossRealmLinks';
import { getPronunciation } from '../data/pronunciations';
import { getDeityPortrait } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { Deity, RouteState } from '../types/mythology';
import type { RealmMode } from '../utils/storage';
import { ArchetypeMedallion } from './VisualEmblems';

interface DeityReaderDrawerProps {
  deity: Deity | null;
  roster: Deity[];
  compareIds: string[];
  favoriteIds?: string[];
  onToggleFavorite?: (deityId: string) => void;
  onJumpCrossRealm?: (targetRealm: RealmMode, targetDeityId: string) => void;
  onClose: () => void;
  onSelectDeity: (deityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  navigate: (next: RouteState) => void;
  onJumpToSaga?: (sagaId: string) => void;
}

const RELATION_LABELS: Record<CrossRealmRelationKind, { en: string; zh: string }> = {
  nemesis: { en: 'Nemesis', zh: '宿敌' },
  mount: { en: 'Sacred Mount', zh: '神兽坐骑' },
  guardian: { en: 'Guardian', zh: '圣域守护' },
  companion: { en: 'Companion', zh: '神话羁绊' },
  kin: { en: 'Bloodline / Kin', zh: '血脉亲缘' },
};

export const DeityReaderDrawer: React.FC<DeityReaderDrawerProps> = ({
  deity,
  roster,
  compareIds,
  favoriteIds = [],
  onToggleFavorite,
  onJumpCrossRealm,
  onClose,
  onSelectDeity,
  onToggleCompareDeity,
  navigate,
  onJumpToSaga,
}) => {
  const { locale, realm, ui, data, shortTraditionName } = useI18n();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const currentIndex = deity ? roster.findIndex((d) => d.id === deity.id) : -1;
  const prevDeity =
    roster.length > 1 && currentIndex !== -1
      ? roster[(currentIndex - 1 + roster.length) % roster.length]
      : null;
  const nextDeity =
    roster.length > 1 && currentIndex !== -1
      ? roster[(currentIndex + 1) % roster.length]
      : null;

  useEffect(() => {
    if (!deity) return;
    document.body.classList.add('reader-drawer-open');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && prevDeity) {
        e.preventDefault();
        onSelectDeity(prevDeity.id);
      } else if (e.key === 'ArrowRight' && nextDeity) {
        e.preventDefault();
        onSelectDeity(nextDeity.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('reader-drawer-open');
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [deity, nextDeity, onClose, onSelectDeity, prevDeity]);

  if (!deity) return null;

  const trad = data.traditionById[deity.traditionId];
  const primaryArch = data.archetypes.find((a) => a.id === deity.archetypeId);
  const secondaryArch = data.archetypes.find((a) => a.id === deity.secondaryArchetypeId);
  const inComparator = compareIds.includes(deity.id);
  const isFavorite = favoriteIds.includes(deity.id);
  const linkedSaga = data.sagaByDeityId[deity.id];
  const isBestiary = realm === 'bestiary';
  const isZh = locale === 'zh';
  const phonetic = getPronunciation(deity.id);
  const crossLinks = getCrossRealmLinks(deity.id);
  const speechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  const handleSpeakName = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const spokenText = isZh ? deity.name.replace(/\s*\([^)]*\)\s*/g, '').trim() : deity.name;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = isZh ? 'zh-CN' : 'en-US';
    utterance.rate = 0.92;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0 && nextDeity) {
        onSelectDeity(nextDeity.id);
      } else if (dx > 0 && prevDeity) {
        onSelectDeity(prevDeity.id);
      }
    }
  };

  const labels = {
    prev: isZh ? '上一条' : 'Prev',
    next: isZh ? '下一条' : 'Next',
    close: isZh ? '关闭阅读窗' : 'Close reader',
    save: isZh ? '收藏' : 'Save',
    saved: isZh ? '已收藏' : 'Saved',
    listen: isZh ? '朗读读音' : 'Listen',
    speaking: isZh ? '朗读中…' : 'Speaking…',
    aliases: isZh ? '别称与异名' : 'Alternate Names',
    crossRealmKicker: isZh
      ? isBestiary
        ? '关联众神与神明羁绊（切换至众神殿）'
        : '关联神话异兽与宿敌（切换至异兽志）'
      : isBestiary
        ? 'ASSOCIATED GODS IN PANTHEONS'
        : 'MYTHIC RIVALS & COMPANIONS IN BESTIARY',
    openOtherRealm: isZh
      ? isBestiary
        ? '前往众神殿'
        : '前往异兽志'
      : isBestiary
        ? 'Open in Gods'
        : 'Open in Bestiary',
    originKicker: isZh
      ? isBestiary
        ? '本源与形貌考'
        : '神格起源'
      : isBestiary
        ? 'ORIGIN & ANATOMY'
        : 'DIVINE ORIGIN',
    mythKicker: isZh
      ? isBestiary
        ? '经典遭遇与传说'
        : '核心神话叙事'
      : isBestiary
        ? 'SIGNATURE ENCOUNTER'
        : 'SIGNATURE MYTH',
    cultureKicker: isZh
      ? isBestiary
        ? '民俗生态与文化意义'
        : '祭仪与文明职能'
      : isBestiary
        ? 'FOLKLORE & CULTURAL ROLE'
        : 'CULTURAL & CIVIC ROLE',
    insightKicker: ui.deities.rowInsight,
    domainsLabel: ui.deities.rowDomains,
    symbolsLabel: ui.deities.rowSymbols,
    animalsLabel: isZh
      ? isBestiary
        ? '关联物种与化相'
        : '神圣眷属动物'
      : isBestiary
        ? 'Related Species & Forms'
        : 'Sacred Animals',
    dwellingLabel: ui.deities.rowDwelling,
    counterpartsLabel: ui.deities.rowCounterparts,
    openTradition: isZh ? '进入所属传统专论' : 'Open Tradition Monograph',
  };

  return (
    <div
      className="reader-drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="reader-drawer-panel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <header className="reader-drawer-topbar">
          <div className="row-wrap">
            {prevDeity && (
              <button
                id="reader-prev-btn"
                type="button"
                className="btn-ghost"
                onClick={() => onSelectDeity(prevDeity.id)}
                title={prevDeity.name}
              >
                <ArrowLeft size={14} />
                <span>{labels.prev}</span>
              </button>
            )}
            {currentIndex !== -1 && (
              <span className="mono-meta">
                {currentIndex + 1} / {roster.length}
              </span>
            )}
            {nextDeity && (
              <button
                id="reader-next-btn"
                type="button"
                className="btn-ghost"
                onClick={() => onSelectDeity(nextDeity.id)}
                title={nextDeity.name}
              >
                <span>{labels.next}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          <div className="row-wrap">
            {onToggleFavorite && (
              <button
                id="reader-favorite-btn"
                type="button"
                className={isFavorite ? 'btn-ghost selected' : 'btn-ghost'}
                onClick={() => onToggleFavorite(deity.id)}
                aria-pressed={isFavorite}
              >
                <Star size={14} className={isFavorite ? 'star-filled' : undefined} />
                <span>{isFavorite ? labels.saved : labels.save}</span>
              </button>
            )}

            {linkedSaga && onJumpToSaga && (
              <button
                id="reader-play-quest-btn"
                type="button"
                className="btn-ghost"
                onClick={() => {
                  onClose();
                  onJumpToSaga(linkedSaga.id);
                }}
              >
                <Gamepad2 size={14} />
                <span>{ui.deities.playDndQuest}</span>
              </button>
            )}

            <button
              id="reader-compare-toggle-btn"
              type="button"
              className={inComparator ? 'btn-ghost selected' : 'btn-secondary'}
              onClick={() => onToggleCompareDeity(deity.id)}
            >
              {inComparator ? <Check size={14} /> : <Plus size={14} />}
              <span>{inComparator ? ui.deities.inMatrix : ui.deities.compareBtn}</span>
            </button>

            <button
              id="reader-close-btn"
              type="button"
              className="icon-action-btn"
              onClick={onClose}
              aria-label={labels.close}
            >
              <X size={16} />
            </button>
          </div>
        </header>

        <div className="reader-drawer-body">
          <div className="reader-hero-grid">
            <div className="reader-portrait-frame">
              <img
                src={getDeityPortrait(deity.id)}
                alt={`${deity.name} — ${deity.epithet}`}
                className="reader-portrait-img"
              />
            </div>

            <div className="reader-hero-copy">
              <button
                type="button"
                className="reader-trad-link"
                onClick={() => {
                  onClose();
                  navigate({ page: 'traditions', traditionSlug: deity.traditionId });
                }}
                title={labels.openTradition}
              >
                <BookOpen size={13} />
                <span>{compactTraditionName(trad?.name)}</span>
              </button>

              <div className="reader-title-line">
                <ArchetypeMedallion archetypeId={deity.archetypeId} size={38} />
                <h2 id="reader-drawer-title">{deity.name}</h2>
              </div>

              {(phonetic || speechSupported) && (
                <div className="reader-pronounce-row">
                  {phonetic && <span className="mono-meta reader-phonetic">/{phonetic}/</span>}
                  {speechSupported && (
                    <button
                      id="reader-listen-btn"
                      type="button"
                      className={isSpeaking ? 'btn-ghost selected' : 'btn-ghost'}
                      onClick={handleSpeakName}
                    >
                      <Volume2 size={13} />
                      <span>{isSpeaking ? labels.speaking : labels.listen}</span>
                    </button>
                  )}
                </div>
              )}

              <p className="reader-epithet">{deity.epithet}</p>

              {deity.alternateNames.length > 0 && (
                <p className="reader-aliases">
                  <strong>{labels.aliases}:</strong> {deity.alternateNames.join(' · ')}
                </p>
              )}

              <div className="row-wrap mt-sm">
                <span className="tag-pill rubric">{primaryArch?.label}</span>
                {secondaryArch && <span className="tag-pill">{secondaryArch.label}</span>}
              </div>
            </div>
          </div>

          <section className="reader-section">
            <span className="folio-kicker">{labels.originKicker}</span>
            <p className="reader-prose">{deity.originSummary}</p>
          </section>

          <section className="reader-section reader-myth-box">
            <div className="row-wrap">
              <Sparkles size={15} />
              <span className="folio-kicker">{labels.mythKicker}</span>
            </div>
            <h3 className="reader-myth-title">{deity.signatureMythTitle}</h3>
            <p className="reader-prose">{deity.signatureMyth}</p>
          </section>

          <div className="reader-facts-grid">
            <div className="reader-fact-card">
              <span className="folio-kicker">{labels.domainsLabel}</span>
              <ul className="compare-bullet-list mt-sm">
                {deity.domains.map((dom) => (
                  <li key={dom}>{dom}</li>
                ))}
              </ul>
            </div>

            <div className="reader-fact-card">
              <span className="folio-kicker">{labels.symbolsLabel}</span>
              <ul className="compare-bullet-list mt-sm">
                {deity.symbols.map((sym) => (
                  <li key={sym}>{sym}</li>
                ))}
              </ul>
            </div>

            <div className="reader-fact-card">
              <span className="folio-kicker">{labels.animalsLabel}</span>
              <ul className="compare-bullet-list mt-sm">
                {deity.sacredAnimals.map((anim) => (
                  <li key={anim}>{anim}</li>
                ))}
              </ul>
            </div>

            <div className="reader-fact-card">
              <span className="folio-kicker">{labels.dwellingLabel}</span>
              <p className="reader-dwelling-title mt-sm">
                <MapPin size={14} /> <strong>{deity.dwelling}</strong>
              </p>
              <p className="text-muted mt-sm">{deity.consortOrKin}</p>
            </div>
          </div>

          <section className="reader-section">
            <span className="folio-kicker">{labels.cultureKicker}</span>
            <p className="reader-prose">{deity.culturalRole}</p>
          </section>

          <section className="reader-section">
            <span className="folio-kicker">{labels.insightKicker}</span>
            <p className="reader-prose">{deity.comparativeInsight}</p>
          </section>

          {crossLinks.length > 0 && onJumpCrossRealm && (
            <section className="reader-section reader-crossrealm-box">
              <div className="row-wrap">
                {isBestiary ? <Crown size={15} /> : <Flame size={15} />}
                <span className="folio-kicker">{labels.crossRealmKicker}</span>
              </div>
              <div className="reader-crossrealm-grid mt-sm">
                {crossLinks.map((link) => {
                  const relLabel = RELATION_LABELS[link.relationKind];
                  return (
                    <button
                      key={`${link.targetRealm}-${link.targetId}`}
                      id={`reader-cross-${link.targetId}`}
                      type="button"
                      className="crossrealm-link-card"
                      onClick={() => {
                        onClose();
                        onJumpCrossRealm(link.targetRealm, link.targetId);
                      }}
                    >
                      <img
                        src={getDeityPortrait(link.targetId)}
                        alt={isZh ? link.targetNameZh : link.targetNameEn}
                        className="crossrealm-thumb"
                      />
                      <div className="crossrealm-copy">
                        <div className="row-between">
                          <strong>{isZh ? link.targetNameZh : link.targetNameEn}</strong>
                          <span
                            className={
                              link.relationKind === 'nemesis'
                                ? 'tag-pill ochre'
                                : 'tag-pill verdigris'
                            }
                          >
                            {isZh ? relLabel.zh : relLabel.en}
                          </span>
                        </div>
                        <p className="text-muted">
                          {isZh ? link.relationZh : link.relationEn}
                        </p>
                        <span className="mono-meta crossrealm-cta">
                          {labels.openOtherRealm} →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {deity.counterpartIds.length > 0 && (
            <section className="reader-section">
              <span className="folio-kicker">{labels.counterpartsLabel}</span>
              <div className="reader-counterparts-grid mt-sm">
                {deity.counterpartIds.map((cid) => {
                  const peer = data.deityById[cid];
                  if (!peer) return null;
                  return (
                    <button
                      key={cid}
                      id={`reader-peer-${cid}`}
                      type="button"
                      className="conn-mini-deity-card"
                      onClick={() => onSelectDeity(peer.id)}
                    >
                      <img
                        src={getDeityPortrait(peer.id)}
                        alt={peer.name}
                        className="conn-mini-deity-img"
                      />
                      <div>
                        <strong>{peer.name}</strong>
                        <span className="mono-meta">{shortTraditionName(peer.traditionId)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </aside>
    </div>
  );
};
