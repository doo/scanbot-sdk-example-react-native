import {createContext, useCallback, useEffect, useState} from 'react';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const errorMessage = 'AsyncStorage Operation Error:';

interface PageContextValue {
  pageList: Array<Page>;
  addPage: (page: Page) => void;
  addMultiplePages: (pages: Array<Page>) => void;
  deletePage: (page: Page) => void;
  deleteAllPages: () => void;
  loadPages: () => void;
  isPageListEmpty: () => boolean;
  deleteSelectedPage: () => void;
  addSelectedPage: (page: Page) => void;
  getImageUriFromPages: () => Array<string>;
}

export const PageContext = createContext<PageContextValue>({
  pageList: [] as Page[],
  addPage: (_page: Page) => {},
  addMultiplePages: (_pages: Page[]) => {},
  deletePage: (_page: Page) => {},
  deleteAllPages: () => {},
  loadPages: () => {},
  isPageListEmpty: () => true as boolean,
  deleteSelectedPage: () => {},
  addSelectedPage: (_page: Page) => {},
  getImageUriFromPages: () => [] as string[],
});

export function usePages() {
  const [pageList, setList] = useState<Array<Page>>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const addPage = useCallback(async (page: Page) => {
    try {
      await AsyncStorage.setItem(page.pageId, JSON.stringify(page));
      setList(list => [...list, page]);
    } catch (e: any) {
      console.log(errorMessage, e.message);
    }
  }, []);

  const addMultiplePages = useCallback(async (pages: Page[]) => {
    try {
      for (const page of pages) {
        await AsyncStorage.setItem(page.pageId, JSON.stringify(page));
      }
      setList(list => [...list, ...pages]);
    } catch (e: any) {
      console.log(errorMessage, e.message);
    }
  }, []);

  const deletePage = useCallback(async (page: Page) => {
    try {
      await AsyncStorage.removeItem(page.pageId);
      setList(list => {
        return [
          ...list.splice(
            list.findIndex(p => p.pageId === page.pageId),
            1,
          ),
        ];
      });
    } catch (e: any) {
      console.log(errorMessage, e.message);
    }
  }, []);

  const deleteAllPages = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      setList([]);
    } catch (e: any) {
      console.log(errorMessage, e.message);
    }
  }, []);

  const loadPages = useCallback(async () => {
    try {
      const result: Page[] = [];
      const keys = await AsyncStorage.getAllKeys();
      const stringified = await AsyncStorage.multiGet(keys);
      stringified.map(item => {
        // AsyncStorage contains "__react_native_storage_test" key and...
        // All the data stored in a two-dimensional array, apparently, for some reason,
        // so just check whether the first element is an actual entry and grab the second one
        if (item[0] !== '__react_native_storage_test') {
          const page = item[1];
          if (typeof page === 'string') {
            result.push(JSON.parse(page));
          }
        }
      });
      console.log(`Loaded ${result.length} pages from storage`);
      if (result.length === 0) {
        return;
      }
      const refreshed = await ScanbotSDK.refreshImageUris({pages: result});
      if (refreshed.status === 'OK') {
        setList(refreshed.pages);
      }
    } catch (e: any) {
      console.log(errorMessage, e.message);
    }
  }, []);

  const deleteSelectedPage = useCallback(async () => {
    if (selectedPage) {
      await deletePage(selectedPage);
      setSelectedPage(null);
    }
  }, [deletePage, selectedPage]);

  const addSelectedPage = useCallback((page: Page) => {
    setSelectedPage(page);
  }, []);

  const isPageListEmpty = useCallback(() => {
    return pageList.length === 0;
  }, [pageList.length]);

  const getImageUriFromPages = useCallback(() => {
    return pageList.map(p => p.documentImageFileUri || p.originalImageFileUri);
  }, [pageList]);

  return {
    pageList,
    addPage,
    addMultiplePages,
    deleteAllPages,
    deletePage,
    isPageListEmpty,
    loadPages,
    deleteSelectedPage,
    addSelectedPage,
    getImageUriFromPages,
  };
}
