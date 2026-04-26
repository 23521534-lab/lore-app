// ─── COLORS ───────────────────────────────────────────────────────
export const Colors = {
  bg: '#0e0c1a',
  bgCard: 'rgba(255,255,255,0.05)',
  bgCardBorder: 'rgba(255,255,255,0.08)',
  bgCardSolid: '#1a1730',

  lavender: '#c9b8f5',
  petal: '#f7a8c4',
  butter: '#ffd6a5',
  sky: '#a8d8ea',
  sage: '#c5f0c0',
  peachRose: '#ffb3c6',

  textPrimary: 'rgba(255,255,255,0.92)',
  textSecondary: 'rgba(255,255,255,0.5)',
  textMuted: 'rgba(255,255,255,0.25)',

  gradientHero: ['#ff9ecb', '#c9b8f5', '#a8d8ea'] as const,
  gradientPurplePink: ['#c9b8f5', '#f7a8c4'] as const,
  gradientPeach: ['#ffd6a5', '#ffb3c6'] as const,
  gradientSky: ['#a8d8ea', '#c9b8f5'] as const,
  gradientSage: ['#c5f0c0', '#a8d8ea'] as const,
  gradientDusk: ['#f5c6ec', '#c9b8f5'] as const,
};

// ─── TYPOGRAPHY ───────────────────────────────────────────────────
export const Fonts = {
  display: { fontFamily: 'Syne_800ExtraBold' },
  heading: { fontFamily: 'Syne_700Bold' },
  body: { fontFamily: 'SpaceGrotesk_400Regular' },
  bodyMedium: { fontFamily: 'SpaceGrotesk_500Medium' },
  bodySemiBold: { fontFamily: 'SpaceGrotesk_600SemiBold' },
};

// ─── SPACING ──────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// ─── RADIUS ───────────────────────────────────────────────────────
export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 999,
};

// ─── ICONS (unicode — no common emoji) ────────────────────────────
export const Icons = {
  home: '✦',
  search: '⊹',
  add: '+',
  boards: '⬡',
  profile: 'ᯓ★',
  film: '⟡',
  book: '꩜',
  music: '∿',
  youtube: '▷',
  podcast: '◎',
  game: '⬡',
  course: '⌗',
  recommend: '♡',
  memorable: '⋆｡°✩',
  revisit: '↻',
  watched: '✦',
  reading: '↻',
  wantTo: '+',
  saved: '✧',
  star: '✶',
  dot: '·',
  sparkle: '˖°',
  dreamy: '⋆｡°',
};

// ─── MEDIA TYPES ──────────────────────────────────────────────────
export const MediaTypes = [
  { id: 'all', label: '✦ all', icon: '✦' },
  { id: 'film', label: '⟡ films', icon: '⟡' },
  { id: 'book', label: '꩜ books', icon: '꩜' },
  { id: 'music', label: '∿ music', icon: '∿' },
  { id: 'youtube', label: '▷ youtube', icon: '▷' },
  { id: 'podcast', label: '◎ podcast', icon: '◎' },
  { id: 'game', label: '⬡ games', icon: '⬡' },
  { id: 'course', label: '⌗ courses', icon: '⌗' },
];

// ─── STATUS OPTIONS ───────────────────────────────────────────────
export const StatusOptions = {
  film: [
    { id: 'watched', label: '✦ watched', color: Colors.lavender },
    { id: 'watching', label: '◎ watching', color: Colors.petal },
    { id: 'want', label: '+ want to', color: 'rgba(255,255,255,0.2)' },
  ],
  book: [
    { id: 'read', label: '✦ done', color: Colors.lavender },
    { id: 'reading', label: '↻ reading', color: Colors.butter },
    { id: 'want', label: '+ want to', color: 'rgba(255,255,255,0.2)' },
  ],
  music: [
    { id: 'loved', label: '♡ loved', color: Colors.petal },
    { id: 'saved', label: '✧ saved', color: Colors.lavender },
    { id: 'listening', label: '∿ listening', color: Colors.sky },
  ],
  default: [
    { id: 'active', label: '✦ active', color: Colors.lavender },
    { id: 'saved', label: '✧ saved', color: Colors.sage },
    { id: 'want', label: '+ want to', color: 'rgba(255,255,255,0.2)' },
  ],
};

