import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useLoreStore } from '../store';
import { Colors, Fonts, Spacing, MediaTypes } from '../constants';
import { FilterChips, ItemRow, SectionHeader } from '../components';

export default function LibraryScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [filter, setFilter] = useState(type || 'all');
  const { getItemsByType } = useLoreStore();
  const items = getItemsByType(filter);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.heading}>꩜ library</Text>
        </View>
        <FilterChips options={MediaTypes} active={filter} onChange={setFilter} />
        <SectionHeader title={`${items.length} items`} />
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.rowWrap}>
              <ItemRow item={item} onPress={() => router.push(`/item/${item.id}`)} />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  heading: { ...Fonts.display, fontSize: 22, color: Colors.textPrimary },
  rowWrap: { paddingHorizontal: Spacing.lg },
});
