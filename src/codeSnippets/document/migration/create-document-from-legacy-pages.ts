import {Page, ScanbotDocument} from 'react-native-scanbot-sdk';

async function createDocumentWithLegacyPages(pages: Page[]) {
  /**
   * Create a document with a UUID
   * Add pages to the document from 'legacy' pages
   */
  const documentData = ScanbotDocument.createDocumentFromLegacyPages({
    pages: pages,
  });

  /**
   * Now you may delete the files corresponding to the Page to free up storage.
   * Use ScanbotSDK.LegacyPage.removePage(page) to remove the old pages
   */
}
