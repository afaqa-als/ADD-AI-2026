import { Lang, ThemeKey } from './data';

export interface Translations {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePH: string;
  next: string;
  chooseAvatar: string;
  chooseTheme: string;
  themes: Record<ThemeKey, string>;
  themeDesc: Record<ThemeKey, string>;
  scoreLabel: string;
  qLabel: string;
  of: string;
  correct: string;
  wrong: string;
  nextQ: string;
  seeResults: string;
  greetPrefix: string;
  playAgain: string;
  changeTheme: string;
  breakdown: string;
  msg: string[];
  stars: string[];
}

export const LANG: Record<Lang, Translations> = {
  en: {
    title: 'EcoQuiz',
    subtitle: 'Test your knowledge about our world!',
    nameLabel: 'Your Name',
    namePH: 'Enter your name…',
    next: 'Next →',
    chooseAvatar: 'Choose Your Avatar',
    chooseTheme: 'Choose a Theme',
    themes: {
      geography: 'Geography',
      history:   'History',
      science:   'Science',
      food:      'Food & Drink',
      animals:   'Animals',
    },
    themeDesc: {
      geography: 'Oceans, Mountains & More',
      history:   'Past Events & Figures',
      science:   'Nature & Discovery',
      food:      'Flavours of the World',
      animals:   'Wildlife & Nature',
    },
    scoreLabel: 'Score',
    qLabel:     'Question',
    of:         'of',
    correct:    'Correct! 🌿',
    wrong:      'Wrong! 🍂',
    nextQ:      'Next Question →',
    seeResults: 'See Results →',
    greetPrefix: 'Well done,',
    playAgain:   'Play Again',
    changeTheme: 'Change Theme',
    breakdown:   'Your Answers',
    msg: [
      'Keep practicing! The world awaits! 🌍',
      'Not bad! Keep learning! 📚',
      'Well done! Keep exploring! 🌱',
      "Outstanding! You're an EcoChampion! 🏆",
    ],
    stars: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
  },
  ar: {
    title: 'إيكوكويز',
    subtitle: 'اختبر معلوماتك عن عالمنا!',
    nameLabel: 'اسمك',
    namePH:    'أدخل اسمك…',
    next:      '← التالي',
    chooseAvatar: 'اختر صورتك الرمزية',
    chooseTheme:  'اختر موضوعاً',
    themes: {
      geography: 'الجغرافيا',
      history:   'التاريخ',
      science:   'العلوم',
      food:      'الطعام والشراب',
      animals:   'الحيوانات',
    },
    themeDesc: {
      geography: 'المحيطات والجبال والمزيد',
      history:   'أحداث وشخصيات تاريخية',
      science:   'الطبيعة والاكتشاف',
      food:      'نكهات من حول العالم',
      animals:   'الحياة البرية والطبيعة',
    },
    scoreLabel: 'النتيجة',
    qLabel:     'السؤال',
    of:         'من',
    correct:    'إجابة صحيحة! 🌿',
    wrong:      'إجابة خاطئة! 🍂',
    nextQ:      'السؤال التالي ←',
    seeResults: 'عرض النتائج ←',
    greetPrefix: 'أحسنت،',
    playAgain:   'العب مجدداً',
    changeTheme: 'تغيير الموضوع',
    breakdown:   'إجاباتك',
    msg: [
      'استمر في التدرب! العالم ينتظرك! 🌍',
      'ليس سيئاً! استمر في التعلم! 📚',
      'أحسنت! استمر في الاستكشاف! 🌱',
      'رائع! أنت بطل البيئة! 🏆',
    ],
    stars: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
  },
};
