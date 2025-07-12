import { test as base } from '@playwright/test';
import { RootPage } from '../page/root.page';
import { CartPage } from '../page/cart.page';

interface RootFixtures {
    rootPage: RootPage;
    productApiResponse: {
        // rootPage: RootPage; // This is the instance of RootPage that has been set up
        request: any; // Replace with the actual type if known
        response: any; // Replace with the actual type if known
        body: any; // Replace with the actual type if known
    };
    cartPage: CartPage;
}

export const test = base.extend<RootFixtures>({
    rootPage: async ({ page }, use) => {
        // Setup of the fixture
        const startPage: RootPage = new RootPage(page);

        await startPage.goto();

        // Use the fixture value in the test
        await use(startPage);

        // Potential teardown of the fixture
        // e.g. await startPage.close();
    },
    productApiResponse: async ({ page, rootPage }, use) => {

        // Separate concern: handles API only
        const [request, response] = await Promise.all([
            page.waitForRequest(req => req.url().includes('/products') && req.method() === 'GET'),
            page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
            rootPage.goto()
        ]);

        const body = await response.json();

        // Wait for Angular to render products and their images
        await page.waitForSelector('img'); // Wait until at least one <img> is in the DOM

        // Wait for all images to load (network idle: no more fetches for 500ms)
        await page.waitForLoadState('networkidle');
        await use({request, response, body} );
    },
    cartPage: async ({ page }, use) => {
        const cart = new CartPage(page);
        await use(cart);
    },
});

export { expect } from '@playwright/test';