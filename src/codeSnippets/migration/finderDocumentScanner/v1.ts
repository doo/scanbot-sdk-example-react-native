import ScanbotSDK, {
  FinderDocumentScannerConfiguration,
} from 'react-native-scanbot-sdk';

async function finderDocumentScanner() {
  const configuration: FinderDocumentScannerConfiguration = {
    topBarBackgroundColor: '#ffffff',
    finderAspectRatio: {
      width: 3,
      height: 4,
    },
    shutterButtonHidden: true,
  };

  const pageResult = await ScanbotSDK.UI.startFinderDocumentScanner(
    configuration,
  );
}