import { BaseComponent } from './baseComponent';
import { Page } from 'playwright/test';

export class Filter extends BaseComponent<Page> {
  constructor(page: Page) {
    super(page);
  }

  async filterText(filterText: string) {
    return this.page.getByText(`${filterText}`);
  }
}
