const {assert} = require("chai");

describe("Компонент Application", async function () {
    afterEach(async function() {
        await this.browser.execute(() => localStorage.clear());
    });

    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function () {
        await this.browser.url("/hw/store");
        await this.browser.setWindowSize(540, 960);

        const hamburger = await this.browser.$('.navbar-toggler'),
            menu = await this.browser.$('.navbar-collapse');

        assert.isFalse(await menu.isDisplayed());

        hamburger.click();

        assert.isTrue(await menu.isDisplayed());
    });

    it('При выборе элемента из меню "гамбургера", меню должно закрываться', async function () {
        await this.browser.url("/hw/store");
        await this.browser.setWindowSize(540, 960);

        const hamburger = await this.browser.$('.navbar-toggler'),
            menu = await this.browser.$('.navbar-collapse');

        await hamburger.click();

        await (await menu.$('.nav-link')).click();

        assert.isFalse(await menu.isDisplayed())
    });
});