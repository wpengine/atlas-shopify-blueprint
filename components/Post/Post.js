import Link from 'next/link';
import { FeaturedImage } from '../FeaturedImage';
import { PostInfo } from '../PostInfo';
import styles from './Post.module.scss';

/**
 * Render the Post component.
 *
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @param {Props} props The props object.
 * @param {string} props.title The title value.
 * @param {string} props.content The content value.
 * @param {Date} props.date The date input.
 * @param {string} props.author The author value.
 * @param {string} props.uri The uri value.
 * @param {Image} props.featuredImage The Image object.
 *
 * @returns {React.ReactElement} The Post component.
 */

export default function Post({
  title,
  content,
  date,
  author,
  uri,
  featuredImage,
}) {
  return (
    <article className={styles.component}>
      {featuredImage && (
        <Link href={uri}>
          <a>
            <FeaturedImage
              image={featuredImage}
              layout="responsive"
              className={styles.featuredImage}
            />
          </a>
        </Link>
      )}

      <Link href={uri}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <PostInfo date={date} author={author} className={styles.postInfo} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
