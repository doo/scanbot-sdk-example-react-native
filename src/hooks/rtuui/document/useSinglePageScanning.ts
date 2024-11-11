import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';
import {useNavigation} from '@react-navigation/native';
import {DocumentContext} from '@context';
import {COLORS} from '@theme';

import {
  PageSnapCheckMarkAnimation,
  PageSnapFunnelAnimation,
} from 'react-native-scanbot-sdk/src/ui_v2/document/CameraScreenConfiguration.ts';

export function useSinglePageScanning() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setDocument} = useContext(DocumentContext);

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the document configuration object and
       * start the document scanner with the configuration
       */
      const configuration = new DocumentScanningFlow();
      // Disable the multiple page behavior
      configuration.outputSettings.pagesScanLimit = 1;
      // Enable/Disable the review screen.
      configuration.screens.review.enabled = false;
      // Enable/Disable Auto Snapping behavior
      configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
        true;

      /**
       * Configure the animation
       * You can choose between genie animation or checkmark animation
       * Note: Both modes can be further configured to your liking
       * e.g for genie animation
       */
      configuration.screens.camera.captureFeedback.snapFeedbackMode =
        new PageSnapFunnelAnimation({});
      // or for checkmark animation
      configuration.screens.camera.captureFeedback.snapFeedbackMode =
        new PageSnapCheckMarkAnimation({});

      // Hide the auto snapping enable/disable button
      configuration.screens.camera.bottomBar.autoSnappingModeButton.visible =
        false;
      configuration.screens.camera.bottomBar.manualSnappingModeButton.visible =
        false;
      configuration.screens.camera.bottomBar.importButton.title.visible = true;
      configuration.screens.camera.bottomBar.torchOnButton.title.visible = true;
      configuration.screens.camera.bottomBar.torchOffButton.title.visible =
        true;

      // Set colors
      configuration.palette.sbColorPrimary = COLORS.SCANBOT_RED;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Configure the hint texts for different scenarios
      configuration.screens.camera.userGuidance.statesTitles.tooDark =
        'Need more lighting to detect a document';
      configuration.screens.camera.userGuidance.statesTitles.tooSmall =
        'Document too small';
      configuration.screens.camera.userGuidance.statesTitles.noDocumentFound =
        'Could not detect a document';

      const documentResult = await startDocumentScanner(configuration);
      /**
       * Handle the result if result status is OK
       */
      if (documentResult.status === 'OK') {
        setDocument(documentResult);
        navigation.navigate(Screens.DOCUMENT_V2_RESULT);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setDocument]);
}
