import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class Cards extends BaseComponent<Page> {
  readonly collectionCard: Locator;
  readonly collectionAction: Locator;
  readonly heart: Locator;
  readonly heartCount: Locator;
  readonly nftCard: Locator;
  readonly infiniteScroll: Locator;
  readonly collectionProfile: Locator;
  readonly collectionLink: Locator;
  readonly cardTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.collectionCard = this.page.locator('.collection-card');
    this.collectionAction = this.page.locator('.collection-card-actions');
    this.nftCard = this.page.locator('.nft-card-container');
    this.infiniteScroll = this.page.locator('.infinite-scroll-component');
    // Collection
    this.collectionProfile = this.page.locator('.collection-profile');
    this.collectionLink = this.page.locator('.card-body a');
    this.cardTitle = this.page.locator('.card-body span');
    this.heart = this.collectionAction.filter({
      has: this.page.getByRole('img'),
    });
    this.heartCount = this.collectionAction.filter({
      has: this.page.locator('span'),
    });
    // NFT
  }
}
