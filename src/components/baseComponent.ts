import { Page } from "@playwright/test";

export abstract class BaseComponent<T extends Page> {
  protected page: T;

  constructor(page: T) {
    this.page = page;
  }
}
