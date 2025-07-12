import { expect, test } from './fixtures/root.fixture'; // so you get every time new instance of RootPage


test.describe('Root Page Tests', () => {
    test('header title should be visible', async ({ rootPage }) => {
        await expect(rootPage.headerPageTitle).toBeVisible();
    });

    test(
        'flow: product load → add to cart → view cart → quantity increase/decrease',
        async ({ rootPage, productApiResponse, cartPage }) => {
            const { request, response, body } = productApiResponse;
            // Step 1: page already loaded via fixture
            // Step 2: Product load and wait for all api call to complete : productApiResponse

            expect(request).toBeTruthy();
            expect(response.status()).toBe(200);

            expect(body).toBeDefined(); // not undefined
            expect(body.length).toBeGreaterThan(0);

            // Step 3: Click "Add to Cart"
            await rootPage.clickFirstAddToCart();

            // Step 5: Assert item in cart
            await expect(cartPage.cartItems()).toHaveCount(1);

            // Step 6: Quantity input should exist
            await expect(cartPage.quantityInput(0)).toBeVisible();

            // Step 7: Check total price
            const priceText = await cartPage.totalPrice().innerText();
            console.log('Total Price:', priceText);

            // Step 8: Update quantity
            const newQty = '2';
            await cartPage.updateQuantity(0, newQty);

            // Step 9: Check total price
            const newPriceText = await cartPage.totalPrice().innerText();
            expect(newPriceText).not.toBe(priceText); // Ensure price has changed
            expect(+newPriceText).toBe((+priceText + +priceText)); // Ensure new quantity is reflected in price

            // Step 10: decrease quantity
            const afterDecrease = '1';
            await cartPage.updateQuantity(0, afterDecrease);

            // Step 9: Check total price
            const afterDecreaseText = await cartPage.totalPrice().innerText();
            expect(afterDecreaseText).toBe(priceText); // Ensure price has changed
        }
    );

    test(
        'flow: product load → multiple add to cart → remove item', 
        async ({ rootPage, productApiResponse, cartPage }) => {
            const { request, response, body } = productApiResponse;
            // Step 1: page already loaded via fixture
            // Step 2: Product load and wait for all api call to complete : productApiResponse

            expect(request).toBeTruthy();
            expect(response.status()).toBe(200);

            expect(body).toBeDefined(); // not undefined
            expect(body.length).toBeGreaterThan(0);

            // Step 3: Click "Add to Cart"
            await rootPage.clickFirstAddToCart();
            await rootPage.clickFirstAddToCart(1);
            await rootPage.clickFirstAddToCart(2);

            // Step 5: Assert items in cart
            await expect(cartPage.cartItems()).toHaveCount(3);

            const totalPrice = await cartPage.totalPrice().innerText();
            const priceToBe = body[0].price + body[1].price + body[2].price;
            expect(+totalPrice).toBe(priceToBe);

            // Step 6: Remove item
            await cartPage.removeItem(0);
            expect(cartPage.confirmationPopup()).toBeVisible();
            expect(cartPage.confirmationPopupHeading()).toBeVisible();
            // await expect(cartPage.cartItems()).toHaveCount(2);

            // Step 7: Check Cancel confirmation
            await cartPage.cancelConfirmation();
            expect(cartPage.confirmationPopup()).not.toBeVisible();

            // Step 7: Check Confirm confirmation
            await cartPage.removeItem(0);
            expect(cartPage.confirmationPopup()).toBeVisible();
            await cartPage.confirmConfirmation();
            await expect(cartPage.cartItems()).toHaveCount(2);

            // price check after delete.
            const newPriceText = await cartPage.totalPrice().innerText();
            const priceShouldBe = (body[1].price + body[2].price);
            expect(+newPriceText).toBe(priceShouldBe); // Ensure price has changed
        }
    )
});