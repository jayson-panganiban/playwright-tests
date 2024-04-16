import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class Sliders extends BaseComponent<Page> {
  readonly collection: Locator;
  readonly arrowNext: Locator;
  readonly arrowPrev: Locator;

  constructor(page: Page) {
    super(page);
    this.collection = this.page.locator('.collection-slider');
    this.arrowNext = this.page.getByRole('button', { name: 'next' });
    this.arrowPrev = this.page.getByRole('button', { name: 'previous' });
  }
}
