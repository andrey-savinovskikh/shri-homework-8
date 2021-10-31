import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {Contacts} from "../../../../src/client/pages/Contacts";
import {CartState} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";

const getContacts = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const contacts = (
        <BrowserRouter>
            <Provider store={store}>
                <Contacts/>
            </Provider>
        </BrowserRouter>
    )

    return {store, contacts}
}

describe('Страница Contacts', () => {
    it('Корректная структура страницы', () => {
        const {contacts} = getContacts();
        const tree = renderer.create(contacts).toJSON();

        expect(tree).toMatchSnapshot();
    });
})