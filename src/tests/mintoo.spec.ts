import { test } from '../pages/pageFixtures';
import { expect } from '../utils/customMatcher';
import { Locator } from '@playwright/test';

test.describe('home page ui validation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate('/');
    await expect(await homePage.title).toMatch('Mintoo');
  });

  test('navbars', async ({ homePage }) => {
    // Check navbars
    await expect(homePage.navBar.header).toBeVisible();
    await expect(homePage.navBar.getLocators()).toHaveAllLocatorsVisible();
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
    await expect(homePage.filter).toBeVisible();
    // Check tab filters
    const filterTexts = [
      'Trending',
      'On Sale',
      'Events',
      'PALOMA Digital Awards',
    ];
    const tabFilters: Locator[] = await Promise.all(
      filterTexts.map(value => homePage.textLocator(value)),
    );
    expect(tabFilters).toHaveAllLocatorsVisible();
  });

  test('collections and nft', async ({ homePage }) => {
    // Check arrow sliders
    const arrowNext = homePage.sliders.sliderArrowNext;
    const arrowPrevious = homePage.sliders.sliderArrowPrev;
    await expect.soft(arrowPrevious).toBeHidden();
    await arrowNext.click();
    await arrowPrevious.click();
    // Check heart and heart count across all collections section
    const [collectionHearts, heartCounts] = await Promise.all([
      await homePage.cards.heart.all(),
      await homePage.cards.heartCount.all(),
    ]);
    // Check hearts
    expect(collectionHearts).toHaveAllLocatorsVisible();
    expect(heartCounts).toHaveAllLocatorsVisible();
    // Check cards (Collection and NFT)
    const [collectionCards, nftCards] = await Promise.all([
      homePage.cards.collectionCard.all(),
      homePage.cards.nftCard.all(),
    ]);
    expect(collectionCards).toHaveAllLocatorsVisible();
    expect(nftCards).toHaveAllLocatorsVisible();
    expect(collectionCards.length).toBeGreaterThan(1);
    expect(nftCards.length).toBeGreaterThan(1);
  });
});

test.describe('search functionality', () => {
  const searchTerms = [
    { term: 'Gold Chest', valid: true },
    { term: 'Diablo 4', valid: false },
  ];
  // Search tests
  searchTerms.forEach(({ term, valid }) => {
    test(`Should ${
      valid ? 'return' : 'not return'
    } search result for "${term}" collection or collectibles`, async ({
      homePage,
      searchResultsPage,
      pageActions,
    }) => {
      await homePage.navigate('/');
      // Search
      await expect(homePage.navBar.searchTextbox).toBeVisible();
      await homePage.navBar.searchTextbox.fill(term);

      if (valid) {
        await expect(searchResultsPage.searchResults(term)).toBeVisible();
        // Check all page until bottom using scroll
        pageActions.scrollToBottom();
      } else {
        await expect(searchResultsPage.noResultFound(term)).toBeVisible();
        await expect(searchResultsPage.tryAgain).toBeVisible();
      }

      await searchResultsPage.navBar.searchTextbox.clear();
    });
  });
});
