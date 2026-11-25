import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Check, Plus, RotateCcw } from 'lucide-react';
import { DeityReaderDrawer } from '../components/DeityReaderDrawer';
import { getLineageNodePortrait } from '../data/visuals';
import { useI18n } from '../i18n/I18nContext';
import { compactTraditionName } from '../i18n/uiStrings';
import type { LineageNode, LineageTier, RouteState, TraditionId } from '../types/mythology';
import type { PantheonFocus, RealmMode } from '../utils/storage';

interface LineagesPageProps {
  pantheonFocus: PantheonFocus;
  selectedTraditionId: TraditionId;
  onSelectTradition: (id: TraditionId) => void;
  compareIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (deityId: string) => void;
  onJumpCrossRealm: (targetRealm: RealmMode, targetDeityId: string) => void;
  onToggleCompareDeity: (deityId: string) => void;
  navigate: (next: RouteState) => void;
  onJumpToSaga: (sagaId: string) => void;
}

const TIER_Y: Record<LineageTier, number> = {
  primordial: 74,
  elder: 196,
  sovereign: 326,
  offspring: 454,
};

const NODE_W = 156;
const NODE_H = 58;

function getNodeCenter(node: LineageNode): { cx: number; cy: number } {
  const cx = 108 + node.column * 166;
  const cy = TIER_Y[node.tier];
  return { cx, cy };
}

