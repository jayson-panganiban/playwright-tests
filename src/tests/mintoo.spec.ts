// /tests/mintoo.spec.ts
import { Page, expect, test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { PageActions } from '../utils/pageActions';
import { SearchResultsPage } from '../pages/searchResultsPage';
import { Assert } from '../utils/assert';
import { Filter } from '../components/filter';

test('Home page UI components', async ({ page }) => {
  const assert = new Assert();
  const homePage = new HomePage(page);

  await homePage.navigate('/');
  await expect(page).toHaveTitle('Mintoo');

  // Check navbars
  const navbarLocators = homePage.navBar.getLocators();
  assert.thatElementsAreVisible(navbarLocators);

  // Check banners
  await expect(homePage.homeText).toBeVisible();
  // Check texts and links
  await expect(homePage.collections).toBeVisible();
  await expect(homePage.digitalCollectibles).toBeVisible();
  await expect(homePage.viewAllCollectionsLink).toBeVisible();
  await expect(homePage.viewAllCollectiblesLink).toBeVisible();

  // Check tab filters
  const filterComponent = new Filter(page);
  const filterTexts = [
    'Trending',
    'On Sale',
    'Events',
    'PALOMA Digital Awards',
  ];
  const filterLocators = await Promise.all(
    filterTexts.map((text) => filterComponent.filterText(text)),
  );
  await assert.thatElementsAreVisible(filterLocators);

  // Check Collections section
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
  assert.thatElementsAreVisible(collectionHearts);
  assert.thatElementsAreVisible(heartCounts);

  // Check cards (Collection and NFT)
  const [collectionCards, nftCards] = await Promise.all([
    homePage.cards.collectionCard.all(),
    homePage.cards.nftCard.all(),
  ]);
  assert.thatElementsAreVisible(collectionCards);
  assert.thatElementsAreVisible(nftCards);
  await expect(collectionCards.length).toBeGreaterThan(1);
  await expect(nftCards.length).toBeGreaterThan(1);
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
    } search result for "${term}" collection or colletibles`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      await homePage.navigate('/');

      // Search
      const searchResultsPage = new SearchResultsPage(page, term);
      await homePage.navBar.searchTextbox.fill(term);

      if (valid) {
        await expect(searchResultsPage.searchResult).toBeVisible();
        // Check all page until bottom using scroll
        const pageActions = new PageActions(page);
        await pageActions.scrollToBottom(page);
        await expect(searchResultsPage.footer.text).toBeVisible();
      } else {
        await expect(searchResultsPage.noResultFound).toBeVisible();
        await expect(searchResultsPage.tryAgain).toBeVisible();
      }

      await searchResultsPage.navBar.searchTextbox.clear();
    });
  });
});
