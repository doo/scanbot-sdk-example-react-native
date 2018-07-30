import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import MainScreen from './MainScreen.js';
import CameraKitGalleryDemoScreen from './CameraKitGalleryDemoScreen';
import ImageFilterDemoScreen from './ImageFilterDemoScreen';
import IdCardDemoScreen  from './IdCardDemoScreen';

export const DemoScreens = {
  MainScreen: {
    id: 'myDemo.MainScreen',
    title: 'Scanbot SDK RN Example'
  },

  CameraKitGalleryDemoScreen: {
    id: 'myDemo.CameraKitGalleryDemoScreen',
    title: 'Select an image'
  },

  ImageFilterDemoScreen: {
    id: 'myDemo.ImageFilterDemoScreen',
    title: ''
  },

  IdCardDemoScreen: {
    id: 'myDemo.IdCardDemoScreen',
    title: ''
  }
};

export const DemoConstants = {
  imageFormat: 'JPG',   // 'JPG' or 'PNG'
  imageQuality: 80,     // the quality factor of JPEG images, 1-100
  loggingEnabled: true, // ! consider switching logging OFF in production builds for security and performance reasons !
  scanbotLicenseKey: '' // TODO Add the Scanbot SDK license key string here
};

export function registerScreens() {
  Navigation.registerComponent(DemoScreens.MainScreen.id, () => MainScreen);
  Navigation.registerComponent(DemoScreens.CameraKitGalleryDemoScreen.id, () => CameraKitGalleryDemoScreen);
  Navigation.registerComponent(DemoScreens.ImageFilterDemoScreen.id, () => ImageFilterDemoScreen);
  Navigation.registerComponent(DemoScreens.IdCardDemoScreen.id, () => IdCardDemoScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
