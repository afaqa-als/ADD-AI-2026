// ─── Types ────────────────────────────────────────────────────────────────────
export type Lang = 'en' | 'ar';

export interface Avatar {
  emoji: string;
  en: string;
  ar: string;
}

export interface Theme {
  id: string;
  cls: string;
  icon: string;
  key: ThemeKey;
  bodyClass: string;
}

export type ThemeKey = 'geography' | 'history' | 'science' | 'food' | 'animals';

export interface Question {
  q: string;
  opts: string[];
  answer: number; // 0-based index
  exp: string;
}

// ─── Avatars ──────────────────────────────────────────────────────────────────
export const AVATARS: Avatar[] = [
  { emoji: '🌳', en: 'Tree',      ar: 'شجرة'   },
  { emoji: '🦋', en: 'Butterfly', ar: 'فراشة'  },
  { emoji: '🌊', en: 'Wave',      ar: 'موجة'   },
  { emoji: '🦅', en: 'Eagle',     ar: 'نسر'    },
  { emoji: '🌺', en: 'Flower',    ar: 'زهرة'   },
  { emoji: '🐬', en: 'Dolphin',   ar: 'دولفين' },
  { emoji: '🦁', en: 'Lion',      ar: 'أسد'    },
  { emoji: '🌿', en: 'Herb',      ar: 'نبتة'   },
];

// ─── Themes ───────────────────────────────────────────────────────────────────
export const THEMES: Theme[] = [
  { id: 'geo',  cls: 'geo',  icon: '🗺️', key: 'geography', bodyClass: 'theme-geo'  },
  { id: 'hist', cls: 'hist', icon: '📜', key: 'history',   bodyClass: 'theme-hist' },
  { id: 'sci',  cls: 'sci',  icon: '🔬', key: 'science',   bodyClass: 'theme-sci'  },
  { id: 'food', cls: 'food', icon: '🍃', key: 'food',      bodyClass: 'theme-food' },
  { id: 'ani',  cls: 'ani',  icon: '🦎', key: 'animals',   bodyClass: 'theme-ani'  },
];

