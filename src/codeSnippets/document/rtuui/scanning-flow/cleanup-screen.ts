import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();

    /** Enable the cleanup screen in the scanning flow. */
    configuration.screens.review.enabled = true;
    configuration.screens.review.toolbar.documentCleanupButton.barButton.visible =
      true;

    /** Retrieve the instance of the cleanup screen configuration from the main configuration object. */
    const cleanupConfiguration = configuration.screens.cleanup;

    /** If true, detected text is preserved. Enabling it runs text detection, which takes additional time. */
    cleanupConfiguration.engineConfiguration.keepText = false;

    /** The maximum number of undo/redo steps kept in memory. Use a smaller value to save memory. */
    cleanupConfiguration.engineConfiguration.maxUndoRedoStackSize = 4;

    /** Downscales the stroke area to this value in pixels (width x height)
     *  to limit memory consumption and to speed up the cleanup.
     *  The smaller the value the faster it is, but the quality is lower too. */
    cleanupConfiguration.engineConfiguration.maxCleanupResolution = 1200000;

    /** Show an introduction screen the first time the user opens the cleanup screen. */
    cleanupConfiguration.introduction.showAutomatically = true;

    /** Customize the top bar. */
    cleanupConfiguration.topBarTitle.text = 'Clean up the page';
    cleanupConfiguration.topBarBackButton.text = 'Cancel';
    cleanupConfiguration.topBarConfirmButton.text = 'Done';

    /** The background color of the canvas behind the image. */
    cleanupConfiguration.backgroundColor = '#222222';

    /** Configure the toolbar buttons. */
    cleanupConfiguration.toolbar.undoButton.title.text = 'Undo';
    cleanupConfiguration.toolbar.redoButton.title.text = 'Redo';
    cleanupConfiguration.toolbar.resetButton.title.text = 'Reset';

    /** Configure the stroke size slider. */
    cleanupConfiguration.toolbar.strokeSizeSlider.visible = true;
    cleanupConfiguration.toolbar.strokeSizeSlider.minStrokeSize = 1;
    cleanupConfiguration.toolbar.strokeSizeSlider.maxStrokeSize = 50;
    cleanupConfiguration.toolbar.strokeSizeSlider.title.text = 'Brush size';

    /** Customize the stroke size indicator, the round preview of the current brush. */
    cleanupConfiguration.strokeSizeIndicator.borderColor = '#00C853';
    cleanupConfiguration.strokeSizeIndicator.backgroundColor = '#00C853';
    cleanupConfiguration.strokeSizeIndicator.opacity = 0.9;

    /** Customize the alert dialogs shown when resetting the edits or when cancelling with unsaved changes. */
    cleanupConfiguration.resetAllEditsAlertDialog.title.text =
      'Reset all edits?';
    cleanupConfiguration.resetAllEditsAlertDialog.subtitle.text =
      'This will revert all cleanup operations on this page.';
    cleanupConfiguration.discardChangesAlertDialog.title.text =
      'Discard changes?';
    cleanupConfiguration.discardChangesAlertDialog.subtitle.text =
      'Your cleanup edits on this page will be lost.';

    /** Optionally customize the text of the cleanup screen via the shared localization object. */
    configuration.localization.documentCleanupScreenTitle = 'Clean up the page';
    configuration.localization.documentCleanupUndoButtonTitle = 'Undo';
    configuration.localization.documentCleanupRedoButtonTitle = 'Redo';
    configuration.localization.documentCleanupResetButtonTitle = 'Reset';

    /** Start the Document Scanner UI */
    const documentResult = await ScanbotDocument.startScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
