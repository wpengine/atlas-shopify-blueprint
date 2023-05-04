import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor, within } from '@testing-library/react';
import ProductList from '../ProductList';
import { GET_PRODUCTS } from '../../../queries/Products';
import { GET_COLLECTION } from '../../../queries/Collections';
import productsStub from '../../../data/stubs/products';
import userEvent from '@testing-library/user-event';
import { FILTERS } from '../../../constants/filters';

describe('<ProductList />', () => {
  test('Rendering list of products', async () => {
    const productsMock = {
      request: {
        query: GET_PRODUCTS,
      },
      result: productsStub,
    };

    render(
      <MockedProvider mocks={[productsMock]} addTypename={true}>
        <ProductList />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading')).toBeVisible();
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toEqual(
        productsStub.data.products.nodes.length
      );
    });
  });

  test('checking the generated items after changing the sorting value - (PRICE_DESC)', async () => {
    const productsMock = {
      request: {
        query: GET_PRODUCTS,
      },
      result: productsStub,
    };

    const sortedNodes = productsStub.data.products.nodes.sort((a, b) => {
      const priceA = parseFloat(a.variants.nodes[0].price.amount);
      const priceB = parseFloat(b.variants.nodes[0].price.amount);
      return priceB - priceA;
    });

    const sortedProductsMock = {
      request: {
        query: GET_PRODUCTS,
        variables: {
          sortKey: FILTERS['price-desc'].sortKey,
        },
      },
      result: {
        data: {
          products: {
            nodes: sortedNodes,
          },
        },
      },
    };

    render(
      <MockedProvider
        mocks={[productsMock, sortedProductsMock]}
        addTypename={true}
      >
        <ProductList />
      </MockedProvider>
    );

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Price: High to Low' })
    );

    const allProducts = await screen.findAllByRole('listitem');
    const firstPrice = within(allProducts[0]).getByText('$35.0');
    const lastPrice = within(allProducts[allProducts.length - 1]).getByText(
      '$15.0'
    );

    expect(firstPrice).toBeInTheDocument();
    expect(lastPrice).toBeInTheDocument();
  });

  test('Rendering list of products by clothing collection', async () => {
    const collection = productsStub.data.products.nodes.filter((product) => {
      return product.collections.nodes.find(
        (collection) => collection.title === 'Clothing'
      );
    });

    const collectionsMock = {
      request: {
        query: GET_COLLECTION,
        variables: { handle: 'clothing' },
      },
      result: {
        data: {
          collection: {
            products: {
              nodes: collection,
            },
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[collectionsMock]} addTypename={true}>
        <ProductList collection='clothing' />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading')).toBeVisible();
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toEqual(
        collectionsMock.result.data.collection.products.nodes.length
      );
    });

    expect(screen.queryByText(/Toasty Cap Eco/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Andromeda Hoodie/i)).toBeInTheDocument();
  });

  test('Rendering list of products by apparel & accessories collection', async () => {
    const collection = productsStub.data.products.nodes.filter((product) => {
      return product.collections.nodes.find(
        (collection) => collection.title === 'Apparel & Accessories'
      );
    });

    const collectionsMock = {
      request: {
        query: GET_COLLECTION,
        variables: { handle: 'apparel-accessories' },
      },
      result: {
        data: {
          collection: {
            products: {
              nodes: collection,
            },
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[collectionsMock]} addTypename={true}>
        <ProductList collection='apparel-accessories' />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading')).toBeVisible();
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toEqual(
        collectionsMock.result.data.collection.products.nodes.length
      );
    });

    expect(screen.getByText(/Toasty Cap Eco/i)).toBeInTheDocument();
    expect(screen.queryByText(/Andromeda Hoodie/i)).not.toBeInTheDocument();
  });
});
