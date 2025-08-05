import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';

import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';
import {DocumentDirectoryPath, ExternalDirectoryPath} from 'react-native-fs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
  DocumentContext,
  useDocument,
  useLoading,
} from '@context';
import {COLORS, ScanbotTheme} from '@theme';
import {LoadingIndicator} from '@components';

import {HomeScreen} from './src/screens/HomeScreen';
import {MrzResultScreen} from './src/screens/MrzResultScreen';
import {MedicalCertificateResultScreen} from './src/screens/MedicalCertificateResultScreen';
import {DocumentDataExtractorResultScreen} from './src/screens/DocumentDataExtractorResultScreen.tsx';
import {CheckScannerResultScreen} from './src/screens/CheckScannerResultScreen.tsx';
import {PlainDataResultScreen} from './src/screens/PlainDataResultScreen';
import {DocumentResultScreen} from './src/screens/DocumentResultScreen';
import {DocumentPageResultScreen} from './src/screens/DocumentPageResultScreen';
import {DocumentScannerViewScreen} from './src/screens/DocumentScannerViewScreen.tsx';
import {CroppingScreen} from './src/screens/CroppingScreen.tsx';
import {CreditCardScannerResultScreen} from './src/screens/CreditCardScannerResultScreen.tsx';

const Stack = createNativeStackNavigator<PrimaryRoutesParamList>();

// !! Please read the note!!
// It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
// However, for demo purposes, we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
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
  //storageBaseDirectory: storageBaseDirectory, // Uncomment this line to use a custom storage path
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

  const documentValues = useDocument();
  const [loading, setLoading] = useLoading();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ActivityIndicatorContext.Provider value={{setLoading}}>
          <DocumentContext.Provider value={documentValues}>
            <NavigationContainer theme={ScanbotTheme}>
              <Stack.Navigator
                screenOptions={(navigation: any) => ({
                  title: ScreenTitles[navigation.route.name as Screens],
                })}>
                <Stack.Screen name={Screens.HOME} component={HomeScreen} />
                <Stack.Screen
                  name={Screens.MEDICAL_CERTIFICATE_RESULT}
                  component={MedicalCertificateResultScreen}
                />
                <Stack.Screen
                  name={Screens.MRZ_RESULT}
                  component={MrzResultScreen}
                />
                <Stack.Screen
                  name={Screens.DOCUMENT_DATA_EXTRACTOR_RESULT}
                  component={DocumentDataExtractorResultScreen}
                />
                <Stack.Screen
                  name={Screens.CHECK_SCANNER_RESULT}
                  component={CheckScannerResultScreen}
                />
                <Stack.Screen
                  name={Screens.PLAIN_DATA_RESULT}
                  component={PlainDataResultScreen}
                />
                <Stack.Screen
                  name={Screens.DOCUMENT_RESULT}
                  component={DocumentResultScreen}
                />
                <Stack.Screen
                  name={Screens.DOCUMENT_PAGE_RESULT}
                  component={DocumentPageResultScreen}
                />
                <Stack.Screen
                  name={Screens.CREDIT_CARD_RESULT}
                  component={CreditCardScannerResultScreen}
                />
                <Stack.Screen
                  name={Screens.DOCUMENT_SCANNER_VIEW}
                  component={DocumentScannerViewScreen}
                />
                <Stack.Screen
                  name={Screens.CROPPING_VIEW}
                  component={CroppingScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </DocumentContext.Provider>
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
});

export default App;
