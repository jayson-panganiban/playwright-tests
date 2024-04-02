import { Locator, Page } from "@playwright/test";
import { NavBar } from "../components/navBar";
import { BasePage } from "./basePage";
import { Footer } from "../components/footer";
import { Card } from "../components/card";

export class HomePage extends BasePage<Page> {
  readonly navBar: NavBar;
  readonly footer: Footer;
  readonly card: Card;
  readonly container: Locator;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavBar(page);
    this.footer = new Footer(page);
    this.card = new Card(page);
    this.container = this.page.locator('.home-container');
  }
}
