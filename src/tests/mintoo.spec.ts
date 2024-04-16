import { test } from '../utils/pageFixtures';
import { expect } from '../utils/customMatcher';
import { Locator } from '@playwright/test';

test.describe('home page ui validation', () => {
  test.beforeEach(async ({ page, homePage }) => {
    await homePage.navigate('/');
    await expect(page).toHaveTitle(homePage.title);
  });

  test('navbars', async ({ homePage }) => {
    await expect(homePage.navBar.all).toBeAllVisible();
  });

  test('banners', async ({ homePage }) => {
    // Check banners
    await expect(homePage.banner).toBeVisible();
    await expect(homePage.mintooImage).toBeVisible();
    await expect(homePage.welcomeText).toBeVisible();
    await expect(homePage.homeText).toBeVisible();
    // Check texts and links
    await expect(homePage.collections).toBeVisible();
    await expect(homePage.digitalCollectibles).toBeVisible();
    await expect(homePage.viewAllCollectionsLink).toBeVisible();
    await expect(homePage.viewAllCollectiblesLink).toBeVisible();
  });

  test('tab filters', async ({ homePage }) => {
    //TODO: Use texts from API response
    const filterTexts = [
      'Trending',
      'On Sale',
      'Events',
      'PALOMA Digital Awards',
    ];
    const filterComponent: Locator[] = await Promise.all(
      filterTexts.map(value => homePage.textLocator(value)),
    );
    await expect(filterComponent).toBeAllVisible();
  });

  test('collections and nft', async ({ homePage }) => {
    // Check arrow sliders
    const arrowNext = homePage.sliders.arrowNext;
    const arrowPrevious = homePage.sliders.arrowPrev;
    await expect.soft(arrowPrevious).toBeHidden();
    await arrowNext.click();
    await arrowPrevious.click();
    // Check heart and heart count across all collections section
    const [collectionHearts, collectionHeartsCount, collectionCards, nftCards] =
      await Promise.all([
        await homePage.cards.heart.all(),
        await homePage.cards.heartCount.all(),
        await homePage.cards.collection.all(),
        await homePage.cards.nft.all(),
      ]);
    // Check hearts
    await expect(collectionHearts).toBeAllVisible();
    await expect(collectionHeartsCount).toBeAllVisible();
    // Check cards (Collection and NFT)
    await expect(collectionCards).toBeAllVisible();
    await expect(nftCards).toBeAllVisible();
    // Minimum collection is 3
    await expect(collectionCards.length).toBeGreaterThanOrEqual(3);
    // Minimum collectible is 10
    await expect(nftCards.length).toBeGreaterThanOrEqual(10);
  });
});

test.describe('search functionality', () => {
  const searchTerms = [
    { term: 'Gold Chest', valid: true },
    { term: 'Diablo 4', valid: false },
  ];

  searchTerms.forEach(({ term, valid }) => {
    test(`Should ${
      valid ? 'return' : 'not return'
    } search result for "${term}" collection or collectibles`, async ({
      page,
      homePage,
      searchResultsPage,
      pageActions,
    }) => {
      await homePage.navigate('/');

      await expect(homePage.navBar.searchTextbox).toBeVisible();
      await homePage.navBar.searchTextbox.fill(term);
      await expect(page).toHaveURL(searchResultsPage.url);

      if (valid) {
        await expect(searchResultsPage.noResultFound(term)).toBeHidden();
        await expect(searchResultsPage.searchResults(term)).toBeVisible();
        // Check all page until bottom using scroll
        pageActions.scrollToBottom();
      } else {
        await expect(searchResultsPage.noResultFound(term)).toBeVisible();
        await expect(searchResultsPage.tryAgain).toBeVisible();
        await expect(searchResultsPage.searchResults(term)).toBeHidden();
      }

      await searchResultsPage.navBar.searchTextbox.clear();
    });
  });
});
