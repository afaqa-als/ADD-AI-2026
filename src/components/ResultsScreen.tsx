'use client';

import { useEffect, useRef } from 'react';
import { Lang, Avatar, Theme } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang: Lang;
  avatar: Avatar;
  playerName: string;
  score: number;
  answerLog: boolean[];
  theme: Theme;
  onPlayAgain: () => void;
  onChangeTheme: () => void;
}

const TOTAL = 5;

function spawnConfetti() {
  const colors = ['#4CAF50','#2196F3','#FF9800','#E91E63','#9C27B0','#FFEB3B','#00BCD4'];
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      const size = 6 + Math.random() * 8;
      c.style.cssText = `
        left:${Math.random() * 100}vw; top:0;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        width:${size}px; height:${size}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
        animation-duration:${1.5 + Math.random() * 2.5}s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }, i * 35);
  }
}

export default function ResultsScreen({
  lang, avatar, playerName, score, answerLog, onPlayAgain, onChangeTheme,
}: Props) {
  const T = LANG[lang];
  const barsRef = useRef<HTMLDivElement>(null);

  const starIdx  = score === 0 ? -1 : Math.min(score - 1, 4);
  const starsStr = score === 0 ? '💧' : T.stars[starIdx];
  const msgIdx   = score <= 1 ? 0 : score <= 2 ? 1 : score <= 3 ? 2 : 3;

  // Animate result bars after mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!barsRef.current) return;
      barsRef.current.querySelectorAll<HTMLElement>('.result-bar-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  // Confetti on high score
  useEffect(() => {
    if (score >= 4) spawnConfetti();
  }, [score]);

  return (
    <div className="card">
      <span className="results-avatar">{avatar.emoji}</span>
      <div className="results-name">{T.greetPrefix} {playerName}!</div>
      <div className="stars">{starsStr}</div>

      <div className="score-circle">
        <div className="score-number">{score}</div>
        <div className="score-of">/{TOTAL}</div>
      </div>

      <div className="result-message">{T.msg[msgIdx]}</div>

      <div className="result-breakdown">
        <div className="result-breakdown-title">{T.breakdown}</div>
        <div className="result-bars" ref={barsRef}>
          {answerLog.map((correct, i) => (
            <div key={i} className="result-bar-row">
              <span className="result-bar-label">{i + 1}</span>
              <div className="result-bar-track">
                <div
                  className={`result-bar-fill ${correct ? 'right' : 'wrong'}`}
                  style={{ width: 0 }}
                  data-pct={correct ? 100 : 30}
                />
              </div>
              <span className="result-bar-icon">{correct ? '✅' : '❌'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary" onClick={onPlayAgain}>{T.playAgain}</button>
        <button className="btn btn-outline"  onClick={onChangeTheme}>{T.changeTheme}</button>
      </div>
    </div>
  );
}
