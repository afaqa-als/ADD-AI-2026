'use client';

import { useState } from 'react';
import LangToggle from './LangToggle';
import { Lang } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onNext: (name: string) => void;
}

export default function WelcomeScreen({ lang, onLangChange, onNext }: Props) {
  const [name, setName] = useState('');
  const T = LANG[lang];

  return (
    <div className="card">
      <LangToggle lang={lang} onChange={onLangChange} />
      <div className="logo-area">
        <span className="logo-icon">🌍</span>
        <div className="logo-title">{T.title}</div>
        <div className="logo-subtitle">{T.subtitle}</div>
      </div>
      <div className="input-group">
        <label>{T.nameLabel}</label>
        <input
          type="text"
          className="text-input"
          placeholder={T.namePH}
          maxLength={24}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={!name.trim()}
        onClick={() => onNext(name.trim())}
      >
        {T.next}
      </button>
    </div>
  );
}
