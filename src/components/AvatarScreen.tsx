'use client';

import { Lang, AVATARS } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang: Lang;
  selected: number | null;
  onSelect: (idx: number) => void;
  onNext: () => void;
}

export default function AvatarScreen({ lang, selected, onSelect, onNext }: Props) {
  const T = LANG[lang];

  return (
    <div className="card">
      <div className="section-title">{T.chooseAvatar}</div>
      <div className="avatar-grid">
        {AVATARS.map((av, i) => (
          <div
            key={i}
            className={`avatar-option${selected === i ? ' selected' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="avatar-emoji">{av.emoji}</span>
            <span className="avatar-label">{lang === 'ar' ? av.ar : av.en}</span>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary"
        disabled={selected === null}
        onClick={onNext}
      >
        {T.next}
      </button>
    </div>
  );
}
