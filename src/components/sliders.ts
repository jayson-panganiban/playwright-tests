import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class Sliders extends BaseComponent<Page> {
  readonly collectionSlider: Locator;
  readonly sliderArrowNext: Locator;
  readonly sliderArrowPrev: Locator;

  constructor(page: Page) {
    super(page);
    this.collectionSlider = this.page.locator('.collection-slider');
    this.sliderArrowNext = this.page.getByRole('button', { name: 'next' });
    this.sliderArrowPrev = this.page.getByRole('button', { name: 'previous' });
  }
}
