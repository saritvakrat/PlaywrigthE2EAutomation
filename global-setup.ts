import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(baseURL!);
    await page.context().storageState({ path: storageState as string });
    await page.close();
  } catch (error) {
    await page.close();
    throw error;
  }

}

export default globalSetup;