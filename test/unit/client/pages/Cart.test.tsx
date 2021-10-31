import React from 'react';
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom/extend-expect";
import {Provider} from "react-redux";
import {fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

import {Cart} from "../../../../src/client/pages/Cart";
import {getStore} from "../../../utils/getStore";
import {CartState} from "../../../../src/common/types";
import {addToCart} from "../../../../src/client/store";
import {PRODUCTS} from "../../../utils/mockApi";

const getCart = (initialCartData: CartState = {}) => {
    const store = getStore(initialCartData);

    const cart = (
        <BrowserRouter>
            <Provider store={store}>
                <Cart/>
            </Provider>
        </BrowserRouter>
    )

    return {store, cart}
}

const getFormElements = (renderResult: RenderResult) => {
    const {getByLabelText, getByText} = renderResult;

    const name = getByLabelText("Name"),
        phone = getByLabelText("Phone"),
        address = getByLabelText("Address"),
        submit = getByText("Checkout");

    fireEvent.change(name, {target: {value: "Name" }});
    fireEvent.change(phone, {target: {value: "9999999999"}});
    fireEvent.change(address, {target: {value: "Address"}});

    return {name, phone, address, submit}
}

const cartData = {
    1: {
        name: "product-1",
        price: 1000,
        count: 5
    },
    2: {
        name: "product-2",
        price: 2000,
        count: 1
    }
};

describe('Страница Cart', () => {
    it('Корректный снапшот страницы с пустой корзиной', () => {
        const {cart} = getCart();
        const tree = renderer.create(cart).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Корректный снапшот страницы с заполненной корзиной', () => {
        const {cart} = getCart(cartData);
        const tree = renderer.create(cart).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("Если есть товары в корзине, отображается форма заказа", () => {
        const {cart} = getCart(cartData);
        const {container} = render(cart);

        expect(container.querySelector(".Form")).toBeInTheDocument();
    });

    it("Если корзина пуста, то форма заказа скрыта", () => {
        const {cart} = getCart();
        const {container} = render(cart);

        expect(container.querySelector(".Form")).not.toBeInTheDocument();
    });

    it('Работает очистка корзины', () => {
        const {cart} = getCart(cartData);
        const {container, getByText} = render(cart);

        const btn = container.querySelector(".Cart-Clear");
        fireEvent.click(btn);

        expect(getByText("Cart is empty", {exact: false})).toBeInTheDocument();
    });

    it("При успешной отправке формы заказа отображается оповещение", async () => {
        const {cart} = getCart(cartData);
        const renderResult = render(cart);
        const {container} = renderResult;

        const {submit} = getFormElements(renderResult);

        submit.click();

        await waitFor(() => {
            const successMessage = container.querySelector(".Cart-SuccessMessage");

            expect(successMessage.textContent).toContain("Well done!");
        });
    });

    it("Товар добавляется в корзину", async () => {
        const {cart, store} = getCart();

        store.dispatch(addToCart(PRODUCTS[0]));

        expect(store.getState().cart).toStrictEqual({
            [PRODUCTS[0].id]: {
                name: PRODUCTS[0].name,
                price: PRODUCTS[0].price,
                count: 1,
            }
        })

        store.dispatch(addToCart(PRODUCTS[0]));

        expect(store.getState().cart).toStrictEqual({
            [PRODUCTS[0].id]: {
                name: PRODUCTS[0].name,
                price: PRODUCTS[0].price,
                count: 2,
            }
        })
    });

    // it("При успешной отправке формы заказа проиходит очистка корзины", async () => {
    //     const {cart} = getCart(cartData);
    //     const renderResult = render(cart);
    //     const {getByText} = renderResult;
    //
    //     const {submit} = getFormElements(renderResult);
    //
    //     submit.click();
    //
    //     await waitFor(() => {
    //         expect(getByText("Cart is empty", {exact: false})).toBeInTheDocument();
    //     });
    // });
})