import React from "react";
import {render} from '@testing-library/react'

import {Product} from "../../../../src/common/types";
import {ProductDetails} from "../../../../src/client/components/ProductDetails";
import {getStore} from "../../../utils/getStore";
import {Provider} from "react-redux";

const testProduct: Product = {
    id: 2,
    name: "product",
    price: 15000,
    description: "some description",
    material: "some material",
    color: "some color"
}

describe("Компонент ProductDetails", () => {
    it("В компоненте используются переданные параметры", () => {
        const store = getStore();

        const {container} = render(
            <Provider store={store}>
                <ProductDetails product={testProduct}/>
            </Provider>
        )

        const name = container.querySelector('.ProductDetails-Name').textContent,
            price = container.querySelector('.ProductDetails-Price').textContent,
            material = container.querySelector('.ProductDetails-Material').textContent,
            color = container.querySelector('.ProductDetails-Color').textContent;

        expect(name === testProduct.name).toBeTruthy();
        expect(price === `$${testProduct.price}`).toBeTruthy();
        expect(material === testProduct.material).toBeTruthy();
        expect(color === testProduct.color).toBeTruthy();
    });
})