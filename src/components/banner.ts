import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./baseComponent";

export class Banner extends BaseComponent<Page>{
  readonly bannerContainer: Locator;
  readonly welcomeText: Locator;
  readonly mintooImage: Locator;
  readonly homeText: Locator;
  readonly slickList: Locator;

  constructor(page: Page) {
    super(page);
    this.page.locator(".banner-container").first();
    this.page.locator("text=Hello! Welcome to").first();
    this.page.locator("img[alt='Mintoo']").nth(1);
    this.page.locator("text=This is the home for you and").first();
    this.page.locator(".slick-list").first();
  }
}
