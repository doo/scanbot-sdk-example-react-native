import {Page} from 'react-native-scanbot-sdk/src';
import {PageStorage} from "../utils/PageStorage";

export class Pages {
  public static list: Page[] = [];
  public static selectedPage: Page;

  static async add(page: Page) {
    Pages.list.push(page);
    await PageStorage.INSTANCE.saveAll(this.list);
  }
  static addList(pages: Page[]) {
    pages.forEach((page) => {
      this.add(page);
    });
  }

  static clear() {
    this.list = [];
  }

  static isEmpty() {
    return Pages.list.length === 0;
  }

  static async update(page: Page) {
    let index: number = -1;
    for (let i = 0; i < Pages.list.length; i++) {
      if (Pages.list[i].pageId === page.pageId) {
        index = i;
      }
    }

    if (index !== -1) {
      Pages.list[index] = page;
      await PageStorage.INSTANCE.save(page);
    }
  }

  static deleteSelectedPage() {
    this.delete(this.selectedPage);
  }

  static async delete(page: Page) {
    this.list.splice(this.list.indexOf(page), 1);
    await PageStorage.INSTANCE.delete(page);
  }

  static getImageUris(): string[] {
    return Pages.list.map(
      (p) => p.documentImageFileUri || p.originalImageFileUri,
    );
  }
}
