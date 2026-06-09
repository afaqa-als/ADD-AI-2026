'use client';

import { Lang } from '@/lib/data';

interface Props {
  lang: Lang;
  onChange: (l: Lang) => void;
}

export default function LangToggle({ lang, onChange }: Props) {
  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        className={`lang-btn${lang === 'ar' ? ' active' : ''}`}
        onClick={() => onChange('ar')}
      >
        ع
      </button>
    </div>
  );
}
