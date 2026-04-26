import { Stack } from 'expo-router';
import { useFonts, Syne_700Bold, Syne_800ExtraBold } from '@expo-google-fonts/syne';
import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk';
import { View } from 'react-native';
import { Colors } from '../src/constants';

export default function RootLayout() {
  const [loaded] = useFonts({
    Syne_700Bold,
    Syne_800ExtraBold,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
  });

  if (!loaded) return <View style={{ flex: 1, backgroundColor: Colors.bg }} />;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: Colors.bg } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="item/[id]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="add" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="library" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
