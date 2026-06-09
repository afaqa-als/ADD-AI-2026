'use client';

import { Lang, Theme, THEMES } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang: Lang;
  onSelect: (theme: Theme) => void;
}

export default function ThemeScreen({ lang, onSelect }: Props) {
  const T = LANG[lang];

  return (
    <div className="card">
      <div className="section-title">{T.chooseTheme}</div>
      <div className="theme-grid">
        {THEMES.map((th, i) => (
          <div
            key={th.id}
            className={`theme-card ${th.cls}${i === 4 ? ' theme-card-fifth' : ''}`}
            onClick={() => onSelect(th)}
          >
            <span className="theme-icon">{th.icon}</span>
            <div className="theme-name">{T.themes[th.key]}</div>
            <div className="theme-desc">{T.themeDesc[th.key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
