import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLoreStore, MediaItem } from '../store';
import { Colors, Fonts, Spacing, Radius, StatusOptions } from '../constants';

const TYPE_OPTIONS = [
  { id: 'film', label: '⟡ film', gradient: ['#2d1040', '#8b4f9e'] as const },
  { id: 'book', label: '꩜ book', gradient: ['#ffd6a5', '#ffb3c6'] as const },
  { id: 'music', label: '∿ music', gradient: ['#c9b8f5', '#f7a8c4'] as const },
  { id: 'youtube', label: '▷ youtube', gradient: ['#a8d8ea', '#c5f0c0'] as const },
  { id: 'podcast', label: '◎ podcast', gradient: ['#ffd6a5', '#c9b8f5'] as const },
  { id: 'game', label: '⬡ game', gradient: ['#c5f0c0', '#ffd6a5'] as const },
  { id: 'course', label: '⌗ course', gradient: ['#f5c6ec', '#c9b8f5'] as const },
];

const GRADIENTS = [
  ['#2d1040', '#8b4f9e', '#f7a8c4'] as const,
  ['#0d2137', '#1a5276', '#a8d8ea'] as const,
  ['#1a1a1a', '#4a3000', '#c8a951'] as const,
  ['#1f0a2e', '#6b2d8b', '#ff6b9d'] as const,
  ['#ffd6a5', '#ffb3c6'] as const,
  ['#a8d8ea', '#c9b8f5'] as const,
  ['#c5f0c0', '#a8d8ea'] as const,
  ['#f5c6ec', '#c9b8f5'] as const,
];

