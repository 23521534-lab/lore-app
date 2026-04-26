import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useLoreStore } from '../store';
import { Colors, Fonts, Spacing, Radius, StatusOptions } from '../constants';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, updateItem, deleteItem } = useLoreStore();
  const item = items.find((i) => i.id === id);

  const [editNote, setEditNote] = useState(false);
  const [note, setNote] = useState(item?.note || '');

  if (!item) return null;

  const statusOpts =
    StatusOptions[item.type as keyof typeof StatusOptions] || StatusOptions.default;

  const toggleTag = (tag: string) => {
    const current = item.tags;
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    updateItem(item.id, { tags: next });
  };

  const handleDelete = () => {
    Alert.alert('Remove from Lore?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { deleteItem(item.id); router.back(); } },
    ]);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── HERO ── */}
        <LinearGradient
          colors={item.gradient as [string, string, ...string[]]}
          style={styles.hero}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(14,12,26,0.95)']}
            style={StyleSheet.absoluteFillObject}
          />
          <SafeAreaView edges={['top']}>
            <View style={styles.heroNav}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Text style={styles.backIcon}>‹</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
                <Text style={styles.deleteIcon}>✕</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View style={styles.heroContent}>
            <Text style={styles.typeLabel}>
              {item.type === 'film' ? '⟡ film' :
               item.type === 'book' ? '꩜ book' :
               item.type === 'music' ? '∿ music' :
               item.type === 'youtube' ? '▷ youtube' :
               item.type === 'podcast' ? '◎ podcast' :
               item.type === 'game' ? '⬡ game' : '⌗ course'}
            </Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.creator}>{item.creator}{item.year ? ` · ${item.year}` : ''}</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>

          {/* STATUS */}
          <Text style={styles.sectionLabel}>status</Text>
          <View style={styles.statusRow}>
            {statusOpts.map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => updateItem(item.id, { status: s.id })}
                style={[styles.statusChip,
                  { backgroundColor: item.status === s.id ? s.color : Colors.bgCard,
                    borderColor: item.status === s.id ? s.color : Colors.bgCardBorder }]}
              >
                <Text style={[styles.statusText, { color: item.status === s.id ? '#fff' : Colors.textMuted }]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TAGS */}
          <Text style={styles.sectionLabel}>how did it make you feel?</Text>
          <View style={styles.tagRow}>
            {[
              { key: '♡', label: '♡ recommend' },
              { key: '⋆｡°✩', label: '⋆｡°✩ memorable' },
              { key: '↻', label: '↻ revisit' },
            ].map((t) => (
              <TouchableOpacity
                key={t.key}
                onPress={() => toggleTag(t.key)}
                style={[styles.tagChip,
                  item.tags.includes(t.key) && styles.tagChipActive]}
              >
                <Text style={[styles.tagText,
                  item.tags.includes(t.key) && styles.tagTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* NOTE */}
          <View style={styles.noteHeader}>
            <Text style={styles.sectionLabel}>thoughts</Text>
            <TouchableOpacity onPress={() => {
              if (editNote) { updateItem(item.id, { note }); }
              setEditNote(!editNote);
            }}>
              <Text style={styles.editBtn}>{editNote ? 'save ✦' : 'edit ·'}</Text>
            </TouchableOpacity>
          </View>

          {editNote ? (
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              multiline
              autoFocus
              placeholder="any thoughts, feelings, memories..."
              placeholderTextColor={Colors.textMuted}
              textAlignVertical="top"
            />
          ) : (
            <TouchableOpacity
              style={styles.noteBox}
              onPress={() => setEditNote(true)}
              activeOpacity={0.7}
            >
              <Text style={item.note ? styles.noteText : styles.notePlaceholder}>
                {item.note || 'tap to add thoughts...'}
              </Text>
            </TouchableOpacity>
          )}

          {/* DATE */}
          {item.dateAdded && (
            <Text style={styles.dateAdded}>
              ˖° added {new Date(item.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Text>
          )}

        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  hero: { height: 320, justifyContent: 'flex-end' },
  heroNav: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.sm,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 22, color: '#fff', marginTop: -2 },
  deleteBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  deleteIcon: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
  heroContent: { padding: Spacing.lg, paddingTop: 0 },
  typeLabel: { ...Fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 6 },
  title: { ...Fonts.display, fontSize: 28, color: '#fff', lineHeight: 32, marginBottom: 6 },
  creator: { ...Fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.5)' },

  body: { padding: Spacing.lg },
  sectionLabel: {
    ...Fonts.bodySemiBold, fontSize: 10, color: Colors.textMuted,
    letterSpacing: 0.1, textTransform: 'uppercase', marginBottom: Spacing.sm, marginTop: Spacing.lg,
  },

  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1 },
  statusText: { ...Fonts.bodySemiBold, fontSize: 12 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full,
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.bgCardBorder,
  },
  tagChipActive: { backgroundColor: 'rgba(201,184,245,0.15)', borderColor: Colors.lavender },
  tagText: { ...Fonts.body, fontSize: 12, color: Colors.textMuted },
  tagTextActive: { color: Colors.lavender },

  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.lg },
  editBtn: { ...Fonts.body, fontSize: 11, color: Colors.lavender },
  noteBox: {
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.lg,
    padding: Spacing.md, minHeight: 80,
  },
  noteText: { ...Fonts.body, fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  notePlaceholder: { ...Fonts.body, fontSize: 14, color: Colors.textMuted, fontStyle: 'italic' },
  noteInput: {
    ...Fonts.body, fontSize: 14, color: Colors.textPrimary,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.lavender, borderRadius: Radius.lg,
    padding: Spacing.md, minHeight: 100,
  },
  dateAdded: { ...Fonts.body, fontSize: 11, color: Colors.textMuted, marginTop: Spacing.xl, textAlign: 'center' },
});
