// page/cart.page.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    cart(): Locator {
        return this.page.locator('[data-testid="cart"]');
    }

    cartItems(): Locator {
        return this.page.locator('[data-testid="cart-items"]');
    }

    async open() {
        await this.page.getByTestId('cart-icon').click();
    }

    totalPrice(): Locator {
        return this.page.getByTestId('cart-total');
    }

    quantityInput(i : number): Locator {
        return this.page.locator('[data-testid="cart-item-qty"]').nth(i);
    }

    async updateQuantity(index: number, value: any) {
        // Assuming the event is a change event with the new value in event.target.value
        const quantityInput = this.quantityInput(index);
        await quantityInput.fill(value);
        await quantityInput.blur(); // Ensure the input is focused
        // await quantityInput.dispatchEvent('change'); // Trigger change event if necessary        
    }

    removeIcon(index: number) {
        return this.page.locator('[data-testid="cart-item-remove"]').nth(index);
    }

    async removeItem(index: number) {
        const removeButton = this.removeIcon(index);
        await removeButton.click();
    }

    confirmationPopup() {
        return this.page.getByTestId('confirmation-popup');
    }

    confirmationPopupHeading() {
        return this.page.getByRole('heading', { name: 'Confirmation'});
    }

    confirmationButton(id: 'cancel-button' | 'confirm-button') {
        return this.page.getByTestId(id);
    }

    async cancelConfirmation() {
        await this.confirmationButton('cancel-button').click();
    }

    async confirmConfirmation() {
        await this.confirmationButton('confirm-button').click();
    }
}
