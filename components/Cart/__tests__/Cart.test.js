import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ShopifyCartProvider } from '../../../hooks/useShopifyCart';
import CREATE_CART from '../../../mutations/CreateCart';
import RETRIEVE_CART from '../../../queries/Cart';
import REMOVE_FROM_CART from '../../../mutations/RemoveFromCart';
import empty from '../../../data/stubs/cart/empty';
import single from '../../../data/stubs/cart/single';
import multiple from '../../../data/stubs//cart/multiple';
import { CART_COOKIE } from '../../../constants/carts';
import Cart from '../Cart';
import UPDATE_CART_QUANTITY from '../../../mutations/QuantityCart';

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

  it('remove item from cart unsuccessfully and presents an error', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: multiple },
    };

    const removeFromCartMock = {
      request: {
        query: REMOVE_FROM_CART,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: [
            {
              quantity: 1,
              merchandiseId: 'gid://shopify/ProductVariant/44876432343343',
            },
          ],
        },
      },
      error: new Error('An error occurred'),
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[retrieveCartMock, removeFromCartMock]}
        addTypename={true}
      >
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
        expect(
          screen.getByText(
            /There was an issue removing this item from the cart./i
          )
        ).toBeVisible();
      });
    });
  });

  it('increases the item quantity by 1 and price change is reflected', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: single },
    };

    const increaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 2 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 2 } } } },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[retrieveCartMock, increaseQuantityMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByText(/1/i)).toBeVisible();

      const increase = screen.getByTestId('increase-button');
      fireEvent.click(increase);

      waitFor(() => {
        expect(screen.getByText(/3/i)).toBeVisible();
        expect(screen.getByText(/US$105.00/i)).toBeVisible();
      });
    });
  });

  it('increase the item until the max amount has been added and hides the notice when it is decreased again', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: single },
    };

    const increaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 1 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 1 } } } },
    };

    const maxAfterQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 4 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 3 } } } },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[retrieveCartMock, increaseQuantityMock, maxAfterQuantityMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByText(/2/i)).toBeVisible();

      const increase = screen.getByTestId('increase-button');
      fireEvent.click(increase);

      waitFor(() => {
        expect(screen.getByText(/3/i)).toBeVisible();
      });

      fireEvent.click(increase);

      waitFor(() => {
        expect(
          screen.getByText(
            /The maximum amount available for this product has been added to the cart./i
          )
        ).toBeVisible();
      });

      const decrease = screen.getByTestId('decrease-button');
      fireEvent.click(decrease);

      waitFor(() => {
        waitFor(() => {
          expect(screen.getByText(/2/i)).toBeVisible();
        });
        expect(
          screen.queryByText(
            /The maximum amount available for this product has been added to the cart./i
          )
        ).not.toBeVisible();
      });
    });
  });

  it('decreases the item quantity by 1 and price change is reflected', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: single },
    };

    const decreaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 1 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 1 } } } },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[retrieveCartMock, decreaseQuantityMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByText(/2/i)).toBeVisible();

      const decrease = screen.getByTestId('decrease-button');
      fireEvent.click(decrease);

      waitFor(() => {
        expect(screen.getByText(/1/i)).toBeVisible();
        expect(screen.getByText(/US$35.00/i)).toBeVisible();
      });
    });
  });

  it('decreases the item until its removed from cart', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: single },
    };

    const decreaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 1 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 1 } } } },
    };

    const removeAfterDecreaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 0 },
        },
      },
      result: { data: { cartLinesUpdate: { cart: { totalQuantity: 0 } } } },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[
          retrieveCartMock,
          decreaseQuantityMock,
          removeAfterDecreaseQuantityMock,
        ]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByText(/2/i)).toBeVisible();

      const decrease = screen.getByTestId('decrease-button');
      fireEvent.click(decrease);

      waitFor(() => {
        expect(screen.getByText(/1/i)).toBeVisible();
      });

      fireEvent.click(decrease);

      waitFor(() => {
        expect(
          screen.getByText(
            /Triangulum Hoodie has been removed from your cart./i
          )
        ).toBeVisible();
      });
    });
  });

  it('changes the quantity unsuccesfully and presents an error', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
        },
      },
      result: { data: single },
    };

    const decreaseQuantityMock = {
      request: {
        query: UPDATE_CART_QUANTITY,
        variables: {
          cartId: 'gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d',
          lines: { id: 'some-line-id', quantity: 1 },
        },
      },
      error: new Error('An error occurred'),
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-c63c275d6f27eb309d4efac08dee2e7d`,
    });

    render(
      <MockedProvider
        mocks={[retrieveCartMock, decreaseQuantityMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <Cart />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      expect(screen.getByText(/2/i)).toBeVisible();

      const decrease = screen.getByTestId('decrease-button');
      fireEvent.click(decrease);

      waitFor(() => {
        expect(screen.getByText(/2/i)).toBeVisible();
        expect(
          screen.getByText(/There was an issue changing this item's quantity/i)
        ).toBeVisible();
      });
    });
  });
});
