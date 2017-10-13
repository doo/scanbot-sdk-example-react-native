import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import MainScreen from './MainScreen.js';
import ScanbotCameraDemoScreen from './ScanbotCameraDemoScreen';
import ScanbotCroppingDemoScreen from './ScanbotCroppingDemoScreen';
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

  ScanbotCameraDemoScreen: {
    id: 'myDemo.ScanbotCameraDemoScreen',
    title: 'ScanbotCameraView Demo'
  },

  ScanbotCroppingDemoScreen: {
    id: 'myDemo.ScanbotCroppingDemoScreen',
    title: 'ScanbotCroppingView Demo'
  },
};

export const DemoConstants = {
  JPG_QUALITY : 70,

  scanbotLicenseKey: '' // Add your Scanbot SDK license key string here
};

export function registerScreens() {
  Navigation.registerComponent(DemoScreens.MainScreen.id, () => MainScreen);
  Navigation.registerComponent(DemoScreens.CameraKitGalleryDemoScreen.id, () => CameraKitGalleryDemoScreen);

  Navigation.registerComponent(DemoScreens.ScanbotCameraDemoScreen.id, () => ScanbotCameraDemoScreen);
  Navigation.registerComponent(DemoScreens.ScanbotCroppingDemoScreen.id, () => ScanbotCroppingDemoScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
