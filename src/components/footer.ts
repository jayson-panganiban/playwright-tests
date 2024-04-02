import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./baseComponent";

export class Footer extends BaseComponent<Page> {
  readonly text: Locator;

  constructor(page: Page) {
    super(page);
    this.text = this.page.getByText("You have reached the bottom");
  }
}
