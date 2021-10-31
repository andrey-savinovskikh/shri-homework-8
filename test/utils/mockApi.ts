import {CartState, CheckoutFormData, Product} from "../../src/common/types";

export class MockExampleApi {
    private basename: string;
    products: Product[] = PRODUCTS;

    constructor(basename: string) {
        this.basename = basename;
    }

    async getProducts() {
        const products = this.products.map((item) => {
            const {id, name, price} = item;
            return {id, name, price}
        })

        return {data: products};
    }

    async getProductById(id: number) {
        const product = this.products.find((item) => {
            return item.id === id
        })

        return {data: product};
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return {
            data: {id: 1}
        };
    }

    empty() {
        this.products = [];

        return this;
    }
}

export class MockCartApi {
    cartState: CartState;

    constructor(initialState: CartState = {}) {
        this.cartState = initialState;
    }

    getState() : CartState {
        return this.cartState
    }

    setState(cart: CartState) {
        this.cartState = cart
    }
}

export const PRODUCTS = [
    {
        id: 1,
        name: 'product1',
        price: 1000,
        description: "description1",
        color: "color1",
        material: "material1"
    },
    {
        id: 2,
        name: 'product2',
        price: 2000,
        description: "description2",
        color: "color2",
        material: "material2"
    },
    {
        id: 3,
        name: 'product3',
        price: 3000,
        description: "description3",
        color: "color3",
        material: "material3"
    },
    {
        id: 4,
        name: 'product4',
        price: 4000,
        description: "description4",
        color: "color4",
        material: "material4"
    }
]