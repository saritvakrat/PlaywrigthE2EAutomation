import type { Page } from '@playwright/test';

export class ElementsHelper {

    /**
     * Validate if element is visible
     *
     * @param {page} Page Page
     * @param {locator} element locator
     * @returns {Promise}
     * @memberof ElementsHelpers
     */
    static async isVisible(page: Page, locator: string): Promise<boolean> {
        await page.waitForSelector(locator);
        return await page.isVisible(locator);
    }

    /**
     * Validate if element is clickable
     * 
     * @param {page} Page Page
     * @param {locator} element locator
     * @returns {Promise}
     * @memberof ElementsHelpers
     */
    static async isEnabled(page: Page, locator: string): Promise<boolean> {
        await page.waitForSelector(locator);
        return await page.isEnabled(locator);
    }
    
}

    

