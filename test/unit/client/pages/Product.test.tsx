import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {Provider} from "react-redux";
import {render, waitFor} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import {BrowserRouter} from "react-router-dom";

import {Product} from "../../../../src/client/pages/Product";
import {CartState} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";
import {PRODUCTS} from "../../../utils/mockApi";
import {Application} from "../../../../src/client/Application";

const getProduct = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const product = (
        <BrowserRouter>
            <Provider store={store}>
                <Product/>
            </Provider>
        </BrowserRouter>
    )

    return {store, product}
}

const testProduct = PRODUCTS[1];

describe('Страница Product', () => {
    it('Корректная структура страницы', () => {
        const {product} = getProduct();
        const tree = renderer.create(product).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Отображаются все данные товара и кнопка купить', async () => {
        const store = getStore();

        const history = createMemoryHistory({
            initialEntries: ["/catalog/2"],
            initialIndex: 0
        });

        const application = (
            <Router history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        )

        render(application);

        await waitFor(() => {
            const container = document.querySelector('.Application')

            const name = container.querySelector('.ProductDetails-Name').innerHTML,
                description = container.querySelector('.ProductDetails-Description').innerHTML,
                price = container.querySelector('.ProductDetails-Price').innerHTML,
                material = container.querySelector('.ProductDetails-Material').innerHTML,
                color = container.querySelector('.ProductDetails-Color').innerHTML,
                add = container.querySelector('.ProductDetails-AddToCart');

            expect(price.includes(String(testProduct.price))).toBeTruthy();
            expect(name === testProduct.name).toBeTruthy();
            expect(description === testProduct.description).toBeTruthy();
            expect(material === testProduct.material).toBeTruthy();
            expect(color === testProduct.color).toBeTruthy();
            expect(add).not.toBeNull();
        });
    });
})