import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { TraditionId } from '../types/mythology';
import type { Locale, RealmMode } from '../utils/storage';
import {
  ENGLISH_DATA,
  I18nContext,
  buildChineseData,
  type BestiaryCatalogModule,
  type I18nContextValue,
  type LocalizedMythosData,
  type ZhCatalogModule,
} from './I18nContext';
import { CINEMA_SCENES_I18N, SHORT_TRADITION_NAME, UI_STRINGS } from './uiStrings';

export const I18nProvider: React.FC<{
  locale: Locale;
  onChangeLocale: (next: Locale) => void;
  realm: RealmMode;
  onChangeRealm: (next: RealmMode) => void;
  children: React.ReactNode;
}> = ({ locale, onChangeLocale, realm, onChangeRealm, children }) => {
  const [zhModule, setZhModule] = useState<ZhCatalogModule | null>(null);
  const [bestiaryModule, setBestiaryModule] = useState<BestiaryCatalogModule | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    if (locale === 'zh' && !zhModule) {
      import('./zh/index').then((mod) => {
        setZhModule(mod);
      });
    }
  }, [locale, zhModule]);

  useEffect(() => {
    document.documentElement.setAttribute('data-realm', realm);
    if (realm === 'bestiary' && !bestiaryModule) {
      import('../bestiary/index').then((mod) => {
        setBestiaryModule(mod);
      });
    }
  }, [realm, bestiaryModule]);

  const toggleLocale = useCallback(() => {
    onChangeLocale(locale === 'en' ? 'zh' : 'en');
  }, [locale, onChangeLocale]);

  const data = useMemo<LocalizedMythosData>(() => {
    if (realm === 'bestiary' && bestiaryModule) {
      return bestiaryModule.buildBestiaryData(locale);
    }
    if (locale === 'zh' && zhModule) {
      return buildChineseData(zhModule);
    }
    return ENGLISH_DATA;
  }, [bestiaryModule, locale, realm, zhModule]);

  const ui = useMemo(() => {
    if (realm === 'bestiary' && bestiaryModule) {
      return bestiaryModule.BESTIARY_UI_STRINGS[locale];
    }
    return UI_STRINGS[locale];
  }, [bestiaryModule, locale, realm]);

  const cinemaScenes = useMemo(() => {
    if (realm === 'bestiary' && bestiaryModule) {
      return bestiaryModule.BESTIARY_CINEMA_SCENES_I18N[locale];
    }
    return CINEMA_SCENES_I18N[locale];
  }, [bestiaryModule, locale, realm]);

  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
        style: 'percent',
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US'),
    [locale]
  );

  const shortTraditionName = useCallback(
    (tid: TraditionId) => SHORT_TRADITION_NAME[locale][tid],
    [locale]
  );

  const formatPercent = useCallback(
    (scoreOutOf100: number) => percentFormatter.format(scoreOutOf100 / 100),
    [percentFormatter]
  );

  const formatNumber = useCallback(
    (val: number) => numberFormatter.format(val),
    [numberFormatter]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: onChangeLocale,
      toggleLocale,
      realm,
      setRealm: onChangeRealm,
      ui,
      cinemaScenes,
      data,
      shortTraditionName,
      formatPercent,
      formatNumber,
    }),
    [
      cinemaScenes,
      data,
      formatNumber,
      formatPercent,
      locale,
      onChangeLocale,
      onChangeRealm,
      realm,
      shortTraditionName,
      toggleLocale,
      ui,
    ]
  );

  const isCatalogPending =
    (realm === 'bestiary' && !bestiaryModule) ||
    (realm === 'pantheons' && locale === 'zh' && !zhModule);

  const loadingLabel =
    realm === 'bestiary'
      ? locale === 'zh'
        ? '正在启封神话异兽志典籍……'
        : 'UNSEALING BESTIARY CODEX...'
      : locale === 'zh'
        ? '正在启封神话典藏馆卷轴……'
        : 'UNSEALING MYTHOS ARCHIVE...';

  return (
    <I18nContext.Provider value={value}>
      {isCatalogPending ? (
        <div className="catalog-loading-shell" role="status" aria-live="polite">
          <div className="synthesis-banner">
            <span className="folio-kicker">{loadingLabel}</span>
          </div>
        </div>
      ) : (
        children
      )}
    </I18nContext.Provider>
  );
};
