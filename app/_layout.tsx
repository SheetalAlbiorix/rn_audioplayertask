import { DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="(audioplayer)" options={{ headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: DefaultTheme.colors.background, flex: 1 }
});
