import { Locator, BrowserContext, Page } from '@playwright/test';
import { NavBar } from '../components/navBar';
import { BasePage } from './basePage';
import { Footer } from '../components/footer';
import { Cards } from '../components/cards';
import { Sliders } from '../components/sliders';

export class HomePage extends BasePage<Page> {
  readonly navBar: NavBar;
  readonly footer: Footer;
  readonly cards: Cards;
  readonly sliders: Sliders;
  readonly container: Locator;
  readonly viewAllCollectionsLink: Locator;
  readonly viewAllCollectiblesLink: Locator;
  readonly collections: Locator;
  readonly digitalCollectibles: Locator;
  readonly banner: Locator;
  readonly welcomeText: Locator;
  readonly mintooImage: Locator;
  readonly homeText: Locator;
  readonly heart: Locator;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavBar(page);
    this.footer = new Footer(page);
    this.cards = new Cards(page);
    this.sliders = new Sliders(page);
    this.banner = this.page.locator('.banner-container').first();
    this.welcomeText = this.page.locator('text=Hello! Welcome to').first();
    this.mintooImage = this.page.locator("img[alt='Mintoo']").nth(1);
    this.homeText = this.page
      .locator('text=This is the home for you and')
      .first();
    this.collections = this.page.getByText('Collections').first();
    this.digitalCollectibles = this.page
      .getByText('Digital Collectibles')
      .nth(3);
    this.viewAllCollectionsLink = this.page.getByText('View All Collections >');
    this.viewAllCollectiblesLink = this.page.getByText(
      'View All Collectibles >',
    );
  }
}
