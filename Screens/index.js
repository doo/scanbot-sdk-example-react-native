import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import MainScreen from './MainScreen.js';
import CameraKitGalleryDemoScreen from './CameraKitGalleryDemoScreen';

export const DemoScreens = {
  MainScreen: {
    id: 'myDemo.MainScreen',
    title: 'Scanbot SDK RN Example'
  },

  CameraKitGalleryDemoScreen: {
    id: 'myDemo.CameraKitGalleryDemoScreen',
    title: 'Select an image'
  },
};

export const DemoConstants = {
  scanbotLicenseKey: '' // Add the Scanbot SDK license key string here
};

export function registerScreens() {
  Navigation.registerComponent(DemoScreens.MainScreen.id, () => MainScreen);
  Navigation.registerComponent(DemoScreens.CameraKitGalleryDemoScreen.id, () => CameraKitGalleryDemoScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
