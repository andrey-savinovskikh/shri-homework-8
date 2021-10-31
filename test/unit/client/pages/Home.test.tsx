import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {CartState} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";
import {Home} from "../../../../src/client/pages/Home";

const getHome = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const home = (
        <BrowserRouter>
            <Provider store={store}>
                <Home/>
            </Provider>
        </BrowserRouter>
    )

    return {store, home}
}

describe('Страница Home', () => {
    it('Корректная структура страницы', () => {
        const {home} = getHome();
        const tree = renderer.create(home).toJSON();

        expect(tree).toMatchSnapshot();
    });
})