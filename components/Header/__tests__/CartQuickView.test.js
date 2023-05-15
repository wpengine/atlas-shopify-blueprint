import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import { ShopifyCartProvider } from '../../../hooks/useShopifyCart';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CartQuickView } from '../CartQuickView';
import RETRIEVE_CART from '../../../queries/Cart';
import CREATE_CART from '../../../mutations/CreateCart';
import empty from '../../../data/stubs/cart/empty';
import multiple from '../../../data/stubs/cart/multiple';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ pathname: '/product/test-product' }),
}));

describe('<CartQuickView />', () => {
  it('displays the empty cart state on hover', () => {
    const createCartMock = {
      request: {
        query: CREATE_CART,
        variables: { input: {} },
      },
      result: { data: empty },
    };

    render(
      <MockedProvider mocks={[createCartMock]}>
        <ShopifyCartProvider>
          <CartQuickView styles={{}} />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    fireEvent.mouseOver(screen.getByTitle(/View your shopping cart/i));

    expect(screen.getByText(/You have no items in cart/i)).toBeVisible();
  });

  it('displays the items in cart', () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: multiple },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'atlas-shopify-cart=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
    });

    render(
      <MockedProvider mocks={[retrieveCartMock]}>
        <ShopifyCartProvider>
          <CartQuickView styles={{}} />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    fireEvent.mouseOver(screen.getByTitle(/View your shopping cart/i));
    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
    });
  });
});
