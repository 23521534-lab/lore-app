import { Tabs, router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts, Icons } from '../../src/constants';

function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const tabs = [
    { name: 'index', icon: '✦', label: 'home' },
    { name: 'search', icon: '⊹', label: 'search' },
    { name: 'add', icon: '+', label: '', isFab: true },
    { name: 'boards', icon: '⬡', label: 'boards' },
    { name: 'profile', icon: 'ᯓ★', label: 'me' },
  ];

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 4 }]}>
      {tabs.map((tab, index) => {
        if (tab.isFab) {
          return (
            <TouchableOpacity
              key="fab"
              onPress={() => router.push('/add')}
              style={styles.fab}
              activeOpacity={0.85}
            >
              <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
          );
        }
        const routeIndex = state.routes.findIndex((r: any) =>
          r.name === tab.name || (tab.name === 'index' && r.name === 'index')
        );
        const focused = state.index === routeIndex;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="boards" />
      <Tabs.Screen name="profile-tab" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14,12,26,0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon: { fontSize: 16, color: 'rgba(255,255,255,0.25)' },
  tabIconActive: { color: Colors.lavender },
  tabLabel: { ...Fonts.body, fontSize: 9, color: 'rgba(255,255,255,0.25)' },
  tabLabelActive: { color: 'rgba(201,184,245,0.8)' },
  fab: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.lavender,
    alignItems: 'center', justifyContent: 'center',
    marginTop: -14,
    shadowColor: Colors.lavender,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: { fontSize: 24, color: Colors.bg, lineHeight: 28 },
});
