import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ShopifyCartProvider } from '../../../hooks/useShopifyCart';
import CREATE_CART from '../../../mutations/CreateCart';
import RETRIEVE_CART from '../../../queries/Cart';
import empty from '../../../data/stubs/cart/empty';
import multiple from '../../../data/stubs//cart/multiple';
import { CART_COOKIE } from '../../../constants/carts';
import Cart from '../Cart';

describe('<Cart />', () => {
  it('displays the empty cart state', () => {
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
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/You have no items in cart/i)).toBeVisible();
    });
  });

  it('displays the items in cart and the checkout url is applied', async () => {
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
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider mocks={[retrieveCartMock]} addTypename={true}>
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByTestId('checkout-btn')).toHaveAttribute(
        'href',
        'https://blueprintbetatest.myshopify.com/cart/c/c1-6bcda1657c8fa22e7188b08d5b217a2a'
      );
    });
  });

  it('remove item from cart successfully', async () => {
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
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider mocks={[retrieveCartMock]} addTypename={true}>
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();

      const remove = screen.getByText(/Triangulum Hoodie/i).closest('svg');
      fireEvent.click(remove);

      waitFor(() => {
        expect(screen.queryByText(/Triangulum Hoodie/i)).not.toBeVisible();
        expect(
          screen.getByText(
            /Triangulum Hoodie has been removed from your cart./i
          )
        ).toBeVisible();
      });
    });
  });
});
