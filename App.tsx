import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';

import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  errorMessageAlert,
  FILE_ENCRYPTION_ENABLED,
  IMAGE_FILE_FORMAT,
  PrimaryRoutesParamList,
  Screens,
  ScreenTitles,
} from '@utils';
import {
  ActivityIndicatorContext,
  BarcodeDocumentFormatContext,
  BarcodeFormatsContext,
  PageContext,
  useBarcodeDocumentFormats,
  useBarcodeFormats,
  useLoading,
  usePages,
} from '@context';
import {COLORS, ScanbotTheme} from '@theme';
import {LoadingIndicator} from '@components';

import {HomeScreen} from './src/screens/HomeScreen';
import {PageResultScreen} from './src/screens/PageResultScreen';
import {MrzResultScreen} from './src/screens/MrzResultScreen';
import {BarcodeResultScreen} from './src/screens/BarcodeResultScreen';
import {BarcodeV2ResultsScreen} from './src/screens/BarcodeV2ResultScreen';
import {ImageDetailScreen} from './src/screens/ImageDetailScreen';
import {MedicalCertificateResultScreen} from './src/screens/MedicalCertificateResultScreen';
import {GenericDocumentResultScreen} from './src/screens/GenericDocumentResultScreen';
import {CheckRecognizerResultScreen} from './src/screens/CheckRecognizerResultScreen';
import {BarcodeFormatsScreen} from './src/screens/BarcodeFormatsScreen';
import {BarcodeDocumentFormatsScreen} from './src/screens/BarcodeDocumentFormatsScreen';
import {BarcodeCameraViewScreen} from './src/screens/BarcodeCameraViewScreen';
import {PlainDataResultScreen} from './src/screens/PlainDataResultScreen';
import {DocumentV2ResultScreen} from './src/screens/DocumentV2ResultScreen.tsx';
import {DocumentV2PageResultScreen} from './src/screens/DocumentV2PageResultScreen.tsx';
import {DocumentContext, useDocument} from './src/context/useDocument.ts';

const Stack = createStackNavigator<PrimaryRoutesParamList>();

// !! Please read note !!
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
  default: undefined,
});

/*
 * TODO Add the Scanbot SDK license key here.
 * Please note: The Scanbot SDK will run without a license key for one minute per session!
 * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
 * the app identifier "io.scanbot.example.sdk.reactnative" of this example app.
 */
export const SDKInitializationOptions: ScanbotSdkConfiguration = {
  //The Scanbot SDK License Key
  licenseKey: '',
  loggingEnabled: true, // Logging enabled. Consider switching logging OFF in production builds for security and performance reasons!
  storageImageFormat: IMAGE_FILE_FORMAT, // Format of stored images
  storageImageQuality: 80, // Quality of stored images
  //storageBaseDirectory: storageBaseDirectory, // Uncomment this line to use custom storage path
  documentDetectorMode: 'ML_BASED', // The engine used to detect documents
} as const;

// Set the following properties to enable encryption.
if (FILE_ENCRYPTION_ENABLED) {
  SDKInitializationOptions.fileEncryptionMode = 'AES256';
  SDKInitializationOptions.fileEncryptionPassword =
    'SomeSecretPa$$w0rdForFileEncryption';
}

function App() {
  useEffect(() => {
    ScanbotSDK.initializeSDK(SDKInitializationOptions)
      .then(message => {
        console.log(message);
      })
      .catch(error => {
        console.error('Error initializing Scanbot SDK:', error.message);
        errorMessageAlert('Error initializing Scanbot SDK:\n' + error.message);
      });

    console.log(
      `Using ${
        (global as any)?.nativeFabricUIManager ? 'New' : 'Old'
      } Architecture`,
    );
  }, []);

  const pageValues = usePages();
  const barcodeDocumentFormatsValues = useBarcodeDocumentFormats();
  const barcodeFormatsValues = useBarcodeFormats();
  const documentValues = useDocument();
  const [loading, setLoading] = useLoading();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ActivityIndicatorContext.Provider value={{setLoading}}>
          <PageContext.Provider value={pageValues}>
            <BarcodeDocumentFormatContext.Provider
              value={barcodeDocumentFormatsValues}>
              <BarcodeFormatsContext.Provider value={barcodeFormatsValues}>
                <DocumentContext.Provider value={documentValues}>
                  <NavigationContainer theme={ScanbotTheme}>
                    <Stack.Navigator
                      screenOptions={navigation => ({
                        title: ScreenTitles[navigation.route.name],
                        headerStyle: styles.headerStyle,
                        headerBackTitleVisible: false,
                      })}>
                      <Stack.Screen
                        name={Screens.HOME}
                        component={HomeScreen}
                      />
                      <Stack.Screen
                        name={Screens.PAGE_RESULTS}
                        component={PageResultScreen}
                      />
                      <Stack.Screen
                        name={Screens.IMAGE_DETAILS}
                        component={ImageDetailScreen}
                      />
                      <Stack.Screen
                        name={Screens.BARCODE_RESULT}
                        component={BarcodeResultScreen}
                      />
                      <Stack.Screen
                        name={Screens.BARCODE_V2_RESULT}
                        component={BarcodeV2ResultsScreen}
                      />
                      <Stack.Screen
                        name={Screens.MEDICAL_CERTIFICATE_RESULT}
                        component={MedicalCertificateResultScreen}
                      />
                      <Stack.Screen
                        name={Screens.MRZ_RESULT}
                        component={MrzResultScreen}
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
                        name={Screens.PLAIN_DATA_RESULT}
                        component={PlainDataResultScreen}
                      />
                      <Stack.Screen
                        name={Screens.BARCODE_FORMATS}
                        component={BarcodeFormatsScreen}
                        options={{}}
                      />
                      <Stack.Screen
                        name={Screens.BARCODE_DOCUMENT_FORMATS}
                        component={BarcodeDocumentFormatsScreen}
                      />
                      <Stack.Screen
                        name={Screens.BARCODE_CAMERA_VIEW}
                        component={BarcodeCameraViewScreen}
                      />
                      <Stack.Screen
                        name={Screens.DOCUMENT_V2_RESULT}
                        component={DocumentV2ResultScreen}
                      />
                      <Stack.Screen
                        name={Screens.DOCUMENT_V2_PAGE_RESULT}
                        component={DocumentV2PageResultScreen}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </DocumentContext.Provider>
              </BarcodeFormatsContext.Provider>
            </BarcodeDocumentFormatContext.Provider>
          </PageContext.Provider>
        </ActivityIndicatorContext.Provider>
        <LoadingIndicator loading={loading} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCANBOT_RED,
  },
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
});

export default App;
