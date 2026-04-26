import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLoreStore } from '../store';
import { Colors, Fonts, Spacing, Radius } from '../constants';

export default function ProfileScreen() {
  const { items, getStats } = useLoreStore();
  const stats = getStats();

  const topTags = [
    { tag: '♡', label: 'recommend', count: items.filter((i) => i.tags.includes('♡')).length },
    { tag: '⋆｡°✩', label: 'memorable', count: items.filter((i) => i.tags.includes('⋆｡°✩')).length },
    { tag: '↻', label: 'revisit', count: items.filter((i) => i.tags.includes('↻')).length },
  ];

  const typeBreakdown = [
    { type: 'film', label: '⟡ films', count: items.filter((i) => i.type === 'film').length, gradient: ['#2d1040', '#8b4f9e'] as const },
    { type: 'book', label: '꩜ books', count: items.filter((i) => i.type === 'book').length, gradient: ['#ffd6a5', '#ffb3c6'] as const },
    { type: 'music', label: '∿ music', count: items.filter((i) => i.type === 'music').length, gradient: ['#c9b8f5', '#f7a8c4'] as const },
    { type: 'youtube', label: '▷ youtube', count: items.filter((i) => i.type === 'youtube').length, gradient: ['#a8d8ea', '#c5f0c0'] as const },
    { type: 'podcast', label: '◎ podcast', count: items.filter((i) => i.type === 'podcast').length, gradient: ['#ffd6a5', '#c9b8f5'] as const },
    { type: 'game', label: '⬡ games', count: items.filter((i) => i.type === 'game').length, gradient: ['#c5f0c0', '#ffd6a5'] as const },
  ].filter((t) => t.count > 0);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── HERO ── */}
        <LinearGradient
          colors={['#1f0a2e', '#2d1040', '#4a1f6e']}
          style={styles.hero}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.heroTop}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.avatarWrap}>
            <LinearGradient
              colors={['#c9b8f5', '#f7a8c4']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>A</Text>
            </LinearGradient>
          </View>
          <Text style={styles.username}>@yourusername</Text>
          <Text style={styles.tagline}>someone who reads at midnight and cries at films ˖°</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <StatBadge num={items.length} label="in lore" />
            <View style={styles.statDivider} />
            <StatBadge num={12} label="followers" />
            <View style={styles.statDivider} />
            <StatBadge num={8} label="following" />
          </View>
        </LinearGradient>

        <View style={styles.body}>

          {/* Feeling tags */}
          <Text style={styles.sectionLabel}>your feelings</Text>
          <View style={styles.tagRow}>
            {topTags.map((t) => (
              <View key={t.tag} style={styles.tagCard}>
                <Text style={styles.tagIcon}>{t.tag}</Text>
                <Text style={styles.tagCount}>{t.count}</Text>
                <Text style={styles.tagLabel}>{t.label}</Text>
              </View>
            ))}
          </View>

          {/* Type breakdown */}
          <Text style={styles.sectionLabel}>your lore breakdown</Text>
          <View style={styles.breakdownGrid}>
            {typeBreakdown.map((t) => (
              <TouchableOpacity
                key={t.type}
                onPress={() => router.push(`/library?type=${t.type}`)}
                style={styles.breakdownCardWrap}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={t.gradient as [string, string]}
                  style={styles.breakdownCard}
                >
                  <Text style={styles.breakdownType}>{t.label}</Text>
                  <Text style={styles.breakdownCount}>{t.count}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent with notes */}
          <Text style={styles.sectionLabel}>recent thoughts</Text>
          {items.filter((i) => i.note).slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.thoughtCard}
              onPress={() => router.push(`/item/${item.id}`)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.gradient as [string, string, ...string[]]}
                style={styles.thoughtThumb}
              >
                <Text style={styles.thoughtThumbIcon}>
                  {item.type === 'film' ? '⟡' : item.type === 'book' ? '꩜' : '∿'}
                </Text>
              </LinearGradient>
              <View style={styles.thoughtContent}>
                <Text style={styles.thoughtTitle}>{item.title}</Text>
                <Text style={styles.thoughtNote} numberOfLines={2}>{item.note}</Text>
                {item.tags.length > 0 && (
                  <Text style={styles.thoughtTags}>{item.tags.join('  ')}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const StatBadge = ({ num, label }: { num: number; label: string }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ ...Fonts.display, fontSize: 20, color: '#fff' }}>{num}</Text>
    <Text style={{ ...Fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  hero: { paddingBottom: Spacing.xl },
  heroTop: { padding: Spacing.lg, paddingBottom: 0 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 22, color: '#fff', marginTop: -2 },
  avatarWrap: { alignItems: 'center', marginTop: Spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  avatarText: { ...Fonts.display, fontSize: 28, color: '#fff' },
  username: { ...Fonts.heading, fontSize: 16, color: '#fff', textAlign: 'center', marginTop: Spacing.sm },
  tagline: { ...Fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 4, paddingHorizontal: Spacing.xl },
  statsRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: Spacing.xl, marginTop: Spacing.xl, paddingTop: Spacing.lg,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: Spacing.lg,
  },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.1)' },

  body: { padding: Spacing.lg },
  sectionLabel: {
    ...Fonts.bodySemiBold, fontSize: 10, color: Colors.textMuted,
    letterSpacing: 0.1, textTransform: 'uppercase',
    marginBottom: Spacing.sm, marginTop: Spacing.lg,
  },

  tagRow: { flexDirection: 'row', gap: 10 },
  tagCard: {
    flex: 1, backgroundColor: Colors.bgCard,
    borderWidth: 1, borderColor: Colors.bgCardBorder,
    borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center', gap: 4,
  },
  tagIcon: { fontSize: 20, color: Colors.lavender },
  tagCount: { ...Fonts.display, fontSize: 18, color: Colors.textPrimary },
  tagLabel: { ...Fonts.body, fontSize: 10, color: Colors.textMuted },

  breakdownGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  breakdownCardWrap: { width: '30%' },
  breakdownCard: { borderRadius: Radius.md, padding: Spacing.md, minHeight: 70, justifyContent: 'space-between' },
  breakdownType: { ...Fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  breakdownCount: { ...Fonts.display, fontSize: 22, color: '#fff' },

  thoughtCard: {
    flexDirection: 'row', gap: 12, marginBottom: 10,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.lg, padding: 12,
  },
  thoughtThumb: { width: 44, height: 56, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  thoughtThumbIcon: { fontSize: 20, color: 'rgba(255,255,255,0.5)' },
  thoughtContent: { flex: 1 },
  thoughtTitle: { ...Fonts.heading, fontSize: 13, color: Colors.textPrimary, marginBottom: 4 },
  thoughtNote: { ...Fonts.body, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  thoughtTags: { ...Fonts.body, fontSize: 12, color: Colors.lavender, marginTop: 4 },
});
