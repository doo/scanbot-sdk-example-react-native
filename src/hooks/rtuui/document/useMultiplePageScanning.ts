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
import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

export function useMultiplePageScanning() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setDocument} = useContext(DocumentContext);

  return useCallback(async () => {
    try {
      /**
       * Check the license status and return early
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
      // Enable the multiple-page behavior
      configuration.outputSettings.pagesScanLimit = 0;

      // Enable/Disable Auto Snapping behavior
      configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
        true;

      // Hide/Reveal the auto snapping enable/disable button
      configuration.screens.camera.toolbar.autoSnappingModeButton.visible =
        true;
      configuration.screens.camera.toolbar.manualSnappingModeButton.visible =
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

      // Enable/Disable the review screen.
      configuration.screens.review.enabled = true;

      // Configure the bottom bar (further properties like title, icon and  background can also be set for these buttons)
      const toolBar = configuration.screens.review.toolbar;
      toolBar.addButton.barButton.visible = true;
      toolBar.retakeButton.barButton.visible = true;
      toolBar.cropButton.barButton.visible = true;
      toolBar.rotateButton.barButton.visible = true;
      toolBar.deleteButton.barButton.visible = true;

      configuration.screens.review.morePopup.deleteAll.icon.visible = true;
      configuration.screens.review.morePopup.deleteAll.title.text =
        'Delete all pages';

      // Configure reorder pages screen
      configuration.screens.reorderPages.topBarTitle.text = 'Reorder Pages';
      configuration.screens.reorderPages.guidance.title.text = 'Reorder Pages';

      // Configure cropping screen
      configuration.screens.cropping.topBarTitle.text = 'Cropping Screen';
      configuration.screens.cropping.toolbar.resetButton.visible = true;
      configuration.screens.cropping.toolbar.rotateButton.visible = true;
      configuration.screens.cropping.toolbar.detectButton.visible = true;

      // Configure cleanup screen
      configuration.screens.review.toolbar.documentCleanupButton.barButton.visible =
        true;
      configuration.screens.cleanup.engineConfiguration.keepText = true;
      configuration.screens.cleanup.discardChangesAlertDialog.title.text =
        'Discard changes?';
      configuration.screens.cleanup.discardChangesAlertDialog.subtitle.text =
        'Are you sure you want to discard the changes?';

      const documentResult = await ScanbotDocument.startScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (documentResult.status === 'OK') {
        setDocument(documentResult.data);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setDocument]);
}
