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
    try {
      while (!reachedBottom) {
        await this.page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await this.page.waitForTimeout(1500);
        const stopCondition = await footer.text.isVisible();
        if (stopCondition) {
          reachedBottom = true;
        }
      }
    } catch (error) {
      console.error('Error while scrolling to bottom:', error);
    }
 }
}