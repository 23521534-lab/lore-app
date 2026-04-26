import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors, Fonts, Radius, Spacing, Icons } from '../constants';

const { width } = Dimensions.get('window');

// ─── GRADIENT CARD ────────────────────────────────────────────────
interface GradientCardProps {
  gradient: readonly string[];
  style?: object;
  children?: React.ReactNode;
  onPress?: () => void;
  radius?: number;
}
export const GradientCard = ({ gradient, style, children, onPress, radius = Radius.lg }: GradientCardProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
    <LinearGradient
      colors={gradient as [string, string, ...string[]]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={[{ borderRadius: radius, overflow: 'hidden' }]}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

// ─── STATUS PILL ──────────────────────────────────────────────────
interface StatusPillProps {
  label: string;
  color: string;
}
export const StatusPill = ({ label, color }: StatusPillProps) => (
  <View style={[styles.pill, { backgroundColor: color }]}>
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

// ─── FILTER CHIPS ─────────────────────────────────────────────────
interface FilterChipsProps {
  options: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}
export const FilterChips = ({ options, active, onChange }: FilterChipsProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.filterRow}
  >
    {options.map((opt) => (
      <TouchableOpacity
        key={opt.id}
        onPress={() => onChange(opt.id)}
        style={[styles.chip, active === opt.id && styles.chipActive]}
      >
        <Text style={[styles.chipText, active === opt.id && styles.chipTextActive]}>
          {opt.label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// ─── SECTION HEADER ───────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}
export const SectionHeader = ({ title, onSeeAll }: SectionHeaderProps) => (
  <View style={styles.sectionHead}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAll}>see all →</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── FILM CARD (grid) ─────────────────────────────────────────────
interface FilmCardProps {
  item: any;
  height?: number;
  onPress?: () => void;
}
export const FilmCard = ({ item, height = 160, onPress }: FilmCardProps) => (
  <GradientCard gradient={item.gradient} onPress={onPress} style={{ height }}>
    <View style={styles.filmInner}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.filmBottom}>
        <Text style={styles.filmTitle} numberOfLines={2}>{item.title}</Text>
        <StatusPill
          label={
            item.status === 'watched' ? '✦ watched' :
            item.status === 'watching' ? '◎ watching' : '+ want to'
          }
          color={
            item.status === 'watched' ? 'rgba(201,184,245,0.85)' :
            item.status === 'watching' ? 'rgba(247,168,196,0.85)' :
            'rgba(255,255,255,0.18)'
          }
        />
      </View>
    </View>
  </GradientCard>
);

// ─── BOOK CARD (horizontal scroll) ───────────────────────────────
interface BookCardProps {
  item: any;
  onPress?: () => void;
}
export const BookCard = ({ item, onPress }: BookCardProps) => (
  <TouchableOpacity onPress={onPress} style={styles.bookWrap} activeOpacity={0.85}>
    <GradientCard gradient={item.gradient} style={styles.bookCover}>
      <View style={styles.bookSpine} />
      <Text style={styles.bookIcon}>{Icons.book}</Text>
    </GradientCard>
    <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
    <Text style={styles.bookStatus}>
      {item.status === 'read' ? '✦ done' :
       item.status === 'reading' ? '↻ reading' : '+ want to'}
    </Text>
  </TouchableOpacity>
);

// ─── MUSIC ROW ITEM ───────────────────────────────────────────────
interface MusicItemProps {
  item: any;
  onPress?: () => void;
}
export const MusicItem = ({ item, onPress }: MusicItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.musicRow} activeOpacity={0.85}>
    <GradientCard gradient={item.gradient} style={styles.musicArt} radius={10}>
      <Text style={styles.musicArtIcon}>
        {item.type === 'music' ? '∿' : item.type === 'youtube' ? '▷' : '◎'}
      </Text>
    </GradientCard>
    <View style={styles.musicInfo}>
      <Text style={styles.musicTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.musicMeta}>{item.creator} · {item.type}</Text>
    </View>
    <Text style={styles.musicHeart}>
      {item.tags.includes('♡') ? '♡' : '✧'}
    </Text>
  </TouchableOpacity>
);

// ─── GLASS CARD ───────────────────────────────────────────────────
interface GlassCardProps {
  children: React.ReactNode;
  style?: object;
}
export const GlassCard = ({ children, style }: GlassCardProps) => (
  <View style={[styles.glassCard, style]}>
    {children}
  </View>
);

// ─── ITEM ROW (generic list) ──────────────────────────────────────
interface ItemRowProps {
  item: any;
  onPress?: () => void;
}
export const ItemRow = ({ item, onPress }: ItemRowProps) => (
  <TouchableOpacity onPress={onPress} style={styles.itemRow} activeOpacity={0.8}>
    <GradientCard gradient={item.gradient} style={styles.itemThumb} radius={10}>
      <Text style={styles.itemThumbIcon}>
        {item.type === 'film' ? '⟡' :
         item.type === 'book' ? '꩜' :
         item.type === 'music' ? '∿' :
         item.type === 'youtube' ? '▷' : '◎'}
      </Text>
    </GradientCard>
    <View style={styles.itemInfo}>
      <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.itemMeta}>{item.creator} · {item.year}</Text>
      {item.tags.length > 0 && (
        <Text style={styles.itemTags}>{item.tags.join('  ')}</Text>
      )}
    </View>
    <Text style={styles.itemArrow}>›</Text>
  </TouchableOpacity>
);

// ─── STYLES ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full, alignSelf: 'flex-start',
  },
  pillText: { ...Fonts.bodySemiBold, fontSize: 8, color: '#fff' },

  filterRow: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md, gap: 6 },
  chip: {
    paddingHorizontal: 13, paddingVertical: 6, borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: { backgroundColor: '#fff', borderColor: '#fff' },
  chipText: { ...Fonts.bodySemiBold, fontSize: 10, color: Colors.textMuted },
  chipTextActive: { color: Colors.bg },

  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm,
  },
  sectionTitle: { ...Fonts.heading, fontSize: 13, color: Colors.textPrimary },
  seeAll: { ...Fonts.body, fontSize: 10, color: Colors.lavender },

  filmInner: { flex: 1, justifyContent: 'flex-end', padding: 10 },
  filmBottom: { gap: 5 },
  filmTitle: { ...Fonts.heading, fontSize: 11, color: '#fff', lineHeight: 14 },

  bookWrap: { width: 90, gap: 6 },
  bookCover: { width: 90, height: 120, borderRadius: Radius.md, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  bookSpine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, backgroundColor: 'rgba(0,0,0,0.15)' },
  bookIcon: { fontSize: 24, color: 'rgba(255,255,255,0.6)' },
  bookTitle: { ...Fonts.heading, fontSize: 10, color: Colors.textPrimary, lineHeight: 13 },
  bookStatus: { ...Fonts.body, fontSize: 9, color: Colors.textMuted },

  musicRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.md, padding: 10,
  },
  musicArt: { width: 38, height: 38, justifyContent: 'center', alignItems: 'center' },
  musicArtIcon: { fontSize: 16, color: 'rgba(255,255,255,0.6)' },
  musicInfo: { flex: 1 },
  musicTitle: { ...Fonts.bodyMedium, fontSize: 12, color: Colors.textPrimary },
  musicMeta: { ...Fonts.body, fontSize: 10, color: Colors.textMuted },
  musicHeart: { fontSize: 14, color: Colors.lavender },

  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radius.xl,
  },

  itemRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.md,
    padding: 12, marginBottom: 6,
  },
  itemThumb: { width: 44, height: 56, justifyContent: 'center', alignItems: 'center' },
  itemThumbIcon: { fontSize: 20, color: 'rgba(255,255,255,0.5)' },
  itemInfo: { flex: 1 },
  itemTitle: { ...Fonts.heading, fontSize: 13, color: Colors.textPrimary, marginBottom: 2 },
  itemMeta: { ...Fonts.body, fontSize: 10, color: Colors.textMuted, marginBottom: 3 },
  itemTags: { ...Fonts.body, fontSize: 12, color: Colors.lavender },
  itemArrow: { fontSize: 18, color: Colors.textMuted },
});
