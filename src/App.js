import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ScanbotSDK from 'react-native-scanbot-sdk';
import { Provider } from 'react-redux';
import { DocumentDirectoryPath, ExternalDirectoryPath } from 'react-native-fs';


import ScannedPagesStore from './ScannedPagesStore';
import HomeScreen from './screens/HomeScreen';
import ImageResultsScreen from './screens/ImageResultsScreen';
import ImageViewScreen from './screens/ImageViewScreen';
import ImageFilterScreen from './screens/ImageFilterScreen';

/*
 * TODO Add the Scanbot SDK license key here.
 * Please note: The Scanbot SDK will run without a license key for one minute per session!
 * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/sdk/trial.html) on our website by using
 * the app identifier "io.scanbot.example.sdk.reactnative" of this example app.
 */
const SDK_LICENSE_KEY = '';


const MainStack = createStackNavigator({
  Home: HomeScreen,
  ImageResults: ImageResultsScreen,
  ImageView: ImageViewScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#b30127',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  ImageFilter: {
    screen: ImageFilterScreen,
  },
},
{
  mode: 'modal',
  headerMode: 'none',
});


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
        <Provider store={ScannedPagesStore}>
          <AppContainer />
        </Provider>
    );
  }

  componentDidMount() {
    this.initializeSDK();
  }

  async initializeSDK() {
    const options = {
      licenseKey: SDK_LICENSE_KEY,
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
      storageBaseDirectory: this.getCustomStoragePath() // Optional storage path. See comments below!
    };
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log('Scanbot SDK initialization result: ' + JSON.stringify(result));
    } catch (ex) {
      console.error('Scanbot SDK initialization error: ' + JSON.stringify(ex.error));
    }
  }

  getCustomStoragePath(): string {
    // tslint:disable:max-line-length
    // !! Please note !!
    // It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
    // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
    //
    // On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
    // All image files and export files (PDF, TIFF, etc) created by the Scanbot SDK in this demo app will be stored
    // in this public storage directory and will be accessible for every(!) app having external storage permissions!
    // Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
    // via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
    //
    // On iOS we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.
    //
    // For more details about the storage system of the Scanbot SDK RN Module please see our docs:
    // - https://scanbotsdk.github.io/documentation/react-native/
    //
    // For more details about the file system on Android and iOS we also recommend to check out:
    // - https://developer.android.com/guide/topics/data/data-storage
    // - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
    // tslint:enable:max-line-length

    if (Platform.OS === 'ios') {
      return DocumentDirectoryPath + '/my-custom-storage';
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath + '/my-custom-storage';
    }
    return null;
  }

}
