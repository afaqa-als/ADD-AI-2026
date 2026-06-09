'use client';

import { useState, useCallback } from 'react';
import { Lang, Theme, Question, AVATARS, QUESTIONS } from '@/lib/data';

export type Screen = 'welcome' | 'avatar' | 'theme' | 'quiz' | 'results';

export interface QuizState {
  screen:          Screen;
  lang:            Lang;
  playerName:      string;
  selectedAvatar:  number | null;
  selectedTheme:   Theme   | null;
  currentQ:        number;
  score:           number;
  answered:        boolean;
  answerLog:       boolean[];
  // API-fetched questions (EN only); null = use hardcoded fallback
  liveQuestions:   Question[] | null;
  // ID of the theme card currently loading from the API
  loadingTheme:    string | null;
  fetchError:      string | null;
}

const INITIAL: QuizState = {
  screen:         'welcome',
  lang:           'en',
  playerName:     '',
  selectedAvatar: null,
  selectedTheme:  null,
  currentQ:       0,
  score:          0,
  answered:       false,
  answerLog:      [],
  liveQuestions:  null,
  loadingTheme:   null,
  fetchError:     null,
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL);

  // ── Language ────────────────────────────────────────────────────────────────
  const setLang = useCallback((lang: Lang) => {
    setState(s => ({ ...s, lang }));
  }, []);

  // ── Welcome ──────────────────────────────────────────────────────────────────
  const setPlayerName = useCallback((playerName: string) => {
    setState(s => ({ ...s, playerName }));
  }, []);

  const goToAvatar = useCallback(() => {
    setState(s => ({ ...s, screen: 'avatar' }));
  }, []);

  // ── Avatar ───────────────────────────────────────────────────────────────────
  const selectAvatar = useCallback((idx: number) => {
    setState(s => ({ ...s, selectedAvatar: idx }));
  }, []);

  const goToTheme = useCallback(() => {
    setState(s => ({ ...s, screen: 'theme' }));
  }, []);

  // ── Theme → Quiz (async: fetch from OpenTDB for EN, hardcoded for AR) ────────
  const selectTheme = useCallback(async (theme: Theme, lang: Lang) => {
    if (lang === 'ar') {
      // Arabic: use hardcoded questions immediately
      setState(s => ({
        ...s,
        screen:        'quiz',
        selectedTheme: theme,
        currentQ:      0,
        score:         0,
        answered:      false,
        answerLog:     [],
        liveQuestions: null,
        loadingTheme:  null,
        fetchError:    null,
      }));
      return;
    }

    // English: fetch from OpenTDB API route
    setState(s => ({ ...s, loadingTheme: theme.id, fetchError: null }));

    try {
      const res  = await fetch(`/api/questions?theme=${theme.key}`);
      const data = await res.json();

      if (!res.ok || !data.questions) {
        throw new Error(data.error ?? 'Unknown error');
      }

      setState(s => ({
        ...s,
        screen:        'quiz',
        selectedTheme: theme,
        currentQ:      0,
        score:         0,
        answered:      false,
        answerLog:     [],
        liveQuestions: data.questions as Question[],
        loadingTheme:  null,
        fetchError:    null,
      }));
    } catch (err) {
      console.warn('[useQuiz] API failed, falling back to hardcoded questions', err);
      // Graceful fallback: use hardcoded EN questions
      setState(s => ({
        ...s,
        screen:        'quiz',
        selectedTheme: theme,
        currentQ:      0,
        score:         0,
        answered:      false,
        answerLog:     [],
        liveQuestions: null,
        loadingTheme:  null,
        fetchError:    'Could not load live questions — using local questions instead.',
      }));
    }
  }, []);

  // ── Quiz actions ──────────────────────────────────────────────────────────────
  const selectAnswer = useCallback((chosen: number) => {
    setState(s => {
      if (s.answered || !s.selectedTheme) return s;

      const q = s.liveQuestions
        ? s.liveQuestions[s.currentQ]
        : QUESTIONS[s.selectedTheme.key][s.lang][s.currentQ];

      const isCorrect = chosen === q.answer;
      return {
        ...s,
        answered:  true,
        score:     isCorrect ? s.score + 1 : s.score,
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

  // ── Results ───────────────────────────────────────────────────────────────────
  const playAgain = useCallback(() => {
    setState(s => ({ ...INITIAL, lang: s.lang }));
  }, []);

  const changeTheme = useCallback(() => {
    setState(s => ({
      ...s,
      screen:        'theme',
      selectedTheme: null,
      currentQ:      0,
      score:         0,
      answered:      false,
      answerLog:     [],
      liveQuestions: null,
      fetchError:    null,
    }));
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────────
  const currentAvatar = AVATARS[state.selectedAvatar ?? 0];

  const currentQuestion: Question | null =
    state.selectedTheme
      ? (state.liveQuestions
          ? state.liveQuestions[state.currentQ]
          : QUESTIONS[state.selectedTheme.key][state.lang][state.currentQ])
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
    selectTheme,
    selectAnswer,
    nextQuestion,
    playAgain,
    changeTheme,
  };
}
