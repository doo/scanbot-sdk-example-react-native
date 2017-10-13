import React from 'react';

import { Navigation } from 'react-native-navigation';

import {
  registerScreens,
  registerScreenVisibilityListener,
  DemoScreens,
} from './Screens';

registerScreens();
registerScreenVisibilityListener();


Navigation.startSingleScreenApp({
  screen: {
    screen: DemoScreens.MainScreen.id,
    title: DemoScreens.MainScreen.title,
    navigatorStyle: {},
    navigatorButtons: {}
  }
});
