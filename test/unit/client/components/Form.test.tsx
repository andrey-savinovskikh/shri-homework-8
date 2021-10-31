import * as React from "react";
import {fireEvent, render} from "@testing-library/react";

import {Form} from "../../../../src/client/components/Form";
import {CheckoutFormData} from "../../../../src/common/types";

const createForm = () => {
    const onSubmit = jest.fn((data: CheckoutFormData) => {});

    const {getByText, getByLabelText} = render(
        <Form onSubmit={onSubmit} />
    );

    const name = getByLabelText("Name"),
        phone = getByLabelText("Phone"),
        address = getByLabelText("Address"),
        btn = getByText("Checkout");

    return {onSubmit, name, phone, address, btn};
};

describe("Компонент Form", () => {
    it("При отправке формы с незаполненным полем Name возникает ошибка", () => {
        const {onSubmit, name, address, phone, btn} = createForm();

        fireEvent.change(phone, {target: {value: "9999999999"}});
        fireEvent.change(address, {target: {value: "address"}});

        btn.click();

        expect(name.classList.contains("is-invalid")).toBeTruthy();
    });

    it("При отправке формы с незаполненным полем Phone возникает ошибка", () => {
        const {name, address, phone, btn} = createForm();

        fireEvent.change(name, {target: {value: "name"}});
        fireEvent.change(address, {target: {value: "address"}});

        btn.click();

        expect(phone.classList.contains("is-invalid")).toBeTruthy();
    });

    it("При отправке формы с некорректным значением поля Phone возникает ошибка", () => {
        const {name, address, phone, btn} = createForm();

        fireEvent.change(name, {target: {value: "name"}});
        fireEvent.change(phone, {target: {value: "phone"}});
        fireEvent.change(address, {target: {value: "address"}});

        btn.click();

        expect(phone.classList.contains("is-invalid")).toBeTruthy();
    });

    it("При отправке формы с незаполненным полем Address возникает ошибка", () => {
        const {name, address, phone, btn} = createForm();

        fireEvent.change(name, {target: {value: "name"}});
        fireEvent.change(phone, {target: {value: "9999999999"}});

        btn.click();

        expect(address.classList.contains("is-invalid")).toBeTruthy();
    });

    // it("При корректно заполненных полях происходит отправка формы", () => {
    //     const {onSubmit, name, address, phone, btn} = createForm();
    //
    //     fireEvent.change(name, {target: {value: "name"}});
    //     fireEvent.change(phone, {target: {value: "+79999999999"}});
    //     fireEvent.change(address, {target: {value: "address"}});
    //
    //     btn.click();
    //
    //     expect(onSubmit.mock.calls.length).toBe(1);
    // });
});