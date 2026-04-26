import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  FlatList, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLoreStore } from '../store';
import { Colors, Fonts, Spacing, Radius, MediaTypes } from '../constants';
import { FilterChips, ItemRow, SectionHeader } from '../components';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { items } = useLoreStore();

  const filtered = items.filter((item) => {
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchQuery =
      query === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.creator.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <Text style={styles.heading}>⊹ search</Text>

        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="films, books, music..."
            placeholderTextColor={Colors.textMuted}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <FilterChips
          options={MediaTypes}
          active={typeFilter}
          onChange={setTypeFilter}
        />

        <SectionHeader
          title={`${filtered.length} items`}
        />

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.itemWrap}>
              <ItemRow item={item} onPress={() => router.push(`/item/${item.id}`)} />
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  safe: { flex: 1 },
  heading: { ...Fonts.display, fontSize: 22, color: Colors.textPrimary, padding: Spacing.lg, paddingBottom: Spacing.md },
  inputWrap: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
    backgroundColor: Colors.bgCard, borderWidth: 1,
    borderColor: Colors.bgCardBorder, borderRadius: Radius.lg,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md,
  },
  input: {
    ...Fonts.body, fontSize: 14, color: Colors.textPrimary,
    flex: 1, paddingVertical: 12,
  },
  clearBtn: { padding: 6 },
  clearText: { color: Colors.textMuted, fontSize: 14 },
  list: { paddingBottom: 100 },
  itemWrap: { paddingHorizontal: Spacing.lg },
});
