import '@testing-library/jest-dom';
import RETRIEVE_CART from '../../../queries/Cart';
import ADD_TO_CART from '../../../mutations/AddToCart';
import {
  cartMultiple,
  addToCartMultiple,
  disabledButtonCartMultiple,
} from '../../../data/stubs/cart/cartMultiple';
import { MockedProvider } from '@apollo/react-testing';
import { ShopifyCartProvider } from '../../../hooks/useShopifyCart';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import productsStub from '../../../data/products';
import { CART_COOKIE } from '../../../constants/carts';
import { ProductDetails } from '..';

describe('<ProductDetails />', () => {
  global.scrollTo = jest.fn();
  it('displays a product with no variants', () => {
    const noVariantsProduct = productsStub.data.products.nodes[0];

    render(<ProductDetails product={noVariantsProduct} />);

    expect(screen.getByText(/Radiowave Shirt/i)).toBeInTheDocument();
  });

  it('displays a product with variants', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/Triangulum Hoodie/i)).toBeInTheDocument();
  });

  it('displays a product with compare at price crossed out', () => {
    const variantsProduct = productsStub.data.products.nodes[0];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/Radiowave Shirt/i)).toBeInTheDocument();
    expect(screen.getByTestId('compare-price')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeVisible();
    expect(screen.getByText('$18.00')).toBeVisible();
  });

  it('displays a product with only one current price', () => {
    const variantsProduct = productsStub.data.products.nodes[1];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/Quark Shirt/i)).toBeInTheDocument();
    expect(screen.queryByTestId('compare-price')).not.toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeVisible();
    expect(screen.queryByText('$18.00')).not.toBeInTheDocument();
  });

  it('changes the image and the colour at the same time', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/TRI-1/i)).toBeInTheDocument();
    expect(screen.queryByText(/TRI-2/i)).not.toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-blue').getAttribute('checked')
    ).toBe('');

    const selectedImage = screen.getByTestId('slide-image-1');

    act(() => {
      fireEvent.click(selectedImage);
    });

    expect(screen.queryByText(/TRI-1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/TRI-2/i)).toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-purple').getAttribute('checked')
    ).toBe('');
  });

  it('changes the colour and the image at the same time', () => {
    const variantsProduct = productsStub.data.products.nodes[3];
    render(<ProductDetails product={variantsProduct} />);

    expect(screen.getByText(/TRI-1/i)).toBeInTheDocument();
    expect(screen.queryByText(/TRI-2/i)).not.toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-blue').getAttribute('checked')
    ).toBe('');

    const selectedColour = screen.getByTestId('variant-option-purple');

    act(() => {
      fireEvent.click(selectedColour);
    });

    expect(screen.queryByText(/TRI-1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/TRI-2/i)).toBeInTheDocument();
    expect(
      screen.getByTestId('variant-option-purple').getAttribute('checked')
    ).toBe('');
  });

  it('disables the button if the amount available is already added to the cart', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
        },
      },
      result: { data: disabledButtonCartMultiple },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
    });

    const variantsProduct = productsStub.data.products.nodes[7];

    render(
      <MockedProvider mocks={[retrieveCartMock]} addTypename={true}>
        <ShopifyCartProvider>
          <ProductDetails product={variantsProduct} />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Add to cart/i).closest('button')).toBeDisabled();
    });
  });

  it('adds an item to the cart successfully', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
        },
      },
      result: { data: cartMultiple },
    };

    const addToCartMock = {
      request: {
        query: ADD_TO_CART,
        variables: {
          cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
          lines: [
            {
              quantity: 1,
              merchandiseId: 'gid://shopify/ProductVariant/44876432343343',
            },
          ],
        },
      },
      result: { data: addToCartMultiple },
    };

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
    });

    const variantsProduct = productsStub.data.products.nodes[0];

    render(
      <MockedProvider
        mocks={[retrieveCartMock, addToCartMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <ProductDetails product={variantsProduct} />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('button').dataset.cartId).toBe(
        'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca'
      );
    });

    act(() => {
      fireEvent.click(screen.getByText(/Add to cart/i).closest('button'));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Radiowave Shirt has been added to your cart/i)
      ).toBeVisible();
    });
  });

  it('adds an item to the cart unsuccessfully and presents an error', async () => {
    const retrieveCartMock = {
      request: {
        query: RETRIEVE_CART,
        variables: {
          id: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
        },
      },
      result: { data: cartMultiple },
    };

    const addToCartMock = {
      request: {
        query: ADD_TO_CART,
        variables: {
          cartId: 'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca',
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
      value: `${CART_COOKIE}=gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca`,
    });

    const variantsProduct = productsStub.data.products.nodes[0];

    render(
      <MockedProvider
        mocks={[retrieveCartMock, addToCartMock]}
        addTypename={true}
      >
        <ShopifyCartProvider>
          <ProductDetails product={variantsProduct} />
        </ShopifyCartProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('button').dataset.cartId).toBe(
        'gid://shopify/Cart/c1-74d26c3130aa39e303d99d4d430c6eca'
      );
    });

    act(() => {
      fireEvent.click(screen.getByText(/Add to cart/i).closest('button'));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/There was an issue adding this item to the cart/i)
      ).toBeVisible();
    });
  });
});
