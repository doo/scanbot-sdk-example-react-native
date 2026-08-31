import {selectImagesFromLibrary} from '@utils';
import {
  CroppingStandaloneConfiguration,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

async function startDocumentDetectionWithCroppingScreen() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue selecting an image
     **/
    const selectedImagesResult = await selectImagesFromLibrary();
    if (!selectedImagesResult) {
      return;
    }
    /** Create a new document with the provided imageFileUri. */
    const document = await ScanbotDocument.createDocumentFromImages({
      images: selectedImagesResult,
    });
    /** Create a new configuration with the document and the document's first page. */
    const configuration = new CroppingStandaloneConfiguration({
      documentUuid: document.uuid,
      pageUuid: document.pages[0].uuid,
    });
    /* Customize the configuration. */
    configuration.cropping.toolBar.rotateButton.visible = false;
    configuration.appearance.topBarBackgroundColor = '#c8193c';
    configuration.cropping.topBarConfirmButton.foreground.color = '#ffffff';
    configuration.localization.croppingTopBarCancelButtonTitle = 'Cancel';
    /** Start the cropping UI Screen */
    const documentResult = await ScanbotDocument.startCroppingScreen(
      configuration,
    );
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
