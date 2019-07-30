import { createStore } from 'redux';
import { Page } from 'react-native-scanbot-sdk';

export type ScannedPagesState = {
  pages: Page[];
};

export const ACTION_ADD_PAGES = 'ADD_PAGES';
export const ACTION_UPDATE_OR_ADD_PAGE = 'UPDATE_OR_ADD_PAGE';
export const ACTION_REMOVE_PAGE = 'REMOVE_PAGE';
export const ACTION_REMOVE_ALL_PAGES = 'REMOVE_ALL_PAGES';

const reducer = (state: ScannedPagesState = { pages: [] }, action) => {
  switch (action.type) {
    case ACTION_ADD_PAGES:
      return addPages(action.pages, state);
    case ACTION_UPDATE_OR_ADD_PAGE:
      return updateOrAddPage(action.page, state);
    case ACTION_REMOVE_PAGE:
      return removePage(action.page, state);
    case ACTION_REMOVE_ALL_PAGES:
      return removeAllPages();
    default:
      return state;
  }
};

function addPages(pages: Page[], state: ScannedPagesState): ScannedPagesState {
  return { pages: state.pages.concat(pages) };
}

function updateOrAddPage(page: Page, state: ScannedPagesState): ScannedPagesState {
  let updated = false;
  const pages = [...state.pages]
  for (let i = 0; i < pages.length; ++i) {
    if (pages[i].pageId === page.pageId) {
      pages[i] = page;
      updated = true;
      break;
    }
  }
  if (!updated) {
    pages.push(page);
  }
  return { pages };
}

function removePage(page: Page, state: ScannedPagesState): ScannedPagesState {
  let pages = state.pages;
  const index = pages.findIndex(p => p.pageId === page.pageId);
  if (index !== -1) {
    pages = [...pages];
    pages.splice(index, 1);
  }
  return { pages };
}

function removeAllPages(): ScannedPagesState {
  return { pages: [] };
}

export default createStore(reducer);
