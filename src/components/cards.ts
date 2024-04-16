import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class Cards extends BaseComponent<Page> {
  readonly collection: Locator;
  readonly nft: Locator;
  readonly collectionAction: Locator;
  readonly heart: Locator;
  readonly heartCount: Locator;
  readonly cardBody: Locator;
  readonly collectionLink: Locator;
  readonly cardTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.collection = this.page.locator('.collection-card');
    this.nft = this.page.locator('.nft-card-container');
    this.collectionAction = this.page.locator('.collection-card-actions');
    this.cardBody = this.page.locator('.card-body');
    this.collectionLink = this.cardBody.filter({ has: page.getByRole('link') });
    this.cardTitle = this.cardBody.filter({ has: page.locator('a') });
    this.heart = this.collectionAction.filter({
      has: this.page.getByRole('img'),
    });
    this.heartCount = this.heart.filter({
      has: this.page.locator('span'),
    });
    // NFT
  }
}
