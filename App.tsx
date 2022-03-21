import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/hooks/auth';

import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

import theme from '@styles/theme';
import { Product } from '@src/screens/Product';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"
]);

export default function App() {
    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSerifDisplay_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                style="light"
                backgroundColor="transparent"
                translucent
            />
            <AuthProvider>
                <Product />
            </AuthProvider>
        </ThemeProvider>
    );
}
