const { assert } = require("chai");

describe("Страница Catalog", async function () {
    afterEach(async function() {
        await this.browser.execute(() => localStorage.clear());
    });

    it('Страница сущетсвует', async function () {
        await this.browser.url("/hw/store/catalog");

        assert.isTrue((await this.browser.$$(".Catalog")).length > 0);
    });
})