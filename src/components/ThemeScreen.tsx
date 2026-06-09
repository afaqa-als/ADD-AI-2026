'use client';

import { Lang, Theme, THEMES } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang:          Lang;
  loadingTheme:  string | null;  // ID of the card currently fetching
  onSelect:      (theme: Theme) => void;
}

export default function ThemeScreen({ lang, loadingTheme, onSelect }: Props) {
  const T = LANG[lang];

  return (
    <div className="card">
      <div className="section-title">{T.chooseTheme}</div>
      <div className="theme-grid">
        {THEMES.map((th, i) => {
          const isLoading = loadingTheme === th.id;
          const isDisabled = loadingTheme !== null;

          return (
            <div
              key={th.id}
              className={`theme-card ${th.cls}${i === 4 ? ' theme-card-fifth' : ''}${isDisabled ? ' theme-card-disabled' : ''}`}
              onClick={() => !isDisabled && onSelect(th)}
              style={{ opacity: isDisabled && !isLoading ? 0.5 : 1, cursor: isDisabled ? 'wait' : 'pointer' }}
            >
              {isLoading ? (
                <>
                  <span className="theme-icon theme-spinner">⏳</span>
                  <div className="theme-name" style={{ fontSize: '0.85rem' }}>
                    {lang === 'ar' ? 'جارٍ التحميل…' : 'Loading…'}
                  </div>
                </>
              ) : (
                <>
                  <span className="theme-icon">{th.icon}</span>
                  <div className="theme-name">{T.themes[th.key]}</div>
                  <div className="theme-desc">{T.themeDesc[th.key]}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
