import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { SEARCH_PRODUCT } from '../queries/Products';

const searchInputDebounceMs = 500;

/**
 * useSearch hook enables a user to perform search functionality from their Shopify site
 * with proper debouncing of the search input.
 *
 * @returns {{searchQuery: string, setSearchQuery: (newValue) => void, searchResults: object[] | null, loadMore: () => void, isLoading: boolean}} Result object
 */
function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(
    searchQuery,
    searchInputDebounceMs
  );
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch results based on the search query and cursor if we are paginating.
   * @param {string} searchQuery The user inputted search query
   * @returns
   */

  const [
    fetchResults,
    { data: searchData, error: searchError },
  ] = useLazyQuery(SEARCH_PRODUCT);

  /**
   * Fetch initial results. This can happen either upon first search. Or after
   * a search query has been deleted and the user types a new search query.
   */
  const fetchInitialResults = useCallback(async () => {
    setIsLoading(true);

    clearResults();
    fetchResults({ variables: { query: debouncedSearchQuery } });
  }, [debouncedSearchQuery, fetchResults]);

  function clearResults() {
    setSearchResults(null);
  }

  useEffect(() => {
    if (searchData) {
      setSearchResults(searchData?.products?.nodes);

      setIsLoading(false);
    }

    if (searchError) {
      setError(searchError);
    }
  }, [searchData, searchError]);

  /**
   * Upon user input, display the loading screen for perceived performance,
   * even though we will not start fetching data until the debounce timeout.
   */
  useEffect(() => {
    if (searchQuery !== '' && searchResults === null) {
      setIsLoading(true);
    }
  }, [searchQuery, searchResults]);

  /**
   * When the search query input has been cleared, clear the results.
   */
  useEffect(() => {
    if (searchQuery === '') {
      clearResults();
    }
  }, [searchQuery]);

  /**
   * Fetch the initial results once the user has entered a search query and
   * the debounce timeout has been reached.
   */
  useEffect(() => {
    if (debouncedSearchQuery === '') {
      clearResults();

      return;
    }

    fetchInitialResults(debouncedSearchQuery);
  }, [debouncedSearchQuery, fetchInitialResults]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
  };
}

export default useSearch;
