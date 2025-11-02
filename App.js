import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import { EventRegistrationProvider } from './contexts/EventRegistrationContext';

// Optional: add custom theme settings here if you wish
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5fa',
    card: '#fff',
    text: '#211a2a'
  }
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#181825',
    card: '#23223a',
    text: '#f6f6f6'
  }
};

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <EventRegistrationProvider>
        <MainNavigator />
      </EventRegistrationProvider>
    </NavigationContainer>
  );
}
