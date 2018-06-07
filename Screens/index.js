import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import MainScreen from './MainScreen.js';
import CameraKitGalleryDemoScreen from './CameraKitGalleryDemoScreen';
import ReviewScreen from './ReviewScreen';

export const DemoScreens = {
  MainScreen: {
    id: 'myDemo.MainScreen',
    title: 'Scanbot SDK RN Example'
  },

  CameraKitGalleryDemoScreen: {
    id: 'myDemo.CameraKitGalleryDemoScreen',
    title: 'Select an image'
  },

  ReviewScreen: {
    id: 'myDemo.ReviewScreen',
    title: 'Stored Pages',
  }
};
let licenseKey =
  "M+NzOkvq5IioisKLbzwGTFozoltOAM" +
  "6bMRIxxfikeErKtt8XFPN70rFkCctd" +
  "U5GTUeJvJKmqj6BRHYSaMJyDNWQ7Kq" +
  "t5XUQGuhPbP2JqWvPBQ1wMg4hv4dte" +
  "czpKJuMxNmwkwMK1c4aozdzZdLsB4L" +
  "A7wQeWiBCU7Vdbz7PhJPR3nYpXoT/6" +
  "mBSo/hyEdB4Y+tZqfJd82JMCo7Lp5q" +
  "e6uq8ZSti3rjU48zrbe8zX+2g2UXSi" +
  "JzRiCPOxxJMLjmqmI/R6sxvmbM0eLK" +
  "SVxFGTlHMCAHRaS4H7YzorgqT7aUtj" +
  "8WwgoS9b+NjgpGeyUw6r4L9FmO4I14" +
  "S0a/NfyeZOow==\nU2NhbmJvdFNESw" +
  "ppby5zY2FuYm90LmRlbW8ucmVhY3Ru" +
  "YXRpdmUKMTUzMDc0ODc5OQozMjc2Nw" +
  "oz\n";

export const DemoConstants = {
  scanbotLicenseKey: licenseKey
};

export function registerScreens() {
  Navigation.registerComponent(DemoScreens.MainScreen.id, () => MainScreen);
  Navigation.registerComponent(DemoScreens.CameraKitGalleryDemoScreen.id, () => CameraKitGalleryDemoScreen);
  Navigation.registerComponent(DemoScreens.ReviewScreen.id, () => ReviewScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
