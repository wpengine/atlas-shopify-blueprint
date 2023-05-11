import { Container } from '../Container';
import SearchInput from './SearchInput';
import SearchRecommendations from './SearchRecommendations';
import SearchResults from './SearchResults';
import useSearch from '../../hooks/useSearch';
import styles from './SearchSection.module.scss';

const SearchSection = ({ collections }) => {
  const { searchQuery, setSearchQuery, searchResults, isLoading, error } =
    useSearch();

  return (
    <Container>
      <div className={styles.component}>
        <h2 className={styles['search-header-text']}>
          {searchQuery && !isLoading
            ? `Showing results for "${searchQuery}"`
            : `Search`}
        </h2>
        <SearchInput
          value={searchQuery}
          onChange={(newValue) => setSearchQuery(newValue)}
        />
      </div>
      {error && (
        <div className="alert-error">
          An error has occurred. Please refresh and try again.
        </div>
      )}

      <SearchResults searchResults={searchResults} isLoading={isLoading} />

      {!isLoading && searchResults === null && (
        <SearchRecommendations collections={collections} />
      )}
    </Container>
  );
};

export default SearchSection;