// ─── Questions ────────────────────────────────────────────────────────────────
export const QUESTIONS: Record<ThemeKey, Record<Lang, Question[]>> = {
  geography: {
    en: [
      { q: 'What is the longest river in the world?',
        opts: ['Amazon', 'Nile', 'Congo', 'Yangtze'], answer: 1,
        exp: 'The Nile stretches ~6,650 km through northeastern Africa.' },
      { q: 'Which country has the most natural lakes?',
        opts: ['Russia', 'USA', 'Canada', 'Brazil'], answer: 2,
        exp: 'Canada has over 3 million natural lakes – more than any other country.' },
      { q: 'What is the highest mountain on Earth?',
        opts: ['K2', 'Kilimanjaro', 'Denali', 'Mount Everest'], answer: 3,
        exp: 'Mount Everest stands at 8,849 m above sea level.' },
      { q: "Which is the world's largest ocean?",
        opts: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3,
        exp: "The Pacific Ocean covers over 165 million km², nearly half of Earth's water surface." },
      { q: "Approximately what % of Earth's surface is covered by water?",
        opts: ['50%', '71%', '85%', '60%'], answer: 1,
        exp: 'About 71% of Earth\'s surface is water, mostly oceans.' },
    ],
    ar: [
      { q: 'ما هو أطول نهر في العالم؟',
        opts: ['الأمازون', 'النيل', 'الكونغو', 'اليانغتسي'], answer: 1,
        exp: 'يمتد نهر النيل نحو 6,650 كم عبر شمال شرق أفريقيا.' },
      { q: 'أي دولة تمتلك أكبر عدد من البحيرات الطبيعية؟',
        opts: ['روسيا', 'الولايات المتحدة', 'كندا', 'البرازيل'], answer: 2,
        exp: 'تمتلك كندا أكثر من 3 ملايين بحيرة طبيعية، وهو أكبر عدد في العالم.' },
      { q: 'ما هو أعلى جبل على وجه الأرض؟',
        opts: ['K2', 'كيليمنجارو', 'دينالي', 'إيفرست'], answer: 3,
        exp: 'يبلغ ارتفاع جبل إيفرست 8,849 مترًا فوق مستوى سطح البحر.' },
      { q: 'ما هو أكبر محيط في العالم؟',
        opts: ['الأطلسي', 'الهندي', 'المتجمد الشمالي', 'الهادئ'], answer: 3,
        exp: 'يغطي المحيط الهادئ أكثر من 165 مليون كم²، وهو ما يُقارب نصف مسطحات المياه على الأرض.' },
      { q: 'ما النسبة التقريبية لسطح الأرض المغطى بالماء؟',
        opts: ['50%', '71%', '85%', '60%'], answer: 1,
        exp: 'يغطي الماء نحو 71% من سطح الأرض، معظمه في المحيطات.' },
    ],
  },
  history: {
    en: [
      { q: 'In which year did World War II end?',
        opts: ['1943', '1944', '1946', '1945'], answer: 3,
        exp: 'WWII ended in 1945: Germany surrendered in May, Japan in September.' },
      { q: 'Who was the first President of the United States?',
        opts: ['John Adams', 'George Washington', 'Thomas Jefferson', 'Benjamin Franklin'], answer: 1,
        exp: 'George Washington served as the 1st U.S. President from 1789 to 1797.' },
      { q: 'In what year did humans first land on the Moon?',
        opts: ['1965', '1967', '1969', '1971'], answer: 2,
        exp: 'On 20 July 1969, Neil Armstrong & Buzz Aldrin became the first humans on the Moon.' },
      { q: 'Which ancient wonder was in Alexandria, Egypt?',
        opts: ['The Colossus of Rhodes', 'The Lighthouse', 'The Hanging Gardens', 'The Statue of Zeus'], answer: 1,
        exp: 'The Lighthouse of Alexandria (Pharos) was one of the tallest structures of antiquity.' },
      { q: 'Who invented the telephone?',
        opts: ['Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Marconi'], answer: 2,
        exp: 'Bell received the first telephone patent in 1876.' },
    ],
    ar: [
      { q: 'في أي عام انتهت الحرب العالمية الثانية؟',
        opts: ['1943', '1944', '1946', '1945'], answer: 3,
        exp: 'انتهت الحرب عام 1945: استسلمت ألمانيا في مايو واليابان في سبتمبر.' },
      { q: 'من كان أول رئيس للولايات المتحدة؟',
        opts: ['جون آدامز', 'جورج واشنطن', 'توماس جيفرسون', 'بنجامين فرانكلين'], answer: 1,
        exp: 'تولّى جورج واشنطن الرئاسة من عام 1789 حتى 1797.' },
      { q: 'في أي عام وطأت أقدام البشر سطح القمر للمرة الأولى؟',
        opts: ['1965', '1967', '1969', '1971'], answer: 2,
        exp: 'في 20 يوليو 1969 أصبح نيل أرمسترونج وباز ألدرين أول بشر يطؤون القمر.' },
      { q: 'أي عجائب الدنيا القديمة كانت في الإسكندرية؟',
        opts: ['تمثال رودس', 'المنارة', 'حدائق بابل المعلقة', 'تمثال زيوس'], answer: 1,
        exp: 'كانت منارة الإسكندرية (فاروس) من أطول المنشآت التي شيّدها الإنسان قرونًا.' },
      { q: 'من يُنسب إليه اختراع الهاتف؟',
        opts: ['توماس إيديسون', 'نيكولا تسلا', 'ألكسندر غراهام بيل', 'ماركوني'], answer: 2,
        exp: 'حصل بيل على أول براءة اختراع للهاتف عام 1876.' },
    ],
  },
  science: {
    en: [
      { q: 'What is the chemical formula for water?',
        opts: ['HO', 'H2O2', 'H2O', 'OH2'], answer: 2,
        exp: 'Water = two hydrogen atoms + one oxygen atom → H₂O.' },
      { q: 'How many bones are in the adult human body?',
        opts: ['196', '206', '210', '220'], answer: 1,
        exp: 'Adults have 206 bones. Babies start with ~270, which fuse over time.' },
      { q: 'Which planet is called the Red Planet?',
        opts: ['Venus', 'Jupiter', 'Saturn', 'Mars'], answer: 3,
        exp: 'Mars looks red because of iron oxide (rust) on its surface.' },
      { q: 'What is the approximate speed of light?',
        opts: ['150,000 km/s', '300,000 km/s', '450,000 km/s', '600,000 km/s'], answer: 1,
        exp: 'Light travels at ~299,792 km/s in a vacuum.' },
      { q: 'What gas do plants absorb during photosynthesis?',
        opts: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 2,
        exp: 'Plants absorb CO₂ and release O₂ during photosynthesis.' },
    ],
    ar: [
      { q: 'ما الصيغة الكيميائية للماء؟',
        opts: ['HO', 'H2O2', 'H2O', 'OH2'], answer: 2,
        exp: 'الماء يتكون من ذرتَي هيدروجين وذرة أكسجين: H₂O.' },
      { q: 'كم عدد عظام جسم الإنسان البالغ؟',
        opts: ['196', '206', '210', '220'], answer: 1,
        exp: 'يمتلك البالغ 206 عظمة. يُولد الأطفال بنحو 270 تتلاحم تدريجياً.' },
      { q: "أيّ الكواكب يُعرف بـ'الكوكب الأحمر'؟",
        opts: ['الزهرة', 'المشتري', 'زحل', 'المريخ'], answer: 3,
        exp: 'يبدو المريخ أحمر بسبب أكسيد الحديد (الصدأ) على سطحه.' },
      { q: 'ما السرعة التقريبية للضوء؟',
        opts: ['150,000 كم/ث', '300,000 كم/ث', '450,000 كم/ث', '600,000 كم/ث'], answer: 1,
        exp: 'يسافر الضوء بسرعة ~299,792 كم/ث في الفراغ.' },
      { q: 'ما الغاز الذي تمتصه النباتات خلال التمثيل الضوئي؟',
        opts: ['الأكسجين', 'النيتروجين', 'ثاني أكسيد الكربون', 'الهيدروجين'], answer: 2,
        exp: 'تمتص النباتات CO₂ وتُطلق O₂ خلال عملية التمثيل الضوئي.' },
    ],
  },
  food: {
    en: [
      { q: 'Which country invented pizza?',
        opts: ['France', 'Greece', 'Spain', 'Italy'], answer: 3,
        exp: 'Pizza originated in Naples, Italy, in the late 18th century.' },
      { q: 'What is the main ingredient in guacamole?',
        opts: ['Tomato', 'Avocado', 'Lime', 'Jalapeño'], answer: 1,
        exp: 'Avocado is the star of guacamole, a dip from Mexico.' },
      { q: 'Which country does sushi come from?',
        opts: ['China', 'Korea', 'Japan', 'Vietnam'], answer: 2,
        exp: 'Sushi originated in Japan from a method of preserving fish in fermented rice.' },
      { q: 'What is the most consumed beverage after water?',
        opts: ['Coffee', 'Juice', 'Soda', 'Tea'], answer: 3,
        exp: "Tea is the world's second most consumed beverage after water." },
      { q: 'Which spice comes from the Crocus flower?',
        opts: ['Turmeric', 'Cinnamon', 'Saffron', 'Paprika'], answer: 2,
        exp: "Saffron comes from Crocus sativus stigmas and is the world's priciest spice." },
    ],
    ar: [
      { q: 'أي دولة يُنسب إليها اختراع البيتزا؟',
        opts: ['فرنسا', 'اليونان', 'إسبانيا', 'إيطاليا'], answer: 3,
        exp: 'نشأت البيتزا في نابولي بإيطاليا في أواخر القرن الثامن عشر.' },
      { q: 'ما المكوّن الرئيسي في الغواكامولي؟',
        opts: ['الطماطم', 'الأفوكادو', 'الليمون الأخضر', 'الجلابينيو'], answer: 1,
        exp: 'الأفوكادو هو المكوّن الأساسي في الغواكامولي، وهي صلصة مكسيكية الأصل.' },
      { q: 'من أي دولة تنحدر السوشي؟',
        opts: ['الصين', 'كوريا', 'اليابان', 'فيتنام'], answer: 2,
        exp: 'نشأت السوشي في اليابان من طريقة حفظ الأسماك في الأرز المخمّر.' },
      { q: 'ما أكثر مشروب يُستهلك في العالم بعد الماء؟',
        opts: ['القهوة', 'العصائر', 'المشروبات الغازية', 'الشاي'], answer: 3,
        exp: 'الشاي هو ثاني أكثر مشروب استهلاكًا عالميًا بعد الماء.' },
      { q: 'من أي زهرة يُستخرج الزعفران؟',
        opts: ['الكركم', 'القرفة', 'الزعفران', 'الفلفل الحلو'], answer: 2,
        exp: 'يُستخرج الزعفران من وصمات زهرة الكروكوس، وهو أغلى توابل في العالم.' },
    ],
  },
  animals: {
    en: [
      { q: 'What is the fastest land animal?',
        opts: ['Lion', 'Leopard', 'Cheetah', 'Horse'], answer: 2,
        exp: 'The cheetah reaches up to 120 km/h in short sprints.' },
      { q: 'How many hearts does an octopus have?',
        opts: ['1', '2', '3', '4'], answer: 2,
        exp: 'An octopus has 3 hearts: two for the gills, one for the body.' },
      { q: 'What is a group of lions called?',
        opts: ['Herd', 'Pack', 'Flock', 'Pride'], answer: 3,
        exp: 'A pride is a group of lions, typically 10–20 members.' },
      { q: 'Which is the only mammal capable of true powered flight?',
        opts: ['Flying Squirrel', 'Bat', 'Sugar Glider', 'Colugo'], answer: 1,
        exp: 'Bats are the only mammals with true powered flight.' },
      { q: 'What is the largest animal on Earth?',
        opts: ['Elephant', 'Whale Shark', 'Giraffe', 'Blue Whale'], answer: 3,
        exp: 'The blue whale can reach 33 m in length – the largest animal ever known.' },
    ],
    ar: [
      { q: 'ما هو أسرع حيوان بري؟',
        opts: ['الأسد', 'النمر', 'الفهد', 'الحصان'], answer: 2,
        exp: 'يصل الفهد إلى سرعات تبلغ 120 كم/ساعة في سباقات قصيرة.' },
      { q: 'كم عدد قلوب الأخطبوط؟',
        opts: ['1', '2', '3', '4'], answer: 2,
        exp: 'للأخطبوط 3 قلوب: اثنان للخياشيم وواحد لبقية الجسم.' },
      { q: 'ما اسم مجموعة الأسود؟',
        opts: ['قطيع', 'حزمة', 'سرب', 'فخر'], answer: 3,
        exp: 'تُسمى مجموعة الأسود فخرًا (Pride)، وتتكون عادةً من 10 إلى 20 فردًا.' },
      { q: 'ما الثدييات الوحيد القادر على الطيران الحقيقي؟',
        opts: ['السنجاب الطائر', 'الخفاش', 'السنجاب السكري', 'الكولوغو'], answer: 1,
        exp: 'الخفاش هو الثدييات الوحيد بطيران حقيقي، بفضل أغشية أجنحته.' },
      { q: 'ما أكبر حيوان على كوكب الأرض؟',
        opts: ['الفيل', 'القرش الحوتي', 'الزرافة', 'الحوت الأزرق'], answer: 3,
        exp: 'يصل الحوت الأزرق إلى 33 مترًا، وهو أكبر حيوان عُرف عبر التاريخ.' },
    ],
  },
};
