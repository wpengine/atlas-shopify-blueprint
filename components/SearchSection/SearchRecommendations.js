import Link from 'next/link';
import styles from './SearchRecommendations.module.scss';

/**
 * Render the SearchRecommendations component.
 *
 * @returns {React.ReactElement} The SearchRecommendations component.
 */
export default function SearchRecommendations({ collections }) {
  return (
    <div className={styles.component}>
      <h4>Browse Collections</h4>
      <ul>
        {collections?.map?.((collection, index) => (
          <li key={collection.title + '-' + index ?? 0}>
            <Link href={'/product-collection/' + collection.handle ?? '#'}>
              <a>{collection.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
