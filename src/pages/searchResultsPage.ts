import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { NavBar } from '../components/navBar';
import { Footer } from '../components/footer';
import { Cards } from '../components/cards';
import { Sliders } from '../components/sliders';

export class SearchResultsPage extends BasePage<Page> {
  readonly navBar: NavBar;
  readonly footer: Footer;
  readonly sliders: Sliders;
  readonly cards: Cards;
  readonly searchResult: Locator;
  readonly exclusiveCollections: Locator;
  readonly noExclusiveCollectionsFound: Locator;
  readonly noResultFound: Locator;
  readonly tryAgain: Locator;
  readonly searchTerm: string;

  constructor(page: Page, searchTerm: string) {
    super(page);
    this.footer = new Footer(page);
    this.navBar = new NavBar(page);
    this.sliders = new Sliders(page);
    this.cards = new Cards(page);
    this.searchResult = this.page
      .getByText(`Search results for "${searchTerm}"`)
      .first();
    this.exclusiveCollections = this.page
      .getByText('Exclusive Collections')
      .first();
    this.noExclusiveCollectionsFound = this.page.getByText(
      'No  Exclusive Collections'
    );
    this.noResultFound = this.page.getByText(
      `No result found for "${searchTerm}"`
    );
    this.tryAgain = this.page.getByText('Please try again with another');
  }

  // searchResults = async (searchTerm: string) =>
  //   this.page.getByText(`Search results for "${searchTerm}"`).first();
}
