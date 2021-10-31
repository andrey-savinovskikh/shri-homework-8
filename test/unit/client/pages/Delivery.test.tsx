import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {Delivery} from "../../../../src/client/pages/Delivery";
import {CartState} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";

const getDelivery = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const delivery = (
        <BrowserRouter>
            <Provider store={store}>
                <Delivery/>
            </Provider>
        </BrowserRouter>
    )

    return {store, delivery}
}

describe('Страница Delivery', () => {
    it('Корректная структура страницы', () => {
        const {delivery} = getDelivery();
        const tree = renderer.create(delivery).toJSON();

        expect(tree).toMatchSnapshot();
    });
})