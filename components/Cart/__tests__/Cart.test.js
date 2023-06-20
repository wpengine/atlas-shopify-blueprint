import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  within,
} from '@testing-library/react';
import { ShopifyCartProvider } from '../../../hooks/useShopifyCart';
import CREATE_CART from '../../../mutations/CreateCart';
import RETRIEVE_CART from '../../../queries/Cart';
import REMOVE_FROM_CART from '../../../mutations/RemoveFromCart';
import empty from '../../../data/stubs/cart/empty';
import { CART_COOKIE } from '../../../constants/carts';
import Cart from '../Cart';
import UPDATE_CART_QUANTITY from '../../../mutations/QuantityCart';
import {
  cartMultiple,
  removeFromCartMultiple,
} from '../../../data/stubs/cart/cartMultiple';
import {
  cartSingle,
  increaseFromCartSingle,
  decreaseFromCartSingle,
  increasedCartSingle,
  decreaseCartSingle,
  removeAfterDecreaseCartSingle,
} from '../../../data/stubs/cart/cartSingle';

describe('<Cart />', () => {
  describe('When Shopify Configuration is available', () => {
    it('displays the empty cart state', async () => {
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

      expect(
        await screen.findByText(/You have no items in cart/i)
      ).not.toBeNull();
    });

    it('displays the items in cart and the checkout url is applied', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartMultiple },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
      });

      render(
        <MockedProvider mocks={[retrieveCartMock]} addTypename={true}>
          <ShopifyCartProvider>
            <Cart />
          </ShopifyCartProvider>
        </MockedProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByTestId('checkout-btn')).toHaveAttribute(
          'href',
          'https://blueprintbetatest.myshopify.com/cart/c/c1-74d26c3130aa39e303d99d4d430c6eca'
        );
      });
    });

    it('remove item from cart successfully', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartMultiple },
      };

      const removeFromCartMock = {
        request: {
          query: REMOVE_FROM_CART,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lineIds: [
              'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
            ],
          },
        },
        result: { data: removeFromCartMultiple },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByText(/Topography Shirt/i)).toBeVisible();
      });

      const remove = await screen.getByTestId('remove-button-gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca');

      act(() => {
        fireEvent.click(remove);
      });

      await waitFor(() => {
        expect(
          screen.queryByText(
            /Triangulum Hoodie has been removed from your cart./i
          )
        ).toBeVisible();
        expect(screen.getByText(/Topography Shirt/i)).toBeVisible();
      });
    });

    it('remove item from cart unsuccessfully and presents an error', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartMultiple },
      };

      const removeFromCartMock = {
        request: {
          query: REMOVE_FROM_CART,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lineIds: [
              'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
            ],
          },
        },
        error: new Error('An error occurred'),
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
      });

      const remove = await screen.getByTestId('remove-button-gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca');

      act(() => {
        fireEvent.click(remove);
      });

      await waitFor(() => {
        const prices = screen.getAllByText('$75.00');
        for (let price of prices) {
          expect(price).toBeVisible();
        }
      });
    });

    it('increases the item quantity by 1 and price change is reflected', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartSingle },
      };

      const increaseQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 2,
            },
          },
        },
        result: { data: increaseFromCartSingle },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        const quantitySection = screen.getByLabelText('quantity-section');
        expect(within(quantitySection).getByText('1')).toBeVisible();
      });

      const increase = await screen.getByTestId('increase-button');

      act(() => {
        fireEvent.click(increase);
      });

      await waitFor(() => {
        const prices = screen.getAllByText('$105.00');
        for (let price of prices) {
          expect(price).toBeVisible();
        }
      });
    });

    it('increase the item until the max amount has been added and hides the notice when it is decreased again', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartSingle },
      };

      const increaseQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 2,
            },
          },
        },
        result: { data: increaseFromCartSingle },
      };

      const increaseMaxQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 3,
            },
          },
        },
        result: { data: increaseFromCartSingle },
      };

      const decreaseMaxQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 1,
            },
          },
        },
        result: { data: decreaseFromCartSingle },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
      });

      render(
        <MockedProvider
          mocks={[
            retrieveCartMock,
            increaseQuantityMock,
            increaseMaxQuantityMock,
            decreaseMaxQuantityMock,
          ]}
          addTypename={true}
        >
          <ShopifyCartProvider>
            <Cart />
          </ShopifyCartProvider>
        </MockedProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByLabelText('item-quantity-1-gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca')).toBeInTheDocument();
      });

      const increaseButton = await screen.getByTestId('increase-button');

      // add one item - increase to 2
      act(() => {
        fireEvent.click(increaseButton);
      });

      await waitFor(() => {
        expect(screen.getByLabelText('item-quantity-2-gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca')).toBeInTheDocument();
      });

      // add another which can't go beyond 2
      act(() => {
        fireEvent.click(increaseButton);
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            /The maximum amount available for this product has been added to the cart./i
          )
        ).toBeVisible();
        expect(
          screen.getByText(
            /The maximum amount available for this product has been added to the cart./i
          )
        ).toBeInTheDocument();
      });

      const decrease = await screen.getByTestId('decrease-button');

      act(() => {
        fireEvent.click(decrease);
      });

      await waitFor(() => {
        expect(
          screen.queryByText(
            /The maximum amount available for this product has been added to the cart./i
          )
        ).not.toBeInTheDocument();
        expect(screen.getByLabelText('item-quantity-1-gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca')).toBeInTheDocument();
      });
    });

    it('decreases the item quantity by 1 and price change is reflected', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: increasedCartSingle },
      };

      const decreaseQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 1,
            },
          },
        },
        result: { data: decreaseCartSingle },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByText(/2/i)).toBeVisible();
      });

      const decrease = await screen.getByTestId('decrease-button');

      act(() => {
        fireEvent.click(decrease);
      });

      await waitFor(() => {
        const summaryElement = screen.getByTestId('summary');
        const pricesFromSummary = within(summaryElement).getAllByText('$35.00');

        for (let price of pricesFromSummary) {
          expect(price).toBeVisible();
        }
      });
    });

    it('decreases the item until its removed from cart', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartSingle },
      };

      const decreaseQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 0,
            },
          },
        },
        result: { data: removeAfterDecreaseCartSingle },
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByText(/1/i)).toBeVisible();
      });

      const decrease = await screen.getByTestId('decrease-button');

      act(() => {
        fireEvent.click(decrease);
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            /Triangulum Hoodie has been removed from your cart./i
          )
        ).toBeVisible();
      });
    });

    it('changes the quantity unsuccessfully and presents an error', async () => {
      const retrieveCartMock = {
        request: {
          query: RETRIEVE_CART,
          variables: {
            id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          },
        },
        result: { data: cartSingle },
      };

      const decreaseQuantityMock = {
        request: {
          query: UPDATE_CART_QUANTITY,
          variables: {
            cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
            lines: {
              id: 'gid://shopify/CartLine/4d7efdf2-e95c-4792-b55d-914e3626f6e6?cart=c1-74d26c3130aa39e303d99d4d430c6eca',
              quantity: 1,
            },
          },
        },
        error: new Error('An error occurred'),
      };

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
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

      await waitFor(() => {
        expect(screen.getByText(/Triangulum Hoodie/i)).toBeVisible();
        expect(screen.getByText(/1/i)).toBeVisible();
      });

      const decrease = await screen.getByTestId('decrease-button');

      act(() => {
        fireEvent.click(decrease);
      });

      await waitFor(() => {
        expect(screen.getByText(/1/i)).toBeVisible();
        expect(
          screen.getByText(/There was an issue changing this item's quantity/i)
        ).toBeVisible();
      });
    });
  });
  describe('When Shopify configuration is not available', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      delete process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN;
      delete process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL;
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('displays the ConnectionUnavailable component', async () => {
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

      expect(
        await screen.findByText(/To get started connecting your Shopify store/i)
      ).not.toBeNull();
    });
  });
});
