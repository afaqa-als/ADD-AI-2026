import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EcoQuiz | إيكوكويز',
  description: 'Bilingual AR/EN general knowledge trivia game with environmental theme',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
