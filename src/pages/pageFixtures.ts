import { test as base, Locator, BrowserContext } from '@playwright/test';
import { expect as baseExpect } from '@playwright/test';
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

export const expect = baseExpect.extend({
  async toHaveAllLocatorsVisible(locators: Locator[]) {
    const assertionName = 'toHaveAllLocatorsVisible';
    try {
      await Promise.all(
        locators.map(async locator => {
          const isVisible = await locator.isVisible();
          if (!isVisible) {
            throw new Error(`Locator ${locator} is not visible`);
          }
        }),
      );

      return {
        message: () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          '\n\n' +
          `All locators are visible.\n`,
        pass: true,
        name: assertionName,
      };
    } catch (e: any) {
      return {
        message: () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          '\n\n' +
          `Received: ${this.utils.printReceived(e.message)}`,
        pass: false,
        name: assertionName,
        actual: e.message,
      };
    }
  },
});
