import { Page } from '@playwright/test';
import { Footer } from '../components/footer';

export class PageActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToBottom(): Promise<void> {
    const footer = new Footer(this.page);
    let reachedBottom = false;
    while (!reachedBottom) {
      await this.page.evaluate(() => {
        window.scrollTo({
          top:
            document.body.scrollHeight || document.documentElement.scrollHeight,
          left: 0,
          behavior: 'instant',
        });
      });
      const stopCondition = await footer.text.isVisible();
      if (stopCondition) {
        reachedBottom = true;
      }
    }
  }
}
