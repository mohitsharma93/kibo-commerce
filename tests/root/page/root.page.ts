import type { Locator, Page } from '@playwright/test';

export class RootPage {
    readonly headerPageTitle: Locator = this.page.getByText('Shopping Cart');

    
    constructor(private readonly page: Page) {}

    async goto() {
        await this.page.goto('http://localhost:4200');
    }

    async addToCartButtons() {
        return this.page.getByRole('button', { name: /Add to Cart/i });
    }

    async clickFirstAddToCart(i : number = 0) {
        await (await this.addToCartButtons()).nth(i).click();
    }

    cartIcon() {
        return this.page.getByTestId('cart-icon');
    }

}