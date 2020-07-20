import {Page} from 'react-native-scanbot-sdk/src';

export class Pages {
  public static list: Page[] = [];
  public static selectedPage: Page;

  static add(page: Page) {
    Pages.list.push(page);
  }
  static addList(pages: Page[]) {
    pages.forEach((page) => {
      Pages.list.push(page);
    });
  }

  static isEmpty() {
    return Pages.list.length === 0;
  }

  static update(page: Page) {
    let index: number = -1;
    for (let i = 0; i < Pages.list.length; i++) {
      if (Pages.list[i].pageId === page.pageId) {
        index = i;
      }
    }

    if (index !== -1) {
      Pages.list[index] = page;
    }
  }

  static getImageUris(): string[] {
    return Pages.list.map(
      (p) => p.documentImageFileUri || p.originalImageFileUri,
    );
  }
}
