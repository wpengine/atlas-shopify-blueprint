import className from 'classnames/bind';
import styles from './ContentWrapper.module.scss';

/**
 * Render the ContentWrapper component.
 *
 * @param {Props} props The props object.
 * @param {string} props.content The content value.
 * @param {children: JSX.Element} props.children The children components.
 *
 * @returns {React.ReactElement} The ContentWrapper components.
 */

let cx = className.bind(styles);

export default function ContentWrapper({ content, children }) {
  return (
    <article className={cx('component')}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
