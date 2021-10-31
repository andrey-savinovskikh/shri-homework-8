import React from "react";
import {render} from '@testing-library/react';

import {Image} from "../../../../src/client/components/Image";

describe("Компонент Image", () => {
    it("Добавляется переданный класс", () => {
        const {container} = render(
            <Image className={"custom-class"}/>
        );

        expect(container.querySelector("img").classList.contains("custom-class")).toBeTruthy();
    });
});