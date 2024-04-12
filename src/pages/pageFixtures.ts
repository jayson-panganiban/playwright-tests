import { test as base, BrowserContext } from '@playwright/test';
import { HomePage } from './homePage';
import { SearchResultsPage } from './searchResultsPage';
import { CollectionsPage } from './collectionsPage';
import { PageActions } from '../utils/pageActions';

type PageFixtures = {
  browserContext: BrowserContext;
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  collectionsPage: CollectionsPage;
  pageActions: PageActions;
};

export const test = base.extend<PageFixtures>({
  browserContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  collectionsPage: async ({ page }, use) => {
    await use(new CollectionsPage(page));
  },
  pageActions: async ({ page }, use) => {
    await use(new PageActions(page));
  },
});