// ─── SAMPLE DATA ──────────────────────────────────────────────────
export const SampleItems = [
  {
    id: '1', type: 'film', title: 'Past Lives',
    creator: 'Celine Song', year: '2023',
    gradient: ['#2d1040', '#8b4f9e', '#f7a8c4'] as const,
    status: 'watched', tags: ['♡', '⋆｡°✩'],
    note: 'Made me feel seen in a way I did not expect.',
  },
  {
    id: '2', type: 'film', title: 'Aftersun',
    creator: 'Charlotte Wells', year: '2022',
    gradient: ['#0d2137', '#1a5276', '#a8d8ea'] as const,
    status: 'watched', tags: ['⋆｡°✩'],
    note: 'Stayed with me for weeks.',
  },
  {
    id: '3', type: 'film', title: 'Dune Part II',
    creator: 'Denis Villeneuve', year: '2024',
    gradient: ['#1a1a1a', '#4a3000', '#c8a951'] as const,
    status: 'want', tags: [],
    note: '',
  },
  {
    id: '4', type: 'film', title: 'Everything Everywhere',
    creator: 'Daniels', year: '2022',
    gradient: ['#1f0a2e', '#6b2d8b', '#ff6b9d'] as const,
    status: 'watching', tags: ['♡'],
    note: '',
  },
  {
    id: '5', type: 'book', title: 'Normal People',
    creator: 'Sally Rooney', year: '2018',
    gradient: ['#ffd6a5', '#ffb3c6'] as const,
    status: 'read', tags: ['♡', '⋆｡°✩'],
    note: 'The kind of book you miss before you finish it.',
  },
  {
    id: '6', type: 'book', title: 'Pachinko',
    creator: 'Min Jin Lee', year: '2017',
    gradient: ['#a8d8ea', '#c9b8f5'] as const,
    status: 'reading', tags: [],
    note: '',
  },
  {
    id: '7', type: 'book', title: 'Piranesi',
    creator: 'Susanna Clarke', year: '2020',
    gradient: ['#c5f0c0', '#a8d8ea'] as const,
    status: 'want', tags: [],
    note: '',
  },
  {
    id: '8', type: 'book', title: 'Yellowface',
    creator: 'R.F. Kuang', year: '2023',
    gradient: ['#f5c6ec', '#c9b8f5'] as const,
    status: 'want', tags: [],
    note: '',
  },
  {
    id: '9', type: 'music', title: 'Stick Season',
    creator: 'Noah Kahan', year: '2022',
    gradient: ['#c9b8f5', '#f7a8c4'] as const,
    status: 'loved', tags: ['♡'],
    note: '',
  },
  {
    id: '10', type: 'youtube', title: 'lofi hip hop radio',
    creator: 'Lofi Girl', year: '2024',
    gradient: ['#a8d8ea', '#c5f0c0'] as const,
    status: 'active', tags: ['✦'],
    note: '',
  },
  {
    id: '11', type: 'podcast', title: 'Conan O Brien Needs a Friend',
    creator: 'Conan OBrien', year: '2024',
    gradient: ['#ffd6a5', '#c9b8f5'] as const,
    status: 'active', tags: [],
    note: '',
  },
  {
    id: '12', type: 'game', title: 'Stardew Valley',
    creator: 'ConcernedApe', year: '2016',
    gradient: ['#c5f0c0', '#ffd6a5'] as const,
    status: 'active', tags: ['♡', '↻'],
    note: 'Cannot stop playing this.',
  },
];

export const SampleBoards = [
  {
    id: 'b1', title: '2024 in culture',
    description: 'everything that defined my year',
    itemCount: 12,
    gradient: ['#ff9ecb', '#c9b8f5'] as const,
  },
  {
    id: 'b2', title: 'cozy autumn reads',
    description: 'books for rainy days',
    itemCount: 8,
    gradient: ['#ffd6a5', '#ffb3c6'] as const,
  },
  {
    id: 'b3', title: 'films that wrecked me',
    description: 'the ones that stayed',
    itemCount: 15,
    gradient: ['#1f0a2e', '#c9b8f5'] as const,
  },
];
