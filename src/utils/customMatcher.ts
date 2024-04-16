import { expect as baseExpect, Locator } from '@playwright/test';

export const expect = baseExpect.extend({
  async toBeAllVisible(locators: Locator[]) {
    const assertionName = 'toHaveAllLocatorsVisible';
    try {
      await Promise.all(
        locators.map(async locator => {
          await expect(locator).toBeVisible();
        }),
      );
      return {
        message: () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: false,
          }) +
          '\n\n' +
          `All locators are visible.\n`,
        pass: true,
        name: assertionName,
      };
    } catch (e: unknown) {
      if (typeof e === 'object' && e !== null && 'message' in e) {
        return {
          message: () =>
            this.utils.matcherHint(assertionName, undefined, undefined, {
              isNot: true,
            }) +
            '\n\n' +
            `Received: ${this.utils.printReceived(e.message)}`,
          pass: false,
          name: assertionName,
          actual: e.message,
        };
      }
      throw e; // Rethrow if it's not an error object
    }
  },
});
