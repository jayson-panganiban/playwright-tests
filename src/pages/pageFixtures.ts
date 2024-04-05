import { test as base, Locator } from '@playwright/test';
import { expect as baseExpect } from '@playwright/test';
import { HomePage } from './homePage';
import { SearchResultsPage } from './searchResultsPage';
import { CollectionsPage } from './collectionsPage';

type PageFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  collectionsPage: CollectionsPage;
  // TODO: NFTPage Fixture
  // nftPage: NFTPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);
    // Use the fixture value in the test.
    await use(homePage);
  },

  collectionsPage: async ({ page }, use) => {
    const collectionsPage = new CollectionsPage(page);
    await use(collectionsPage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },

  // TODO: NFTPage Fixture
  // nftPage: async ({ page }, use) =} {
  //     const nftPage = new NFTPage(page);
  //     await userInfo(nftPage);
  // }
});

export const expect = baseExpect.extend({
  async toHaveAllLocatorsVisible(
    locators: Locator[],
    options?: { timeout?: number },
  ) {
    const assertionName = 'toHaveAllLocatorsVisible';
    let pass: boolean;
    let matcherResult: any;
    try {
      await Promise.all(locators.map(locator => locator.isVisible()));
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          '\n\n' +
          `Locator: ${locators}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : '')
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          '\n\n' +
          `Locator: ${locators}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : '');

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },
});
