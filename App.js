import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SafeArea from './src/components/SafeArea/SafeArea.js';
import Navigation from './src/components/Navigation/Navigation.js';

export default function App() {
  return (
		<SafeArea>
        <Navigation />
        <StatusBar style="auto" />
    </SafeArea>
  );
}