import { BaseComponent } from "./baseComponent";
import { Page, Locator } from "@playwright/test";

export class NavBar extends BaseComponent<Page> {
  readonly mintooLink: Locator;
  readonly signUpButton: Locator;
  readonly loginButton: Locator;
  readonly searchTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.mintooLink = this.page.getByRole("link", { name: "Mintoo" });
    this.signUpButton = this.page.getByRole("button", { name: "Sign up" });
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.searchTextbox = this.page.getByRole("textbox");
  }

  getLocators(): Locator[] {
    return [
      this.mintooLink,
      this.signUpButton,
      this.loginButton,
      this.searchTextbox,
    ];
  }
}
