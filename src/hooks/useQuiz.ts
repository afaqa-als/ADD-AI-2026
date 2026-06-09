'use client';

import { useState, useCallback } from 'react';
import { Lang, Theme, AVATARS, QUESTIONS } from '@/lib/data';

export type Screen = 'welcome' | 'avatar' | 'theme' | 'quiz' | 'results';

export interface QuizState {
  screen: Screen;
  lang: Lang;
  playerName: string;
  selectedAvatar: number | null;
  selectedTheme: Theme | null;
  currentQ: number;
  score: number;
  answered: boolean;
  answerLog: boolean[];
}

const INITIAL: QuizState = {
  screen: 'welcome',
  lang: 'en',
  playerName: '',
  selectedAvatar: null,
  selectedTheme: null,
  currentQ: 0,
  score: 0,
  answered: false,
  answerLog: [],
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL);

  const setLang = useCallback((lang: Lang) => {
    setState(s => ({ ...s, lang }));
  }, []);

  const setPlayerName = useCallback((playerName: string) => {
    setState(s => ({ ...s, playerName }));
  }, []);

  const goToAvatar = useCallback(() => {
    setState(s => ({ ...s, screen: 'avatar' }));
  }, []);

  const selectAvatar = useCallback((idx: number) => {
    setState(s => ({ ...s, selectedAvatar: idx }));
  }, []);

  const goToTheme = useCallback(() => {
    setState(s => ({ ...s, screen: 'theme' }));
  }, []);

  const startQuiz = useCallback((theme: Theme) => {
    setState(s => ({
      ...s,
      screen: 'quiz',
      selectedTheme: theme,
      currentQ: 0,
      score: 0,
      answered: false,
      answerLog: [],
    }));
  }, []);

  const selectAnswer = useCallback((chosen: number) => {
    setState(s => {
      if (s.answered || !s.selectedTheme) return s;
      const q = QUESTIONS[s.selectedTheme.key][s.lang][s.currentQ];
      const isCorrect = chosen === q.answer;
      return {
        ...s,
        answered: true,
        score: isCorrect ? s.score + 1 : s.score,
        answerLog: [...s.answerLog, isCorrect],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(s => {
      const next = s.currentQ + 1;
      if (next >= 5) return { ...s, screen: 'results' };
      return { ...s, currentQ: next, answered: false };
    });
  }, []);

  const playAgain = useCallback(() => {
    setState(s => ({
      ...INITIAL,
      lang: s.lang, // keep chosen language
    }));
  }, []);

  const changeTheme = useCallback(() => {
    setState(s => ({
      ...s,
      screen: 'theme',
      selectedTheme: null,
      currentQ: 0,
      score: 0,
      answered: false,
      answerLog: [],
    }));
  }, []);

  // Derived helpers
  const currentAvatar = AVATARS[state.selectedAvatar ?? 0];
  const currentQuestion =
    state.selectedTheme
      ? QUESTIONS[state.selectedTheme.key][state.lang][state.currentQ]
      : null;

  return {
    state,
    currentAvatar,
    currentQuestion,
    setLang,
    setPlayerName,
    goToAvatar,
    selectAvatar,
    goToTheme,
    startQuiz,
    selectAnswer,
    nextQuestion,
    playAgain,
    changeTheme,
  };
}
