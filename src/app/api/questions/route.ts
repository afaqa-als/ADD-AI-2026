import { NextRequest, NextResponse } from 'next/server';
import { ThemeKey, Question } from '@/lib/data';

// ── OpenTDB category IDs per theme ───────────────────────────────────────────
const CATEGORY: Record<ThemeKey, number> = {
  geography: 22, // Geography
  history:   23, // History
  science:   17, // Science & Nature
  food:       9, // General Knowledge (OpenTDB has no Food category)
  animals:   27, // Animals
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── OpenTDB raw result shape ──────────────────────────────────────────────────
interface OTDBResult {
  question:          string;
  correct_answer:    string;
  incorrect_answers: string[];
  category:          string;
  difficulty:        string;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const themeParam = request.nextUrl.searchParams.get('theme') as ThemeKey | null;
  const theme      = themeParam && themeParam in CATEGORY ? themeParam : 'geography';
  const category   = CATEGORY[theme];

  try {
    const apiUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy&type=multiple`;
    const res    = await fetch(apiUrl, {
      // Cache for 10 minutes to respect OpenTDB rate-limits
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `OpenTDB returned ${res.status}` },
        { status: 502 }
      );
    }

    const data: { response_code: number; results: OTDBResult[] } = await res.json();

    // response_code 0 = success; 5 = rate limited
    if (data.response_code !== 0) {
      return NextResponse.json(
        { error: 'OpenTDB error', code: data.response_code },
        { status: 503 }
      );
    }

    const questions: Question[] = data.results.map((item) => {
      const correct   = decodeHtml(item.correct_answer);
      const incorrect = item.incorrect_answers.map(decodeHtml);
      const opts      = shuffle([correct, ...incorrect]);
      const answer    = opts.indexOf(correct);          // 0-based index

      return {
        q:      decodeHtml(item.question),
        opts,
        answer,
        exp: `✔ ${correct}`,
      };
    });

    return NextResponse.json({ questions });
  } catch (err) {
    console.error('[/api/questions]', err);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
