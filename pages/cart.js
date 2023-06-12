import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Container, Footer, Header, Main, NavigationMenu, ProductNotification, SEO } from '../components';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { ShopifyCartProvider } from '../hooks/useShopifyCart';
import shopifyClient from '../utilities/shopifyClient';

const Cart = dynamic(() => import('../components/Cart'), { ssr: false });

export default function Page() {
  const [productNotification, setProductNotification] = useState();

  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <ApolloProvider client={shopifyClient}>
        <ShopifyCartProvider>
          <Header
            title={siteTitle}
            description={siteDescription}
            menuItems={primaryMenu}
          />
          <Main>
            <Container>
              <div className="text-center spacing-top">
                <h1>Cart</h1>
                {productNotification && (
                  <ProductNotification
                    productNotification={productNotification}
                    cartPage
                  />
                )}
                <Cart setProductNotification={setProductNotification} />{' '}
              </div>
            </Container>
          </Main>
          <Footer title={siteTitle} menuItems={footerMenu} />
        </ShopifyCartProvider>
      </ApolloProvider>
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
