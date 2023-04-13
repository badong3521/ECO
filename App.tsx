import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import codePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Platform, StatusBar, Text, UIManager } from 'react-native';
import { Host } from 'react-native-portalize';
import { persistor, store } from './src/store';
import AppContainer from './src/components/AppContainer';
import { applicationMaxFontSizeMultiplier } from './style.css';

// Use React Extended Stylesheets
EStyleSheet.build({});

// setup for using `LayoutAnimation`: light animation for next render of layout
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Host>
          <SafeAreaProvider>
            <StatusBar />
            <AppContainer />
          </SafeAreaProvider>
        </Host>
      </PersistGate>
    </Provider>
  );
}

// @ts-ignore
Text.defaultProps = {
  maxFontSizeMultiplier: applicationMaxFontSizeMultiplier,
};

// We have to ts-ignore here since CodePush wants a class component in its type definition
// but it actually works fine with a functional component aswell.
// @ts-ignore
export default codePush(App);
