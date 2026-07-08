import {
  AspectRatio,
  DocumentStraighteningParameters,
  ModifyPageOptions,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

async function straighteningDocument(pageUuid: string, documentUuid: string) {
  try {
    /** Create the default configuration instance */
    const straighteningParameters = new DocumentStraighteningParameters();

    /** Configure the straightening mode as needed **/
    straighteningParameters.straighteningMode = 'NONE';
    straighteningParameters.straighteningMode = 'STRAIGHTEN';

    /**
     * The straightening parameters can be customized to fit the expected aspect ratio of the document
     * to be straightened. This can help the straightening algorithm to achieve better results.
     */
    straighteningParameters.aspectRatios = [
      new AspectRatio({width: 5, height: 7}),
      new AspectRatio({width: 1, height: 1}),
      new AspectRatio({width: 16, height: 9}),
      new AspectRatio({width: 3, height: 4}),
    ];

    /** Modify the page with the straightening parameters **/
    const modifiedDocument = await ScanbotDocument.modifyPage({
      pageUuid: pageUuid,
      documentUuid: documentUuid,
      options: new ModifyPageOptions({
        straighteningParameters: straighteningParameters,
      }),
    });

    const modifiedPage = modifiedDocument.pages.find(
      page => page.uuid === pageUuid,
    )!;
    /** Return the newly straightened page */
    return modifiedPage.documentImageURI;
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}
