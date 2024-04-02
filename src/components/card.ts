import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./baseComponent";

export class Card extends BaseComponent<Page> {

    readonly slickSlide: Locator;
    readonly collectionCard: Locator;
    readonly nftCard: Locator;
    readonly collections: Locator;
    readonly digitalCollectibles: Locator;

    constructor(page: Page) {
        super(page);
        this.slickSlide = this.page.locator('.homepage-slider .slick-slide');
        this.collectionCard = this.page.locator('.collection-card');
        this.nftCard = this.page.locator('.nft-card-container');
        this.collections = this.page.getByText("Collections").first();
        this.digitalCollectibles = this.page.getByText("Digital Collectibles").first();
    }
}