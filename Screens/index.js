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

let licenseKey =
    "HMIO6RYOYEkWptsWx0oPa/ehifgF26" +
    "5+0j1VzxNnps1AGqZWeKBf4993j+PN" +
    "i7YIg55l3BpzHN6SGbO7fVuSfezQFr" +
    "waz6sfXF1ene40rX8CJniyn3ce/LZ5" +
    "HzKTnUcENVrVGh4MRuutpuSekt6vLD" +
    "ZcBNl2qe7FOKwF4HZCaR0JgFVewXjm" +
    "L7rd8gH2SPJyDweBcRxrlo9/oLaIOn" +
    "pBfAWrOLHxbBl64QGrG8UEcI33asKz" +
    "hUQ0ATI7b6eR3FpANlCZrCEsngc/ok" +
    "/iXP/r7tl/O0944HJJkbDM3zaIeCm5" +
    "tU8yPFApYuc49Ze9Juj66Nsd8/KFnb" +
    "tNq+vuFiJXqg==\nU2NhbmJvdFNESw" +
    "ppby5zY2FuYm90LmRlbW8ucmVhY3Ru" +
    "YXRpdmUKMTUzMTY5OTE5OQozMjc2Nw" +
    "oz\n";

export const DemoConstants = {
  scanbotLicenseKey: licenseKey
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
