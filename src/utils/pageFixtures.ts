import { test as base, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultsPage } from '../pages/searchResultsPage';
import { CollectionsPage } from '../pages/collectionsPage';
import { PageActions } from './pageActions';

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
