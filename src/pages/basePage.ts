import { Response, Page, Locator } from '@playwright/test';
import globalTimeout from '../../playwright.config';

export abstract class BasePage<T extends Page> {
  protected page: T;
  protected timeout: number;

  constructor(page: T, timeout?: number) {
    this.page = page;
    this.timeout = timeout ?? globalTimeout?.timeout ?? 15_000;
  }

  get title(): Promise<string> {
    return this.page.title();
  }

  navigate = async (
    url: string,
    timeout?: number,
  ): Promise<null | Response> => {
    return await this.page.goto(url, { timeout: timeout ?? this.timeout });
  };

  textLocator = (text: string): Locator => {
    return this.page.getByText(`${text}`);
  };
}
