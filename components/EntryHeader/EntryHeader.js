import className from 'classnames/bind';
import { Heading, PostInfo, Container, FeaturedImage } from '../../components';
import styles from './EntryHeader.module.scss';

/**
 * Render the EntryHeader component.
 *
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @param {Props} props The props object.
 * @param {string} props.title The title value.
 * @param {string} props.subTitle The subTitle value.
 * @param {Image} props.image The image object.
 * @param {Date} props.date The date value.
 * @param {string} props.author The author value.
 * @param {string} props.className The className value.
 *
 * @returns {React.ReactElement} The EntryHeader components.
 */

let cx = className.bind(styles);

export default function EntryHeader({
  title,
  subTitle,
  image,
  date,
  author,
  className,
}) {
  const hasText = title || date || author;

  return (
    <div className={cx(['component', className])}>
      {image && (
        <FeaturedImage image={image} className={cx('image')} priority />
      )}

      {hasText && (
        <div className={cx('text', { 'has-image': image })}>
          <Container>
            {!!title && <Heading className={cx('title')}>{title}</Heading>}
            <PostInfo
              className={cx('byline')}
              author={author}
              subTitle={subTitle}
              date={date}
            />
          </Container>
        </div>
      )}
    </div>
  );
}
