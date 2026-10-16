import {
  DocumentCleanupStandaloneConfiguration,
  ScanbotDocument,
  ScanbotDocumentEnhancer,
} from 'react-native-scanbot-sdk';

async function startDocumentCleanupScreen(imageFileUri: string) {
  try {
    /**
     * Create a document object from the imageFileUri image
     */
    const document = await ScanbotDocument.createDocumentFromImages({
      images: [imageFileUri],
    });
    /*
     * Create a document cleanup configuration object and
     * start the document cleanup screen with the configuration
     */
    const documentUuid = document.uuid;
    const pageUuid = document.pages[0].uuid;

    const configuration = new DocumentCleanupStandaloneConfiguration({
      documentUuid: documentUuid,
      pageUuid: pageUuid,
    });
    /*
     * Configure the cleanup screen
     */
    configuration.cleanup.toolbar.strokeSizeSlider.visible = false;
    configuration.cleanup.topBarConfirmButton.foreground.color = '#FFFFFF';
    configuration.appearance.topBarBackgroundColor = '#C8193C';

    /* Configure the underlying cleanup engine. */
    configuration.cleanup.engineConfiguration.keepText = true;
    configuration.cleanup.engineConfiguration.maxUndoRedoStackSize = 10;

    /* Customize a UI element's text. */
    configuration.localization.documentCleanupTopBarCancelButtonTitle =
      'Cancel';

    const cleanedUpDocument =
      await ScanbotDocumentEnhancer.startDocumentCleanupScreen(configuration);
    /**
     * Handle the result if the result status is OK
     */
    if (cleanedUpDocument.status === 'OK') {
      console.log(
        'Cleanup successful. Updated document:',
        cleanedUpDocument.data.pages.find(p => p.uuid === pageUuid)
          ?.documentImageURI,
      );
    }
  } catch (e: any) {
    console.error(e);
  }
}
