import classNames from 'classnames/bind';
import { gql } from '@apollo/client';
import Link from 'next/link';
import flatListToHierarchical from '../../utilities/flatListToHierarchical';
import styles from './NavigationMenu.module.scss';
import stylesFromWP from './NavigationMenuClassesFromWP.module.scss';

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

export default function NavigationMenu({ menuItems, className }) {
  if (!menuItems) {
    return null;
  }

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function renderMenu(items) {
    return (
      <ul className={cx('menu')}>
        {items.map((item) => {
          const { id, path, label, children, cssClasses } = item;

          // eslint-disable-next-line no-prototype-builtins
          if (!item.hasOwnProperty('__typename')) {
            return null;
          }

          return (
            <li
              data-testid="nav-element"
              key={id}
              className={cxFromWp(cssClasses)}
            >
              <Link href={path ?? ''}>{label ?? ''}</Link>
              {children.length ? renderMenu(children) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav
      className={cx(['component', className])}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name} menu`}
    >
      {renderMenu(hierarchicalMenuItems)}
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
