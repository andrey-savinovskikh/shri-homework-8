import React from "react";
import {render} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {ProductItem} from "../../../../src/client/components/ProductItem";
import {ProductShortInfo} from "../../../../src/common/types";
import {getStore} from "../../../utils/getStore";

describe("Компонент ProductItem", () => {
    it("В компоненте используются переданные параметры", () => {
        const testProduct: ProductShortInfo = {
            id: 2,
            name: "product",
            price: 15000,
        }

        const store = getStore();

        const {container} = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductItem product={testProduct}/>
                </Provider>
            </BrowserRouter>
        )

        const id = container.querySelector('.ProductItem').getAttribute('data-testid'),
            name = container.querySelector('.ProductItem-Name').textContent,
            price = container.querySelector('.ProductItem-Price').textContent,
            link = container.querySelector('.ProductItem-DetailsLink').getAttribute('href');

        container.querySelector('.ProductItem')

        expect(Number(id) === testProduct.id).toBeTruthy();
        expect(name === testProduct.name).toBeTruthy();
        expect(price === `$${testProduct.price}`).toBeTruthy();
        expect(link === `/catalog/${testProduct.id}`).toBeTruthy();
    });
})