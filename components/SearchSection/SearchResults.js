import { ProductCard } from '../ProductCard';
import LoadingSearchResult from './LoadingSearchResult';
import styles from './SearchResults.module.scss';

/**
 * Renders the search results list.
 *
 * @param {Props} props The props object.
 * @param {object[]} props.searchResults The search results list.
 * @param {boolean} props.isLoading Whether the search results are loading.
 * @returns {React.ReactElement} The SearchResults component.
 */

export default function SearchResults({ searchResults, isLoading }) {
  // If there are no results, or are loading, return null.
  if (!isLoading && searchResults === null) {
    return null;
  }

  // If there are no results, return a message.
  if (!isLoading && !searchResults?.length) {
    return <h1>No results</h1>;
  }

  return (
    <div className={styles.component}>
      <h1>Results</h1>

      <div className="shop-grid">
        {searchResults?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isLoading === true && (
        <>
          <LoadingSearchResult styles={styles} />
          <LoadingSearchResult styles={styles} />
          <LoadingSearchResult styles={styles} />
        </>
      )}
    </div>
  );
}
