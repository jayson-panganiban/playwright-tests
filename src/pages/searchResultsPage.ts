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
  readonly exclusiveCollections: Locator;
  readonly noExclusiveCollectionsFound: Locator;
  readonly tryAgain: Locator;

  constructor(page: Page) {
    super(page);
    this.footer = new Footer(page);
    this.navBar = new NavBar(page);
    this.sliders = new Sliders(page);
    this.cards = new Cards(page);
    this.exclusiveCollections = this.page
      .getByText('Exclusive Collections')
      .first();
    this.noExclusiveCollectionsFound = this.page.getByText(
      'No  Exclusive Collections',
    );
    this.tryAgain = this.page.getByText('Please try again with another');
  }

  get url(): string { return '/search-results'; }
  
  searchResults = (searchTerm: string): Locator =>
    this.page.getByText(`Search results for "${searchTerm}"`).first();

  noResultFound = (searchTerm: string): Locator =>
    this.page.getByText(`No result found for "${searchTerm}"`);
}
