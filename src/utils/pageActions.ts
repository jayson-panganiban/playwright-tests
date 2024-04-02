import { Page } from "@playwright/test";
import { Footer } from "../components/footer";

export class PageActions {
  readonly page: Page;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToBottom(page: Page): Promise<void> {
    const footer = new Footer(page);
    try {
      while (true) {
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(1500);
        const stopCondition = await footer.text.isVisible();
        if (stopCondition) {
          break;
        }
      }
    } catch (error) {
      console.error("Error while scrolling to bottom:", error);
    }
  }
}
