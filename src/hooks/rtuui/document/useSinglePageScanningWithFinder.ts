import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {DocumentContext} from '@context';
import {COLORS} from '@theme';

import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';
import {AspectRatio} from 'react-native-scanbot-sdk';

export function useSinglePageScanningWithFinder() {
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

      // Enable view finder
      configuration.screens.camera.viewFinder.visible = true;
      configuration.screens.camera.viewFinder.aspectRatio = new AspectRatio({
        width: 3,
        height: 4,
      });

      // Enable/Disable the review screen.
      configuration.screens.review.enabled = false;

      // Enable/Disable Auto Snapping behavior
      configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
        true;

      // Hide the auto snapping enable/disable button
      configuration.screens.camera.bottomBar.autoSnappingModeButton.visible =
        false;
      configuration.screens.camera.bottomBar.manualSnappingModeButton.visible =
        false;

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
      if (documentResult.status === 'OK' && documentResult.data !== undefined) {
        setDocument(documentResult.data);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setDocument]);
}
