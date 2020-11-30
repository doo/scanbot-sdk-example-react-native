import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {Page} from "react-native-scanbot-sdk/src";

export class PageStorage {

    private KEY = "pageStorageKey";
    private plugin: Storage;

    public static INSTANCE = new PageStorage();

    constructor() {

        this.plugin = new Storage({
            // maximum capacity, default 1000 key-ids
            size: 1000,

            // Use AsyncStorage for RN apps, or window.localStorage for web apps.
            // If storageBackend is not set, data will be lost after reload.
            storageBackend: AsyncStorage, // for web: window.localStorage

            // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            defaultExpires: 1000 * 3600 * 24,

            // cache data in the memory. default is true.
            enableCache: true,

            // if data was not found in storage or expired data was found,
            // the corresponding sync method will be invoked returning
            // the latest data.
            sync: {
                // we'll talk about the details later.
            }
        });
    }

    public async saveAll(pages: Page[]) {
        for (const page of pages) {
            await this.save(page);
        }
    }

    public async save(page: Page) {
        const result = this.plugin.save({ key: this.KEY, id: page.pageId, data: page });
        console.log("Saved page (" + page.pageId + ") to local storage:", result);
    }

    public async delete(page: Page) {
        await this.plugin.remove({ key: this.KEY, id: page.pageId });
    }

    public async load(): Promise<Page[]> {
        return await this.plugin.getAllDataForKey(this.KEY);
    }
}
