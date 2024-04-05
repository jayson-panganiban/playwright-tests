import { Locator } from '@playwright/test';
import { BaseComponent } from './baseComponent';
import { Page } from 'playwright/test';

export class Filter extends BaseComponent<Page> {
  constructor(page: Page) {
    super(page);
  }

  filterText = (filterText: string): Locator =>
    this.page.getByText(`${filterText}`);
}
