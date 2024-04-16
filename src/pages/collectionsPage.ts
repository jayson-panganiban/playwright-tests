import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Cards } from '../components/cards';

export class CollectionsPage extends BasePage<Page> {
  readonly cards: Cards;
  readonly collections: Locator;

  constructor(page: Page) {
    super(page);
    this.cards = new Cards(page);
    this.collections = this.page.getByText('Collections').first();
  }
}
