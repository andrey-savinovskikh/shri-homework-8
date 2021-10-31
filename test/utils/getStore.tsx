import {MockCartApi, MockExampleApi} from "./mockApi";
import {CartState} from "../../src/common/types";
import {initStore} from "../../src/client/store";
import {ExampleApi} from "../../src/client/api";

export const getStore = (initialCartData: CartState = {}) => {
    const basename = "/hw/store";

    const exampleApi = new MockExampleApi(basename) as unknown as ExampleApi,
        cartApi = new MockCartApi(initialCartData);

    return initStore(exampleApi, cartApi);
};