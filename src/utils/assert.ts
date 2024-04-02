import { Locator, expect } from "@playwright/test";

export class Assert {
  async thatElementsAreVisible(elements: Locator[]): Promise<void> {
    const results = await Promise.all(
      elements.map((element) => expect(element).toBeVisible())
    );
  }
}
