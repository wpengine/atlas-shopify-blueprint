import classNames from 'classnames/bind';
import { Container, NavigationMenu } from '../../components';
import styles from './Footer.module.scss';

/**
 * Render the Footer component.
 *
 * @typedef {Object} MenuItems
 * @property {string} id The id value.
 * @property {string} path The path value.
 * @property {string} label The label value.
 * @property {string} parentId The parentId value.
 * @property {string} cssClasses The cssClasses value.
 * @property {Object} menu The menu object.
 *  @property {Object} node The node object.
 *   @property {string} name The name value.
 *
 * @param {Props} props The props object.
 * @param {string} props.title The title value.
 * @param {MenuItems} props.menuItems The menu items.
 *
 * @returns {React.ReactElement} The Footer component.
 */

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx('component')}>
      <Container>
        <NavigationMenu menuItems={menuItems} />
        <p
          className={cx('copyright')}
        >{`${title} © ${year}. Powered by WordPress.`}</p>
      </Container>
    </footer>
  );
}
