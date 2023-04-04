import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { FaBars, FaSearch } from 'react-icons/fa';
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
} from '../../components';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx('component')}>
      <SkipNavigationLink />
      <Container>
        <div className={cx('navbar')}>
          <div className={cx('brand')}>
            <Link href='/'>
              <a className={cx('title')}>{title}</a>
            </Link>
            {description && <p className={cx('description')}>{description}</p>}
          </div>
          <div className={styles['search']}>
            <Link href='/search'>
              <a>
                <FaSearch title='Search' role='img' style={{ fill: 'white' }} />
              </a>
            </Link>
          </div>
          <button
            type='button'
            className={cx('nav-toggle')}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label='Toggle navigation'
            aria-controls={cx('primary-navigation')}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>
          <NavigationMenu
            className={cx([
              'primary-navigation',
              isNavShown ? 'show' : undefined,
            ])}
            menuItems={menuItems}
          />
        </div>
      </Container>
    </header>
  );
}