export const LineagesPage: React.FC<LineagesPageProps> = ({
  pantheonFocus,
  selectedTraditionId,
  onSelectTradition,
  compareIds,
  favoriteIds,
  onToggleFavorite,
  onJumpCrossRealm,
  onToggleCompareDeity,
  navigate,
  onJumpToSaga,
}) => {
  const { locale, realm, ui, data } = useI18n();
  const [readerDeityId, setReaderDeityId] = useState<string | null>(null);
  const quickReadLabel = locale === 'zh' ? '阅读详传' : 'Quick Read';

  const lineage = useMemo(
    () =>
      data.pantheonLineages.find((l) => l.traditionId === selectedTraditionId) ??
      data.pantheonLineages[0],
    [data.pantheonLineages, selectedTraditionId]
  );

  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  const activeNode = useMemo(() => {
    if (focusedNodeId) {
      const found = lineage.nodes.find((n) => n.id === focusedNodeId);
      if (found) return found;
    }
    return lineage.nodes[0];
  }, [lineage, focusedNodeId]);

  const connectedNodeIds = useMemo(() => {
    if (!focusedNodeId) return null;
    const set = new Set<string>([focusedNodeId]);
    for (const edge of lineage.edges) {
      if (edge.from === focusedNodeId) set.add(edge.to);
      if (edge.to === focusedNodeId) set.add(edge.from);
    }
    return set;
  }, [lineage, focusedNodeId]);

  const nodeMap = useMemo(
    () => Object.fromEntries(lineage.nodes.map((n) => [n.id, n])),
    [lineage]
  );

  const activeNodeRelations = useMemo(() => {
    return lineage.edges.filter((e) => e.from === activeNode.id || e.to === activeNode.id);
  }, [lineage, activeNode]);

  const linkedDeity = activeNode.deityId ? data.deityById[activeNode.deityId] : undefined;
  const trad = data.traditionById[lineage.traditionId];

  return (
    <div>
      <header className="page-masthead">
        <div className="page-masthead-copy">
          <span className="folio-kicker">{ui.lineages.kicker}</span>
          <h1>{ui.lineages.heading}</h1>
          <p className="page-lead">{ui.lineages.lead}</p>
        </div>
      </header>

      {pantheonFocus === 'all' && (
        <div className="filter-bar" role="group" aria-label={ui.lineages.heading}>
          {data.traditions.map((t) => (
            <button
              key={t.id}
              id={`lineage-tab-${t.id}`}
              type="button"
              className={t.id === lineage.traditionId ? 'chip-btn active' : 'chip-btn'}
              onClick={() => {
                onSelectTradition(t.id);
                setFocusedNodeId(null);
              }}
              title={t.name}
            >
              {compactTraditionName(t.name)}
            </button>
          ))}
        </div>
      )}

      <div className="lineage-layout">
        <section className="lineage-canvas-card" aria-label={lineage.title}>
          <div className="row-between">
            <div>
              <span className="folio-kicker">
                {ui.lineages.lineageSuffix(trad?.name ?? '')}
              </span>
              <h2>{lineage.title}</h2>
            </div>
            {focusedNodeId && (
              <button
                id="reset-lineage-focus-btn"
                type="button"
                className="btn-ghost"
                onClick={() => setFocusedNodeId(null)}
              >
                <RotateCcw size={13} />
                <span>{ui.lineages.showAllConnections}</span>
              </button>
            )}
          </div>
          <p className="text-muted mt-sm">{lineage.cosmologicalNote}</p>

          <svg
            className="lineage-svg mt-md"
            viewBox="0 0 880 530"
            role="img"
            aria-label={lineage.title}
          >
            <rect x="10" y="34" width="860" height="80" rx="6" className="lineage-tier-band" />
            <text x="22" y="50" className="lineage-tier-label">
              {ui.lineages.tier1}
            </text>

            <rect x="10" y="156" width="860" height="80" rx="6" className="lineage-tier-band" />
            <text x="22" y="172" className="lineage-tier-label">
              {ui.lineages.tier2}
            </text>

            <rect x="10" y="286" width="860" height="80" rx="6" className="lineage-tier-band" />
            <text x="22" y="302" className="lineage-tier-label">
              {ui.lineages.tier3}
            </text>

            <rect x="10" y="414" width="860" height="80" rx="6" className="lineage-tier-band" />
            <text x="22" y="430" className="lineage-tier-label">
              {ui.lineages.tier4}
            </text>

            {lineage.edges.map((edge, idx) => {
              const source = nodeMap[edge.from];
              const target = nodeMap[edge.to];
              if (!source || !target) return null;

              const { cx: x1, cy: y1 } = getNodeCenter(source);
              const { cx: x2, cy: y2 } = getNodeCenter(target);

              const sameRow = y1 === y2;
              const d = sameRow
                ? `M ${x1} ${y1 - NODE_H / 2} Q ${(x1 + x2) / 2} ${y1 - 68} ${x2} ${y2 - NODE_H / 2}`
                : `M ${x1} ${y1 + NODE_H / 2} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2 - NODE_H / 2}`;

              const isConnectedToFocus =
                !focusedNodeId || edge.from === focusedNodeId || edge.to === focusedNodeId;

              const edgeClass = [
                'lineage-edge',
                edge.type,
                focusedNodeId ? (isConnectedToFocus ? 'highlighted' : 'dimmed') : '',
              ]
                .filter(Boolean)
                .join(' ');

              return <path key={`${edge.from}-${edge.to}-${idx}`} d={d} className={edgeClass} />;
            })}

            {lineage.nodes.map((node) => {
              const { cx, cy } = getNodeCenter(node);
              const isSelected = activeNode.id === node.id;
              const isDimmed = connectedNodeIds ? !connectedNodeIds.has(node.id) : false;

              const groupClass = [
                'lineage-node-group',
                isSelected ? 'selected' : '',
                isDimmed ? 'dimmed' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <g
                  key={node.id}
                  id={`lineage-node-${node.id}`}
                  className={groupClass}
                  onClick={() =>
                    setFocusedNodeId((prev) => (prev === node.id ? null : node.id))
                  }
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}: ${node.role}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setFocusedNodeId((prev) => (prev === node.id ? null : node.id));
                    }
                  }}
                >
                  <rect
                    x={cx - NODE_W / 2}
                    y={cy - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="6"
                    className="lineage-node-rect"
                  />
                  <text x={cx} y={cy - 4} textAnchor="middle" className="lineage-node-title">
                    {node.label}
                  </text>
                  <text x={cx} y={cy + 14} textAnchor="middle" className="lineage-node-role">
                    {node.role.length > 26 ? `${node.role.slice(0, 25)}…` : node.role}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="lineage-legend">
            <span>
              <strong>{ui.lineages.legendParent}</strong> {ui.lineages.legendParentDesc}
            </span>
            <span>
              <strong>{ui.lineages.legendConsort}</strong> {ui.lineages.legendConsortDesc}
            </span>
            <span>
              <strong>{ui.lineages.legendSibling}</strong> {ui.lineages.legendSiblingDesc}
            </span>
            <span>
              <strong>{ui.lineages.legendRival}</strong> {ui.lineages.legendRivalDesc}
            </span>
          </div>
        </section>

        <aside className="inspector-panel" aria-label={activeNode.label}>
          <img
            src={getLineageNodePortrait(activeNode, realm)}
            alt={activeNode.label}
            className="compare-portrait-thumb"
          />
          <span className="folio-kicker">
            {ui.lineages.nodeInspector(ui.lineages.tierNames[activeNode.tier])}
          </span>
          <h2 className="mt-sm">{activeNode.label}</h2>
          <p className="mono-meta">{activeNode.role}</p>
          <p className="mt-md">{activeNode.bio}</p>

          {activeNodeRelations.length > 0 && (
            <div className="mt-md">
              <span className="folio-kicker">{ui.lineages.directRelationships}</span>
              <div className="stack-sm mt-sm">
                {activeNodeRelations.map((rel, idx) => {
                  const otherId = rel.from === activeNode.id ? rel.to : rel.from;
                  const other = nodeMap[otherId];
                  if (!other) return null;
                  const directionLabel =
                    rel.type === 'parent'
                      ? rel.from === activeNode.id
                        ? ui.lineages.progenitorOf
                        : ui.lineages.descendedFrom
                      : rel.type === 'consort'
                        ? ui.lineages.consortRel
                        : rel.type === 'sibling'
                          ? ui.lineages.siblingRel
                          : ui.lineages.rivalRel;

                  return (
                    <button
                      key={`${rel.from}-${rel.to}-${idx}`}
                      id={`inspector-rel-${other.id}`}
                      type="button"
                      className="btn-ghost"
                      onClick={() => setFocusedNodeId(other.id)}
                    >
                      <span>
                        <strong>
                          {directionLabel}
                          {locale === 'zh' ? '：' : ': '}
                        </strong>
                        {other.label}
                        {rel.note ? ` (${rel.note})` : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="stack-sm mt-md">
            {linkedDeity && (
              <>
                <button
                  id={`lineage-read-${linkedDeity.id}`}
                  type="button"
                  className="btn-secondary"
                  onClick={() => setReaderDeityId(linkedDeity.id)}
                >
                  <BookOpen size={15} />
                  <span>
                    {quickReadLabel}: {linkedDeity.name}
                  </span>
                </button>
                <button
                  id={`lineage-compare-${linkedDeity.id}`}
                  type="button"
                  className={
                    compareIds.includes(linkedDeity.id) ? 'btn-secondary' : 'btn-primary'
                  }
                  onClick={() => onToggleCompareDeity(linkedDeity.id)}
                >
                  {compareIds.includes(linkedDeity.id) ? <Check size={15} /> : <Plus size={15} />}
                  <span>
                    {compareIds.includes(linkedDeity.id)
                      ? ui.lineages.inComparator(linkedDeity.name)
                      : ui.lineages.compareDeity(linkedDeity.name)}
                  </span>
                </button>
              </>
            )}

            <button
              id="lineage-open-monograph"
              type="button"
              className="btn-secondary"
              onClick={() =>
                navigate({ page: 'traditions', traditionSlug: lineage.traditionId })
              }
            >
              <span>{ui.lineages.monographSuffix(compactTraditionName(trad?.name))}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </aside>
      </div>

      <DeityReaderDrawer
        deity={readerDeityId ? (data.deityById[readerDeityId] ?? null) : null}
        roster={data.deities.filter((d) => d.traditionId === lineage.traditionId)}
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
