const {assert} = require("chai");

describe("Страница Cart", async function () {
    beforeEach(async function() {
        await this.browser.url("/hw/store/cart");
    });

    afterEach(async function() {
        await this.browser.execute(() => localStorage.clear());
    });

    it("Если корзина пустая, должна отображаться ссылка на каталог товаров", async function () {
        const href = await (await this.browser.$(".Cart a")).getAttribute("href");

        assert.equal(href, "/hw/store/catalog");
    });

    it('Содержимое корзины сохраняется при перазагрузке', async function() {
        await this.browser.url('/hw/store/catalog');

        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();

        await this.browser.url('/hw/store/cart');

        await this.browser.refresh();

        const count = await this.browser.$$('.Cart-Table > tbody > tr').length;

        assert.equal(count, 1);
    });

    it('Корректно работает добавление в корзину', async function() {
        await this.browser.setWindowSize(1600, 900);
        await this.browser.url('/hw/store/catalog');

        const product = await this.browser.$('.ProductItem:first-child');

        const id = await product.getAttribute("data-testid");

        await this.browser.$('.ProductItem:first-child .ProductItem-DetailsLink').click();

        const add = await this.browser.$('.ProductDetails-AddToCart');
        const cart = await this.browser.$(".nav-link[href*=cart]");

        const cartTextBefore = await cart.getText();

        await add.click();

        const cartTextAfterOneClick = await cart.getText();

        await add.click();

        const cartTextAfterSecondClick = await cart.getText();

        assert.isTrue(await this.browser.$(".CartBadge").isDisplayed());

        await this.browser.url('/hw/store/catalog');

        await this.browser.waitUntil(async () => {
            return await this.browser.$(`.ProductItem[data-testid="${id}"] .CartBadge`).isDisplayed();
        })

        assert.notEqual(cartTextBefore, cartTextAfterOneClick);
        assert.equal(cartTextAfterOneClick, cartTextAfterSecondClick);
    });

    // it('Корректно отображается кнопка очистки корзины', async function() {
    //     await this.browser.setWindowSize(1600, 900);
    //     await this.browser.url('/hw/store/catalog');
    //
    //     await this.browser.$('.ProductItem:first-child .ProductItem-DetailsLink').click();
    //     await this.browser.$('.ProductDetails-AddToCart').click();
    //
    //     await this.browser.url('/hw/store/cart');
    //
    //     const cartClear = await this.browser.$('.Cart-Clear');
    //
    //     await this.browser.assertView("Cart-Clear", '.Cart-Clear', {
    //         allowViewportOverflow: true,
    //     });
    //
    //     await cartClear.moveTo();
    //
    //     await this.browser.assertView("Cart-Clear_hover", '.Cart-Clear', {
    //         allowViewportOverflow: true,
    //         screenshotDelay: 250
    //     });
    // });
    //
    // it('Корректно отображается кнопка отпраки', async function() {
    //     await this.browser.setWindowSize(1600, 900);
    //     await this.browser.url('/hw/store/catalog');
    //
    //     await this.browser.$('.ProductItem:first-child .ProductItem-DetailsLink').click();
    //     await this.browser.$('.ProductDetails-AddToCart').click();
    //
    //     await this.browser.url('/hw/store/cart');
    //
    //     const submit = await this.browser.$('.Form-Submit');
    //
    //     await this.browser.assertView("Form-Submit", '.Form-Submit', {
    //         allowViewportOverflow: true,
    //     });
    //
    //     await submit.moveTo();
    //
    //     await this.browser.assertView("Form-Submit_hover", '.Form-Submit', {
    //         allowViewportOverflow: true,
    //         screenshotDelay: 250
    //     });
    // });

    // it('При повторном клике по товару происходит увеличение его количества', async function() {
    //     await this.browser.setWindowSize(1600, 900);
    //     await this.browser.url('/hw/store/catalog');
    //
    //     const product = await this.browser.$('.ProductItem:first-child');
    //
    //     const id = await product.getAttribute("data-testid");
    //
    //     await this.browser.$('.ProductItem:first-child .ProductItem-DetailsLink').click();
    //
    //     let add = await this.browser.$('.ProductDetails-AddToCart');
    //     await add.click();
    //
    //     await this.browser.url('/hw/store/cart');
    //
    //     const countBefore = await this.browser.$(`.Cart-Table tbody tr[data-testid="${id}"] .Cart-Count`).getText();
    //
    //     await this.browser.url(`/hw/store/catalog/${id}`);
    //
    //     add = await this.browser.$('.ProductDetails-AddToCart');
    //     await add.click();
    //
    //     await this.browser.url('/hw/store/cart');
    //
    //     const countAfter = await this.browser.$(`.Cart-Table tbody tr[data-testid="${id}"] .Cart-Count`).getText();
    //
    //     assert.equal(Number(countBefore) + 1, Number(countAfter));
    // });
})