const {assert} = require("chai");

describe("Страница Delivery", async function () {
    beforeEach(async function() {
        await this.browser.url("/hw/store/delivery");
    })

    afterEach(async function() {
        await this.browser.execute(() => localStorage.clear());
    });

    it('Страница сущетсвует', async function () {
        assert.isTrue((await this.browser.$$(".Delivery")).length > 0);
    });

    it('Десктопная версия соответствует скриншотам', async function () {
        await this.browser.setWindowSize(1600, 900);

        await this.browser.assertView("Delivery", ".Application", {
            allowViewportOverflow: true,
        });
    });

    it('Мобильная версия соответствует скриншотам', async function () {
        await this.browser.setWindowSize(540, 960);

        await this.browser.assertView("Delivery_mobile", ".Application", {
            allowViewportOverflow: true,
        });
    });
})