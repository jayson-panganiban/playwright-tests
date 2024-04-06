import { PageActions } from '../utils/pageActions';
import { test, expect } from '../pages/pageFixtures';
import { Locator } from '@playwright/test';

// TODO: context fixture
test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate('/');
    await expect(await homePage.title).toBe('Mintoo');
  });

  test('navbars', async ({ page, homePage }) => {
    await expect(page).toHaveTitle('Mintoo');
    // Check navbars
    const navBar = homePage.navBar.getLocators();
    expect(navBar).toHaveAllLocatorsVisible();
  });

  test('banners', async ({ homePage }) => {
    // Check banners
    await expect(homePage.homeText).toBeVisible();
    // Check texts and links
    await expect(homePage.collections).toBeVisible();
    await expect(homePage.digitalCollectibles).toBeVisible();
    await expect(homePage.viewAllCollectionsLink).toBeVisible();
    await expect(homePage.viewAllCollectiblesLink).toBeVisible();
  });

  test('tab filters', async ({ homePage }) => {
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
    await expect.soft(arrowPrevious).not.toBeVisible();
    await expect(arrowNext)
      .toBeVisible()
      .then(() => arrowNext.click());
    await expect(arrowPrevious)
      .toBeVisible()
      .then(() => arrowPrevious.click());
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
    await expect(collectionCards.length).toBeGreaterThan(1);
    await expect(nftCards.length).toBeGreaterThan(1);
  });
});

test.describe('Search functionality', () => {
  const searchTerms = [
    { term: 'Gold Chest', valid: true },
    { term: 'Diablo4', valid: false },
  ];
  // Search tests
  searchTerms.forEach(({ term, valid }) => {
    test(`Should ${
      valid ? 'return' : 'not return'
    } search result for "${term}" collection or collectibles`, async ({
      page,
      homePage,
      searchResultsPage,
    }) => {
      await homePage.navigate('/');
      // Search
      await expect(homePage.navBar.searchTextbox).toBeVisible();
      await homePage.navBar.searchTextbox.fill(term);

      if (valid) {
        await expect(searchResultsPage.searchResults(term)).toBeVisible();
        // Check all page until bottom using scroll
        const pageActions = new PageActions(page);
        await pageActions.scrollToBottom(page);
        await expect(searchResultsPage.footer.text).toBeVisible();
      } else {
        await expect(searchResultsPage.noResultFound(term)).toBeVisible();
        await expect(searchResultsPage.tryAgain).toBeVisible();
      }

      await searchResultsPage.navBar.searchTextbox.clear();
    });
  });
});
