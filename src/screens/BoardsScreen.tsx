import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoreStore, Board } from '../store';
import { Colors, Fonts, Spacing, Radius } from '../constants';

const BOARD_GRADIENTS = [
  ['#ff9ecb', '#c9b8f5'] as const,
  ['#ffd6a5', '#ffb3c6'] as const,
  ['#1f0a2e', '#c9b8f5'] as const,
  ['#a8d8ea', '#c5f0c0'] as const,
  ['#f5c6ec', '#ffd6a5'] as const,
  ['#c9b8f5', '#a8d8ea'] as const,
];

export default function BoardsScreen() {
  const { boards, addBoard } = useLoreStore();
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [gradIdx, setGradIdx] = useState(0);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const board: Board = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      itemCount: 0,
      gradient: BOARD_GRADIENTS[gradIdx],
    };
    addBoard(board);
    setCreating(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <Text style={styles.heading}>⬡ lore boards</Text>
            <TouchableOpacity
              onPress={() => setCreating(!creating)}
              style={styles.newBtn}
            >
              <Text style={styles.newBtnText}>{creating ? '✕' : '+ new'}</Text>
            </TouchableOpacity>
          </View>

          {/* Create form */}
          {creating && (
            <View style={styles.createForm}>
              <LinearGradient
                colors={BOARD_GRADIENTS[gradIdx] as [string, string]}
                style={styles.createPreview}
              >
                <Text style={styles.createPreviewTitle}>{newTitle || 'board title...'}</Text>
              </LinearGradient>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.gradRow}>
                {BOARD_GRADIENTS.map((g, i) => (
                  <TouchableOpacity key={i} onPress={() => setGradIdx(i)}>
                    <LinearGradient
                      colors={g as [string, string]}
                      style={[styles.gradDot, gradIdx === i && styles.gradDotActive]}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput
                style={styles.createInput}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="board title..."
                placeholderTextColor={Colors.textMuted}
              />
              <TextInput
                style={styles.createInput}
                value={newDesc}
                onChangeText={setNewDesc}
                placeholder="description..."
                placeholderTextColor={Colors.textMuted}
              />
              <TouchableOpacity onPress={handleCreate} style={styles.createBtn}>
                <Text style={styles.createBtnText}>create board ✦</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Boards grid */}
          <View style={styles.boardsGrid}>
            {boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const BoardCard = ({ board }: { board: Board }) => (
  <TouchableOpacity style={styles.boardCardWrap} activeOpacity={0.85}>
    <LinearGradient
      colors={board.gradient as [string, string, ...string[]]}
      style={styles.boardCard}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Mini grid preview */}
      <View style={styles.boardMiniGrid}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.boardMiniCell,
            { backgroundColor: `rgba(255,255,255,${0.1 + i * 0.05})` }]} />
        ))}
      </View>
      <View style={styles.boardMeta}>
        <Text style={styles.boardTitle}>{board.title}</Text>
        <Text style={styles.boardDesc} numberOfLines={1}>{board.description}</Text>
        <Text style={styles.boardCount}>{board.itemCount} items</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: Spacing.lg, paddingBottom: Spacing.md,
  },
  heading: { ...Fonts.display, fontSize: 22, color: Colors.textPrimary },
  newBtn: {
    backgroundColor: Colors.lavender, paddingHorizontal: 14,
    paddingVertical: 7, borderRadius: Radius.full,
  },
  newBtnText: { ...Fonts.bodySemiBold, fontSize: 12, color: Colors.bg },

  createForm: { marginHorizontal: Spacing.lg, marginBottom: Spacing.lg, gap: 10 },
  createPreview: {
    height: 100, borderRadius: Radius.xl, padding: Spacing.lg,
    justifyContent: 'flex-end', overflow: 'hidden',
  },
  createPreviewTitle: { ...Fonts.display, fontSize: 18, color: '#fff' },
  gradRow: { gap: 8, paddingVertical: 4 },
  gradDot: { width: 28, height: 28, borderRadius: 14 },
  gradDotActive: { borderWidth: 2, borderColor: '#fff' },
  createInput: {
    ...Fonts.body, fontSize: 14, color: Colors.textPrimary,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 11,
  },
  createBtn: {
    backgroundColor: Colors.lavender, padding: 13,
    borderRadius: Radius.full, alignItems: 'center',
  },
  createBtnText: { ...Fonts.bodySemiBold, fontSize: 13, color: Colors.bg },

  boardsGrid: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  boardCardWrap: { width: '47%' },
  boardCard: { borderRadius: Radius.xl, overflow: 'hidden', padding: Spacing.md, minHeight: 180 },
  boardMiniGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: Spacing.md,
  },
  boardMiniCell: { width: '47%', height: 40, borderRadius: 8 },
  boardMeta: { gap: 3 },
  boardTitle: { ...Fonts.heading, fontSize: 13, color: '#fff' },
  boardDesc: { ...Fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  boardCount: { ...Fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 },
});
