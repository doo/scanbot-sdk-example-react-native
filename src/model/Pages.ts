import { Page } from 'react-native-scanbot-sdk/src';
import { PageStorage } from '../utils/PageStorage';

export class Pages {
  private static list: Page[] = [];

  public static selectedPage?: Page;

  static getAllPages() {
    return Pages.list;
  }

  static async add(page: Page) {
    Pages.list.push(page);
    await PageStorage.INSTANCE.saveAll(Pages.list);
  }

  static async addList(pages: Page[]) {
    Pages.list = Pages.list.concat(pages);
    await PageStorage.INSTANCE.saveAll(Pages.list);
  }

  static isEmpty() {
    return Pages.list.length === 0;
  }

  static async update(page: Page) {
    let index = -1;
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

  static async deleteSelectedPage() {
    if (Pages.selectedPage) {
      await this.delete(Pages.selectedPage);
    }
    delete Pages.selectedPage;
  }

  static async delete(page: Page) {
    Pages.list.splice(Pages.list.indexOf(page), 1);
    await PageStorage.INSTANCE.delete(page);
  }

  static async deleteAllPages() {
    await PageStorage.INSTANCE.deleteAll();
    Pages.list = [];
  }

  static getImageUris(): string[] {
    return Pages.list.map(p => p.documentImageFileUri || p.originalImageFileUri);
  }
}
