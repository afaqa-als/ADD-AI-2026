'use client';

import { useState, useEffect } from 'react';
import { Lang, Theme, Avatar, Question } from '@/lib/data';
import { LANG } from '@/lib/translations';

interface Props {
  lang: Lang;
  theme: Theme;
  avatar: Avatar;
  playerName: string;
  currentQ: number;
  score: number;
  question: Question;
  onAnswer: (idx: number) => void;
  onNext: () => void;
}

const LABELS = ['A', 'B', 'C', 'D'];
const TOTAL  = 5;

export default function QuizScreen({
  lang, theme, avatar, playerName,
  currentQ, score, question,
  onAnswer, onNext,
}: Props) {
  const T = LANG[lang];
  const pct = Math.round(((currentQ + 1) / TOTAL) * 100);
  const isLast = currentQ === TOTAL - 1;

  const [chosen, setChosen] = useState<number | null>(null);

  // Reset chosen when question changes
  useEffect(() => { setChosen(null); }, [currentQ]);

  function handleAnswer(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    onAnswer(i);
  }

  function optionClass(i: number): string {
    if (chosen === null) return 'option-btn';
    if (i === question.answer) return 'option-btn correct';
    if (i === chosen) return 'option-btn wrong';
    return 'option-btn';
  }

  const isCorrect = chosen !== null && chosen === question.answer;

  return (
    <div className="card">
      {/* Header */}
      <div className="quiz-header">
        <div className="player-info">
          <div className="player-avatar-sm">{avatar.emoji}</div>
          <div className="player-name-sm">{playerName}</div>
        </div>
        <div className="score-badge">
          {T.scoreLabel}: {score}/{TOTAL}
        </div>
      </div>

      {/* Progress */}
      <div className="progress-area">
        <div className="progress-text">
          <span>{T.qLabel} {currentQ + 1} {T.of} {TOTAL}</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="question-badge">{theme.icon} {T.themes[theme.key]}</div>
      <div className="question-text">{question.q}</div>

      {/* Options */}
      <div className="options-grid">
        {question.opts.map((opt, i) => (
          <button
            key={i}
            className={optionClass(i)}
            disabled={chosen !== null}
            onClick={() => handleAnswer(i)}
          >
            <span className="option-label">{LABELS[i]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {chosen !== null && (
        <div
          className={`feedback-banner show ${isCorrect ? 'correct-fb' : 'wrong-fb'}`}
          style={{ display: 'flex' }}
        >
          <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
          <div>
            <div>{isCorrect ? T.correct : T.wrong}</div>
            <div className="feedback-explain">{question.exp}</div>
          </div>
        </div>
      )}

      {/* Next button */}
      {chosen !== null && (
        <button className="btn btn-primary" onClick={onNext}>
          {isLast ? T.seeResults : T.nextQ}
        </button>
      )}
    </div>
  );
}
