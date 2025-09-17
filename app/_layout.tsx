import { Stack } from 'expo-router';
import React from 'react';
import * as Font from 'expo-font';

export default function TabLayout() {

  const [fontsLoaded] = Font.useFonts({
    MuseoModernoRegular: require('../assets/fonts/MuseoModerno-Regular.ttf'),
    MuseoModernoSemiBold : require('../assets/fonts/MuseoModerno-SemiBold.ttf'),
    MuseoModernoLight : require('../assets/fonts/MuseoModerno-Light.ttf'),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false}} />
    </Stack>
  );
}
