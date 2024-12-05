import ScanbotSDK, {
  DocumentScannerConfiguration,
} from 'react-native-scanbot-sdk';

async function documentScanner() {
  const configuration: DocumentScannerConfiguration = {
    ignoreBadAspectRatio: true,
    autoSnappingSensitivity: 0.67,
    topBarBackgroundColor: '#ffffff',
    bottomBarBackgroundColor: '#ffffff',
    textHintOK: "Don't move.\nCapturing document...",
    multiPageButtonHidden: true,
    multiPageEnabled: false,
  };

  const pageResult = ScanbotSDK.UI.startDocumentScanner(configuration);
}
