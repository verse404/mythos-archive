import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, BookMarked, Check, Layers, Scale, ScrollText, Share2 } from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { assetUrl, getDeityPortrait } from '../data/visuals';
import { copyShareableUrl } from '../hooks/useRouter';
import { useI18n } from '../i18n/I18nContext';
import { BOOK_MEDIUM_LABEL, compactTraditionName } from '../i18n/uiStrings';
import type { CanonicalBook, Deity, RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface TextsPageProps {
  pantheonFocus: PantheonFocus;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  initialTraditionFilter?: TraditionId;
  initialBookId?: string;
  onSelectBookId: (bookId: string) => void;
  onSelectTraditionFilter: (tid: TraditionId | 'all') => void;
  navigate: (next: RouteState) => void;
  onJumpToCompareDeities: (deityIds: string[]) => void;
  onJumpToMotif: (motifId: string) => void;
  onJumpToSaga: (sagaId: string) => void;
}

const MEDIUM_FILTERS: ('All Media' | CanonicalBook['medium'])[] = [
  'All Media',
  'Clay Tablets',
  'Papyrus & Tomb Stone',
  'Vellum Codex',
  'Oral & Palm-Leaf',
  'Bamboo & Woodblock',
  'Screenfold Codex',
  'Living Oral Canon',
];

export const TextsPage: React.FC<TextsPageProps> = ({
  pantheonFocus,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  initialTraditionFilter,
  initialBookId,
  onSelectBookId,
  onSelectTraditionFilter,
  navigate,
  onJumpToCompareDeities,
  onJumpToMotif,
  onJumpToSaga,
}) => {
  const { locale, ui, data } = useI18n();
  const lecternRef = useRef<HTMLElement | null>(null);
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<TraditionId | 'all'>(
    pantheonFocus !== 'all' ? pantheonFocus : (initialTraditionFilter ?? 'all')
  );
  const [selectedMedium, setSelectedMedium] = useState<'All Media' | CanonicalBook['medium']>(
    'All Media'
  );
  const [spotlightId, setSpotlightId] = useState<string>(
    initialBookId ?? data.canonicalBooks[0].id
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyBookLink = async () => {
    const ok = await copyShareableUrl();
    if (ok) {
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const filteredBooks = useMemo(() => {
    return data.canonicalBooks.filter((book) => {
      const matchesTrad = selectedTradition === 'all' || book.traditionId === selectedTradition;
      const matchesMed = selectedMedium === 'All Media' || book.medium === selectedMedium;
      return matchesTrad && matchesMed;
    });
  }, [data.canonicalBooks, selectedTradition, selectedMedium]);

  const spotlightBook = useMemo(() => {
    const inFiltered = filteredBooks.find((b) => b.id === spotlightId);
    return inFiltered ?? filteredBooks[0] ?? data.canonicalBooks[0];
  }, [data.canonicalBooks, filteredBooks, spotlightId]);

  const spotlightTrad = data.traditionById[spotlightBook.traditionId];

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.texts.kicker}</span>
          <h1>{ui.texts.heading}</h1>
          <p className="page-lead">{ui.texts.lead}</p>
        </div>

        <div className="row-wrap">
          <span className="tag-pill rubric">{ui.texts.badgeCount(data.canonicalBooks.length)}</span>
          <button
            id="share-book-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCopyBookLink}
          >
            {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copiedLink ? ui.texts.copiedBook : ui.texts.shareBook}</span>
          </button>
        </div>
      </header>

      {pantheonFocus === 'all' && (
        <div className="filter-bar" role="group" aria-label={ui.texts.heading}>
          <button
            id="texts-trad-all"
            type="button"
            className={selectedTradition === 'all' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => {
              setSelectedTradition('all');
              onSelectTraditionFilter('all');
            }}
          >
            {ui.texts.all10Mythologies(data.canonicalBooks.length)}
          </button>
          {data.traditions.map((trad) => (
            <button
              key={trad.id}
              id={`texts-trad-${trad.id}`}
              type="button"
              className={selectedTradition === trad.id ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                setSelectedTradition(trad.id);
                onSelectTraditionFilter(trad.id);
              }}
            >
              {compactTraditionName(trad.name)}
            </button>
          ))}
        </div>
      )}

      <div className="filter-bar" role="group" aria-label="Medium">
        {MEDIUM_FILTERS.map((med) => (
          <button
            key={med}
            id={`texts-med-${med.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            type="button"
            className={selectedMedium === med ? 'btn-ghost selected' : 'btn-ghost'}
            onClick={() => setSelectedMedium(med)}
          >
            <span>{BOOK_MEDIUM_LABEL[locale][med]}</span>
          </button>
        ))}
      </div>

      <section
        ref={lecternRef}
        className="visual-split-banner"
        aria-labelledby="lectern-book-title"
      >
        <div>
          <div className="row-between">
            <span className="folio-kicker">
              <ScrollText size={13} /> {ui.texts.lecternKicker(spotlightTrad?.name ?? '')}
            </span>
            <span className="tag-pill rubric">
              {BOOK_MEDIUM_LABEL[locale][spotlightBook.medium]}
            </span>
          </div>

          <h2 id="lectern-book-title" className="mt-sm">
            {spotlightBook.title}
          </h2>
          <p className="mono-meta mt-sm">
            {spotlightBook.nativeTitle} · {spotlightBook.dateComposed} ·{' '}
            {spotlightBook.authorOrCompiler}
          </p>

          <p className="mt-md">{spotlightBook.synopsis}</p>

          <blockquote className="monograph-thesis">
            “{spotlightBook.famousPassage}”
            <footer className="mono-meta mt-sm">— {spotlightBook.famousPassageCitation}</footer>
          </blockquote>

          <div className="mt-md">
            <span className="folio-kicker">{ui.texts.preservedMythsKicker}</span>
            <ul className="motif-list">
              {spotlightBook.keyMythsIncluded.map((myth) => (
                <li key={myth}>{myth}</li>
              ))}
            </ul>
          </div>

          <p className="mono-meta mt-md">
            <BookMarked size={13} /> <strong>{ui.texts.recommendedEdition}</strong>{' '}
            {spotlightBook.recommendedTranslation}
          </p>

          <div className="row-wrap mt-md">
            {spotlightBook.linkedDeityIds.map((did) => {
              const deity = data.deityById[did];
              if (!deity) return null;
              return (
                <button
                  key={did}
                  id={`lectern-deity-${did}`}
                  type="button"
                  className="btn-ghost"
                  onClick={() => setReaderDeityId(did)}
                >
                  <img
                    src={getDeityPortrait(deity.id)}
                    alt=""
                    className="search-deity-avatar"
                  />
                  <span>{deity.name}</span>
                </button>
              );
            })}
          </div>

          <div className="row-wrap mt-md">
            <button
              id="lectern-compare-deities-btn"
              type="button"
              className="btn-primary"
              onClick={() => {
                onJumpToCompareDeities(spotlightBook.linkedDeityIds.slice(0, 4));
                navigate({ page: 'deities' });
              }}
            >
              <Scale size={15} />
              <span>{ui.texts.compareBookDeities}</span>
            </button>

            <button
              id="lectern-open-motif-btn"
              type="button"
              className="btn-secondary"
              onClick={() => {
                onJumpToMotif(spotlightBook.linkedMotifId);
                navigate({ page: 'motifs' });
              }}
            >
              <Layers size={15} />
              <span>{ui.texts.parallelMotifBtn}</span>
            </button>

            <button
              id="lectern-open-pantheon-btn"
              type="button"
              className="btn-secondary"
              onClick={() =>
                navigate({ page: 'traditions', traditionSlug: spotlightBook.traditionId })
              }
            >
              <span>{ui.texts.monographSuffix(spotlightTrad?.name ?? '')}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <figure className="banner-plate-frame">
          <img
            src={assetUrl(spotlightBook.platePath)}
            alt={spotlightBook.title}
            className="banner-plate-img"
          />
        </figure>
      </section>

      <section aria-labelledby="all-codices-heading">
        <div className="section-heading-row">
          <div>
            <span className="folio-kicker">{ui.texts.libraryKicker}</span>
            <h2 id="all-codices-heading">{ui.texts.libraryHeading(filteredBooks.length)}</h2>
          </div>
        </div>

        <div className="folio-grid-2">
          {filteredBooks.map((book) => {
            const trad = data.traditionById[book.traditionId];
            const isSelected = book.id === spotlightBook.id;

            return (
              <article
                key={book.id}
                className={isSelected ? 'visual-card active' : 'visual-card'}
              >
                <div className="visual-card-media">
                  <img
                    src={assetUrl(book.platePath)}
                    alt={book.title}
                    className="visual-card-img"
                    loading="lazy"
                  />
                  <span className="media-badge-overlay">
                    {compactTraditionName(trad?.name)} · {book.dateComposed}
                  </span>
                </div>

                <div className="visual-card-content">
                  <div className="visual-card-header-row">
                    <span className="mono-meta">{book.nativeTitle}</span>
                    <span className="tag-pill rubric card-pill-nowrap">
                      {BOOK_MEDIUM_LABEL[locale][book.medium]}
                    </span>
                  </div>

                  <h3>{book.title}</h3>
                  <p className="visual-card-hook">{book.tagline}</p>

                  <div>
                    <span className="folio-kicker">{ui.texts.keyMythRefs}</span>
                    <ul className="motif-list">
                      {book.keyMythsIncluded.slice(0, 3).map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="mono-meta">
                    <strong>{ui.texts.editionShort}</strong> {book.recommendedTranslation}
                  </p>

                  <div className="folio-card-footer">
                    <button
                      id={`book-open-trad-${book.id}`}
                      type="button"
                      className="btn-ghost"
                      onClick={() =>
                        navigate({ page: 'traditions', traditionSlug: book.traditionId })
                      }
                    >
                      <span>{compactTraditionName(trad?.name)}</span>
                    </button>

                    <button
                      id={`book-inspect-${book.id}`}
                      type="button"
                      className={isSelected ? 'btn-secondary' : 'btn-primary'}
                      onClick={() => {
                        setSpotlightId(book.id);
                        onSelectBookId(book.id);
                        lecternRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <ScrollText size={14} />
                      <span>
                        {isSelected ? ui.texts.onLecternAbove : ui.texts.readExcerpt}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <DeityReaderDrawer
        deity={readerDeityId ? (data.deityById[readerDeityId] ?? null) : null}
        roster={spotlightBook.linkedDeityIds
          .map((id) => data.deityById[id])
          .filter((d): d is Deity => Boolean(d))}
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
