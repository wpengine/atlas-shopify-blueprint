import { gql, useQuery } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../components';
import { getNextStaticProps } from '@faustwp/core';
import CartTable from '../components/Cart/CartTable';
import CartTotals from '../components/Cart/CartTotals';
import empty from "../data/stubs/cart/empty";

export default function Page() {

  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const cart = empty.cart;
  const cartItems = cart.lines.nodes;
  const cartCount = cartItems.length
  const isCartEmpty = cartCount === 0;
  const isCartLoading = false;
  const cartSubTotal = cart.cost.subtotalAmount.amount;
  const cartTotal = cart.cost.totalAmount.amount;
  const checkoutUrl = cart.checkoutUrl;
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <div className='text-center'>
            <h1>Cart</h1>
            {!isCartEmpty && !isCartLoading && (
              <>
                <CartTable
                  cartItems={cartItems}
                  cartCount={cartCount}
                  cartSubTotal={cartSubTotal}
                  cartTotal={cartTotal}
                />
                <CartTotals
                  cartSubTotal={cartSubTotal}
                  cartTotal={cartTotal}
                  checkoutUrl={checkoutUrl}
                />
              </>
            )}
            {isCartEmpty && !isCartLoading && <p>You have no items in cart</p>}
            {isCartLoading && <Loader />}
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetMenuItems(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
    props: {},
  });
}
