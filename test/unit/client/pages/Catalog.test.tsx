import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {screen, waitFor, render} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {PRODUCTS} from "../../../utils/mockApi";
import {CartState} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";
import {Catalog} from "../../../../src/client/pages/Catalog";

const getCatalog = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const catalog = (
        <BrowserRouter>
            <Provider store={store}>
                <Catalog/>
            </Provider>
        </BrowserRouter>
    )

    return {store, catalog}
}

describe('Страница Catalog', () => {
    it('Корректный снапшот страницы без товаров', () => {
        const {catalog} = getCatalog();
        const tree = renderer.create(catalog).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('У товаров отображаются коректные данные', async () => {
        const {catalog} = getCatalog();
        render(catalog);

        await waitFor(() => {
            PRODUCTS.every((product, index) => {
                const item = screen.getAllByTestId(product.id)[1];

                const price = item.querySelector('.ProductItem-Price').innerHTML,
                    name = item.querySelector('.ProductItem-Name').innerHTML,
                    link = item.querySelector('.ProductItem-DetailsLink').getAttribute('href');

                expect(price.includes(String(product.price))).toBeTruthy();
                expect(name === product.name).toBeTruthy();
                expect(link === `/catalog/${product.id}`).toBeTruthy();
            });
        });
    });
})