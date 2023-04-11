import Link from 'next/link';
import styles from './SearchRecommendations.module.scss';

/**
 * Render the SearchRecommendations component.
 *
 * @returns {React.ReactElement} The SearchRecommendations component.
 */
export default function SearchRecommendations({ categories }) {
  return (
    <div className={styles.component}>
      <h4>Browse by Category</h4>
      <ul>
        {categories?.map?.((category, index) => (
          <li key={category + '-' + index ?? 0}>
            <Link href={'/product-category/' + category.toLowerCase() ?? '#'}>
              <a>{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
