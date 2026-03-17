import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';
import {DocumentDirectoryPath} from 'react-native-fs';
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
import {DocumentDataExtractorResultScreen} from './src/screens/DocumentDataExtractorResultScreen';
import {CheckScannerResultScreen} from './src/screens/CheckScannerResultScreen';
import {PlainDataResultScreen} from './src/screens/PlainDataResultScreen';
import {DocumentResultScreen} from './src/screens/DocumentResultScreen';
import {DocumentPageResultScreen} from './src/screens/DocumentPageResultScreen';
import {DocumentScannerViewScreen} from './src/screens/DocumentScannerViewScreen';
import {CroppingScreen} from './src/screens/CroppingScreen';
import {CreditCardScannerResultScreen} from './src/screens/CreditCardScannerResultScreen';

const Stack = createNativeStackNavigator<PrimaryRoutesParamList>();

/*
 * TODO Add the Scanbot SDK license key here.
 * Please note: The Scanbot SDK will run without a license key for one minute per session!
 * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://docs.scanbot.io/trial/) on our website by using
 * the app identifier "io.scanbot.example.sdk.reactnative" of this example app.
 */
export const initializationConfiguration = new SdkConfiguration({
  //The Scanbot SDK License Key
  licenseKey: '',
  loggingEnabled: true, // Logging enabled. Consider switching logging OFF in production builds for security and performance reasons!
  storageImageFormat: IMAGE_FILE_FORMAT, // Format of stored images
  storageImageQuality: 80, // Quality of stored images
  // Optional custom storage directory
  // storageBaseDirectory: DocumentDirectoryPath + '/my-custom-storage',
});

// Set the following properties to enable encryption.
if (FILE_ENCRYPTION_ENABLED) {
  initializationConfiguration.fileEncryptionMode = 'AES256';
  initializationConfiguration.fileEncryptionPassword =
    'SomeSecretPa$$w0rdForFileEncryption';
}

function App() {
  useEffect(() => {
    ScanbotSDK.initialize(initializationConfiguration)
      .then(licenseInfo => {
        console.log(licenseInfo);
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
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'right', 'left']}>
        <ActivityIndicatorContext.Provider value={{setLoading}}>
          <DocumentContext.Provider value={documentValues}>
            <NavigationContainer theme={ScanbotTheme}>
              <Stack.Navigator
                screenOptions={(navigation: any) => ({
                  title: ScreenTitles[navigation.route.name as Screens],
                })}>
                <Stack.Screen name={Screens.HOME} component={HomeScreen} />
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCANBOT_RED,
  },
});

export default App;
