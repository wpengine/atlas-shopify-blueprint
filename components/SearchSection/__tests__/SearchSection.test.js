import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { SEARCH_PRODUCT } from '../../../queries/Products';
import { resultsStub, noResultsStub } from '../../../data/stubs/search/results';
import collectionsStub from '../../../data/stubs/collections';
import SearchSection from '../SearchSection';

describe('<SearchSection', () => {
  test('Rendering the search components with a list of collections to browse', async () => {
    render(
      <MockedProvider>
        <SearchSection collections={collectionsStub.data.collections} />
      </MockedProvider>
    );

    const searchBar = await screen.findByRole('input', { name: /search/i });

    expect(searchBar).toBeVisible();
    expect(screen.getByText(/Browse Collections/i)).toBeInTheDocument();
  });

  test('Using the input with random string returns no results', async () => {
    const noResultsMock = {
      request: {
        query: SEARCH_PRODUCT,
        variables: {
          query: 'awfdfdf',
        },
      },
      result: noResultsStub,
    };

    render(
      <MockedProvider mocks={[noResultsMock]}>
        <SearchSection collections={collectionsStub.data.collections} />
      </MockedProvider>
    );

    const input = await screen.findByRole('input', { name: /search/i });
    fireEvent.change(input, { target: { value: 'awfdfdf' } });

    expect(screen.getAllByTestId('loading-result')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText(/No results/i)).toBeInTheDocument();
    });
  });

  test('Using the input with valid partial term returns results', async () => {
    const resultsMock = {
      request: {
        query: SEARCH_PRODUCT,
        variables: {
          query: 'hood',
        },
      },
      result: resultsStub,
    };

    render(
      <MockedProvider mocks={[resultsMock]}>
        <SearchSection collections={collectionsStub.data.collections} />
      </MockedProvider>
    );

    const input = await screen.findByRole('input', { name: /search/i });
    fireEvent.change(input, { target: { value: 'hood' } });

    expect(screen.getAllByTestId('loading-result')).toHaveLength(3);
    await waitFor(() => {
      expect(screen.getByText(/Triangulum Hoodie/i)).toBeInTheDocument();
      expect(screen.getByText(/Pinwheel Hoodie/i)).toBeInTheDocument();
    });
  });
});
