import React from "react";
import {render} from '@testing-library/react';
import {Provider} from "react-redux";

import {CartBadge} from "../../../../src/client/components/CartBadge";
import {getStore} from "../../../utils/getStore";

describe("Компонент CartBadge", () => {
    it("Отображается при наличии товара в корзине", () => {
        const cartData = {125: {name: "name", count: 100, price: 500}}

        const store = getStore(cartData);

        const {container} = render(
            <Provider store={store}>
                <CartBadge id={125}/>
            </Provider>
        );

        expect(container.childElementCount).toBeGreaterThan(0)
    });

    it("Возвращает null, если товара нет в корзине", () => {
        const store = getStore({});

        const {container} = render(
            <Provider store={store}>
                <CartBadge id={125}/>
            </Provider>
        );

        expect(container.childElementCount).toBe(0);
    });
});