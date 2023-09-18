/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox, Platform, SafeAreaView, StatusBar} from 'react-native';

import ScanbotSDK, {InitializationOptions} from 'react-native-scanbot-sdk';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageDetailScreen} from './pages/ImageDetailScreen';
import {MedicalCertificateResultScreen} from './pages/MedicalCertificateResultScreen';
import {GenericDocumentResultScreen} from './pages/GenericDocumentResultScreen';
import {CheckRecognizerResultScreen} from './pages/CheckRecognizerResultScreen';
import {BarcodeFormatsScreen} from './pages/BarcodeFormatsScreen';
import {BarcodeDocumentFormatsScreen} from './pages/BarcodeDocumentFormatsScreen';
import {BarcodeCameraViewScreen} from './pages/BarcodeCameraViewScreen';
import {errorMessageAlert} from './utils/Alerts';
import {
  PrimaryRoutesParamList,
  Screens,
  ScreenTitles,
} from './utils/Navigation';
import {PageContext, usePages} from './context/usePages';
import {
  BarcodeDocumentFormatContext,
  useBarcodeDocumentFormats,
} from './context/useBarcodeDocumentFormats';
import {
  BarcodeFormatsContext,
  useBarcodeFormats,
} from './context/useBarcodeFormats';
import {LastResultContext, useLastResult} from './context/useLastResult';
import {ScanbotTheme} from './theme/Theme';
import {ActivityIndicatorContext, useLoading} from './context/useLoading';
import {ActivityIndicator} from './components/ActivityIndicator';
import {HomeScreen} from './pages/HomeScreen';
import {ImageResultScreen} from './pages/ImageResultScreen';

const Stack = createStackNavigator<PrimaryRoutesParamList>();

// this is for fix the new nativeeventemitter() was called with a non-null argument issue.
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

// !! Please note !!
// It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
// However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
//
// On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
// All image files and export files (PDF, TIFF, etc.) created by the Scanbot SDK in this demo app will be stored
// in this public storage directory and will be accessible for every(!) app having external storage permissions!
// Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
// via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
//
// On iOS, we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.
//
// For more details about the storage system of the Scanbot SDK RN Module please see our docs:
// - https://scanbotsdk.github.io/documentation/react-native/
//
// For more details about the file system on Android and iOS we also recommend to check out:
// - https://developer.android.com/guide/topics/data/data-storage
// - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
const storageBaseDirectory = Platform.select({
  ios: DocumentDirectoryPath + '/my-custom-storage',
  android: ExternalDirectoryPath + '/my-custom-storage',
  default: '',
});

/*
 * TODO Add the Scanbot SDK license key here.
 * Please note: The Scanbot SDK will run without a license key for one minute per session!
 * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
 * the app identifier "io.scanbot.example.sdk.reactnative" of this example app.
 */
export const SDKInitializationOptions: InitializationOptions = {
  licenseKey: '', //The Scanbot SDK License Key
  loggingEnabled: true, // Logging enabled. Consider switching logging OFF in production builds for security and performance reasons!
  storageImageFormat: 'JPG', // Format of stored images
  storageImageQuality: 80, // Quality of stored images
  storageBaseDirectory: storageBaseDirectory, // Custom storage path
  documentDetectorMode: 'ML_BASED', // The engine used to detect documents
  // Set the following properties to enable encryption.
  // fileEncryptionMode: 'AES256',
  // fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
} as const;

function App() {
  useEffect(() => {
    ScanbotSDK.initializeSDK(SDKInitializationOptions).catch(error => {
      console.error('Error initializing Scanbot SDK:', error.message);
      errorMessageAlert('Error initializing Scanbot SDK:\n' + error.message);
    });
  }, []);

  const pageValues = usePages();
  const barcodeDocumentFormatsValues = useBarcodeDocumentFormats();
  const barcodeFormatsValues = useBarcodeFormats();
  const lastResults = useLastResult();
  const [loading, setLoading] = useLoading();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator loading={loading} />
      <ActivityIndicatorContext.Provider value={{setLoading}}>
        <PageContext.Provider value={pageValues}>
          <BarcodeDocumentFormatContext.Provider
            value={barcodeDocumentFormatsValues}>
            <BarcodeFormatsContext.Provider value={barcodeFormatsValues}>
              <LastResultContext.Provider value={lastResults}>
                <NavigationContainer theme={ScanbotTheme}>
                  <Stack.Navigator
                    initialRouteName={Screens.HOME}
                    screenOptions={navigation => ({
                      title: ScreenTitles[navigation.route.name],
                      headerStyle: {
                        borderBottomWidth: 0,
                        shadowColor: 'transparent',
                      },
                    })}>
                    <Stack.Screen name={Screens.HOME} component={HomeScreen} />
                    <Stack.Screen
                      name={Screens.IMAGE_RESULTS}
                      component={ImageResultScreen}
                    />
                    <Stack.Screen
                      name={Screens.IMAGE_DETAILS}
                      component={ImageDetailScreen}
                      options={{headerBackTitleVisible: false}}
                    />
                    <Stack.Screen
                      name={Screens.MEDICAL_CERTIFICATE_RESULT}
                      component={MedicalCertificateResultScreen}
                    />
                    <Stack.Screen
                      name={Screens.GENERIC_DOCUMENT_RESULT}
                      component={GenericDocumentResultScreen}
                    />
                    <Stack.Screen
                      name={Screens.CHECK_RECOGNIZER_RESULT}
                      component={CheckRecognizerResultScreen}
                    />
                    <Stack.Screen
                      name={Screens.BARCODE_FORMATS}
                      component={BarcodeFormatsScreen}
                      options={{headerBackTitleVisible: false}}
                    />
                    <Stack.Screen
                      name={Screens.BARCODE_DOCUMENT_FORMATS}
                      component={BarcodeDocumentFormatsScreen}
                      options={{headerBackTitleVisible: false}}
                    />
                    <Stack.Screen
                      name={Screens.BARCODE_CAMERA_VIEW}
                      component={BarcodeCameraViewScreen}
                      options={{headerBackTitleVisible: false}}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </LastResultContext.Provider>
            </BarcodeFormatsContext.Provider>
          </BarcodeDocumentFormatContext.Provider>
        </PageContext.Provider>
      </ActivityIndicatorContext.Provider>
    </SafeAreaView>
  );
}

export default App;
