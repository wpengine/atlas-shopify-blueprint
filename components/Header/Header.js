import { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { FaBars, FaSearch } from "react-icons/fa";
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
} from "../../components";
import styles from "./Header.module.scss";
import useCart from "../../hooks/useCart";
import dynamic from "next/dynamic";

const CartQuickView = dynamic(() => import("./CartQuickView"), { ssr: false });

let cx = classNames.bind(styles);

export default function Header({
  title = "Headless by WP Engine",
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const cart = useCart();

  const navClasses = cx([
    styles["primary-navigation"],
    isNavShown ? styles["show"] : undefined,
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

          <button
            type="button"
            className={styles["nav-toggle"]}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={styles["primary-navigation"]}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>

          <div className={styles["nav-cart-bar"]}>
            <NavigationMenu
              id={styles["primary-navigation"]}
              className={navClasses}
              menuItems={menuItems}
            ></NavigationMenu>

            <Link href="/search">
                  <a>
                    <FaSearch title="Search" role="img" />
                  </a>
                </Link>

            <CartQuickView cart={cart} styles={styles} />
          </div>
        </div>
      </Container>
    </header>
  );
}
