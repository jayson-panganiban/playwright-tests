import { Locator, Page } from '@playwright/test';
import globalTimeout from '../../playwright.config';

export abstract class BasePage<T extends Page> {
  protected page: T;
  protected timeout: number;

  constructor(page: T, timeout?: number) {
    this.page = page;
    this.timeout = timeout ?? globalTimeout?.timeout ?? 15_000;
  }

  async navigate(url: string, timeout?: number): Promise<void> {
    await this.page.goto(url, { timeout: timeout ?? this.timeout });
  }

  async waitForLocator(locator: Locator, timeout?: number): Promise<void> {
    try {
      await locator.waitFor({
        state: 'visible',
        timeout: timeout ?? this.timeout,
      });
    } catch (error) {
      console.error(
        `Locator did not become visible within the specified ${timeout}. Error: ${error.message}`
      );
      throw error;
    }
  }

  async waitForCondition(
    condition: () => Promise<boolean>,
    timeout?: number
  ): Promise<void> {
    try {
      await this.page.waitForFunction(condition, {
        timeout: timeout ?? this.timeout,
      });
    } catch (error) {
      console.error(
        `Condition did not become true within the specified ${timeout}. Error: ${error.message}`
      );
      throw error;
    }
  }
}
