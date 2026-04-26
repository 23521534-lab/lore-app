import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  Dimensions, TouchableOpacity, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLoreStore } from '../store';
import { Colors, Fonts, Spacing, Radius, MediaTypes, Icons } from '../constants';
import {
  FilterChips, SectionHeader, FilmCard,
  BookCard, MusicItem, GlassCard,
} from '../components';

const { width } = Dimensions.get('window');
const FILM_CARD_W = (width - Spacing.lg * 2 - 6) / 2;

export default function HomeScreen() {
  const { activeFilter, setFilter, getItemsByType, getStats } = useLoreStore();
  const stats = getStats();
  const films = getItemsByType('film').slice(0, 4);
  const books = getItemsByType('book').slice(0, 5);
  const music = getItemsByType('music').concat(getItemsByType('youtube')).slice(0, 3);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── HERO HEADER ── */}
        <LinearGradient
          colors={['#ff9ecb', '#c9b8f5', '#a8d8ea']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.heroTop}>
              <View />
              <TouchableOpacity
                onPress={() => router.push('/profile')}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>A</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroGreeting}>
              <Text style={styles.heroSub}>sunday morning {Icons.dreamy}</Text>
              <Text style={styles.heroTitle}>your lore,{'\n'}your world.</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* ── FLOATING STATS ── */}
        <View style={styles.statsWrap}>
          <GlassCard style={styles.statsCard}>
            <StatItem num={stats.watched} label="watched" />
            <View style={styles.statDivider} />
            <StatItem num={stats.books} label="books" />
            <View style={styles.statDivider} />
            <StatItem num={stats.saved} label="saved" />
            <View style={styles.statDivider} />
            <StatItem num={stats.channels} label="channels" />
          </GlassCard>
        </View>

        {/* ── FILTERS ── */}
        <FilterChips
          options={MediaTypes}
          active={activeFilter}
          onChange={setFilter}
        />

        {/* ── FILMS MASONRY ── */}
        <SectionHeader
          title={`${Icons.film} films & shows`}
          onSeeAll={() => router.push('/library?type=film')}
        />
        <View style={styles.masonryWrap}>
          {/* Left column — tall card */}
          <View style={styles.masonryLeft}>
            {films[0] && (
              <FilmCard
                item={films[0]}
                height={220}
                onPress={() => router.push(`/item/${films[0].id}`)}
              />
            )}
          </View>
          {/* Right column — two stacked */}
          <View style={styles.masonryRight}>
            {films[1] && (
              <FilmCard
                item={films[1]}
                height={106}
                onPress={() => router.push(`/item/${films[1].id}`)}
              />
            )}
            {films[2] && (
              <FilmCard
                item={films[2]}
                height={106}
                onPress={() => router.push(`/item/${films[2].id}`)}
              />
            )}
          </View>
        </View>
        {/* Full-width banner */}
        {films[3] && (
          <View style={styles.filmBanner}>
            <FilmCard
              item={films[3]}
              height={90}
              onPress={() => router.push(`/item/${films[3].id}`)}
            />
          </View>
        )}

        {/* ── BOOKS SHELF ── */}
        <SectionHeader
          title={`${Icons.book} books`}
          onSeeAll={() => router.push('/library?type=book')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bookScroll}
        >
          {books.map((b) => (
            <BookCard
              key={b.id}
              item={b}
              onPress={() => router.push(`/item/${b.id}`)}
            />
          ))}
        </ScrollView>

        {/* ── MUSIC / CHANNELS ── */}
        <SectionHeader
          title={`${Icons.music} music & channels`}
          onSeeAll={() => router.push('/library?type=music')}
        />
        <View style={styles.musicSection}>
          {music.map((m) => (
            <MusicItem
              key={m.id}
              item={m}
              onPress={() => router.push(`/item/${m.id}`)}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const StatItem = ({ num, label }: { num: number; label: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statNum}>{num}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  hero: { paddingBottom: 40 },
  heroTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm,
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { ...Fonts.bodySemiBold, fontSize: 12, color: '#fff' },
  heroGreeting: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.xl },
  heroSub: { ...Fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  heroTitle: { ...Fonts.display, fontSize: 30, color: '#fff', lineHeight: 34 },

  statsWrap: { paddingHorizontal: Spacing.lg, marginTop: -24, marginBottom: Spacing.lg, zIndex: 10 },
  statsCard: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { ...Fonts.display, fontSize: 20, color: '#fff' },
  statLabel: { ...Fonts.body, fontSize: 9, color: Colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.08)' },

  masonryWrap: {
    flexDirection: 'row', gap: 6,
    paddingHorizontal: Spacing.lg, marginBottom: 6,
  },
  masonryLeft: { flex: 1 },
  masonryRight: { flex: 1, gap: 6 },
  filmBanner: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },

  bookScroll: {
    paddingLeft: Spacing.lg, paddingRight: Spacing.sm,
    paddingBottom: Spacing.lg, gap: 10,
  },

  musicSection: { paddingHorizontal: Spacing.lg, gap: 6, marginBottom: Spacing.lg },
});
