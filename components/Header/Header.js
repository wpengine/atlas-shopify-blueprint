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
import dynamic from 'next/dynamic';

const CartQuickView = dynamic(() => import('./CartQuickView'), { ssr: false });

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  const navClasses = cx([
    styles['primary-navigation'],
    isNavShown ? styles['show'] : undefined,
  ]);

  return (
    <header className={styles.component}>
      <SkipNavigationLink />
      <Container>
        <div className={styles.bar}>
          <div className={styles.logo}>
            <Link href="/">
              <a title="Home">
                <h3>{title}</h3>
                <span>{description}</span>
              </a>
            </Link>
          </div>

          <div className={styles.search}>
            <Link href="/search">
              <a>
                <FaSearch title="Search" role="img" />
              </a>
            </Link>
          </div>

          <button
            type="button"
            className={styles['nav-toggle']}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={styles['primary-navigation']}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>
        </div>

        <div className={styles['nav-cart-bar']}>
          <NavigationMenu
            id={styles['primary-navigation']}
            className={navClasses}
            menuItems={menuItems}
          ></NavigationMenu>

          <CartQuickView styles={styles} />
        </div>
      </Container>
    </header>
  );
}
