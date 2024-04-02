// /tests/mintoo.spec.ts
import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { PageActions } from "../utils/pageActions";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { Assert } from "../utils/assert";
import { Filter } from "../components/filter";

test("UI Components check", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate("/");
  await expect(await homePage.getTitle()).toBe("Mintoo");

  // Check UI components:
  // home, cards, sliders
  await expect(homePage.container).toBeVisible();
  const [collectionCards, nftCards, slickSlides] = await Promise.all([
    homePage.card.collectionCard.all(),
    homePage.card.nftCard.all(),
    homePage.card.slickSlide.all(),
  ]);
  const assert = new Assert();
  assert.thatElementsAreVisible(collectionCards);
  assert.thatElementsAreVisible(nftCards);
  assert.thatElementsAreVisible(slickSlides);

  await expect(collectionCards.length).toBeGreaterThan(1);
  await expect(nftCards.length).toBeGreaterThan(1);
  await expect(slickSlides.length).toBeGreaterThan(1);
  await expect(homePage.card.collections).toBeVisible();
  await expect(homePage.card.digitalCollectibles).toBeVisible();

  // Navbars
  const navbarLocators = homePage.navBar.getLocators();
  assert.thatElementsAreVisible(navbarLocators);
  // Filters
  const filterComponent = new Filter(page);
  const filterTexts = [
    "Trending",
    "On Sale",
    "Events",
    "PALOMA Digital Awards",
  ];
  const filterLocators = await Promise.all(
    filterTexts.map((text) => filterComponent.filterText(text))
  );
  await assert.thatElementsAreVisible(filterLocators);
});

test.describe("Search functionality", () => {
  const searchTerms = [
    { term: "Gold Chest", valid: true },
    { term: "Diablo4", valid: false },
  ];

  // Search tests
  searchTerms.forEach(({ term, valid }) => {
    test(`Should ${
      valid ? "return" : "not return"
    } search result for "${term}" collection or colletibles`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      await homePage.navigate("/");

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
