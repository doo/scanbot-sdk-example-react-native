
import AsyncStorage from '@react-native-community/async-storage';
import {Page} from 'react-native-scanbot-sdk';

export class PageStorage {

  public static INSTANCE = new PageStorage();

  public async saveAll(pages: Page[]) {
    for (const page of pages) {
      await this.save(page);
    }
  }

  public async save(page: Page) {
    await AsyncStorage.setItem(page.pageId, JSON.stringify(page));
  }

  public async delete(page: Page) {
    await AsyncStorage.removeItem(page.pageId);
  }

  public async deleteAll() {
    await AsyncStorage.multiRemove(await this.keys());
  }

  public async load(): Promise<Page[]> {
    const result: Page[] = [];
    const stringified = await AsyncStorage.multiGet(await this.keys());
    stringified.forEach(item => {
      // AsyncStorage contains "__react_native_storage_test" key and...
      // All the data stored in a two-dimensional array, apparently, for some reason,
      // so just check whether the first element is an actual entry and grab the second one
      if (item[0] !== "__react_native_storage_test") {
        const page = item[1];
        if (typeof page === "string") {
          result.push(JSON.parse(page));
        }
      }
    });

    return result;
  }

  private async keys() {
    return await AsyncStorage.getAllKeys();
  }
}
