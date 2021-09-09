import React from 'react';
import {Platform} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';

import {HomeScreen} from './pages/HomeScreen';
import {ImageResultScreen} from './pages/ImageResultScreen';
import {BarcodeFormatsScreen} from './pages/BarcodeFormatsScreen';
import {BarcodeDocumentFormatsScreen} from './pages/BarcodeDocumentFormatsScreen';
import {ImageDetailScreen} from './pages/ImageDetailScreen';
import {Navigation} from './utils/Navigation';
import {Styles} from './model/Styles';
import ScanbotSDK, {InitializationOptions} from 'react-native-scanbot-sdk';
import {SDKUtils} from './utils/SDKUtils';
import {ViewUtils} from './utils/ViewUtils';

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.initScanbotSdk();
  }

  async initScanbotSdk() {
    const options: InitializationOptions = {
      licenseKey: SDKUtils.SDK_LICENSE_KEY,
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      storageImageFormat: SDKUtils.IMAGE_FILE_FORMAT,
      storageImageQuality: SDKUtils.JPG_IMAGE_QUALITY,
      storageBaseDirectory: this.getCustomStoragePath(), // Optional custom storage path. See comments below!
      documentDetectorMode: 'ML_BASED',
    };
    if (SDKUtils.FILE_ENCRYPTION_ENABLED && SDKUtils.FILE_ENCRYPTION_PASSWORD) {
      options.fileEncryptionPassword = SDKUtils.FILE_ENCRYPTION_PASSWORD;
      options.fileEncryptionMode = SDKUtils.FILE_ENCRYPTION_MODE;
    }
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log(result);
    } catch (e) {
      console.error('Error initializing Scanbot SDK:', e);
      ViewUtils.showAlert(
        'Error initializing Scanbot SDK:\n' + JSON.stringify(e),
      );
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
    return '';
  }

  render() {
    return (
      <NavigationContainer theme={Styles.ScanbotTheme}>
        <Stack.Navigator initialRouteName={Navigation.HOME}>
          <Stack.Screen name={Navigation.HOME} component={HomeScreen} />
          <Stack.Screen
            name={Navigation.IMAGE_RESULTS}
            component={ImageResultScreen}
          />
          <Stack.Screen
            name={Navigation.BARCODE_FORMATS}
            component={BarcodeFormatsScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={Navigation.BARCODE_DOCUMENT_FORMATS}
            component={BarcodeDocumentFormatsScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={Navigation.IMAGE_DETAILS}
            component={ImageDetailScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// @ts-ignore
export default App;
