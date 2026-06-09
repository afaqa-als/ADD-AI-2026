'use client';

import { useEffect } from 'react';
import BgLeaves      from '@/components/BgLeaves';
import WelcomeScreen from '@/components/WelcomeScreen';
import AvatarScreen  from '@/components/AvatarScreen';
import ThemeScreen   from '@/components/ThemeScreen';
import QuizScreen    from '@/components/QuizScreen';
import ResultsScreen from '@/components/ResultsScreen';
import { useQuiz }   from '@/hooks/useQuiz';
import { Theme }     from '@/lib/data';

export default function Home() {
  const {
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
  } = useQuiz();

  const {
    screen, lang, playerName, selectedAvatar,
    selectedTheme, currentQ, score, answerLog,
    loadingTheme, fetchError,
  } = state;

  // Sync body class for theme gradient + RTL direction
  useEffect(() => {
    document.body.className = selectedTheme?.bodyClass ?? '';
    document.body.lang = lang;
    document.body.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  }, [selectedTheme, lang]);

  function handleNameNext(name: string) {
    setPlayerName(name);
    goToAvatar();
  }

  function handleThemeSelect(theme: Theme) {
    selectTheme(theme, lang);
  }

  return (
    <>
      <BgLeaves />
      <div className="container">

        {screen === 'welcome' && (
          <WelcomeScreen
            lang={lang}
            onLangChange={setLang}
            onNext={handleNameNext}
          />
        )}

        {screen === 'avatar' && (
          <AvatarScreen
            lang={lang}
            selected={selectedAvatar}
            onSelect={selectAvatar}
            onNext={goToTheme}
          />
        )}

        {screen === 'theme' && (
          <ThemeScreen
            lang={lang}
            loadingTheme={loadingTheme}
            onSelect={handleThemeSelect}
          />
        )}

        {screen === 'quiz' && selectedTheme && currentQuestion && (
          <>
            {fetchError && (
              <div className="fetch-error-banner">
                ⚠️ {fetchError}
              </div>
            )}
            <QuizScreen
              lang={lang}
              theme={selectedTheme}
              avatar={currentAvatar}
              playerName={playerName}
              currentQ={currentQ}
              score={score}
              question={currentQuestion}
              onAnswer={selectAnswer}
              onNext={nextQuestion}
            />
          </>
        )}

        {screen === 'results' && selectedTheme && (
          <ResultsScreen
            lang={lang}
            avatar={currentAvatar}
            playerName={playerName}
            score={score}
            answerLog={answerLog}
            theme={selectedTheme}
            onPlayAgain={playAgain}
            onChangeTheme={changeTheme}
          />
        )}

      </div>
    </>
  );
}
