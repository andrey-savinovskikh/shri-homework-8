import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import {render} from '@testing-library/react';
import {Router} from "react-router";
import {Provider} from "react-redux";

import {CartState} from "../../../src/common/types";
import {getStore} from "../../utils/getStore";
import {Application} from "../../../src/client/Application";
import {createMemoryHistory} from "history";


const getApplication = (initialCartData: CartState = {}, url?: string) => {
  const store = getStore(initialCartData);

  const history = createMemoryHistory({
    initialEntries: url ? [url] : ["/"],
    initialIndex: 0
  });

  const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application/>
        </Provider>
      </Router>
  )

  return {store, application}
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

describe('Компонент Application', () => {
  it('Происходит рендер компонента', () => {
    const {application} = getApplication();
    const {container} = render(application);

    expect(container.getElementsByClassName('Application')).toHaveProperty('length', 1)
  });

  describe("Панель навигации", () => {
    it('Не отображается количество товаров, если корзина пуста', () => {
      const {application} = getApplication();
      const {getByRole} = render(application);

      getByRole('link', {name: `Cart`});
    });

    it('Отображается количество товаров, если в корзине есть товары', () => {
      const {application} = getApplication(cartData);
      const {getByRole} = render(application);

      const count = Object.keys(cartData).length;

      getByRole('link', {name: `Cart (${count})`});
    });

    it('Есть все ссылки, атрибуты href правильные', () => {
      const {application} = getApplication();

      const {getByRole} = render(application);

      const rootLink = getByRole('link', {name: /Example store/i});
      const catalogLink = getByRole('link', {name: /catalog/i});
      const deliveryLink = getByRole('link', {name: /delivery/i});
      const contactsLink = getByRole('link', {name: /contacts/i});
      const cartLink = getByRole('link', {name: /cart/i});

      expect(rootLink).toBeInTheDocument();
      expect(catalogLink).toBeInTheDocument();
      expect(deliveryLink).toBeInTheDocument();
      expect(contactsLink).toBeInTheDocument();
      expect(cartLink).toBeInTheDocument();

      expect(rootLink).toHaveAttribute('href', '/');
      expect(catalogLink).toHaveAttribute('href', '/catalog');
      expect(deliveryLink).toHaveAttribute('href', '/delivery');
      expect(contactsLink).toHaveAttribute('href', '/contacts');
      expect(cartLink).toHaveAttribute('href', '/cart');
    })
  })

  describe('Роутинг', () => {
    it('Страница Catalog', () => {
      const {application} = getApplication({}, "/catalog");
      const {container} = render(application);

      expect(container.getElementsByClassName('Catalog')).toHaveProperty('length', 1)
    });

    it('Страница Cart', () => {
      const {application} = getApplication({}, "/cart");
      const {container} = render(application);

      expect(container.getElementsByClassName('Cart')).toHaveProperty('length', 1)
    });

    it('Страница Product', () => {
      const {application} = getApplication({}, "/catalog/1");
      const {container} = render(application);

      expect(container.getElementsByClassName('Product')).toHaveProperty('length', 1)
    });

    it('Страница Delivery', () => {
      const {application} = getApplication({}, "/delivery");
      const {container} = render(application);

      expect(container.getElementsByClassName('Delivery')).toHaveProperty('length', 1)
    });

    it('Страница Home', () => {
      const {application} = getApplication({}, "/");
      const {container} = render(application);

      expect(container.getElementsByClassName('Home')).toHaveProperty('length', 1)
    });

    it('Страница Contacts', () => {
      const {application} = getApplication({}, "/contacts");
      const {container} = render(application);

      expect(container.getElementsByClassName('Contacts')).toHaveProperty('length', 1)
    });
  })
})