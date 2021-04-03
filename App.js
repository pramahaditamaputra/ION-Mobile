import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Router from './routes/Router';
import {NavigationContainer} from '@react-navigation/native';
import {default as theme} from './custom-theme.json';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
LogBox.ignoreAllLogs();

const App = () => (
  <NavigationContainer>
    <Router />
    <FlashMessage position="top" />
  </NavigationContainer>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <App />
    </ApplicationProvider>
  </>
);