export default function AddScreen() {
  const { addItem } = useLoreStore();
  const [type, setType] = useState<string>('film');
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [gradientIdx, setGradientIdx] = useState(0);

  const statusOpts =
    StatusOptions[type as keyof typeof StatusOptions] || StatusOptions.default;

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Add a title', 'Title is required to save.');
      return;
    }
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: type as MediaItem['type'],
      title: title.trim(),
      creator: creator.trim(),
      year: year.trim(),
      gradient: GRADIENTS[gradientIdx],
      status: status || statusOpts[0].id,
      tags,
      note: note.trim(),
    };
    addItem(newItem);
    router.back();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancel}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>+ add to lore</Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>save</Text>
            </TouchableOpacity>
          </View>

          {/* Preview card */}
          <LinearGradient
            colors={GRADIENTS[gradientIdx] as [string, string, ...string[]]}
            style={styles.preview}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.previewType}>
              {TYPE_OPTIONS.find((t) => t.id === type)?.label}
            </Text>
            <Text style={styles.previewTitle}>{title || 'title...'}</Text>
            <Text style={styles.previewCreator}>{creator || 'creator'}</Text>
          </LinearGradient>

          {/* Gradient picker */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gradientPicker}
            contentContainerStyle={{ gap: 8, paddingHorizontal: Spacing.lg }}>
            {GRADIENTS.map((g, i) => (
              <TouchableOpacity key={i} onPress={() => setGradientIdx(i)}>
                <LinearGradient
                  colors={g as [string, string, ...string[]]}
                  style={[styles.gradientDot, gradientIdx === i && styles.gradientDotActive]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Type selector */}
          <Text style={styles.label}>type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}>
            {TYPE_OPTIONS.map((t) => (
              <TouchableOpacity
                key={t.id} onPress={() => { setType(t.id); setStatus(''); }}
                style={[styles.typeChip, type === t.id && styles.typeChipActive]}
              >
                <Text style={[styles.typeChipText, type === t.id && styles.typeChipTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Fields */}
          <View style={styles.fields}>
            <Field label="title *" value={title} onChange={setTitle} placeholder="e.g. Normal People" />
            <Field label="creator" value={creator} onChange={setCreator}
              placeholder={type === 'film' ? 'director' : type === 'book' ? 'author' : 'artist'} />
            <Field label="year" value={year} onChange={setYear} placeholder="2024" keyboardType="numeric" />
          </View>

          {/* Status */}
          <Text style={styles.label}>status</Text>
          <View style={styles.statusRow}>
            {statusOpts.map((s) => (
              <TouchableOpacity
                key={s.id} onPress={() => setStatus(s.id)}
                style={[styles.statusChip,
                  { backgroundColor: status === s.id ? s.color : 'rgba(255,255,255,0.06)' }]}
              >
                <Text style={[styles.statusText, { color: status === s.id ? '#fff' : Colors.textMuted }]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tags */}
          <Text style={styles.label}>how did it make you feel?</Text>
          <View style={styles.tagRow}>
            {['♡ recommend', '⋆｡°✩ memorable', '↻ revisit'].map((t) => {
              const key = t.split(' ')[0];
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => toggleTag(key)}
                  style={[styles.tagChip, tags.includes(key) && styles.tagChipActive]}
                >
                  <Text style={[styles.tagText, tags.includes(key) && styles.tagTextActive]}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Note */}
          <Text style={styles.label}>thoughts</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="any thoughts, feelings, memories..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Field = ({ label, value, onChange, placeholder, keyboardType }: any) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={styles.fieldInput}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={Colors.textMuted}
      keyboardType={keyboardType || 'default'}
    />
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: Spacing.lg,
  },
  cancel: { fontSize: 18, color: Colors.textMuted },
  heading: { ...Fonts.display, fontSize: 16, color: Colors.textPrimary },
  saveBtn: {
    backgroundColor: Colors.lavender, paddingHorizontal: 16,
    paddingVertical: 7, borderRadius: Radius.full,
  },
  saveBtnText: { ...Fonts.bodySemiBold, fontSize: 12, color: Colors.bg },

  preview: {
    marginHorizontal: Spacing.lg, height: 160, borderRadius: Radius.xl,
    padding: Spacing.lg, justifyContent: 'flex-end', overflow: 'hidden',
  },
  previewType: { ...Fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  previewTitle: { ...Fonts.display, fontSize: 22, color: '#fff', lineHeight: 26 },
  previewCreator: { ...Fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.5)' },

  gradientPicker: { marginTop: Spacing.md, marginBottom: Spacing.sm },
  gradientDot: { width: 32, height: 32, borderRadius: 16 },
  gradientDotActive: { borderWidth: 2, borderColor: '#fff' },

  label: { ...Fonts.bodySemiBold, fontSize: 10, color: Colors.textMuted, letterSpacing: 0.1, textTransform: 'uppercase', paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  typeRow: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm, gap: 6 },
  typeChip: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: Radius.full, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  typeChipActive: { backgroundColor: Colors.lavender, borderColor: Colors.lavender },
  typeChipText: { ...Fonts.bodySemiBold, fontSize: 11, color: Colors.textMuted },
  typeChipTextActive: { color: Colors.bg },

  fields: { paddingHorizontal: Spacing.lg, gap: 8 },
  fieldWrap: { gap: 4 },
  fieldLabel: { ...Fonts.body, fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.08 },
  fieldInput: {
    ...Fonts.body, fontSize: 14, color: Colors.textPrimary,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 11,
  },

  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: Spacing.lg },
  statusChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.full },
  statusText: { ...Fonts.bodySemiBold, fontSize: 11 },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: Spacing.lg },
  tagChip: {
    paddingHorizontal: 13, paddingVertical: 7, borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  tagChipActive: { backgroundColor: 'rgba(201,184,245,0.2)', borderColor: Colors.lavender },
  tagText: { ...Fonts.body, fontSize: 12, color: Colors.textMuted },
  tagTextActive: { color: Colors.lavender },

  noteInput: {
    ...Fonts.body, fontSize: 14, color: Colors.textPrimary,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg, padding: Spacing.md, minHeight: 100,
  },
});
