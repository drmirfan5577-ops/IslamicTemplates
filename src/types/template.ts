export type TemplateCategory =
  | 'calligraphy'
  | 'asmaul-husna'
  | 'floral-glass'
  | 'crystal'
  | 'ornate'
  | 'geometric'
  | 'mosaic'
  | 'light-bright'
  | 'milky-white'
  | 'starry'
  | 'embroidery'
  | 'carved'
  | 'spring'
  | 'dramatic'
  | 'energetic';

export type ColorScheme =
  | 'crimson-gold'
  | 'emerald-silver'
  | 'royal-blue'
  | 'purple-gold'
  | 'dark-red'
  | 'teal-silver'
  | 'amber-gold'
  | 'sapphire'
  | 'rose-silver'
  | 'midnight-blue'
  | 'pure-white'
  | 'pearl-ivory'
  | 'sky-gold'
  | 'mint-silver'
  | 'lavender-gold'
  | 'coral-gold'
  | 'ocean-teal'
  | 'sunset-orange'
  | 'spring-green'
  | 'cherry-blossom'
  | 'electric-blue'
  | 'neon-green'
  | 'hot-pink'
  | 'fire-orange'
  | 'ice-blue'
  | 'velvet-purple'
  | 'bronze-copper'
  | 'platinum-silver'
  | 'ruby-red'
  | 'jade-green';

export type ArabicFont =
  | 'amiri'
  | 'scheherazade'
  | 'lateef'
  | 'reem-kufi'
  | 'mada'
  | 'cairo'
  | 'tajawal'
  | 'noto-naskh'
  | 'ibm-plex-arabic'
  | 'aref-ruqaa'
  | 'harmattan'
  | 'alkalami'
  | 'jomhuria'
  | 'mirza'
  | 'rakkas'
  | 'el-messiri'
  | 'markazi'
  | 'noto-kufi'
  | 'lemonada'
  | 'vibes';

export type AnimationType =
  | 'glow'
  | 'sparkle'
  | 'pulse'
  | 'float'
  | 'shimmer'
  | 'rotate'
  | 'digital-run'
  | 'dramatic-flash'
  | 'electric'
  | 'rainbow'
  | 'neon-flicker'
  | 'fire'
  | 'ice-crystal'
  | 'matrix'
  | 'wave';

export type MoodType =
  | 'normal'
  | 'energetic'
  | 'dramatic'
  | 'peaceful'
  | 'majestic'
  | 'emergency'
  | 'suspicious'
  | 'happy'
  | 'solemn'
  | 'powerful';

export interface Template {
  id: number;
  title: string;
  arabicText: string;
  subtitle?: string;
  category: TemplateCategory;
  colorScheme: ColorScheme;
  animationType: AnimationType;
  variant: number;
  fontFamily?: ArabicFont;
  mood?: MoodType;
  isLight?: boolean;
}

export interface ImportedMedia {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  size: number;
  section?: string;
  addedAt: number;
}

export interface MediaSection {
  id: string;
  name: string;
  items: ImportedMedia[];
  createdAt: number;
}
